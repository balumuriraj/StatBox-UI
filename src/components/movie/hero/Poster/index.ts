import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Rating from '../Rating';

@Component({
  components: {
    FontAwesomeIcon,
    Rating
  }
})
export default class Poster extends Vue {
  @Prop() public imageUrl!: string;

  private bookmark: boolean = false;
  private notInterested: boolean = false;


  get isBookmarked() {
    return this.bookmark;
  }

  get isNotInterested() {
    return this.notInterested;
  }

  public setInterest() {
    this.notInterested = !this.notInterested;
  }

  public setBookmark() {
    this.bookmark = !this.bookmark;
  }
}
