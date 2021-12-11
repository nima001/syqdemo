import request from '@/framework/utils/request'

//办理页
export function getFormcfg(query) {
    return request({
        url: '/workflow/v1/monitor/getformurl',
        method: 'get',
        params: query
    })
}

//各种状态的流程数量
export function getProcessNum() {
    return request({
        url: '/workflow/v1/monitor/getprocessnum',
        method: 'get'
    })
}

//所有发起的流程实例
export function getListBusinessInstance(pageQurery) {
    return request({
        url: '/workflow/v1/monitor/listbusinessinstance',
        method: 'post',
        dataType: 'json',
        data: pageQurery
    })
}

//获取当前节点任务
export function getListTask(instanceId) {
    return request({
        url: '/workflow/v1/monitor/listtask',
        method: 'get',
        params: instanceId
    })
}

//根据状态，获取所有主项集合，如果不传status，默认查全部
export function getListmain(status) {
    return request({
        url: '/workflow/v1/monitor/listmain',
        method: 'get',
        params: status
    })
}

//取消签收
export function unClaim(taskId) {
    return request({
        url: '/workflow/v1/monitor/unclaim',
        method: 'get',
        params: taskId
    })
}

//流程撤销
export function listdelete(id) {
    return request({
        url: '/workflow/v1/monitor/delete/' + id,
        method: 'get'
    })
}

 //统计图百分比
export function getPercent() {
    return request({
        url: '/workflow/v1/monitor/percent',
        method: 'get'
    })
}

//获取当前流程异常信息
export function getDealexception(businessinstanceid) {
    return request({
        url: '/workflow/v1/monitor/dealexception',
        method: 'get',
        params:businessinstanceid
    })
}

//重新入库
export function handle(query) {
    return request({
        url: '/workflow/v1/monitor/handle',
        method: 'get',
        params:query
    })
}

//pdf重新生成
export function remedy(query) {
    return request({
        url: '/workflow/v1/monitor/pdfcfg/remedy',
        method: 'get',
        params:query
    })
}

//消息重发
export function sendmsg(query) {
    return request({
        url: '/workflow/v1/monitor/sendmsg',
        method: 'get',
        params:query
    })
}
