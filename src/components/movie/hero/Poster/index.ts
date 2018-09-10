import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Rating from '../Rating';
import {
  isBookmarked as isMovieBookmarked,
  isSeen as isMovieSeen,
  updateSeen,
  updateBookmark
} from '@/store/modules/movie';

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
    return isMovieBookmarked(this.$store);
  }

  get isSeen() {
    return isMovieSeen(this.$store);
  }

  public setSeen() {
    if (this.isSeen) {
      updateSeen(this.$store, { id: this.movieId, isPush: false });
    } else {
      updateSeen(this.$store, { id: this.movieId, isPush: true });
    }
  }

  public setBookmark() {
    if (this.isBookmarked) {
      updateBookmark(this.$store, { id: this.movieId, isPush: false });
    } else {
      updateBookmark(this.$store, { id: this.movieId, isPush: true });
    }
  }
}
