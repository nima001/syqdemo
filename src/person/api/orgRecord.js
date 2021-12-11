import request from '@/framework/utils/request'

//获取台账待入项列表
export function listOutline(docid) {
    return request({
        url: '/person/orgrecord/outline/list',
        method: 'get',
        params: {
            docid
        }
    })
}
//根据流水号获取台账待入项
export function getOutline(serialnum) {
    return request({
        url: '/person/orgrecord/outline/'+ serialnum,
        method: 'get'
    })
}
//保存新建台账待入项
export function saveOutline(data) {
    return request({
        url: '/person/orgrecord/outline',
        method: 'post',
        data
    })
}
//验证台账记录
export function validateOutline(data) {
    return request({
        url: '/person/orgrecord/outline/validate',
        method: 'post',
        data
    })
}
//根据流水号删除台账待入项
export function deleteOutline(serialnum) {
    return request({
        url: '/person/orgrecord/outline/' + serialnum,
        method: 'delete'
    })
}
//台账记录列表查询
export function recordQuery(data) {
    return request({
        url: '/person/orgrecord/list',
        method: 'post',
        data,
    })
}
//根据流水号获取待入台账列表
export function getBySerialnum(val) {
    return request({
        url: '/person/orgrecord/getbyserialnum',
        method: 'get',
        params: {
            serialnum: val
        }
    })
}
//根据台账记录id获取台账信息
export function getRecord(id) {
    return request({
        url: '/person/orgrecord/' + id,
        method: 'get',
    })
}
//录入台账信息
export function saveRecord(data) {
    return request({
        url: '/person/orgrecord',
        method: 'post',
        data
    })
}
//批量录入台账信息
export function batchUpdateRecord(data) {
    return request({
        url: '/person/orgrecord/batchupdate',
        method: 'post',
        data,
        timeout: 15000
    })
}
//删除台账记录信息
export function deleteRecord(id) {
    return request({
        url: '/person/orgrecord/' + id,
        method: 'delete'
    })
}
//获取台账的内设列表
export function getRecordDepts(orgid, docid) {
    return request({
        url: '/person/orgrecord/depts',
        method: 'get',
        params: {
            orgid, docid
        }
    })
}

//获取代理历史文档单位列表
export function getOrgProxy(orgid) {
    return request({
        url: '/person/orgrecord/proxy',
        method: 'get',
        params: {
            orgid
        }
    })
}

//检查单位是否可以撤销
export function checkRemovable(orgid) {
    return request({
        url: '/person/orgrecord/checkremove',
        method: 'get',
        params: {
            orgid
        }
    })
}

// 获取组织人员配比类别列表
export function getCategoryList() {
    return request({
        url: '/person/orgdistr/category/list',
        method: 'get'
    })
}

// 保存组织人员配比类别
export function addOrgdistrCategory(data) {
    return request({
        url: '/person/orgdistr/category',
        method: 'post',
        data
    })
}

// 获取组织人员配比模板列表
export function getOrgdistrTemplist() {
    return request({
        url: '/person/orgdistr/temp/list',
        method: 'get'
    })
}

// 获取配比模板的项
export function getTempitems(id) {
    return request({
        url: '/person/orgdistr/temp/items/' + id,
        method: 'get'
    })
}

// 新增配比模板
export function addOrgdistrTemp(data) {
    return request({
        url: '/person/orgdistr/temp',
        method: 'post',
        data
    })
}