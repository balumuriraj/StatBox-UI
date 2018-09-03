import { Component, Vue } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import * as home from '@/store/modules/home';

@Component({
  components: {
    MovieList,
    Menu,
    Footer
  }
})
export default class Home extends Vue {
  private created() {
    home.dispatchGetLatestMoviesAction(this.$store);
    home.dispatchGetUpcomingMoviesAction(this.$store);
  }

  get latestMovies() {
    return home.getLatestMovies(this.$store);
  }

  get upcomingMovies() {
    return home.getUpcomingMovies(this.$store);
  }
}
