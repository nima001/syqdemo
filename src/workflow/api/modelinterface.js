import request from '@/framework/utils/request'

//流程接口列表
export function getModelInterfaceList(modelInterfaceQuery ) {
    return request({
        url: '/workflow/v1/modelinterface/list',
        method: 'get',
        params:modelInterfaceQuery 
    })
}

//新增流程接口
export function addModelInterface(modelInterface) {
    return request({
        url: '/workflow/v1/modelinterface/add',
        method: 'post',
        dataType: 'json',
        data:modelInterface  
    })
}

//更新流程接口
export function updateModelInterface(modelInterface ) {
    return request({
        url: '/workflow/v1/modelinterface/update',
        method: 'post',
        dataType: 'json',
        data:modelInterface 
    })
}

//删除流程接口
export function delModelInterface(id) {
    return request({
        url: '/workflow/v1/modelinterface/delete/'+id,
        method: 'get',
    })
}

//获取一条流程接口信息
export function getSingleModelInterface(id) {
    return request({
        url: '/workflow/v1/modelinterface/get/'+id,
        method: 'get',
    })
}

//获取预设字段集合
export function getModelInterfacefields() {
    return request({
        url: '/workflow/v1/modelinterface/fields',
        method: 'get',
    })
}


//工作流API管理接口
export function getUiboxs(query) {
    return request({
        url: '/workflow/v2/workflowapi/uiboxs',
        method: 'get',
        params:query
    })
}

//传入参数字段下拉框列表
export function getParamsCode(id) {
    return request({
        url: '/workflow/v1/interfacefieids/paramscode/'+id,
        method: 'get',
    })
}

//回显字段接口列表
export function getInterfaceFieids(query) {
    return request({
        url: '/workflow/v1/interfacefieids/get',
        method: 'get',
        params:query
    })
}

//保存字段列表
export function saveInterfaceFieids(modelInterface) {
    return request({
        url: '/workflow/v1/interfacefieids/save',
        method: 'post',
        dataType: 'json',
        data:modelInterface  
    })
}

//系统字段下拉框列表
export function getSystemCode(id) {
    return request({
        url: '/workflow/v1/interfacefieids/systemcode/'+id,
        method: 'get',
    })
}