/**
 * 权限
 */
import store from '../../store'
import { componentAuth } from '../../api/menu'

let loader;

const  permit = {
  state: {
    permit: undefined
  },
  mutations: {
    ADD_PERMIT (state, permit) {
      let obj = {};
      (permit || []).forEach(c => {
        obj[c.uri] = c.type;
      });
      state.permit = obj;
    },
  },
  actions: {
    loadPermit (context) {
      if(!loader){
        loader = componentAuth().then(res => {
          context.commit('ADD_PERMIT', res.result)
          loader = undefined;
        }).catch(err => {
          console.log('加载权限数据异常', err)
          loader = undefined;
        })
      }
      return loader;
    }
  },
  getters: {
    hasPermit: (state) => (uri) => {
      if(state.permit){
        return state.permit[uri] !== undefined;
      }else{
        store.dispatch('loadPermit');
      }
    },
    asyncPermit: (state) => (uri) => {//异步验证
      if(state.permit){
        return Promise.resolve(state.permit[uri] !== undefined);
      }else{
        return store.dispatch('loadPermit').then(() => {
          return state.permit[uri] !== undefined;
        });
      }
    },
  }
}

export default permit
