import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MovieCard extends Vue {
  @Prop() public movie: any;

  get year() {
    const date = this.movie && new Date(this.movie.releaseDate);
    return date.getFullYear();
  }

  get rating() {
    return this.movie && this.movie.rating && Math.round(this.movie.rating * 100) / 100;
  }

  get userRating() {
    // console.log(this.movie);
    return this.movie && this.movie.userReview && this.movie.userReview.rating;
  }
}
