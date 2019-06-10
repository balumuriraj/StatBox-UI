import { Component, Vue } from 'vue-property-decorator';
import * as homeStore from '@/store/modules/home';
import Carousel from '../../components/common/Carousel';
import GenreCarousel from '../../components/common/GenreCarousel';
import Chart from '@/components/common/Chart';
import * as authStore from '@/store/modules/auth';
import Catch from '@/decorators/Catch';
import * as API from '@/api';
import { getRange } from '@/support/utils';

@Component({
  components: {
    GenreCarousel,
    Carousel,
    Chart
  }
})
export default class Home extends Vue {
  get isUserLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }
  public moviesCountBins: any = null;

  public genres: any = {
    items: [
      {
        url: '/browse?genre=3',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/141.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/140.jpg',
        title: 'Action'
      },
      {
        url: '/browse?genre=2',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/105.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/64.jpg',
        title: 'Thriller'
      },
      {
        url: '/browse?genre=4',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/84.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/238.jpg',
        title: 'Romance'
      },
      {
        url: '/browse?genre=5',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/108.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/102.jpg',
        title: 'Drama'
      },
      {
        url: '/browse?genre=7',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/107.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/467.jpg',
        title: 'Comedy'
      },
      {
        url: '/browse?genre=6',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/829.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/1917.jpg',
        title: 'Family'
      },
      {
        url: '/browse?genre=1',
        poster1: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/1.jpg',
        poster2: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/276.jpg',
        title: 'Horror'
      }
    ],
    count: 0
  };

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
