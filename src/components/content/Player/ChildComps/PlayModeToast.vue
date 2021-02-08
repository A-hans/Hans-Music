<template>
  <div class="toast-contanier">
    <div class="content">
         <img src="~assets/img/shunxu.png" alt="" v-if="mode===0"> 
         <img src="~assets/img/suiji.png" alt=""  v-if="mode===2">
        <img src="~assets/img/danqu.png" alt=""  v-if="mode===1">
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
name:"PlayModeToast",
computed:{
  ...mapGetters(['mode']),
},
mounted(){
  console.log(this.mode);
}
}
</script>

<style scoped>
.toast-contanier {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: rgba(105,105,105, 0.8);
}
.toast-contanier .content {
  width: 80px;
  height: 70px;
}
.toast-contanier .content img{
  width: 100%;
  height: 100%;
}
</style>