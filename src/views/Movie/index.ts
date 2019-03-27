import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/components/common/Footer';
import CelebList from '@/components/common/CelebList';
import ReviewModal from '@/components/common/ReviewModal';
import List from '@/components/common/List';
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
    List,
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

  get attributes() {
    if (this.movie) {
      const attr = this.movie.attributes;
      const result = {
        watchWith: {
          friends: 0,
          self: 0,
          family: 0
        },
        pace: {
          slow: 0,
          fast: 0
        },
        story: {
          simple: 0,
          complex: 0
        },
        rewatch: {
          yes: 0,
          no: 0
        }
      };

      if (attr) {
        const { friends, family, self } = attr.watchWith;
        const watchWithTotal = friends + family + self;
        result.watchWith.family = family / watchWithTotal * 100;
        result.watchWith.friends = friends / watchWithTotal * 100;
        result.watchWith.self = self / watchWithTotal * 100;

        const { slow, fast } = attr.pace;
        const paceTotal = slow + fast;
        result.pace.slow = slow / paceTotal * 100;
        result.pace.fast = fast / paceTotal * 100;

        const { simple, complex } = attr.story;
        const storyTotal = simple + complex;
        result.story.simple = simple / storyTotal * 100;
        result.story.complex = complex / storyTotal * 100;

        const { yes, no } = attr.rewatch;
        const rewatchTotal = yes + no;
        result.rewatch.yes = yes / rewatchTotal * 100;
        result.rewatch.no = no / rewatchTotal * 100;
      }

      return result;
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
