<template>
  <div class="login-contanier">
    <div class="row">
      <div class="login-header clear-fix">
        <div class="longin-icon left">
          <img src="~assets/img/music.svg" alt="" />
        </div>
        <div class="logo-text left">HansMusic</div>
      </div>
      <div class="login-content">
        <el-form ref="loginForm" 
        :model="form" 
        size="mini" 
        label-width="0"
        :rules="loginRules">
          <el-form-item prop="userPhoneNum">
            <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-user-solid"
              v-model="form.userPhoneNum"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
              v-model="form.userPassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" 
            class="login-button"
            @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {getLogin} from "network/Login"
export default {
  name:"Login",
  data(){
    return{
      //表单数据绑定对象
      form:{
        userPhoneNum:"",
        userPassword:""
      },
      //表当验证规则
      loginRules:{
        //验证手机号是否合法
        userPhoneNum:[
          {required:true,message:"请输入手机号", trigger:'blur'},
          {min:11,max:11,message:"不符合规则的手机号",trigger:'blur'}
        ],
        //密码验证规则
        userPassword:[
          {required:true,message:"请输入密码", trigger:'blur'},
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs.loginForm.validate(valid=>{
        //返回一个布尔值,符合规则为ture,不符合为false
       if(valid){
         getLogin(this.form.userPhoneNum,this.form.userPassword).then(res=>{
         if(res.code===200){
           this.$notify({
          title: '成功',
          message: '登录成功',
          type: 'success'
        });
        window.sessionStorage.setItem('token',res.token);
        console.log(res);
        window.sessionStorage.setItem('userInfo',JSON.stringify(res.profile));
        this.$emit('loginSucceed',res)
         }
         if(res.code===502){
           this.$notify.error({
          title: '错误',
          message: res.message
        });
         }
         }).catch(err=>{})
       };
      })
    }
  },
};
</script>

<style scoped>
.login-contanier .row {
  padding: 20px 20px 5px 20px;
  text-align: center;
}
.login-header {
  margin-bottom: 20px;
}
.longin-icon img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.longin-icon {
  margin-left: 14%;
}
.logo-text {
  font-size: 19px;
  padding-left: 5px;
  font-weight: bolder;
  margin-top: 1px;
}
.login-button {
  width: 90px;
  height: 30px;
  border-radius: 25px;
}
</style>