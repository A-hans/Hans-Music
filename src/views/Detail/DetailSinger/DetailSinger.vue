<template>
  <div class="detail-singer">
    <detail-header
      :singerInfo="singerInfo"
      :descs="descs"
      v-if="this.singerInfo.artist && this.singerInfo.briefDesc"
    />
    <div class="title">
      <h3>热门歌曲</h3>
    </div>
    <detail-playlist-table :playlistItem="hotsongs" />
    <div class="title">
      <h3>热门专辑</h3>
    </div>
    <detail-album :albums="albums" v-if="albums" />
    <detail-related-singer
      :relatedSinger="relatedSinger"
      v-if="relatedSinger.length !== 0"
    />
  </div>
</template>

<script>
import {
  getSingerDesc,
  getSingerHotSong,
  getSingerAlbum,
  getRelatedSinger,
} from "network/Singer";

import DetailHeader from "views/Detail/DetailSinger/ChildComps/DetailHeader";
import DetailPlaylistTable from "views/Detail/DetailSinger/ChildComps/DetailPlaylistTable";
import DetailAlbum from "views/Detail/DetailSinger/ChildComps/DetailAlbum";
import DetailRelatedSinger from "views/Detail/DetailSinger/ChildComps/DetailRelatedSinger";

export default {
  name: "DetailSinger",
  data() {
    return {
      //存放歌手基本信息(头像,简介)
      singerInfo: {},
      //存放歌手详细介绍
      descs: [],
      //存放热门歌曲
      hotsongs: [],
      //存放专辑
      albums: [],
      //存放相似歌手
      relatedSinger: [],
    };
  },
  methods: {
    reloadRoute() {
      //数据重置
      this.singerInfo = {};
      this.descs = [];
      this.hotsongs = [];
      this.relatedSinger = [];
      //拿到当前歌手id
      let id = this.$route.query.id;
      //获取歌手描述
      getSingerDesc(id)
        .then((res) => {
          this.descs = res.introduction;
          //储存歌手简介
          this.singerInfo.briefDesc = res.briefDesc;
        })
        .catch((err) => {});

      //获取歌手热门歌曲
      getSingerHotSong(id)
        .then((res) => {
          //在歌曲列表中增加序号进行排序
          let num = 0;
          //只展示20首歌曲
          for (let item of res.songs) {
            //循环开始则自加1
            ++num;
            //定义一个orderNum来存放当前序号
            item.orderNum = num;
          }
          this.hotsongs = res.songs;
        })
        .catch((err) => {});

      //获取歌手专辑
      getSingerAlbum(id)
        .then((res) => {
          //存储歌手信息
          this.singerInfo.artist = res.artist;
          this.albums = res.hotAlbums;
        })
        .catch((err) => {});
      //获取相似歌手
      getRelatedSinger(id)
        .then((res) => {
          this.relatedSinger = res.artists;
        })
        .catch((err) => {});
    },
  },
  components: {
    DetailHeader,
    DetailPlaylistTable,
    DetailAlbum,
    DetailRelatedSinger,
  },
watch: {
    // 监听路由的变化 参数变化时更新发布订阅数据
      '$route'(to, from) {
        //对路由进行判断,决定何时进行刷新
        if(to.fullPath.search("singer-detail") == 1){
          this.reloadRoute()
        }
    }
}, 
  created() {
    //拿到当前歌手id
    let id = this.$route.query.id;
    //获取歌手描述
    getSingerDesc(id)
      .then((res) => {
        this.descs = res.introduction;
        //储存歌手简介
        this.singerInfo.briefDesc = res.briefDesc;
      })
      .catch((err) => {});

    //获取歌手热门歌曲
    getSingerHotSong(id)
      .then((res) => {
        //在歌曲列表中增加序号进行排序
        let num = 0;
        //只展示20首歌曲
        for (let item of res.songs) {
          //循环开始则自加1
          ++num;
          //定义一个orderNum来存放当前序号
          item.orderNum = num;
          //将增加序号的元素加入本地数组
        }
        this.hotsongs = res.songs;
      })
      .catch((err) => {});

    //获取歌手专辑
    getSingerAlbum(id)
      .then((res) => {
        //存储歌手信息
        this.singerInfo.artist = res.artist;
        this.albums = res.hotAlbums;
      })
      .catch((err) => {});
    //获取相似歌手
    getRelatedSinger(id)
      .then((res) => {
        this.relatedSinger = res.artists;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.detail-singer {
  padding: 30px 20px;
  margin-right: 20px;
  height: 100%;
  border-radius: 15px;
  background: var(--color-background);
}
.title {
  margin-top: 30px;
  font-size: 13px;
}
</style>