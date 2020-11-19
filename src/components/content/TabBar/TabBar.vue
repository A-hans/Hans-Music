<template>
  <div class="tab-bar">
    <el-row type="flex" align="middle" justify="center">
      <el-col :span="4">
        <div class="left" @click="backHome">
          <img src="~assets/img/music.svg" alt="" />
          <span>HansMusic</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="center">
          <ul>
            <li
              v-for="(item, index) in linkList"
              :key="index"
              class="tab-item"
              @click="itemClick(index)"
            >
              <router-link
                :to="item.link"
                :class="{ active: index == currentIndex }"
                >{{ item.title }}</router-link
              >
            </li>
            <div class="line" ref="line" v-show="isShow"></div>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="right">
          <div class="search">
            <i class="el-icon-search"></i>
          </div>
          <div class="login">登录</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "tab-bar",
  data() {
    return {
      linkList: [
        {
          link: "/home",
          title: "发现音乐",
        },
        {
          link: "/rank",
          title: "排行榜",
        },
        {
          link: "/playlist",
          title: "歌单",
        },
        {
          link: "/singer",
          title: "歌手",
        },
      ],
      currentIndex: 0,
      currentRoute: null,
      isShow: true,
    };
  },
  methods: {
    //实现选项卡滚动切换
    itemClick(index) {
      this.currentIndex = index;
      //通过ref获取元素,起到定位过
      let oDiv = this.$refs.line;
      switch (index) {
        case 0:
          this.isShow = true;
          oDiv.style.width = "70px";
          oDiv.style.left = "8px";
          break;
        case 1:
          this.isShow = true;
          oDiv.style.width = "55px";
          oDiv.style.left = "94px";
          break;
        case 2:
          this.isShow = true;
          oDiv.style.width = "35px";
          oDiv.style.left = "169px";
          break;
        case 3:
          this.isShow = true;
          oDiv.style.width = "35px";
          oDiv.style.left = "228px";
          break;
        default:
          this.isShow = true;
          oDiv.style.width = "70px";
          oDiv.style.left = "8px";
          break;
      }
    },
    //回到首页
    backHome() {
      this.$router.push("home");
      let oDiv = this.$refs.line;
      oDiv.style.width = "70px";
      oDiv.style.left = "8px";
      setTimeout(() => {
        this.currentIndex = 0;
      }, 0.3);
    },
  },
  mounted() {
    //获取当前路由路径,$route在刷新页面后获取不了
    this.currentRoute = window.location.href;
    let oDiv = this.$refs.line;
    //根据当前路由的名字判断导航的激活状态
    if (this.currentRoute.indexOf("/home") !== -1) {
      this.currentIndex = 0;
      oDiv.style.width = "70px";
      oDiv.style.left = "8px";
    } else if (this.currentRoute.indexOf("/rank") !== -1) {
      this.currentIndex = 1;
      oDiv.style.width = "55px";
      oDiv.style.left = "94px";
    } else if (this.currentRoute.indexOf("/playlist") !== -1) {
      this.currentIndex = 2;
      oDiv.style.width = "35px";
      oDiv.style.left = "169px";
    } else if (this.currentRoute.indexOf("/singer") !== -1) {
      this.currentIndex = 3;
      oDiv.style.width = "35px";
      oDiv.style.left = "228px";
    }
    //详情页刷新后依旧不选中导航
    if (
      this.currentRoute.indexOf("/playlist-detail") !== -1 ||
      this.currentRoute.indexOf("/singer-detail") !== -1 ||
      this.currentRoute.indexOf("/ablum-detail") !== -1 
    ) {
      this.currentIndex = null;
      this.isShow = false;
    }
    //跳转到详细页面取消激活样式
    this.$bus.$on("cancelActive", () => {
      this.currentIndex = null;
      this.isShow = false;
    });
  },
};
</script>

<style scoped>
.tab-bar {
  height: 60px;
  width: 1020px;
}
.el-row {
  margin-top: 10px;
  line-height: 40px;
}
.el-col {
  height: 40px;
  font-size: 14px;
}
.left {
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  font-family: "Helvetica Neue";
}
.left span:hover {
  color: var(--color-high-text);
}
.left img {
  width: 30px;
  height: 30px;
  margin-right: 12px;
  vertical-align: middle;
}
.center ul {
  position: relative;
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
}
.center li a {
  margin: 0 15px;
  display: block;
}
.center a:hover {
  color: var(--color-high-text);
}
.right {
  display: flex;
  width: 100%;
  padding: 0 10px;
}
.right .search {
  flex: 2;
  text-align: right;
  padding-right: 15px;
  height: 30px;
}
.right .login {
  flex: 1;
  margin-top: 5px;
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border-left: 1px solid var(--color-border);
}
.right .login:hover {
  color: var(--color-high-text);
}

.center .active {
  color: var(--color-high-text);
}

.center .line {
  position: absolute;
  left: 8px;
  bottom: 0;
  height: 3px;
  width: 70px;
  background: var(--color-high-text);
  transition: all 0.3s ease;
}
.center .tab-item:nth-child(1):hover ~ .line {
  width: 70px !important;
  left: 8px !important;
}
.center .tab-item:nth-child(2):hover ~ .line {
  width: 55px !important;
  left: 94px !important;
}
.center .tab-item:nth-child(3):hover ~ .line {
  width: 35px !important;
  left: 169px !important;
}
.center .tab-item:nth-child(4):hover ~ .line {
  width: 35px !important;
  left: 228px !important;
}
@media only screen and (max-width: 700px) {
  .center .line {
    display: none;
  }
  .center .active {
    color: var(--color-high-text);
    border-bottom: 3.5px solid var(--color-high-text);
  }
}
</style>