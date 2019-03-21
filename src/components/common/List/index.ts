import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Card from '@/components/common/Card';
import EmptyBox from '@/components/common/EmptyBox';

@Component({
  components: {
    Card,
    EmptyBox
  }
})
export default class List extends Vue {
  @Prop() public title!: string;
  @Prop() public items!: object[];
  @Prop() public count!: number;

  public processedItems: object[] = [];
  public loading: boolean = false;

  get currentCount(): number {
    return this.items.length;
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

  @Watch('items')
  private onItemsChange(val: any[], oldVal: any[]) {
    this.processedItems = [];
    let set = new Set();

    for (const obj of val) {
      if (!set.has(obj.id)) {
        this.processedItems.push(obj);
        set.add(obj.id);
      }
    }

    set.clear();
    set = null;
  }

  private mounted() {
    window.addEventListener('scroll', () => {
      if (!this.loading) {
        const isBottom = this.isScrollBottom();

        if (isBottom && (this.items.length < this.count)) {
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
