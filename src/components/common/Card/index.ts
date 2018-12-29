import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() public item: any;

  get isMovie() {
    return this.item && 'title' in this.item;
  }

  get year() {
    if (this.isMovie) {
      return this.item && this.item.releaseDate && (new Date(this.item.releaseDate)).getFullYear();
    } else {
      return this.item && this.item.dob && (new Date(this.item.dob)).getFullYear();
    }
  }

  get rating() {
    return this.item && this.item.rating && Math.round(this.item.rating * 100) / 100;
  }

  get userRating() {
    // console.log(this.item);
    return this.item && this.item.userReview && this.item.userReview.rating;
  }
}
