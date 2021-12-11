<template>
  <div class="form-design-display">
    <div class="form-body" :style="bodyStyle" ref="formBody">
      <a-form :class="{anchorForm: showAnchor}" :form='form'>
        <template v-for="(item,index) in formConfig">
          <template v-if="show(item)">
            <slot v-if="isSlotComp(item)" :name="item.type" v-bind="item" />
            <component v-else :is="item.type" :key="index" v-bind="item" />
          </template>
        </template>
      </a-form>
    </div>
    <a-anchor v-if="showAnchor && titleBars && titleBars.length > 1" wrapperClass="form-anchor" :getContainer="() => $refs.formBody">
      <a-anchor-link v-for="(item,index) in titleBars"  :href="`#${item.code}`" :title="item.name" :key="index"/>
    </a-anchor>
  </div>
</template>
<script>
import { Form, Anchor ,Spin} from "ant-design-vue";
import { components, initDataProps, mixin } from "./common";
import cloneDeep from 'lodash/cloneDeep';
import Bus from "@/framework/utils/EventBus";
import Vue from "vue";
import {get,set} from 'lodash';
export default {
  name: "form-design-display",
  components: {
    AForm: Form,
    AAnchor: Anchor,
    AAnchorLink: Anchor.Link,
    ASpin:Spin,
    ...components
  },
  mixins: [mixin],
  props: {
    // 表单配置项
    formConfig: {
      type: Array
    },
    // 表单初始化数据
    formData: {
      type: Object,
      default: () => {}
    },
    showAnchor: {
    //是否显示锚点
      type: Boolean,
      default: true
    },
    // 是否可操作页面(默认可以操作/true)
    editor:{
      type:Boolean,
      default: true
    },
    // 表单布局 horizontal,vertical(默认)
    formLayout:{
      type :String
    },
    bodyStyle: Object
  },
  data() {
    return {
			form: this.$form.createForm(this, { name: 'formRender' }),
      initFormData: initDataProps(cloneDeep(this.formData), this.formConfig),
    };
  },  
  watch:{
    formData:{
      handler(v){
        this._provided.formData.data = initDataProps(v, this.formConfig)
      },
      deep:true
    },
    formConfig:{
      handler(v1,v2){
        this._provided.formData.data = initDataProps(cloneDeep(this.formData), v1)
        this._provided.formData.formConfig = this.formConfig;
      },
      deep:true
    },
    editor(v){
      this._provided.formData.editor = v;
      if(!v){//取消编辑恢复数据
        this._provided.formData.data = initDataProps(cloneDeep(this.formData), this.formConfig)
      }
    },
    formLayout(){
      this._provided.formData.formLayout = this.formLayout
    }
  },
  provide() {
    /**
     * provide/inject绑定是不可响应的，
     * 如果传入一个可监听对象，对象属性是可响应的
     * 
     * formData  : 表单数据
     */
    const _this = this;
    return {
      formData: new Vue({
        data() {
          return { 
            // 初始化表单数据
            data: cloneDeep( _this.initFormData),
            // 收集表单元素
            formItem: [],
            // 表单页面是否可编辑
            editor: _this.editor,
            // 表单布局
            formLayout: _this.formLayout,
            // 表单配置
            formConfig: _this.formConfig
          };
        }
			}),
			form:this.form,
      createCmpt(cmpt, elementBuilder) {
        return _this.createComponent(cmpt, elementBuilder);
      }
    };
  },
  computed: {
    titleBars() {
      //获取表单的title
      let bars = [];
      let _this = this;
      (function findBar(cmpts) {
        (cmpts || []).forEach(c => {
          if (c.type == "titleBar") {
            // 表单块 联动
            if(_this.show(c)){
              bars.push(c);
            }
          } else if (c.children) {
            c.children.forEach(ele => findBar(ele.components));
          }
        });
      })(this.formConfig);
      return bars;
    }
  },
  methods: {
    // 表单提交(返回表单上允许修改的字段，对象或对象列表单个字段允许修改，需要返回整个对象或列表？)
    submit() {
      return this.collectValidateMsg().then(errors => {
          if(errors.length){//存在错误返回reject
            return Promise.reject(errors);
          }else{
            let initFormData = this._provided.formData.data
            let submitArr = {};
            //FIXME sunwen 验证表单收集数据方案待优化，这里临时处理收集需要提交的数据
            //优化方案：数据收集直接由组件validate方法处理，权利下放，方便组件扩展
            let formList = this._provided.formData.formItem;
            formList.forEach((item) => {
              if(!item.disabled){
                let key = item.code;
                set(submitArr, key, get(initFormData, key))
              }
            })
            // for(let key in initFormData){
            //   let value = initFormData[key];
            //   //FIXME 验证表单收集数据方案待优化，这里临时处理
            //   //表单字段数据清空时，设置为null, undefined说明没有组件处理该字段
            //   if(value !== undefined ){
            //     submitArr[key] = initFormData[key];
            //     set(submitArr, key, value)
            //   }
            // }
            return Promise.resolve(submitArr)
          }
      });
    },
    // 收集表单验证信息
    collectValidateMsg(){
      // 表单项目
      let formList = this._provided.formData.formItem;
      let validator = [];
      (formList || []).forEach(ele => {
        if(ele.validateField){
          validator.push(ele.validateField());
        }
      });
      return Promise.all(validator).then(result => {
        let arr = [];
        result.forEach(item => {
          if(Array.isArray(item)){
            arr = [...arr, ...item];
          }else if(item){
            arr.push(item);
          }
        })
        return arr;
      });
    },
  }
};
</script>
<style lang="less" scoped>
.form-design-display {
  position: relative;
  height: 100%;
  background: @white;
  .form-body {
    height: 100%;
    padding: 0 @content-padding-h;
    overflow-y: auto;
    .anchorForm.ant-form {
      padding-right: 200px;
      .ant-spin{
        width: 100%;
      }
    }
  }
  /deep/.form-anchor {
    position: absolute;
    top: 50px;
    right: @content-padding-h;
    width: 180px;
    padding-left: 5px;
    z-index: 4;
  }
}
</style>