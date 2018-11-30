import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Rating from '../Rating';

@Component({
  components: {
    FontAwesomeIcon,
    Rating
  }
})
export default class Poster extends Vue {
  @Prop() public imageUrl!: string;
  @Prop() public movieId!: number;
}
