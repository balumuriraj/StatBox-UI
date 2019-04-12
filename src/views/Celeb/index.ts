import { Component, Vue, Watch } from 'vue-property-decorator';
import List from '@/components/common/List';
import * as API from '@/api';

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

  public async fetchMovies() {
    const result = await API.getMoviesByCelebId(this.celeb.id, this.getRange());

    if (result) {
      this.movies.items = this.movies.items.concat(result.items);
      this.movies.count = result.count;
    }
  }

  private async mounted() {
    try {
      const id = this.$route.params.id;
      const data = await API.getCelebData(id);
      this.celeb.id = id;
      this.celeb.name = data.name;
      this.celeb.photo = data.photo;
      this.celeb.dob = data.dob;

      this.fetchMovies();
    } catch (err) {
      if (err.message === 'invalid_token') {
        this.$store.dispatch('notification/set', { message: 'Login Required!' });
        this.$store.dispatch('auth/logout');
        this.$router.push({ name: 'login' });
      }
    }
  }

  private getRange() {
    const count = this.movies.count;
    const length = this.movies.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      return { from, to };
    }
  }
}
