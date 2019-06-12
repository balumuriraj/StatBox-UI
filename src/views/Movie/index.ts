import Component, { mixins } from 'vue-class-component';
import Footer from '@/components/common/Footer';
import CelebList from '@/components/common/CelebList';
import List from '@/components/common/List';
import Menu from '@/components/common/Menu/index';
import Carousel from '../../components/common/Carousel';
import Table from '@/components/common/Table';
import Poster from '@/components/movie/hero/Poster';
import Content from '@/components/movie/hero/Content';
import Info from '@/components/movie/hero/Info';
import Chart from '@/components/common/Chart';
import Attributes from '@/components/movie/body/Attributes';
import * as API from '@/api';
import * as authStore from '@/store/modules/auth';
import { applyUserMetadataToMovies } from '@/api/falcor/utils';
import MovieMixin from '@/mixins/MovieMixin';
import Catch from '@/decorators/Catch';
import { Watch } from 'vue-property-decorator';
import { getRange, getMetaInfo } from '@/support/utils';

@Component({
  components: {
    Attributes,
    Carousel,
    Poster,
    Content,
    Info,
    Chart,
    Table,
    Menu,
    List,
    CelebList,
    Footer
  }
})
export default class Movie extends mixins(MovieMixin) {
  public loading: boolean = false;

  public similarMovies: any = {
    items: [],
    count: 0
  };

  public metaInfo(): any {
    const keywords: string[] = [this.title];

    if (this.genre) {
      keywords.push(...this.genre);
    }

    if (this.cast) {
      keywords.push(...this.cast.map((celeb: any) => celeb.name));
    }

    if (this.crew) {
      keywords.push(...this.crew.map((celeb: any) => celeb.name));
    }

    return {
      title: `${this.title} (${this.year})`,
      ...getMetaInfo({
        url: `https://statbox.in/movie/${this.id}`,
        title: `${this.title} (${this.year}) | StatBox`,
        description: `${this.title} is released on ${this.releaseDate}.`,
        keywords,
        image: this.poster,
        ldJSON: {
          '@context': 'http://schema.org',
          '@type': 'Movie',
          'url': `/movie/${this.id}`,
          'name': this.title,
          'genre': `[${this.genre && this.genre.join(', ')}]`,
          'description': `${this.title} is released on ${this.releaseDate}.`,
          'image': this.poster,
          'actors': `[${this.cast && this.cast.map((celeb: any) => celeb.name).join(', ')}]`,
          'director': `${this.crew && this.crew[0] && this.crew[0].name}`,
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingCount': this.ratingsCount,
            'bestRating': 5,
            'worstRating': 0,
            'ratingValue': this.rating
          }
        }
      })
    };
  }

  get isUserLoggedIn() {
    return authStore.isUserLoggedIn(this.$store);
  }

  @Watch('isUserLoggedIn')
  public onUserStateChange(val: number, oldVal: number) {
    this.loadData();
  }

  @Catch
  public async loadData() {
    this.$store.dispatch('notification/set', { message: 'Loading', isLoading: true });
    const id = Number(this.$route.params.id);

    const data = await API.getMovieData(id);
    const metadata = await API.getMovieMetadata(id);
    const obj = { ...data, ...metadata };

    const itemsObj: any = {};
    itemsObj[id] = obj;

    if (this.isUserLoggedIn) {
      await applyUserMetadataToMovies([id], itemsObj);
    } else {
      obj.isFavorite = false;
      obj.isBookmarked = false;
      obj.isReviewed = false;
      obj.userReview = null;
    }

    this.setProperties(obj);
    this.$store.dispatch('notification/reset');
  }

  @Catch
  public async fetchSimilar() {
    const result = await API.getMoviesByFilter(this.genre, [], null, getRange(this.similarMovies));

    if (result) {
      this.similarMovies.items = this.similarMovies.items.concat(result.items);
      this.similarMovies.count = result.count;
    }
  }

  @Watch('$route.path')
  private async onQueryChanged(newVal: any, oldVal: any) {
    this.similarMovies = {
      items: [],
      count: 0
    };
    await this.loadData();
    await this.fetchSimilar();
  }

  private async mounted() {
    await this.loadData();
    await this.fetchSimilar();
  }
}
