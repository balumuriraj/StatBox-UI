<template>
  <div class="list-container" ref="listBox">
    <div class="title-container">
      <p class="title" v-if=title>{{ title }}</p>
      <p class="count" v-if=count>displaying {{items && items.length || 0}} of {{ count }} items</p>
    </div>

    <div class="list-block" v-if="items && items.length">
      <div v-for="item in items" :key="item.id" class="list-item">
        <Card :item="item"></Card>
      </div>
    </div>

    <div v-else>
      <EmptyBox></EmptyBox>
    </div>

    <div class="loading">
      <font-awesome-icon v-show=loading icon="spinner" spin />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>