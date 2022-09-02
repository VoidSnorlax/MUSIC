/* 歌单详情(头部) */
<template>
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="" class="bgimg" /><!-- 图片 -->
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)"><!-- 回到上一页 -->
        <use xlink:href="#icon-shequ"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>
  </div><!-- 详情页头部 -->
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playList.coverImgUrl" alt="" />
      <div class="palyCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <span>{{ playList.playCount }}</span>
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ playList.name }}</p>
      <div class="right_img">
        <img :src="playList.creator.backgroundUrl" alt="" />
        <span>{{ playList.creator.nickname }}</span>
      </div>
      <p class="rightP_two">
        <span>{{ playList.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div><!-- 中间 -->
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liaotian"></use>
      </svg>
      <span>{{ playList.commentCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playList.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-quanxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div><!-- 底部 -->
</template>

<script>
import { computed, reactive } from "vue";
export default {
  setup(props) {
    console.log(" ", props);
    if ((props.playList.creator = "")) {
      props.playList.creator = JSON.parse(
        sessionStorage.getItem().playList
      ).creator;/* 将存在本地的playList取出赋值给playList.creator */
    }/* 判断深层次的对象是否为空解决刷新之后白屏问题 */
    return {};
  },
  props: {
    playList: {
      type: Object,
    },
  },
}; //接受获取的参数
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: .2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: white;
    }
    .icon {
      fill: #fff; //填充颜色
    }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
}
.itemTopContent {
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }
    .palyCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.26rem;
        color: wheat;
        background: rgb(0 0 0 /40%);
      }
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .rightP_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: #ccc;
      }
      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
.itemTopFooter {
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .icon {
      fill: #fff;
    }
    span {
      margin-top: 0.1rem;
    }
  }
}
</style>