import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MovieCard extends Vue {
  @Prop() public movie: any;

  get year() {
    const date = this.movie && new Date(this.movie.releaseDate);
    return date.getFullYear();
  }
}
