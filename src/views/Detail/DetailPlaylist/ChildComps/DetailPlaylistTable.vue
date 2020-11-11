<template>
  <div class="playlist-table">
    <el-row :gutter="20" type="flex" align="center">
      <el-col :span="24">
        <table class="list-table" width="100%">
          <th>序号</th>
          <th>歌曲</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
          <col style="width: 8%" />
          <col style="width: 40%" />
          <col style="width: 20%" />
          <col style="width: 22%" />
          <col style="width: 10%" />
          <tbody>
            <tr
              v-for="(item, index) in playlistItem"
              :key="index"
              @mouseover="showPlay(index)"
            >
              <td style="width: 50px" 
                  class="order"
              >
                <span :class="{deactive:currentIndex==index}">
                  {{ item.orderNum }}
                </span>
                <span class="play" :class="{active:currentIndex==index}">
                  <i class="el-icon-video-play"></i>
                </span>
              </td>
              <td class="song-name">{{ item.name }}</td>
              <td class="art-name">{{ item.ar[0].name }}</td>
              <td class="collection-name">{{ item.al.name }}</td>
              <td class="time">{{ item.dt | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
  name: "DetailPlaylistTable",
  props: {
    playlistItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isShow: true,
      currentIndex:null
    };
  },
  filters:{
    formatTime(value){
        let date=new Date(value)
    return formatDate(date,'mm:ss')
    }
  },
  methods: {
    //鼠标移入展示播放图标
    showPlay(index){
      this.currentIndex =index;
    }
  },
};
</script>

<style scoped>
  .playlist-table {
    padding: 20px 10px;
    font-size: 14px;
    text-align: center;
  }
  .playlist-table table,
  .playlist-table th,
  .playlist-table td {
    text-align: center;
    border-collapse: collapse;
  }
  .playlist-table table {
    table-layout: fixed;
  }
  .playlist-table td,
  .playlist-table th {
    height: 50px;
  }
  .playlist-table th {
    line-height: 50px;
    background: #f7f7f7;
  }
  .playlist-table tr:hover{
    background:rgba(128,128,128,0.2)!important;
  }
  
  .playlist-table tr:nth-child(odd) {
    /* 奇数样式更改 */
    background: rgba(255, 255, 255, 0.1);
  }
  .playlist-table tr:nth-child(even) {
    /* 偶数样式更改 */
    background: rgba(247, 247, 247, 0.8);
  }
  .playlist-table .song-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .playlist-table .art-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .playlist-table .collection-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .playlist-table .deactive{
    display: none;
  }
   .playlist-table  .play{
    display: none;
  }
   .playlist-table  .active{
     display: block;
   }
</style>