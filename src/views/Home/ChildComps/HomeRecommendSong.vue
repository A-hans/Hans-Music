<template>
  <div class="recommend-song" v-if="recommendSongsData.length !==0">
    <h3>推荐歌曲</h3>
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
                {{ index+1 }}
              </div>
            </el-col>
            <el-col :span="17">
              <div class="song-info">
                <div class="cover">
                  <img :src="item.picUrl+'?param=100y100'" alt="" />
                </div>
                <div class="song">
                  <div class="song-name">
                    {{ item.name }}
                  </div>
                  <div class="artist-name">
                    {{ item.song.artists[0].name }}
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="2" class='song-play'>
              <div class="play">
                <img src="~assets/img/play.png" alt="">
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
  props:{
    recommendSongsData:{
      type:Array,
      default(){
        return []
      }
    }
  },
};
</script>

<style scoped>
.recommend-song {
  margin-bottom: 20px;
}
.recommend-song h3{
  margin-bottom:10px ;
}
.song-item {
  width: 100%;
  height: 80px;
  margin: 10px 10px 10px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.song-item:hover{
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.song-info .cover img{
  width: 60px;
  height: 60px;
}
.song-item .song-id{
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 80px;
}
.song-item .song-info{
  width: 100%;
  height: 100%;
  height: 80px;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
}
.song-item .song{
  display: block;
  padding: 0 10px;
  font-size: 14px;
  color:var(--color-text);
}
.song-item .song .artist-name{
  margin-top:10px ;
}
.song-play{
  height: 80px;
}
.song-play .play {
  width: 30px;
  height: 30px;
  border-radius:15px ;
  margin-top:25px ;
}
.song-play .play img{
  width: 100%;
}
.song-play .play:hover{
  box-shadow: 5px 1px 12px 1px rgba(255, 69, 0, 0.2);
}
</style>