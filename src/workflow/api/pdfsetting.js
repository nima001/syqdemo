import request from '@/framework/utils/request'

//获取模板列表
export function getListtemplate(id,query) {
    return request({
        url: '/workflow/v2/signconfig/listtemplate/'+id,
        method: 'get',
        params:query 
    })
}

//新增模板
export function addTemplate(pdfConfig) {
    return request({
        url: '/workflow/v2/signconfig/addtemplate',
        method: 'post',
        dataType: 'json',
        data:pdfConfig   
    })
}

//模板修改
export function updateTemplate(pdfConfig) {
    return request({
        url: '/workflow/v2/signconfig/updatetemplate',
        method: 'post',
        dataType: 'json',
        data:pdfConfig 
    })
}

//模板删除
export function delTemplate(id){
    return request({
        url:"/workflow/v2/signconfig/deltemplate/"+id,
        method:"get"
    })
}

//获取流程模板信息
export function getSingleTemplate(id){
    return request({
        url:"/workflow/v2/signconfig/gettemplate/"+id,
        method:"get"
    })
}

//模板预览
export function pdfTemplatePreview(id){
    return request({
        url:"/workflow/v2/signconfig/pdfview/"+id,
        method:"get"
    })
}

//数据绑定（书签）列表
export function getListBookMark(id){
    return request({
        url:"/workflow/v2/signconfig/listbookmark/"+id,
        method:"get"
    })
}

//模板书签设置更新（数据绑定）
export function updateBookMark(bookMarkCodeVo) {
    return request({
        url: '/workflow/v2/signconfig/updatebookmark',
        method: 'post',
        dataType: 'json',
        data:bookMarkCodeVo 
    })
}

//获取页面列表
export function getListForm(id){
    return request({
        url:"/workflow/v2/signconfig/listform/"+id,
        method:"get"
    })
}

//获取流程所有节点页面
export function getForm(modelinstanceid){
    return request({
        url:"/workflow/v2/signconfig/getform/"+modelinstanceid,
        method:"get"
    })
}

//页面修改
export function updateForm(savePositionVo) {
    return request({
        url: '/workflow/v2/signconfig/updateform',
        method: 'post',
        dataType: 'json',
        data:savePositionVo 
    })
}

//获取签章code列表
export function getSignCode(modelinstanceid){
    return request({
        url:"/workflow/v2/signconfig/getsigncode/"+modelinstanceid,
        method:"get"
    })
}

//打开定位页面
export function initPosition(savePositionVo) {
    return request({
        url: '/workflow/v2/signconfig/initposition',
        method: 'post',
        dataType: 'json',
        data:savePositionVo 
    })
}

//关键字搜索
export function findKeyWord(query) {
    return request({
        url: '/workflow/v2/signconfig/findkeyword',
        method: 'get',
        params:query 
    })
}

//关键词高亮
export function highLightWord(signPositionVo) {
    return request({
        url: '/workflow/v2/signconfig/highlight',
        method: 'post',
        dataType: 'json',
        data:signPositionVo 
    })
}

//预览
export function stampPdfPreview(signPositionVo ) {
    return request({
        url: '/workflow/v2/signconfig/preview',
        method: 'post',
        dataType: 'json',
        data:signPositionVo  
    })
}

//签章配置修改
export function updatePosition(savePositionVo  ) {
    return request({
        url: '/workflow/v2/signconfig/updateposition',
        method: 'post',
        dataType: 'json',
        data:savePositionVo   
    })
}

//获取已配置的签章列表
export function getListPosition(id){
    return request({
        url:"/workflow/v2/signconfig/listposition/"+id,
        method:"get"
    })
}

//删除配置信息（页面、签章）
export function delPosition(id){
    return request({
        url:"/workflow/v2/signconfig/delposition/"+id,
        method:"get"
    })
}