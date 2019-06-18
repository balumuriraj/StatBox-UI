import { Component, Vue, Watch } from 'vue-property-decorator';
import Poll from '@/components/common/Poll';
import EmptyBox from '@/components/common/EmptyBox';
import * as API from '@/api';
import Catch from '@/decorators/Catch';
import { getRange } from '@/support/utils';

@Component({
  components: {
    Poll,
    EmptyBox
  }
})
export default class Polls extends Vue {
  get currentCount(): number {
    return this.items.length;
  }
  public items: any = [];
  public count: any = [];
  public loading: boolean = false;

  public metaInfo(): any {
    return {
      title: 'Polls'
    };
  }

  @Watch('currentCount')
  public onCurrentCountChange(val: number, oldVal: number) {
    this.loading = false;

    const elm = this.$refs.listBox as Element;
    const elmHeight = elm.clientHeight;

    if (elmHeight <=  window.innerHeight && (val < this.count)) {
      this.loading = true;
      this.fetch();
    }
  }

  @Catch
  private async fetch() {
    const result = await API.getPolls(getRange({ items: this.items, count: this.count }));

    if (result) {
      this.items = this.items.concat(result.items);
      this.count = result.count;
    }
  }

  private async mounted() {
    window.addEventListener('scroll', () => {
      if (!this.loading) {
        const isBottom = this.isScrollBottom();

        if (isBottom && (this.items.length < this.count)) {
          this.loading = true;
          this.fetch();
        }
      }
    });

    this.items = [];
    this.count = 0;
    await this.fetch();
  }

  private isScrollBottom(): boolean {
    const { documentElement: elm, body } = document;
    const totalHeight = elm.scrollHeight;
    const clientHeight = elm.clientHeight;
    const scrollTop = (body && body.scrollTop) ? body.scrollTop : elm.scrollTop;

    return totalHeight === scrollTop + clientHeight;
  }
}
