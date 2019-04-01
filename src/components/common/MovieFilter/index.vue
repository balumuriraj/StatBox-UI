<template>
  <div class="container">
    <div class="row">
      <div class="buttons">
        <div class="button" @click="showFilter = !showFilter">
          <font-awesome-icon :icon="showFilter ? 'caret-up' : 'caret-down'" class="icon"></font-awesome-icon>Filter
        </div>
        <div class="button" @click="showSort = !showSort">
          <font-awesome-icon :icon="showSort ? 'caret-up' : 'caret-down'" class="icon"></font-awesome-icon>Sort By <span>{{sortOrder || "Default"}}</span>
        </div>
        <div class="sort-container" v-if="showSort" @click="showSort = !showSort">
          <div @click="sortOrder = null">Default</div>
          <div @click="sortOrder = 'releasedate'">Release Date</div>
          <div @click="sortOrder = 'title'">Title</div>
          <div @click="sortOrder = 'rating'">Rating</div>
        </div>
      </div>
    </div>
    <div class="filter-container" v-if="showFilter">
      <div class="filter-block">
        <div class="genres-container">
          <div class="title-block">
            <p class="title">Genre</p>

            <div class="buttons">
              <a class="link" @click="resetFilter()">Reset</a>
              <div class="button" @click="showFilter = !showFilter">
                <font-awesome-icon icon="times" class="icon"></font-awesome-icon>
              </div>
            </div>
            
          </div>            
          <ul>
            <template v-for="genre in genreList">
              <li
                :key="genre.id"
                @click="setGenre(genre.id)"
                :class="{'active': selectedGenres.indexOf(genre.id) > -1}"
              >
                {{genre.name}}
                <span>{{genre.moviesCount}}</span>
              </li>
            </template>
          </ul>
        </div>
        <!-- <div class="sliders-container">
          <div class="slider-block years">
            <p class="title">Release Year</p>
            <div class="slider" ref="years">
              <input
                type="range"
                name="min"
                id="min"
                v-model="minYear"
                min="2000"
                max="2019"
                step="1"
              >
              <input
                type="range"
                name="max"
                id="max"
                v-model="maxYear"
                min="2000"
                max="2019"
                step="1"
              >
            </div>
            <div class="labels">
              <div>{{minYear}}</div>
              <div>{{maxYear}}</div>
            </div>
          </div>
          <div class="slider-block rating">
            <p class="title">Rating</p>
            <div class="slider" ref="rating">
              <input
                type="range"
                name="min"
                id="min"
                v-model="minRating"
                min="0"
                max="5"
                step="0.5"
              >
              <input
                type="range"
                name="max"
                id="max"
                v-model="maxRating"
                min="0"
                max="5"
                step="0.5"
              >
            </div>
            <div class="labels">
              <div>{{minRating}}</div>
              <div>{{maxRating}}</div>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div class="buttons">
        <div class="button" @click="resetFilter()">
          <font-awesome-icon icon="times" class="icon"></font-awesome-icon>Reset All
        </div>
        <div class="button" @click="showFilter = !showFilter">
          <font-awesome-icon :icon="showFilter ? 'caret-up' : 'caret-down'" class="icon"></font-awesome-icon>Hide Filter
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>