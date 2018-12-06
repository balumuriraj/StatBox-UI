import { Component, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import MovieList from '@/components/common/MovieList';
import Overview from '@/components/dashboard/Overview';
import Trophies from '@/components/dashboard/Trophies';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    Menu,
    Footer,
    Overview,
    MovieList,
    Trophies
  }
})
export default class Dashboard extends Vue {
  public isOverview = true;
  public isFavorite = false;
  public isWatchlist = false;
  public isRatings = false;
  public isTrophies = false;

  public setMenu(item: string) {
    switch (item) {
      case 'favorite':
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

  public fetchSeen() {
    authStore.fetchSeen(this.$store);
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

  private created() {
    console.log('fetching user data for dashboard...');
    this.fetchData();
  }

  private fetchData() {
    authStore.fetchUserData(this.$store);
  }
}
