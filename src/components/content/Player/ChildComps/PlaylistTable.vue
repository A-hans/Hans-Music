<template>
  <div class="playlistTable">
    <div class="header ">
      <div class="playlist-title">播放列表</div>
    </div>
    <div class="playlist-content">
      <ul>
        <li
          class="song-item"
          v-for="(item, index) in currentPlaylist"
          @click="handelClick(index)"
          :key="index"
        >
          <i class="el-icon-close" @click.stop="deleteSong(item)"></i>
          <div class="song-name" :class="{active:item.id===songId}">{{ item.name }}</div>
          <div class="singer-name" :class="{active:item.id===songId}">
            <span v-for="(i, index) in item.ar" :key="index">{{ i.name }}</span>
          </div>
          <div class="song-time" :class="{active:item.id===songId}">{{ item.dt | formatTime }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { formatDate } from "common/utils";
export default {
  name: "playlistTable",
  computed: {
    ...mapGetters(["playlist", "currentSong"]),
    currentPlaylist() {
      return this.playlist ? this.playlist : [];
    },
    songId(){
      return this.currentSong ? this.currentSong.id :"";
    }
  },
  filters: {
    formatTime(value) {
      const time = new Date(value);
      return formatDate(time, "mm:ss");
    },
  },
  methods:{
    ...mapMutations([
      "SET_CURRENTINDEX",
      "SET_PLAYLIST",
      "SET_DEL_PLAYLIET_ITEM"
    ]),
    handelClick(index){
      this.SET_CURRENTINDEX(index);
    },
    //删除当前歌曲
    deleteSong(item){
      this.SET_DEL_PLAYLIET_ITEM({
        'delSong':item,
        'curSong':this.currentSong
      })
    },
  }
};
</script>

<style scoped>
.playlistTable .playlist-title {
  font-weight: bold;
  line-height: 30px;
  height: 30px;
  text-align: left;
  font-size: 18px;
}
.el-icon-close{
  margin-top: 8px;
}
.playlist-content ul {
  margin-top:10px;
  list-style: none;
  font-size: 13px;
}
.playlist-content li {
  height: 30px;
  line-height: 30px;
}
.playlist-content li {
  display: flex;
}
.el-icon-close {
  padding-right: 20px;
}
.song-name{
  flex: 2;
}
.singer-name{
  flex: 2;
  text-align: center;
}
.song-time{
  flex: 1;
  text-align: right;
}
.song-name,
.singer-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.active{
  color: var(--color-high-text);
}
</style>