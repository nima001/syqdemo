import axios from "axios";

//  全局设置
axios.defaults.timeout = 10000  //  时间超时设置10s
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//  创建一个axios实例
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

//  request拦截器，每次发送请求的时候拦截下来
instance.interceptors.request.use(
  config => {
    //  每次请求时，检查 vuex 中是否有token，如果有放在headers
    // if(store.state.user.token){
    //     config.headers.Authorization = store.state.user.token
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

//  response拦截器
instance.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.code == 0) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  err => {
    let { response } = err
    if( response != null ){
        if(response.status == 401) {
            let msg = response.data || '请重新登陆'
            alert(msg)
            // //  清除token
            // store.commit('remove')
            // //  跳转到登陆页面
            // router.replace({
            //     path: '/',
            //     //  添加一个重定向后缀
            //     query: { redirect: router.currentRoute.fullPath }
            // })
            return Promise.reject(err.response)
        }
    }else{
        console.log(err)
    }
  }
)

export default instance;