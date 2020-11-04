<template>
  <div class='tab-bar'>
    <el-header >
      <el-row type="flex" align="middle" justify="center" >
        <el-col :span="4">
          <div class='left'>
            <img src="~assets/img/music.svg" alt="">
            <span>HansMusic</span>
          </div>
          </el-col>
            <el-col :span="17">
              <div class='center'>
                <router-link to='/home' active-class='active'>发现音乐</router-link>
                <router-link to='/rank' active-class='active'>排行榜</router-link>
                <router-link to='/playlist' active-class='active'>歌单</router-link>
                <router-link to='/singer' active-class='active'>歌手</router-link>
              </div>
          </el-col>
            <el-col :span="3">
          <div class='right'>
            <div class='search'>
            <i class='el-icon-search'></i>
            </div>
            <div class='login'>
              登录
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
export default {
  name:'tab-bar'
}
</script>

<style scoped>
.el-header {
  height: 60px;
  width: 100%;
  border: 1px solid transparent;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  background:#FFFFFF;
}
.el-row{
  margin-top:10px ;
  line-height: 40px;
}
.el-col {
  height: 40px;
  font-size: 14px;
}
.left {
  padding-left: 20px ;
  font-size: 16px;
  font-weight: bold;
  font-family: "Helvetica Neue";
}
.left img{
  width: 30px;
  height: 30px;
  margin-right: 12px;
  vertical-align: middle;
}
.center a{
  margin: 10px 15px;
}
.center a:hover{
  color: #FF6347;
}
.right{
  display: flex;
  width: 100%;
  padding: 0 10px;
}
.right .search{
  flex: 2;
  text-align: right;
  padding-right: 15px;
  height: 30px;
}
.right .login{
  flex: 1;
  margin-top:5px ;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor:pointer;
  border-left : 1px solid #E1E1E1
}
.right .login:hover{
  color: #FF6347;
}
.center ul{
  padding: 0;
  margin: 0;
  list-style: none;
}
.active{
  padding-bottom:8px;
  color: #FF6347;
  border-bottom: 3px solid 	#FF6347;
}
</style>