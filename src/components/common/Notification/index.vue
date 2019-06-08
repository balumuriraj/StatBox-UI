<template>
  <div class="notification-block" :class="{ 'closed': !message }">
    <div class="icon-container" v-if="isLoading">
      <font-awesome-icon icon="circle-notch" class="icon" spin/>
    </div>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
