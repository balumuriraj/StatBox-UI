<template>
  <div class="dashboard">
    <section class="hero">
      <div class="hero-body">
        <div class="img-container">
          <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" width="150">
          <p class="title">{{user.name}}</p>
          <div class="numbers-block">
            <div class="item">
              <font-awesome-icon icon="heart" class="icon favorites-icon"></font-awesome-icon> {{user.favorites.count || 0}}
            </div>
            <div class="item">
              <font-awesome-icon icon="bookmark" class="icon bookmark-icon"></font-awesome-icon> {{user.bookmarks.count || 0}}
            </div>
            <div class="item">
              <font-awesome-icon icon="star" class="icon rating-icon"></font-awesome-icon> {{user.reviewed.count || 0}}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- content -->
    <section class="section">
      <div class="left-section">
        <div class="img-container">
          <div class="img-block">
            <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" width="150">
          </div>
        </div>
        <div class="trophies-container">
          <!-- <p><b>User since - </b> {{new Date(user.userSince).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
          <p><b>Last Login - </b> {{user.lastLogin}}</p> -->
          <p class="title">Trophies</p>
          <div class="list">
            <font-awesome-icon icon="certificate" class="icon"></font-awesome-icon>
            <font-awesome-icon icon="shield-alt" class="icon"></font-awesome-icon>
            <font-awesome-icon icon="trophy" class="icon"></font-awesome-icon>
            <font-awesome-icon icon="trophy" class="icon"></font-awesome-icon>
            <font-awesome-icon icon="trophy" class="icon"></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="right-section">
        <div class="title-container">
          <p class="title">{{user.name}}</p>
          <div class="numbers-block">
            <div class="item">
              <font-awesome-icon icon="heart" class="icon favorites-icon"></font-awesome-icon> {{user.favorites.count || 0}}
            </div>
            <div class="item">
              <font-awesome-icon icon="bookmark" class="icon bookmark-icon"></font-awesome-icon> {{user.bookmarks.count || 0}}
            </div>
            <div class="item">
              <font-awesome-icon icon="star" class="icon rating-icon"></font-awesome-icon> {{user.reviewed.count || 0}}
            </div>
          </div>
        </div>
        <div class="menu-container">
          <div class="menu-item" :class="{ 'active': isOverview }" v-on:click="setMenu('overview')">
            <div class="icon-container">
              <font-awesome-icon icon="chart-bar" class="icon"></font-awesome-icon>
            </div>
            <span>Overview</span>
          </div>
          <div class="menu-item" :class="{ 'active': isFavorite }" v-on:click="setMenu('favorites')">
            <div class="icon-container">
              <font-awesome-icon icon="heart" class="icon"></font-awesome-icon>
            </div>
            <span>Favorites</span>
          </div>
          <div class="menu-item" :class="{ 'active': isWatchlist }" v-on:click="setMenu('watchlist')">
            <div class="icon-container">
              <font-awesome-icon icon="bookmark" class="icon"></font-awesome-icon>
            </div>
            <span>WatchList</span>
          </div>
          <div class="menu-item" :class="{ 'active': isRatings }" v-on:click="setMenu('ratings')">
            <div class="icon-container">
              <font-awesome-icon icon="star" class="icon"></font-awesome-icon>
            </div>
            <span>Ratings</span>
          </div>
          <div class="menu-item" :class="{ 'active': isTrophies }" v-on:click="setMenu('trophies')">
            <div class="icon-container">
              <font-awesome-icon icon="trophy" class="icon"></font-awesome-icon>
            </div>
            <span>Trophies</span>
          </div>
        </div>

        <div class="main-content-container">
          <div class="item-container" :class="{ 'active': isOverview }">
            <Overview></Overview>
          </div>

          <div class="item-container" :class="{ 'active': isFavorite }">
            <List :title="'Favorites'" :items=user.favorites.items :count=user.favorites.count @fetch=fetchFavorites></List>
          </div>

          <div class="item-container" :class="{ 'active': isWatchlist }">
            <List :title="'Watchlist'" :items=user.bookmarks.items :count=user.bookmarks.count @fetch=fetchBookmarks></List>
          </div>

          <div class="item-container" :class="{ 'active': isRatings }">
            <List :title="'Ratings'" :items=user.reviewed.items :count=user.reviewed.count @fetch=fetchReviewed></List>
          </div>

          <div class="item-container" :class="{ 'active': isTrophies }">
            <Trophies :title="'Trophies'" :subtitle="'you have earned'" :type="'earned'"></Trophies>
            <Trophies :title="'Trophies'" :subtitle="'waiting for you'" :type="'waiting'"></Trophies>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
