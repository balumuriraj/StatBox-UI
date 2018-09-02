import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/components/common/Footer';
import CelebsList from '@/components/movie/body/CelebsList';
import List from '@/components/common/MovieList';
import Menu from '@/components/common/Menu/index';
import Table from '@/components/common/Table';
import Poster from '@/components/movie/hero/Poster';
import Content from '@/components/movie/hero/Content';
import Stats from '@/components/movie/body/Stats';
import Attributes from '@/components/movie/body/Attributes';
import Title from '@/components/movie/body/Title';

@Component({
  components: {
    Attributes,
    Poster,
    Content,
    Stats,
    Title,
    Table,
    Menu,
    List,
    CelebsList,
    Footer
  }
})
export default class Movie extends Vue {

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.$store.dispatch('movieById', this.$route.params.id);
  }

  get movie() {
    return this.$store.getters.movieById;
  }



  get cast() {
    const movie = this.$store.getters.movieById;
    const cast = movie && movie.cast;

    if (cast) {
      return cast.slice(0, 4);
    }
  }

  get crew() {
    const movie = this.$store.getters.movieById;
    const crew = movie && movie.crew;

    if (crew) {
      return crew.slice(0, 2);
    }
  }

  get reviews() {
    const movie = this.$store.getters.movieById;
    const reviews = movie && movie.reviews;

    if (reviews) {
      return reviews.map((review: any) => [review.critic, review.rating]);
    }
  }

  get movies() {
    const movie = this.$store.getters.movieById;
    const movies = movie && movie.moviesByMonth;

    if (movies) {
      return movies.map((mov: any) => [mov.title, mov.date, mov.cert, mov.runtime]);
    }
  }
}
