/* 发现好歌单列表 */
<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in state.musicList" :key="index">
            <router-link :to="{path:'/itemMusic',query:{id:item.id}}"><!-- 绑定路由实现跳转到歌单列表,传递参数id -->
          <img :src="item.picUrl" alt="" />
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            {{ changeCount(item.playCount) }}</span
          >
          <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import {reactive,onMounted} from 'vue'
export default {
  setup() {
    const state = reactive({
      musicList: [],//歌单列表存放歌单数据
    });
    function changeCount(num) {
      if (num >= 100000000) {//如果播放超过1亿
        return (num / 100000000).toFixed(1) + "亿";//取小数点一位拼接亿字
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }/* 进行数据展示优化 */
    onMounted(async () => {
      let res = await getMusicList();//调用getMusicList()方法发送请求
      console.log(res);
      state.musicList = res.data.result;
    });/* 发送请求获取数据 */
    return { state, changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 6rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: whitesmoke;
        margin-top: 0.06rem;
        background: rgb(0 0 0 /40%);
        border-radius: 0.1rem;
        .icon {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>