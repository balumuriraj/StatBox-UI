import { Component, Prop, Vue } from 'vue-property-decorator';
import auth from '@/auth';
import Menu from '@/components/common/Menu';

@Component({
  components: {
    Menu
  }
})
export default class Login extends Vue {
  public mounted() {
    auth.initUI('#firebaseui-auth-container');
  }
}
