<template>
  <!-- 一行6个栏目 -->
  <el-col :span="4" v-if="Object.keys(listItemData).length !== 0">
    <div class="playlist-item">
      <div class="img">
        <img :src="showImg+'?param=200y200'" alt="" />
        <div class="count">
          <i class="el-icon-caret-right"></i>
          {{ listItemData.playCount | fomartCount}}
        </div>
      </div>
      <div class="text">
        {{ listItemData.name }}
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "PlaylistItem",
  props: {
    listItemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImg() {
      return this.listItemData.coverImgUrl || this.listItemData.picUrl;
    },
  },
  filters:{
    fomartCount(value){
    if (parseInt(value / 10000).toString().length >= 5) {
     return parseInt(value  / 100000000) + "亿";
    } else {
     return parseInt(value / 10000) + "万";
    }
    }
  },
};
</script>

<style scoped>
.el-col {
 
  height: 230px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.playlist-item .img {
  box-shadow: 9px -6px 3px -1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
}
.playlist-item .img:hover {
  box-shadow: 9px -6px 3px -1px rgba(220, 20, 60, 0.2);
}
.playlist-item .img img {
  width: 100%;
  height: 100%;
}
.playlist-item {
  width: 200px;
}
.playlist-item .count {
  position: absolute;
  right: 16px;
  top: 1px;
  height: 24px;
  padding-left: 9px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 0;
  background-size: cover;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.playlist-item .count:after {
  content: "";
  position: absolute;
  right: -14px;
  top: 0;
  width: 14px;
  height: 24px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 100%;
  background-size: cover;
}

.playlist-item .text {
  text-align: left;
  width: 150px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 显示几行,多余内容用省略号替代 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--color-text);
  font-size: 10px!important;
  padding-top: 20px;
  font-weight: bold;
}
</style>