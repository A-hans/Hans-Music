import Vue from "vue";
import Vuex from "vuex";
import { playMode } from "common/alias";
import getters from "./getters"
import mutations from "./mutations"

Vue.use(Vuex);
const state ={
  //存储播放列表信息
  playlist: [],
  //顺序列表信息
  sequenceList: [],
  //当前播放歌曲
  currentIndex: null,
  //播放模式(默认顺序播放)
  mode: playMode.sequence,
  //用户ID
  userId:''
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
})


export default store 