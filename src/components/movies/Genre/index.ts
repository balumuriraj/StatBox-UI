import { Component, Vue, Watch } from 'vue-property-decorator';
import * as genreStore from '@/store/modules/genre';
import MovieList from '@/components/common/MovieList';

@Component({
  components: {
    MovieList
  }
})
export default class Genre extends Vue {
  public id!: number;

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  public fetchMovies() {
    console.log('fetching Genre movies....');
    genreStore.fetchGenreMovies(this.$store, { id: this.id });
  }

  private created() {
    this.id = Number(this.$route.params.id);
    this.fetchData();
  }

  private fetchData() {
    console.log('fetching Genre data....');
    genreStore.fetchGenreData(this.$store, { id: this.id });
    this.fetchMovies();
  }

  get genre() {
    return genreStore.getCurrentGenre(this.$store);
  }

  get movies() {
    return this.genre.movies;
  }
}
