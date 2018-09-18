<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma";
@import "~bulma-tooltip";

@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);
@import url(https://fonts.googleapis.com/css?family=Dosis:400,500,700);
@import "../node_modules/chartist/dist/scss/chartist.scss";

html,
body {
  font-size: 0.95em;
  font-family: "Roboto";
  letter-spacing: 0.25px;
  margin: 0;
  padding: 0;
  background: #e5e5e5;
}

.ct-series-a .ct-area {
  fill: #ffd02e;
  fill-opacity: 1;
}

.ct-bar {
  stroke-width: 40px;
}

// .ct-label {
//   color: #fffeee;
//   font-size: 0.9rem;
// }

// swiper customization
.swiper-custom-pagination-bullet {
  background: #abb7c4;
  width: 10px;
  height: 10px;
  margin: 0 2px;
  display: inline-block;
  cursor: pointer;
}

.swiper-custom-pagination-bullet-active {
  background: #f06060;
}
</style>
