import { Component, Vue } from 'vue-property-decorator';
import Footer from '../../components/common/Footer';
import CelebsList from '../../components/movie/CelebsList';

@Component({
  components: {
    CelebsList,
    Footer
  }
})
export default class Movie extends Vue {

  private created() {
    this.$store.dispatch('movieById', this.$route.params.id);
  }

  get movie() {
    return this.$store.getters.movieById;
  }

  get cert() {
    const movie = this.$store.getters.movieById;
    return (movie && movie.cert) || 'N/A';
  }

  get description() {
    const movie = this.$store.getters.movieById;

    if (movie) {
      let description = movie.description;

      if (description && description.length > 300) {
        description = description.substring(0, 300) + '...';
      }

      return description;
    }
  }

  get cast() {
    const movie = this.$store.getters.movieById;
    const cast = movie && movie.cast;

    if (cast) {
      return cast.slice(0, 4);
    }
  }

  get crew() {
    const movie = this.$store.getters.movieById;
    const crew = movie && movie.crew;

    if (crew) {
      return crew.slice(0, 2);
    }
  }
}
