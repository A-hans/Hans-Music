<template>
  <div class="login-succeed">
    <div class="row clear-fix">
      <div class="user-avatar left">
        <el-dropdown trigger="click">
          <img :src="userInfo.avatarUrl + '?param=100y100'" alt="" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" @click.native="toProfile"
              >个人主页
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-switch-button"
              @click.native="logOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="user-name left">
        {{ userInfo.nickname }}
      </div>
    </div>
  </div>
</template>

<script>
import { userLogOut } from "network/Login";
export default {
  name: "LoginSucceed",
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    logOut() {
      userLogOut()
        .then((res) => {
          window.sessionStorage.clear();
          this.$emit("logOut");
          if (this.$route.path === "/detail-profile") {
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toProfile() {
      this.$router.push("detail-profile");
      this.$bus.$emit("cancelActive");
    },
  },
};
</script>

<style scoped>
.user-avatar {
  padding-left: 20px;
  height: 40px;
  line-height: 30px;
  cursor: pointer;
  border-left: 1px solid var(--color-border);
}
.user-avatar img {
  width: 30px;
  height: 30px;
  margin-top: 5px;
  vertical-align: middle;
  border-radius: 25px;
}
.user-name {
  margin-left: 10px;
  font-size: 15px;
  color: #606266;
  margin-top: 2px;
}
.link:hover {
  color: var(--color-high-text);
}
</style>