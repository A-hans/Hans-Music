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
      state.playlist = payload
    },
    SET_SEQUENCELIST(state, payload) {
      state.sequenceList = payload
    },
    SET_CURRENTINDEX(state, payload) {
      state.currentIndex = payload
    },
    SET_MODE(state, payload) {
      state.mode = payload
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