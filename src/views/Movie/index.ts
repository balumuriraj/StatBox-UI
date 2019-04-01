import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/components/common/Footer';
import CelebList from '@/components/common/CelebList';
import List from '@/components/common/List';
import Menu from '@/components/common/Menu/index';
import Table from '@/components/common/Table';
import Poster from '@/components/movie/hero/Poster';
import Content from '@/components/movie/hero/Content';
import Info from '@/components/movie/hero/Info';
import Chart from '@/components/common/Chart';
import Attributes from '@/components/movie/body/Attributes';
import * as API from '@/api';
import { applyUserMetadataToMovies } from '@/api/falcor/utils';

@Component({
  components: {
    Attributes,
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
export default class Movie extends Vue {
  public movie: any = null;
  public loading: boolean = false;

  get attributes() {
    if (this.movie) {
      const attr = this.movie.attributes;
      const result = {
        watchWith: {
          friends: 0,
          self: 0,
          family: 0
        },
        pace: {
          slow: 0,
          fast: 0
        },
        story: {
          simple: 0,
          complex: 0
        },
        rewatch: {
          yes: 0,
          no: 0
        }
      };

      if (attr) {
        const { friends, family, self } = attr.watchWith;
        if (friends || family || self) {
          const watchWithTotal = friends + family + self;
          result.watchWith.family = Math.round(family / watchWithTotal * 100);
          result.watchWith.friends = Math.round(friends / watchWithTotal * 100);
          result.watchWith.self = Math.round(self / watchWithTotal * 100);
        }

        const { slow, fast } = attr.pace;
        if (slow || fast) {
          const paceTotal = slow + fast;
          result.pace.slow = Math.round(slow / paceTotal * 100);
          result.pace.fast = Math.round(fast / paceTotal * 100);
        }

        const { simple, complex } = attr.story;
        if (simple || complex) {
          const storyTotal = simple + complex;
          result.story.simple = Math.round(simple / storyTotal * 100);
          result.story.complex = Math.round(complex / storyTotal * 100);
        }

        const { yes, no } = attr.rewatch;
        if (yes || no) {
          const rewatchTotal = yes + no;
          result.rewatch.yes = Math.round(yes / rewatchTotal * 100);
          result.rewatch.no = Math.round(no / rewatchTotal * 100);
        }
      }

      return result;
    }
  }

  private async mounted() {
    this.loading = true;
    const id = Number(this.$route.params.id);

    const data = await API.getMovieData(id);
    const metadata = await API.getMovieMetadata(id);
    const movie = { ...data, ...metadata };

    const itemsObj: any = {};
    itemsObj[id] = movie;
    await applyUserMetadataToMovies([id], itemsObj);
    this.movie = movie;

    this.loading = false;
  }
}
