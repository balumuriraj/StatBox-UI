import { Component, Prop, Vue } from 'vue-property-decorator';
import * as movieStore from '@/store/modules/movie';

@Component
export default class Content extends Vue {
  @Prop() public movie!: any;

  get description() {
    const movie = this.movie;

    if (movie) {
      let description = movie.description;

      if (description && description.length > 300) {
        description = description.substring(0, 300) + '...';
      }

      return description;
    }
  }

  get isBookmarked() {
    return movieStore.isBookmarked(this.$store);
  }

  get isFavorite() {
    return movieStore.isFavorite(this.$store);
  }

  get isReviewed() {
    return false;
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
