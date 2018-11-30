<template>
  <div v-if="isStacked" class="level">
    <div class="level-left holder">
      <progress class="progress is-info" v-bind:value=value1 max="100"></progress>
    </div>
    <div class="level-right holder">
      <progress class="progress is-success" v-bind:value=value2 max="100"></progress>
    </div>
  </div>
  <div v-else class="holder">
    <progress class="progress" v-bind:class="getClass()" v-bind:value=value max="100">{{ value }}%</progress>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
