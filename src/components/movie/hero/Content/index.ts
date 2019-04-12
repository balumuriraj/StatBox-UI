import { Component, Prop, Vue } from 'vue-property-decorator';
import { EventBus } from '@/events';

@Component
export default class Content extends Vue {
  @Prop() public movie!: any;

  public setReview() {
    EventBus.$emit('toggleModal', this.movie);
  }
}
