<template>
  <a-modal :visible="visible" 
    :title="title" 
    :confirmLoading="submitting" 
    @ok="onOk"
    @cancel="onCancel"
    :bodyStyle="{paddingBottom: '5px'}" 
  >
    <a-form-item v-bind="status">
      <a-input v-model="inputValue" 
        :placeholder="placeholder" 
        allowClear
        @focus="status = {validateStatus: 'success', help: undefined}"
        ref="nameInput"
      />  
    </a-form-item>
  </a-modal>
</template>
<script>
import { Modal, Form, Input } from 'ant-design-vue';

/**
 * 名称输入
 */
export default {
  components: {
    AModal: Modal,
    AFormItem: Form.Item,
    AInput: Input,
  },
  model: {
    prop: 'show',
  },
  props: {
    show: Boolean, //v-model
    title: String,
    value: String,
    placeholder: String,
    callback: {//如果是回调方法返回Promise对象提交按钮将显示加载动画
      type: Function,
    }
  },
  data(){
    return {
      visible: false,
      submitting: false,
      inputValue: undefined,
      status: {
        validateStatus: 'success',
        help: undefined,
      },
    }
  },
  watch:{
    show: {
      immediate: true,
      handler(show){
        this.visible = show;
        if(show){
          this.inputValue = this.value;//窗口打开时初始化数据
          this.$nextTick(() => {
            this.$refs.nameInput.focus();
          })
        }
      }
    },
    visible(show){
      this.$emit('input', show);
    },
    value: {
      immediate: true,
      handler(v){
        this.inputValue = v;
      }
    }
  },
  methods: {
    onOk(){
      if(!this.callback){
        return
      }
      let rt = this.callback(this.inputValue);
      if(rt){
        if(rt instanceof Promise){
          this.submitting = true;
          rt.then(() => {
            this.visible = false;
          }).catch(error => {
            this.status = { validateStatus: 'error', help: error }  
          }).finally(() => {
            this.submitting = false;
          })
        }else{
          this.status = { validateStatus: 'error', help: rt }
        }
      }else{
        this.visible = false;
      }
    },
    onCancel(){
      if(!this.submitting){//还在提交中不能关闭窗口
        this.visible = false;
      }
    }
  }
}
</script>