import request from '@/framework/utils/request'

//上架、下架
export function changeStatus(id) {
    return request({
        url: '/workflow/v1/catalog/status/' + id,
        method: 'get',
    })
}

//删除流程目录
export function deleteCatalog(id) {
    return request({
        url: '/workflow/v1/catalog/delete/' + id,
        method: 'get',
    })
}

//获取流程说明材料
export function getListMaterial(id) {
    return request({
        url: '/workflow/v1/catalog/listmaterial/' + id,
        method: 'get',
    })
}

//保存流程说明材料
export function saveMaterial(modelMaterialVo) {
    return request({
        url: '/workflow/v1/catalog/savematerial',
        method: 'post',
        dataType: 'json',
        data: modelMaterialVo
    })
}

//流程发起选择页
export function getStart(catalogid, foronline) {
    return request({
        url: '/workflow/v1/catalog/start',
        method: 'get',
        params: {
            catalogid,
            foronline
        }
    })
}

//流程发起入口，无组织id
export function getV2Start(catalogid, foronline) {
    return request({
        url: '/workflow/v2/catalog/start',
        method: 'get',
        params: {
            catalogid,
            foronline
        }
    })
}

//流程发起入口，有组织id
export function getOrgStart(catalogid, foronline, orgid) {
    return request({
        url: '/workflow/v2/catalog/startorg',
        method: 'get',
        params: {
            catalogid,
            foronline,
            orgid
        }
    })
}

//编办个性化v2
//获取流程目录、查询流程目录
export function getListCatalogv2(query) {
    let data = query;
    data.needtotal = true;
    return request({
        url: '/workflow/v2/catalog/listcatalog',
        method: 'post',
        dataType: 'json',
        data
    })
}

//发起页面，点击流程获取子流程（编办个性化）
export function getNextCatalog(catalogid) {
    return request({
        url: '/workflow/v2/catalog/nextcatalog/' + catalogid,
        method: 'get'
    })
}

//添加流程目录(编办个性化)
export function addCatalogV2(info) {
    let data = info;
    return request({
        url: '/workflow/v2/catalog/add',
        method: 'post',
        dataType: 'json',
        data
    })
}

//获取流程目录信息(编办个性化)
export function getCatalogInfoV2(id) {
    return request({
        url: '/workflow/v2/catalog/get/' + id,
        method: 'get',
    })
}

//V1版本的发起流程开始
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
//V1版本的发起流程结束

//获取流程目录
export function getListMainPage(cataLogPageQuery) {
    return request({
        url: '/workflow/v2/catalog/listmainpage',
        method: 'post',
        dataType: 'json',
        data: cataLogPageQuery
    })
}

//获取目录同一层级下拉列表
export function getUiboxs(id) {
    return request({
        url: '/workflow/v2/catalog/uiboxs/' + id,
        method: 'get'
    })
}

//目录排序,备注：id为当前被操作签章id；type：调到最前为1；调到最后为2；指定调整为3；afterId是类型为3时，要带的id
export function order(query) {
    return request({
        url: '/workflow/v2/catalog/order',
        method: 'get',
        params: query
    })
}

//删除材料
export function deleteMaterial(id) {
    return request({
        url: '/workflow/v1/catalog/deletematerial/' + id,
        method: 'get'
    })
}

//保存流程图
export function savepic(cataLogMaterialVo) {
    return request({
        url: '/workflow/v1/catalog/savepic',
        method: 'post',
        dataType: 'json',
        data: cataLogMaterialVo
    })
}

//材料排序
export function materiaOrder(query) {
    return request({
        url: '/workflow/v2/catalog/materiaorder',
        method: 'get',
        params: query
    })
}

//材料同一层级下拉列表
export function getMateriauiboxs(id) {
    return request({
        url: '/workflow/v2/catalog/materiauiboxs/' + id,
        method: 'get'
    })
}

/**
 * 流程目录授权
 */
//获取角色列表
export function getcatalogrolelist(pageQuery) {
    return request({
        url: '/workflow/v1/catalogrole/list',
        method: 'post',
        dataType: 'json',
        data: pageQuery 
    })
}

//保存流程目录授权
export function savecatalogrole(roleListVo) {
    return request({
        url: '/workflow/v1/catalogrole/save',
        method: 'post',
        dataType: 'json',
        data: roleListVo 
    })
}

//删除授权的角色
export function deletecatalogrole(id) {
    return request({
        url: '/workflow/v1/catalogrole/delete/' + id,
        method: 'get'
    })
}