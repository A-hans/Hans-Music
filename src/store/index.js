import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    //存储音乐播放地址
    musicInfo:null
  },
  mutations:{
    addMusic(state,payload){
      state.musicInfo = payload;
    }
  },
  actions:{},
  getters:{},
  modules:{}
})


export default store 