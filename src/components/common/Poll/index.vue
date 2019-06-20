<template>
  <div class="poll-card-container">
    <div class="loader" v-if="loading"></div>
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
        <template v-for="(vote, index) of votes">
          <div class="option" :key=index >
            <router-link :to="'/movie/'+vote.movie.id" target="_blank">
              <img :src="vote.movie.poster" :alt="vote.movie.title">
            </router-link>
            <div class="data-container" @click="selectMovie(vote.movie.id)" :class="{ 'disabled': isVoted }">
              <div class="data-block">
                <p class="title">{{vote.movie.title}}</p>
                <p class="sub-title">
                  <span v-show="!isVoted && !showResults">Rating of {{(vote.movie.rating && Math.round(vote.movie.rating * 100) / 100) || "-"}}</span>
                  <span v-show="showResults || isVoted">{{vote.count}} votes</span>        
                  <span v-show="vote.isSuggested" class="suggestion">Suggestion</span>           
                </p>           
              </div>
              <progress v-show="showResults || isVoted" class="progress" :value="vote.percent || 0" max="100">75%</progress>
            </div>
            <div class="selected-icon-container" v-show="selectedId === vote.movie.id || selectingId === vote.movie.id">
              <font-awesome-icon v-if="loading" icon="circle-notch" class="icon" spin />
              <font-awesome-icon v-else icon="check" class="icon" />
            </div>
          </div>
        </template>

        <div class="option" v-if="!isNewMovie" @click="displaySearch($event)" :class="{ 'disabled': isVoted }">
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
      </div>

      <div class="note-container">        
        <span>Poll created on {{new Date(item.timestamp).toLocaleDateString()}}</span>                   
        <span class="note"><font-awesome-icon :icon="['far', 'chart-bar']" class="icon" /> {{count}} votes polled</span>
      </div>

    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>