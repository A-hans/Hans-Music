<template>
  <div class="detail-plalist">
    <el-row :gutter="20">
      <el-col :span="15" class="left">
        <div class="grid-content bg-purple">
          <detail-header :detailHeader="playlist" />
          <detail-playlist-table :playlistItem="allSong" />
        </div>
      </el-col>
      <el-col :span="8" class="right">
        <detail-subscribers :subscribers="subscriber" />
        <detail-related-list :relatedList="relatedList" />
        <detail-hot-comments :hotComments="hotComments" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getPlaylistDetail,
  getSongDetail,
  getPlaylistSubscriber,
  getRelatedList,
  getCommentInfo,
} from "network/Playlist";

import DetailHeader from "views/Detail/DetailPlaylist/ChildComps/DetailHeader";
import DetailPlaylistTable from "views/Detail/DetailPlaylist/ChildComps/DetailPlaylistTable";
import DetailSubscribers from "views/Detail/DetailPlaylist/ChildComps/DetailSubscribers";
import DetailRelatedList from "views/Detail/DetailPlaylist/ChildComps/DetailRelatedList";
import DetailHotComments from "views/Detail/DetailPlaylist/ChildComps/DetailHotComments";
export default {
  name: "DetailPlaylist",
  data() {
    return {
      //存放歌单详细信息
      playlist: {},
      //存放歌曲的id
      trackIds: [],
      //存放所有歌曲
      allSong: [],
      //喜欢此歌单的人
      subscriber: [],
      //存放相近歌单
      relatedList: [],
      //存放热门评论
      hotComments: [],
    };
  },
  methods: {
    //给表格中的单曲增加一个序号属性
    addOrder(res) {
      let num = 0; //用于存放当前序号
      for (let item of res.songs) {
        //循环开始则自加1
        ++num;
        console.log(1);
        //定义一个orderNum来存放当前序号
        item.orderNum = num;
      }
    },
    //获取歌单中所有歌曲id
    getAllSongId() {
      for (let item of this.playlist.trackIds) {
        //将歌曲的id储存起来,进行网络请求完整的歌单
        this.trackIds.push(item.id);
      }
    },
    //请求所有歌单歌曲
    getAllSong() {
      let num = 0; //用于存放当前序号
      for (let item of this.trackIds) {
        //请求所有歌曲数据
        getSongDetail(item)
          .then((res) => {
            //添加序号用于排序
            for (let item of res.songs) {
              //循环开始则自加1
              ++num;
              //定义一个orderNum来存放当前序号
              item.orderNum = num;
            }
            this.allSong.push(res.songs);
          })
          .catch((err) => {});
      }
    },
  },
  components: {
    DetailHeader,
    DetailPlaylistTable,
    DetailSubscribers,
    DetailRelatedList,
    DetailHotComments,
  },
  created() {
    //获取点击传入歌单的id信息
    let num = this.$route.query.id;
    //获取歌单详细信息
    getPlaylistDetail(num)
      .then((res) => {
        this.playlist = res.playlist;
        //获取歌单中所有歌曲的id
        this.getAllSongId();
        //请求多有歌曲
        this.getAllSong();
      })
      .catch((err) => {});
    //获取喜欢此歌单的用户
    getPlaylistSubscriber(num)
      .then((res) => {
        this.subscriber = res.subscribers;
      })
      .catch((err) => {});
    //获取相似歌单列表
    getRelatedList(num)
      .then((res) => {
        this.relatedList = res.playlists;
      })
      .catch((err) => {});
    //获取热门评论
    getCommentInfo(num)
      .then((res) => {
        this.hotComments = res.hotComments;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.left {
  padding: 30px 0;
  height: 100%;
  border-radius: 15px;
  background: var(--color-background);
}
</style>