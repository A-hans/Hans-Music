<template>
  <div class="album-content" v-if="ablumHeader">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="cover">
          <img :src="ablumHeader.album.picUrl + '?param=300y300'" alt="" />
        </div>
      </el-col>
      <el-col :span="15">
        <div class="album-info">
          <div class="album-name">
            <h2>{{ ablumHeader.album.name }}</h2>
          </div>
          <div>
            <span class="singer-name" @click="toSinger"
              >歌手:&nbsp;&nbsp;{{ ablumHeader.album.artist.name }}</span
            >
            <span class="publish-time"
              >发行时间:&nbsp;&nbsp;{{
                ablumHeader.album.publishTime | formatTime
              }}</span
            >
          </div>
          <div class="ablum-type">
            <span>专辑类型:&nbsp;&nbsp;{{ ablumHeader.album.type }}</span>
          </div>
          <div class="desc">
            <p v-html="ablumHeader.album.description"></p>
            <el-popover
              placement="right-end"
              class="detail-desc"
              :title="ablumHeader.album.name"
              offset="0"
              width="400"
              trigger="click"
            >
              <!-- 插入html识别换行 -->
              <div
                class="popover-content"
                v-html="ablumHeader.album.description"
              ></div>
              <span
                slot="reference"
                v-if="
                  txtLength(ablumHeader.album.description) > 1 ||
                  ablumHeader.album.description.length > 55
                "
              >
                全部</span
              >
            </el-popover>
          </div>
          <div class="loading">
            <el-button type="danger">
              <i class="el-icon-caret-right"></i>
              <span>播放全部</span>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailHeader",
  props: {
    ablumHeader: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    //查找换行出现的次数
    txtLength() {
      return function (txt) {
        let num = 0; //记录出现次数
        let index = txt.indexOf("\n"); //记录出现位置
        while (index !== -1) {
          num++; // 每出现一次 次数加一
          index = txt.indexOf("\n", index + 1); // 从字符串出现的位置的下一位置开始继续查找
        }
        return num;
      };
    },
  },
  filters: {
    formatTime(value) {
      let time = new Date(value);
      return formatDate(time, "yyyy-MM-dd");
    },
  },
  methods: {
    toSinger() {
      this.$router.push({
        path: "/singer-detail",
        query: {
          id: this.ablumHeader.album.artist.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.cover {
  box-shadow: 12px 8px 0px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.cover img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  border-radius: 4px;
}
.album-info {
  padding-top: 20px;
  padding-left: 15px;
  font-size: 14px;
}
.album-name + div {
  margin: 15px 0;
}
.singer-name {
  margin-right: 15px;
}
.ablum-type {
  margin: 15px 0;
}
.desc p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-line;
  overflow: hidden;
  margin-bottom: 10px;
}
.detail-desc {
  white-space: pre-line;
}
.detail-desc:hover,
.singer-name:hover {
  cursor: pointer;
  color: var(--color-high-text);
}
.loading {
  margin-top: 15px;
  margin-left: 76%;
}
</style>