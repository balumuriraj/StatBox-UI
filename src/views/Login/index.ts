import { Component, Prop, Vue } from 'vue-property-decorator';
import auth from '@/auth';

@Component
export default class Login extends Vue {
  public mounted() {
    auth.initUI('#firebaseui-auth-container');
  }
}
