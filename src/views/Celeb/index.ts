import { Component, Vue, Watch } from 'vue-property-decorator';
import MovieList from '@/components/common/MovieList/';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';

@Component({
  components: {
    MovieList,
    Menu,
    Footer
  }
})
export default class Celeb extends Vue {
  @Watch('$route.params.id')
  public onRouteIdChanged(val: string, oldVal: string) {
    if (val !== oldVal) {
      this.fetchData();
    }
  }

  private created() {
    this.fetchData();
  }

  private fetchData() {
    this.$store.dispatch('celebById', this.$route.params.id);
  }

  get celeb() {
    const celeb = this.$store.getters.celebById;
    console.log(celeb);
    return celeb;
  }
}
