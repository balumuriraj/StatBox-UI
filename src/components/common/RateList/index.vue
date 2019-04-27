<template>
  <div class="list-container" ref="listBox">
    <!-- <div class="title-container">
      <p class="title" v-if=title>{{ title }}</p>
      <p class="count" v-if=count>{{movies && movies.length || 0}} / {{ count }}</p>
    </div> -->

    <template v-if="movies && movies.length">
      <div class="rate-list-block">
        <div v-for="(movie, idx) in movies" :key="idx" class="list-item">
          <RateCard :movie="movie"></RateCard>
        </div>
      </div>
    </template>

    <div v-else>
      <EmptyBox :text="currentCount === count ? 'All movies rated!' : null"></EmptyBox>
    </div>

    <div class="loading">
      <font-awesome-icon v-show=loading icon="spinner" spin />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>