/**
 * 公式编辑
 */
export default {
  state: {
    scopeData:[],
  },
  mutations: {
    // 模板编译器 作用域数据
    SET_SCOPE_DATA(state,payload){
      state.scopeData = payload.data
    },
  },
  getters: { }
}
