import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import * as movieStore from '@/store/modules/movie';

@Component({
  components: {
    FontAwesomeIcon
  }
})
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

  get isSeen() {
    return movieStore.isSeen(this.$store);
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

  public setSeen() {
    if (this.isSeen) {
      movieStore.removeSeen(this.$store, { id: this.movie.id });
    } else {
      movieStore.addSeen(this.$store, { id: this.movie.id });
    }
  }

  public setReview() {
    this.$emit('show');
  }
}
