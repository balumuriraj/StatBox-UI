<template>
  <div class="dashboard">
    <section class="hero">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <!-- <img :src="user.photoURL" width="150"> -->
          <img src="../../assets/avatar.png" width="150">
          <p class="title">{{user.name}}</p>
          <!-- <p>Last Login: {{user.lastLogin}}</p>
          <p>User since: {{new Date(user.userSince).toLocaleDateString()}}</p> -->
        </div>
      </div>
    </section>

    <div class="menu-container">
      <div class="menu-item active">
        <div class="icon-container">
          <font-awesome-icon icon="chart-bar" class="icon"></font-awesome-icon>
        </div>
        <span>Overview</span>
      </div>
      <div class="menu-item"> 
        <div class="icon-container">
          <font-awesome-icon icon="heart" class="icon"></font-awesome-icon>
        </div>
        <span>Favorites</span>
      </div>
      <div class="menu-item">
        <div class="icon-container">
          <font-awesome-icon icon="bookmark" class="icon"></font-awesome-icon>
        </div>
        <span>WatchList</span>
      </div>
      <div class="menu-item">
        <div class="icon-container">
          <font-awesome-icon icon="star" class="icon"></font-awesome-icon>
        </div>
        <span>Ratings</span>
      </div>
    </div>

    <!-- content -->
    <section class="section">
      <div class="carousels">
        <!-- <pre>{{user}}</pre> -->
        <Carousel title="Bookmarks" :movies="user.bookmarks.items" :count=user.bookmarks.count @fetch=fetchBookmarks></Carousel>
        <br>
        <Carousel title="Seen" :movies="user.seen.items" :count=user.seen.count @fetch=fetchSeen></Carousel>
        <br>
        <Carousel title="Reviewed" :movies="user.reviewed.items"  :count=user.reviewed.count @fetch=fetchReviewed></Carousel>
        <br>
      </div>
    </section>
  </div>  
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
