import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/Home/Home.vue');
const Rank = () => import('views/Rank/Rank.vue');
const PlayList = () => import('views//PlayList/PlayList.vue');
const Singer = () => import('views/Singer/Singer.vue');


Vue.use(VueRouter);

const routes=[
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/rank',
    component:Rank
  },
  {
    path:'/playlist',
    component:PlayList
  },
  {
    path:'/singer',
    component:Singer
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router;