import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import * as homeStore from '@/store/modules/home';

@Component({
  components: {
    MovieList
  }
})
export default class Years extends Vue {
  public id = '';
  public name = '';

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchMovies();
    }
  }

  public fetchMovies() {
    let startDate = 0;
    let endDate = 0;
    let name = '';

    if (this.id === 'recent') {
      name = 'recent';
      const date = new Date('2015');
      startDate = date.getTime();
      endDate = Date.now();
    } else if (this.id === '2010-2015') {
      name = 'from2010to2015';
      const date1 = new Date('2010');
      startDate = date1.getTime();
      const date2 = new Date('2015');
      endDate = date2.getTime();
    } else if (this.id === '2000-2010') {
      name = 'from2000to2010';
      const date1 = new Date('2000');
      startDate = date1.getTime();
      const date2 = new Date('2010');
      endDate = date2.getTime();
    } else if (this.id === '1990-2000') {
      name = 'from1990to2000';
      const date1 = new Date('1990');
      startDate = date1.getTime();
      const date2 = new Date('2000');
      endDate = date2.getTime();
    }

    if (startDate && endDate) {
      homeStore.fetchMoviesByDates(this.$store, { name, startDate, endDate });
    }
  }

  private mounted() {
    this.id = this.$route.params.id;
    this.name = this.$route.name as string;
    this.fetchMovies();
  }

  get recent() {
    return homeStore.getRecent(this.$store);
  }

  get from2010to2015() {
    return homeStore.get2010to2015(this.$store);
  }

  get from2000to2010() {
    return homeStore.get2000to2010(this.$store);
  }

  get from1990to2000() {
    return homeStore.get1990to2000(this.$store);
  }
}
