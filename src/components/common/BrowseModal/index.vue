<template>
  <transition name="modal" v-if="filter">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="closeModal()">
        <div class="modal-container">
          <div slot="body" class="browse-container">
            <div class="title-container">
              <div class="title-section">
                <p class="title">Movies by {{filter.type}} | {{filter.value}}</p>
                <p class="sub-title">Click on a movie to vote</p>
              </div>
              <div class="search-section">     
                <input type="text" ref="searchInput" v-model="searchTerm" placeholder="Movie Search" autofocus />
              </div>
              <div class="close-button" @click.self="closeModal()">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="icon"></font-awesome-icon> back
              </div>
            </div>
            <div class="main-container" ref="listBox">
              <div class="list-container">
                <div class="attribution" v-if="searchTerm">
                  <img :src="require(`@/assets/logos/Algolia_Logo.svg`)">
                </div>
                <div class="sort-button" v-else @click="showSortMenu = !showSortMenu">
                  <font-awesome-icon :icon="showSortMenu ? 'caret-up' : 'caret-down'" class="icon"></font-awesome-icon>Sort By
                  <span>{{sortOrder || "Latest"}}</span>
                  <div class="menu-container" v-if="showSortMenu" @click="showSortMenu = !showSortMenu">
                    <div @click="sortOrder = 'rating'; showSortMenu = false;">
                      <font-awesome-icon v-if="sortOrder === 'rating'" icon="check" class="icon"></font-awesome-icon>Rating (Default)
                    </div>
                    <div @click="sortOrder = 'popularity'; showSortMenu = false;">
                      <font-awesome-icon v-if="sortOrder === 'popularity'" icon="check" class="icon"></font-awesome-icon>Popularity
                    </div>
                    <div @click="sortOrder = 'title'; showSortMenu = false;">
                      <font-awesome-icon v-if="sortOrder === 'title'" icon="check" class="icon"></font-awesome-icon>Title
                    </div>
                    <div @click="sortOrder = null; showSortMenu = false;">
                      <font-awesome-icon v-if="sortOrder === null" icon="check" class="icon"></font-awesome-icon>Latest
                    </div>
                    <div @click="sortOrder = 'releaseDate'; showSortMenu = false;">
                      <font-awesome-icon v-if="sortOrder === 'releaseDate'" icon="check" class="icon"></font-awesome-icon>Release Date
                    </div>
                  </div>
                </div>
                <div class="list-block" v-if="filteredMovies.length">
                  <div v-for="item in filteredMovies" :key="item.id" class="list-item">
                    <div class="movie-card-container" @click="vote(item.id)">
                      <div class="img-card" ref="movieCard">
                        <img v-lazy="item.poster" :alt="item.title">
                      </div>
                      <div class="info-card">
                        <div class="title">
                          <p>{{item.title}}</p>
                        </div>
                        <div class="info">
                          <div>
                            <span>{{item.year || "year N/A"}}</span>
                          </div>
                          <div class="rating">
                            <span v-show="item.rating">
                              <font-awesome-icon icon="star" class="icon"></font-awesome-icon>{{item.rating || "--"}}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="show-more">
                    <span class="icon-container"><font-awesome-icon v-show=isLoading icon="circle-notch" spin /></span>
                    <div v-show="!isLoading && currentCount < movies.count" class="load">
                      <span>show more</span>
                      <div class="icon-container"><font-awesome-icon :icon="['fas', 'chevron-down']" /></div> 
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="isLoading" class="loading">
                    <font-awesome-icon icon="circle-notch" spin /> Loading
                  </div>
                  <EmptyBox v-else></EmptyBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
