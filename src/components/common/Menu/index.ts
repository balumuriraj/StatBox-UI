import { Component, Vue } from 'vue-property-decorator';
import auth from '@/auth';
import * as authStore from '@/store/modules/auth';

@Component
export default class Menu extends Vue {
  get user() {
    return authStore.getUser(this.$store);
  }

  get isUserLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }

  public logOut() {
    auth.logout();
  }
 }
