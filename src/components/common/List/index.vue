<template>
  <div class="list-container" ref="listBox">
    <!-- <div class="title-container">
      <div class="title-block">
        <p class="title" v-if=title>{{ title }} <span>{{subtitle}}</span></p>
        <p class="count" v-if=count>{{processedItems && processedItems.length || 0}} / {{ count }}</p>
      </div>
      <div class="views-block">
        <div class="icon-container" :class="{ 'active': view === 'list' }" @click="view = 'list'">
          <font-awesome-icon icon="th-list" class="icon"></font-awesome-icon>
        </div>
        <div class="icon-container" :class="{ 'active': view === 'box' }" @click="view = 'box'">
          <font-awesome-icon icon="th" class="icon"></font-awesome-icon>
        </div>
      </div>
    </div> -->

    <div class="list-block" v-if="view === 'box' && processedItems && processedItems.length">
      <div v-for="item in processedItems" :key="item.id" :class="{ 'list-item': true, 'custom': isDashboard }">
        <Card :item="item"></Card>
      </div>
    </div>

    <div v-else-if="processedItems && processedItems.length" class="table-block">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="title">Title</th>
            <th>Release</th>
            <th>Cert</th>
            <th>Rating</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in processedItems" :key="item.id">
            <td class="poster">
              <router-link :to="'/movie/'+item.id"><img :src=item.poster></router-link>
            </td>
            <td class="title"><router-link :to="'/movie/'+item.id">{{item.title}}</router-link></td>
            <td>{{item.releaseDate || "-"}}</td>
            <td>{{item.cert || "-"}}</td>
            <td>
              <span class="user-rating" v-if="item.userReview && item.userReview.rating">
                <font-awesome-icon icon="star" class="icon"></font-awesome-icon> {{item.userReview.rating && Math.round(item.userReview.rating * 100) / 100 || '-'}}
              </span>
              <span class="rating" v-else>
                <font-awesome-icon v-if="item.rating" icon="star" class="icon"></font-awesome-icon> {{item.rating && Math.round(item.rating * 100) / 100 || '-'}}
              </span>
            </td>
            <td>
              <div class="favorites-button button" v-on:click="item.setFavorite(!item.isFavorite)">
                <font-awesome-icon icon="heart" class="icon" :class="{ 'active': item.isFavorite }"></font-awesome-icon> 
                <span> Favorite</span>
              </div>
            </td>
            <td>
              <div class="bookmark-button button" v-on:click="item.setBookmark(!item.isBookmarked)">
                <font-awesome-icon icon="bookmark" class="icon" :class="{ 'active': item.isBookmarked }"></font-awesome-icon> 
                <span> WatchList</span>
              </div>
            </td>
            <td>
              <div class="review-button button" v-on:click="setReview(item)">
                <font-awesome-icon icon="edit" class="icon" :class="{ 'active': item.isReviewed }"></font-awesome-icon> 
                <span> Review</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <EmptyBox></EmptyBox>
    </div>

    <div class="loading">
      <span class="icon-container"><font-awesome-icon v-show=loading icon="circle-notch" spin /></span>
      <div v-show="!loading && count && currentCount !== count" class="load">
        <span>show more</span>
        <div class="icon-container"><font-awesome-icon :icon="['fas', 'chevron-down']" /></div> 
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>