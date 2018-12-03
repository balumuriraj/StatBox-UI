import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import * as homeStore from '@/store/modules/home';

@Component({
  components: {
    MovieList
  }
})
export default class Years extends Vue {
  public id!: string;
  public name!: string;

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  public fetchMovies() {
    if (this.id === 'recent') {
      const date = new Date(2015);
      const startDate = date.getTime();
      const endDate = Date.now();
      homeStore.fetchMoviesByDates(this.$store, { name: 'recent', startDate, endDate });
    }
  }

  private created() {
    this.id = this.$route.params.id;
    this.name = this.$route.name as string;
    this.fetchData();
  }

  private fetchData() {
    if (this.id === 'recent') {
      const date = new Date('2015');
      const startDate = date.getTime();
      const endDate = Date.now();
      homeStore.fetchMoviesByDates(this.$store, { name: 'recent', startDate, endDate });
    }
  }

  get item() {
    const emptyItems = {
      items: [],
      count: 0
    };

    if (this.id === 'recent') {
      return {
        name: 'Recent',
        movies: homeStore.getMovies(this.$store, 'recent') || emptyItems
      };
    }
  }

  get movies() {
    return this.item && this.item.movies;
  }
}
