import { Component, Prop, Vue } from 'vue-property-decorator';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import * as movieStore from '@/store/modules/movie';

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class Rating extends Vue {
  @Prop() public movieId!: number;

  private hoverVal: number = 0;

  get value() {
    return movieStore.userRating(this.$store);
  }

  get hoverValue() {
    return this.hoverVal;
  }

  get ratings() {
    return [
      { value: 0.5, tooltip: 'It\'s the worst!', flip: null, shift: 'grow-10 right-10' },
      { value: 1, tooltip: 'I do not like it', flip: 'vertical', shift: 'grow-10 rotate-180 left-10' },
      { value: 1.5, tooltip: 'It\'s not interesting', flip: null, shift: 'grow-10 right-10' },
      { value: 2, tooltip: 'It\'s not much.', flip: 'vertical', shift: 'grow-10 rotate-180 left-10' },
      { value: 2.5, tooltip: 'I\'m short', flip: null, shift: 'grow-10 right-10' },
      { value: 3, tooltip: 'It\'s normal', flip: 'vertical', shift: 'grow-10 rotate-180 left-10' },
      { value: 3.5, tooltip: 'I can see it', flip: null, shift: 'grow-10 right-10' },
      { value: 4, tooltip: 'it\'s fun', flip: 'vertical', shift: 'grow-10 rotate-180 left-10' },
      { value: 4.5, tooltip: 'It\'s great', flip: null, shift: 'grow-10 right-10' },
      { value: 5, tooltip: 'It is the best!', flip: 'vertical', shift: 'grow-10 rotate-180 left-10' }
    ];
  }

  public mouseover(index: number) {
    this.hoverVal = index;
  }

  public mouseout(index: number) {
    this.hoverVal = 0;
  }

  public async setRating(rating: number) {
    await movieStore.updateReview(this.$store, {
      review: {
        movieId: this.movieId,
        rating
      }
     });
  }
}
