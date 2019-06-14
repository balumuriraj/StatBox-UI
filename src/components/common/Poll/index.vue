<template>
  <div class="poll-card-container">
    <div class="poll-card" ref="pollCard">
      <div class="title-container">
        <p class="title">{{item.title}}</p>
        <p class="sub-title">
          <span>{{ isVoted ? 'Thanks for voting!' : 'Click on a movie to vote' }}</span>
          <span> | </span>
          <span v-show="!isVoted" class="results-button" @click="showResults = !showResults">{{ showResults ? 'Hide' : 'Show' }} Results</span>          
          <span v-show="isVoted" class="clear-button" @click="clear()">Change Vote</span> 
        </p>        
      </div>
      <div class="options-container">
        <template v-for="(movie, index) of movies">
          <div class="option" @click="selectMovie(movie.id)" :key=index :class="{ 'disabled': isVoted }">
            <img :src="movie.poster" />
            <div class="data-container">
              <div class="data-block">
                <p class="title">{{movie.title}}</p>
                <p class="sub-title">
                  <span v-show="!isVoted && !showResults">{{movie.rating}} Rating</span>
                  <span v-show="showResults || isVoted">{{movie.votes}} votes</span>                 
                </p>           
              </div>
              <progress v-show="showResults || isVoted" class="progress" :value=movie.percent max="100">75%</progress>
            </div>
            <div class="selected-icon-container" v-show="selectedId === movie.id">
              <font-awesome-icon v-if="loading" icon="circle-notch" class="icon" spin />
              <font-awesome-icon v-else icon="check" class="icon" />
            </div>
          </div>
        </template>

        <div class="option" v-if="!showSearch && !newMovie" @click="displaySearch($event)" ref="addOption" :class="{ 'disabled': isVoted }">
          <div class="icon-container">
            <font-awesome-icon icon="plus" class="icon" />
          </div>
          <div class="data-container">
            <div class="data-block">     
              <p class="title">Add Movie</p>
              <p class="sub-title">Vote for a different movie</p>
            </div>
          </div>
        </div>
        <div class="option" v-else-if="!newMovie" ref="searchContainer">
          <div class="icon-container">
            <font-awesome-icon icon="plus" class="icon" />
          </div>
          <div class="data-container">
            <div class="data-block">     
              <input type="text" ref="searchInput" v-model="searchTerm" placeholder="Movie Search" autofocus />
              <p class="sub-title" v-show="searchTerm && searchTerm.length > 3 && !movieHits.length">No results found!</p>
            </div>
          </div>
          <div class="hits-container" v-show="movieHits.length">
            <template v-for="(hit, index) of movieHits">
              <div class="hit" :key=index @click="addMovie(hit)">
                <img :src="hit.poster" />
                <p>{{hit.title}}</p>
              </div>
            </template>
            <div class="attribution">
              <img :src="require(`@/assets/logos/Algolia_Logo.svg`)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>