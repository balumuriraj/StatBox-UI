<template>
  <div>
    <div class="stars">
      <template v-for="(rating,index) in ratings">
        <div class="tooltip is-tooltip-top is-tooltip-warning" :data-tooltip=rating.tooltip v-bind:key=index>
          <font-awesome-icon 
          :icon="['fas', 'star-half']" 
          :class="{ 
            'active': ((value >= rating.value) && value != null),
            'hover': ((hoverValue >= rating.value) && hoverValue != null)
          }"
          v-on:mouseover="mouseover(rating.value)"
          v-on:mouseout="mouseout(rating.value)"
          v-on:click="setRating(rating.value)"
          :flip=rating.flip
          :transform=rating.shift
          fixed-width>
          </font-awesome-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
