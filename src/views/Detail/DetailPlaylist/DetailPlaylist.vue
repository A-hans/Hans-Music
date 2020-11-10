<template>
  <div class="detail-plalist">
    <el-row :gutter="20">
    <el-col :span="16" class='left'>
      <div class="grid-content bg-purple">
        <detail-header :detailHeader='playlist'/>
      </div>
      </el-col>
    <el-col :span="8" class='right'><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {getPlaylistDetail} from "network/Playlist";

import DetailHeader from "views/Detail/DetailPlaylist/ChildComps/DetailHeader"
export default {
  name:'DetailPlaylist',
  data(){
    return{
      playlist:{}
    }
  },
  components:{
    DetailHeader
  },
  created(){
    //获取点击传入歌单的id信息
    let num = this.$route.query.id
    //获取歌单详细信息
    getPlaylistDetail(num).then((res) =>{
     this.playlist=res.playlist;
    })
  }

}
</script>

<style scoped>

.left{
  height: 100%;
  border-radius: 15px;
  background: var(--color-background);
}
/* .right{
  height: 100%;
  padding: 20px 15px;
  border-radius: 15px;
  background: var(--color-background);
} */

</style>