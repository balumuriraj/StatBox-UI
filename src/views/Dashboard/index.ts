import { Component, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import Carousel from '@/components/common/Carousel';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    Menu,
    Footer,
    Carousel
  }
})
export default class Dashboard extends Vue {
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
    console.log('fetching User data...');
    authStore.fetchUserData(this.$store);
  }
}
