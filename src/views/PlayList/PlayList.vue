<template>
  <div id="play-list">
    <list-nav :hotTags="hotTags" :allTags="allTags" @sListType="sCurrentType" />
    <song-list :playlistData="playlist" class="song-list" />
    <div class="text">
      <span @click="loadMore">--------加载更多--------</span>
    </div>
  </div>
</template>

<script>
import { getHotListTag, getAllListTag, getAllList } from "network/Playlist";

import ListNav from "views/Playlist/ChildComps/ListNav";
import SongList from "components/content/SongList/SongList";
export default {
  name: "Playlist",
  data() {
    return {
      hotTags: [],
      allTags: [],
      currentType: "华语",
      playlist: [],
      offset: 0,
    };
  },
  methods: {
    //当前标签类型
    sCurrentType(item) {
      this.currentType = item.name;
      //每次点击请求对应标签数据
      getAllList(this.currentType, 42)
        .then((res) => {
          this.playlist = res.playlists;
        })
        .catch((err) => {});
    },
    //获取数组最大长度进行offset传值
    getOffset() {
      let j = 0;
      for (let i in this.playlist) {
        j++;
      }
      let lastIndex = Number(j + 1);
      this.offset = lastIndex;
    },
    //获取更多歌单
    loadMore() {
      getAllList(this.currentType, 42, this.offset)
        .then((res) => {
          //将请求到的新数据存储在临时变量做数据格式化
          let tempArr = [];
          for (let item of res.playlists) {
            tempArr.push(item);
          }
          //将格式化好的新数据加入数组
          for (let item of tempArr) {
            this.playlist.push(item);
          }
          //获取新数组数组长度
          this.getOffset();
        })
        .catch((err) => {});
    },
    //通过外部标签跳转
    toLoad() {
      let currentHref = null;
      currentHref = window.location.href;
      //当路径中有cat才执行
      if (currentHref.indexOf("cat") !== -1) {
        this.currentType = this.$route.query.cat;
        getAllList(this.currentType, 42)
          .then((res) => {
            this.playlist = res.playlists;
            //获取最后一数组长度
            this.getOffset();
          })
          .catch((err) => {});
      }
    },
  },
  components: {
    ListNav,
    SongList,
  },
  created() {
    //获取热门歌单标签
    getHotListTag()
      .then((res) => {
        this.hotTags = res.tags;
      })
      .catch((err) => {});
    //获取所有歌单标签
    getAllListTag()
      .then((res) => {
        this.allTags = res.sub;
      })
      .catch((err) => {});
    //获取对应标签歌单列表
    getAllList(this.currentType, 42)
      .then((res) => {
        this.playlist = res.playlists;
        //对播放数量进行格式化
        this.getOffset();
      })
      .catch((err) => {});
    //通过标签跳转后的网络请求
    this.toLoad();
  },
};
</script>

<style scoped>
.song-list {
  margin-top: 20px;
}
#play-list .text {
  text-align: center;
  cursor: pointer;
}
#play-list .text:hover {
  color: var(--color-high-text);
}
</style>