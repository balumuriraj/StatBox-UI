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
  @Prop() public movies!: object[];

  get placeholders() {
    const length = 10;
    const results: object[] = [];

    for (let i = 1; i <= length; i++) {
      results.push({
        id: `placeholder-${i}`
      });
    }

    return results;
  }
}
