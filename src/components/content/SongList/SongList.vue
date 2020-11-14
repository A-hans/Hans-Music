<template>
  <div class="playList">
    <el-row :gutter="20">
      <song-list-item
        :listItemData="item"
        v-for="(item, index) in playlistData"
        :key="index"
        @click.native="clickItem(item)"
      >
      </song-list-item>
    </el-row>
  </div>
</template>

<script>
import SongListItem from "components/content/SongList/SongListItem";
export default {
  name: "SongList",
  props: {
    playlistData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //监听每个歌单的点击
    clickItem(item) {
      //将歌单的id传递进详情页
      this.$router.push({
        path: "/playlist-detail",
        query: { id: item.id },
      });
      //运用事件总线建立起与导航组件的联系,跳转详情页后取消当前激活样式
      this.$bus.$emit("cancelActive");
    },
  },
  components: {
    SongListItem,
  },
};
</script>

<style scoped>
.el-row {
  margin: 20px 0;
}
</style>