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
  private created() {
    home.fetchLatestMovies(this.$store);
    home.fetchUpcomingMovies(this.$store);
  }

  get latestMovies() {
    return home.getLatestMovies(this.$store);
  }

  get upcomingMovies() {
    return home.getUpcomingMovies(this.$store);
  }
}
