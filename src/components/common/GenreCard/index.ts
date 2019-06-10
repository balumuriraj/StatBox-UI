import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GenreCard extends Vue {
  @Prop() public item: any;
}
