import { Component, Vue, Watch } from 'vue-property-decorator';
import List from '@/components/common/List';
import MovieFilter from '@/components/common/MovieFilter';
import * as API from '@/api';
import Catch from '@/decorators/Catch';

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
  public selectedYears: number[] = [];

  @Watch('$route.query')
  private onQueryChanged(newVal: any, oldVal: any) {
    const { genre, sort, year } = newVal;
    const isSortEqual = this.sortOrder === sort;
    const isGenresEqual = this.selectedGenres && genre &&
      this.selectedGenres.length === genre.length &&
      this.selectedGenres.every((id) => genre && genre.indexOf(id) > -1);
    const isYearsEqual = this.selectedYears && year &&
      this.selectedYears.length === year.length &&
      this.selectedYears.every((id) => year && year.indexOf(id) > -1);

    if (!isSortEqual || !isGenresEqual || !isYearsEqual) {
      if (genre) {
        this.selectedGenres = (Array.isArray(genre) ? genre : [genre]) || [];
      }

      if (year) {
        this.selectedYears = (Array.isArray(year) ? year : [year]) || [];
      }

      this.sortOrder = sort;
      this.selectedGenres.sort();
      this.selectedYears.sort();

      this.movies.items = [];
      this.movies.count = 0;
      this.fetchData();
    }
  }

  @Catch
  private async mounted() {
    this.sortOrder = this.$route.query.sort as any;
    const genreParams = this.$route.query.genre;

    if (genreParams) {
      if (Array.isArray(genreParams)) {
        this.selectedGenres = genreParams.map((genre) => Number(genre));
      } else {
        this.selectedGenres.push(Number(genreParams));
      }
    }

    const yearParams = this.$route.query.year;

    if (yearParams) {
      if (Array.isArray(yearParams)) {
        this.selectedYears = yearParams.map((year) => Number(year));
      } else {
        this.selectedYears.push(Number(yearParams));
      }
    }

    this.selectedGenres.sort();
    this.selectedYears.sort();

    await this.fetchGenreList();
    await this.fetchData();
  }

  @Catch
  private async fetchGenreList() {
    this.genreList = await API.getGenreList();
  }

  @Catch
  private async fetchData() {
    const result = await API.getMoviesByFilter(
      this.selectedGenreNames, this.selectedYears, this.sortOrder, this.getRange()
    );

    if (result) {
      this.movies.items = this.movies.items.concat(result.items);
      this.movies.count = result.count;
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
