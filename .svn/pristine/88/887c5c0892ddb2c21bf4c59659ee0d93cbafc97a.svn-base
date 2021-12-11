import request from '@/framework/utils/request'
/************************  重置密码接口 *************************/

// 账号相关 - 重置密码-账号确认（步骤一)
export function resetpwdFinduser(data){
  return request({
    url:'/idm/v2/account/resetpwdFinduser',
    method:'post',
    data
  })
}

// 账号相关 - 重置密码-发送验证码（步骤二）
export function resetpwdSendcode(data){
  return request({
    url:'/idm/v2/account/resetpwdSendcode',
    method:'post',
    data
  })
}

// 账号相关 - 重置密码-校验验证码（步骤二,可多次校验,不进入下一步）
export function resetpwdCheckcode(data){
  return request({
    url:'/idm/v2/account/resetpwdCheckcode',
    method:'post',
    data
  })
}

// 账号相关 - 重置密码-校验验证码（步骤二,成功进入下一步）
export function resetpwdValicode(data){
  return request({
    url:'/idm/v2/account/resetpwdValicode',
    method:'post',
    data
  })
}

// 账号相关 - 重置密码-保存密码（步骤三）
export function resetpwdSave(data){
  return request({
    url:'/idm/v2/account/resetpwdSave',
    method:'post',
    data
  })
}

// 账号相关 - 重置密码-免登（步骤四）
export function resetpwdLogin(data){
  return request({
    url:'/idm/v2/account/resetpwdLogin',
    method:'post',
    data
  })
}