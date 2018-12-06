<template>
  <div id="app">
    <Menu></Menu>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';

@Component({
  components: {
    Menu,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700);
@import url(https://fonts.googleapis.com/css?family=Dosis:400,500,700);
@import url(https://fonts.googleapis.com/css?family=Righteous);
@import "../node_modules/chartist/dist/scss/chartist.scss";

html,
body {
  font-size: 0.95em;
  font-family: "Roboto";
  letter-spacing: 0.25px;
  margin: 0;
  padding: 0;
  background: #f2f2f2;
  width: 100%;
  height: 100%;
}

.ct-series-a .ct-area {
  fill: #ffd02e;
  fill-opacity: 1;
}

.ct-series-a,
.ct-series-b,
.ct-series-c,
.ct-series-d,
.ct-series-e,
.ct-series-f,
.ct-series-g,
.ct-series-h,
.ct-series-i,
.ct-series-j {
  .ct-bar {
    stroke-width: 10%;
    // fill-opacity: 0.5;
    stroke: #ffd02e;
  }
}

.swiper-wrapper {
  margin: 2px !important;
}
</style>
