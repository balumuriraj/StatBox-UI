import { Component, Prop, Vue } from 'vue-property-decorator';
import auth from '@/auth';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';

@Component({
  components: {
    Menu,
    Footer
  }
})
export default class Dashboard extends Vue {
  get user() {
    return this.$store.getters['user/user'];
  }

  public logOut() {
    auth.logout();
  }
}
