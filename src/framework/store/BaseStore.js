import config from './modules/config'
import session from './modules/session'
import dict from './modules/dict'
import permit from './modules/permit'
import menu from './modules/menu'
import message from './modules/message'
import Bus from '@/framework/utils/EventBus'

Bus.$on('beforeLogout', () => {
  let data = window.localStorage.getItem('saveData');
  if(data){
    data = JSON.parse(data);
    for(let name in data){
      let state = data[name];
      if(!state.persiste){
        data[name] = undefined;
      }
    }
    window.localStorage.setItem('saveData', JSON.stringify(data));
  }
})

export default {config, session, menu, dict, message, permit}//FIXME permit 需放到最后，不然会加载权限数据后不会触发页面更新（未找到根本原因）