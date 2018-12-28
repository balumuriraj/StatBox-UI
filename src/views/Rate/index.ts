import { Component, Vue, Watch } from 'vue-property-decorator';
import RateList from '@/components/common/RateList';
import * as API from '@/api';
import * as authStore from '@/store/modules/auth';
import { getGenreIdByName } from '@/support/utils';

async function setReview(userId: number, movie: any, review: any) {
  const result = await API.updateReview({ userId, ...review});
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
    RateList
  }
})
export default class Rate extends Vue {
  get user() {
    return authStore.getUser(this.$store);
  }

  get userId() {
    return this.user && this.user.id;
  }

  public selected = 'popular';
  public selectedYears = 'recent';
  public selectedGenre = 'action';

  public movies: any = {
    items: [],
    ratedItems: [],
    count: 0
  };

  public fetchMovies() {
    switch (this.selected) {
      case 'popular': {
        return this.fetchPopular();
      }
      case 'years': {
        return this.fetchMoviesByYears();
      }
      case 'genre': {
        return this.fetchMoviesByGenre();
      }
    }
  }

  @Watch('selected')
  private onSelectedChange(val: number, oldVal: number) {
    this.refresh();
  }

  @Watch('selectedYears')
  private onSelectedYearsChange(val: number, oldVal: number) {
    this.refresh();
  }

  @Watch('selectedGenre')
  private onSelectedGenreChange(val: number, oldVal: number) {
    this.refresh();
  }

  private refresh() {
    this.movies = {
      items: [],
      ratedItems: [],
      count: 0
    };

    this.fetchMovies();
  }

  private getRange() {
    const count = this.movies.count;
    const length = this.movies.items.length + this.movies.ratedItems.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      return {from, to};
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

  private async fetchPopular() {
    const range = this.getRange();

    if (range) {
      const result = await API.getPopularMovies(range, true);
      this.processResult(result);
    }
  }

  private fetchMoviesByYears() {
    switch (this.selectedYears) {
      case 'recent': {
        const date = new Date('2016');
        const startDate = date.getTime();
        const endDate = Date.now();
        return this.fetchMoviesByDates(startDate, endDate);
      }
      case '2011-15': {
        const date1 = new Date('2011');
        const startDate = date1.getTime();
        const date2 = new Date('2016');
        const endDate = date2.getTime();
        return this.fetchMoviesByDates(startDate, endDate);
      }
      case '2006-10': {
        const date1 = new Date('2005');
        const startDate = date1.getTime();
        const date2 = new Date('2011');
        const endDate = date2.getTime();
        return this.fetchMoviesByDates(startDate, endDate);
      }
      case '2000-05': {
        const date1 = new Date('2000');
        const startDate = date1.getTime();
        const date2 = new Date('2006');
        const endDate = date2.getTime();
        return this.fetchMoviesByDates(startDate, endDate);
      }
    }
  }

  private async fetchMoviesByDates(startDate: number, endDate: number) {
    const range = this.getRange();

    if (range) {
      const result = await API.getMoviesBetweenDates(startDate, endDate, range, true);
      this.processResult(result);
    }
  }

  private async fetchMoviesByGenre() {
    const id = getGenreIdByName(this.selectedGenre);

    if (id) {
      const range = this.getRange();

      if (range) {
        const result = await API.getGenreMovies(id, range, true);
        this.processResult(result);
      }
    }
  }

  private mounted() {
    this.fetchMovies();
  }
}
