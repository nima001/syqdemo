import request from '@/framework/utils/request'
/*
**---------------- 事项办理 ----------------
*/
//事项办理-查询
export function mattersearch(data) {
    return request({
        url: '/person/sx/matterhandle/search',
        method: 'post',
        data
    })
}
//事项办理-保存
export function matterinsert(data) {
    return request({
        url: '/person/sx/matterhandle/insert',
        method: 'post',
        data
    })
}
//事项办理-删除
export function matterdel(id) {
    return request({
        url: `/person/sx/matterhandle/delete?id=${id}`,
        method: 'delete',
    })
}
//事项办理-返回最大排序号
export function matterindex(data) {
    return request({
        url: '/person/sx/matterhandle/returnMaxIndex',
        method: 'get',
        params: {
            ...data
        }
    })
}
//事项办理-编辑
export function matteredit(data) {
    return request({
        url: '/person/sx/matterhandle/update',
        method: 'post',
        data
    })
}
//获取流程目录
export function getListCatalogv1(cataLogPageQuery) {
    return request({
        url: '/workflow/v2/catalog/listpage',
        method: 'post',
        dataType: 'json',
        data: cataLogPageQuery
    })
}
//流程目录点击在线办理，获取跳转方式
export function getCodeProcess(code) {
    return request({
        url: '/workflow/v1/flowstart/codeprocess',
        method: 'get',
        params: {
            code
        }
    })
}
//流程目录点击在线办理，跳转方式为选择组织后的校验
export function chooseOrg(query) {
    return request({
        url: '/workflow/v1/flowstart/chooseorg',
        method: 'get',
        params: query
    })
}