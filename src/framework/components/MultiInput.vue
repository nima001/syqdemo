<template>
  <a-select mode="tags" 
    ref="multiInput"
    :value="list"
    :labelInValue="true"
    :open="windowOpen"
    :allowClear="allowClear"
    :token-separators="[',']"
    :placeholder="placeholder"
    @deselect="onDelete"
    @change="onChange"
    @select="onSelect"
    @search="onSearch"
    @inputKeydown="onInputKeydown"
    @dropdownVisibleChange="onSelectWindowVisible"
  />
</template>
<script>
import { Select } from "ant-design-vue";

/**
 * 多个值的输入控件
 * 提供事件
 *  1.selectWindowVisible(visible) 选择窗口是否打开
 * 
 */
export default {
  name: "MultiInput",
  components: {
    ASelect: Select,
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    optionProps: {//指定tag显示key和label字段
      type: Object,
    }, 
    inputable: {//是否可输入
      type: Boolean,
      default: true,
    },
    validate: {//输入数据校验，校验成功返回数据否则返回undefined
      type: Function
    }
  },
  data(){
    return {
      list: [],
      inputValue: undefined,
      windowOpen: false,
    }
  },
  created(){
    this.list = this.value.map(item => this.convert(item));
  },
  watch: {
    value(v, oldV){
      if(v !== oldV){
        this.list = (v || []).map(item => this.convert(item));
      }
    }
  },
  methods: {
    convert(value){
      if(this.optionProps){
        let { key = 'key', label = 'label' } = this.optionProps;
        return { key: value[key], label: value[label]};
      }else{
        return { key: value };
      }
    },
    onSelectWindowVisible(open){
      this.$emit('selectWindowVisible', open);
    },
    onChange(value){//清空按钮处理
      if(value.length == 0){
        this.list = value;
        this.$emit('input', value);
      }
    },
    onDelete(value){
      let index = this.list.findIndex(item => item.key === value.key);
      if(index >= 0){
        this.value.splice(index, 1);
        this.list.splice(index, 1);
        this.$emit('input', this.value);
      }
    },
    clearSearch(){
      if(!this.vcSelect){
        this.vcSelect = this.$refs.multiInput.$children[0]; //FIXME没有对外提供清空输入框的方法
      }
      this.vcSelect.setInputValue('');
    },
    onSearch(value){
      if(this.inputable){
        this.inputValue = value;
      }else{
        this.clearSearch();
      }
    },
    onInputKeydown(e){
      if(!this.inputable){
        e.preventDefault();//无法阻止中文输入,通过onSearch清除
        return;
      }
      if(e.key == 'Enter'){//按下回车处理输入数据
        if(this.inputValue){
          this.doSelect(this.inputValue);
          this.clearSearch();    
        }
      }
    },
    onSelect(v){
      if(!this.inputable){
        return;
      }
      this.doSelect(v.key);
    },
    doSelect(key){
      let value;
      if(this.validate){
        value = this.validate(key);
      }else{
        value = key;
      }
      if(value !== undefined){
        let v = this.convert(value);
        if(!this.list.find(item => item.key === v.key)){
          this.list.push(v)
          this.value.push(value);
          this.$emit('input', this.value);
        }
      }
    },
  }
};
</script>