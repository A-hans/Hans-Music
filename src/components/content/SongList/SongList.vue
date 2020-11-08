<template>
<div class='playList'>
  <el-row  :gutter="20">
        <song-list-item 
        :listItemData= 'item'
         v-for='(item,index) in playlistData' 
        :key= 'index'>
        </song-list-item>
      </el-row>
</div>  
</template>

<script>
import SongListItem from "components/content/SongList/SongListItem"
export default {
  name:'SongList',
  props:{
    playlistData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    SongListItem
  }
}
</script>

<style scoped>
.el-row {
  margin: 20px 0;
}
</style>