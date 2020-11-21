<template>
  <div id="music-player" v-if="$store.state.musicInfo !== null">
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="song-info">
          <div class="cover">
            <img
              :src="$store.state.musicInfo.item.picUrl + '?param=100y100'"
              alt=""
            />
          </div>
          <div class="text-info">
            <div class="song-name">
              <h4>{{ $store.state.musicInfo.item.song.name }}</h4>
            </div>
            <div class="singer-name">
              {{ $store.state.musicInfo.item.song.artists[0].name }}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <el-row :gutter="20" class="play-control">
          <el-col :span="5">
            <div class="play-button">
              <i class="icon-play">
                <img src="~assets/img/上一曲.png" alt="" />
              </i>
              <i class="icon-play center" @click="playMusic">
                <img src="~assets/img/播放.png" alt="" v-if="isShowIcon" />
                <img src="~assets/img/暂停.png" alt="" v-else />
              </i>
              <i class="icon-play">
                <img src="~assets/img/下一曲.png" alt="" />
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
            <i class="volume-icon" 
            @click="mute">
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
        <el-col :span="8">
          <i class="play-mode">
            <img src="~assets/img/顺序播放.png" alt="" />
          </i>
        </el-col>
        <el-col :span="8">
          <i class="lrc">
            <img src="~assets/img/歌词.png" alt="" />
          </i>
        </el-col>
        <el-col :span="8">
          <i class="playlist">
            <img src="~assets/img/播放列表.png" alt="" />
          </i>
        </el-col>
      </el-col>
    </el-row>
    <audio
      ref="audio"
      :src="$store.state.musicInfo.musicURL"
      @playing="audioReady"
      @ended="playEnd"
      autoplay
    ></audio>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "player",
  data() {
    return {
      //当前播放进度
      currentProcess: 0,
      //当前音量大小
      currentVolume: 50,
      //播放按钮是否显示
      isShowIcon: false,
      //当前播放时间
      currentTime: 0,
      //播放总时长
      totalTime: 0,
      //存放进度条计时器
      time1: null,
      //是否静音
      isMute: true,
      //上一次的音量值
      preVolume:0
    };
  },
  filters: {
    //对播放总时长进行时间格式化
    formatTime(value) {
      let date = new Date(value * 1000);
      return formatDate(date, "mm:ss");
    },
  },
  methods: {
    //音乐播放暂停
    playMusic() {
      //播放暂停图标切换
      this.isShowIcon = !this.isShowIcon;
      if (this.isShowIcon) {
        //播放暂停
        this.$refs.audio.pause();
        //计时器停止
        clearInterval(this.time1);
      } else {
        //继续播放
        this.$refs.audio.play();
      }
    },
    //播放开始前
    audioReady() {
      //重置播放图标
      this.isShowIcon = false;
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
      }else{
        this.isMute = true;
      }
    },
    //点击静音
    mute(){
      if(this.isMute){
        this.isMute =false;
        //储存静音前的音量值
        this.preVolume = this.currentVolume;
        this.$refs.audio.volume = 0;
        this.currentVolume = 0;
      }else{
        this.isMute =true;
        this.$refs.audio.volume = (this.preVolume/100);
        this.currentVolume =this.preVolume;
      }
    },
    //播放结束时
    playEnd() {
      //播放结束时清除所有数据
      clearInterval(this.time1);
      this.currentProcess = 0;
      this.currentTime = 0;
      this.isShowIcon = true;
    },
  },
  mounted() {
    //外部组件切歌时重置播放进度条
    this.$bus.$on("reloadProcess", () => {
      this.currentProcess = 0;
    });
  },
};
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
  overflow: hidden;
  font-size: 10px;
}
.icon-play img {
  width: 35px;
  height: 35px;
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
}
.volume-control {
  display: flex;
}
.volume-prosess {
  margin-top: 12px;
  width: 100px !important;
}
.play-option .el-col img {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.play-option .el-col {
  text-align: center;
  line-height: 70px;
}
</style>