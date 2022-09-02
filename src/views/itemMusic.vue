/* 歌曲详情列表 */
<template>
  <itemMusic :playList="state.playList"></itemMusic><!-- 歌单信息将歌单信息传入给组件 -->
  <itemMusicList :itemList='state.itemList' :subscribedCount="state.playList.subscribedCount"></itemMusicList>
  <!-- 歌曲列表 -->
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getItem, getMusicList } from "@/request/api/item.js";
import itemMusic from "@/components/item/itemMusic.vue";
import itemMusicList from "@/components/item/MusicList.vue";
export default {
  setup() {
    const state = reactive({
      playList: {},//歌单信息
      itemList:[]//播放列表
    });
    onMounted(async () => {
      let id = useRoute().query.id;//在路由中取到id
      let res = await getItem(id);//调用getItem()将id作为参数传递
      let musicList = await getMusicList(id);//调用getMusicList(id)
      console.log(" ", musicList);//测试结果
      state.playList = res.data.playlist;//将获取的数据存放在歌单列表
      state.itemList = musicList.data.songs;//将获取的数据存放在播放列表
      sessionStorage.setItem("itemList", JSON.stringify(state));//防止页面刷新数据丢失，将数据保存在sessionStorage
    });
    return { state };
  },
  components: {
    itemMusic,
    itemMusicList,
  },
};
</script>

<style>
</style> 