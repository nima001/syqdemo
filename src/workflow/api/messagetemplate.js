import request from '@/framework/utils/request'

//获取消息模板列表
export function getMessageList(pageQuery) {
    return request({
        url: '/workflow/v1/msgtemplate/list',
        method: 'post',
        dataType: 'json',
        data:pageQuery
    })
}

//消息模板新增
export function addMessageList(msgTemplate ) {
    return request({
        url: '/workflow/v1/msgtemplate/add',
        method: 'post',
        dataType: 'json',
        data:msgTemplate 
    })
}

//删除消息模板
export function delMessageList(id) {
    return request({
        url: '/workflow/v1/msgtemplate/delete/'+id,
        method: 'get',
    })
}

//获取一条消息模板信息
export function getSingleMessage(id) {
    return request({
        url: '/workflow/v1/msgtemplate/get/'+id,
        method: 'get',
    })
}

//消息模板修改
export function updateMessageList(msgTemplate ) {
    return request({
        url: '/workflow/v1/msgtemplate/update',
        method: 'post',
        dataType: 'json',
        data:msgTemplate 
    })
}