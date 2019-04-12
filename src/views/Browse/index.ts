import { Component, Vue, Watch } from 'vue-property-decorator';
import List from '@/components/common/List';
import MovieFilter from '@/components/common/MovieFilter';
import * as API from '@/api';

@Component({
  components: {
    List,
    MovieFilter
  }
})
export default class Browse extends Vue {
  get selectedGenreNames() {
    const items = this.genreList;
    const map: any = {};
    items.forEach((item) => {
      map[item.id] = item.name;
    });

    return this.selectedGenres && this.selectedGenres.map((id) => map[id]) || [];
  }

  public genreList: any[] = [];
  public movies: any = {
    items: [],
    count: 0
  };

  public sortOrder: 'releasedate' | 'title' | 'rating' = null;
  public selectedGenres: number[] = [];

  @Watch('$route.query')
  private onQueryChanged(newVal: any, oldVal: any) {
    const { genre, sort } = newVal;
    const isSortEqual = this.sortOrder === sort;
    const isGenresEqual = this.selectedGenres && genre &&
      this.selectedGenres.length === genre.length &&
      this.selectedGenres.every((id) => genre && genre.indexOf(id) > -1);

    if (!isSortEqual || !isGenresEqual) {
      if (genre) {
        this.selectedGenres = (Array.isArray(genre) ? genre : [genre]) || [];
      }

      this.sortOrder = sort;

      this.movies.items = [];
      this.movies.count = 0;
      this.fetchData();
    }
  }

  private mounted() {
    this.sortOrder = this.$route.query.sort as any;
    const genreParams = this.$route.query.genre;

    if (genreParams) {
      if (Array.isArray(genreParams)) {
        this.selectedGenres = genreParams.map((genre) => Number(genre));
      } else {
        this.selectedGenres.push(Number(genreParams));
      }
    }

    this.fetchGenreList();
    this.fetchData();
  }

  private async fetchGenreList() {
    this.genreList = await API.getGenreList();
  }

  private async fetchData() {
    if (this.selectedGenres.length) {
      if (this.sortOrder) {
        const result = await API.getSortedGenreMovies(this.selectedGenres, this.getRange(), this.sortOrder);

        if (result) {
          this.movies.items = this.movies.items.concat(result.items);
          this.movies.count = result.count;
        }
      } else {
        const result = await API.getGenreMovies(this.selectedGenres, this.getRange());

        if (result) {
          this.movies.items = this.movies.items.concat(result.items);
          this.movies.count = result.count;
        }
      }
    }
  }

  private getRange() {
    const count = this.movies.count;
    const length = this.movies.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      return { from, to };
    }
  }
}
