<template>
  <div class="recommend-song" v-if="recommendSongsData.length !== 0">
    <div class="title">
      <h3>推荐歌曲</h3>
    </div>
    <el-row :gutter="20">
      <el-col
        class="contanier"
        :span="12"
        v-for="(item, index) in recommendSongsData"
        :key="index"
      >
        <div class="song-item">
          <el-row :gutter="10">
            <el-col :span="3">
              <div class="song-id">
                {{ index + 1 }}
              </div>
            </el-col>
            <el-col :span="17">
              <div class="song-info">
                <div class="cover">
                  <img :src="item.picUrl + '?param=100y100'" alt="" />
                </div>
                <div class="song">
                  <div class="song-name">
                    {{ item.name }}
                  </div>
                  <div class="artist-name">
                    <span v-for="(i, index) in item.song.artists" :key="index">{{
                  i.name
                }} </span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="2" class="song-play">
              <div class="play" @click="playMusic(item,index)">
                <img src="~assets/img/play.png" alt="" :class="{deactive:currentIndex == index}"/>
                <img src="~assets/img/pause.png" alt="" class="pause-icon" :class="{active:currentIndex == index}"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendSong",
  props: {
    recommendSongsData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return{
      //当前下标
      currentIndex:null
    }
  },
  methods: {
    playMusic(item,index) {
      
        this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.recommend-song {
  margin-bottom: 20px;
}
.recommend-song .title {
  margin-bottom: 10px;
}
.song-item {
  width: 100%;
  height: 80px;
  margin: 10px 10px 10px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.song-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.song-info .cover img {
  width: 60px;
  height: 60px;
}
.song-item .song-id {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 80px;
}
.song-item .song-info {
  width: 100%;
  height: 100%;
  height: 80px;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
}
.song-item .song {
  display: block;
  padding: 0 10px;
  font-size: 14px;
  color: var(--color-text);
}
.song-item .song .artist-name {
  margin-top: 10px;
}
.song-play {
  height: 80px;
}
.song-play .play {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-top: 25px;
}
.song-play .play img {
  cursor: pointer;
  width: 100%;
}
.song-play .play:hover ,.song-play .pause-icon:hover{
  box-shadow: 5px 1px 12px 1px rgba(255, 69, 0, 0.2);
}
.pause-icon{
  display: none;
}
.active{
  display: block;
}
.deactive{
  display: none;
}
</style>