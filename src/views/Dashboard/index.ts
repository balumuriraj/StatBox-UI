import { Component, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import MovieList from '@/components/common/MovieList';
import Overview from '@/components/dashboard/Overview';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    Menu,
    Footer,
    Overview,
    MovieList
  }
})
export default class Dashboard extends Vue {
  public isOverview = true;
  public isFavorite = false;
  public isWatchlist = false;
  public isRatings = false;

  public setMenu(item: string) {
    switch (item) {
      case 'overview':
        this.isOverview = true;
        this.isFavorite = false;
        this.isWatchlist = false;
        this.isRatings = false;
        break;
      case 'favorite':
        this.isOverview = false;
        this.isFavorite = true;
        this.isWatchlist = false;
        this.isRatings = false;
        break;
      case 'watchlist':
        this.isOverview = false;
        this.isFavorite = false;
        this.isWatchlist = true;
        this.isRatings = false;
        break;
      case 'ratings':
        this.isOverview = false;
        this.isFavorite = false;
        this.isWatchlist = false;
        this.isRatings = true;
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
    this.fetchData();
  }

  private fetchData() {
    authStore.fetchUserData(this.$store);
  }
}
