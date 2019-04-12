<template>
  <div class="celebs-list-contianer">
    <Title :name=title :subtitle=subtitle></Title>
    <div class="buttons-container">
      <div @click="scrollLeft()" class="icon-container">
        <font-awesome-icon icon="angle-left" class="icon"></font-awesome-icon>
      </div>
      <div @click="scrollRight()" class="icon-container">
        <font-awesome-icon icon="angle-right" class="icon"></font-awesome-icon>
      </div>
    </div>
    <div class="celebs-list" v-if="celebs && celebs.length" ref="celebsBox">
      <template v-for="(celeb, index) in celebs">
        <router-link :to="'/celeb/' + celeb.id" class="celeb-container" :key='index' v-if="celeb">
          <div class="celeb-image">
            <template v-if="celeb.photo">
              <img :src="celeb.photo">
            </template>
            <template v-else>
              <img src="../../../assets/avatar.png">
            </template>
          </div>
          <div class="celeb-content">
            <p>{{ celeb.name }}</p>
            <span>{{ celeb.role || (celeb.rating ? `Average Rating of ${Math.round(celeb.rating * 100) / 100}` : null) }}</span>
          </div>
        </router-link>
      </template>
    </div>
    <div v-else>
      <EmptyBox></EmptyBox>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
