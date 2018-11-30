import { Component, Vue } from 'vue-property-decorator';
import * as genreStore from '@/store/modules/genre';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class ExploreHome extends Vue {
  private created() {
    this.fetchData();
  }

  private fetchData() {
    console.log('fetching GenreList....');
    genreStore.fetchGenreList(this.$store);
  }

  get exploreList() {
    return [
      {
        url: '/explore/latest',
        name: 'Latest',
        image: 'https://cdn.guidingtech.com/imager/media/assets/Stunning-2018-Upcoming-Games-Wallpapers-12_acdb3e4bb37d0e3bcc26c97591d3dd6b.jpg'
      },
      {
        url: '/explore/upcoming',
        name: 'Upcoming',
        image: 'https://hdwallpaperim.com/wp-content/uploads/2017/08/25/463863-abstract-Superman_The_Movie-748x468.jpg'
      },
      {
        url: '/explore/trending',
        name: 'Trending',
        image: 'http://www.portoalegre.travel/upload/s/88/886039_avatar-movie-wallpaper.jpg'
      },
      {
        url: '/explore/toprated',
        name: 'Top Rated',
        image: 'https://4.bp.blogspot.com/-mjtvJw6t-3Q/Wia0VcSCLQI/AAAAAAAAHMc/H8bLXuGWAJsDQydCJ2Aex8H-EYCxd3aEgCLcBGAs/s1600/a512b900a11c1fe052555521dad12f92.jpg'
      }
    ];
  }

  get yearsList() {
    return [
      {
        url: '/explore/years/recent',
        name: 'Recent',
        image: 'https://cdn.guidingtech.com/imager/media/assets/Stunning-2018-Upcoming-Games-Wallpapers-12_acdb3e4bb37d0e3bcc26c97591d3dd6b.jpg'
      },
      {
        url: '/explore/years/2010-2015',
        name: '2010-2015',
        image: 'https://hdwallpaperim.com/wp-content/uploads/2017/08/25/463863-abstract-Superman_The_Movie-748x468.jpg'
      },
      {
        url: '/explore/years/2000-2010',
        name: '2000-2010',
        image: 'http://www.portoalegre.travel/upload/s/88/886039_avatar-movie-wallpaper.jpg'
      },
      {
        url: '/explore/years/1990-2000',
        name: '1990-2000',
        image: 'https://4.bp.blogspot.com/-mjtvJw6t-3Q/Wia0VcSCLQI/AAAAAAAAHMc/H8bLXuGWAJsDQydCJ2Aex8H-EYCxd3aEgCLcBGAs/s1600/a512b900a11c1fe052555521dad12f92.jpg'
      }
    ];
  }

  get topGenreList() {
    const list = genreStore.getGenreList(this.$store) || [];
    const newList = list && list.items.map((item) => {
      return {
        url: '/explore/genre/' + item.id,
        name: item.name,
        image: 'https://cdn.guidingtech.com/imager/media/assets/Stunning-2018-Upcoming-Games-Wallpapers-12_acdb3e4bb37d0e3bcc26c97591d3dd6b.jpg',
        count: item.moviesCount
      };
    });
    newList.sort((a: any, b: any) => b.count - a.count);

    return newList.slice(0, 4);
  }

  get restGenreList() {
    const list = genreStore.getGenreList(this.$store) || [];
    const newList = list && list.items.slice(0);
    newList.sort((a: any, b: any) => b.moviesCount - a.moviesCount);

    return newList.slice(4);
  }
}
