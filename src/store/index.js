import Vue from "vue";
import Vuex from "vuex";
import { playMode } from "common/alias";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //存储播放列表信息
    playlist: [],
    //顺序列表信息
    sequenceList: [],
    //当前播放歌曲
    currentIndex: null,
    //播放模式(默认顺序播放)
    mode: playMode.sequence
  },
  mutations: {
    SET_PLAYLIST(state, payload) {
      //引用数据类型,赋值是做引用操作,会修改原始值
      state.playlist = [].concat(payload);
    },
    SET_SEQUENCELIST(state, payload) {
      state.sequenceList = [].concat(payload);
    },
    SET_CURRENTINDEX(state, payload) {
      state.currentIndex = payload
    },
    SET_MODE(state, payload) {
      state.mode = payload
    },
    SET_DEL_PLAYLIET_ITEM(state,payload){
      const index = state.playlist.findIndex(item=>item.id===payload.delSong.id);
      state.playlist.splice(index,1);
      //若删除的不是自己
      if(payload.delSong.id !==payload.curSong.id){
        //在删除当前歌曲之前的歌曲不改变原index
        state.currentIndex = state.playlist.findIndex(item=>item.id ===payload.curSong.id);
      }
     
    }
  },
  actions: {},
  getters: {
    playlist(state){
      return state.playlist;
    },
    sequenceList(state){
      return state.sequenceList;
    },
    currentIndex(state){
      return state.currentIndex;
    },
    currentSong(state){
      return state.playlist[state.currentIndex];
    },
    mode(state){
      return state.mode;
    }
  },
  modules: {}
})


export default store 