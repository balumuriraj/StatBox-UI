import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Table extends Vue {
  @Prop() public headers!: string[];
  @Prop() public rows!: object[];
 }
