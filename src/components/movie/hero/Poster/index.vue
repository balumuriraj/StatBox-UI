<template>
  <div class="poster-container">
    <div class="icons-container">
      <div class="icons-block level">
        <div class="level-left">
          <div class="level-item">
            <div class="tooltip is-tooltip-danger" data-tooltip="Not Interested">
                <div class="icon-block" v-on:click="setInterest()">
                <font-awesome-icon 
                  :icon="['fas', 'thumbs-down']" 
                  :class="{ 'active': isNotInterested }"                   
                  fixed-width>
                </font-awesome-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="tooltip is-tooltip-info" data-tooltip="Add to Wishlist">
              <div class="icon-block" v-on:click="setBookmark()">
                <font-awesome-icon 
                  :icon="['fas', 'bookmark']"
                  :class="{ 'active': isBookmarked }"                   
                  fixed-width>
                </font-awesome-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img :src=imageUrl />
    <div class="stars-container">
      <Rating></Rating>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
