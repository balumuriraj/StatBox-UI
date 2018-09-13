import { Component, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import MovieList from '@/components/common/MovieList';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    Menu,
    Footer,
    MovieList
  }
})
export default class Dashboard extends Vue {
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

  get user() {
    return authStore.getUser(this.$store);
  }

  get isLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }
}
