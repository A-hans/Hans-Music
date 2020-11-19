<template>
  <div class="singer-list" v-if="singerData.length !== 0">
    <el-row :gutter="20">
      <singer-list-item
        v-for="(item, index) in singerData"
        :key="index"
        @click.native="toSingerInfo(item)"
        :singerItemData="item"
      />
    </el-row>
  </div>
</template>

<script>
import SingerListItem from "components/content/SingerList/SingerListItem";

export default {
  name: "SingerList",
  props: {
    singerData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //点击进入歌手详情页
    toSingerInfo(item) {
      this.$router.push({
        path: "/singer-detail",
        query: { id: item.id },
      });
      //运用事件总线建立起与导航组件的联系,跳转详情页后取消当前激活样式
      this.$bus.$emit("cancelActive");
      //点击刷新路由
      if(this.$route.path.indexOf("detail")!==-1){
         this.$router.go(0);
      }
     
      
    },
  },
  components: {
    SingerListItem,
  },
};
</script>

<style scoped>
</style>