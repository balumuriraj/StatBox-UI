import { Component, Vue } from 'vue-property-decorator';
import * as homeStore from '@/store/modules/home';
import Carousel from '../../components/common/Carousel';
import Chart from '@/components/common/Chart';
import * as authStore from '@/store/modules/auth';
import Catch from '@/decorators/Catch';
import * as API from '@/api';

@Component({
  components: {
    Carousel,
    Chart
  }
})
export default class Home extends Vue {

  get popular() {
    return homeStore.getPopular(this.$store);
  }

  get topRated() {
    return homeStore.getTopRated(this.$store);
  }

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

  public from2010to2019Movies: any = {
    items: [],
    count: 0
  };

  public from2000to2009Movies: any = {
    items: [],
    count: 0
  };

  public async fetchMoviesCountBins() {
    this.moviesCountBins = await API.getMovieCountByYears();
  }

  public async logIn() {
    this.$store.dispatch('auth/openModal');
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
  public async fetchPopular() {
    const result = await API.getMoviesByFilter([], [], 'popularity', this.getRange(this.popularMovies));

    if (result) {
      this.popularMovies.items = this.popularMovies.items.concat(result.items);
      this.popularMovies.count = result.count;
    }
  }

  @Catch
  private async mounted() {
    this.fetchNew();
    this.fetchPopular();
    this.fetch2010s();
    this.fetch2000s();
    this.fetchTopRated();
    await this.fetchMoviesCountBins();
  }

  @Catch
  private async fetchNew() {
    const result = await API.getMoviesByFilter([], [], null, this.getRange(this.newMovies));

    if (result) {
      this.newMovies.items = this.newMovies.items.concat(result.items);
      this.newMovies.count = result.count;
    }
  }

  @Catch
  private async fetch2000s() {
    const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009];
    const result = await API.getMoviesByFilter([], years, 'releasedate', this.getRange(this.from2000to2009Movies));

    if (result) {
      this.from2000to2009Movies.items = this.from2000to2009Movies.items.concat(result.items);
      this.from2000to2009Movies.count = result.count;
    }
  }

  @Catch
  private async fetch2010s() {
    const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
    const result = await API.getMoviesByFilter([], years, 'releasedate', this.getRange(this.from2010to2019Movies));

    if (result) {
      this.from2010to2019Movies.items = this.from2010to2019Movies.items.concat(result.items);
      this.from2010to2019Movies.count = result.count;
    }
  }


  private getRange(movies: any) {
    const count = movies.count;
    const length = movies.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      return { from, to };
    }
  }
}
