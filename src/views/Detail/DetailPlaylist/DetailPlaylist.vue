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
      //小于700首的id
      trackIds1:[],
      //大于700首后的id
      trackIds2:[],
      //存放所有歌曲
      allSong: [],
      //喜欢此歌单的人
      subscriber: [],
      //存放相近歌单
      relatedList: [],
      //存放热门评论
      hotComments: [],
      //存放序号
      index :0,
     
    };
  },
  methods: {
    //给表格中的单曲增加一个序号属性
    addOrder(res) {
      let num = 0; //用于存放当前序号
      for (let item of res.songs) {
        //循环开始则自加1
        ++num;
        //定义一个orderNum来存放当前序号
        item.orderNum = num;
      }
    },
    //获取歌单中所有歌曲id
    getAllSongId() {
      if(this.playlist.trackIds.length<600){
         for (let item of this.playlist.trackIds) {
        //将歌曲的id储存起来,进行网络请求完整的歌单
        this.trackIds.push(item.id);
      }
      //将数组转为字符串,统一网络请求 
     this.trackIds = this.trackIds.join(",");
      }
      if(this.playlist.trackIds.length>600) {
        //目前只能展示1200首
        const newTracksId=this.playlist.trackIds.slice(600,1200);
        for(let i=0;i<600;i++){
          this.trackIds1.push(this.playlist.trackIds[i].id);
        }
         this.trackIds1 = this.trackIds1.join(",");
          
        for(let j=0;j<newTracksId.length;j++){
          this.trackIds2.push(this.playlist.trackIds[j].id);
        }
         this.trackIds2 = this.trackIds2.join(",");
      }
    },
    //请求所有歌单歌曲
    getAllSong() {
      //请求所有歌曲数据
      if(this.playlist.trackIds.length<600){
        getSongDetail(this.trackIds)
        .then((res) => {
        this.addOrder(res);
        this.allSong = res.songs;
        })
        .catch((err) => {});
      }else{
        getSongDetail(this.trackIds1)
        .then((res) => {
        this.addOrder(res);
        this.allSong = res.songs;
        getSongDetail(this.trackIds2)
        .then((res) => {
        let num = 600; //用于存放当前序号
        for (let item of res.songs) {
        //循环开始则自加1
        ++num;
        //定义一个orderNum来存放当前序号
        item.orderNum = num;
      }
        let songs =res.songs;
        this.allSong =this.allSong.concat(songs);
        
        })
        .catch((err) => {});
        })
        .catch((err) => {});
        
      }
     
    },
    //重新加载数据
    reloadRoute() {
      //数据重置
      this.playlist = {};
      this.trackIds = [];
      this.trackIds1 = [],
      this.trackIds2 = [],
      this.allSong = [];
      this.subscriber = [];
      this.relatedList = [];
      this.hotComments = [];
      this.index =0;
    //获取点击传入歌单的id信息
    let num = this.$route.query.id;
    //获取歌单详细信息
    getPlaylistDetail(num)
      .then((res) => {
        this.playlist = res.playlist;
        this.playlistTrackId = res.playlist.trackIds
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