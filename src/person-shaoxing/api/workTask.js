

import request from '@/framework/utils/request'
/*
**---------------- 工作任务相关接口 ----------------
*/
//查询我需要办理的任务
export function queryWorkTask(data) {
    return request({
        url: '/person/sx/worktask/listdealtask',
        method: 'post',
        data
    })
}
//查询我关注的任务
export function queryConcernTask(data) {
  return request({
      url: '/person/sx/worktask/listattentiontask',
      method: 'post',
      data
  })
}
//查看任务详情
export function worktaskdetails(data) {
    return request({
        url: '/person/sx/worktask/worktaskdetails',
        method: 'get',
        params: {
            ...data
        }
    })
}
//添加补充任务
export function addtask(data) {
    return request({
        url: '/person/sx/worktask/addtask',
        method: 'post',
        data
    })
}
//任务撤销 
export function canceltask(taskid) {
    return request({
        url: `/person/sx/worktask/cancel?taskid=${taskid}`,
        method: 'put',
    })
}
//催一催
export function sendmsg(data) {
    return request({
        url: '/person/sx/worktask/sendmsg',
        method: 'get',
        params: {
            ...data
        }
    })
}
//添加日志
export function addlogs(data) {
    return request({
        url: '/person/sx/worktask/addlogs',
        method: 'post',
        data
    })
}
//任务置顶
export function toped(data) {
    return request({
        url: `/person/sx/worktask/toped?taskid=${data.taskid}&type=${data.type}`,
        method: 'put',
    })
}
//转发
export function forward(data, isfollow) {
    return request({
        url: `/person/sx/worktask/forward?isfollow=${isfollow.isfollow}`,
        method: 'post',
        data
    })
}
//标记或者归档
export function markfinish(taskid,type) {
    return request({
        url: `/person/sx/worktask/markfinish?taskid=${taskid}&type=${type}`,
        method: 'put',
    })
}
//获取所有可办理任务的机构
export function listorg() {
    return request({
        url: '/person/sx/worktask/listorg',
        method: 'get',
    })
}
//添加协办人
export function addassist(data) {
    return request({
        url: '/person/sx/worktask/addassist',
        method: 'post',
        data
    })
}
//发布任务
export function save(data) {
    return request({
        url: '/person/sx/worktask/save',
        method: 'post',
        data
    })
}
//查询各个机构正在进行中的任务
export function countbyorg(tasktype) {
    return request({
        url: `/person/sx/worktask/countbyorg?tasktype=${tasktype}`,
        method: 'get',
    })
}
// 获取协办人
export function listassisters(id) {
    return request({
        url: `/person/sx/worktask/listassisters?taskid=${id}`,
        method: 'get',
    })
}