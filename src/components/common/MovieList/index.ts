import { Component, Prop, Vue } from 'vue-property-decorator';
import MovieCard from '@/components/common/MovieCard/';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

@Component({
  components: {
    MovieCard,
    FontAwesomeIcon
  }
})
export default class List extends Vue {
  @Prop() public title!: string;

  private created() {
    this.$store.dispatch('allMovies');
  }

  get movies() {
    return this.$store.getters.allMovies;
  }
}
