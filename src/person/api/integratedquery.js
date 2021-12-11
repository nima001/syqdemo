import request from '@/framework/utils/request'
import { uiConfigsCookies } from '@/framework/utils/auth';
let uiConfigs = uiConfigsCookies();

//执行查询
export function query(data) {
    return request({
        url: '/person/query',
        method: 'post',
        data,
        timeout: 15000
    })
}

// 获取字段类列表
export function queryfields(data) {
    return request({
        url: '/person/query/fields',
        method: 'get',
        params: data
    })
}

// 获取我的常用查询
export function querylist(data) {
    return request({
        url: '/person/query/list',
        method: 'post',
        data
    })
}

// 根据字段获取操作符列表
export function querylistop(data) {
    return request({
        url: '/person/query/listop',
        method: 'get',
        params: data
    })
}

//保存查询
export function querysave(data) {
    return request({
        url: '/person/query/save',
        method: 'post',
        data
    })
}

// 获取查询对象列表
export function querytargets() {
    return request({
        url: '/person/query/targets',
        method: 'get'
    })
}

//删除查询
export function deletebyid(id) {
    return request({
        url: `/person/query/${id}`,
        method: 'delete',
    })
}

// 获取查询
export function getQuery(id) {
    return request({
        url: '/person/query/' + id,
        method: 'get'
    })
}

// 导出excel
export function exportExcel(data) {
    return request({
        url: '/person/query/export',
        method: 'post',
        data
    })
}

//表单提交方式 导出excel
export function formExportExcel(data) {
    var form = document.createElement("form");
    document.body.appendChild(form);
    form.method = "post";
    form.target = "";
    form.action = uiConfigs['api.url'] + '/person/query/export';
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "query";
    input.value = JSON.stringify(data);
    form.appendChild(input);
    form.submit();
    document.body.removeChild(form);
}
