import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/components/common/Footer';
import CelebsList from '@/components/movie/body/CelebsList';
import Carousel from '@/components/common/Carousel';
import Menu from '@/components/common/Menu/index';
import Table from '@/components/common/Table';
import Poster from '@/components/movie/hero/Poster';
import Content from '@/components/movie/hero/Content';
import Stats from '@/components/movie/body/Stats';
import Attributes from '@/components/movie/body/Attributes';
import Title from '@/components/movie/body/Title';
import * as movieStore from '@/store/modules/movie';

@Component({
  components: {
    Attributes,
    Poster,
    Content,
    Stats,
    Title,
    Table,
    Menu,
    Carousel,
    CelebsList,
    Footer
  }
})
export default class Movie extends Vue {
  get movie() {
    return movieStore.getMovieData(this.$store);
  }

  get cast() {
    const movie = this.movie;
    const cast = movie && movie.cast;

    if (cast) {
      return cast.slice(0, 4);
    }
  }

  get crew() {
    const movie = this.movie;
    const crew = movie && movie.crew;

    if (crew) {
      return crew.slice(0, 2);
    }
  }

  // get reviews() {
  //   const movie = this.movie;
  //   const reviews = movie && movie.reviews;

  //   if (reviews) {
  //     return reviews.map((review: any) => [review.critic, review.rating]);
  //   }
  // }

  get moviesAroundReleaseDate() {
    const movie = this.movie;
    const { items } = movie && movie.moviesAroundReleaseDate;

    if (items) {
      return items.map((mov: any) => [mov.title, mov.releaseDate, mov.cert, mov.runtime]);
    }
  }

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  public fetchMoviesAroundReleaseDate() {
    movieStore.fetchMoviesAroundDate(this.$store);
  }

  private created() {
    this.fetchData();
  }

  private fetchData() {
    console.log('fetching Movie data....');
    movieStore.fetchMovieData(this.$store, { id: Number(this.$route.params.id) });
  }
}
