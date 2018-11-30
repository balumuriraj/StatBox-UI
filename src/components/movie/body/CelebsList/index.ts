import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '../Title';

@Component({
  components: {
    Title
  }
})
export default class CelebsList extends Vue {
  @Prop() public title!: string;
  @Prop() public celebs!: object[];
 }
