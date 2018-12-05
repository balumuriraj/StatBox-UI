import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/common/Title';

@Component({
  components: {
    Title
  }
})
export default class CelebList extends Vue {
  @Prop() public title!: string;
  @Prop() public subtitle!: string;
  @Prop() public celebs!: object[];
 }
