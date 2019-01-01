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
}
