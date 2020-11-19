<template>
  <div class="album-info"> 
    <el-row :gutter="20">
  <el-col :span="4" v-for="(item,index) in albums" 
          :key="index"
          @click.native="loadAlbumDetail(item)">
    <div class="playlist-item">
      <div class="img">
        <img :src="item.picUrl+'?param=200y200'" alt="" />
        <div class="count">
          <i class="el-icon-caret-right"></i>
          {{item.type}}
        </div>
      </div>
      <div class="text">
        {{ item.name }}
      </div>
      <div class="publish-time">
        {{item.publishTime | formatDate}}
      </div>
    </div>
    </el-col>
</el-row>
 
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
  name:"DetailAlbum",
  props:{
    albums:{
      type:Array,
      default(){
        return{}
      }
    }
  },
  filters:{
    //时间格式化
    formatDate(value){
      let date = new Date(value);
      return  formatDate(date,"yyyy-MM-dd")
    }
  },
  methods:{
    //点击专辑进入专辑详情页
    loadAlbumDetail(item){
      this.$router.push({
        path:"/ablum-detail",
        query:{
          id:item.id
        }
      })
    }
    }
}
</script>

<style scoped> 
.album-info{
  font-size: 13px;
  margin-top: 20px;
}
.el-col {
  margin-bottom: 10px;
  height: 230px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.playlist-item .img {
  box-shadow:  6px -5px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
}
.playlist-item .img:hover {
  box-shadow: 9px -6px 3px -1px rgba(220, 20, 60, 0.2);
}
.playlist-item .img img {
  width: 100%;
  height: 100%;
}
.playlist-item {
  width: 200px;
}
.playlist-item .count {
  position: absolute;
  right: 16px;
  top: 1px;
  height: 24px;
  padding-left: 9px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 0;
  background-size: cover;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.playlist-item .count:after {
  content: "";
  position: absolute;
  right: -14px;
  top: 0;
  width: 14px;
  height: 24px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 100%;
  background-size: cover;
}

.playlist-item .text {
  text-align: left;
  width: 150px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 显示几行,多余内容用省略号替代 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 10px;
  color: var(--color-text);
  font-size: 10px!important;
  padding-top: 20px;
  font-weight: bold;
}
.publish-time{
  font-size: 12px;
}
</style>