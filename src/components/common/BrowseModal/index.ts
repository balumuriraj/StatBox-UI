import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import EmptyBox from '@/components/common/EmptyBox';
import { EventBus } from '@/events';
import Catch from '@/decorators/Catch';
import * as API from '@/api';
import { getRange } from '@/support/utils';
import * as algoliasearch from 'algoliasearch';

const client = algoliasearch('8P9LT48GR4', 'e1c5b9da0bfcd987c6a43509d7c496cc');
const moviesIndex = client.initIndex('movies');

@Component({
  components: {
    EmptyBox
  }
})
export default class BrowseModal extends Vue {

  get currentCount(): number {
    return this.movies.items.length;
  }

  public filter: any = null;
  public isLoading: boolean = false;
  public searchTerm: string = null;
  public showSortMenu: boolean = false;
  public sortOrder: string = 'rating';

  public movies: any = {
    items: [],
    count: 0
  };
  private scrollHandler: any = null;


  get filteredMovies() {
    return this.movies.items.filter((item: any) => this.filter.existingIds.indexOf(item.id) === -1);
  }

  public async vote(id: number) {
    this.isLoading = true;

    this.filter.selectMovie(id);

    this.isLoading = false;
    this.closeModal();
  }

  public closeModal() {
    const elm = this.$refs.listBox as Element;
    elm.removeEventListener('scroll', this.scrollHandler);
    this.filter = null;
    this.searchTerm = null;
    this.showSortMenu = false;
    this.sortOrder = 'rating';
    this.movies.items = [];
    this.movies.count = 0;
    document.body.classList.remove('noscroll');
  }

  @Watch('currentCount')
  public onCurrentCountChange(val: number, oldVal: number) {
    const elm = this.$refs.listBox as Element;

    if (elm.clientHeight >=  elm.scrollHeight && (val < this.movies.count)) {
      this.fetchData();
    }
  }

  @Watch('sortOrder')
  private onSortOrderChanged(newVal: string, oldVal: string) {
    this.movies.items = [];
    this.movies.count = 0;

    this.fetchData();
  }

  @Watch('searchTerm')
  private onSearchTermChanged(newVal: string, oldVal: string) {
    const term = newVal;
    this.executeSearch(term);
  }

  private executeSearch(term: string) {
    if (term && term.length > 2) {
      moviesIndex.search(term, this.algolioMovieCallback);
    } else {
      this.movies.items = [];
      this.movies.count = 0;
    }

    if (term === '') {
      this.fetchData();
    }
  }

  private algolioMovieCallback(err: any, res: any) {
    if (!err && res) {
      const hits = res.hits.filter((hit: any) => {
        if (this.filter.type === 'year') {
          const year = new Date(hit.releaseDate).getFullYear();
          hit.year = year;
          return this.filter.value === year;
        }

        return true;
      });
      this.movies.items = hits;
      this.movies.count = 0;
    }
  }

  @Catch
  private async fetchData() {
    this.isLoading = true;

    const genres: string[] = [];
    const years: number[] = [];

    if (this.filter.type === 'year') {
      years.push(this.filter.value);
    }

    const result = await API.getMoviesByFilter(
      genres, years, this.sortOrder, getRange(this.movies)
    );

    if (result) {
      this.movies.items = this.movies.items.concat(result.items);
      this.movies.count = result.count;
    }

    this.isLoading = false;
  }

  private mounted() {
    EventBus.$on('toggleBrowseModal', async (filter: any) => {
      document.body.classList.add('noscroll');
      this.filter = filter;
      await this.fetchData();

      this.scrollHandler = () => {
        if (!this.isLoading) {
          const isBottom = this.isScrollBottom();

          if (isBottom && (this.movies.items.length < this.movies.count)) {
            this.fetchData();
          }
        }
      };
      const elm = this.$refs.listBox as Element;
      elm.addEventListener('scroll', this.scrollHandler.bind(this));
    });
  }

  private isScrollBottom(): boolean {
    const elm = this.$refs.listBox as Element;
    const totalHeight = elm.scrollHeight;
    const clientHeight = elm.clientHeight;
    const scrollTop = elm.scrollTop;

    return totalHeight === scrollTop + clientHeight;
  }
}
