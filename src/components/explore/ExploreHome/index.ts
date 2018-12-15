import { Component, Vue } from 'vue-property-decorator';
import * as genreStore from '@/store/modules/genre';

@Component
export default class ExploreHome extends Vue {
  private created() {
    this.fetchData();
  }

  private fetchData() {
    genreStore.fetchGenreList(this.$store);
  }

  get exploreList() {
    return [
      {
        url: '/explore/latest',
        name: 'Latest',
        image: 'latest.jpg'
      },
      {
        url: '/explore/upcoming',
        name: 'Upcoming',
        image: 'upcoming.jpg'
      },
      {
        url: '/explore/trending',
        name: 'Trending',
        image: 'trending.jpg'
      },
      {
        url: '/explore/toprated',
        name: 'Top Rated',
        image: 'toprated.jpg'
      }
    ];
  }

  get yearsList() {
    return [
      {
        url: '/explore/years/recent',
        name: 'Recent',
        image: 'recent.jpg'
      },
      {
        url: '/explore/years/2010-2015',
        name: '2010-2015',
        image: '2010-2015.jpg'
      },
      {
        url: '/explore/years/2000-2010',
        name: '2000-2010',
        image: '2000-2010.jpg'
      },
      {
        url: '/explore/years/1990-2000',
        name: '1990-2000',
        image: '1990-2000.jpg'
      }
    ];
  }

  get topGenreList() {
    const list = genreStore.getGenreList(this.$store);
    const newList = list && list.items.map((item) => {
      return {
        url: '/explore/genre/' + item.id,
        name: item.name,
        image: 'latest.jpg',
        count: item.moviesCount
      };
    });
    newList.sort((a: any, b: any) => b.count - a.count);

    return newList.slice(0, 4);
  }

  get restGenreList() {
    const list = genreStore.getGenreList(this.$store);
    const newList = list && list.items.slice(0);
    newList.sort((a: any, b: any) => b.moviesCount - a.moviesCount);

    return newList.slice(4);
  }
}
