import request from '@/framework/utils/request'

// 流程模板应用

//添加类别
export function addCategory(data) {
  return request({
      url: '/workflowsystem/v1/category/add',
      method: 'post',
      data
  })
}

//修改类别
export function updateCategory(data) {
  return request({
      url: '/workflowsystem/v1/category/update',
      method: 'put',
      data
  })
}

//查询单个类别
export function getCategory(id) {
  return request({
      url: `/workflowsystem/v1/category/get`,
      method: 'get',
      id
  })
}

//获取所有类别
export function listCategory() {
  return request({
      url: '/workflowsystem/v1/category/list',
      method: 'post'
  })
}

//查询某一类的类别
export function listCategoryByType(usetype) {
  return request({
      url: '/workflowsystem/v1/category/listbytype',
      method: 'get',
      params: {usetype}
  })
}

//删除类别
export function delCategory(id) {
  return request({
      url: `/workflowsystem/v1/category/del`,
      method: 'delete',
      id
  })
}

