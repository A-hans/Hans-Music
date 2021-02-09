const getters ={
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
  },
  userId(state){
    return state.userId;
  }
}

export default getters