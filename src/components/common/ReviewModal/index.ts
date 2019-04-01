import { Component, Vue, Prop } from 'vue-property-decorator';
import Rating from '@/components/movie/hero/Rating';

@Component({
  components: {
    Rating
  }
})
export default class ReviewModal extends Vue {
  get movie() {
    return this.$store.state.modalMovie;
  }

  public watchWith = this.movie && this.movie.userReview && this.movie.userReview.watchWith || null;
  public pace = this.movie && this.movie.userReview && this.movie.userReview.pace || null;
  public story = this.movie && this.movie.userReview && this.movie.userReview.story || null;
  public rewatch = this.movie && this.movie.userReview && this.movie.userReview.rewatch || null;


  public async submitReview() {
    if (this.watchWith || this.pace || this.story || this.rewatch) {
      if ('setReview' in this.movie) {
        this.movie.setReview({
          movieId: this.movie.id,
          watchWith: this.watchWith,
          pace: this.pace,
          story: this.story,
          rewatch: this.rewatch
        });
      }
    }

    this.closeModal();
  }

  public closeModal() {
    this.$store.dispatch('toggleModal');
  }
}
