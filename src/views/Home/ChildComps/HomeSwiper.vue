<template>
<!-- 做一层非空判断 -->
<div class='swiper' v-if="bannerData.length !==0">
  <el-carousel :interval="5000" type="card" height="200px">
    <el-carousel-item 
    class='swiper-item'
    v-for="(item,index) in bannerData " 
    :key="index"
    @click.native="swiperHandel(item,index)">
      <img :src="item.imageUrl" alt="">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import {mapMutations} from "vuex"
import {getSongDetail} from "network/Playlist"
export default {
  name:'Swiper',
  props:{
    bannerData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      //存储音乐ID
      bannerListUrl:[],
      //存储轮播图歌曲
      bannerSongs:[],
      //转字符串后的音乐ID
      bannerListUrlStr:'',
      //对当前播放索引做记录
      currentIndex:''
    }
  },
  methods:{
    ...mapMutations(["SET_PLAYLIST", "SET_SEQUENCELIST", "SET_CURRENTINDEX"]),
    //轮播图点击处理
    swiperHandel(item){
       this.currentIndex = this.bannerListUrl.findIndex(function(value,index){
         return value == item.targetId
       })
       console.log(this.currentIndex)
      //传递数据至vuex
      this.SET_PLAYLIST(this.bannerSongs);
      this.SET_SEQUENCELIST(this.bannerSongs);
      //有id才播放
      if(this.currentIndex !== -1){
      this.SET_CURRENTINDEX(this.currentIndex);
      }
      //跳转外部链接
      if(item.targetType === 3000){
        window.open(item.url,'-blank')
      }
    },
    //处理轮播图数据
    bannerListHandel(){
      //将歌曲id存入一个数组
      for(let item of this.bannerData){
        if(item.targetType === 1){
            this.bannerListUrl.push(item.targetId)
        }
      }
      //将数组转为字符串拼接发起网络请求
      this.bannerListUrlStr = this.bannerListUrl.join(',')
      getSongDetail(this.bannerListUrlStr).then(res =>{
        this.bannerSongs = res.songs
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  watch:{
    bannerData(newVal) {
      if(newVal){
        this.bannerListHandel()
      }
      
    }
  }
}
</script>

<style scoped>
.swiper-item img{
  width: 100%;
  height: 100%;
}
</style>