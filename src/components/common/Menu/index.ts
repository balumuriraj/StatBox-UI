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

  get whiteBg() {
    return this.scrollPosition > 55;
  }

  public isSideMenuActive = false;
  private scrollPosition: number = 0;

  public toggleSideMenu() {
    if (!this.isSideMenuActive) {
      this.isSideMenuActive = true;
    } else {
      this.isSideMenuActive = false;
    }
  }

  public logOut() {
    auth.logout();
  }

  private mounted() {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;
    });
  }
 }
