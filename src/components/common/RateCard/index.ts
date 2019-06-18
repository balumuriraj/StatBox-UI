import { Prop, Vue } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component';
import Rating from '@/components/movie/hero/Rating';
import MovieMixin from '@/mixins/MovieMixin';
import { EventBus } from '@/events';

@Component({
  components: {
    Rating
  }
})
export default class RateCard extends mixins(MovieMixin) {
  @Prop() public movie: any;

  // get rating() {
  //   return this.movie && this.movie.rating && Math.round(this.movie.rating * 100) / 100;
  // }

  get userRating() {
    return this.movie && this.movie.userReview && this.movie.userReview.rating;
  }

  // get userReview() {
  //   return this.movie && this.movie.userReview;
  // }

  public setUserReview() {
    EventBus.$emit('toggleReviewModal', this.movie);
  }

  private mounted() {
    if (this.movie) {
      this.setProperties(this.movie);
    }
  }
}
