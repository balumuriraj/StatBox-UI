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
  public selected = 'movies';
  public searchTerm: string = null;
  public hits: any[] = [];
  public showAutoComplete = false;
  private turnoffAutocomplete = false;

  public setSearchTerm(hit: any) {
    this.searchTerm = this.selected === 'movies' ? hit.title : hit.name;
    this.showAutoComplete = false;
    this.turnoffAutocomplete = true;
  }

  @Watch('searchTerm')
  private onSearchTermChanged(newVal: string, oldVal: string) {
    this.executeSearch(newVal);
  }

  @Watch('selected')
  private onSelectedChanged(newVal: string, oldVal: string) {
    // this.turnoffAutocomplete = true;
    this.executeSearch(this.searchTerm);
  }

  private executeSearch(term: string) {
    if (term && term.length > 3) {
      const index = this.selected === 'movies' ? moviesIndex : celebsIndex;
      index.search(this.searchTerm, this.algolioCallback);
    } else {
      this.showAutoComplete = false;
      this.hits = [];
    }
  }

  private algolioCallback(err: any, res: any) {
    if (!err && res) {
      this.hits = res.hits;

      if (this.selected === 'movies') {
        this.hits.forEach((hit) => {
          hit.releaseDate = hit.releasedate;
          delete hit.releasedate;
        });
      }

      if (this.turnoffAutocomplete) {
        this.showAutoComplete = false;
        this.turnoffAutocomplete = false;
      } else {
        this.showAutoComplete = true;
      }
    }
  }
}
