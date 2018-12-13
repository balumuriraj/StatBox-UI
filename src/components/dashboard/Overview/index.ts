import { Component, Vue } from 'vue-property-decorator';
import CelebList from '@/components/common/CelebList';
import Chart from '@/components/common/Chart';
import Title from '@/components/common/Title';
import VueWordCloud from 'vuewordcloud';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    CelebList,
    Chart,
    Title,
    VueWordCloud
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

  get ratings() {
    return this.metadata && this.metadata.ratings;
  }

  get maxRating() {
    return this.ratings && this.ratings.length && Math.max(...this.ratings);
  }

  get avgRating() {
    return this.ratings
      && this.ratings.length
      && Math.round(this.ratings.reduce((a, b) => a + b) / this.ratings.length * 100) / 100;
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
