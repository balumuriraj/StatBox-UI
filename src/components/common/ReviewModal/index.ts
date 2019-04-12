import { Component, Vue, Prop } from 'vue-property-decorator';
import Rating from '@/components/movie/hero/Rating';
import { EventBus } from '@/events';

@Component({
  components: {
    Rating
  }
})
export default class ReviewModal extends Vue {
  public movie: any = null;
  public isLoading: boolean = false;
  public watchWith: string = null;
  public pace: string = null;
  public story: string = null;
  public rewatch: string = null;


  public async submitReview() {
    this.isLoading = true;

    if (this.watchWith || this.pace || this.story || this.rewatch) {
      if ('setReview' in this.movie) {
        await this.movie.setReview({
          movieId: this.movie.id,
          rating: this.movie.rating,
          watchWith: this.watchWith,
          pace: this.pace,
          story: this.story,
          rewatch: this.rewatch
        });
      }
    }

    this.isLoading = false;
    this.closeModal();
  }

  public closeModal() {
    EventBus.$emit('toggleModal', null);
  }

  private mounted() {
    EventBus.$on('toggleModal', (movie: any) => {
      this.movie = movie;
      this.watchWith = this.movie && this.movie.userReview && this.movie.userReview.watchWith || null;
      this.pace = this.movie && this.movie.userReview && this.movie.userReview.pace || null;
      this.story = this.movie && this.movie.userReview && this.movie.userReview.story || null;
      this.rewatch = this.movie && this.movie.userReview && this.movie.userReview.rewatch || null;
    });
  }
}
