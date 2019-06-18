<template>
  <div class="container">
    <div class="hero">
      <div class="hero-body">
        <p class="title">Browsing Polls..</p>
        <p class="sub-title">Displaying all polls</p>
      </div>
    </div>
    <div class="list" ref="listBox">
      <template v-for="(poll, index) of items">
        <Poll class="item" :item="poll" :key="index"></Poll>  
      </template>      
    </div>
    <div v-show="!items.length" class="empty-box">
      <EmptyBox></EmptyBox>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
