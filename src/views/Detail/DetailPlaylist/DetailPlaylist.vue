<template>
  <div class="detail-plalist">
    <el-row :gutter="20">
    <el-col :span="15" class='left'>
      <div class="grid-content bg-purple">
        <detail-header :detailHeader='playlist'/>
        <detail-playlist-table :playlistItem='playlist.tracks'/>
      </div>
      </el-col>
    <el-col :span="8" class='right'>
      <div >
        占位
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getPlaylistDetail} from "network/Playlist";

import DetailHeader from "views/Detail/DetailPlaylist/ChildComps/DetailHeader";
import DetailPlaylistTable from "views/Detail/DetailPlaylist/ChildComps/DetailPlaylistTable";
export default {
  name:'DetailPlaylist',
  data(){
    return{
      playlist:{}
    }
  },
  methods:{
    //给表格中的单曲增加一个序号属性
    addOredr(){
      let num = 0;//用于存放当前序号
      for(let item of this.playlist.tracks){
          //循环开始则自加1
          ++num;
          //定义一个orderNum来存放当前序号
          item.orderNum =num;
      }
    }
  },
  components:{
    DetailHeader,
    DetailPlaylistTable
  },
  created(){
    //获取点击传入歌单的id信息
    let num = this.$route.query.id
    //获取歌单详细信息
    getPlaylistDetail(num).then((res) =>{
     this.playlist=res.playlist;
    //给歌曲加一个属性存放序号
    this.addOredr();
    })
  }

}
</script>

<style scoped>
.left{
  padding: 30px 0;
  margin-right: 20px;
  height: 100%;
  border-radius: 15px;
  background: var(--color-background);
}
 .right{
  height: 800px;
  border-radius: 15px;
  background: var(--color-background);
} 

</style>