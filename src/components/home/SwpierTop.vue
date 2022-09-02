/* 轮播图组件 */
<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="(image, index) in state.images" :key="index"><!-- 在轮播组件遍历 -->
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/request/api/home";
import { onMounted, reactive } from "vue";//使用组合式API
export default {
  setup() {
    let state = reactive({
      images: [],//定义图片列表(用来存放请求来的图片)
    });
    onMounted(async () => {
      let res = await getBanner();//调用getBanner()请求
      console.log(" ", res);
      state.images = res.data.banners;//将请求来的图片赋值给images
    });
    return { state };//抛出
  },
};
</script>

<style lang="less">
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>