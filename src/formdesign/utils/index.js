import { randomStr } from "@/framework/utils/index";
import { orderBy } from 'lodash'


/**
 * 根据字段编码查找表单中的组件
 * @param {VueComponent} context 
 * @param {Function} perdicate
 */
export function findComponentBySchema(context, perdicate){
  return context.$children.reduce((components, child) => {
    if (child._formComponentType && perdicate(child.schema)) {
      components.push(child);
    }
    const foundChilds = findComponentBySchema(child, perdicate);
    return components.concat(foundChilds);
  }, []);
}

/**
 * 生成字段标识
 */
export function generateCode(){
  return randomStr(6);
}

/**
 * 根据组件类型获取排序的组件列表
 * @param {*} components 
 * @param {*} type 
 */
export function getOrderComptByType(components, type){
  let arr = [];
  for (let key in components) {
    let item = components[key];
    if(item.type == type){
      arr.push(item);
    }
  }
  return orderBy(arr, 'index');
}
