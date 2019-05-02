import { Component, Prop, Vue } from 'vue-property-decorator';
import Catch from '@/decorators/Catch';

@Component
export default class Rating extends Vue {
  @Prop() public movie!: any;

  private hoverVal: number = 0;

  get value(): number {
    return this.movie && this.movie.userReview && this.movie.userReview.rating;
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

  @Catch
  public async setRating(rating: number) {
    if ('setReview' in this.movie) {
      await this.movie.setReview({
        movieId: this.movie.id,
        rating,
        watchWith: this.movie && this.movie.userReview && this.movie.userReview.watchWith || null,
        pace: this.movie && this.movie.userReview && this.movie.userReview.pace || null,
        story: this.movie && this.movie.userReview && this.movie.userReview.story || null,
        rewatch: this.movie && this.movie.userReview && this.movie.userReview.rewatch || null
      });
    }
  }
}
