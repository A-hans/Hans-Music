<template>
  <div class='detail-header' v-if="Object.keys(detailHeader).length !==0">
    <el-row :gutter="20" type="flex" align="center">
  <el-col :span="8" class='left'>
    <div class="cover">
      <img :src="detailHeader.coverImgUrl" alt="">
      </div>
      </el-col>
  <el-col :span="16" class='right'>
    
    <div class="content">
      <h3>{{detailHeader.name}}</h3>
      <div class='tags' v-if="detailHeader.tags.length !==0">
      <ul>
        <span>标签:</span> 
        <li v-for="(item,index) in detailHeader.tags" 
            :key='index'
            @click="sendTags(item)">{{item}}
            
        </li>
      </ul>
      </div>
      <div class='user'>
        <div class='user-info'>
        <img :src="detailHeader.creator.avatarUrl" alt="">
        <span>{{detailHeader.creator.nickname}}</span>
         <span>{{detailHeader.createTime | showDate}}创建</span> 
        </div>
        <div class='text'>
          <p class='ellipsis-two' 
          v-html="detailHeader.description"
         ></p>
           <el-popover 
            class='detail-desc'
            placement="left-start"
           :title="detailHeader.name"
            width="400"
            trigger="click"
            >
            <!-- 插入html识别换行 -->
            <div class="popover-content" v-html="detailHeader.description"></div>
            <span slot="reference" 
             v-if="txtLength(detailHeader.description)>1||detailHeader.description.length>50">全部</span>
            </el-popover>
        </div>
      </div>
      </div>
      </el-col>
    </el-row>
    <div class='loading' >
        <el-button type="danger">
          <i class='el-icon-caret-right'></i>
          <span>播放全部</span>
        </el-button>
      </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils";

export default {
  name:'DetailHeader',
  props:{
    detailHeader:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
   return{}
  },
  computed: {
    //查找换行出现的次数
    txtLength() {
      return function(txt) {
       let num = 0;//记录出现次数
       let index =txt.indexOf('\n');//记录出现位置
       while(index !==-1){
         num++; // 每出现一次 次数加一
        index = txt.indexOf('\n',index + 1); // 从字符串出现的位置的下一位置开始继续查找
       }
        return num
      }
    }
  },
  methods:{
    //跳转标签
    sendTags(item){
      this.$router.push({
        path:'/playlist',
         query:{
          cat:item
      }})
    }
  },
  filters:{
    //时间格式化
  showDate(value){
    let date=new Date(value)
    return formatDate(date,'yyyy-MM-dd ')
  },
}
}
</script>

<style scoped>
.detail-header{
  padding: 0 0 20px 10px;
}
.detail-header .cover{
  width: 160px;
  height: 160px;
  box-shadow: 12px 8px 0px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
.detail-header img{
  width: 100%;
  height: 100%;
  vertical-align: middle;
  border-radius: 4px;
}
.right{
  display: flex;
}
.content{
 margin-top:20px ;
}
.user{
  font-size: 14px;
}
.user-info{
  margin-top: 20px;
}
.user-info img{
  width: 30px;
  height: 30px;
  border: 1px solid #EBEEF5;
  border-radius:25px ;
}
.user-info span{
  margin: 0 10px;
}
.created{
  margin-top: 20px;
}
.text{
  margin-top:20px ;
}
.ellipsis-two {
  width: 380px;
  font-size: 14px;
  /* 设置内容显示多少行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 显示几行,多余内容用省略号替代 */
  -webkit-line-clamp: 2;
  margin-bottom: 10px;
  overflow: hidden; 
  word-break:normal;
 /* 识别/n换行 */
  white-space: pre-line;
  line-height: 22px;
  
}
.popover-content{
  white-space: pre-line;
}
.detail-desc:hover{
  cursor: pointer;
  color: var(--color-high-text);
}
.tags {
  margin-top: 20px;
}
.tags ul{
  list-style: none;
  display: flex;
}
.tags li{
  margin: 0 10px;
  padding: 3px 8px;
  font-size: 13px;
  color: white;
  border-radius: 25px ;
  cursor: pointer;
  background: #F56C6C;
}
.tags li:hover{
  box-shadow: 6px 4px 0px 0px rgba(0, 0, 0, 0.1);
  
}
.loading{
 margin-left: 78%;
 margin-top: 20px;
}
</style>