import { Component, Prop, Vue } from 'vue-property-decorator';
import Rating from '@/components/movie/hero/Rating';

@Component({
  components: {
    Rating
  }
})
export default class RateCard extends Vue {
  @Prop() public movie: any;

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

  public setReview() {
    this.$store.dispatch('toggleModal', { movie: this.movie });
  }
}
