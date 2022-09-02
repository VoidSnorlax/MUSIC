/* 播放组件 */
<template>
  <div class="FotterMusic">
    <div class="fotterLeft" @click="updataDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" /><!-- 歌曲图片 -->
      <div>
        <p>{{ playList[playListIndex].name }}</p><!-- 歌名 -->
        <span>横滑切换上下首</span>
      </div>
    </div><!-- 左侧部件 -->
    <div class="fotterRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnshow">
        <!-- 播放事件 -->
        <use xlink:href="#icon-tingge"></use>
      </svg><!-- 播放按钮 -->
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div><!-- 右侧部件 -->

    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <!-- 播放功能要拿到列表的某个具体的id然后携带id发送请求 -->
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnshow="isbtnshow"
        :addduration="addduration"
      ></MusicDetail>
      <!-- 在弹出层组件引入歌曲详情页传入各个参数 --> </van-popup
    ><!-- 引入弹出层vant组件 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0, //默认播放时间
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnshow", "detailShow"]), //引入vuex中的数据
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },/* 在挂载的时候更新歌词和时间 */
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        //判断是否暂停如果暂停
        this.$refs.audio.play(); //播放音乐
        this.updateIsbtnshow(false); //将暂停按钮改为假
        this.updateTime; //调用更新当前时间
      } else {
        this.$refs.audio.pause(); //如果播放就暂停
        this.updateIsbtnshow(true); //更改播放按钮
        clearInterval(this.interval); //清楚更新当前时间计时器
      } /* 播放功能 */
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updatecurrentTime(this.$refs.audio.currentTime); //调用vuex中的updatecurrentTime方法更新当前时间
      }, 1000); //通过计时器循环更新
    } /* 更新当前时间 */,
    addduration() {
      this.updateduration(this.$refs.audio.duration);//this.$refs.audio.duration歌曲总时长
    },/* 调用vuex中的updateduration方法传入歌曲总时间 */
    ...mapMutations([
      "updateIsbtnshow",
      "updataDetailShow",
      "updatecurrentTime",
      "updateduration",
    ]), //引入vuex中的方法
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true; //如果歌单下标变化 自动播放
      if (this.$refs.audio.paused) {
        this.updateIsbtnshow(false); //如果是暂停就调用vuex updateIsbtnshow方法将isbtnshow设置为false
      }
    } /* 如果歌单下标变化 自动播放 */,
    playList() {
      this.$refs.audio.autoplay = true;
      if (this.isbtnshow) {
        this.updateIsbtnshow(false);
      }
    },
  } /* 点击歌单的某个歌曲自动播放(通过监视属性实现) */,
  components: {
    MusicDetail, //引入组件
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);//调用vuex中的getLyric方法,并传入对应的ID
    this.addduration();
  } /* 更新组件的时候更新歌词 */,
};
</script>

<style lang="less" scoped>
.FotterMusic {
  width: 100%;
  height: 1.3rem;
  position: fixed;
  border-top: 0.02rem solid black;
  display: flex;
  padding: 0.2rem;
  background: #c6ffdd; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f7797d,
    #fbd786,
    #c6ffdd
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f7797d,
    #fbd786,
    #c6ffdd
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  justify-content: space-between;
  bottom: 0;
  .fotterLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .fotterRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>