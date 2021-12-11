import request from '../utils/request'

/**
 * 加载字典项
 */
export function loadDict(key){
  return request({
    url: 'base/constant/dict',
    method: 'get',
    params: {
      key
    }
  })
}

/**
 * 查询字典
 * @param {*} namespace 
 * @param {*} seachkey 
 */
export function queryDict(namespace, seachkey){
  return request({
    url: 'base/constant/query',
    method: 'get',
    params: {
      namespace, seachkey
    }
  })
}