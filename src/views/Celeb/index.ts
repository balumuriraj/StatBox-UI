import { Component, Vue, Watch } from 'vue-property-decorator';
import Carousel from '@/components/common/Carousel/';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import * as celeb from '@/store/modules/celeb';

@Component({
  components: {
    Carousel,
    Menu,
    Footer
  }
})
export default class Celeb extends Vue {
  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  private created() {
    this.fetchData();
  }

  private fetchData() {
    celeb.fetchCelebData(this.$store, { id: this.$route.params.id });
  }

  get celeb() {
    return celeb.getCelebData(this.$store);
  }
}
