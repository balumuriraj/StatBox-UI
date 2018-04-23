<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma";
@import "~bulma-tooltip";

@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);
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
</style>
