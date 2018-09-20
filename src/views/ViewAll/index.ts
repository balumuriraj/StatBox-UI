import { Component, Prop, Vue } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList/';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';

@Component({
  components: {
    Menu,
    Footer,
    MovieList
  }
})
export default class ViewAll extends Vue {
  @Prop() public movies!: object[];
  @Prop() public count!: number;
}
