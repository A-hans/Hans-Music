<template>
  <div id="rank">
    <rank-popular :rankPopularData='rankList'/>
    <rank-gobal :rankGobalData='rankList'/>
  </div>
</template>

<script>
import { getRankList } from "network/Rank.js";

import { formartPlayCount } from "common/utils";

import RankPopular from "views/Rank/ChildComps/RankPopular";
import RankGobal from "views/Rank/ChildComps/RankGobal";
export default {
  name: "rank",
  data() {
    return {
      rankList: [],
    };
  },
  components:{
    RankPopular,
    RankGobal
  },
  created() {
    /* 
    网络请求相关
    */
    //获取排行榜数据
    getRankList().then((res) => {
      this.rankList = res.list;
      //对播放量进行数据格式化
      formartPlayCount(this.rankList)
    });
  },
};
</script>

<style>
</style>