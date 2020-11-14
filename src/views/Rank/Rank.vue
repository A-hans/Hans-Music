<template>
  <div id="rank">
    <rank-popular :rankPopularData="rankList" />
    <rank-gobal :rankGobalData="rankList" />
  </div>
</template>

<script>
import { getRankList } from "network/Rank.js";

import RankPopular from "views/Rank/ChildComps/RankPopular";
import RankGobal from "views/Rank/ChildComps/RankGobal";
export default {
  name: "rank",
  data() {
    return {
      rankList: [],
    };
  },
  components: {
    RankPopular,
    RankGobal,
  },
  created() {
    /* 
    网络请求相关
    */
    //获取排行榜数据
    getRankList()
      .then((res) => {
        this.rankList = res.list;
      })
      .catch((err) => {});
  },
};
</script>

<style>
</style>