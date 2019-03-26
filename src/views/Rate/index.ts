import { Component, Vue, Watch } from 'vue-property-decorator';
import RateList from '@/components/common/RateList';
import MovieFilter from '@/components/common/Filter';
import * as API from '@/api';
import * as authStore from '@/store/modules/auth';

async function setReview(userId: number, movie: any, review: any) {
  const result = await API.updateReview({ userId, ...review });
  const { rating, watchWith, pace, story, rewatch } = result;
  movie.userReview = { rating, watchWith, pace, story, rewatch };
}

async function setFavorite(userId: number, movie: any, value: boolean) {
  if (value) {
    const result = await API.addFavorite(userId, movie.id);
    movie.isFavorite = result;
  } else {
    const result = await API.removeFavorite(userId, movie.id);
    movie.isFavorite = result;
  }
}

async function setBookmark(userId: number, movie: any, value: boolean) {
  if (value) {
    const result = await API.addBookmark(userId, movie.id);
    movie.isBookmarked = result;
  } else {
    const result = await API.removeBookmark(userId, movie.id);
    movie.isBookmarked = result;
  }
}

@Component({
  components: {
    RateList,
    MovieFilter
  }
})
export default class Rate extends Vue {
  get user() {
    return authStore.getUser(this.$store);
  }

  get userId() {
    return this.user && this.user.id;
  }

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

  private async fetchGenreList() {
    this.genreList = await API.getGenreList();
  }

  private async fetchData() {
    if (this.selectedGenres.length) {
      if (this.sortOrder) {
        const result = await API.getSortedGenreMovies(this.selectedGenres, this.getRange(), this.sortOrder, true);
        this.processResult(result);
      } else {
        const result = await API.getGenreMovies(this.selectedGenres, this.getRange(), true);
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
      const items = result.items.map((item: any) => {
        item.setReview = setReview.bind(item, this.userId, item);
        item.setFavorite = setFavorite.bind(item, this.userId, item);
        item.setBookmark = setBookmark.bind(item, this.userId, item);
        return item;
      });

      const unrated = items && items.filter((movie: any) => !(movie.userReview && movie.userReview.rating));
      const rated = items && items.filter((movie: any) => (movie.userReview && movie.userReview.rating));

      this.movies.items = this.movies.items.concat(unrated);
      this.movies.ratedItems = this.movies.ratedItems.concat(rated);
      this.movies.count = result.count;
    }
  }
}
