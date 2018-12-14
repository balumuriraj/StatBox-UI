import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MovieCard from '@/components/common/MovieCard';
import EmptyBox from '@/components/common/EmptyBox';

@Component({
  components: {
    MovieCard,
    EmptyBox
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
    this.loading = false;

    const elm = this.$refs.listBox as Element;
    const elmHeight = elm.clientHeight;

    if (elmHeight <=  window.innerHeight && (val < this.count)) {
      this.loading = true;
      this.$emit('fetch');
    }
  }

  private mounted() {
    window.addEventListener('scroll', () => {
      if (!this.loading) {
        const isBottom = this.isScrollBottom();

        if (isBottom && (this.movies.length < this.count)) {
          this.loading = true;
          this.$emit('fetch');
        }
      }
    });
  }

  private isScrollBottom(): boolean {
    const { documentElement: elm, body } = document;
    const totalHeight = elm.scrollHeight;
    const clientHeight = elm.clientHeight;
    const scrollTop = (body && body.scrollTop) ? body.scrollTop : elm.scrollTop;

    return totalHeight === scrollTop + clientHeight;
  }
}
