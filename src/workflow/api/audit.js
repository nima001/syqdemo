import request from '@/framework/utils/request'

//业务审批 - 待办列表
export function listtasks(type) {
    let data = {
        querytype: type,
    }
    return request({
        url: '/workflow/v1/listtasks',
        method: 'post',
        dataType: 'json',
        data
    })
}

//业务审批 - 用户流程列表
export function listdelete(id) {
    return request({
        url: '/workflow/v1/delete/' + id,
        method: 'get'
    })
}