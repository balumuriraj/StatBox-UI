<template>
  <div class="carousel-container">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link class="title-container" :to="link">
            <span class="title">{{ title }}</span>
            <span class="view">view all</span>
            <span class="icon-holder">
              <font-awesome-icon :icon="['fas', 'chevron-right']"></font-awesome-icon>
            </span>
          </router-link>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item"></div>
      </div>
    </div>
    <swiper :options="options" ref="carousel">
      <!-- slides -->
      <template v-for="(item, index) in items">
        <swiper-slide :key="index">
          <GenreCard :item="item"></GenreCard>
        </swiper-slide>
      </template>

      <!-- arrows -->
      <div class="swiper-custom-prev swiper-custom-button" slot="button-prev">
        <div class="icon-holder">
          <font-awesome-icon :icon="['fas', 'caret-left']"></font-awesome-icon>
        </div>
      </div>
      <div class="swiper-custom-next swiper-custom-button" slot="button-next">
        <div class="icon-holder">
          <font-awesome-icon :icon="['fas', 'caret-right']"></font-awesome-icon>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>