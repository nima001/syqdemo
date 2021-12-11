import request from '@/framework/utils/request'

//新增策略
export function addStrategy(strategyVo) {
    return request({
        url: '/workflow/v1/strategy/add',
        method: 'post',
        dataType: 'json',
        data:strategyVo  
    })
}

//获取通用策略下拉列表
export function getCommonlist() {
    return request({
        url: '/workflow/v1/strategy/commonlist',
        method: 'get'
    })
}

//删除策略
export function delStrategy(id) {
    return request({
        url: '/workflow/v1/strategy/delete/' + id,
        method: 'get'
    })
}

//获取单条策略数据
export function getSingleStrategy(id){
    return request({
        url: '/workflow/v1/strategy/get/'+id,
        method: 'get'
    })
}

//策略列表
export function getStrategyList(query) {
    return request({
        url: '/workflow/v1/strategy/list',
        method: 'post',
        dataType: 'json',
        data:query   
    })
}

//修改策略
export function updateStrategy(strategyVo) {
    return request({
        url: '/workflow/v1/strategy/update',
        method: 'post',
        dataType: 'json',
        data:strategyVo  
    })
}

//通用策略和指定流程策略的下拉列表
export function getListbymodelinstanceid( modelInstanceId ) {
    return request({
        url: '/workflow/v1/strategy/listbymodelinstanceid/'+modelInstanceId,
        method: 'get'
    })
}
