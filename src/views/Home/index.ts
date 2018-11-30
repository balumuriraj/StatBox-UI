import { Component, Vue } from 'vue-property-decorator';
import * as homeStore from '@/store/modules/home';
import Carousel from '../../components/common/Carousel';

@Component({
  components: {
    Carousel
  }
})
export default class Home extends Vue {
  get latest() {
    return homeStore.getLatest(this.$store);
  }

  get upcoming() {
    return homeStore.getUpcoming(this.$store);
  }

  public fetchLatest() {
    homeStore.fetchLatest(this.$store);
  }

  public fetchUpcoming() {
    homeStore.fetchUpcoming(this.$store);
  }

  private created() {
    this.fetchLatest();
    this.fetchUpcoming();
  }
}
