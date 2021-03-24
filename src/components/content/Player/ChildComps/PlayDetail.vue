<template>
  <div class="play-detail">
    <el-row class="play-detail-info">
      <el-col :span="9">
        <div class="cover">
          <img :src="songImg" alt="" />
        </div>
        <div class="function-bar">
          <div class="like" @click="likeMusic">
            <img
              src="~assets/img/icon-like-active.png"
              v-if="likeState"
              alt=""
            />
            <img src="~assets/img/icon-like.png" v-else alt="" />
            <div>喜欢</div>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="content">
          <div class="song-name">
            {{ songName }}
          </div>
          <div class="song-info">
            <div class="singer-name" @click="toSingerDetail">
              <span>歌手：</span>{{ singerName }}
            </div>
            <div class="ablum-name" @click="toAblumDetail">
              <span>专辑：</span>{{ ablumName }}
            </div>
          </div>
          <div class="lrc-contanier">
            <scroll class="contanier" ref="lrcScroll">
              <div class="lrc">
                <ul v-if="lrcData.length !== 0">
                  <li
                    v-for="(item, index) in lrcData"
                    :key="index"
                    ref="lrcItem"
                    class="lrc-item"
                    :class="{ activeLrc: currentLineNum == index }"
                  >
                    {{ item.txt }}
                  </li>
                </ul>
                <div class="Occupation-img" v-else>
                  <div>暂无歌词</div>
                </div>
              </div>
            </scroll>
          </div>
        </div>
      </el-col>
    </el-row>
    <div
      class="play-detail-cover"
      :style="{ backgroundImage: 'url(' + songImg + ')' }"
    ></div>
  </div>
</template>

<script>
import { likeMusic, likelist } from "network/Song";

import { mapGetters } from "vuex";

import scroll from "components/common/Scroll/Scroll";
export default {
  props: {
    //已格式化歌词信息
    lrcData: {
      type: Array,
      default() {
        return [];
      },
    },
    //当前播放时间
    currentTime: { type: Number, default: 0 },
  },
  data() {
    return {
      //当前播放歌词
      currentLineNum: 0,
      //当前播放时间
      currentPlayTime: 0,
      //喜欢状态
      likeState: false,
      //喜欢列表
      likeList: [],
      //用户信息
      userId: "",
    };
  },
  computed: {
    ...mapGetters(["currentSong"]),
    //歌曲图片
    songImg() {
      return this.currentSong
        ? this.currentSong.al.picUrl + "?param=600y600"
        : "";
    },
    //歌曲名
    songName() {
      return this.currentSong ? this.currentSong.name : "";
    },
    //歌手名
    singerName() {
      return this.currentSong ? this.currentSong.ar[0].name : "";
    },
    //专辑名
    ablumName() {
      return this.currentSong ? this.currentSong.al.name : "暂无";
    },
  },
  watch: {
    currentTime(newVal) {
      if (newVal) {
        this.currentPlayTime = newVal;
        this.moveLrc();
      }
    },
    currentSong(newVal) {
      if (newVal) {
        this.$refs.lrcScroll.Refresh();
        if(this.userId){
          this.isLikeMusic();
        } 
      }
    },
  },
  methods: {
    //滚动歌词
    moveLrc() {
      this.currentLineNum = this.findCurrentNum(this.currentPlayTime * 1000);
      //歌词大于六行则开始滚动
      if (this.currentLineNum > 6) {
        this.$refs.lrcScroll.ScrollToElement(
          this.$refs.lrcItem[this.currentLineNum - 6],
          500
        );
      } else {
        this.$refs.lrcScroll.ScrollTo(0, 0, 1000);
      }
    },
    //判断滚动的行数
    findCurrentNum(time) {
      for (let i = 0; i < this.lrcData.length; i++) {
        if (time < this.lrcData[i].time) {
          return i - 1;
        }
      }
      //若歌词结束,歌曲还未结束
      return this.lrcData.length - 1;
    },
    //跳转至歌手详情页
    toSingerDetail() {
      this.$router.push({
        path: "/singer-detail",
        query: {
          id: this.currentSong.ar[0].id,
        },
      });
      this.$bus.$emit("cancelActive");
      this.$emit("hideDetail");
    },
    //跳转至专辑详情页
    toAblumDetail() {
      this.$router.push({
        path: "/ablum-detail",
        query: {
          id: this.currentSong.al.id,
        },
      });
      this.$bus.$emit("cancelActive");
      this.$emit("hideDetail");
    },
    //喜欢音乐
    likeMusic() {
      let id = this.currentSong.id;
      if(this.userId){
         likeMusic(id, this.likeState)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.likeState = !this.likeState;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        this.$message.error("请先登录!");
      }
    },
    //判断是否已喜欢音乐
    isLikeMusic() {
      for (let item of this.likeList) {
        let result = String(item).indexOf(String(this.currentSong.id));
        if (result === 0) {
          this.likeState = true;
          return;
        } else {
          this.likeState = false;
        }
      }
    },
  },
  components: {
    scroll,
  },
  mounted() {
    //进入详细页进行刷新
    this.$refs.lrcScroll.Refresh();
    //获取用户信息
    let state =  window.sessionStorage.getItem("userInfo") ? JSON.parse(window.sessionStorage.getItem("userInfo")).userId : "";
    if (state) {
       this.userId = state;
        likelist(this.userId)
        .then((res) => {
          this.likeList = res.ids;
          this.isLikeMusic();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>



<style scoped>
.play-detail {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 62px;
  background: rgb(169, 169, 169);
}
.play-detail-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 500px;
  z-index: 999;
  color: white;
}
.play-detail-info .song-name {
  font-size: 32px;
}
.play-detail-info .cover img {
  width: 300px;
  height: 300px;
  margin-top: calc(50% - 130px);
  box-shadow: 4px 6px 6px 6px rgba(0, 0, 0, 0.1);
}
.play-detail-info .song-info {
  display: flex;
  margin-top: 28px;
}
.play-detail-info .song-info .singer-name {
  padding-right: 30px;
}
.play-detail-cover {
  width: 100%;
  height: 75%;
  background: no-repeat;
  background-size: 100%;
  filter: blur(100px);
}

.lrc-contanier {
  overflow: hidden;
  width: 500px;
  height: 360px;
  margin-top: 20px;
}
.lrc ul {
  padding-top: 20px;
  list-style: none;
  text-align: left;
}
.lrc-item {
  line-height: 30px;
  font-size: 14px;
}
.contanier {
  height: 400px;
}
.activeLrc {
  color: var(--color-high-text);
  font-size: 18px;
}
.singer-name:hover {
  color: var(--color-high-text);
  cursor: pointer;
}
.ablum-name:hover {
  color: var(--color-high-text);
  cursor: pointer;
}
.function-bar {
  margin-top: 20px;
  color: black;
}
.function-bar .like {
  width: fit-content;
  padding: 4px 8px;
  background: rgba(220, 220, 220, 0.6);
  display: flex;
  border-radius: 24px;
  cursor: pointer;
}
.function-bar .like img {
  width: 24px;
  height: 24px;
  display: block;
  margin-right: 5px;
}
.function-bar .like > div {
  font-size: 14px;
  line-height: 24px;
}
</style>