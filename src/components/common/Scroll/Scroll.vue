<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    //动态接收better-scroll参数
     probeType :{
       type:Number,
       default: 0
     },
     pullUpLoad:{
       type:Boolean,
       default: false
     }
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    //返回指定位置,对scroll做一层判断，防止网络请求不稳定而拿不到scroll对象报错
    ScrollTo(x, y, time ) {
      this.scroll&&this.scroll.scrollTo(x, y, time);
    },
    //是否可以多次加载
    FinishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
    //每加载一张图片执行一次refresh对scrollerHight进行重新计算，解决不懂拖动的问题
    Refresh(){
      this.scroll&&this.scroll.refresh()
    },
    getScrollY(){
      //判断Y的值，有值的话返回scroll.y，没值的话返回0
      return this.scroll ? this.scroll.y : 0
    },
    //定位歌词
    ScrollToElement(num,time){
      this.scroll&&this.scroll.scrollToElement(num,time)
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, //0，1不监听滚动，2监听滚动，但不监听惯性滚动，3监听所用滚动
      pullUpLoad: this.pullUpLoad, //滚动结束后是否进行处理
      click: true, //是否可以点击事件
    })
  //监听滚动
    if(this.probeType===2||this.probeType===3){
     this.scroll.on("scroll", (postion) => {
       this.$emit('scroll',postion)
    })
  }
  //上拉加载更多
    if(this.pullUpLoad===true){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
 } 
};

</script>

<style scoped>

</style>
