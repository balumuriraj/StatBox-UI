<template>
  <div id="app">
    <div class="main-container">
      <Menu></Menu>
      <router-view/>
      <ReviewModal></ReviewModal>   
      <LoginModal></LoginModal>         
      <Notification></Notification>
    </div>
    <div class="footer-container">
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';
import LoginModal from '@/components/common/LoginModal';
import ReviewModal from '@/components/common/ReviewModal';
import Notification from '@/components/common/Notification';

@Component({
  components: {
    Menu,
    Footer,
    LoginModal,
    ReviewModal,
    Notification
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
// @import url(https://fonts.googleapis.com/css?family=Karla:400,500,700);
// @import url(https://fonts.googleapis.com/css?family=Ubuntu:400,500,700);
// @import url(https://fonts.googleapis.com/css?family=Nunito:400,500,700);
@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Dosis:400,500,700);
@import url(https://fonts.googleapis.com/css?family=Righteous);
@import "../node_modules/chartist/dist/scss/chartist.scss";

html,
body {
  font-size: 0.95em;
  font-family: "Roboto";
  letter-spacing: 0.5px;
  margin: 0;
  padding: 0;
  background: #100e17;
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .main-container {
    flex: 1 0 auto;
  }

  .footer-container {
    flex-shrink: 0;
  }
}

.ct-series-a .ct-area {
  fill: #32ff7e;
  fill-opacity: 0.15;
}

.ct-series .ct-bar {
  stroke: #ffd02e;
}

.ct-label {
  color: #DFE4EA;
}

.swiper-wrapper {
  margin: 2px !important;
}
</style>
