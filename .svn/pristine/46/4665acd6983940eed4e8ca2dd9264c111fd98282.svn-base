<template>
  <div class="setting-tree">
    <setting-node v-for="item in propList" :key="item.path"
      :property="item"
      :settings="settings"
    />
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api'
import SettingNode from './SettingNode'
import { getPropList } from './utils'
import { cloneDeep } from 'lodash'

// properties定义如下
// properties = {
//   key: {
//     path?: string, // 属性路径 为空将根据type和属性key生成 前面加上“.”表示当前路径 如：.page
//     type: string,  // 属性类型 'boolean' | 'number' | 'string' | 'enum' | 'object' | 'void'
//     title: string, // 属性标题
//     extra?: VueComponent,  // 扩展组件 自定义属性值输入组件（标题右侧区域）
//     content?: VueComponent,// 内容组件 自定义属性赋值复杂交互的内容（标题下方区域）
//     proxy?: string,        // 当type为object或void时可以指定代理的子属性（标题右侧输入控制子属性）
//     required: boolean,     // 是否必填
//     defaultValue: 20,      // 默认值
//     attrs: {               // 输入框其它参数（内部输入组件参数根据type而定，参考ant-design对应组件参数：Switch | InputNumber | Input | Select/Radio.Group）
//       tile: boolean,       // type为enum时 指定选项是否平铺展示
//       placeholder: string, // 提示信息
//     },
//     validator: (value, context) => { // 验证器
//       return '值错误' //返回错误信息或Promise（异步校验）
//     }, 
//     properties: {} //子属性 只有type为 object 或 void 时才有子属性
//   }
// },
export default {
  components: {
    SettingNode,
  },
  props: {
    value: Object, //v-model 
    properties: Object,
  },
  provide(){
    return {
      refresh: this.refreshSettings,
      onValueChange: this.onValueChange,
    }
  },
  data(){
    return {
      settings: {},  
    }
  },
  computed: {
    propList(){
      return reactive(getPropList(this.properties));
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v){
        if(v != this.settings){
          this.settings = v ? cloneDeep(v) : {};
        }
      }
    },
    settings: {
      deep: true,
      handler(v, oldV){
        if(v == oldV){//赋值操作不触发
          this.$emit('input', this.settings);
        }
      }
    }
  },
  methods: {
    refreshSettings(){
      this.settings = cloneDeep(this.settings);
      this.$emit('input', this.settings);
    },
    onValueChange(path, value, node){
      this.$emit('change', path, value, node)
    }
  }
}
</script>
<style lang="less" scoped>
.setting-tree{
  padding: 6px;
}
</style>