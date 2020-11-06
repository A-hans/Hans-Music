<template>
  <div class="singer-list" v-if='singerData.length !==0'>
  <el-row :gutter="20">
  <el-col :span="3" v-for='(item,index) in singerData' :key='index'>
    <div class="singer">
      <div class='cover'>
        <img :src="item.picUrl" alt="">
      </div>
      <div class='name'>
        {{item.name}}
      </div>
      <div class='song-count'>
        单曲数:{{item.musicSize}}
      </div>
      </div>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name:'SingerList',
  props:{
      singerData:{
      type:Array,
      default(){
      return []
      }
    }
  }
}
</script>

<style scoped>
.singer-list .singer{
  height: 160px;
  text-align: center;
  margin-bottom:20px ;
}

.singer-list .cover img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid #F2F6FC;
}
.singer-list .cover img:hover{
 box-shadow: 6px 3px 12px 2px rgba(220, 20, 60, 0.1);
}
.singer-list .name {
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
}

.singer-list .song-count{
  font-size: 12px;
  color: var(--color-high-text);
}
</style>