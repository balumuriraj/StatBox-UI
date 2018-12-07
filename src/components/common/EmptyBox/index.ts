import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EmptyBox extends Vue {
  @Prop() public text!: string;
}
