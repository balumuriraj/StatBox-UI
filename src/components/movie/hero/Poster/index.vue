<template>
  <div class="poster-container">
    <img :src=imageUrl />
    <div class="stars-container">
      <Rating></Rating>
    </div>
    <div class="buttons-container">
      <div class="columns is-gapless">
        <div class="column">
          <div class="tooltip is-tooltip-bottom is-tooltip-danger" :data-tooltip="isNotInterested ? 'Remove Dislike' : 'Not Interested'">
            <div class="icon-block" v-on:click="setInterest()">
            <font-awesome-icon 
              :icon="['fas', 'thumbs-down']" 
              :class="{ 'active': isNotInterested }"                   
              fixed-width>
            </font-awesome-icon>
            <span> Nope</span>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="tooltip is-tooltip-bottom is-tooltip-info" :data-tooltip="isBookmarked ? 'Remove from Wishlist' : 'Add to Wishlist'">
            <div class="icon-block" v-on:click="setBookmark()">
              <font-awesome-icon 
                :icon="['fas', 'bookmark']"
                :class="{ 'active': isBookmarked }"                   
                fixed-width>
              </font-awesome-icon>
              <span> Bookmark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
