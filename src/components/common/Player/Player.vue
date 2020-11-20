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
              <i class="icon-play center">
                <img src="~assets/img/播放.png" alt="" />
              </i>
              <i class="icon-play">
                <img src="~assets/img/下一曲.png" alt="" />
              </i>
            </div>
          </el-col>
          <el-col :span="13" class="process">
            <div class="currentTime">00:00</div>
            <div class="range">
              <el-slider
                v-model="currentProcess"
                :show-tooltip="false"
              ></el-slider>
            </div>
            <div class="currentTime">00:00</div>
          </el-col>
          <el-col :span="6" class="volume-control">
            <i class="volume-icon">
              <img src="~assets/img/喇叭.png" alt="">
              </i>
              <el-slider
                class="volume-prosess"
                v-model="currentVolume"
                :show-tooltip="false"
              ></el-slider>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3" class="play-option">
        <el-col :span="8">
          <i class="play-mode">
            <img src="~assets/img/顺序播放.png" alt="">
          </i>
        </el-col>
        <el-col :span="8" >
          <i class="lrc">
            <img src="~assets/img/歌词.png" alt="">
          </i>
        </el-col>
        <el-col :span="8">
          <i class="playlist">
            <img src="~assets/img/播放列表.png" alt="">
          </i>
        </el-col>
      </el-col>
    </el-row>
    <audio 
    :src="$store.state.musicInfo.musicURL"
    autoplay
    ></audio>
  </div>
</template>

<script>
export default {
  name: "player",
  data() {
    return {
      currentProcess: 0,
      currentVolume:50,
    };
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
.volume-icon img{
  width: 20px;
  height: 20px;
  margin-top: 20px;
  margin-right:10px ;
}
.volume-control{
  display:flex;
}
.volume-prosess{
  margin-top:12px ;
  width: 100px!important;
}
.play-option .el-col img{
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.play-option .el-col{
  text-align: center;
  line-height: 70px;
}
</style>