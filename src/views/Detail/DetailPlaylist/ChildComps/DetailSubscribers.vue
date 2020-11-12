<template>
  <div class="playlist-subscribers">
    <div class="title"><h4>喜欢这个歌单的人:</h4></div>
    <el-row :gutter="10" v-if="subscribers.length !==0">
      <el-col :span="4" 
      v-for="(item,index) in subscribers" 
      :key="index"
      >
        <div class="subscriber">
          <img :src="item.avatarUrl" alt="">
          </div>
          </el-col>
    </el-row>
     <div class="subscriber-none" v-else>
          还没有人收藏此歌单
          </div>
  </div>
</template>

<script>
export default {
  name:'DetailSubscribers',
  props:{
    subscribers:{
      type:Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style scoped>
  .playlist-subscribers{
    padding:15px;
    border-radius: 15px;
    background: var(--color-background);
  }
 
  .el-col{
    text-align: center;
    margin-bottom:5px;
  }
  .subscriber img{
    width: 35px;
    height: 35px;
    border-radius: 4px;
  }
  .subscriber img:hover{
    box-shadow: 0 2px 12px 0 rgba(225, 0, 0, 0.3) ;
  }
</style>