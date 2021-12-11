import request from '@/framework/utils/request'

//新增汇总表
export function addSummary(collectTableVo) {
    return request({
        url: '/workflow/v1/collecttable/add',
        method: 'post',
        dataType: 'json',
        data:collectTableVo  
    })
}

//删除汇总表
export function delSummary(id) {
    return request({
        url: '/workflow/v1/collecttable/delete/' + id,
        method: 'get'
    })
}

//获取单条汇总表数据
export function getSingleSummary(id){
    return request({
        url: '/workflow/v1/collecttable/get/'+id,
        method: 'get'
    })
}

//汇总表列表
export function getSummaryList(modelPageQuery) {
    return request({
        url: '/workflow/v1/collecttable/list',
        method: 'post',
        dataType: 'json',
        data:modelPageQuery  
    })
}

//获取汇总表授权的角色
export function getroles(collecttableid){
    return request({
        url: '/workflow/v1/collecttable/getroles/'+collecttableid,
        method: 'get'
    })
}

//编辑汇总表
export function updateSummary(collectTableVo) {
    return request({
        url: '/workflow/v1/collecttable/update',
        method: 'post',
        dataType: 'json',
        data:collectTableVo  
    })
}

//汇总表与excel表格列关系
//新增列
export function addColumn(tableRowsMap) {
    return request({
        url: '/workflow/v1/tablerows/add',
        method: 'post',
        dataType: 'json',
        data:tableRowsMap   
    })
}

//删除列
export function delColumn(id) {
    return request({
        url: '/workflow/v1/tablerows/delete/' + id,
        method: 'get'
    })
}

//获取单条列数据
export function getSingleColumn(id){
    return request({
        url: '/workflow/v1/tablerows/get/'+id,
        method: 'get'
    })
}

//某个汇总表的列集合
export function getSummaryColumnsList(collecttableid) {
    return request({
        url: '/workflow/v1/tablerows/list/'+collecttableid,
        method: 'get'
    })
}

//编辑列
export function updateColumn(tableRowsMap) {
    return request({
        url: '/workflow/v1/tablerows/update',
        method: 'post',
        dataType: 'json',
        data:tableRowsMap  
    })
}

//获取主项下的所有流程模型
export function getModelinstances(catalogid) {
    return request({
        url: '/workflow/v2/catalog/modelinstances/'+catalogid,
        method: 'get'
    })
}

//保存组件与列的关系
export function saveTablerows(rowComponentVos) {
    return request({
        url: '/workflow/v1/rowcomponent/save',
        method: 'post',
        dataType: 'json',
        data:rowComponentVos    
    })
}

//获取某个列的组件集合
export function getSingleRows(rowid){
    return request({
        url:'/workflow/v1/rowcomponent/list/'+rowid,
        method:'get'
    })
}

///某个汇总表的流程模型节点集合
export function getCollectNodeList(collecttableid){
    return request({
        url:'/workflow/v1/collectnode/list/'+collecttableid,
        method:'get'
    })
}

//保存组件与列的关系
export function saveCollectNode(collectNodeVos ) {
    return request({
        url: '/workflow/v1/collectnode/save',
        method: 'post',
        dataType: 'json',
        data:collectNodeVos     
    })
}

//根据模型id获取流程所有节点
export function getListNode(modelinstanceid){
    return request({
        url:'/workflow/v1/listnode',
        method:'get',
        params:{
            modelinstanceid
        }
    })
}

//点击汇总表，如果有权限导出汇总的表会返回到前端，否则报权限不足！
export function getTables(){
    return request({
        url:'/workflow/v1/collecttable/gettables',
        method:'get'
    })
}

//策略管理接口
export function getStrategyList(){
    return request({
        url:'/workflow/v1/strategy/commonlist',
        method:'get'
    })
}

//导出excle表格
export function exportExcle(id){
    return request({
        url:'/workflow/v1/collecttable/export',
        method:'get',
        params:{
            id
        }
    })
}

//导出表格时获取进度和地址
export function exportProgress(taskid){
    return request({
        url:'/workflow/async/process',
        method:'get',
        params:{
            taskid
        }
    })
}

//获取该列关联的所有流程模型和流程模型所对应的code集合
export function getRowComponent(rowid){
    return request({
        url:'/workflow/v1/rowcomponent/components/'+rowid,
        method:'get'
    })
}