<template>
  <div class="playlist-table" 
       v-if="playlistItem.length !== 0">
    <el-row :gutter="20" type="flex" align="center">
      <el-col :span="24">
        <table class="list-table" width="100%">
          <th>序号</th>
          <th>歌曲</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
          <col style="width: 8%" />
          <col style="width: 35%" />
          <col style="width: 22%" />
          <col style="width: 20%" />
          <col style="width: 12%" />
          <tbody>
            <tr
              v-for="(item, index) of playlistItem"
              :class="{ activeplay: currentSongName == item.id }"
              :key="index"
              @dblclick="playMusic(item, index)"
            >
              <td style="width: 50px" class="order">
                <span :class="{ deactive: currentSongName == item.id }">
                  {{ item.orderNum }}
                </span>
                <span
                  class="play"
                  :class="{ active: currentSongName == item.id }"
                >
                  <i class="el-icon-video-play"></i>
                </span>
              </td>
              <td class="song-name">
                <span class="cover"
                  ><img :src="item.al.picUrl + '?param=100y100'" alt=""
                /></span>
                {{ item.name }}
              </td>
<<<<<<< HEAD
              <td class="art-name" @click.stop="toSingerDetail(item)">
=======
              <td class="art-name" @click="toSingerDetail(item)">
>>>>>>> 695e74f3ed2b0c810fac65c6ee44693c2f89bc20
                <span v-for="(i, index) in item.ar" :key="index"
                  >{{ i.name }}
                </span>
              </td>
              <td class="collection-name"
<<<<<<< HEAD
                  @click.stop="toAblumDetail(item)">{{ item.al.name }}</td>
=======
                  @click="toAblumDetail(item)">{{ item.al.name }}</td>
>>>>>>> 695e74f3ed2b0c810fac65c6ee44693c2f89bc20
              <td class="time">{{ item.dt | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "DetailPlaylistTable",
  props: {
    playlistItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      //列表滚动控制
      isScroll:false
    };
  },
  computed: {
    ...mapGetters(["currentIndex", "currentSong"]),
    currentSongName() {
      return this.currentSong ? this.currentSong.id : "";
    },
  },
  filters: {
    formatTime(value) {
      let date = new Date(value);
      return formatDate(date, "mm:ss");
    },
  },
  methods: {
    ...mapMutations(["SET_PLAYLIST", "SET_SEQUENCELIST", "SET_CURRENTINDEX"]),
    //将歌曲添加到播放器
    playMusic(item, index) {
      //传递数据至vuex
      this.SET_PLAYLIST(this.playlistItem);
      this.SET_SEQUENCELIST(this.playlistItem);
      this.SET_CURRENTINDEX(index);
    },
    //跳转至歌手页
    toSingerDetail(item) {
      //若在歌手详细页则不再重复跳转
      if (this.$route.path !== "/singer-detail") {
        this.$router.push({
          path: "/singer-detail",
          query: { id: item.ar[0].id },
        });
      }
    },
    //跳转至专辑详细页
    toAblumDetail(item){
      if(this.$route.path !=="/ablum-detail") {
        this.$router.push({
          path:"/ablum-detail",
          query: {
            id: item.al.id
          }
        })
      }
    }
<<<<<<< HEAD
  },
  watch:{
    /* playlistItem(newVal,oldValue){
      console.log(newVal,oldValue)
      if(newVal.length >=15){
        this.isScroll = true;
      }
    } */
=======
>>>>>>> 695e74f3ed2b0c810fac65c6ee44693c2f89bc20
  },
  mounted() {
    //点击播放全部
    this.$nextTick(() => {
      this.$bus.$on("playAllSong", () => {
        console.log(1);
        this.SET_PLAYLIST(this.playlistItem);
        this.SET_SEQUENCELIST(this.playlistItem);
        this.SET_CURRENTINDEX(0);
      });
    });
<<<<<<< HEAD
    //个人详情页列表超15条,激活滚动样式
    /* console.log(this.$route.path);
    if(this.$route.path === "/detail-profile"){
        if(this.playlistItem.length >=15){
          this.isScroll = true
        }
    } */
=======
>>>>>>> 695e74f3ed2b0c810fac65c6ee44693c2f89bc20
  },
};
</script>

<style scoped>
.playlist-table {
  height: 800px;
  overflow: auto;
  font-size: 13px;
}
.playlistscroll {
   height: 800px;
   overflow: auto;
}
.playlist-table table,
.playlist-table th,
.playlist-table td {
  border-collapse: collapse;
}
.playlist-table table {
  table-layout: fixed;
}
.playlist-table .cover img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  vertical-align: middle;
}
.playlist-table td,
.playlist-table th {
  padding-left: 18px;
  height: 50px;
}
.playlist-table td {
  padding: 0 10px;
}
.playlist-table th {
  padding-left: 10px;
  text-align: left;
  line-height: 50px;
  background: #f7f7f7;
}
.playlist-table tr:hover {
  background: rgba(128, 128, 128, 0.2) !important;
}

.playlist-table tr:nth-child(odd) {
  /* 奇数样式更改 */
  background: rgba(255, 255, 255, 0.1);
}
.playlist-table tr:nth-child(even) {
  /* 偶数样式更改 */
  background: rgba(247, 247, 247, 0.8);
}
.playlist-table .order {
  padding: 18px;
}
.playlist-table .song-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.playlist-table .art-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.playlist-table .art-name:hover {
  color: var(--color-high-text);
}
.playlist-table .collection-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.playlist-table .collection-name:hover {
  color: var(--color-high-text);
}
.playlist-table .deactive {
  display: none;
}
.playlist-table .play {
  display: none;
}
.playlist-table .active {
  display: block;
}
.activeplay {
  color: var(--color-high-text);
}
</style>