<template>
  <router-view />
  <FotterMusic v-show="$store.state.isfottershow"></FotterMusic>
</template>

<script>
import FotterMusic from "@/components/item/FotterMusic.vue";
export default {
  components: {
    FotterMusic,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 怪异盒子防止设置外边距的时候盒子被撑开 */
}
.icon {
  width: 0.6rem;
  height: 0.6rem;
}
a {
  color: black;
}
</style>
