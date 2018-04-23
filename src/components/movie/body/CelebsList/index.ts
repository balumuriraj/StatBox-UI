import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CelebsList extends Vue {
  @Prop() public title!: string;
  @Prop() public celebs!: object[];
 }
