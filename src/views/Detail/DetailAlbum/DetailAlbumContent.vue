<template>
  <div class="detail-album">
    <h3>我是专辑详情页</h3>
  </div>
</template>

<script>
import {getAlbumDetail} from "network/Album";


export default {
  name: "DetailAblumContent",
  data(){
    return{
      //存放专辑信息
     albumInfo:null,
    }
  },
  components:{

  },
  created(){
    //接收专辑id
    let id = this.$route.query.id;
    //获取专辑详细信息
    getAlbumDetail(id).then(res=>{
      this.albumInfo = res ;
    }).catch(err=>{})
  }
}
</script>

<style scoped>

</style>