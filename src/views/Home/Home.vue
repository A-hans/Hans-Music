<template>
  <div id="home">
    <transition name="el-zoom-in-top">
      <home-swiper class="swiper" :bannerData="bannerlist"></home-swiper>
    </transition>
      <home-playlist :playlistData='playlist'/>
      <home-recommend-song :recommendSongsData='recomendSongs'/>
    <home-recommend-singer :recommendSingerData='recomendSingers'/>
  </div>
</template>

<script>
import { getHomeBanner,getHomePlaylist,getHomeRecommendSong,getRecommendSinger } from "network/Home";

import HomeSwiper from "views/Home/ChildComps/HomeSwiper";
import HomePlaylist from "views/Home/ChildComps/HomePlaylist";
import HomeRecommendSong from "views/Home/ChildComps/HomeRecommendSong"
import HomeRecommendSinger from "views/Home/ChildComps/HomeRecommendSinger"

export default {
  name: "Home",
  data() {
    return {
      bannerlist: [],
      playlist: [],
      recomendSongs:[],
      recomendSingers:[]
    };
  },
  methods: {},
  components: {
    HomeSwiper,
    HomePlaylist,
    HomeRecommendSong,
    HomeRecommendSinger
  },
  created() {
    /* 
    网络请求
    */
    //获取轮播图数据
    getHomeBanner().then((res) => {
      this.bannerlist = res.banners;
    });
    //获取歌单数据,可传入需要多少条数据
    getHomePlaylist(12).then((res) => {
      this.playlist = res.result;
      //对播放量进行数据格式化
      for (let item of this.playlist) {
        if (parseInt(item.playCount / 10000).toString().length >= 5) {
          item.playCount = parseInt(item.playCount / 100000000) + "亿";
        } else {
          item.playCount = parseInt(item.playCount / 10000) + "万";
        }
      }
    });
    //获取推荐歌曲
    getHomeRecommendSong().then((res) => {
      this.recomendSongs = res.result;
    })
    //获取推荐歌手
    getRecommendSinger(0,24).then((res) => {
      this.recomendSingers = res.artists;
    })
  },
};
</script>

<style scoped>

</style>