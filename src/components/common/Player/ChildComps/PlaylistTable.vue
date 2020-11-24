<template>
  <div class="playlistTable">
    <div class="header">
      <span class="title">播放列表</span>
      <i class="el-icon-delete"></i>
    </div>
    <div class="playlist-content">
    </div>
  </div>
</template>

<script>
export default {
  name:"playlistTable"
}
</script>

<style scoped>
  .playlistTable{
    width: 280px;
    height: 400px;
    padding: 15px;
    border-radius: 6px;
    background-color:var(--color-background) ;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  }
  .playlistTable .title{
    margin-right: 150px;
  }
</style>