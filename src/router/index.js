import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/Home/Home.vue');
const Rank = () => import('views/Rank/Rank.vue');
const Playlist = () => import('views//Playlist/Playlist.vue');
const Singer = () => import('views/Singer/Singer.vue');
const DetailPlaylist =()=> import ('views/Detail/DetailPlaylist/DetailPlaylist.vue');
const DetailSinger =()=> import ('views/Detail/DetailSinger/DetailSinger.vue');
const DetailAlbumContent =()=> import ('views/Detail/DetailAlbum/DetailAlbumContent.vue');


Vue.use(VueRouter);

const routes=[
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:'HansMusic'
    }
  },
  {
    path:'/rank',
    component:Rank,
    meta:{
      title:'排行榜'
    }
  },
  {
    path:'/playlist',
    component:Playlist,
    meta:{
      title:'歌单'
    }
  },
  {
    path:'/singer',
    component:Singer,
    meta:{
      title:'歌手'
    }
  },
  {
    path:'/playlist-detail',
    component:DetailPlaylist,
    meta:{
      title:'歌单详情'
    }
  },
  {
    path:'/singer-detail',
    component:DetailSinger,
    meta:{
      title:'歌单详情'
    }
  },
  {
    path:'/ablum-detail',
    component:DetailAlbumContent,
    meta:{
      title:'专辑详情'
    }
  }
];
 
const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach(function(to,from,next){
  document.title=to.matched[0].meta.title;
  next();
  })



export default router;