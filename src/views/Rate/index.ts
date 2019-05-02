import { Component, Vue, Watch } from 'vue-property-decorator';
import RateList from '@/components/common/RateList';
import MovieFilter from '@/components/common/MovieFilter';
import * as API from '@/api';
import Catch from '@/decorators/Catch';

@Component({
  components: {
    RateList,
    MovieFilter
  }
})
export default class Rate extends Vue {
  get selectedGenreNames() {
    const items = this.genreList;
    const map: any = {};
    items.forEach((item) => {
      map[item.id] = item.name;
    });

    return this.selectedGenres && this.selectedGenres.map((id) => map[id]) || [];
  }

  public genreList: any[] = [];
  public sortOrder: 'releasedate' | 'title' | 'rating' = null;
  public selectedGenres: number[] = [];
  public movies: any = {
    items: [],
    ratedItems: [],
    count: 0
  };

  @Watch('$route.query')
  private onQueryChanged(newVal: any, oldVal: any) {
    const { genre, sort } = newVal;
    const isSortEqual = this.sortOrder === sort;
    const isGenresEqual =
      this.selectedGenres.length === genre.length &&
      this.selectedGenres.every((id) => genre && genre.indexOf(id) > -1);

    if (!isSortEqual || !isGenresEqual) {
      this.selectedGenres = (genre && Array.isArray(genre) ? genre : [genre]) || [];
      this.sortOrder = sort;

      this.movies.items = [];
      this.movies.ratedItems = [];
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

  @Catch
  private async fetchGenreList() {
    this.genreList = await API.getGenreList();
  }

  @Catch
  private async fetchData() {
    if (this.selectedGenres.length) {
      if (this.sortOrder) {
        const result =
          await API.getSortedGenreMovies(this.selectedGenres, this.getRange(), this.sortOrder);
        this.processResult(result);
      } else {
        const result = await API.getGenreMovies(this.selectedGenres, this.getRange());
        this.processResult(result);
      }
    }
  }

  private getRange() {
    const count = this.movies.count;
    const length = this.movies.items.length + this.movies.ratedItems.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      return { from, to };
    }
  }

  private processResult(result: any) {
    if (result) {
      const items = [...result.items];
      const unrated = items && items.filter((movie: any) => !(movie.userReview && movie.userReview.rating));
      const rated = items && items.filter((movie: any) => (movie.userReview && movie.userReview.rating));

      this.movies.items = this.movies.items.concat(unrated);
      this.movies.ratedItems = this.movies.ratedItems.concat(rated);
      this.movies.count = result.count;
    }
  }
}
