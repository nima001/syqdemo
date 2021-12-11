<template>
  <div class="number-section-panel">
    <div class="header">
      <div class="left"></div>
      <div class="right"><a-button type="primary" @click="addGroup"><a-icon type="plus"/>添加分组</a-button></div>
    </div>
    <div class="body">
      <div v-for="(item, index) in section.items" :key="index" class="group">
        <div class="name">
          <a-form-item v-bind="getError(index, 'name')">
            <a-input v-model="item.name" placeholder="分组名称" style="vertical-align:top;"/>
          </a-form-item>
        </div>
        <div class="start">
          <a-form-item v-bind="getError(index, 'start')">
            <a-input-group compact>
              <section-value v-model="item.start" 
                :is-date="isDate" 
                :fill-end="!item.startEq"
                :placeholder="item.start ? '' : '无限制'" 
                style="width:calc(100% - 36px)"
              />
              <a-select v-model="item.startEq" style="width:36px" :showArrow="false">
                <a-select-option :value="0">&lt;</a-select-option>
                <a-select-option :value="1">≤</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-item>
        </div>
        <div style="line-height:32px;">值</div>
        <div class="end">
          <a-form-item v-bind="getError(index, 'end')">
            <a-input-group compact>
              <a-select v-model="item.endEq" style="width:36px" :showArrow="false">
                <a-select-option :value="0">&lt;</a-select-option>
                <a-select-option :value="1">≤</a-select-option>
              </a-select>
              <section-value v-model="item.end" 
                :is-date="isDate"
                :fill-end="!!item.endEq"
                :placeholder="item.end ? '' : '无限制'" 
                style="width:calc(100% - 36px)"
              />
            </a-input-group>
          </a-form-item>
        </div>
        <div class="opts">
          <a-icon type="delete" @click="removeItem(index)"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <a-checkbox v-model="section.other">未分组的值分到</a-checkbox>
        <a-input v-model="section.otherName" placeholder="其它" style="width:150px"/>
      </div>
      <div class="right">
        <a-button @click="onCancel" style="margin-right:10px;">取消</a-button>
        <a-button type="primary" @click="onOk">确定</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Input, Select, Checkbox, Button, Icon, Form } from 'ant-design-vue'
import SectionValue from './SectionValue'
import cloneDeep from 'lodash/cloneDeep'

/**
 * 区间设置
 */
export default {
  components: {
    AInput: Input,
    AInputGroup: Input.Group,
    ASelect: Select,
    ASelectOption: Select.Option,
    ACheckbox: Checkbox,
    AButton: Button,
    AIcon: Icon,
    AFormItem: Form.Item,
    SectionValue,
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        items: [],
        other: true,
        otherName: undefined
      })
    },
    isDate: {//是否是时间类型，否则为数字
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {
      section: undefined,
      errors: undefined,
    }
  },
  created(){
    this.initData();
  },
  watch: {
    value(newVal){
      if(newVal !== this.section){//当触发input事件导致值变更，不执行initData
        this.initData();
      }
    }
  },
  methods:{
    initData(){
      this.section = Object.assign({ items: [], other: true, otherName: undefined }, cloneDeep(this.value));
      this.section.items.forEach(item => {
        item.startEq = item.startEq ? 1 : 0;
        item.endEq = item.endEq ? 1 : 0;
      });
    },
    onCancel(){
      this.$emit('cancel');
    },
    onOk(){
      let {items, other, otherName} = this.section;
      if(!items || !items.length){
        this.$message.error("请添加分组")
        return;
      }
      this.errors = this.validateItems(items);
      this.section.items = [...this.section.items];//刷新列表
      if(this.errors){
        return;
      }
      if(!otherName){
        this.section.otherName = '其它';
      }
      this.$emit('input', this.section);
    },
    addGroup(){
      this.section.items.push({
        name: undefined, 
        start: undefined, 
        startEq: 1, 
        end: undefined, 
        endEq: 0
      })
    },
    removeItem(index){
      this.section.items.splice(index, 1);
    },
    getError(index, key){
      let error;
      if(this.errors){
        let e = this.errors[index];
        if(e){
          error = e[key];
        }
      }
      return error || {validateStatus: 'success', help: undefined};
    },
    validateItems(items){
      let errors = [], i = 0, len = items.length;
      //验证自身数据
      for(; i < len; i++){
        let item = items[i];
        let error = {};
        if(!item.name){
          error.name = {validateStatus: 'error', help: '请输入分组名称'};
        }
        if(item.start && item.end){
          if(item.start > item.end){
            error.end = {validateStatus: 'error', help: '开始值不能大于结束值'};
          }else if(item.start == item.end){
            if(!item.startEq){
              error.start = {validateStatus: 'error', help: '请设置比较符为“≤”'};
            }
            if(!item.endEq){
              error.end = {validateStatus: 'error', help: '请设置比较符为“≤”'};  
            }
          }
        }
        if(Object.keys(error).length){
          errors[i] = error;
        }
      }
      if(errors.length){
        return errors;
      }
      //和其它项比较
      i = 0;
      for(; i < len; i++){
        let item = items[i];
        let start = item.start, startEq = item.startEq, end = item.end, endEq = item.endEq;
        for(let j = 0; j < i; j++){
          let c = items[j];
          let s = c.start, sEq = c.startEq, e = c.end, eEq = c.endEq;
          let conflict, key = 'end';
          if(!start){
            conflict = !s || !end || end > s || (end == s && endEq && sEq);
            key = 'start';
          }else if(!s || s < start){
            conflict = !e || e > start || (e == start && eEq && startEq);
            key = 'start';
          }else if(start < s){
            conflict = !end || end > s || (end == s && endEq && sEq);
          }else{//start == s 时必须有一个start == end
            conflict = (start != end || sEq) && (s != e || startEq);
            key = 'start';
          }
          if(conflict){
            let errors = [];
            errors[i] = {
              [key]: {validateStatus: 'error', help: "和区间" + c.name + "冲突"}
            };
            return errors;
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.number-section-panel{
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .header{
    flex: none;
    padding: @content-padding-v @content-padding-h;
    .left{
      float: left;
    }
    .right{
      float: right;
    }
  }
  & > .body{
    flex: auto;
    padding: @content-padding-v @content-padding-h;
    overflow-y: auto;
    .group{
      display: flex;
      & > .name{
        flex: 1 1 33%;
      }
      & > .start{
        flex: 1 1 33%;
        margin: 0 10px;
      }
      & > .end{
        flex: 1 1 33%;
        margin-left: 10px;
      }
      & > .opts{
        flex: none;
        line-height: 32px;
        padding-left: 4px;
        .anticon{
          padding: 4px;
          cursor: pointer;
          &:hover{
            color: @primary-color;
          }
        }
      }
    }
  }
  & > .footer{
    flex: none;
    padding: 12px @content-padding-h;
    border-top: 1px solid @border-color-base;
    .left{
      float: left;
    }
    .right{
      float: right;
    }
  }
}
</style>