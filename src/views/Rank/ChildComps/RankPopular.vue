<template>
  <div class='rank-popular'>
    <div class='title'>
    <h3>云音乐热榜</h3>
    </div>
    <transition name="el-zoom-in-top">
    <song-list :playlistData='rankPopularData.slice(0,4)'/>
    </transition>
  </div>
</template>

<script>
import SongList from "components/content/SongList/SongList";
export default {
  name:'RankPopular',
  props:{
    rankPopularData:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components:{
   SongList
  }
}
</script>

<style scoped>
  .title{
    border-left:5px solid red;
    padding: 0 10px;
  }
</style>