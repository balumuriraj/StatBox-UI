import { Component, Vue, Watch } from 'vue-property-decorator';
import Carousel from '@/components/common/Carousel/';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import * as celebStore from '@/store/modules/celeb';

@Component({
  components: {
    Carousel,
    Menu,
    Footer
  }
})
export default class Celeb extends Vue {
  get celeb() {
    return celebStore.getCelebData(this.$store);
  }

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  public fetchMovies() {
    celebStore.fetchCelebMovies(this.$store, { id: this.$route.params.id });
  }

  private created() {
    this.fetchData();
  }

  private fetchData() {
    celebStore.fetchCelebData(this.$store, { id: this.$route.params.id });
    this.fetchMovies();
  }
}
