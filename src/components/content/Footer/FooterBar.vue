<template>
  <div id='footer'>
    <div class='content'>
        <img src="~assets/img/商标.png" alt="">
        <span class='text'>Hans-Music</span>
        <span class='text'>2020</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'Footer'
}
</script>

<style scoped>
  #footer{
    height: 100%;
    text-align: center;
    line-height: 60px;
  }
  #footer img{
    width: 20px;
    height: 20px;
    vertical-align:middle;
    margin-bottom:3px ;
  }
  #footer .text{
    font-size: 18px;
    font-family: Hiragino Sans GB;
    font-weight: bold;
    padding: 0px 15px 0px 8px ;
  }
</style>