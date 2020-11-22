<template>
  <div class="detail-search">
    <el-row>
      <el-col :span="24"
        ><div class="search-info">
          <div class="title">
            <h3>搜索结果</h3>
          </div>
          <el-tabs :value="activeName" @tab-click="handleClick">
            <el-tab-pane label="歌曲" name="first">
              <div class="search-title">
                根据<span>{{ keyWord }}</span
                >的搜索结果:
              </div>
              <song-list :playlistItem="searchSongs" />
            </el-tab-pane>
            <el-tab-pane label="歌手" name="second">
              <div class="search-title">
                根据<span>{{ keyWord }}</span
                >的搜索结果:
              </div>
              <singer-list :singerData="searchSingers" />
            </el-tab-pane>
            <el-tab-pane label="歌单" name="third">
              <div class="search-title">
                根据<span>{{ keyWord }}</span
                >的搜索结果:
              </div>
              <song-lists :playlistData="searchSongLists" />
            </el-tab-pane>
            <el-tab-pane label="专辑" name="fourth">
              <div class="search-title">
                根据<span>{{ keyWord }}</span
                >的搜索结果:
              </div>
              <detail-album :albums="searchAblums" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getSearchInfo } from "network/Search";

import SongList from "views/Detail/DetailSinger/ChildComps/DetailPlaylistTable";
import SingerList from "components/content/SingerList/SingerList";
import SongLists from "components/content/SongList/SongList";
import DetailAlbum from "views/Detail/DetailSinger/ChildComps/DetailAlbum";
export default {
  name: "DetailSearch",
  data() {
    return {
      //获取搜索关键字
      keyWord: this.$route.query.str,
      //存储展示的选项卡名字
      activeName: "first",
      //存储歌曲搜索结果
      searchSongs: [],
      //存储歌手搜索结果
      searchSingers: [],
      //存储歌单搜索结果
      searchSongLists: [],
      //存储专辑搜索结果
      searchAblums: [],
    };
  },
  methods: {
    handleClick(tab) {
      //切换选项卡执行不同操作
      switch (tab.name) {
        case "second":
          //搜索歌手结果
          getSearchInfo(this.keyWord, 100)
            .then((res) => {
              this.searchSingers = res.result.artists;
            })
            .catch((err) => {});
          break;
        case "third":
          //搜索歌单结果
          getSearchInfo(this.keyWord, 1000)
            .then((res) => {
              this.searchSongLists = res.result.playlists;
            })
            .catch((err) => {});
          break;
        case "fourth":
          getSearchInfo(this.keyWord, 10)
            .then((res) => {
              this.searchAblums = res.result.albums;
            })
            .catch((err) => {});
          break;
        default:
          break;
      }
    },
  },
  components: {
    SongList,
    SingerList,
    SongLists,
    DetailAlbum,
  },
  watch: {
    // 监听路由的变化 参数变化时更新发布订阅数据
    $route(to, from) {
      //对路由进行判断,决定何时进行刷新
      if (to.fullPath.search("search-result") == 1) {
       this.keyWord = to.query.str;
        getSearchInfo(this.keyWord, 1)
          .then((res) => {
            //给歌曲列表增加序号
            let num = 0;
            for (let item of res.result.songs) {
              ++num;
              item.orderNum = num;
            }
            this.searchSongs = res.result.songs;
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    //获取单曲搜索结果
    getSearchInfo(this.keyWord, 1)
      .then((res) => {
        //给歌曲列表增加序号
        let num = 0;
        for (let item of res.result.songs) {
          ++num;
          item.orderNum = num;
        }
        this.searchSongs = res.result.songs;
      })
      .catch((err) => {});
  },
};
</script>
<style scoped>
.detail-search {
  padding: 30px;
  height: 100%;
  border-radius: 15px;
  background: var(--color-background);
}
.search-title {
  font-size: 13px;
  padding-bottom: 10px;
}
.search-title span {
  color: var(--color-high-text);
}
</style>