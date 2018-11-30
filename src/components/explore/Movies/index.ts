import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import * as homeStore from '@/store/modules/home';
import * as genreStore from '@/store/modules/genre';

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
      this.fetchData();
    }
  }

  public fetchMovies() {
    if (this.name === 'genre') {
      genreStore.fetchGenreMovies(this.$store, { id: Number(this.id) });
      this.fetchMovies();
    } else if (this.name === 'movies') {
      if (this.id === 'latest') {
        homeStore.fetchLatest(this.$store);
      } else if (this.id === 'upcoming') {
        homeStore.fetchUpcoming(this.$store);
      }
    } else if (this.name === 'years') {
      if (this.id === 'recent') {
        const date = new Date(2015);
        const startDate = date.getTime();
        const endDate = Date.now();
        homeStore.fetchMoviesByDates(this.$store, { name: 'recent', startDate, endDate });
      }
    }
  }

  private created() {
    this.id = this.$route.params.id;
    this.name = this.$route.name as string;
    this.fetchData();
  }

  private fetchData() {
    if (this.name === 'genre') {
      genreStore.fetchGenreData(this.$store, { id: Number(this.id) });
      genreStore.fetchGenreMovies(this.$store, { id: Number(this.id) });
    } else if (this.name === 'movies') {
      if (this.id === 'latest') {
        homeStore.fetchLatest(this.$store);
      } else if (this.id === 'upcoming') {
        homeStore.fetchUpcoming(this.$store);
      }
    } else if (this.name === 'years') {
      if (this.id === 'recent') {
        const date = new Date('2015');
        const startDate = date.getTime();
        const endDate = Date.now();
        homeStore.fetchMoviesByDates(this.$store, { name: 'recent', startDate, endDate });
      }
    }
  }

  get item() {
    if (this.name === 'genre') {
      return genreStore.getCurrentGenre(this.$store);
    } else if (this.name === 'movies') {
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
      }
    } else if (this.name === 'years') {
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

  }

  get movies() {
    return this.item && this.item.movies;
  }
}
