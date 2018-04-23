import { Component, Vue } from 'vue-property-decorator';
import auth from '@/auth';

@Component
export default class Menu extends Vue {
  get user() {
    return this.$store.getters['user/user'];
  }

  public logOut() {
    auth.logout();
  }
 }
