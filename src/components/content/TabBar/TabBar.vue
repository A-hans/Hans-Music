<template>
  <div class="tab-bar">
    <el-header>
      <el-row type="flex" align="middle" justify="center">
        <el-col :span="4">
          <div class="left">
            <img src="~assets/img/music.svg" alt="" />
            <span>HansMusic</span>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="center">
            <ul>
              <li v-for='(item,index) in linkList' 
              :key='index'
              class='tab-item'
              @click='itemClick(index)'>
                <router-link 
                :to="item.link" 
                :class="{active:index==currentIndex}">{{item.title}}</router-link>
              </li>
              <div class='line' ref="line"></div>
            </ul>
            
          </div>
        </el-col>
        <el-col :span="3">
          <div class="right">
            <div class="search">
              <i class="el-icon-search"></i>
            </div>
            <div class="login">登录</div>
          </div>
        </el-col>
      </el-row>
    </el-header>
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
      currentIndex:0,
    };
  },
  methods:{
    //实现选项卡滚动切换
    itemClick (index){
      this.currentIndex = index;
      //通过ref获取元素,起到定位过
      let oDiv = this.$refs.line
      switch (index) {
        case 0:
          oDiv.style.width = '70px';
          oDiv.style.left = '8px';
          break;
        case 1:
          oDiv.style.width = '55px';
          oDiv.style.left = '94px';
          break;
        case 2:
          oDiv.style.width = '35px';
          oDiv.style.left = '169px';
          break;
        case 3:
          oDiv.style.width = '35px';
          oDiv.style.left = '228px';
          break;
        default:
          oDiv.style.width = '70px';
          oDiv.style.left = '8px';
          break;
      }
    }
  },
  mounted:{
    

  }
};
</script>

<style scoped>
.el-header {
  height: 60px;
  width: 100%;
  border: 1px solid transparent;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  background: var(--color-background);
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
  font-family: "Helvetica Neue";
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
.center li a{
  margin: 10px 15px;
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
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border-left: 1px solid var(--color-border);
}
.right .login:hover {
  color: var(--color-high-text);
}

.center .active{
  color: var(--color-high-text);
 
}

.center .line{
  position: absolute;
  left: 8px;
  bottom: 0;
  height: 3px;
  width: 70px;
  background: var(--color-high-text);
  transition: all 0.3s ease;
}
.center .tab-item:nth-child(1):hover ~ .line{
  width: 70px !important;
  left: 8px !important;
}
.center .tab-item:nth-child(2):hover ~ .line{
  width: 55px !important;
  left: 94px !important;
}
.center .tab-item:nth-child(3):hover ~ .line{
  width: 35px !important;
  left: 169px !important;
}
.center .tab-item:nth-child(4):hover ~ .line{
  width: 35px !important;
  left: 228px !important;
}

</style>