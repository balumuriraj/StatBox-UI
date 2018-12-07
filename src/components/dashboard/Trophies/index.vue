<template>
  <div class="container">
    <div class="title-container">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <div class="trophies-container" v-if="trophies && trophies.length">
      <template v-for="(trophy, index) in trophies">
        <div :key="index" class="item" :class="{'waiting': type === 'waiting'}">
          <div class="icon-container">
            <font-awesome-icon :icon="['fas', trophy.icon]"  class="icon" :class="trophy.color"></font-awesome-icon>
          </div>
          <div class="info-container">
            <p class="title">{{ trophy.name }}</p>
            <p class="description">{{ trophy.description }}</p>
          </div>
        </div>
      </template>
    </div>
    <div v-else>
      <EmptyBox></EmptyBox>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
