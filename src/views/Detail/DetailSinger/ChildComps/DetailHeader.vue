<template>
  <div class="header-info" >
    <el-row>
      <div class="header-content">
        <el-col :span="6">
          <div class="singer-avatar">
            <img :src="singerInfo.picUrl + '?param=300y300'" alt="" />
          </div>
        </el-col>

        <el-col :span="17">
          <div class="singer-info">
            <div class="singer-name">
              <h2>{{ singerInfo.name }}</h2>
            </div>
            <div class="singer-desc" v-html="descs.briefDesc"></div>
            <el-popover
              class="detail-desc"
              placement="right-end"
              :title="title"
              offset="0"
              width="400"
              trigger="click"
            >
              <!-- 插入html识别换行 -->
              <ul class="desc-info">
                <li v-for="(item, index) in descs.introduction" :key="index" >
                  <h4>{{ item.ti }}</h4>
                  <p class="detail-info" v-html="item.txt"></p>
                </li>
              </ul>
              <span slot="reference" v-show="descs.introduction.length !==0" class="desc-all">详细介绍</span>
            </el-popover>
            <div class="singer-data">
              <div>
                <ul>
                  <li>
                    单曲<span>{{ singerInfo.musicSize }}</span>
                  </li>
                  <li>
                    专辑<span>{{ singerInfo.albumSize }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <div class="loading">
      <el-button type="danger" @click="playAllSong">
        <i class="el-icon-caret-right"></i>
        <span>播放热门歌曲</span>
      </el-button>
    </div>
    <div class="img-cover">
      <img src="~assets/img/音乐.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
  props: {
    singerInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    descs: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "歌手简介",
    };
  },
  methods:{
    playAllSong(){
      this.$bus.$emit("playAllSong")
    }
  }
};
</script>

<style scoped>
.header-info{
   position:relative;
}
.singer-info {
  padding: 0 10px;

}
.singer-avatar {
  text-align: center;
}
.singer-avatar img {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  box-shadow: 12px 6px 10px rgba(0, 0, 0, 0.3);
}
.singer-desc {
  margin: 20px 0 10px 0;
  line-height: 28px;
  overflow: hidden;
  /* 设置内容显示多少行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 显示几行,多余内容用省略号替代 */
  -webkit-line-clamp: 3;
  white-space: pre-line;
}

.singer-data ul {
  margin-top: 20px;
  list-style: none;
  display: flex;
}
.singer-data li {
  margin-right: 30px;
}
.singer-data li:nth-child(2) {
  padding-left: 30px;
  border-left: 1px solid #DCDFE6;
}
.singer-data li span {
  font-weight: bold;
  padding-left: 10px;
  font-size: 20px;
}
.loading {
  margin-left: 26%;
  margin-top: 20px;
}

.desc-info {
  list-style: none;
}
.desc-info .detail-info{
  margin: 10px 0;
  font-size: 12px;
  line-height: 24px;
  white-space: pre-line;
}
.desc-all:hover{
  cursor: pointer;
  color: var(--color-high-text);
}
.img-cover {
  position: absolute;
  left: 84%;
  top: 176px;
}
.img-cover img{
  width: 100px;
  height: 100px;
  opacity: 0.75;
}
</style>