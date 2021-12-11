 //批量创建组件
 export function batchCreateCustom(actions, fn) {
  const customs = {}
  actions.forEach(item => {
      customs[item['type']] = fn(...item['action'])
  })
  return customs;
}