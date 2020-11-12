<template>
<!-- 一行8个项目 -->
  <el-col 
  :span="3" 
  v-if="Object.keys(singerItemData).length !== 0"
  class='singer-item'>
    <div class="singer">
      <div class='cover'>
        <img :src="singerItemData.picUrl+'?param=200y200'" alt="">
      </div>
      <div class='name'>
        {{singerItemData.name}}
      </div>
      <div class='song-count'>
        单曲数:{{singerItemData.musicSize}}
      </div>
      </div>
  </el-col>
</template>

<script>
export default {
  name:'singer-item',
  props:{
    singerItemData:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.singer-item .singer{
  height: 160px;
  text-align: center;
  margin-bottom:20px ;
}

.singer-item .cover img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid #F2F6FC;
}
.singer-item .cover img:hover{
 box-shadow: 6px 3px 12px 2px rgba(220, 20, 60, 0.1);
}
.singer-item .name {
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
}

.singer-item .song-count{
  font-size: 12px;
  color: var(--color-high-text);
}

</style>