<template>
  <div class="home">
    <section class="hero is-danger">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <!-- <img :src="user.photoURL" width="150"> -->
          <img src="../../assets/avatar.png" width="150">
          <p class="title">{{user.name}}</p>
          <p>Last Login: {{user.lastLogin}}</p>
          <p>User since: {{new Date(user.userSince).toLocaleDateString()}}</p>
        </div>
      </div>
    </section>

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
