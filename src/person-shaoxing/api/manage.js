import request from '@/framework/utils/request'
/*
**辅助评估内容管理
*/
//  所有的评估模板列表 Tem => template
export function listTem(data) {
  return request({
    url: '/person/sx/assess/config/listorgassessconfig',
    method: 'post',
    data
  })
}

//  新增或修改评估模板
export function addorupdateTem(data) {
  return request({
    url: '/person/sx/assess/config/addorupdate',
    method: 'post',
    data
  })
}

//  编辑时查询某一个模板
export function findTem(id) {
  return request({
    url: `/person/sx/assess/config/findone?id=${id}`,
    method: 'get'
  })
}

//  删除评估模板
export function deleteTem(id) {
  return request({
    url: `/person/sx/assess/config/delete?id=${id}`,
    method: 'delete'
  })
}