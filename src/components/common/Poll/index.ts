import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Poll extends Vue {
  @Prop() public item: any;

  public showResults: boolean = false;
  public isVoted: boolean = false;
}
