import { Component, Prop, Vue } from 'vue-property-decorator';
import * as movieStore from '@/store/modules/movie';

@Component
export default class Content extends Vue {
  @Prop() public movie!: any;

  get isBookmarked() {
    return movieStore.isBookmarked(this.$store);
  }

  get isFavorite() {
    return movieStore.isFavorite(this.$store);
  }

  get isReviewed() {
    return false;
  }

  get userRating(): number {
    return movieStore.userRating(this.$store);
  }

  public setBookmark() {
    if (this.isBookmarked) {
      movieStore.removeBookmark(this.$store, { id: this.movie.id });
    } else {
      movieStore.addBookmark(this.$store, { id: this.movie.id });
    }
  }

  public setFavorite() {
    if (this.isFavorite) {
      movieStore.removeFavorite(this.$store, { id: this.movie.id });
    } else {
      movieStore.addFavorite(this.$store, { id: this.movie.id });
    }
  }

  public setReview() {
    this.$emit('show');
  }
}
