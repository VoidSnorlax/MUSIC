<template>
  <div class="bgc">
    <div class="search">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)"><!-- 返回上一个页面 -->
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
      <input
        type="text"
        placeholder="林俊杰"
        @keydown.enter="enterkey"
        v-model="search"
      /><!-- 默认参数 -->
    </div>
    <div class="searchHistory">
      <span class="history">历史</span>
      <span
        v-for="(item, index) in keylist"
        :key="index"
        class="spankey"
        @click="searchHistory(item)"
        >{{ item }}</span
      >
      <svg class="icon" aria-hidden="true" @click="del">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updatePlayList(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
            <use xlink:href="#icon-tingge"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
        </div>
      </div>
    </div><!-- 歌曲列表 -->
  </div>
</template>

<script>
import { getSearchMusic } from "@/request/api/home.js";
export default {
  data() {
    return {
      keylist: [],//搜索记录
      search: "",//搜索关键字
      searchList: [],//歌曲
    };
  },
  mounted() {
    this.keylist = JSON.parse(localStorage.getItem("keylist"))
      ? JSON.parse(localStorage.getItem("keylist"))
      : [];/* 判断本地是否存在数据 */
  },
  methods: {
    enterkey: async function () {
      if (this.search != "") {//判断输入不能为空
        this.keylist.unshift(this.search);//将输入的值添加到数组第一位
        this.keylist = [...new Set(this.keylist)]; //去重
        if (this.keylist.length > 5) {
          this.keylist.splice(this.keylist.length - 1, 1);
        }/* 如果数组长度大于5就自动将末尾的元素删除 */
        localStorage.setItem("keylist", JSON.stringify(this.keylist));//将输入的值保存在本地
        let res = await getSearchMusic(this.search);//发起请求
        //console.log(' ', res)
        this.searchList = res.data.result.songs;//将请求来的歌曲结果放入
        this.search = "";//清空数组
      }
    },/* 搜索方法 */
    del() {
      localStorage.removeItem("keylist");//清楚本地记录
      this.keylist = [];
    },/* 清楚记录 */
    searchHistory: async function (value) {
      let res = await getSearchMusic(value);
      console.log(" ", res);
      this.searchList = res.data.result.songs;
    },/* 搜索历史方法 */
    updatePlayList(value){
        value.al=value.album//对数据进行包装
        value.al.picUrl=value.album.artist.img1v1Url
        this.$store.commit('pushplayList',value)
        this.$store.commit('updatePlayListIndex',this.$store.state.playList.length-1)
    }/* 跟新歌单 */
  },
};
</script>

<style lang="less" scoped>
.bgc {
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
  .search {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input {
      margin-left: 0.4rem;
      border: none;
      background: linear-gradient(
        to right,
        #ff9472,
        #f2709c
        
       
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      width: 95%;
      padding: 1rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0.2rem;
    position: relative;
    .history {
      font-size: 0.4rem;
      font-weight: 700;
    }
    .spankey {
      background-color: gray;
      padding: 0.1rem 0.2rem;
      border-radius: 0.4rem;
      margin: 0.1rem 0.2rem;
      display: inline-block;
    }
    .icon {
      height: 0.6rem;

      right: 10px;
      position: absolute;
    }
  }
  .itemList {
    width: 100%;
    padding: 10px;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: black;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon {
          fill: black;
        }
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>