<template>
  <div id="app">
    <el-container>
      <el-header>
        <tab-bar></tab-bar>
      </el-header>
      <el-main>
        <keep-alive 
        >
          <router-view  :key="$route.fullPath"/>
        </keep-alive>
      </el-main>
      <el-footer>
        <footer-bar />
      </el-footer>
      <div class="player">
        <transition name="el-zoom-in-bottom">
          <Player />
        </transition>
      </div>
      <el-backtop class="backtop" :bottom="70"></el-backtop>
    </el-container>
  </div>
</template>

<script>
import TabBar from "components/content/TabBar/TabBar.vue";
import FooterBar from "components/content/Footer/FooterBar.vue";
import Player from "components/common/Player/Player";

export default {
  name: "App",
  components: {
    TabBar,
    FooterBar,
    Player,
  },
};
</script>

<style>
@import "assets/css/base.css";
body {
  height: 100%;
  width: 100%;
  min-width: 1250px;
  background: rgba(192, 192, 192, 0.1);
}
.el-main {
  width: 1100px;
  margin: 0 auto;
  margin-top: 60px;
}
.player {
  border: 1px solid transparent;
  box-shadow: 0px 2px 1px 2px rgba(0, 0, 0, 0.1);
  background: var(--color-background);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
.el-header {
  border: 1px solid transparent;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  background: var(--color-background);
  padding: 0 120px !important;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: var(--color-high-text) !important;
}

.backtop {
  color: #ff6347 !important;
}

.create-isLoading .el-loading-spinner {
  top: 50%;
  left: 50%;
  margin-left: -55px;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 4px;
  width: auto;
  text-align: center;
  position: absolute;
}
.create-isLoading .el-loading-spinner i {
  font-size: 40px;
  padding: 10px;
  color: #eee;
}

.create-isLoading .el-loading-spinner .el-loading-text {
  color: #eee;
  font-size: 16px;
}
.el-tabs__item.is-active {
  color: var(--color-high-text) !important;
}
.el-tabs__item:hover {
  color: var(--color-high-text) !important;
}
.el-tabs__active-bar {
  background-color: var(--color-high-text) !important;
}

.el-slider__button {
  width: 12px !important;
  height: 12px !important;
  border: 1px solid #fd5452 !important;
}
.el-slider__bar {
  background-color: #fd5452 !important;
}
.el-slider__runway {
  background-color: WhiteSmoke !important;
}
</style>
