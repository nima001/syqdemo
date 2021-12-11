import request from '@/framework/utils/request'

// 新增模板
export function addTemplate (data) {
  return request({
    url: '/person/report/template',
    method: 'post',
    data
  })
}

// 查询模板
export function templateList (data) {
  return request({
    url: '/person/report/template/list',
    method: 'post',
    data
  })
}

// 预览模板
export function preview (data) {
  return request({
    url: '/person/report/template/preview',
    method: 'post',
    data,
    timeout: 15000
  })
}

// 预览模板(根据id)
export function previewById (id, context) {
  return request({
    url: `/person/report/template/preview/${id}`,
    method: 'post',
    data: context,
    timeout: 15000
  })
}

// 获取模板
export function getTemplate (id) {
  return request({
    url: `/person/report/template/${id}`,
    method: 'get'
  })
}
// 更新模板
export function updateTemplate (data) {
  return request({
    url: `/person/report/template/${data.id}`,
    method: 'post',
    data
  })
}
// 删除模板
export function delTemplate (id) {
  return request({
    url: `/person/report/template/${id}`,
    method: 'delete'
  })
}
// 统计表查询
export function reportBookQuery (data) {
  return request({
    url: '/person/report/book/query',
    method: 'post',
    data
  })
}
// 新建统计册
export function newbook (data) {
  return request({
    url: '/person/report/book',
    method: 'post',
    data
  })
}
// 获取统计册
export function detailbook(id) {
  return request({
    url: `/person/report/book/${id}`,
    method: 'get'
  })
}
// 删除统计册
export function deletebook (id) {
  return request({
    url: `/person/report/book/${id}`,
    method: 'delete'
  })
}
// 统计册目录列表
export function listCatalog(bookid) {
  return request({
    url: '/person/report/book/catalogs',
    method: 'get',
    params: {bookid}
  })
}
// 获取统计册目录
export function catalogDetail (id) {
  return request({
    url: `/person/report/book/catalogs/${id}`,
    method: 'get'
  })
}
// 目录搜索
export function catalogspost (data) {
  return request({
    url: '/person/report/book/catalogs/search',
    method: 'post',
    data
  })
}
// 根据时间列出统计册
export function listReportDisplay (data) {
  return request({
    url: '/person/report/book/display',
    method: 'post',
    data
  })
}
// 删除目录
export function catalogsDelete (id) {
  return request({
    url: `/person/report/book/catalogs/${id}`,
    method: 'delete'
  })
}
// 更新目录
export function catalogsedit (id, data) {
  return request({
    url: `/person/report/book/catalogs/${id}`,
    method: 'post',
    data
  })
}
// 更新统计册
export function updatebook (id, data) {
  return request({
    url: `/person/report/book/${id}`,
    method: 'post',
    data
  })
}
// 新增目录
export function newList (data) {
  return request({
    url: '/person/report/book/catalogs',
    method: 'post',
    data
  })
}
// 导出统计册
export function exportBook(id, date) {
  return request({
    url: '/person/report/book/export',
    method: 'get',
    params: {
      id, date
    },
  })
}

/**
 * 根据目录获取页面内容
 * @param {Number} catalogid 
 */
export function getSheet(catalogid) {
  return request({
    method: 'get',
    url: '/person/report/book/catalogs/sheet',
    params: {
      catalogid
    },
  })
}

/**
 * 生成页面内容
 * @param {Number} bookid 
 * @param {Number} catalogid 
 * @param {Boolean} refresh 
 */
export function buildSheet(bookid, catalogid, refresh) {
  return request({
    method: 'get',
    url: '/person/report/book/sheet',
    params: {
      bookid, catalogid, refresh
    },
    timeout: 15000
  })
}

// 展开父级目录
export function parentDirectory (bookid, catalogid) {
  return request({
    url:
      '/person/report/book/catalogs/spread?bookid=' +
      bookid +
      '&catalogid=' +
      catalogid,
    method: 'get'
  })
}

// 获取字段列表
export function getFields (namespace, params) {
  return request({
    url: '/person/expr/fields/' + namespace,
    method: 'post',
    data: params,
  })
}

// 获取函数列表
export function getFns (namespace) {
  return request({
    url: '/person/expr/fns/' + namespace,
    method: 'post',
  })
}

// 验证表达式是否合法
export function validateEXpr (expr) {
  return request({
    url: '/person/expr/validate',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: {
      expr
    }
  })
}

// 小册子关联角色列表
export function listrole(bookid) {
  return request({
    url: '/person/report/book/listrole?bookid=' + bookid,
    method: 'get'
  })
}  

// 查询角色
export function queryrole(data) {
  return request({
    url: '/person/report/book/queryrole',
    method: 'post',
    data
  })
}

// 添加角色关系
export function addrole(bookid, roleid) {
  return request({
    url: '/person/report/book/addrole',
    method: 'get',
    params: {
      bookid,
      roleid
    }
  })
}

// 删除角色关系
export function delrole(bookid, roleid) {
  return request({
    url: '/person/report/book/delrole',
    method: 'get',
    params: {
      bookid,
      roleid
    }
  })
}
