
import { Schema } from '@formily/vue'
import { sortBy } from 'lodash';
import { generateCode } from './index'

/**
 * 获取
 * @param {*} schema 
 * @param {*} key 
 */
export function getOrderProperties(properties){
  if(properties){
    let items = [];
    for (let key in properties) {
      items.push({name: key, ...properties[key]});
    }
    return sortBy(items, 'x-index');
  }
}

/**
 * 添加属性
 * @param {*} schema 
 * @param {*} prop 
 * @param {*} index 
 */
export function addProperty(schema, prop, index){
  const name = prop.name || generateCode();
  const empty = schema.properties === undefined;
  let addSchema;
  if(index >= 0){
    const props = Schema.getOrderProperties(schema);
    addSchema = schema.addProperty(name, prop);
    for(; index < props.length; index ++){//FIXME sunwen 属性调顺 x-index 处理麻烦（properties直接赋值无法更新关联数据）
      let { key, schema: s } = props[index];
      schema.removeProperty(key);
      schema.addProperty(key, s)
    }
  }else{
    addSchema = schema.addProperty(name, prop);
  }
  if(empty && schema.parent){//FIXME sunwen 属性为空时无法更新关联数据
    schema.parent.properties[schema.name] = schema;
  }
  return addSchema;
}

/**
 * 将自己移除，返回被移除的Schema
 * @param {*} schema 
 */
export function removeSelf(schema){
  return schema.parent.removeProperty(schema.name);
}

/**
 * 更新属性
 */
export function updateSelf(schema, json){
  let self = new Schema(json, schema.parent);
  if(!self.name){
    self.name = schema.name;
  }
  let props = schema.parent.properties;
  if(schema.name != self.name){//name变更特殊处理
    for(let key of Object.keys(props)){
      let s = props[key]
      delete props[key];
      if(key == schema.name){
        props[self.name] = self;
      }else{
        props[key] = s;
      }
    }
  }else{
    props[schema.name] = self;
  }
  return self;
}

/**
 * 获取Schema在父属性列表中的索引
 * @param {*} schema 
 */
export function indexOfParent(schema){
  if(schema.parent){
    const props = Schema.getOrderProperties(schema.parent);
    return props.findIndex(item => item.key == schema.name);
  }else{
    return -1;
  }
}

/**
 * 属性个数
 * @param {*} schema 
 */
export function propsSize(schema){
  if(schema && schema.properties){
    return Object.keys(schema.properties).length;
  }
  return 0
}

