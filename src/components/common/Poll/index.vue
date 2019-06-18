<template>
  <div class="poll-card-container">
    <div class="poll-card" ref="pollCard">
      <div class="title-container">
        <p class="title">{{item.title}}</p>
        <p class="sub-title">
          <span>created on {{new Date(item.timestamp).toLocaleDateString()}}</span>          
          <span> | </span>
          <span v-show="!isVoted" class="results-button" @click="showResults = !showResults">{{ showResults ? 'Hide' : 'Show' }} Results</span>          
          <span v-show="isVoted" class="clear-button" @click="clear()">Change Vote</span> 
        </p>        
      </div>
      <div class="options-container">
        <template v-for="(vote, index) of votes">
          <div class="option" :key=index >
            <router-link :to="'/movie/'+vote.movie.id" target="_blank">
              <img :src="vote.movie.poster" :alt="vote.movie.title">
            </router-link>
            <div class="data-container" @click="selectMovie(vote.movie.id)" :class="{ 'disabled': isVoted }">
              <div class="data-block">
                <p class="title">{{vote.movie.title}}</p>
                <p class="sub-title">
                  <span v-show="!isVoted && !showResults">{{(vote.movie.rating && Math.round(vote.movie.rating * 100) / 100) || "-"}} Rating</span>
                  <span v-show="showResults || isVoted">{{vote.count}} votes</span>        
                  <span v-show="vote.isSuggested" class="suggestion">Suggestion</span>           
                </p>           
              </div>
              <progress v-show="showResults || isVoted" class="progress" :value="vote.percent || 0" max="100">75%</progress>
            </div>
            <div class="selected-icon-container" v-show="selectedId === vote.movie.id">
              <font-awesome-icon v-if="loading" icon="circle-notch" class="icon" spin />
              <font-awesome-icon v-else icon="check" class="icon" />
            </div>
          </div>
        </template>

        <div class="option" v-if="!showSearch && !isNewMovie" @click="displaySearch($event)" ref="addOption" :class="{ 'disabled': isVoted }">
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
        <div class="option" v-else-if="!isNewMovie" ref="searchContainer">
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
              <div class="hit" :key=index @click="addMovie(hit.id)">
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

      <div class="note-container">
        <font-awesome-icon icon="poll-h" class="icon" />
        <span class="note">{{count}} votes polled | </span>
        <span>{{ isVoted ? 'Thanks for voting!' : 'Click on a movie to vote' }}</span>
      </div>

    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>