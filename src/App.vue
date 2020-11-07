<template>
  <div id="app">
    <el-container>
      <el-header>
        <tab-bar></tab-bar>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <footer-bar />
      </el-footer>
        <el-backtop class='backtop'></el-backtop>
    </el-container>
  </div>
</template>

<script>
import TabBar from "components/content/TabBar/TabBar.vue";
import FooterBar from "components/content/Footer/FooterBar.vue";

export default {
  name: "App",
  components: {
    TabBar,
    FooterBar
  },
};
</script>

<style>
@import "assets/css/base.css";
body {
  height: 100%;
  width:100%;
  min-width: 1250px;
  background: rgba(	192,192,192, 0.1) ;
}
.el-container{
  padding: 0 120px;
}
.el-header{
  border: 1px solid transparent;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  background: var(--color-background);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 120px!important;
  z-index: 999;
}
.el-main{
  margin-top:60px ;
}

.backtop{
  color:  #FF6347!important;
}
</style>
