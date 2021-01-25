<template>
  <div id="home">
    <transition name="el-zoom-in-top">
      <home-swiper class="swiper" :bannerData="bannerlist"></home-swiper>
    </transition>
    <home-playlist :playlistData="playlist" />
    <home-recommend-song :recommendSongsData="recomendSongs" />
    <home-recommend-singer
      class="recommend-singer"
      :recommendSingerData="recomendSingers"
    />
  </div>
</template>

<script>
import {
  getHomeBanner,
  getHomePlaylist,
  getHomeRecommendSong,
  getRecommendSinger,
} from "network/Home";

import HomeSwiper from "views/Home/ChildComps/HomeSwiper";
import HomePlaylist from "views/Home/ChildComps/HomePlaylist";
import HomeRecommendSong from "views/Home/ChildComps/HomeRecommendSong";
import HomeRecommendSinger from "views/Home/ChildComps/HomeRecommendSinger";

export default {
  name: "Home",
  data() {
    return {
      bannerlist: [],
      playlist: [],
      recomendSongs: [],

      recomendSingers: [],
    };
  },
  methods: {},
  components: {
    HomeSwiper,
    HomePlaylist,
    HomeRecommendSong,
    HomeRecommendSinger,
  },
  created() {
    /* 
    网络请求
    */
    //获取轮播图数据
    getHomeBanner()
      .then((res) => {
        console.log(res);
        this.bannerlist = res.banners;
      })
      .catch((err) => {});
    //获取歌单数据,可传入需要多少条数据
    getHomePlaylist(12)
      .then((res) => {
        this.playlist = res.result;
      })
      .catch((err) => {});
    //获取推荐歌曲
    getHomeRecommendSong()
      .then((res) => {
        for (let item of res.result) {
           let recomendSong = {
            id: 0,
            name: null,
            dt: 0,
            al: {
              picUrl: "",
            },
            ar: [],
          };
         recomendSong.name = item.name;
          recomendSong.id = item.id;
          recomendSong.al.picUrl = item.picUrl;
          recomendSong.ar = item.song.artists;
          recomendSong.dt = item.song.duration;
          this.recomendSongs.push(recomendSong);
        }
      })
      .catch((err) => {});
    //获取推荐歌手
    getRecommendSinger(0, 16)
      .then((res) => {
        this.recomendSingers = res.artists;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.swiper {
  margin-bottom: 20px;
}
.recommend-singer {
  margin-top: 35px;
}
</style>