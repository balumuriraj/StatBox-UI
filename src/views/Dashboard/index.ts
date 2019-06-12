import { Component, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import List from '@/components/common/List';
import EmptyBox from '@/components/common/EmptyBox';
import Overview from '@/components/dashboard/Overview';
import Trophies from '@/components/dashboard/Trophies';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    Menu,
    Footer,
    Overview,
    List,
    Trophies,
    EmptyBox
  }
})
export default class Dashboard extends Vue {
  public isOverview = true;
  public isFavorite = false;
  public isWatchlist = false;
  public isRatings = false;
  public isTrophies = false;

  public metaInfo(): any {
    return {
      title: `${this.user.name} | Dashboard`
    };
  }

  public setMenu(item: string) {
    switch (item) {
      case 'favorites':
        this.isOverview = false;
        this.isFavorite = true;
        this.isWatchlist = false;
        this.isRatings = false;
        this.isTrophies = false;
        break;
      case 'watchlist':
        this.isOverview = false;
        this.isFavorite = false;
        this.isWatchlist = true;
        this.isRatings = false;
        this.isTrophies = false;
        break;
      case 'ratings':
        this.isOverview = false;
        this.isFavorite = false;
        this.isWatchlist = false;
        this.isRatings = true;
        this.isTrophies = false;
        break;
      case 'trophies':
        this.isOverview = false;
        this.isFavorite = false;
        this.isWatchlist = false;
        this.isRatings = false;
        this.isTrophies = true;
        break;
      default:
        this.isOverview = true;
        this.isFavorite = false;
        this.isWatchlist = false;
        this.isRatings = false;
        this.isTrophies = false;
        break;
    }
  }

  get user() {
    return authStore.getUser(this.$store);
  }

  get isLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }

  public fetchBookmarks() {
    authStore.fetchBookmarks(this.$store);
  }

  public fetchFavorites() {
    authStore.fetchFavorites(this.$store);
  }

  public fetchReviewed() {
    authStore.fetchReviewed(this.$store);
  }

  @Watch('isLoggedIn')
  private onIsLoggedInChanged(val: string, oldVal: string) {
    if (val) {
      this.fetchData();
    }
  }

  private mounted() {
    this.fetchData();
  }

  private fetchData() {
    authStore.fetchUserData(this.$store);
  }
}
