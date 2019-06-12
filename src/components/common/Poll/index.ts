import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Poll extends Vue {
  @Prop() public item: any;
}
