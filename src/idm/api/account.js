import request from '@/framework/utils/request'

//用户查询
export function accountquery(data) {
    return request({
        url: '/idm/v2/am/account/query',
        method: 'post',
        dataType: 'json',
        data
    });
}
//账号信息
export function getAccount(id) {
    return request({
        url: '/idm/v2/am/account/' + id,
        method: 'get'
    });
}

//修改账号信息
export function accountUpdate(data) {
    return request({
        url: '/idm/v2/am/account/update',
        method: 'post',
        dataType: 'json',
        data
    })
}

//修改账号状态
export function changeStatus(data) {
    return request({
        url: '/idm/v2/am/account/changeStatus',
        method: 'post',
        dataType: 'json',
        data
    })
}

//自动生成随机密码
export function generatePwd(data) {
    return request({
        url: '/idm/v2/am/account/generatePwd',
        method: 'post',
        dataType: 'json',
        data
    })
}

//重置账号密码
export function resetPwd(data) {
    return request({
        url: '/idm/v2/am/account/resetPwd',
        method: 'post',
        dataType: 'json',
        data
    })
}

//注销账号
export function deleteAccount(data) {
    return request({
        url: '/idm/v2/am/account/delete',
        method: 'post',
        dataType: 'json',
        data
    })
}

export function getPersonalInfo(data){
    return request({
        url:'/idm/v2/am/account/getPersonalUserinfo',
        method:'post',
        data
    })
  }

  export function editPersonalInfo(data){
    return request({
        url:'/idm/v2/am/account/editPersonalUserinfo',
        method:'post',
        data
    })
  }

  export function getUnitInfo(data){
    return request({
        url:'/idm/v2/am/account/queryUnitinfo',
        method:'post',
        data
    })
  }

  export function editUnitInfo(data){
    return request({
        url:'/idm/v2/am/account/editUnitinfo',
        method:'post',
        data
    })
  }