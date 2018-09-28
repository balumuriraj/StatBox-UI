import { Component, Vue } from 'vue-property-decorator';
import * as genreStore from '@/store/modules/genre';

@Component
export default class GenreList extends Vue {
  private created() {
    this.fetchData();
  }

  private fetchData() {
    console.log('fetching GenreList....');
    genreStore.fetchGenreList(this.$store);
  }

  get genreList() {
    return genreStore.getGenreList(this.$store);
  }
}
