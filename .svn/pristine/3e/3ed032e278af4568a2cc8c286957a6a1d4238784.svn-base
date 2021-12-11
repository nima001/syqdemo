import request from '@/framework/utils/request'

// 模板相关 - 根据分组查询模板
export function queryByGroupby(data){
    return request({
        url:'/idm/v2/am/msgtemplate/queryByGroupby',
        method:'post',
        data
    })
}

// 模板相关 - 根据模板id获取模板
export function getMsgtemplate(id) {
    return request({
        url: '/idm/v2/am/msgtemplate/' + id,
        method: 'get'
    });
}

export function resetPwdMsgContent(data) {
    return request({
        url:'/idm/v2/am/msgtemplate/resetPwdMsgContent',
        method:'post',
        data
    });
}