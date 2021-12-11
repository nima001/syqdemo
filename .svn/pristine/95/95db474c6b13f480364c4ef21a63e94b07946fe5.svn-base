<template>
  <a-modal title="服务详情" :visible="value" :footer="null" width="600px" @cancel="cancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="服务名称">
            <a-input :value="serviceDetails.name" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="服务编码">
            <a-input :value="serviceDetails.code" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="服务来源">
            <a-input :value="serviceDetails.from == 0 ? '平台' : '第三方'" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="服务地址">
            <a-input :value="serviceDetails.url" :read-only="true"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="服务描述">
            <a-textarea v-model="serviceDetails.desc" :auto-size="{ minRows: 4, maxRows: 4 }" :read-only="true"></a-textarea>
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
      form: this.$form.createForm(this)
    };
  },
  props: {
    value: {
      type: Boolean
    },
    serviceDetails: {
      type: Object
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
//@import url(); 引入公共css类
</style>