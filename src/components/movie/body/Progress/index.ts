import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
  @Prop() public value!: number;
  @Prop() public value1!: number;
  @Prop() public value2!: number;
  @Prop() public type!: string;

  public getClass() {
    const value = this.value;
    return {
      'is-success': value > 50,
      'is-warning': value > 25 && value <= 50,
      'is-danger': value <= 25
    };
  }

  get isStacked() {
    return this.type === 'stacked';
  }
}
