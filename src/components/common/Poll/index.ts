import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as API from '@/api';
import Catch from '@/decorators/Catch';
import * as authStore from '@/store/modules/auth';
import { EventBus } from '@/events';

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
  public selectingId: number = null;
  public loading: boolean = false;
  public movieHits: any[] = [];
  public isNewMovie: boolean = false;

  @Catch
  public async selectMovie(id: number) {
    if (!this.isUserLoggedIn) {
      throw new Error('Not Authorized');
    }

    if (!this.loading && !this.isVoted && id) {
      this.selectingId = id;
      this.loading = true;

      await API.addVote({ pollId: this.item.id, movieId: id });
      await this.fetch();

      this.selectedId = id;
      this.selectingId = null;
      this.loading = false;
    }
  }

  @Catch
  public async clear() {
    if (!this.isUserLoggedIn) {
      throw new Error('Not Authorized');
    }

    if (!this.loading) {
      this.loading = true;

      await API.deleteVote({ pollId: this.item.id });
      await this.fetch();

      this.selectedId = null;
      this.selectingId = null;
      this.isNewMovie = false;

      this.loading = false;
    }
  }

  public displaySearch(e: any) {
    if (!this.loading && !this.isVoted) {
      EventBus.$emit('toggleBrowseModal', {
        type: this.item.type,
        value: this.item.filter,
        existingIds: this.votes.map((vote) => vote.movie.id),
        selectMovie: this.selectMovie.bind(this)
      });
      e.stopPropagation();
    }
  }

  @Watch('isUserLoggedIn')
  public onUserStateChange(val: number, oldVal: number) {
    this.fetch();
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
    await this.fetch();
  }
}
