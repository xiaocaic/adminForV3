<template>
  <div class="headerDiv">
    <p class="logo">logo</p>
    <div class="logOut" @click="logOut">
      <el-avatar class="logOutimg" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <span>登出</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {
    logOut() {
      localStorage.removeItem('pass');
      this.$router.push('/login');
    },
  },
};
</script>
<style lang="scss">
.headerDiv {
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  font-size: 16px;
  background: aliceblue;
  .logo {
    width: 12vw;
    text-align: center;
    font-size: 18px;
    float: left;
  }
  .logOut {
    cursor: pointer;
    float: right;
    display: flex;
    margin-right: 15px;
    .logOutimg {
      width: 40px;
      margin-top: 5px;
    }
  }
}
</style>
