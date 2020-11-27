import Vue from 'vue';
import VueRouter from 'vue-router';

//解决重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home = () => import('views/Home/Home.vue');
const Rank = () => import('views/Rank/Rank.vue');
const Playlist = () => import('views//Playlist/Playlist.vue');
const Singer = () => import('views/Singer/Singer.vue');
const DetailPlaylist =()=> import ('views/Detail/DetailPlaylist/DetailPlaylist.vue');
const DetailSinger =()=> import ('views/Detail/DetailSinger/DetailSinger.vue');
const DetailAlbumContent =()=> import ('views/Detail/DetailAlbum/DetailAlbumContent.vue');
const DeatilSearch =()=> import ('views/Search/DeatilSearch.vue');
const DetailProfile =()=> import ('views/Detail/DetailProfile/DetailProfile');

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
      title:'歌单详情',
    }
  },
  {
    path:'/ablum-detail',
    component:DetailAlbumContent,
    meta:{
      title:'专辑详情'
    }
  },
  {
    path:'/search-result',
    component:DeatilSearch,
    meta:{
      title:'搜索详情'
    }
  },
  {
    path:'/detail-profile',
    component:DetailProfile,
    meta:{
      title:'我的'
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