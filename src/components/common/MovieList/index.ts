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
  @Prop() public movies!: object[];
  @Prop() public count!: number;

  get placeholders() {
    const length = this.count || 6;
    const results: object[] = [];

    for (let i = 1; i <= length; i++) {
      results.push({
        id: `placeholder-${i}`
      });
    }

    return results;
  }
}
