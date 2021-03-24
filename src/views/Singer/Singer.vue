<template>
  <div id="singer">
    <singer-nav
      @areaItem="areaItem"
      @singerItem="singerItem"
      @initialItem="initialItem"
    />
    <singer-list :singerData="singerList" class="singer-list" />
    <div class="loading" v-if="lodingMore">
      <div class="loader"></div>
      <div class="text">努力加载中~</div>
    </div>
    <el-divider v-else></el-divider>
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
      typeNum: -1,
      areaNum: -1,
      initial: null,
      singerList: [],
      offset: 0,
      lodingMore: false,
    };
  },
  components: {
    SingerNav,
    SingerList,
  },
  methods: {
    //当前地区分类
    areaItem(item) {
      this.areaNum = Number(item);
      //点击对应函数显示对应数据
      getSingetList(this.typeNum, this.areaNum, this.word, 24)
        .then((res) => {
          this.singerList = res.artists;
        })
        .catch((err) => {});
    },
    //当前歌手分类
    singerItem(item) {
      this.typeNum = Number(item);
      //点击对应函数显示对应数据
      getSingetList(this.typeNum, this.areaNum, this.initial, 24)
        .then((res) => {
          this.singerList = res.artists;
        })
        .catch((err) => {});
    },
    //当前字母开头
    initialItem(item) {
      this.initial = item;
      //点击对应函数显示对应数据
      getSingetList(this.typeNum, this.areaNum, this.initial, 24).then(
        (res) => {
          this.singerList = res.artists;
        }
      );
    },
    //加载更多
    loadMore() {
      getSingetList(this.typeNum, this.areaNum, this.initial, 24, this.offset)
        .then((res) => {
          //将请求到的新数据加入原数组
          for (let item of res.artists) {
            this.singerList.push(item);
          }
          //获取新数组数组长度
          this.getOffset();
          this.lodingMore = false;
        })
        .catch((err) => {});
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
    getSingetList(this.typeNum, this.areaNum, this.initial, 24)
      .then((res) => {
        this.singerList = res.artists;
        //获取第一次数组的长度
        this.getOffset();
      })
      .catch((err) => {});
  },
  mounted() {
    const _THIS = this;
    window.addEventListener("scroll", function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log("距离顶部高度:"+scrollTop);
      // console.log("可视区高度:"+windowHeight);
      //  console.log("滚动条总高度:"+scrollHeight);
      if (scrollHeight - (scrollTop + windowHeight) === 0) {
        _THIS.lodingMore = true;
        _THIS.loadMore();
      }
    });
  },
};
</script>

<style scoped>
#singer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.singer-list {
  margin-top: 30px;
}

.loader {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  background: var(--color-high-text);
  animation: loader 1s ease-in-out infinite;
}
.loader::after,
.loader::before {
  box-sizing: border-box;
  animation: loader 1s ease-in-out infinite;
}
@keyframes loader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}
.loading .text {
  margin-top: 5px;
  font-size: 12px;
}
</style>