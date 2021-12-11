import request from '@/framework/utils/request'

//获取签章列表
export function getStampList(value) {
    return request({
        url: '/workflow/v1/listseals',
        method: 'get',
        params: {
            searchKey: value
        }
    })
}

//批量审批页面初始化
export function batchCompleteInit() {
    return request({
        url: '/workflow/v2/batchcompleteinit',
        method: 'get',
    })
}

//选择具体签章
export function getStampInfo(id) {
    return request({
        url: '/workflow/v2/seal/get/'+id,
        method: 'get'
    })
}

//新增签章
export function addStamp(sealVo) {
    return request({
        url: '/workflow/v2/seal/add',
        method: 'post',
        dataType: 'json',
        data:sealVo   
    })
}

//给签章授权角色 （query: id、roleids:[]）
export function addStampRoles(query) {
    return request({
        url: '/workflow/v2/seal/addroles',
        method: 'post',
        dataType: 'json',
        data:query 
    })
}

//删除签章
export function delStamp(id) {
    return request({
        url: '/workflow/v2/seal/delete/' + id,
        method: 'get'
    })
}

//删除签章的某个角色
export function delStampRole(id,roleid) {
    return request({
        url: '/workflow/v2/seal/delrole',
        method: 'get',
        params:{
            id,
            roleid
        } 
    })
}

//获取签章单条数据
export function getSingleStamp(id){
    return request({
        url: '/workflow/v2/seal/get/'+id,
        method: 'get'
    })
}

//获取签章图片
export function getStampPic(name,signkey,tgsealid){
    return request({
        url: '/workflow/v2/seal/getpic',
        method: 'get',
        params:{
            name,
            signkey,
            tgsealid
        }
    })
}

//获取签章关联角色
export function getSingleRole(id){
    return request({
        url: '/workflow/v2/seal/getrole/'+id,
        method: 'get'
    })
}

//签章导入
export function importStamp(file) {
    let formdata = new FormData();
    formdata.append("file", file);
    return request({
        url: '/workflow/v2/seal/import',
        method: 'post',
        dataType: 'form-data',
        data:formdata  
    })
}

//签章列表
export function stampList(modelPageQuery) {
    return request({
        url: '/workflow/v2/seal/list',
        method: 'post',
        dataType: 'json',
        data:modelPageQuery  
    })
}

//获取用户拥有的签章列表
export function getListSeals(searchKey){
    return request({
        url: '/workflow/v2/seal/listseals',
        method: 'get',
        params:{
            searchKey
        }
    })
}

//编辑签章
export function updateStamp(sealVo) {
    return request({
        url: '/workflow/v2/seal/update',
        method: 'post',
        dataType: 'json',
        data:sealVo   
    })
}

//签章排序
export function orderStamp(query) {
    return request({
        url: '/workflow/v2/seal/order',
        method: 'get',
        params:query   
    })
}

//获取签章下拉列表
export function getUiboxs(){
    return request({
        url: '/workflow/v2/seal/uiboxs',
        method: 'get'
    })
}

//验证签章
export function verifyMobileCode(data){
    return request({
        url: '/workflow/v1/sms/verifymobilecode',
        method: 'get',
        params:data
    })
}

//下载签章
export function downSealTemplateUrl(){
    return request({
        url: '/workflow/v2/seal/downsealtemplateurl',
        method: 'get'
    })
}