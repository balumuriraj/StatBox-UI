import { Component, Vue } from 'vue-property-decorator';
import MovieCard from '@/components/common/MovieCard/';

@Component({
  components: {
    MovieCard
  }
})
export default class List extends Vue {
  private created() {
    this.$store.dispatch('allMovies');
  }

  get movies() {
    return this.$store.getters.allMovies;
  }
}
