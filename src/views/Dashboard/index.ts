import { Component, Prop, Vue } from 'vue-property-decorator';
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
  private created() {
    this.fetchData();
  }

  private fetchData() {
    authStore.fetchUserData(this.$store);
  }

  get user() {
    return authStore.getUser(this.$store);
  }
}
