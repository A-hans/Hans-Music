<template>
  <div class="album-info" v-if="activeInfo">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="title">
          <h3>专辑信息</h3>
        </div>
        <div class="active-info">
          <ul>
            <li>
              <img src="~assets/img/收藏.png" alt="" />
              <span>{{ activeInfo.subCount }}</span>
            </li>
            <li>
              <img src="~assets/img/评论.png" alt="" />
              <span>{{ activeInfo.commentCount }}</span>
            </li>
            <li>
              <img src="~assets/img/分享.png" alt="" />
              <span>{{ activeInfo.shareCount }}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="image">
          <img src="~assets/img/记事本.png" alt="" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DetailAlbumInfo",
  props: {
    activeInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.album-info {
  padding: 15px;
  border-radius: 15px;
  background: var(--color-background);
}
.active-info ul {
  list-style: none;
  padding-left: 8px;
}
.active-info li img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 5px;
}
.active-info li {
  margin-bottom: 10px;
  font-size: 13px;
}
.active-info li:nth-child(3) {
  margin: 0;
}

.image img {
  width: 120px;
  margin-top: 5.5%;
  margin-left: 28%;
}
</style>