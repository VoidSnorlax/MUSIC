import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import {login} from  '@/request/api/home'
export default createStore({
  state: {
    playList: [{
      al: {
        id: 17840,
        name: "鸽子",
        pic: 109951163240594770,
        picUrl: "https://p2.music.126.net/n_RPuY_H-kXBeh2SH9xoTg==/109951163240594763.jpg",
        pic_str: "109951163240594763",
      },
      id: 176049
    }],//定义默认列表
    playListIndex: 0,//默认下标
    isbtnshow: true,//暂停按钮(默认暂停)
    detailShow: false,//歌曲详情页
    lyricList: {},//歌词列表
    currentTime: 0,//当前时间
    duration:0,//总时间
    isLogin:false,//登录状态
    isfottershow:true//底部组件展示

  },//播放列表添加默认值
  getters: {
  },
  mutations: {
    updateIsbtnshow(state, value) {
      state.isbtnshow = value
    },/* 设置播放按钮 */
    updatePlayList(state, value) {
      state.playList = value
    },/* 更新歌单列表 */
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },/* 更新歌单下标 */
    updataDetailShow(state) {
      state.detailShow = !state.detailShow
    },/* 更新detailShow */
    updatelyricList(state, value) {
      state.lyricList = value
    },/* 更新歌词 */
    updatecurrentTime(state, value) {
      state.currentTime = value
    },/* 更新时间 */
    updateduration(state, value){
      state.duration = value
    },/* 歌曲时长 */
    pushplayList(state, value) {
      state.playList.push(value)
    },
    updateisLogin(state, value){
      state.isLogin = value
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)//异步发送请求 
      console.log(' ', res);//测试
      context.commit('updatelyricList', res.data.lrc)//调用mutations里的updatelyricList方法
    },/* 异步请求歌词数据并提交到updatelyricList处理 */
    getLogin:async function(context,value){
    let res=await login(value)
    console.log(' ', res)
    return res
    }/* 异步请求登录 */
  },/* 在actions中进行异步操作 */
  modules: {
  }
})
