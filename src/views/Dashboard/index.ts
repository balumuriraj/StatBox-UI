import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import * as auth from '@/store/modules/auth';

@Component({
  components: {
    Menu,
    Footer
  }
})
export default class Dashboard extends Vue {
  get user() {
    return auth.getUser(this.$store);
  }
}
