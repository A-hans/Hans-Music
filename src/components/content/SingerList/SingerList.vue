<template>
  <div class="singer-list" v-if='singerData.length !==0'>
    <el-row :gutter="20">
    <singer-list-item v-for='(item,index) in singerData' 
    :key='index'
    :singerItemData='item'/>
  </el-row>
  </div>
</template>

<script>
import SingerListItem from "components/content/SingerList/SingerListItem";
export default {
  name:'SingerList',
  props:{
      singerData:{
      type:Array,
      default(){
      return []
      }
    }
  },
  components:{
    SingerListItem
  }
}
</script>

<style scoped>

</style>