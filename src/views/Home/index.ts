import { Component, Vue } from 'vue-property-decorator';
import * as homeStore from '@/store/modules/home';
import Carousel from '../../components/common/Carousel';
import * as authStore from '@/store/modules/auth';
import Catch from '@/decorators/Catch';

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

  get popular() {
    return homeStore.getPopular(this.$store);
  }

  get topRated() {
    return homeStore.getTopRated(this.$store);
  }

  get from2010to2015() {
    return homeStore.get2010to2015(this.$store);
  }

  get isUserLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }

  public fetchLatest() {
    homeStore.fetchLatest(this.$store);
  }

  public fetchUpcoming() {
    homeStore.fetchUpcoming(this.$store);
  }

  public fetchPopular() {
    homeStore.fetchPopular(this.$store);
  }

  public fetchTopRated() {
    homeStore.fetchTopRated(this.$store);
  }

  public fetchFrom2010to2015() {
    const name = 'from2010to2015';
    const date1 = new Date('2010');
    const startDate = date1.getTime();
    const date2 = new Date('2015');
    const endDate = date2.getTime();
    homeStore.fetchMoviesByDates(this.$store, { name, startDate, endDate });
  }

  @Catch
  private created() {
    this.fetchLatest();
    this.fetchUpcoming();
    this.fetchPopular();
    this.fetchTopRated();
    this.fetchFrom2010to2015();
  }
}
