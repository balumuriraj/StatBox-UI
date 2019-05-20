import { Component, Vue, Watch } from 'vue-property-decorator';
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
    return this.scrollPosition > 25;
  }

  public searchTerm: string = null;
  public isSideMenuActive = false;
  private scrollPosition: number = 0;

  public toggleSideMenu() {
    if (!this.isSideMenuActive) {
      this.isSideMenuActive = true;
    } else {
      this.isSideMenuActive = false;
    }
  }

  public async logIn() {
    this.$store.dispatch('auth/openModal');
  }

  public async logOut() {
    this.$store.dispatch('auth/logout');
  }

  private mounted() {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;
    });
  }

  @Watch('searchTerm')
  private onSearchTermChanged(newVal: string, oldVal: string) {
    const term = newVal;
    this.$router.push({ name: 'search', query: { term } });
  }
}
