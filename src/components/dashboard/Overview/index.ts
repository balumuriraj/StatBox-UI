import { Component, Vue } from 'vue-property-decorator';
import CelebList from '@/components/common/CelebList';
import Chart from '@/components/common/Chart';
import Title from '@/components/common/Title';
import EmptyBox from '@/components/common/EmptyBox';
import VueWordCloud from 'vuewordcloud';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    CelebList,
    Chart,
    Title,
    VueWordCloud,
    EmptyBox
  }
})
export default class Overview extends Vue {
  get user() {
    return authStore.getUser(this.$store);
  }

  get metadata() {
    return this.user.metadata;
  }

  get movieHours() {
    return this.metadata && Math.round(this.metadata.movieMinutes / 60);
  }

  get moviesCount() {
    return this.metadata && this.metadata.moviesCount;
  }

  get ratingBins() {
    return this.metadata && this.metadata.ratingBins;
  }

  get maxRating() {
    const ratings = this.ratingBins &&
      Object.keys(this.ratingBins).map((rating) => Number(rating)).filter((rating) => this.ratingBins[rating]);
    return ratings && ratings.length && Math.max(...ratings) || 0;
  }

  get avgRating() {
    let ratingsTotal = 0;
    let countTotal = 0;

    if (this.ratingBins) {
      for (const rating in this.ratingBins) {
        if (this.ratingBins[rating]) {
          const count = this.ratingBins[rating];
          countTotal += count;
          ratingsTotal += (Number(rating) * count);
        }
      }

      return countTotal && Math.round(ratingsTotal / countTotal * 100) / 100;
    }

    return 0;
  }

  get directors() {
    return this.metadata.topDirectors;
  }

  get actors() {
    return this.metadata.topActors;
  }

  get genres() {
    return this.metadata.genres.map((obj) => [obj.name, obj.count]);
  }
}
