import request from '@/framework/utils/request'
/************************  调入或兼职流程 *************************/

// 创建待办流程 - 获取短信发送模板
export function msgcontent(data){
  return request({
    url:'/idm/v2/userevent/msgcontent',
    method:'post',
    data
  })
}

// 创建调入或兼职流程
export function usereventCreate(data){
  return request({
    url:'/idm/v2/userevent/create',
    method:'post',
    data
  })
}

/************************  开设账号 *************************/

// 账号相关 - 开设账号 - 基本信息保存（步骤一）
export function createaccount(data){
  return request({
    url:'/idm/v2/am/account/createaccount',
    method:'post',
    data
  })
}