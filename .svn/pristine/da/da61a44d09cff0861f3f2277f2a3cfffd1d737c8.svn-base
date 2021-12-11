import request from '@/framework/utils/request'
/************************  用户设备 *************************/

// 用户设备列表
export function userdeviceList(accountid){
  return request({
    url:`/sso/v3/userdevice/listPage?accountid=${accountid}`,
    method:'post'
  })
}

// 将指定设备下线
export function userdeviceLogout(data){
  return request({
    url:'/sso/v3/userdevice/logout',
    method:'post',
    data
  })
}

// 日志列表
export function loginoutLog(data){
  return request({
    url:`/sso/v3/loginoutlog/listPage?accountid=${data.accountid}&pagenum=${data.pagenum}&pagesize=${data.pagesize}`,
    method:'post',
  })
}