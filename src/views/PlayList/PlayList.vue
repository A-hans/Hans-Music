<template>
  <div id="play-list">
    <list-nav 
    :hotTags="hotTags" 
    :allTags="allTags"
    @sListType= "sCurrentType"  />  
      <song-list :playlistData='playlist' class='song-list'/>
      <div class='text' >
        <span @click="loadMore">--------------加载更多--------------</span>
      </div>
  </div>
</template>

<script>
import { getHotListTag, getAllListTag, getAllList } from "network/Playlist";

import ListNav from "views/Playlist/ChildComps/ListNav";
import SongList from "components/content/SongList/SongList"
export default {
  name: "PlayList",
  data() {
    return {
      hotTags: [],
      allTags: [],
      currentType: "华语",
      playlist: [],
      offset:0
    };
  },
  methods: {
    //当前标签类型
    sCurrentType(item){
       this.currentType = item.name;
       console.log(item);
      //每次点击请求对应标签数据
      getAllList(this.currentType, 42).then((res) => {
        this.playlist = res.playlists;
        //对播放量进行数据格式化
         for (let item of this.playlist) {
        if (parseInt(item.playCount / 10000).toString().length >= 5) {
          item.playCount = parseInt(item.playCount / 100000000) + "亿";
        } else {
          item.playCount = parseInt(item.playCount / 10000) + "万";
        }
      }
      });
    },
    //获取数组最大长度进行offset传值
    getOffset(){
      let j=0
      for(let i in this.playlist){ 
       j++
      }
     let lastIndex= Number(j+1)
     this.offset = lastIndex;
      },
      //获取更多歌单
    loadMore(){
       getAllList(this.currentType, 42,this.offset).then((res) => {
        //将请求到的新数据添加进新数组
        for(let item of res.playlists){
          this.playlist.push(item);
        }
        //对播放数量进行格式化
       for (let item of this.playlist) {
        if (parseInt(item.playCount / 10000).toString().length >= 5) {
          item.playCount = parseInt(item.playCount / 100000000) + "亿";
        } else {
          item.playCount = parseInt(item.playCount / 10000) + "万";
        }
      }
      //获取最后一各歌单更新时间
      this.getOffset()
    });
    }
  },
  components: {
    ListNav,
    SongList
  },
  created() {
    //获取热门歌单标签
    getHotListTag().then((res) => {
      this.hotTags = res.tags;
    });
    //获取所有歌单标签
    getAllListTag().then((res) => {
      this.allTags = res.sub;
    });
    //获取对应标签歌单列表
    getAllList(this.currentType,42).then((res) => {
        this.playlist = res.playlists;
        //对播放数量进行格式化
       for (let item of this.playlist) {
        if (parseInt(item.playCount / 10000).toString().length >= 5) {
          item.playCount = parseInt(item.playCount / 100000000) + "亿";
        } else {
          item.playCount = parseInt(item.playCount / 10000) + "万";
        }
      }
      //获取最后一各歌单更新时间
      this.getOffset()
    });
     
  },     
};
</script>

<style scoped>
  .song-list{
    margin-top:20px;
  }
  #play-list .text{
    text-align: center;
  }
  #play-list .text:hover{
      color:var(--color-high-text);
    }
</style>