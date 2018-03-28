<template>
  <div class="columns is-multiline is-centered">
    <template v-for="movie in movies">
      <card :movie="movie" :key="movie.id"></card>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/home/Card.vue';

@Component({
  components: {
    Card
  }
})
export default class List extends Vue {
  private created() {
    this.$store.dispatch('allMovies');
  }

  get movies() {
    return this.$store.getters.allMovies;
  }
}
</script>
