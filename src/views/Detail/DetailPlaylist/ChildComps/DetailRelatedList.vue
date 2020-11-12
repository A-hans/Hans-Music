<template>
  <div class="related-list">
    <el-row>
      <h4 class="title">相关歌单推荐:</h4>
      <el-col
        class="list-cotanier"
        :span="24"
        v-for="(item, index) in relatedList"
        :key="index"
        @click.native="loadNewList(item)"
      >
        <div class="list-item">
          <el-col :span="6" class="cover">
            <div>
              <img :src="item.coverImgUrl+'?param=100y100'" alt="" />
            </div>
          </el-col>
          <el-col :span="18" class="content">
            <div>
              <p>{{ item.name }}</p>
              <span>By:{{ item.creator.nickname }}</span>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DetailRelatedList",
  props: {
    relatedList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //传递新的歌单信息给路由
    loadNewList(item) {
      let num = item.id;
      //jiangjiang
      this.$router.push({
        path: '/playlist-detail',
        query: {
         id:num
        },
      });
      //重新刷新当前路由
      this.$router.go(0)
    },
  },
};
</script>

<style scoped>
.related-list {
  margin-top: 20px;
  padding: 15px;
  border-radius: 15px;
  background: var(--color-background);
}
.list-cotanier {
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.list-cotanier:hover {
  box-shadow: 0 2px 12px 0 rgba(225, 0, 0, 0.3);
}
.el-col {
  height: 70px;
}
.list-item .cover {
  text-align: center;
  padding: 10px;
}
.list-item .cover img {
  width: 50px;
  height: 50px;
}
.content {
  padding: 0 5px;
  cursor: pointer;
}
.content p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 显示几行,多余内容用省略号替代 */
  -webkit-line-clamp: 1;
  overflow: hidden;
  line-height: 40px;
  font-size: 14px;
  font-weight: bold;
}
.content span {
  font-size: 12px;
  padding-top: 5px;
}
</style>