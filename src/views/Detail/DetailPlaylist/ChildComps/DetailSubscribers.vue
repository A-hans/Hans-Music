<template>
  <div class="playlist-subscribers">
    <div class="title"><h4>喜欢这个歌单的人:</h4></div>
    <el-row :gutter="5" v-if="subscribers.length !==0">
      <el-col :span="4" 
      v-for="(item,index) in subscribers" 
      :key="index"
      >
        <div class="subscriber">
          <img :src="item.avatarUrl+'?param=100y100'" alt="" @click="toUser(item)">
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
  methods:{
    //进用户详情页
    toUser(item){
     this.$router.push({path:'/detail-user',query:{
        id:item.userId
      }})
      this.$bus.$emit('cancelActive');
    }
  }
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
    width: 90%;
    height: 90%;
    border-radius: 4px;
    cursor: pointer;
  }
  .subscriber-none{
    font-size: 13px;
    margin-top:20px ;
  }
  .subscriber img:hover{
    box-shadow: 0 2px 12px 0 rgba(225, 0, 0, 0.3) ;
  }
</style>