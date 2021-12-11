<template>
  <setting-tree v-model="schemaJson" :properties="properties" @input="updateSchema"/>
</template>
<script>
import SettingTree from '@/framework/components/SettingTree'
import {randomStr} from '@/framework/utils'
import cloneDeep from 'lodash/cloneDeep'

export default {
  components: {
    SettingTree,
  },
  props: {
    schema: {
      required: true,
    },
    component: {
      required: true,
    },
    decorators: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      properties: undefined,
      schemaJson: this.schema.toJSON(),
      baseProps: {
        layout:{

        },
        widget: {
          name: {
            type: 'string',
            title: '字段标识',
            required: true,
            validator: (value, context) => {
              if(!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(value)){
                return '字段标识不合法'
              }
              if(value != this.schema.name && this.schema.parent.properties[value]){
                return '重复的字段标识'
              }
            }
          },
          title: {
            type: 'string',
            title: '字段名称',
            required: true,
          },
          required: {
            type: 'boolean',
            title: '必填',
          },
          'x-pattern': {
            type: 'enum',
            title: '交互形态',
            defaultValue: 'editable',
            attrs: {
              options: [
                { value: 'editable', label: '可编辑'},
                { value: 'readOnly', label: '只读'},
                { value: 'disabled', label: '禁用'},
                { value: 'readPretty', label: '阅读'},
              ]
            },
          },
          defaultValue: {
            type: 'string',
            title: '默认值',
            attrs: {
              
            },
          },
          validator: {
            type: 'void',
            title: '校验规则'
          },
          reactions: {
            type: 'void',
            title: '联动规则'
          }
        },
      }
    }
  },
  watch: {
    schema(v, oldV){
      // console.log('schema watch', v, oldV);
      if(!oldV || oldV._designid != v._designid){
        this.schemaJson = v.toJSON();
        this.initData();
      }
    },
  },
  created(){
    this.initData();
  },
  methods: {
    initData(){
      let properties;
      //基础属性
      let bProps = this.baseProps[this.component.type];
      properties = { ...bProps };
      //组件属性
      let cProps = this.component.props;
      for(let name in cProps){
        const v = cProps[name];
        const path = v.path || 'x-component-props.' + name;
        properties[name] = { ...v, path };
      }
      //装饰器属性
      let decorator = this.schema['x-decorator'];
      if(decorator){
        decorator = this.decorators.find(item => item.name == decorator);
        if(decorator){
          let dProps = decorator.props;
          for(let name in dProps){
            const v = dProps[name];
            const obj = cloneDeep(v);
            obj.path = 'x-decorator-props.' + name;
            if(obj.type == 'enum'){//装饰器属性可以全局配置, 组件上的属性默认继承
              let inherit = '';
              obj.attrs.options.push({ value: inherit, label: '继承'});
              obj.defaultValue = inherit;
            }
            properties[name] = obj;
          }
        }
      }
      this.properties = properties;
    },
    updateSchema(){
      this.$emit('change', this.schemaJson);
    },
  }
}
</script>