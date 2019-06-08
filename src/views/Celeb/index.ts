import { Component, Vue, Watch } from 'vue-property-decorator';
import List from '@/components/common/List';
import * as API from '@/api';
import Catch from '@/decorators/Catch';
import { getRange } from '@/support/utils';

@Component({
  components: {
    List
  }
})
export default class Celeb extends Vue {
  get age() {
    if (this.celeb && this.celeb.dob) {
      const today = new Date();
      const birthDate = new Date(this.celeb.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
      return age;
    }
  }

  public celeb: any = {
    id: null,
    name: null,
    photo: null,
    dob: null
  };
  public movies: any = {
    items: [],
    count: 0
  };

  @Catch
  public async fetchMovies() {
    const result = await API.getMoviesByCelebId(this.celeb.id, getRange(this.movies));

    if (result) {
      this.movies.items = this.movies.items.concat(result.items);
      this.movies.count = result.count;
    }
  }

  @Catch
  private async loadData() {
    const id = this.$route.params.id;
    const data = await API.getCelebData(id);
    this.celeb.id = id;
    this.celeb.name = data.name;
    this.celeb.photo = data.photo;
    this.celeb.dob = data.dob;

    this.fetchMovies();
  }

  @Watch('$route.path')
  private async onQueryChanged(newVal: any, oldVal: any) {
    await this.loadData();
  }

  private async mounted() {
    await this.loadData();
  }
}
