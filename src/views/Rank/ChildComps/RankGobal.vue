<template>
  <div class='rank-gobal'>
    <div class='title'>
      <h3>全球音乐热榜</h3>
    </div>
    <transition name="el-zoom-in-top">
    <song-list :playlistData='rankGobalData.slice(4,rankGobalData.length)'/>
    </transition>
  </div>
</template>

<script>
import SongList from "components/content/SongList/SongList"
export default {
  name:'RankGobal',
  props:{
    rankGobalData:{
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