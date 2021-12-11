import request from '@/framework/utils/request'

/************************  组织用编计划接口 *************************/

//用编计划列表
export function listPlan(orgid) {
    return request({
        url: '/person/orgquotaplan/list',
        method: 'get',
        params: {
            orgid
        }
    });
}
//编外计划列表
export function listPlanBw(orgid) {
    return request({
        url: '/person/orgquotaplan/listbw',
        method: 'get',
        params: {
            orgid
        }
    });
}
//添加用编计划
export function addPlan(data){
    return request({
        url: '/person/orgquotaplan/add',
        method: 'post',
        dataType: 'json',
        data
    });
}
//添加编外计划
export function addPlanBw(data){
    return request({
        url: '/person/orgquotaplan/addbw',
        method: 'post',
        dataType: 'json',
        data
    });
}
// 获取组织年度用编计划历史
export function  PlanHistory(data){
    return request({
        url: '/person/orgquotaplan/history',
        method: 'post',
        dataType: 'json',
        data
    });
}
// 获取组织年度用编编外计划历史
export function PlanHistoryBw(data) {
    return request({
        url: '/person/orgquotaplan/historybw',
        method: 'post',
        dataType: 'json',
        data
    });
}
//删除计划项
export function deletePlanItem(itemid){
    return request({
        url: '/person/orgquotaplan/' + itemid,
        method: 'delete',
    });
}
// 获取组织年度用编计划
export function recyclePlan(itemid){
    return request({
        url: '/person/orgquotaplan/recycle/' + itemid,
        method: 'post',
    });
}
//回收计划数
export function listPlanPerform(itemid){
    return request({
        url: '/person/orgquotaplan/perform/list',
        method: 'get',
        params: {
            itemid
        }
    });
}
