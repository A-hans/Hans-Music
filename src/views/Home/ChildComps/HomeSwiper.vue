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
      //存储音乐URL
      bannerListUrl:[],
      //存储轮播图歌曲
      bannerSongs:[]
    }
  },
  methods:{
    ...mapMutations(["SET_PLAYLIST", "SET_SEQUENCELIST", "SET_CURRENTINDEX"]),
    //轮播图点击处理
    swiperHandel(item,index){
      //之后还需要做对轮播图类型的判断
      console.log(item.targetId);
    },
    //处理轮播图数据
    bannerListHandel(){
      //将歌曲id存入一个数组
      for(let item of this.bannerData){
          this.bannerListUrl.push(item.targetId)
      }
      //将数组转为字符串拼接发起网络请求
      this.bannerListUrl = this.bannerListUrl.join(',')
      getSongDetail(this.bannerListUrl).then(res =>{
        // console.log(res)
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