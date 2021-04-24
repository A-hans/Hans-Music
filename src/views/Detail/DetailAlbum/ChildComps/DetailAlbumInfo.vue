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
              <img src="~assets/img/爱心.png" alt="" />
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
          <img src="~assets/img/ablum.png" alt="" />
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
  width: 24px;
  height: 22px;
  vertical-align: middle;
  margin-right: 12px;
}
.active-info li {
  margin-bottom: 16px;
  font-size: 13px;
}
.active-info li:nth-child(3) {
  margin: 0;
}

.image img {
  width: 135px;
  margin-top: 10.5%;
  margin-left: 26%;
}
</style>