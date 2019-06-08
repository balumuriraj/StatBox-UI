import { Component, Vue } from 'vue-property-decorator';
import * as homeStore from '@/store/modules/home';
import Carousel from '../../components/common/Carousel';
import Chart from '@/components/common/Chart';
import * as authStore from '@/store/modules/auth';
import Catch from '@/decorators/Catch';
import * as API from '@/api';
import { getRange } from '@/support/utils';

@Component({
  components: {
    Carousel,
    Chart
  }
})
export default class Home extends Vue {
  get isUserLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }
  public moviesCountBins: any = null;

  public newMovies: any = {
    items: [],
    count: 0
  };

  public popularMovies: any = {
    items: [],
    count: 0
  };

  public topRatedMovies: any = {
    items: [],
    count: 0
  };

  public async fetchMoviesCountBins() {
    this.moviesCountBins = await API.getMovieCountByYears();
  }

  public async logIn() {
    this.$store.dispatch('auth/openModal');
  }

  @Catch
  public async fetchPopular() {
    const result = await API.getMoviesByFilter([], [], 'popularity', getRange(this.popularMovies));

    if (result) {
      this.popularMovies.items = this.popularMovies.items.concat(result.items);
      this.popularMovies.count = result.count;
    }
  }

  @Catch
  private async mounted() {
    this.fetchNew();
    this.fetchPopular();
    this.fetchTopRated();
    await this.fetchMoviesCountBins();
  }

  @Catch
  private async fetchNew() {
    const result = await API.getMoviesByFilter([], [], null, getRange(this.newMovies));

    if (result) {
      this.newMovies.items = this.newMovies.items.concat(result.items);
      this.newMovies.count = result.count;
    }
  }

  @Catch
  private async fetchTopRated() {
    const result = await API.getMoviesByFilter([], [], 'rating', getRange(this.topRatedMovies));

    if (result) {
      this.topRatedMovies.items = this.topRatedMovies.items.concat(result.items);
      this.topRatedMovies.count = result.count;
    }
  }
}
