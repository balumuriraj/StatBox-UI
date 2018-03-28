<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass" src="bulma"></style>
<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);
  @import "../node_modules/chartist/dist/scss/chartist.scss";
  
  html,
  body {
    font-size: 1em;
    font-family: "Roboto";
    letter-spacing: 0.25px;
    margin: 0;
    padding: 0;
    background: #E5E5E5;
  }

  .ct-series-a .ct-area {
  fill: #FFD02E;
  fill-opacity: 1;
}

.ct-label {
  color: #fffeee;
  font-size: 0.9rem;
}
</style>
