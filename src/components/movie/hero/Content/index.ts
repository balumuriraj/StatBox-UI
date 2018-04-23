import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class Content extends Vue {
  @Prop() public movie!: any;

  get cert() {
    const movie = this.movie;
    return (movie && movie.cert) || 'N/A';
  }

  get description() {
    const movie = this.movie;

    if (movie) {
      let description = movie.description;

      if (description && description.length > 300) {
        description = description.substring(0, 300) + '...';
      }

      return description;
    }
  }
}
