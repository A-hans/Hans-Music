<template>
  <div id="music-player" v-if="currentSong">
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="song-info">
          <div class="cover">
            <img :src="showImg" alt="" v-show="currentSong" />
            <img src="~assets/img/唱片.png" alt="" v-show="!currentSong" />
          </div>
          <div class="text-info">
            <div class="song-name">
              <h4>{{ songName }}</h4>
            </div>
            <div class="singer-name" @click="toSinger">
              <span v-for="(item, index) in singerName" :key="index">{{
                item.name
              }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <el-row :gutter="20" class="play-control">
          <el-col :span="5">
            <div class="play-button">
              <i class="icon-play">
                <img src="~assets/img/上一曲.png" alt="" @click="prev" />
              </i>
              <i class="icon-play center" @click="togglePlay">
                <img src="~assets/img/暂停.png" alt="" v-if="playing" />
                <img src="~assets/img/播放.png" alt="" v-else />
              </i>
              <i class="icon-play">
                <img src="~assets/img/下一曲.png" alt="" @click="next" />
              </i>
            </div>
          </el-col>
          <el-col :span="13" class="process">
            <div class="currentTime">{{ currentTime | formatTime }}</div>
            <div class="range">
              <el-slider
                v-model="currentProcess"
                :show-tooltip="false"
                :max="totalTime"
                @change="changePlayProcess"
              ></el-slider>
            </div>
            <div class="currentTime">{{ totalTime | formatTime }}</div>
          </el-col>
          <el-col :span="6" class="volume-control">
            <i class="volume-icon" @click="mute">
              <img src="~assets/img/喇叭.png" alt="" v-if="isMute" />
              <img src="~assets/img/静音 .png" alt="" v-else />
            </i>
            <el-slider
              class="volume-prosess"
              v-model="currentVolume"
              :max="100"
              @change="changeVolume"
              :show-tooltip="false"
            ></el-slider>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3" class="play-option">
        <el-col class="play-option-icon" :span="8">
          <i class="play-mode" @click="changeMode">
            <img
              src="~assets/img/顺序播放.png"
              alt=""
              v-show="currentMode == 0"
            />
            <img
              src="~assets/img/单曲循环.png"
              alt=""
              v-show="currentMode == 1"
            />
            <img
              src="~assets/img/随机播放.png"
              alt=""
              v-show="currentMode == 2"
            />
          </i>
        </el-col>
        <el-col :span="8" class="play-option-icon">
          <i class="lrc-icon" @click="showLrcInfo">
            <img src="~assets/img/歌词.png" alt="" />
          </i>
          <transition name="el-zoom-in-bottom">
      <div class="lrc-contanier" v-show="showLrc">
        <scroll class="contanier" ref="lrcScroll">
          <div class="lrc">
            <ul v-if="lrcLines.length !== 0">
              <li
                v-for="(item, index) in lrcLines"
                :key="index"
                ref="lrcItem"
                class="lrc-item"
                :class="{ activeLrc: currentLineNum == index }"
              >
                {{ item.txt }}
              </li>
            </ul>
            <div class="Occupation-img" v-else>
              <img src="~assets/img/歌词占位图.png" alt="" />
              <div>暂无歌词</div>
            </div>
          </div>
        </scroll>
      </div>
    </transition>
        </el-col>
        <el-col :span="8" class="play-option-icon">
          <i class="playlist-icon" @click="showplaylistInfo">
            <img src="~assets/img/播放列表.png" alt="" />
          </i>
           <transition name="el-zoom-in-bottom">
      <div class="playlist-table" v-show="showPlaylist">
        <scroll class="playlist-contanier" ref="playlistScroll">
          <playlist-table @stopMusic="stopMusic" />
        </scroll>
      </div>
    </transition>
        </el-col>
      </el-col>
    </el-row>
    <audio
      ref="audio"
      :src="musicData.url"
      @playing="audioReady"
      @ended="playEnd"
      @timeupdate="updateTime"
    ></audio>
    
   
  </div>
</template>

<script>
import { getMusicUrl, getMusicLrc } from "network/Song";
import { playMode } from "common/alias";
import { formatDate } from "common/utils";
import { mapGetters, mapMutations } from "vuex";
import scroll from "components/common/Scroll/Scroll";
import PlaylistTable from "components/content/Player/ChildComps/PlaylistTable";
import Scroll from "../../common/Scroll/Scroll.vue";
export default {
  name: "player",
  data() {
    return {
      //音乐地址
      musicData: {},
      //歌词信息
      musicLrc: {},
      //格式化歌词信息
      lrcLines: [],
      //播放状态
      playing: false,
      //当前播放歌词
      currentLineNum: 0,
      //当前播放模式
      currentMode: 0,
      //当前播放进度
      currentProcess: 0,
      //当前音量大小
      currentVolume: 50,
      //当前播放时间
      currentTime: 0,
      //播放总时长
      totalTime: 0,
      //存放进度条计时器
      time1: null,
      //是否静音
      isMute: true,
      //上一次的音量值
      preVolume: 0,
      //歌词是否显示
      showLrc: false,
      //播放列表是否显示
      showPlaylist: false,
    };
  },
  computed: {
    ...mapGetters([
      "playlist",
      "sequenceList",
      "currentIndex",
      "currentSong",
      "mode",
    ]),
    songName() {
      //currentSong非空判断(三目运算符)
      return this.currentSong ? this.currentSong.name : "";
    },
    singerName() {
      return this.currentSong ? this.currentSong.ar : "";
    },
    showImg() {
      return this.currentSong
        ? this.currentSong.al.picUrl + "?param=100y100"
        : "";
    },
  },
  filters: {
    //对播放总时长进行时间格式化
    formatTime(value) {
      let date = new Date(value * 1000);
      return formatDate(date, "mm:ss");
    },
  },
  watch: {
    //监听当前播放的歌曲,判断是否需要发起新的网络请求
    currentSong(newVal, oldVal) {
      //第一进来为undefined,需要发生请求,当两次值不匹配时发生请求
      if (oldVal === undefined || newVal.id != oldVal.id) {
        //获取音乐地址
        this.getMusicApi(newVal.id);
        //获取歌词信息
        this.getMusicLrcApi(newVal.id);
        //进度条清零
        this.currentProcess = 0;
         if (this.playlist&&this.mode == 2) {
          let newPlaylist = this.getRandomList(this.sequenceList);
          //随机列表当前播放歌曲与原列表歌曲做匹配
          const newIndex = newPlaylist.findIndex(
            (item) => item.id === this.currentSong.id
          );
          //更新Vuex内数据
          this.SET_PLAYLIST(newPlaylist);
          this.SET_CURRENTINDEX(newIndex);
        }
      }
    },
  },
  methods: {
    ...mapMutations(["SET_CURRENTINDEX", "SET_MODE", "SET_PLAYLIST"]),
    //获取音乐地址
    getMusicApi(id) {
      getMusicUrl(id)
        .then((res) => {
          if (res.code === 200 && res.data[0].code === 200) {
            this.musicData = res.data[0];
            //播放音乐时按钮状态
            this.$nextTick(() => {
              this.togglePlay(true);
            });
          }
        })
        .catch((err) => {});
    },
    //获取歌词信息
    getMusicLrcApi(id) {
      getMusicLrc(id)
        .then((res) => {
          if (res.code === 200 && res.lrc) {
            this.musicLrc = res.lrc.lyric;
            //格式化歌词
            this.initLins();
            //更新better-scroll
            this.$nextTick(() => {
              this.$refs.lrcScroll.Refresh();
            });
          }
        })
        .catch((err) => {});
    },
    //播放状态控制
    togglePlay(val) {
      if (!this.currentSong) return;
      //第一次进行播放时,给定准确值
      if (val == true || val == false) {
        this.playing = val;
      } else {
        //播放时点击按钮进行取反
        this.playing = !this.playing;
      }
      const audio = this.$refs.audio;
      if (this.playing) {
        audio.play();
      } else {
        audio.pause();
        clearInterval(this.time1);
      }
    },
    //上一曲
    prev() {
      //获取播放列表长度
      const len = this.playlist.length;
      let newIndex = this.currentIndex - 1;
      if (newIndex < 0) {
        //若当前是第一首,则点击返回至最后一首
        newIndex = len - 1;
      }
      //更新currnetIndex的值
      this.SET_CURRENTINDEX(newIndex);
    },
    //下一曲
    next() {
      const len = this.playlist.length;
      let newIndex = this.currentIndex + 1;
      if (newIndex == len) {
        //若是最后一首时,返回第一首
        newIndex = 0;
      }
      //更新currnetIndex的值
      this.SET_CURRENTINDEX(newIndex);
    },
    //播放模式
    changeMode() {
      //点击后每次加1,对3进行取余,进行0,1,2的循环
      this.currentMode = (this.mode + 1) % 3;
      //更新vuex内数据
      this.SET_MODE(this.currentMode);
      //用于存放随机播放后的新列表
      let newPlaylist = [];
      //是否进入随机模式
      if (this.mode == 2) {
        newPlaylist = this.getRandomList(this.sequenceList);
      } else {
        //非随机模式下将列表恢复顺序播放
        newPlaylist = this.sequenceList;
      }
      //随机列表当前播放歌曲与原列表歌曲做匹配
      const newIndex = newPlaylist.findIndex(
        (item) => item.id === this.currentSong.id
      );
      //更新Vuex内数据
      this.SET_PLAYLIST(newPlaylist);
      this.SET_CURRENTINDEX(newIndex);
    },
    //随机播放列表的操作
    getRandomList(arr) {
      //不改变原数组的值
      const newArr = [].concat(arr);
      //使用sort方法进行排序,a>b返回大于0的值,a<b返回小于0的值
      return newArr.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
    },
    //单曲循环操作
    loop() {
      const audio = this.$refs.audio;
      audio.currentTime = 0;
      audio.play();
    },
    updateTime() {
      this.moveLrc();
    },
    //滚动歌词
    moveLrc() {
      this.currentLineNum = this.findCurrentNum(this.currentTime * 1000);
      if (this.currentLineNum > 6) {
        this.$refs.lrcScroll.ScrollToElement(
          this.$refs.lrcItem[this.currentLineNum - 6],
          1000
        );
      } else {
        this.$refs.lrcScroll.ScrollTo(0, 0, 1000);
      }
    },
    findCurrentNum(time) {
      for (let i = 0; i < this.lrcLines.length; i++) {
        if (time < this.lrcLines[i].time) {
          return i - 1;
        }
      }
      //若歌词结束,歌曲还未结束
      return this.lrcLines, length - 1;
    },
    //播放开始前
    audioReady() {
      //存储播放总时长
      this.totalTime = this.$refs.audio.duration;
      //进度条开启
      this.playProcess();
    },
    //播放进度条
    playProcess() {
      //清除计时器
      clearInterval(this.time1);
      //使用定时器让进度条动起来
      this.time1 = setInterval(() => {
        //获取当前播放时间
        this.currentTime = this.$refs.audio.currentTime;
        //每秒播放进度+1
        this.currentProcess = this.currentProcess + 1;
      }, 1000);
    },
    //拖动进度条更改播放时间
    changePlayProcess() {
      this.$refs.audio.currentTime = this.currentProcess;
    },
    //拖动更改音量
    changeVolume() {
      this.$refs.audio.volume = this.currentVolume / 100;
      //是否显示静音
      if (this.currentVolume == 0) {
        this.isMute = false;
      } else {
        this.isMute = true;
      }
    },
    //点击静音
    mute() {
      if (this.isMute) {
        this.isMute = false;
        //储存静音前的音量值
        this.preVolume = this.currentVolume;
        this.$refs.audio.volume = 0;
        this.currentVolume = 0;
      } else {
        this.isMute = true;
        this.$refs.audio.volume = this.preVolume / 100;
        this.currentVolume = this.preVolume;
      }
    },
    //播放结束时
    playEnd() {
      //播放结束时清除所有数据
      clearInterval(this.time1);
      this.currentProcess = 0;
      if (this.playlist.length == 1) {
        this.loop();
      }
      //若是单曲循环
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    //格式化歌词
    initLins() {
      this.lrcLines = [];
      if (this.musicLrc) {
        //将数据通过\n来分割成多个数组
        const lines = this.musicLrc.split("\n");
        const timeExp = /\[(\d{2}):(\d{2}\.\d{2,3})\]/g;
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          //正则匹配方法
          const result = timeExp.exec(line);
          if (result) {
            const time =
              Number(result[1] * 60 * 1000) + Number(result[2] * 1000);
            const txt = line.replace(timeExp, "").trim();
            this.lrcLines.push({
              time,
              txt,
            });
          }
        }
      }
    },
    //歌词展开
    showLrcInfo() {
      this.showLrc = !this.showLrc;
      this.showPlaylist = false;
      this.$nextTick(() => {
        this.$refs.lrcScroll.Refresh();
      });
    },
    //播放列表展开
    showplaylistInfo() {
      this.showPlaylist = !this.showPlaylist;
      this.showLrc = false;
      //更新better-scroll
      this.$nextTick(() => {
        this.$refs.playlistScroll.Refresh();
      });
    },
    //播放列表中点击清空停止音乐播放
    stopMusic() {
      this.$nextTick(() => {
        this.$refs.playlistScroll.Refresh();
      });
    },
    //点击跳转进歌手页
    toSinger(item) {
      this.$router.push({
        path: "/singer-detail",
        query: {
          id: this.currentSong.ar[0].id,
        },
      });
      this.$bus.$emit("cancelActive");
    },
  },
  components: {
    scroll,
    PlaylistTable,
  },
};
Scroll;
</script>

<style scoped>
#music-player {
  width: 1200px;
  height: 60px;
  margin: 0 auto;
}
.el-col {
  height: 60px;
}
.song-info {
  display: flex;
}
.cover {
  margin-top: 5px;
}
.cover img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  vertical-align: baseline;
}
.text-info {
  margin-left: 10px;
}
.song-name {
  margin-top: 14px;
  margin-bottom: 6px;
  font-size: 13px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.singer-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  cursor: pointer;
  overflow: hidden;
  font-size: 10px;
}
.icon-play img {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.play-button .center img {
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
  cursor: pointer;
}
.play-button i {
  width: 35px;
  height: 35px;
}
.play-button .center {
  margin: 0 15px;
}
.play-button {
  text-align: center;
  margin-top: 12px;
}
.process {
  display: flex;
}
.process > div {
  margin-top: 12px;
}
.process .currentTime {
  line-height: 38px;
  font-size: 10px;
}

.range {
  margin: 0 20px;
  width: 300px;
}
.volume-icon img {
  width: 20px;
  height: 20px;
  margin-top: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.volume-control {
  display: flex;
}
.volume-prosess {
  margin-top: 12px;
  width: 100px !important;
}
.play-option .play-option-icon img {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.play-option .play-option-icon {
  text-align: center;
  line-height: 70px;
}
.play-option {
  position: relative;
}
.lrc-contanier {
  width: 300px;
  height: 400px;
  position: absolute;
  bottom: 70px;
  right: 0;
  border-radius: 6px;
  background-color: var(--color-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.lrc ul {
  padding-top: 20px;
  list-style: none;
  line-height: 0;
  text-align: center;
}
.lrc-item {
  line-height: 30px;
  font-size: 13px;
}
.contanier {
  height: 400px;
  overflow: hidden;
}
.playlist-table {
  width: 380px;
  padding: 15px;
  border-radius: 6px;
  position: absolute;
  right: 0;
  bottom: 70px;
  background-color: var(--color-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.activeLrc {
  color: var(--color-high-text);
  font-size: 15px;
}
.Occupation-img {
  text-align: center;
  line-height: 0;
  margin: 0 auto;
  margin-top: 36%;
}
.Occupation-img img {
  width: 100px!important;
  height: 100px!important;
}
.Occupation-img div{
  margin-top: 20px;
}
.playlist-contanier {
  height: 450px;
  overflow: hidden;
}
</style>