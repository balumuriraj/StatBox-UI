<template>
  <footer class="footer">
    <div class="container">
      <div class="left-container">
        <div class="logo">
          <img :src="require('@/assets/logo.svg')">
        </div>
        <div class="title-container">
          <div class="title">statbox</div>
          <div class="sub-title">Telugu Movies Database</div>
        </div>
      </div>
      <div class="right-container">
        <div class="links">
          <a href="#">Terms of Service</a>
          <span>|</span>
          <a href="#"> Privacy Policy</a>
        </div>
        <div class="about">statbox is a Telugu Movie Database where you can browse, search, rate and find legal streaming links to telugu movies.</div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
