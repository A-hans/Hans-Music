<template>
  <div class="related-singer">
    <div class="title">
      <h3>相似歌手</h3>
    </div>
    <singer-list :singerData="relatedSinger.slice(0,8)"/>
  </div>
</template>

<script>
import SingerList from "components/content/SingerList/SingerList"
export default {
  name:"DetailRelatedSinger",
  props:{
    relatedSinger:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: { SingerList },
}
</script>

<style scoped>
.related-singer .title{
  font-size: 13px;
}
</style>>

</style>