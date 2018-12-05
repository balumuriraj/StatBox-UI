import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/components/common/Footer';
import CelebList from '@/components/common/CelebList';
import Modal from '@/components/common/Modal';
import MovieList from '@/components/common/MovieList';
import Menu from '@/components/common/Menu/index';
import Table from '@/components/common/Table';
import Poster from '@/components/movie/hero/Poster';
import Content from '@/components/movie/hero/Content';
import Info from '@/components/movie/hero/Info';
import Stats from '@/components/movie/body/Stats';
import Attributes from '@/components/movie/body/Attributes';
import Title from '@/components/common/Title';
import * as movieStore from '@/store/modules/movie';

@Component({
  components: {
    Attributes,
    Poster,
    Content,
    Info,
    Stats,
    Title,
    Table,
    Menu,
    Modal,
    MovieList,
    CelebList,
    Footer
  }
})
export default class Movie extends Vue {
  public showModal: boolean = false;

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
