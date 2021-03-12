<template>
  <div class="detail-plalist">
    <el-row :gutter="20">
      <el-col :span="15" class="left">
        <div>
          <detail-header :detailHeader="playlist" />
          <detail-playlist-table :playlistItem="allSong" />
        </div>
      </el-col>
      <el-col :span="8">
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
import DetailPlaylistTable from "components/content/PlaylistTable/DetailPlaylistTable";
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
      //小于600首的id
      trackIds1: [],
      //大于600首后的id
      trackIds2: [],
      //存放所有歌曲
      allSong: [],
      //喜欢此歌单的人
      subscriber: [],
      //存放相近歌单
      relatedList: [],
      //存放热门评论
      hotComments: [],
      //存放序号
      index: 0,
    };
  },
  methods: {
    //给表格中的单曲增加一个序号属性
    addOrder(res,num) {
      for (let item of res.songs) {
        //循环开始则自加1
        ++num;
        //定义一个orderNum来存放当前序号
        item.orderNum = num;
      }
    },
    //获取所有歌曲ID
    getAllSongId() {
      for (let item of this.playlist.trackIds) {
        //将歌曲的id储存起来,进行网络请求完整的歌单
        this.trackIds.push(item.id);
      }
      //歌单数量少于600
      if (this.playlist.trackIds.length < 600) {
        //数据格式化(做字符串拼接)
        this.trackIds = this.trackIds.join(",");
      }
      //歌单数量超过600
      if (this.playlist.trackIds.length > 600) {
        let arr = [];
        let tempArr = [];
        console.log(this.trackIds);
        arr = this.groupArray(this.trackIds, 600);
        for (let item of arr) {
          tempArr.push(item.join(","));
          this.trackIds = tempArr;
        }
      }
    },
    //数组分割
    groupArray(data, cols) {
      const list = []; //存放分割好的数组
      let current = []; //存放当前分割的数组
      for (let t of data) {
        current.push(t);
        if (current.length === cols) {
          list.push(current);
          current = [];
        }
      }
      //将余数当独存放一组
      if (current.length) {
        list.push(current);
      }
      return list;
    },
    //请求所有歌单歌曲
    getAllSong() {
      //请求所有歌曲数据
      if (this.playlist.trackIds.length < 600) {
        getSongDetail(this.trackIds)
          .then((res) => {
            this.addOrder(res,0);
            this.allSong = res.songs;
          })
          .catch((err) => {});
      } else {
        //大于600首
        getMoreSongs(0, this);
        function getMoreSongs(num, _this) {
          if (num < _this.trackIds.length) {
            getSongDetail(_this.trackIds[num]).then((res) => {
              _this.addOrder(res,600*num);
              _this.allSong = _this.allSong.concat(res.songs);
              getMoreSongs(num + 1, _this);
            });
          }
        }
      }
    },
    //重新加载数据
    reloadRoute() {
      //数据重置
      this.playlist = {};
      this.trackIds = [];
      this.trackIds1 = [];
      this.trackIds2 = []; 
      this.allSong = [];
      this.subscriber = [];
      this.relatedList = [];
      this.hotComments = [];
      this.index = 0;
      //获取点击传入歌单的id信息
      let num = this.$route.query.id;
      //获取歌单详细信息
      getPlaylistDetail(num)
        .then((res) => {
          this.playlist = res.playlist;
          this.playlistTrackId = res.playlist.trackIds;
          //获取歌单中所有歌曲的id
          this.getAllSongId();
          //请求所有歌曲
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
  },
  components: {
    DetailHeader,
    DetailPlaylistTable,
    DetailSubscribers,
    DetailRelatedList,
    DetailHotComments,
  },
  watch: {
    // 监听路由的变化 参数变化时更新发布订阅数据
    $route(to, from) {
      //对路由进行判断,决定何时进行刷新
      if (to.fullPath.search("playlist-detail") == 1) {
        this.reloadRoute();
      }
    },
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
        //请求所有歌曲
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