<template>
  <div class="play-detail" >
     <div class="play-detail-basic">播放详细页</div>
    <div class="play-detail-cover" :style="{backgroundImage:'url('+songImg+')'}">
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return{}
  },
  computed:{
    ...mapGetters([
      'currentSong'
    ]),
    //歌曲图片
    songImg() {
      return this.currentSong
        ? this.currentSong.al.picUrl + "?param=300y300"
        : "";
    }
  }
}
</script>

<style scoped>
.play-detail{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 62px;
  background:rgb(211,211,211);
}
.play-detail-cover{
  width: 100%;
  height: 80%;
  background: no-repeat;
  background-size:100% ;
  filter: blur(65px);
}
.play-detail-basic{
}

</style>