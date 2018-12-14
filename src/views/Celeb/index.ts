import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList';
import * as celebStore from '@/store/modules/celeb';

@Component({
  components: {
    MovieList
  }
})
export default class Celeb extends Vue {
  get celeb() {
    return celebStore.getCelebData(this.$store);
  }

  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  public fetchMovies(firstFetch?: boolean) {
    celebStore.fetchCelebMovies(this.$store, { id: this.$route.params.id, firstFetch });
  }

  private mounted() {
    this.fetchData();
  }

  private fetchData() {
    celebStore.fetchCelebData(this.$store, { id: this.$route.params.id });
    this.fetchMovies(true);
  }
}
