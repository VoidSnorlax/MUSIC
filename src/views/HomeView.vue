/* 首页 */
<template>
  <div class="home">
    <TopNav></TopNav><!-- 头部组件 -->
    <hr
      style="
        height: 2px;
        border: none;
        border-top: 1px solid pink;
        padding-top: 7px;
      "
    />
    <SwpierTop></SwpierTop><!-- 轮播图 -->
    <iconList></iconList><!-- 图标 -->
    <hr style="height: 1px; border: none; border-top: 1px solid pink" />
    <MusicKist></MusicKist><!-- 歌单列表 -->
  </div>
</template>

<script>
import TopNav from "@/components/home/TopNav.vue";
import SwpierTop from "@/components/home/SwpierTop.vue";
import iconList from "@/components/home/iconList.vue";
import MusicKist from "@/components/home/MusicKist.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    TopNav,
    SwpierTop,
    iconList,
    MusicKist,
  },
};
</script>

<style lang="less" scoped>
.home {
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
}
</style>
