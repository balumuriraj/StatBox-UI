import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  @Prop() public count!: number;

  public loading: boolean = false;

  get currentCount(): number {
    return this.movies.length;
  }

  @Watch('currentCount')
  public onCurrentCountChange(val: number, oldVal: number) {
    console.log(oldVal, val, this.count);
    this.loading = false;
  }

  private mounted() {
    window.onscroll = () => {
      if (!this.loading) {
        console.log('length, count', this.movies.length, this.count);

        const pageHeight = document.documentElement.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition =
          window.scrollY ||
          window.pageYOffset ||
          document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

        const isBottom = pageHeight <= windowHeight + scrollPosition;

        if (isBottom && (this.movies.length < this.count)) {
          this.loading = true;
          this.$emit('fetch');
        }
      }
    };
  }
}
