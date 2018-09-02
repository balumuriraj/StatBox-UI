<template>
  <div class="celebs-overview-block">
    <p><strong>{{ title }}</strong></p>
    <ul>
      <li v-for="(celeb, index) in celebs" :key='index'>
        <router-link :to="'/celeb/' + celeb.id" tag="div" class="celeb-container">
          <div class="columns is-gapless">
            <figure class="column is-narrow">
              <template v-if="celeb.photo">
                <img :src="celeb.photo">
              </template>
              <template v-else>
                <img src="../../../../assets/avatar.png">
              </template>
            </figure>
            <div class="column is-narrow celeb-content">
              <p>{{ celeb.name }}</p>
              <span>{{ celeb.role }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
