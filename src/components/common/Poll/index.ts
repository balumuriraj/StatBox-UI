import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as algoliasearch from 'algoliasearch';

const client = algoliasearch('8P9LT48GR4', 'e1c5b9da0bfcd987c6a43509d7c496cc');
const moviesIndex = client.initIndex('movies');

@Component
export default class Poll extends Vue {

  get isVoted(): boolean {
    return this.selectedId != null;
  }
  @Prop() public item: any;

  get movies() {
    const items = this.item && this.item.movies || [];
    const totalVotes = this.item && this.item.totalVotes;

    items.sort((itemA: any, itemB: any) => itemB.votes - itemA.votes);

    return items.filter(Boolean).map((item: any) => {
      item.percent = (item.votes / totalVotes) * 100;
      return item;
    });
  }

  public showResults: boolean = false;
  public selectedId: number = null;
  public loading: boolean = false;
  public showSearch: boolean = false;
  public searchTerm: string = null;
  public movieHits: any[] = [];
  public newMovie: any = null;

  public addMovie(movie: any) {
    this.searchTerm = null;
    this.showSearch = false;
    this.selectedId = movie.id;
    this.newMovie = movie;

    // TODO: Service call
    this.item.totalVotes++;
    this.item.movies.push({
      ...movie,
      votes: 1
    });
  }

  public selectMovie(id: number) {
    if (!this.isVoted) {
      this.loading = true;

      // TODO: service call
      this.selectedId = id;
      this.item.totalVotes++;
      this.item.movies.some((movie: any) => {
        if (movie.id === id) {
          movie.votes++;
          return true;
        }
      });

      this.loading = false;
    }
  }

  public clear() {
    // TODO: service call
    this.item.movies = this.item.movies.filter((movie: any) => movie.id !== (this.newMovie && this.newMovie.id));
    this.selectedId = null;
    this.newMovie = null;
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
      this.movieHits = res.hits;
    }
  }

  private mounted() {
    document.addEventListener('click', this.close);
  }

  private beforeDestroy() {
    document.removeEventListener('click', this.close);
  }
}
