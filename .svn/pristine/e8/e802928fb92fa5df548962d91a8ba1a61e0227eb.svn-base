import get from 'lodash/get';
import set from 'lodash/set';

//基础组件
export const components = {
	colLayout: () => import('./components/ColLayout'),
	titleBar: () => import('./components/TitleBar'),
	inputText: () => import('./components/InputText'),
	selectDict: () => import('./components/SelectDict'),
  inputBool: () => import('./components/InputBool'),
  datePicker:()=>import('./components/DatePicker.vue'),
  selectOrg : () => import('./components/SelectOrg'),
  customTable: () => import('./components/CustomTable'),
  formGroup: () => import('./components/FormGroup'),
  inputNumber: () => import('./components/InputNumber'),
  selectUser: () => import('./components/SelectUser'),
  casCader:()=>import('./components/CasCader')
}

export function initDataProps(data, formConfig){
  (function each(cmpts){
    (cmpts || []).forEach(c => {
      if(c.children){
        c.children.forEach(ele => each(ele.components))
      }else if(get(data, c.code) === undefined){
        set(data, c.code, undefined);
      }
    });
  })(formConfig);
  return data 
}

export const mixin = {
  methods: {
    createComponent(item, elementBuilder){
      if(this.show(item)){
        let scopedSlots = this.$scopedSlots[item.type];
        if(scopedSlots){
          let children = scopedSlots({...item});
          return elementBuilder('div', {
            class: 'cmpt-wrapper',
            style: this.floatStyle(item.float)
          }, children);
        }else{
          let cmpt = components[item.type];
          if(cmpt){
            return elementBuilder('div', {
              class: 'cmpt-wrapper',
              style: this.floatStyle(item.float)
            }, [elementBuilder(cmpt, {props: {...item}})]);
          }
        }
      }
    },
    isSlotComp(cmpt){//是否自定义组件
			return !!this.$scopedSlots[cmpt.type];
		},
		show(cmpt){
      //return !cmpt.show || cmpt.show(this.value);
      // TODO zhug  暂时只考虑到渲染部分, 目前只考虑 等于和在列表中两个操作符
      if(cmpt.relation == undefined){
        return true;
      }else{
        let relation = cmpt.relation;
        let loop = [];
        relation.forEach((item)=>{
          let type = undefined;
          let initData = get(this._provided.formData.data, item['code']);
          if(item.op == 'arr'){
            type = item['value'].includes(initData)
          }else{
            type = item['value'] == initData;
          }
          loop.push(type);
        })
        if(loop.includes(false)){
          return false;
        }else{
          return true;
        }
      }
		},
		floatStyle(f){
			if(f){
				let {left, top, right, bottom} = f.pos || {};
				return {
					position: 'absolute',
					left: ((f.left || 0) * 100) + "%",
					top: ((f.top || 0) * 100) + "%",
					margin: `${top || 0}px ${right||0}px ${bottom||0}px ${left||0}px`
				}
			}
    },
  }
}
