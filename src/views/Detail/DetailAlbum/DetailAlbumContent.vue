<template>
  <div class="detail-album">
    <el-row :gutter="20">
      <el-col :span="15" class="ablum-left">
        <div>
          <detail-header :ablumHeader="albumInfo" />
          <detail-playlist-table
            v-if="albumInfo"
            :playlistItem="albumInfo.songs"
            class="playlist-table"
          />
        </div>
      </el-col>
      <el-col :span="8" class="ablum-right">
        <detail-album-info :activeInfo="activeInfo" />
        <detail-comments :hotComments="comments" class="hot-comments"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAlbumDetail, getAlbumComment,getAlbumActiveInfo } from "network/Album";

import DetailHeader from "views/Detail/DetailAlbum/ChildComps/DetailHeader";
import DetailAlbumInfo from "views/Detail/DetailAlbum/ChildComps/DetailAlbumInfo";
import DetailPlaylistTable from "components/content/PlaylistTable/DetailPlaylistTable";
import DetailComments from "views/Detail/DetailPlaylist/ChildComps/DetailHotComments";

export default {
  name: "DetailAblumContent",
  data() {
    return {
      //存放专辑信息
      albumInfo: null,
      //存放评论信息,只接收10条
      comments: [],
      //存放专辑动态信息
      activeInfo:null
    };
  },
  components: {
    DetailHeader,
    DetailPlaylistTable,
    DetailComments,
    DetailAlbumInfo
  },
  created() {
    //接收专辑id
    let id = this.$route.query.id;
    //获取专辑详细信息
    getAlbumDetail(id)
      .then((res) => {
        let num = 0;
        //给歌曲增加序号
        for(let item of res.songs){
          ++num;
          item.orderNum = num;
        }
        this.albumInfo = res;
      })
      .catch((err) => {});
    //获取专辑评论
    getAlbumComment(id)
      .then((res) => {
      this.comments = res.comments;
      })
      .catch((err) => {});
    //获取专辑动态信息
    getAlbumActiveInfo(id).then((res)=>{
      this.activeInfo = res;
    }).catch((err)=>{})
  },
};
</script>

<style scoped>
.ablum-left {
  padding: 30px 20px !important;
  height: 100%;
  border-radius: 15px;
  background: var(--color-background);
}
.playlist-table {
  margin-top: 40px;
}

</style>