import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/Home/Home.vue');
const Rank = () => import('views/Rank/Rank.vue');
const Playlist = () => import('views//Playlist/Playlist.vue');
const Singer = () => import('views/Singer/Singer.vue');


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