// 人员调动
import request from '@/framework/utils/request'

/**
 * 获取考核概况
 * @param {int} nodeid 组织节点id
 */
export function exam () {
    return request({
      url: '/hall2/v2/userreport/getisneedassessmap',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 获取考核汇总
   * @param {Object} pagination 分页对象
   */
  export function examGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/getisneedassesslist',
      method: 'post',
      data: pagination
    })
  }

  /** 
   * 考核导出
  */
  export function exportExam(data){
    return request({
      url: '/hall2/v2/userreport/isneedassess/export',
      method: 'post',
      data
    })
  }
  
  /**
   * 获取窗口职位概况
   * @param {int} nodeid 组织节点id
   */
  export function staffposition () {
    return request({
      url: '/hall2/v2/userreport/getwindowpositionmap',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 获取窗口职位汇总
   * @param {Object} pagination 分页对象
   */
  export function staffpositionGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/getwindowpositionlist',
      method: 'post',
      data: pagination
    })
  }
  
  /**
   * 窗口职位汇总导出
   */
  export function staffpositionExport (data) {
    return request({
      url: '/hall2/v2/userreport/windowposition/export',
      method: 'post',
      data
    })
  }

  /**
   * 获取教育概况
   * @param {int} nodeid 组织节点id
   */
  export function education () {
    return request({
      url: '/hall2/v2/userreport/geteducationmap',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 获取学历情况汇总
   * @param {Object} pagination 分页对象
   */
  export function educationGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/geteducationlist',
      method: 'post',
      data: pagination
    })
  }
  
   /**
   * 学历情况汇总导出
   */
  export function educationExport (data) {
    return request({
      url: '/hall2/v2/userreport/education/export',
      method: 'post',
      data
    })
  }

  /**
   * 获取政治面貌概况
   * @param {int} nodeid 组织节点id
   */
  export function politics (nodeid) {
    return request({
      url: '/hall2/v2/userreport/getpoliticefacemap',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 获取政治面貌情况汇总
   * @param {Object} pagination 分页对象
   */
  export function politicsGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/getpoliticefacelist',
      method: 'post',
      data: pagination
    })
  }
  
  /**
   * 政治面貌汇总导出
   */
  export function politicsExport (data) {
    return request({
      url: '/hall2/v2/userreport/politiceface/export',
      method: 'post',
      data
    })
  }

  /**
   * 获取性别概况
   * @param {int} nodeid 组织节点id
   */
  export function sex () {
    return request({
      url: '/hall2/v2/userreport/getusersexmap',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 获取性别情况汇总
   * @param {Object} pagination 分页对象
   */
  export function sexGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/getusersexlist',
      method: 'post',
      data: pagination
    })
  }
  
  /**
   * 性别汇总导出
   */
  export function sexExport (data) {
    return request({
      url: '/hall2/v2/userreport/usersex/export',
      method: 'post',
      data
    })
  }

  /**
   * 获取人员身份概况
   * @param {int} nodeid 组织节点id
   */
  export function identity () {
    return request({
      url: '/hall2/v2/userreport/getpersonnelmap',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 人员身份汇总-导出
   */
  export function identityExport (data) {
    return request({
      url: '/hall2/v2/userreport/personnel/export',
      method: 'post',
      data
    })
  }

  /**
   * 获取人员调动情况汇总
   * @param {Object} pagination 分页对象
   */
  export function identityGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/getpersonnellist',
      method: 'post',
      data: pagination
    })
  }
  
  /**
   * 获取人员调动情况
   * @param {int} nodeid 组织节点id
   */
  export function transferInfo () {
    return request({
      url: '/hall2/v2/userreport/getpersonnelTransfer',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 人员调动导出
   */
  export function transferExport (data) {
    return request({
      url: '/hall2/v2/userreport/personnelTransfer/export',
      method: 'post',
      data
    })
  }

  /**
   * 获取人员增减曲线
   */
  export function transferChart () {
    return request({
      url: '/hall2/v2/userreport/getpersonnelTransferline',
      method: 'post',
      data: { nodeid: null }
    })
  }
  
  /**
   * 获取人员调动情况汇总
   * @param {Object} pagination 分页对象
   */
  export function transferGather (pagination) {
    return request({
      url: '/hall2/v2/userreport/getpersonnelTransferlist',
      method: 'post',
      data: pagination
    })
  }