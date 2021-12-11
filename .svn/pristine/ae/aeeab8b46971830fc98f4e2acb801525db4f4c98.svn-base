  import request from '@/framework/utils/request'
  import { uiConfigsCookies } from '@/framework/utils/auth'
  import axios from 'axios'
  import { get } from 'core-js/fn/dict';
  import { method } from 'lodash';
  /*
  **信息服务
  */

  //智能搜索-文件查询
  export function sxdocument(data) {
    return request({
      url: '/person/document/search',
      method: 'post',
      data
    })
  }
  //智能搜索-职能查询
  export function sxorgfuncdesc(data) {
      return request({
        url: '/person/sx/orgfuncdesc/search',
        method: 'post',
        data
      })
    }
  
  //智能搜索-人员查询
  export function sxquery(data) {
    return request({
      url: '/person/user/query',
      method: 'post',
      data
    })
  }
  //智能搜索-人员查询-机构详情
  export function organization(id) {
    return request({
        url: '/person/org/' + id,
        method: 'get'
    });
  }

  //智能搜索-组织搜索
  export function sxorgquery(data) {
    return request({
      url: '/person/org/query',
      method: 'post',
      data
    })
  }

  //条线配置-查询条线数据
  export function orglinequery(data){
    return request({
      url: '/person/shaoxing/org/line/query',
      method: 'post',
      data
    })
  }
  //条线配置-获取条线的详情
  export function orglinedetail(id){
    return request({
      url: `/person/shaoxing/org/line?id=${id}`,
      method: 'get'
    })
  }
  //条线配置-条线删除
  export function orglinedel(id){
    return request({
      url: `/person/shaoxing/org/line?id=${id}`,
      method: 'delete',
    })
  }
  //条线配置-条线保存
  export function orglinesave(data){
    return request({
      url: '/person/shaoxing/org/line/save',
      method: 'post',
      data
    })
  }
  //条线配置-校验参数
  export function orgvalid(data){
    return request({
      url: '/person/shaoxing/org/line/valid',
      method: 'post',
      data,
    })
  }
  //列出文件附件 
  export function annexlist(docid){
    return request({
      url: '/person/sx/document/annex/list',
      method: 'get',
      params: {
        'docid': docid
      }
    })
  }
  //保存文件附件 
  export function annexsave(data){
    return request({
      url: '/person/sx/document/annex/save',
      method: 'post',
      data
    })
  }
  //发文列表
  export function documentlist(data){
    return request({
      url: '/person/document/content/list',
      method: 'post',
      data
    })
  }
  //新增发文
  export function document(data) {
    return request({
      url: '/person/document',
      method: 'post',
      data
    })
  }
  //删除发文
  export function documentdel(id) {
    return request({
      url: `/person/document/${id}`,
      method: 'delete',
    })
  }
  //更新发文
  export function documentupdate(data) {
    return request({
      url: `/person/document/${data.id}`,
      method: 'post',
      data,
    })
  }
  //根据id获取发文
  export function documentbyid(id) {
    return request({
      url: `/person/document/${id}`,
      method: 'get',
    })
  }
  //删除后恢复发文
  export function documentreset(id) {
    return request({
      url: `/person/document/reset/${id}`,
      method: 'get',
    })
  }
  //修改文件状态
  export function documentstatus(ids,status) {
    return request({
      url: '/person/document/status',
      method: 'get',
      params: {
        ids: ids,
        status: status
      }
    })
  }
  //查询组织编制用语
  export function orgtermsearch(data) {
    return request({
      url: '/person/sx/orgterm/search',
      method: 'post',
      data
    })
  }
  //组织编制用语分类
  export function orgtermcategory() {
    return request({
      url: '/person/sx/orgterm/category',
      method: 'get',
    })
  }
  //保存阻止编制用语
  export function orgtermsave(data) {
    return request({
      url: '/person/sx/orgterm',
      method: 'post',
      data
    })
  }
  //导入组织编制用语
  export function orgtermimport(docFile) {
    let uiConfigs = uiConfigsCookies();
    return new Promise((resolve, reject) => {
        let formdata = new FormData()
        formdata.append("file", docFile)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(uiConfigs['api.url'] + '/person/sx/orgterm/import', formdata, config).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
    })
  }
  //删除组织编制用语
  export function orgtermdelete(data) {
    return request({
      url: '/person/sx/orgterm/delete',
      method: 'delete',
      params: {
        ...data
      }
    })
  }