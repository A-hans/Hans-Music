<template>
  <el-autocomplete
    popper-class="my-autocomplete"
    size="mini"
    v-model="state"
    value-key="first"
    :debounce="300"
    :fetch-suggestions="querySearch"
    placeholder="搜索歌曲/歌手/歌单/专辑"
    @select="handleSelect"
    @keyup.enter.native="handleIconClick"
  >
    <i class="el-icon-search" slot="suffix" @click="handleIconClick"> </i>
    <template slot-scope="{ item }">
      <div class="name">{{ item.first }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
import { getHotSearch} from "network/Search";
export default {
  data() {
    return {
      hotSerachList: [],//存放热门搜索
      state: "",//存放input的值
    };
  },
  watch:{
  },
  methods: {
    querySearch(queryString, cb) {
      let SearchLists = this.hotSerachList;
      //列表中是否有相同的字符串
      let results = queryString
        ? SearchLists.filter(this.createFilter(queryString))
        : SearchLists;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (SearchList) => {
        return (
          SearchList.first.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect() {
      //点击热门结果跳转至详情页
      this.$router.push({
        path: "/search-result",
        query: {
          str: this.state,
        },
      });
      //只在搜索页面中进行路由更新
    
      this.$bus.$emit("cancelActive");
    },
    handleIconClick() {
      if (this.state.length !== 0) {
        this.$router.push({
          path: "/search-result",
          query: {
            str: this.state,
          },
        });
        this.$bus.$emit("cancelActive");
      }
    }
  },
  mounted() {
    //获取热门搜所结果
    getHotSearch()
      .then((res) => {
        this.hotSerachList = res.result.hots;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.el-icon-search {
  cursor: pointer;
}
</style>





















