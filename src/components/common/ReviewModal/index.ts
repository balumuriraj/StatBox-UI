import { Component, Vue, Prop } from 'vue-property-decorator';
import * as movieStore from '@/store/modules/movie';
import Rating from '@/components/movie/hero/Rating';

@Component({
  components: {
    Rating
  }
})
export default class ReviewModal extends Vue {
  @Prop() public movie: any;

  public watchWith = this.movie && this.movie.userReview && this.movie.userReview.watchWith || null;
  public pace = this.movie && this.movie.userReview && this.movie.userReview.pace || null;
  public story = this.movie && this.movie.userReview && this.movie.userReview.story || null;
  public rewatch = this.movie && this.movie.userReview && this.movie.userReview.rewatch || null;


  public async submitReview() {
    if ('setReview' in this.movie) {
      this.movie.setReview({
        movieId: this.movie.id,
        watchWith: this.watchWith,
        pace: this.pace,
        story: this.story,
        rewatch: this.rewatch
      });
    } else {
      await movieStore.updateReview(this.$store, {
        review: {
          movieId: this.movie.id,
          watchWith: this.watchWith,
          pace: this.pace,
          story: this.story,
          rewatch: this.rewatch
        }
      });
    }

    this.closeModal();
  }

  public closeModal() {
    this.$emit('close');
  }
}
