<template>
  <div class="hot-comments">
   <el-row>
     <div class="title">
       <h4>热门评论</h4>
  <el-col :span="24" v-if="hotComments.length !==0">
    <div class="comments">
      <ul>
        <li v-for="(item,index) in hotComments" :key="index" class="clear-fix">
          <div class='avatar left'>
            <img :src="item.user.avatarUrl+'?param=100y100'" alt="">
          </div>
          <div class="user-info right">
            <div class="user-name">
              {{item.user.nickname}}
              <div class="comment-time">{{item.time | formatTime }}</div>
            </div>
            <div class="comment-info">
              {{item.content}}
            </div>
          </div>
        </li>
      </ul>
      </div>
      </el-col>
  <el-col :span="24" v-else>
    <div class="comment-none">
      <p>还没热评哦~</p>
      </div>
      </el-col>
     </div>
</el-row>
  </div>
</template>

<script>
import { formatDate } from "common/utils"
export default {
  naem:"DetailHotComments",
  props:{
    hotComments:{
      type: Array,
      default(){
        return []
      }
    },
  },
  filters:{
      formatTime(value) {
      let date = new Date(value);
      return formatDate(date, "yy-MM-dd");
    }
  }
}
</script>

<style scoped>
.hot-comments{
  margin-top: 20px;
  padding: 15px;
  border-radius: 15px;
  background: var(--color-background);
}
.comment-none p{
  font-size: 14px;
  margin-top:20px ;
}
.comments ul{
  padding-bottom: 10px;
  margin-left: -12px;
  list-style: none;
}
.comments li{
  padding: 10px;
  margin-top:20px;
  border-radius: 4px;
  background: rgba(	245,245,245,0.5);

}
.comments li:hover{
   box-shadow: 0 2px 12px 0 rgba(225, 0, 0, 0.2);
}
.comments .avatar img{
  width: 40px;
  height:40px;
  border-radius:25px ;
}

.user-info{
  width: 235px;
}
.user-info .user-name {
  font-size: 13px;
  font-weight: bold;
}
.comment-time{
  font-size: 12px;
  padding: 5px 0;
  color: #909399;
  font-weight: normal;
}
.comment-info{
  font-size: 12px;
  line-height: 20px;
  padding: 8px;
  background: rgba(	211,211,211, 0.2);
  border-radius:4px;
}
</style>