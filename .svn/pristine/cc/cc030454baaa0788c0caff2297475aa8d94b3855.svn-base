import request from '@/framework/utils/request'
import { aggregateQuery } from '@/person/api/chart'
import { query } from '@/person/api/integratedquery'

/**
 * 获取我管理的区域列表
 */
export function listDistrict () {
  return request({
    url: '/person/sx/orgstaffreport/district',
    method: 'get'
  })
}

/**
 * 区域统计数据
 * @param {Number} district 区域编码 | 空查询绍兴市
 * @param {Array} field 字段数组
 */
export function areaStatistics (district, fields) {
  let criteria = [
    { field: { key: 'orgtype' }, op: 'eq', value: 3 } // 查询组织类型是区域的
  ]
  if (district) {
    // 查询区县
    criteria.push({ field: { key: 'district' }, op: 'eq', value: district })
  } else {
    // 查询绍兴市
    criteria.push({ field: { key: 'name' }, op: 'eq', value: '绍兴市' })
  }
  return query({
    target: { id: 1 },
    filter: { op: 'and', criteria },
    fields: [
      { key: 'name', showname: '机构名称' },
      ...(fields || []).map(item => {
        return { key: '_id@organization.statistic.' + item }
      })
    ],
    pagenum: 1,
    pagesize: 1
  }).then(({ result: { header, rows } }) => {
    if (rows.length) {
      let item = rows[0]
      let result = {}
      ;(header || []).forEach(col => {
        result[col.key.replace('_id@organization.statistic.', '')] =
          item[col.column]
      })
      return { result }
    }
    return { result: {} }
  })
}

/**
 * 超编超值机构监测
 */
export function orgCountErrortReport (district) {
  return request({
    url: '/person/sx/orgstaffreport/orgcount/error',
    method: 'get',
    params: {
      district
    }
  })
}

/**
 * 按系统类别统计
 * @param {String} district 区域编码(为空统计所有地区)
 * @param {Array} unittypes 要统计的单位类型 [1, 5, 7]
 * @param {Array} fields 求和的统计字段 { code: 'ldzsck', name: '领导超空数' }
 */
export function chartBySystype (district, unittypes, fields) {
  let criteria = [{ field: { key: 'unittype' }, op: 'in', value: unittypes }]
  if (district) {
    criteria.push({ field: { key: 'district' }, op: 'eq', value: district })
  }
  return aggregateQuery({
    query: {
      target: { id: 1 },
      fields: [
        { key: 'name' },
        { key: 'systype' },
        ...fields.map(item => {
          return {
            key: '_id@organization.statistic.' + item.code,
            showname: item.name
          }
        })
      ],
      filter: { op: 'and', criteria }
    },
    groupby: {
      with: [{ type: 'value', key: 'systype', showname: '序列' }],
      fields: fields.map(item => {
        return {
          type: 'sum',
          key: '_id@organization.statistic.' + item.code,
          showname: item.name
        }
      })
    }
  })
}
/**
 * 按行政类型和地区统计
 * @param {String} district 区域编码(为空统计所有地区)
 * @param {Array} unittypes 要统计的单位类型 [1, 5, 7]
 * @param {Array} fields 求和的统计字段 { code: 'ldzsck', name: '领导超空数' }
 */

export function chartByOrg (district, unittypes, fields) {
  let criteria = [
    { field: { key: 'unittype' }, op: 'in', value: unittypes },
    { field: { key: 'district' }, op: 'eq', value: district }
  ]
  return aggregateQuery({
    query: {
      target: { id: 1 },
      fields: fields.map(item => {
        return {
          key: '_id@organization.statistic.' + item.code,
          showname: item.name
        }
      }),
      filter: { op: 'and', criteria }
    },
    groupby: {
      with: [{ type: 'field', showname: '指标名称' }],
      fields: fields.map(item => {
        return {
          type: 'sum',
          key: '_id@organization.statistic.' + item.code,
          showname: item.name
        }
      })
    }
  })
}

/**
 * 查询机构
 * @param {String} district 区域编码(为空统计所有地区)
 * @param {Array} unittypes 要统计的单位类型 [1, 5, 7]
 * @param {Array} filters 过滤条件 { field: '_id@organization.statistic.ldzsck', op: 'gt', value: 0}
 * @param {Array} fields 查询的字段 { key: '_id@organization.statistic.ldzsck', showname: '领导超空数'}
 */
export function orgQuery ({
  district,
  unittypes,
  filters,
  fields,
  orders,
  pagenum,
  pagesize,
  needtotal
}) {
  let criteria = [
    { field: { key: 'unittype' }, op: 'in', value: unittypes },
    ...(filters || []).map(item => {
      return { field: { key: item.field }, op: item.op, value: item.value }
    })
  ]
  if (district) {
    criteria.push({ field: { key: 'district' }, op: 'eq', value: district })
  }
  let fs = [{ key: 'name', showname: '机构名称' }, ...(fields || [])]
  return query({
    target: { id: 1 },
    filter: { op: 'and', criteria },
    fields: fs,
    orders: [...(orders||[]),{ orderby: 'index', ordertype: 'ASC' }],
    pagenum,
    pagesize,
    needtotal
  })
}

/**
 * 近5年退休人数
 */
export function orgRetireReport (district, orgid, dateformat) {
  return request({
    url: '/person/sx/orgstaffreport/retire/report',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: {
      district,
      orgid,
      dateformat
    }
  })
}

/**
 * 区域系统类别近5年退休人数统计
 */
export function retireSystypeReport (district) {
  return request({
    url: '/person/sx/orgstaffreport/retire/systype/report',
    method: 'get',
    params: {
      district: district
    }
  })
}

// 机构近5年退休人数统计
export function orgReport (data) {
  return request({
    url: `/person/sx/orgstaffreport/retire/org/report`,
    method: 'post',
    data
  })
}

/**
 * 未按时退休人数
 */
export function orgRetireErrorReport (district) {
  return request({
    url: '/person/sx/orgstaffreport/retire/error',
    method: 'post',
    data: {
      ...district
    }
  })
}

/**
 * 查询组织周转编制
 */
export function turnoverStaff (data) {
  return request({
    url: '/person/sx/org/turnover/staff',
    method: 'post',
    data
  })
}

/**
 * 查询配置信息
 * @param {String} district 区域编码
 * @param {Number} id  配置id
 *   201 : 实有机构分布情况
 *   202 : 按编制类型查看行政编制核定数
 *   203 : 按行业领域查看事业编制核定数
 */
export function getChart (district, id) {
  return request({
    url: '/person/chart/aggregate/' + `${id}`,
    method: 'post',
    data: { district }
  })
}

/**
 * 告警信息
 * @param {String} district 区域编码
 */
export function alarmMsg (district) {
  return request({
    url: '/person/sx/v1/alarmmsg/pagelist',
    method: 'post',
    data: { district }
  })
}

/**
 * 未按时退休
 * @param {String} district 区域编码
 */
export function retireError (district, orgid, pagination) {
  return request({
    url: '/person/sx/orgstaffreport/retire/error',
    method: 'post',
    data: { district, orgid, ...pagination }
  })
}

/**
 * 机构近一个月预计退休人数及其人员信息
 * @param {String} district 区域编码
 * @param {String} orgid 机构id
 */
export function retireNearlyAMonth (district, orgid, pagination) {
  return request({
    url: '/person/sx/orgstaffreport/retire/nearlyamonth',
    method: 'post',
    data: { district, orgid, ...pagination }
  })
}

/**
 * 机构编制问题数
 * @param {String} district 区域编码
 */
export function question (district) {
  return request({
    url: '/person/sx/problemmonitor/total',
    method: 'get',
    params: {
      district
    }
  })
}

/**
 * 业务通知
 * @param {String} district 区域编码
 */
export function notice (district) {
  return request({
    url: '/person/sx/worktask/total',
    method: 'get',
    params: {
      district
    }
  })
}

/**
 * 权力事项
 */
export function powerChange () {
  return request({
    url: '/person/qlsx/district/change',
    method: 'get'
  })
}

/**
 * 权力事项合计
 */
export function powerAll () {
  return request({
    url: '/person/qlsx/district',
    method: 'get'
  })
}

/**
 * 重点任务
 * @param {String} district 区域编码
 */
export function keyTask (district, statusIn, pagination) {
  return request({
    url: '/person/sx/worktask/listtask',
    method: 'post',
    data: { district, statusIn, ...pagination }
  })
}

/**
 * 人员出入编趋势
 * @param {String} district  区域编码
 * @param {String} startTime 开始时间 2020-3
 * @param {string} endTime 结束时间 2021-4
 *
 */
export function facemonitor (district, startTime, endTime) {
  return request({
    url: '/person/sx/outorinquotaplan/total',
    method: 'get',
    params: { district, startTime, endTime }
  })
}

/**
 * 接口信息
 * @param {String} district  区域编码
 *
 */
export function interfaceInfo (district) {
  return request({
    url: '/person/sx/v1/outerinterfacemonitor/querycount',
    method: 'get',
    params: { district, categoryIn: '' }
  })
}

/**
 * 法人登记赋码调整
 * @param {number} [granularity=2] 1：按年统计   2: 按月统计
 * @returns
 */
export function corporateCode (granularity = 2) {
  return request({
    url: '/person/v1/datastatistic/corporatecode',
    method: 'post',
    data: { granularity }
  })
}

/**
 *法人登记赋码机构列表
 * @export
 * @param {String} key valueCol 的类型
 * @param {number} [granularity=2]  1：按年统计   2: 按月统计
 */
export function corporateorglist (key, granularity = 2) {
  return request({
    url: '/person/v1/datastatistic/corporateorglist',
    method: 'post',
    data: { granularity, key }
  })
}


//获取组织树根节点(市本级除外)
export function treeroot(treeid) {
  return request({
      url: '/person/orgtreecompare/root',
      method: 'get',
      params:{
          treeid
      }
  });
}
//组织查询(市本级除外)
export function orgquery(data) {
  return request({
      url: '/person/orgcompare/query',
      method: 'post',
      dataType: 'json',
      data
  })
}
// 对比若干个组织之间的属性
export function orgpropertyquery(data) {
  return request({
    url: '/person/orgtreecompare/orgpropertyquery',
    method: 'post',
    data
  })
}