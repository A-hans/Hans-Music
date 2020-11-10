<template>
  <!-- 一行6个栏目 -->
  <el-col :span="4" v-if="Object.keys(listItemData).length !== 0">
    <div class="playlist-item">
      <div class="img">
        <img :src="showImg" alt="" />
        <div class="count">
          <i class="el-icon-caret-right"></i>
          {{ listItemData.playCount }}
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
  methods: {},
};
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
  height: 230px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.playlist-item .img {
  box-shadow: 6px 3px 12px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
}
.playlist-item .img:hover {
  box-shadow: 6px 3px 12px 2px rgba(220, 20, 60, 0.2);
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
  font-family: PingFang SC, Arial, Microsoft YaHei, sans-serif;
  text-align: left;
  color: var(--color-text);
  font-size: 10px;
  padding-top: 20px;
  font-weight: bold;
}
</style>