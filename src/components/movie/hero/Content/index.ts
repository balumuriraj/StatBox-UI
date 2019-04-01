import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Content extends Vue {
  @Prop() public movie!: any;

  public setReview() {
    this.$store.dispatch('toggleModal', { movie: this.movie });
  }
}
