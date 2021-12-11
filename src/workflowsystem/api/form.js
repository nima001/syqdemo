import request from '@/framework/utils/request'

// 表单模板

//添加表单
export function addForm(data) {
  return request({
      url: '/workflowsystem/v1/form/add',
      method: 'post',
      data
  })
}

//修改表单
export function updateForm(data) {
  return request({
      url: '/workflowsystem/v1/form/update',
      method: 'put',
      data
  })
}

//查询单个表单
export function getForm(id) {
  return request({
      url: `/workflowsystem/v1/form/get/${id}`,
      method: 'get',
      id
  })
}

//获取表单列表
export function listForm(searchkey) {
  return request({
      url: '/workflowsystem/v1/form/list',
      method: 'get',
      params: searchkey
  })
}

//表单列表查询
export function listPage(data) {
  return request({
      url: '/workflowsystem/v1/form/listpage',
      method: 'post',
      data
  })
}

//删除表单
export function delForm(id) {
  return request({
      url: `/workflowsystem/v1/form/delete/${id}`,
      method: 'delete',
      id
  })
}

