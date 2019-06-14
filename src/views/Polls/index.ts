import { Component, Vue, Watch } from 'vue-property-decorator';
import Poll from '@/components/common/Poll';
import * as API from '@/api';
import Catch from '@/decorators/Catch';

@Component({
  components: {
    Poll
  }
})
export default class Polls extends Vue {
  public polls: any = [];

  public metaInfo(): any {
    return {
      title: 'Polls'
    };
  }

  @Catch
  private async loadData() {
    this.polls.push({
      id: 1,
      title: 'Best movie of 2018',
      totalVotes: 9,
      movies: [
        {
          id: 192,
          title: 'Baahubhali',
          poster: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/192.jpg',
          rating: 4.25,
          votes: 9
        },
        {
          id: 2,
          title: 'Rangasstalam',
          poster: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/24.jpg',
          rating: 4,
          votes: 0
        },
        {
          id: 150,
          title: 'Temper',
          poster: 'https://storage.googleapis.com/statbox89.appspot.com/images/posters/150.jpg',
          rating: 3,
          votes: 0
        }
      ]
    });
  }

  private async mounted() {
    await this.loadData();
  }
}
