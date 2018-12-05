import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Title extends Vue {
  @Prop() public name!: string;
  @Prop() public subtitle!: string;
}
