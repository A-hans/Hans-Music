<template>
  <div class="detail-profile">
    <el-row>
      <el-col :span="24" class="banner-container">
        <div
          class="banner"
          :style="{
            background:
              'url(' + require('assets/img/banner.jpg') + ')0px -2px/108%',
          }"
        ></div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content">
      <el-col :span="6">
        <div class="userinfo">
          <div
            class="user-background"
            :style="{
              background:
                'url(' +
                (userInfo.backgroundUrl
                  ? userInfo.backgroundUrl + '?param=265y230'
                  : '') +
                ')no-repeat',
            }"
          ></div>
          <div class="userinfo-content">
            <div class="header">
              <div class="avatar">
                <img :src="userInfo.avatarUrl + '?param=100y100'" alt="" />
              </div>
              <div class="name">
                {{ userInfo.nickname }}
              </div>
            </div>
            <div class="userinfo-detail">
              <ul>
                <li>
                  <span>性别:</span>{{ userInfo.gender | gender }}
                  <i class="el-icon-male" v-if="userInfo.gender === 1"></i>
                  <i class="el-icon-female" v-if="userInfo.gender === 2"></i>
                </li>
                <li><span>年龄:</span>{{ userInfo.birthday | formatTime }}</li>
                <li v-if="userInfo.signature"><span>签名:</span>{{ singerNature }}</li>
              </ul>
            </div>
            <div class="activeinfo">
              <ul>
                <li>
                  <div class="active-title">动态</div>
                  <div class="text">{{ userInfo.eventCount }}</div>
                </li>
                <li>
                  <div class="active-title">关注</div>
                  <div class="text">{{ userInfo.follows }}</div>
                </li>
                <li>
                  <div class="active-title">粉丝</div>
                  <div class="text">{{ userInfo.followeds }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="recent-playlist">
          <div class="record-header clear-fix">
            <div class="title left">听歌排行</div>
            <div class="select-time right">
              <span class="week" @click="weekList" :class="{ active: weekShow }"
                >最近一周</span
              >
              <span class="all" @click="allList" :class="{ active: allShow }"
                >所有时间</span
              >
            </div>
          </div>
          <div>
            <detail-playlist-table :playlistItem="recordPlaylist" v-if="recordPlaylist.length!==0"/>
            <div class="playlist-none" v-else>
              <img src="~assets/img/占位图2.png" alt="">
              <div class="text">
              该用户暂无此听歌记录
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="playlist">
          <div class="myList">
            <div class="title">我的歌单</div>
            <song-list :playlistData="myPlaylist" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserInfo, getUserRecord, getUserPlaylist } from "network/Login";
import { formatDate } from "common/utils";
import DetailPlaylistTable from "components/content/PlaylistTable/DetailPlaylistTable";
import SongList from "views/Detail/DetailUser/ChildComps/SongList";
export default {
  name: "DetailUser",
  data() {
    return {
      //用户信息
      userInfo: {},
      //播放记录列表
      recordPlaylist: [],
      //我的歌单列表
      myPlaylist: [],
      //用户id
      uid: 0,
      //一周显示
      weekShow: true,
      //所有歌曲显示
      allShow: false,
    };
  },
  computed: {
    singerNature() {
      return this.userInfo ? this.userInfo.signature : "";
    },
  },
  methods: {
    weekList() {
      this.weekShow = true;
      this.allShow = false;
      getUserRecord(this.uid, 1)
        .then((res) => {
          this.recordPlaylist = [];
          let i = 0;
          for (let item of res.weekData) {
            ++i;
            item.song.orderNum = i;
            this.recordPlaylist.push(item.song);
          }
        })
        .catch((err) => {});
    },
    allList() {
      this.allShow = true;
      this.weekShow = false;
      getUserRecord(this.uid, 0)
        .then((res) => {
          if(res.code===200){
             this.recordPlaylist = [];
          let i = 0;
          for (let item of res.allData) {
            ++i;
            item.song.orderNum = i;
            this.recordPlaylist.push(item.song);
          }
          }
        })
        .catch((err) => {});
    },
  },
  filters: {
    gender(value) {
      if (value === 1) {
        return "男";
      } else if (value === 2) {
        return "女";
      } else {
        return "保密";
      }
    },
    formatTime(value) {
      const date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  components: {
    DetailPlaylistTable,
    SongList,
  },
  created() {
    //获取用户信
     this.uid = this.$route.query.id
      getUserInfo(this.uid).then(res=>{
        this.userInfo = res.profile;
      }).catch(err=>{
      })
      getUserRecord(this.uid, 1)
        .then((res) => {
          if(res.code===200){
             let i = 0;
          for (let item of res.weekData) {
            ++i;
            item.song.orderNum = i;
            this.recordPlaylist.push(item.song);
          }
          }
         
        })
        .catch((err) => {
          console.log(err);
        });
      getUserPlaylist(this.uid)
        .then((res) => {
          this.myPlaylist = res.playlist;
        })
        .catch((err) => {});
  },
};
</script>

<style scoped>
.content {
  margin-top: 230px;
}
.userinfo {
  background: var(--color-background);
  border-radius: 4px;
  margin-top: -80px;
}
.banner-container{
  width: 100%;
  background: #fff;
  position: fixed;
  top: 60px;
  left: 0;
}
.banner {
  width: 1200px;
  height: 230px;
  margin: 0 auto;

}
.user-background {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 100%;
  height: 120px;
}
.userinfo-content {
  position: relative;
  padding: 10px 20px;
}
.userinfo-content .avatar {
  position: absolute;
  top: -34px;
  left: 10px;
}
.userinfo-content .avatar img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
}
.userinfo-content .name {
  font-size: 16px;
  font-weight: bold;
  color: #606266;
  margin-left: 60px;
}
.userinfo ul {
  margin-top: 10px;
  list-style: none;
}
.userinfo-detail {
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}
.userinfo-detail li {
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
}
.userinfo-detail li span {
  margin-right: 5px;
  color: #303133;
  font-weight: bold;
}
.activeinfo ul {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.activeinfo ul li {
  flex: 1;
  color: #606266;
  text-align: center;
}
.active-title {
  font-size: 14px;
  margin-bottom: 10px;
}
.text {
  font-size: 13px;
}
.recent-playlist {
  background: var(--color-background);
  padding: 20px 15px;
  border-radius: 6px;
}
.select-time span {
  font-size: 13px;
  padding: 0 3px;
  cursor: pointer;
}
.select-time span:hover {
  color: var(--color-high-text);
}
.myList {
  background: var(--color-background);
  padding: 20px 15px;
  border-radius: 6px;
}
.active {
  color: var(--color-high-text);
}
.playlist-none{
  height: 500px;
  text-align: center;
  
}
.playlist-none img{
  margin-top: calc(50% - 71.25px);
}
.playlist-none .text{
  margin-top:20px ;
} 
</style>