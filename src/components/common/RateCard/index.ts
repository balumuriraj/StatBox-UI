import { Component, Prop, Vue } from 'vue-property-decorator';
import Rating from '@/components/movie/hero/Rating';
import ReviewModal from '@/components/common/ReviewModal';

@Component({
  components: {
    Rating,
    ReviewModal
  }
})
export default class RateCard extends Vue {
  @Prop() public movie: any;

  public showModal = false;

  get year() {
    const date = this.movie && new Date(this.movie.releaseDate);
    return date.getFullYear();
  }

  get rating() {
    return this.movie && this.movie.rating && Math.round(this.movie.rating * 100) / 100;
  }

  get userRating() {
    return this.movie && this.movie.userReview && this.movie.userReview.rating;
  }

  get userReview() {
    return this.movie && this.movie.userReview;
  }

  get isReviewed() {
    return this.userReview && (
      this.userReview.watchWith || this.userReview.pace || this.userReview.story || this.userReview.rewatch
    );
  }

  public setFavorite() {
    this.movie.setFavorite(!this.movie.isFavorite);
  }

  public setBookmark() {
    this.movie.setBookmark(!this.movie.isBookmarked);
  }
}
