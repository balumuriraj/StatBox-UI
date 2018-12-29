<template>
  <div class="wrapper" v-on:click="showAutoComplete = false">
    <section class="hero">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="buttons-container">
          <div class="button" :class="{ 'active': selected === 'movies' }" v-on:click="selected = 'movies'">Movies</div>
          <div class="button" :class="{ 'active': selected === 'celebs' }" v-on:click="selected = 'celebs'">Celebs</div>
        </div>
        <div class="search-container">
          <div class="input-container">
            <input 
              type="text" 
              :placeholder="selected === 'movies' ? 'search movies' : 'search celebrities'" 
              v-model="searchTerm" 
              @keyup.enter="showAutoComplete = false"
              v-on:click="searchTerm && searchTerm.length > 3 ? showAutoComplete = true : null"
            />
            <font-awesome-icon icon="search" class="icon"></font-awesome-icon>
            <div class="list-container" v-if="showAutoComplete">
              <div v-for="hit in hits" :key="hit.id">
                <div v-if="selected === 'movies'" class="list-item" v-on:click="setSearchTerm(hit)">
                  <img :src="hit.poster">
                  <div class="info">
                    <p>{{hit.title}}</p>
                    <span>{{hit.releaseDate && (new Date(hit.releaseDate)).getFullYear()}}</span>
                  </div>
                </div>
                <div v-else class="list-item" v-on:click="setSearchTerm(hit)">
                  <img v-if="hit.photo" :src="hit.photo">
                  <img v-else src="../../assets/avatar.png">
                  <div class="info">
                    <p>{{hit.name}}</p>
                    <span>{{hit.dob && (new Date(hit.dob)).getFullYear()}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- content -->
    <div class="content">
      <List :title="'Top Results'" :items=hits :count=hits.length></List>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
