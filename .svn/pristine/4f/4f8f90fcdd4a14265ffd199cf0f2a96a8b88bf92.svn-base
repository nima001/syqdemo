import request from '@/framework/utils/request'

// 流程模板应用

//添加流程模板应用
export function addModelApp(data) {
  return request({
      url: '/workflowsystem/v1/modelapplication/add',
      method: 'post',
      data
  })
}

//更新流程模板应用
export function updateModelApp(data) {
  return request({
      url: '/workflowsystem/v1/modelapplication/update',
      method: 'put',
      data
  })
}

//获取一条流程模板应用
export function getModelApp(id) {
  return request({
      url: `/workflowsystem/v1/modelapplication/get/${id}`,
      method: 'get',
  })
}

//流程模板应用列表查询
export function listModelApp(data) {
  return request({
      url: '/workflowsystem/v1/modelapplication/list',
      method: 'post',
      data
  })
}

//流程模板应用列表分页查询
export function pagelistModelApp(data) {
  return request({
      url: '/workflowsystem/v1/modelapplication/pagelist',
      method: 'post',
      data
  })
}

//删除流程模板应用
export function delModelApp(id) {
  return request({
      url: `/workflowsystem/v1/modelapplication/del/${id}`,
      method: 'delete'
  })
}

//发布流程模板应用
export function publishModelApp(id) {
  return request({
      url: `/workflowsystem/v1/modelapplication/publish/${id}`,
      method: 'get'
  })
}


