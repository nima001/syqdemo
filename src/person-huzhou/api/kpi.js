let list = [
  { id: 'd1', name: '吴兴区', orgtype: 3, district: '330502', overview: [
    { id: 1, title: '工作绩效', score: 58 },
    { id: 2, title: '编制总量', score: 20 },
    { id: 3, title: '配置效益', score: 9.32 },
    { id: 4, title: '机构编制法治化', score: 0 },
  ] },
  { id: 'd2', name: '南浔区', orgtype: 3, district: '330503', overview: [
    { id: 1, title: '工作绩效', score: 56 },
    { id: 2, title: '编制总量', score: 19 },
    { id: 3, title: '配置效益', score: 10.38 },
    { id: 4, title: '机构编制法治化', score: 0 },
  ] },
  { id: 'd3', name: '德清县', orgtype: 3, district: '330521', overview: [
    { id: 1, title: '工作绩效', score: 59 },
    { id: 2, title: '编制总量', score: 17 },
    { id: 3, title: '配置效益', score: 10.83 },
    { id: 4, title: '机构编制法治化', score: 0 },
  ]  },
  { id: 'd4', name: '长兴县', orgtype: 3, district: '330522', overview: [
    { id: 1, title: '工作绩效', score: 60 },
    { id: 2, title: '编制总量', score: 18 },
    { id: 3, title: '配置效益', score:	9.52 },
    { id: 4, title: '机构编制法治化', score: 0 },
  ]  },
  { id: 'd5', name: '安吉县', orgtype: 3, district: '330523', overview: [
    { id: 1, title: '工作绩效', score: 57 },
    { id: 2, title: '编制总量', score: 16 },
    { id: 3, title: '配置效益', score: 8.26 },
    { id: 4, title: '机构编制法治化', score: 0 },
  ]},
  { id: 1, name: "市委组织部", orgtype: 1, overview: [
    { id: 1, title: '履职效能', score: 50.34 },
    { id: 2, title: '运行效率', score: 19.18 },
    { id: 3, title: '配置效益', score: 19.58 },
  ]},
  { id: 2, name: "市委宣传部", orgtype: 1, overview: [
    { id: 1, title: '履职效能', score: 57 },
    { id: 2, title: '运行效率', score: 16 },
    { id: 3, title: '配置效益', score: 8.26 },
  ]},
  { id: 3, name: "市委统战部", orgtype: 1, overview: [
    { id: 1, title: '履职效能', score: 57 },
    { id: 2, title: '运行效率', score: 16 },
    { id: 3, title: '配置效益', score: 8.26 },
  ]},
  { id: 4, name: "市委政研室", orgtype: 1, overview: [
    { id: 1, title: '履职效能', score: 48.60 },
    { id: 2, title: '运行效率', score: 18.87 },
    { id: 3, title: '配置效益', score: 18.73 },
  ]},
]


/**
 * 地区质效概述列表
 */
export function districtKpi(){
  return new Promise((resolve) => {
    resolve({
      code: 'success',
      result: list.filter(item => item.orgtype == 3)
    })
  })
}

/**
 * 根据单位id获取单位绩效概述
 * @param {*} id 
 */
export function getOrgKpiOverview(id){
  return new Promise((resolve) => {
    resolve({
      code: 'success',
      result: (list.find(item => item.id == id) || {}).overview
    })
  })
}

/**
 * 区域绩效平均分
 */
export function districtKpiAvg(){
  return new Promise((resolve) => {
    resolve({
      code: 'success',
      result: [
        { id: 1, title: '工作绩效', num: 58 },
        { id: 2, title: '编制总量', num: 18 },
        { id: 3, title: '配置效益', num: 9.66 },
        { id: 4, title: '机构编制法治化', num: 0 },
      ]
    })
  })
}


/**
 * 单位绩效平均分
 */
export function orgKpiAvg(){
  return new Promise((resolve) => {
    resolve({
      code: 'success',
      result: [
        { id: 1, title: '履职效能', num: 48.16 },
        { id: 2, title: '运行效率', num: 18.71 },
        { id: 3, title: '配置效益', num: 16 },
      ]
    })
  })
}