<template>
  <div id="play-list">
    <list-nav :hotTags="hotTags" :allTags="allTags" @sListType="sCurrentType" />
    <song-list :playlistData="playlist" class="song-list" />
    <div class="text">
    </div>
    <!-- 分页 -->
    <el-pagination
    class="el-pagination"
    :background="true"
    layout="prev, pager, next"
    :total="totalNum"
    :page-size="18"
    :current-page="currentPage"
    @current-change="pageChange"
    >
</el-pagination>
  </div>
</template>

<script>
import { getHotListTag, getAllListTag, getAllList } from "network/Playlist";

import ListNav from "views/PlayList/ChildComps/ListNav";
import SongList from "components/content/SongList/SongList";
export default {
  name: "Playlist",
  data() {
    return {
      hotTags: [],
      allTags: [],
      currentType: "华语",
      playlist: [],
      totalNum:0,//歌单总条目数
      currentPage:1
    };
  },
  methods: {
    //当前标签类型
    sCurrentType(item) {
      this.currentPage = 1;
      this.currentType = item.name;
      //每次点击请求对应标签数据
      getAllList(this.currentType, 18)
        .then((res) => {
          console.log("总条目数:"+res.total);
          this.totalNum = res.total;
          this.playlist = res.playlists;
        })
        .catch((err) => {});
    },
    //获取更多歌单
    loadMore(type,offset){
      getAllList(type,18,offset).then(res =>{
        console.log(res);
        this.playlist = res.playlists
      }).catch(err=>{
        console.log(err);
      })
    },
    //通过外部标签跳转
    toLoad() {
      let currentHref = null;
      currentHref = window.location.href;
      //当路径中有cat才执行
      if (currentHref.indexOf("cat") !== -1) {
        this.currentType = this.$route.query.cat;
        getAllList(this.currentType, 18)
          .then((res) => {
            console.log("总条目数:"+res.total);
            this.totalNum = res.total;
            this.playlist = res.playlists;
          })
          .catch((err) => {});
      }
    },
    //监听分页改变
    pageChange(val){
      this.currentPage = val;
      console.log("页码改变"+val);
      //分页offset计算值:页码-1*limit(默认0)
      this.loadMore(this.currentType,(this.currentPage-1)*18)
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
    getAllList(this.currentType, 18)
      .then((res) => {
        console.log(res.total);
        this.totalNum = res.total;
        this.playlist = res.playlists;
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

.el-pagination{
  display: flex;
  justify-content: center;
}
</style>