import { Component, Vue, Watch } from 'vue-property-decorator';
import List from '@/components/common/List';
import * as algoliasearch from 'algoliasearch';

const client = algoliasearch('8P9LT48GR4', 'e1c5b9da0bfcd987c6a43509d7c496cc');
const moviesIndex = client.initIndex('movies');
const celebsIndex = client.initIndex('celebs');

@Component({
  components: {
    List
  }
})
export default class Search extends Vue {
  public term: string = null;
  public movieHits: any[] = [];
  public celebHits: any[] = [];

  public metaInfo(): any {
    return {
      title: `Search`
    };
  }

  @Watch('$route.query.term')
  private onSearchTermChanged(newVal: string, oldVal: string) {
    this.term = newVal;
    this.executeSearch(newVal);
  }

  private executeSearch(term: string) {
    if (term && term.length > 3) {
      moviesIndex.search(term, this.algolioMovieCallback);
      celebsIndex.search(term, this.algolioCelebCallback);
    } else {
      this.movieHits = [];
      this.celebHits = [];
    }
  }

  private algolioMovieCallback(err: any, res: any) {
    if (!err && res) {
      this.movieHits = res.hits;
    }
  }

  private algolioCelebCallback(err: any, res: any) {
    if (!err && res) {
      this.celebHits = res.hits;
    }
  }

  private created() {
    this.term = this.$route.query.term as string;

    if (this.term) {
      this.executeSearch(this.term);
    }
  }
}
