<template>
  <div class="container">
    <div class="row">
      <div class="title-block">
        <p class="title">
          Movies
          <span v-if="total">({{ total }})</span>
        </p>
      </div>
      <div class="buttons" :class="{ 'closed': !filter }">
        <a class="link" @click="resetFilter()" v-if="filter">Reset</a>
        <a class="link" @click="scrollLeft()" v-if="filter">Prev</a>
        <a class="link" @click="scrollRight()" v-if="filter">Next</a>
        <div class="button" @click="showFilterMenu = !showFilterMenu">
          <font-awesome-icon :icon="showFilterMenu ? 'caret-up' : 'caret-down'" class="icon"></font-awesome-icon>Filter
          <span>{{filter && `[${filter}]`}}</span>
          <div
            class="menu-container"
            v-if="showFilterMenu"
            @click="showFilterMenu = !showFilterMenu"
          >
            <div @click="filter = 'genre'; showFilterMenu = false;">
              <font-awesome-icon v-if="filter === 'genre'" icon="check" class="icon"></font-awesome-icon>Genre
            </div>
            <div @click="filter = 'years'; showFilterMenu = false;">
              <font-awesome-icon v-if="filter === 'years'" icon="check" class="icon"></font-awesome-icon>Years
            </div>
            <div @click="filter = null; showFilterMenu = false;">
              <font-awesome-icon v-if="filter === null" icon="check" class="icon"></font-awesome-icon>Hide
            </div>
          </div>
        </div>
        <div class="button" @click="showSortMenu = !showSortMenu">
          <font-awesome-icon :icon="showSortMenu ? 'caret-up' : 'caret-down'" class="icon"></font-awesome-icon>Sort By
          <span>{{sortOrder || "Default"}}</span>
          <div class="menu-container" v-if="showSortMenu" @click="showSortMenu = !showSortMenu">
            <div @click="sortOrder = null; showSortMenu = false;">
              <font-awesome-icon v-if="sortOrder === null" icon="check" class="icon"></font-awesome-icon>Latest (Default)
            </div>
            <div @click="sortOrder = 'releasedate'; showSortMenu = false;">
              <font-awesome-icon v-if="sortOrder === 'releasedate'" icon="check" class="icon"></font-awesome-icon>Release Date
            </div>
            <div @click="sortOrder = 'title'; showSortMenu = false;">
              <font-awesome-icon v-if="sortOrder === 'title'" icon="check" class="icon"></font-awesome-icon>Title
            </div>
            <div @click="sortOrder = 'popularity'; showSortMenu = false;">
              <font-awesome-icon v-if="sortOrder === 'popularity'" icon="check" class="icon"></font-awesome-icon>Popularity
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-container" v-if="filter">
      <div class="filter-block">
        <div class="genres-container" v-if="filter === 'genre'">
          <div class="list-block" ref="genreBox">
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
        </div>
        <div class="genres-container" v-if="filter === 'years'">
          <div class="list-block" ref="yearsBox">
            <ul>
              <template v-for="year in yearsList">
                <li
                  :key="year"
                  @click="setYear(year)"
                  :class="{'active': selectedYears.indexOf(year) > -1}"
                >{{year}}</li>
              </template>
            </ul>
          </div>
        </div>
        <!-- <div class="sliders-container">
          <div class="slider-block years">
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
              <div>Release Year</div>
              <div>{{maxYear}}</div>
            </div>
        </div>-->
        <!-- <div class="slider-block rating">
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
              <div>Rating</div>
              <div>{{maxRating}}</div>
            </div>
          </div> 
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>