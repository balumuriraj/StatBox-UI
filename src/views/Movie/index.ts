import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/components/common/Footer';
import CelebList from '@/components/common/CelebList';
import ReviewModal from '@/components/common/ReviewModal';
import MovieList from '@/components/common/MovieList';
import Menu from '@/components/common/Menu/index';
import Table from '@/components/common/Table';
import Poster from '@/components/movie/hero/Poster';
import Content from '@/components/movie/hero/Content';
import Info from '@/components/movie/hero/Info';
import Chart from '@/components/common/Chart';
import Attributes from '@/components/movie/body/Attributes';
import * as movieStore from '@/store/modules/movie';

@Component({
  components: {
    Attributes,
    Poster,
    Content,
    Info,
    Chart,
    Table,
    Menu,
    ReviewModal,
    MovieList,
    CelebList,
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

    return cast;
  }

  get crew() {
    const movie = this.movie;
    const crew = movie && movie.crew;

    return crew;
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

  public showModal: boolean = false;

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
    movieStore.fetchMovieData(this.$store, { id: Number(this.$route.params.id) });
  }
}
