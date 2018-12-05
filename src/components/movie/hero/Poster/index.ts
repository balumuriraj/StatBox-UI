import { Component, Prop, Vue } from 'vue-property-decorator';
import Rating from '../Rating';

@Component({
  components: {
    Rating
  }
})
export default class Poster extends Vue {
  @Prop() public imageUrl!: string;
  @Prop() public movieId!: number;
}
