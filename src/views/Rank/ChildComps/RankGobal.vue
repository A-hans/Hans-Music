<template>
  <div class='rank-gobal'>
    <div class='title'>
      <h3>全球音乐热榜</h3>
    </div>
    <transition name="el-zoom-in-top">
    <play-list :playlistData='rankHotData.slice(0,rankHotData.length)'/>
    </transition>
  </div>
</template>

<script>
import PlayList from 'views/Rank/ChildComps/RankPlayListItem'
export default {
  name:'RankHot',
  props:{
    rankHotData:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    PlayList
  }
}
</script>

<style scoped>
  .title{
    border-left:5px solid red;
    padding: 0 10px;
  }
</style>