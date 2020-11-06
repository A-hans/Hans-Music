<template>
  <div class="home-playlist">
    <h3>推荐歌单</h3>
    <transition name="el-zoom-in-center">
      <home-playlist-item :playlistData='playlistData.slice(0,6)'/>
    </transition>
    <transition name="el-zoom-in-center">
      <home-playlist-item :playlistData='playlistData.slice(6,12)'/>
    </transition>
  </div>
</template>

<script>
import HomePlaylistItem from 'views/Home/ChildComps/HomePlaylistItem'
export default {
  name:'HomePlaylist',
  props:{
    playlistData:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  components:{
    HomePlaylistItem
  }
}
</script>

<style scoped>
  .home-playlist h3{
    padding-top: 20px;
    color: #303133;
  }
</style>