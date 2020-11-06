<template>
<!-- 做一层非空判断 -->
<div class='swiper' v-if="bannerData.length !==0">
  <el-carousel :interval="5000" type="card" height="200px">
    <el-carousel-item 
    class='swiper-item'
    v-for="(item,index) in bannerData " 
    :key="index">
      <img :src="item.imageUrl" alt="">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  name:'Swiper',
  props:{
    bannerData:{
      type:Array,
      default(){
        return []
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