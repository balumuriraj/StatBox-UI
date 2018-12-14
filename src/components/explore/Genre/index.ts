import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import * as genreStore from '@/store/modules/genre';

@Component({
  components: {
    MovieList
  }
})
export default class Genre extends Vue {
  public id!: string;
  public name!: string;

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  public fetchMovies() {
    genreStore.fetchGenreMovies(this.$store, { id: Number(this.id) });
  }

  private mounted() {
    this.id = this.$route.params.id;
    this.name = this.$route.name as string;
    this.fetchData();
  }

  private fetchData() {
    genreStore.fetchGenreData(this.$store, { id: Number(this.id) });
    genreStore.fetchGenreMovies(this.$store, { id: Number(this.id) });
  }

  get item() {
    return genreStore.getCurrentGenre(this.$store);
  }

  get movies() {
    return this.item && this.item.movies;
  }
}
