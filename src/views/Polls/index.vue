<template>
  <div class="container">
    <div class="hero">
      <div class="hero-body">
        <p class="title">Browsing Polls..</p>
        <p class="sub-title">Displaying all polls</p>
      </div>
    </div>
    <div class="list">
      <template v-for="(poll, index) of polls">
        <Poll class="item" :item="poll" :key="index"></Poll>  
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
