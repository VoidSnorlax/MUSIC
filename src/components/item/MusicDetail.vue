<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" /><!-- 背景图片 -->
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="updataDetailShow">
        <!-- 点击事件返回歌单 -->
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff">{{ musicList.al.name }}</Vue3Marquee
        ><!-- 歌曲名称 -->
        <span v-for="(item, index) in musicList.ar" :key="index">
          {{ item.name
          }}<!-- 作者列表(作者可能多人) -->
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div><!-- 歌曲详情上方组件 -->
  <div class="detailCenter" v-show="!isLyricshow">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle_ab"
      :class="{ img_needle_ab_active: !isbtnshow }"
    /><!-- 如果不是暂停让磁针移动到磁盘上(img_needle_ab_active) -->
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_al"
      :class="{ img_al_pause: isbtnshow, img_al_active: !isbtnshow }"
      @click="isLyricshow = true"
    /><!-- 如果暂停关闭动画反之 -->
  </div><!-- 播放界面 -->
  <div class="musicLyric" v-show="isLyricshow" ref="musicLyric">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
      @click="isLyricshow = false"
    >
      <!-- 如果当前的时间等于歌词列表的当前时间并且小于下一句歌词的时间对当前部分高亮(active) -->
      {{ item.lrc }}
    </p><!-- 歌词 -->
  </div><!-- 歌词界面 -->
  <div class="detailFotters">
    <div class="fotterTop">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-shoucang"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-shequ"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-changge"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <div class="fotter">
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div><!-- 播放条 -->
    <div class="fotterContent">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-shuaxin"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="go(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        @click="play"
        v-if="isbtnshow"
      >
        <!-- 调用播放事件更新播放按钮 -->
        <use xlink:href="#icon-yinle2"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="go(+1)">
        <use xlink:href="#icon-diantai"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div><!-- 播放组件 -->
  </div><!--底部界面  -->
</template>

<script>
import { Vue3Marquee } from "vue3-marquee"; //引入跑马灯
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  props: ["musicList", "play", "isbtnshow", "addduration"], //接受父组件传入的值
  data() {
    return {
      isLyricshow: false, //是否显示歌词
    };
  },
  methods: {
    ...mapMutations(["updataDetailShow", "updatePlayListIndex"]), //引入vuex中的updataDetailShow方法用来回到歌曲列表取消弹出层
    go(value) {
      let index = this.playListIndex + value;//定义下标()
      if (index < 0) {
        index = this.playList.length - 2;//如果小于0就回到最后一首
      } else if (index == this.playList.length - 1) {
        index = 0;//如果大于0就回到第一首
      }
      this.updatePlayListIndex(index);//调用更新下标方法
    },/* 切换歌曲 */
  },
  components: {
    Vue3Marquee, //引入跑马灯组件
  },
  computed: {
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric() {
      let arr; //定义空数组用来接受数据
      if (this.lyricList.lyric) {
        //如果歌词存在
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          //对歌词进行拆解
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10); /* 拆解时间 */
          let lrc = item.slice(11, item.length); /* 拆解歌词 */
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill); //将时间转换为毫秒
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          } /* 判断时间是否含有] */

          return { min, sec, mill, lrc, time }; //返回成对象
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            //i === arr.length - 1是否最后一首 isNaN(arr[i + 1].time)最后一秒
            item.pre = 1000000; //定义下一秒时间
          } else {
            item.pre = arr[i + 1].time; //反之让数组的下一项的时间等于pre(pre为下一句的时间)
          }
        }); /* 遍历拆分好的数组 */
      }/* 拆解歌词 */
      return arr;
    },/* 歌词 */
  },
  watch: {
    currentTime(newvalue) {
      let p = document.querySelector("p.active");//获取p标签的属于和方法
      if (p) {
        if (p.offsetTop >= 200) {/* 如果p距离上面的距离大于200 */
          this.$refs.musicLyric.scrollTop = p.offsetTop - 200;//让musicLyric滚动距离=p.offsetTop - 200
        }
      }/* 歌词滚动 */
      if (newvalue == this.duration) {
        if (this.playListIndex == this.playListIndex.length - 1) {//如果是最后一首
          this.updatePlayListIndex(0);//将下标设置为0(从头开始)
          this.play();//播放
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }/* 歌曲播放完自动切换 */
      //console.log(" ", [p]);
    },/* 监视当前时间 */
  },
  mounted() {
    this.addduration();
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(65px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: wheat;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailCenter {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle_ab {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_ab_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  } /* 磁针移动 */
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_al {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite; /* 调用动画 10s 匀速 不停 */
  }
  .img_al_active {
    animation-play-state: running; /* 开启 */
  }
  .img_al_pause {
    animation-play-state: paused; /* 关闭 */
  }
  @keyframes rotate_ar {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } /* 选中动画 */
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
}
p {
  color: black;
  margin-bottom: 0.4rem;
}
.active {
  color: antiquewhite;
  font-size: 23px;
  text-align: center;
}
.detailFotters {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .fotterTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .fotterContent {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
}
</style>