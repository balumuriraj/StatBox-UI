import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import * as home from '@/store/modules/home';
import Carousel from '../../components/common/Carousel';

@Component({
  components: {
    Carousel,
    Menu,
    Footer
  }
})
export default class Home extends Vue {
  get latestMovies() {
    return home.getLatest(this.$store);
  }

  get upcomingMovies() {
    return home.getUpcoming(this.$store);
  }

  public fetchLatestMovies() {
    home.fetchLatest(this.$store);
  }

  public fetchUpcomingMovies() {
    home.fetchUpcoming(this.$store);
  }

  private created() {
    this.fetchLatestMovies();
    this.fetchUpcomingMovies();
  }
}
