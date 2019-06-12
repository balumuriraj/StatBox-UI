import { Component, Vue } from 'vue-property-decorator';
import * as API from '@/api';
import Catch from '@/decorators/Catch';

@Component
export default class MovieMixin extends Vue {
  public id: number = null;
  public title: string = null;
  public releaseDate: Date = null;
  public year: number = null;
  public rating: number = null;
  public ratingsCount: number = null;
  public runtime: number = null;
  public poster: string = null;
  public genre: string[] = null;
  public cert: string = null;

  // Movie Metdata
  public cast: any = null;
  public crew: any = null;
  public ratingBins: any = null;
  public attributes: any = null;
  public streams: any = null;

  // user Metadata
  public isFavorite: boolean = null;
  public isBookmarked: boolean = null;
  public isReviewed: boolean = null;
  public userReview: any = null;

  [key: string]: any;

  public setProperties(obj: any) {
    for (const prop in obj) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = obj[prop];

        if (prop === 'releaseDate' && this.releaseDate) {
          this.year = new Date(this.releaseDate).getFullYear();
        }
      }
    }
  }

  @Catch
  public async setReview(review: any) {
    const prevReview = { ...this.userReview };

    try {
      const { rating, watchWith, pace, story, rewatch } = review;
      this.userReview = { rating, watchWith, pace, story, rewatch };
      this.isReviewed = !!(watchWith || pace || story || rewatch);
      const result = await API.updateReview({ ...review });
    } catch (err) {
      this.userReview = prevReview;
      const { watchWith, pace, story, rewatch } = this.userReview;
      this.isReviewed = !!(watchWith || pace || story || rewatch);
      throw err;
    }
  }

  @Catch
  public async setFavorite(value: boolean) {
    this.isFavorite = value;

    try {
      if (value) {
        this.isFavorite = await API.addFavorite(this.id);
      } else {
        this.isFavorite = await API.removeFavorite(this.id);
      }
    } catch (err) {
      this.isFavorite = !this.isFavorite;
      throw err;
    }
  }

  @Catch
  public async setBookmark(value: boolean) {
    this.isBookmarked = value;

    try {
      if (value) {
        this.isBookmarked = await API.addBookmark(this.id);
      } else {
        this.isBookmarked = await API.removeBookmark(this.id);
      }
    } catch (err) {
      this.isBookmarked = !this.isBookmarked;
      throw err;
    }
  }
}
