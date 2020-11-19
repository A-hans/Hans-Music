<template>
  <div class='recoomend-singer'>
    <div class="title">
      <h3>推荐歌手</h3>
    </div>
    <transition name="el-zoom-in-center">
    <singer-list :singerData='recommendSingerData'/>
      </transition>
  </div>
</template>

<script>
import SingerList from 'components/content/SingerList/SingerList'
export default {
  name:'HomeRecommendSinger',
  props:{
    recommendSingerData:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    SingerList
  }
}
</script>

<style scoped>
.recoomend-singer h3{
  margin-top: 30px ;
  margin-bottom: 10px;
}

</style>