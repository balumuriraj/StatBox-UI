<template>
  <div class="poll-card-container">
    <div class="poll-card" ref="pollCard">
      <div class="title-container">
        <p class="title">Best movie of 2018</p>
        <p class="sub-title">Please vote for a movie</p>
      </div>
      <div class="options-container">
        <div class="option">
          <img src="https://storage.googleapis.com/statbox89.appspot.com/images/posters/192.jpg" />
          <div class="data-container">
            <div class="data-block">
              <p class="title">Baahubhali</p>
              <p class="sub-title">133 votes</p>              
            </div>
            <progress class="progress" value=75 max="100">75%</progress>
          </div>
        </div>

        <div class="option">
          <img src="https://storage.googleapis.com/statbox89.appspot.com/images/posters/24.jpg" />
          <div class="data-container">   
            <div class="data-block">         
              <p class="title">Rangasstalam</p>
              <p class="sub-title">25 votes</p>
            </div>
            <progress class="progress" value=10 max="100">10%</progress>
          </div>
        </div>

        <div class="option">
          <img src="https://storage.googleapis.com/statbox89.appspot.com/images/posters/150.jpg" />
          <div class="data-container">    
            <div class="data-block">        
              <p class="title">Temper</p>
              <p class="sub-title">10 votes</p>
            </div>
            <progress class="progress" value=5 max="100">5%</progress>
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