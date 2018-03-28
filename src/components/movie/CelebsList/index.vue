<template>
  <div class="celebs-overview-block">
    <p><strong>{{ title }}</strong></p>
    <br>
    <ul>
      <li v-for="(celeb, index) in celebs" :key='index'>
        <router-link :to="'/celeb/' + celeb.id" tag="div">
          <div class="columns celeb-container">
            <figure class="column is-narrow">
              <img :src="celeb.photo">
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
