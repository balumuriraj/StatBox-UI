import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as API from '@/api';
import * as algoliasearch from 'algoliasearch';
import Catch from '@/decorators/Catch';
import * as authStore from '@/store/modules/auth';

const client = algoliasearch('8P9LT48GR4', 'e1c5b9da0bfcd987c6a43509d7c496cc');
const moviesIndex = client.initIndex('movies');

@Component
export default class Poll extends Vue {

  get isVoted(): boolean {
    return this.selectedId != null;
  }

  get isUserLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }
  @Prop() public item: any;

  public votes: any[] = [];
  public count: number = 0;
  public showResults: boolean = false;
  public selectedId: number = null;
  public loading: boolean = false;
  public showSearch: boolean = false;
  public searchTerm: string = null;
  public movieHits: any[] = [];
  public isNewMovie: boolean = false;

  public async addMovie(id: number) {
    this.searchTerm = null;
    this.showSearch = false;

    await this.selectMovie(id);
  }

  @Catch
  public async selectMovie(id: number) {
    if (!this.isVoted) {
      this.loading = true;

      await API.addVote({ pollId: this.item.id, movieId: id });
      await this.fetch();

      this.selectedId = id;
      this.loading = false;
    }
  }

  public async clear() {
    this.loading = true;

    await API.deleteVote({ pollId: this.item.id });
    await this.fetch();
    this.selectedId = null;
    this.isNewMovie = false;

    this.loading = false;
  }

  public close(e: any) {
    const searchElm = this.$refs.searchContainer as Element;
    const addOptionElm = this.$refs.addOption as Element;

    if (!(searchElm && searchElm.contains(e.target)) && !(addOptionElm && addOptionElm.contains(e.target))) {
      this.showSearch = false;
    }

    e.stopPropagation();
  }

  public displaySearch(e: any) {
    if (!this.isVoted) {
      this.showSearch = true;
      e.stopPropagation();
    }
  }

  @Watch('isUserLoggedIn')
  public onUserStateChange(val: number, oldVal: number) {
    this.fetch();
  }

  @Watch('searchTerm')
  private onSearchTermChanged(newVal: string, oldVal: string) {
    const term = newVal;
    this.executeSearch(term);
  }

  private executeSearch(term: string) {
    if (term && term.length > 2) {
      moviesIndex.search(term, this.algolioMovieCallback);
    } else {
      this.movieHits = [];
    }
  }

  private algolioMovieCallback(err: any, res: any) {
    if (!err && res) {
      const hits = res.hits.filter((hit: any) => {
        if (this.item.type === 'year') {
          const year = new Date(hit.releasedate).getFullYear();
          return this.item.filter === year;
        }

        return true;
      });
      this.movieHits = hits;
    }
  }

  @Catch
  private async fetch() {
    const data = await API.getPollById(this.item.id);
    const votes = data ? [...data.votes] : [];
    const count = data ? data.count : 0;
    let i = 0;

    while (votes.length < 3) {
      const suggestion = this.item.suggestions[i];
      const hasId = votes.some((vote) => vote.movie.id === suggestion.movie.id);

      if (!hasId) {
        votes.push(suggestion);
      }

      i++;
    }

    this.count = count;
    this.votes = votes.filter(Boolean).map((vote: any) => {
      const obj = { ...vote };
      const percent = obj.count != null && count != null ? (obj.count / count) * 100 : 0;
      obj.percent = Math.round(percent);
      return obj;
    });
    this.selectedId = data && data.userVote && data.userVote.movieId || null;

    if (votes.length === 4) {
      this.isNewMovie = true;
    }
  }

  private async mounted() {
    document.addEventListener('click', this.close);
    await this.fetch();
  }

  private beforeDestroy() {
    document.removeEventListener('click', this.close);
  }
}
