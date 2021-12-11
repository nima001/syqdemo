/**
 * 消息提醒
 */
import store from '../../store'
import { msgcount } from '../../api/message'

let loopTimer = 0;
const interval = 1 * 60000;//暂定1分钟轮询间隔

export default {
  state: {
    notification: {
      totalnum: 0,//未读消息总数
      oamsgnum: 0,//待办消息总数
      count: 0,//新消息数
      lasttime: undefined,//最后一条消息时间毫秒数
      updatetime: undefined, //更新时间
    },
  },
  mutations: {
    updateNotification(state, n) {
      let { lasttime, totalnum, oamsgnum} = state.notification;
      //有新消息或者未读/待办消息数有变更更新通知
      if(!lasttime || lasttime <= n.lasttime) {
        n.updatetime = new Date().getTime();
        state.notification = n;
      }else{
        console.log('更新消息通知失败：消息版本小于当前版本');
      }
    },
  },
  actions: {
    loopMessage({state, commit, dispatch}) {
      if(loopTimer > 0){
        clearTimeout(loopTimer);
      }
      let {lasttime, updatetime} = state.notification;
      if(updatetime && new Date().getTime() - updatetime < interval){//上次更新时间间隔
        loopTimer = setTimeout(() => {
          dispatch('loopMessage');
        }, interval)
      }else{
        loopTimer = -1;//设置-1 标记looper准备开启
        msgcount(lasttime).then(({result}) => {
          commit('updateNotification', result)
          loopTimer = setTimeout(() => {
            dispatch('loopMessage');
          }, interval)
        }).catch(err => {
          loopTimer = 0;
          console.log('加载消息未读数异常', err)
          //TODO sunwen 判断错误类型，部分错误仍可继续轮询
        })
      }
    }
  },
  getters: {
    notification: (state) => {
      if(!loopTimer){
        store.dispatch('loopMessage');
      }
      return state.notification
    },
  }
}
