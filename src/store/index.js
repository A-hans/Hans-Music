import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    //存储播放器信息
    playlist:[],
    //当前播放歌曲
    currentSong:null
  },
  mutations:{
    addMusic(state,payload){
      state.playlist.push(payload);
      state.currentSong = payload
    }
  },
  actions:{},
  getters:{},
  modules:{}
})


export default store 