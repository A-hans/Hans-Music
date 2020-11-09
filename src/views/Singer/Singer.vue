<template>
  <div id="singer">
    <singer-nav
      @areaItem="areaItem"
      @singerItem="singerItem"
      @wordItem="wordItem"
    />
    <singer-list :singerData="singerList" class="singer-list" />
    <div class="text">
      <span @click="loadMore">--------------加载更多--------------</span>
    </div>
  </div>
</template>

<script>
import SingerNav from "views/Singer/ChildComps/SingerNav";
import SingerList from "components/content/SingerList/SingerList";

import { getSingetList } from "network/Singer";
export default {
  name: "Singer",
  data() {
    return {
      num1: -1,
      num2: -1,
      word: null,
      singerList: [],
      offset: 0,
    };
  },
  components: {
    SingerNav,
    SingerList,
  },
  methods: {
    //当前地区分类
    areaItem(item) {
      this.num2 = Number(item);
      //点击对应函数显示对应数据
      getSingetList(this.num1, this.num2, this.word, 24).then((res) => {
        this.singerList = res.artists;
      });
    },
    //当前歌手分类
    singerItem(item) {
      this.num1 = Number(item);
      //点击对应函数显示对应数据
      getSingetList(this.num1, this.num2, this.word, 24).then((res) => {
        this.singerList = res.artists;
      });
    },
    //当前字母开头
    wordItem(item) {
      this.word = item;
      //点击对应函数显示对应数据
      getSingetList(this.num1, this.num2, this.word, 24).then((res) => {
        this.singerList = res.artists;
      });
    },
    //加载更多
    loadMore() {
      getSingetList(this.num1,this.num2,this.word,24,this.offset).then((res) => {
        //将请求到的新数据加入原数组
        for (let item of res.artists) {
          this.singerList.push(item);
        }
        //获取新数组数组长度
        this.getOffset();
      });
    },
    //获取数组最大长度进行offset传值
    getOffset() {
      let j = 0;
      for (let i in this.singerList) {
        j++;
      }
      let lastIndex = Number(j + 1);
      this.offset = lastIndex;
    },
  },
  created() {
    //获取歌手列表
    getSingetList(this.num1, this.num2, this.word, 24).then((res) => {
      this.singerList = res.artists;
      //获取第一次数组的长度
      this.getOffset();
    });
  },
};
</script>

<style scoped>
.singer-list {
  margin-top: 30px;
}
#singer .text {
  text-align: center;
  cursor: pointer;
}
#singer .text:hover {
  color: var(--color-high-text);
}
</style>