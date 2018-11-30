import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class MovieCard extends Vue {
  @Prop() public movie: any;

  get year() {
    const date = this.movie && new Date(this.movie.releaseDate);
    console.log(this.movie);
    return date.getFullYear();
  }
}
