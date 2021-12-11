import request from '@/framework/utils/request'
/*
**---------------- 业务办理监测 ----------------
*/
// 业务办理监测
export function orgDataStatisticQuery(data) {
  return request({
    url: '/person/v1/datastatistic/list',
    method: 'post',
    data
  })
}

//  机构增减情况
export function orgChangeInfo(data) {
  return request({
    url: '/person/v1/datastatistic/info',
    method: 'post',
    data
  })
}

//  机构增减情况量
export function orgChangeNum(data) {
  return request({
    url: '/person/v1/datastatistic/num',
    method: 'post',
    data
  })
}

/*
**---------------- 数据质量监测 ----------------
*/
//  图表数据统一查询接口
export function dataqualityChart(data) {
  return request({
    url: '/person/sx/v1/dataquality/querychart',
    method: 'post',
    data
  })
}
//分页查询统一接口
export function dataqualityPageList(data) {
  return request({
    url: '/person/sx/v1/dataquality/pagelist',
    method: 'post',
    data
  })
}

//质量监测重新发送消息
export function dataqualitySendMsg(orgid) {
  return request({
    url: `/person/sx/v1/dataquality/resendmsg?orgid=`+orgid,
    method: 'get'
  })
}

/*
**---------------- 问题跟踪监测 ----------------
*/
//饼图、柱状图、折线图统一查询接口
export function problemmonitorChart(data) {
  return request({
    url: '/person/v1/problemmonitor/querychart',
    method: 'post',
    data
  })
}
//发送通知消息
export function problemmonitorMsg(ids) {
  return request({
    url: `/person/v1/problemmonitor/sendmsg?ids=${ids}`,
    method: 'get'
  })
}
//所有问题列表
export function problemPageList(data) {
  return request({
    url: `/person/v1/problemmonitor/pagelist`,
    method: 'post',
    data
  })
}
//机构黑名单
export function orgBlacklist(data) {
  return request({
    url: `/person/v1/problemmonitor/orgblacklist`,
    method: 'post',
    data
  })
}
//黑名单中的问题列表
export function problemblackList(data) {
  return request({
    url: `/person/v1/problemmonitor/problemblacklist`,
    method: 'post',
    data
  })
}

//黑名单中的问题列表 分页查询
export function orgblackproblemspagequery(data) {
  return request({
    url: `/person/v1/problemmonitor/orgblackproblemspagequery`,
    method: 'post',
    data
  })
}

//添加黑名单
export function addblackList(id) {
  return request({
    url: `/person/v1/problemmonitor/addblacklist?id=${id}`,
    method: 'get'
  })
}
//移除黑名单
export function removeBlacklist(id) {
  return request({
    url: `/person/v1/problemmonitor/removeblacklist?id=${id}`,
    method: 'delete'
  })
}
//批量移除问题黑名单
export function batchremove(id) {
  return request({
    url: `/person/v1/problemmonitor/batchremove?blacklistid=${id}`,
    method: 'delete'
  })
}
//问题添加到暂缓名单
export function addDefer(id) {
  return request({
    url: `/person/v1/problemmonitor/adddefer?id=${id}`,
    method: 'get'
  })
}
//问题移出暂缓名单
export function removeDefer(id) {
  return request({
    url: `/person/v1/problemmonitor/removedefer?id=${id}`,
    method: 'get'
  })
}
//
/*
**---------------- 资源配置监测 ----------------
*/
//查询权力事项
export function qlsxsearch(data) {
  return request({
    url: '/person/qlsx/search',
    method: 'post',
    data
  })
}
//查询组织的权力事项统计信息
export function qlsxstatistic(orgid) {
  return request({
    url: `/person/qlsx/statistic?orgid=${orgid}`,
    method: 'get'
  })
}
//查询事业单位年报
export function orgyearreport(data){
  return request({
    url: '/person/sx/org/yearRep/query',
    method: 'post',
    data
  })
}
//查询定岗定员定责
export function sanding(data){
  return request({
    url: '/person/sx/org/sanding/query',
    method: 'post',
    data
  })
}
//定员定岗定责保存
export function sandingsave(data){
  return request({
    url: '/person/sx/org/sanding/save',
    method: 'post',
    data
  })
}
//定员定岗定责删除
export function sandingdel(id){
  return request({
    url: `/person/sx/org/sanding?id=${id}`,
    method: 'delete',
  })
}
//定员定岗定责排序
export function sandingorderby(data){
  return request({
    url: '/person/sx/org/sanding/orderby',
    method: 'post',
    params: {
      ...data,
    }
  })
}
//内设机构查询
export function personorgQuery(data){
  return request({
    url: '/person/org/query',
    method: 'post',
    data
  })
}

// 一图总览---外部接口调用监控
export function outerInterfaceMonitor(id){
  return request({
    url: `/person/v1/monitorstrategy/outerInterfacemonitor?type=${id}`,
    method: 'get'
  })
}

//一图总览---人员变动情况
export function userChange(data){
  return request({
    url: '/person/v1/datastatistic/userchange',
    method: 'post',
    data
  })
}

/**
 *一图总览---机构编制事项调整
 * @param {Number} granularity  
 *    1 年度 
 *    2 月度
 */
export function orgDistrChange(granularity){
  return request({
    url: '/person/v1/datastatistic/orgDistrChange',
    method: 'post',
    data:{
      granularity
    }
  })
}

/**
 *一图总览---机构编制事项调整
 * @param {Number} granularity  1 年度  2 月度
 * @param {String} key 查看的列的key
 */
export function orgDistrChangeLookup(granularity, key){
  return request({
    url: '/person/v1/datastatistic/orglist',
    method: 'post',
    data:{
      granularity, key
    }
  })
}

