/* 登录 */
<template>
  <div class="login">
    <h2>欢迎登录</h2>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            phone: '',//手机号
            password: '',//密码
            
        }
    },
    methods:{
        Login(){
          let res=  this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})//调用vuex里的登录方法
          if(res.data.code==200){//登录成功
            this.$store.commit('updateisLogin',true)
            this.$router.push('/user')//跳转
          }else{
            alert('error')
            this.password = ''
          }
        }/* 登录方法 */

    }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2709c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff9472,
    #f2709c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff9472,
    #f2709c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  h2 {
    margin-top: 1rem;
    font-size: 1rem;
    color: black;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn {
      width: 2rem;
      height: 0.6rem;
    }
  }
}
</style>