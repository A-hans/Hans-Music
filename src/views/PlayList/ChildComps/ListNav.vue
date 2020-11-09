<template>
  <div class="list-nav">
    <el-row>
      <el-col :span="20" class='left'>
        <div class="hot-tags" v-if='isShow'>
           <div class='title'>热门标签:</div>
          <ul>
            <li class='hot-tags-item'
            v-for="(item,index) in hotTags" 
            :key='index'
            @click='clcikItem1(index,item)'
            :class='{active:currentIndex1==index}'>
            {{item.name}}
            </li>
          </ul>
          </div>
          <div class="all-tags " v-else>
           <div class='title'>全部标签:</div>
          <ul>
            <li class='hot-tags-item'
            v-for="(item,index) in allTags" :key='index'
             @click='clcikItem2(index,item)'
            :class='{active:currentIndex2==index}'>
              {{item.name}}
            </li>
          </ul>
          </div>
          </el-col>
          <el-col :span="4" class='right'>
            <div class="change-tag">
              <el-button size='small' type="danger" :round='true' @click="showHotTag">热门</el-button>
              <el-button size='small' type="danger" :round='true' @click="showAllTag">全部</el-button>
              </div>
            </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'ListNav',
  props:{
    hotTags:{
        type:Array,
        default(){
          return []
        }
      },
      allTags:{
        type:Array,
        default(){
          return []
        }
      }
  },
  data(){
    return {
      isShow: true,
      currentIndex1:0,
      currentIndex2:null
    }
  },
  methods:{
    showHotTag(){
      this.isShow =true;
    },
    showAllTag(){
       this.isShow =false;
    },
    clcikItem1(index,item){
      this.currentIndex1 = index;
      this.currentIndex2 = null;
      //将当前标签内容发送出去
      this.$emit('sListType',item);
    },
    clcikItem2(index,item){
      this.currentIndex2 = index;
      this.currentIndex1 = null;
       //将当前标签内容发送出去
      this.$emit('sListType',item);
    }
  },
}
</script>

<style scoped>
.list-nav{
  padding:20px;
  height: 100%;
  background: var(--color-background);
  border-radius: 30px;
}
.list-nav ul{
  margin: 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.list-nav li{
  padding: 8px;
  margin: 5px;
}
.list-nav li:hover{
  color:var(--color-high-text);
}
.list-nav .right{
  height: 100%;
}
.list-nav .change-tag button{
  margin-left: 18px;
  margin-top: 20px;

}
.list-nav .title{
  padding-left: 10px;
  border-left: 5px solid red;
  font-size: 19px;
  font-weight: bold;
}
.active{
  font-weight: bold;
   border-bottom:3px solid var(--color-high-text);
}
</style>