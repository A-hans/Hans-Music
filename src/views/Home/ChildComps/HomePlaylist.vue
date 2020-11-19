<template>
  <div class="home-playlist">
    <div class="title">
       <h3>推荐歌单</h3>
    </div>
    <transition name="el-zoom-in-center">
      <song-list :playlistData='playlistData'/>
    </transition>
  </div>
</template>

<script>
import SongList from "components/content/SongList/SongList";
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
    SongList
  }
}
</script>

<style scoped>
</style>