<template>
  <a-modal title="接口详情" :visible="value" :footer="null" width="600px" @cancel="cancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="接口名称">
            <a-input :value="actionData.name" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="模块名称">
            <a-input :value="actionData.module" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="接口地址">
            <a-input :value="actionData.url" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="接口权限类型">
            <a-input :value="actionstateMap[actionData.permit]" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="接口标签">
            <a-input :value="tags" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="接口版本号">
            <a-input :value="actionData.version" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { Modal, Form, Row, Col, Input } from "ant-design-vue";
export default {
  components: {
    AModal: Modal,
    AInput: Input,
    ARow: Row,
    ACol: Col,
    AForm: Form,
    AFormItem: Form.Item,
    ATextarea: Input.TextArea
  },
  data() {
    return {
      form: this.$form.createForm(this),
      actionstateMap: {
        "0": "公开",
        "1": "登录",
        "2": "授权"
      }
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    actionData: {
      type: Object,
      required: true
    }
  },
  mounted(){
      console.log(this.actionData)
  },
  computed:{
    tags(){
      return (this.actionData.tags || []).toString()
    }
  },
  methods: {
    cancel() {
      this.$emit("input", false);
    }
  }
};
</script>
<style lang='less' scoped>
</style>