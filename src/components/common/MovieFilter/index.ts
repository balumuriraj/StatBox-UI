import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class MovieFilter extends Vue {
  @Prop() public show: boolean = true;
  @Prop() public count!: number;
  @Prop() public total!: number;
  @Prop() public genreList!: string[];

  public filter: string = this.show ? 'genre' : null;
  public yearsList: number[] = [];
  public showFilterMenu: boolean = false;
  public showSortMenu: boolean = false;
  public sortOrder: 'releasedate' | 'title' | 'rating' = null;
  public minYear: number = 2000;
  public maxYear: number = 2019;
  public minRating: number = 0;
  public maxRating: number = 5;
  public selectedGenres: number[] = [];
  public selectedYears: number[] = [];

  private defaultMinRating = 0;
  private defaultMaxRating = 5;
  private defaultMinYear = 2000;
  private defaultMaxYear = 2019;

  @Watch('minRating')
  public onMinRatingChange(val: string, oldVal: string) {
    if (Number(val) < this.maxRating) {
      this.minRating = Number(val);
    } else {
      this.minRating = Number(oldVal);
    }

    const dom = this.$refs.rating as any;
    dom.style.setProperty(
      '--low',
      100 * ((this.minRating - this.defaultMinRating) / (this.defaultMaxRating - this.defaultMinRating)) + 1 + '%'
    );
    dom.style.setProperty(
      '--high',
      100 * ((this.maxRating - this.defaultMinRating) / (this.defaultMaxRating - this.defaultMinRating)) - 1 + '%'
    );
  }

  @Watch('maxRating')
  public onMaxRatingChange(val: string, oldVal: string) {
    if (Number(val) > this.minRating) {
      this.maxRating = Number(val);
    } else {
      this.maxRating = Number(oldVal);
    }

    const dom = this.$refs.rating as any;
    dom.style.setProperty(
      '--low',
      100 * ((this.minRating - this.defaultMinRating) / (this.defaultMaxRating - this.defaultMinRating)) + 1 + '%'
    );
    dom.style.setProperty(
      '--high',
      100 * ((this.maxRating - this.defaultMinRating) / (this.defaultMaxRating - this.defaultMinRating)) - 1 + '%'
    );
  }

  @Watch('minYear')
  public onMinYearChange(val: string, oldVal: string) {
    if (Number(val) < this.maxYear) {
      this.minYear = Number(val);
    } else {
      this.minYear = Number(oldVal);
    }

    const dom = this.$refs.years as any;
    dom.style.setProperty(
      '--low',
      100 * ((this.minYear - this.defaultMinYear) / (this.defaultMaxYear - this.defaultMinYear)) + 1 + '%'
    );
    dom.style.setProperty(
      '--high',
      100 * ((this.maxYear - this.defaultMinYear) / (this.defaultMaxYear - this.defaultMinYear)) - 1 + '%'
    );
  }

  @Watch('maxYear')
  public onMaxYearChange(val: string, oldVal: string) {
    if (Number(val) > this.minYear) {
      this.maxYear = Number(val);
    } else {
      this.maxYear = Number(oldVal);
    }

    const dom = this.$refs.years as any;
    dom.style.setProperty(
      '--low',
      100 * ((this.minYear - this.defaultMinYear) / (this.defaultMaxYear - this.defaultMinYear)) + 1 + '%'
    );
    dom.style.setProperty(
      '--high',
      100 * ((this.maxYear - this.defaultMinYear) / (this.defaultMaxYear - this.defaultMinYear)) - 1 + '%'
    );
  }

  public setGenre(id: number) {
    const index = this.selectedGenres.indexOf(id);

    if (index === -1) {
      this.selectedGenres.push(id);
    } else {
      this.selectedGenres.splice(index, 1);
    }
  }

  public setYear(year: number) {
    const index = this.selectedYears.indexOf(year);

    if (index === -1) {
      this.selectedYears.push(year);
    } else {
      this.selectedYears.splice(index, 1);
    }
  }

  public resetFilter() {
    this.selectedGenres = [];
    this.selectedYears = [];
  }

  public scrollRight() {
    const container = this.filter === 'genre' ? this.$refs.genreBox as Element : this.$refs.yearsBox as Element;
    container.scrollLeft += 200;
  }

  public scrollLeft() {
    const container = this.filter === 'genre' ? this.$refs.genreBox as Element : this.$refs.yearsBox as Element;
    container.scrollLeft -= 200;
  }

  @Watch('selectedGenres')
  private onSelectedGenresChanged(newVal: any, oldVal: any) {
    this.$router.replace({ query: { ...this.$route.query, genre: newVal } });
  }

  @Watch('selectedYears')
  private onSelectedYearsChanged(newVal: any, oldVal: any) {
    this.$router.replace({ query: { ...this.$route.query, year: newVal } });
  }

  @Watch('sortOrder')
  private onSortOrderChanged(newVal: any, oldVal: any) {
    const query = { ...this.$route.query, sort: newVal };

    if (!newVal) {
      delete query.sort;
    }

    this.$router.replace({ query });
  }

  private mounted() {
    for (let i = this.maxYear; i >= this.minYear; i--) {
      this.yearsList.push(i);
    }

    const genreParams = this.$route.query.genre;

    if (genreParams) {
      if (Array.isArray(genreParams)) {
        this.selectedGenres = genreParams.map((genre) => Number(genre));
      } else {
        this.selectedGenres.push(Number(genreParams));
      }
    }

    const yearParams = this.$route.query.year;

    if (yearParams) {
      if (Array.isArray(yearParams)) {
        this.selectedYears = yearParams.map((year) => Number(year));
      } else {
        this.selectedYears.push(Number(yearParams));
      }
    }

    this.sortOrder = this.$route.query.sort as any;
  }
}
