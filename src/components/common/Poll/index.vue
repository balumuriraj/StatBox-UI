<template>
  <div class="poll-card-container">
    <div class="poll-card" ref="pollCard">
      <div class="title-container">
        <p class="title">Best movie of 2018</p>
        <p class="sub-title">
          <span>{{ isVoted ? 'Thanks for voting!' : 'Click on a movie to vote' }}</span>
          <span v-show="!isVoted"> | </span>
          <span v-show="!isVoted" class="results-button" @click="showResults = !showResults">{{ showResults ? 'Hide' : 'Show' }} Results</span>          
        </p>        
      </div>
      <div class="options-container">
        <div class="option">
          <img src="https://storage.googleapis.com/statbox89.appspot.com/images/posters/192.jpg" />
          <div class="data-container">
            <div class="data-block">
              <p class="title">Baahubhali</p>
              <p class="sub-title">
                <span v-show="!isVoted && !showResults">4 Rating</span>
                <span v-show="showResults">133 votes</span>                 
              </p>           
            </div>
            <progress v-show="showResults" class="progress" value=75 max="100">75%</progress>
          </div>
          <div class="selected-icon-container">
            <font-awesome-icon icon="check" class="icon" />
          </div>
        </div>

        <div class="option">
          <img src="https://storage.googleapis.com/statbox89.appspot.com/images/posters/24.jpg" />
          <div class="data-container">   
            <div class="data-block">         
              <p class="title">Rangasstalam</p>
              <p class="sub-title">
                <span v-show="!isVoted && !showResults">4 Rating</span>
                <span v-show="showResults">133 votes</span>                 
              </p>   
            </div>
            <progress v-show="showResults" class="progress" value=10 max="100">10%</progress>
          </div>
          <div class="selected-icon-container">
            <font-awesome-icon icon="check" class="icon" />
          </div>
        </div>

        <div class="option">
          <img src="https://storage.googleapis.com/statbox89.appspot.com/images/posters/150.jpg" />
          <div class="data-container">    
            <div class="data-block">        
              <p class="title">Temper</p>
              <p class="sub-title">
                <span v-show="!isVoted && !showResults">4 Rating</span>
                <span v-show="showResults">133 votes</span>                 
              </p>   
            </div>
            <progress v-show="showResults" class="progress" value=5 max="100">5%</progress>
          </div>
          <div class="selected-icon-container">
            <font-awesome-icon icon="check" class="icon" />
          </div>
        </div>

        <div class="option">
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
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>