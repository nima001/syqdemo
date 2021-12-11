import request from '@/framework/utils/request'

//搜索组织下的管理员信息
export function getManager(data) {
    return request({
        url: '/person/orgmanager/search',
        method: 'post',
        data
    });
}
//删除组织下的管理员信息
export function deleteManager(orgid, data) {
    return request({
        url: '/person/orgmanager/delete?orgid=' + orgid,
        method: 'delete',
        data
    });
}
//添加管理员
export function addManager(orgid, data) {
    return request({
        url: '/person/orgmanager/add?orgid=' + orgid,
        method: 'post',
        data
    });
}