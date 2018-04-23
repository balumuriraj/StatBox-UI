<template>
  <div v-if="isStacked">
    <div class="level">
      <div class="level-left is-half">
        <progress class="progress is-small is-info" v-bind:value=value1 max="100"></progress>
      </div>
      <div class="level-right is-half">
        <progress class="progress is-small is-success" v-bind:value=value2 max="100"></progress>
      </div>
    </div>
  </div>
  <div v-else>
    <progress class="progress is-small" v-bind:class="getClass()" v-bind:value=value max="100">{{ value }}%</progress>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
