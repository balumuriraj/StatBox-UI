import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import * as homeStore from '@/store/modules/home';

@Component({
  components: {
    MovieList
  }
})
export default class Movies extends Vue {
  public id!: string;
  public name!: string;

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchMovies();
    }
  }

  public fetchMovies() {
    if (this.id === 'latest') {
      homeStore.fetchLatest(this.$store);
    } else if (this.id === 'upcoming') {
      homeStore.fetchUpcoming(this.$store);
    } else if (this.id === 'popular') {
      homeStore.fetchPopular(this.$store);
    }
  }

  private created() {
    this.id = this.$route.params.id;
    this.name = this.$route.name as string;
    this.fetchMovies();
  }

  get item() {
    if (this.id === 'latest') {
      return {
        name: 'Latest',
        movies: homeStore.getLatest(this.$store)
      };
    } else if (this.id === 'upcoming') {
      return {
        name: 'Upcoming',
        movies: homeStore.getUpcoming(this.$store)
      };
    } else if (this.id === 'popular') {
      return {
        name: 'Popular',
        movies: homeStore.getPopular(this.$store)
      };
    }
  }

  get movies() {
    return this.item && this.item.movies;
  }
}
