import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/common/Title';
import EmptyBox from '@/components/common/EmptyBox';

@Component({
  components: {
    Title,
    EmptyBox
  }
})
export default class CelebList extends Vue {
  @Prop() public title!: string;
  @Prop() public subtitle!: string;
  @Prop() public celebs!: object[];

  public scrollRight() {
    const container = this.$refs.celebsBox as Element;
    container.scrollLeft += 200;
  }

  public scrollLeft() {
    const container = this.$refs.celebsBox as Element;
    container.scrollLeft -= 200;
  }
}
