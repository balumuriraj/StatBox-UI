import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Rating from '../Rating';
import * as movieStore from '@/store/modules/movie';

@Component({
  components: {
    FontAwesomeIcon,
    Rating
  }
})
export default class Poster extends Vue {
  @Prop() public imageUrl!: string;
  @Prop() public movieId!: number;

  get isBookmarked() {
    return movieStore.isBookmarked(this.$store);
  }

  get isSeen() {
    return movieStore.isSeen(this.$store);
  }

  public setBookmark() {
    if (this.isBookmarked) {
      movieStore.removeBookmark(this.$store, { id: this.movieId });
    } else {
      movieStore.addBookmark(this.$store, { id: this.movieId });
    }
  }

  public setSeen() {
    if (this.isSeen) {
      movieStore.removeSeen(this.$store, { id: this.movieId });
    } else {
      movieStore.addSeen(this.$store, { id: this.movieId });
    }
  }
}
