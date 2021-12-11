<template>
  <a-modal title="退回申请" :visible="true" width="600px" @cancel="cancel" @ok="ok">
    <a-form :form="form">
      <a-form-item label="拒绝说明">
        <a-textarea
          :auto-size="{ minRows: 4, maxRows:4 }"
          v-decorator="[
              'faildesc',
              {
                rules: [{ required: true, message: '请输入拒绝说明' }],
              },
            ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Form, Input, Modal, Row, Col } from "ant-design-vue";
import { apiVerify } from "@/dev/api/service";
export default {
  components: {
    AModal: Modal,
    AModal: Modal,
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
    selectedRowKeys: {
      type: Array,
      required: true
    }
  },
  methods: {
    cancel() {
      this.$emit("callBack", { type: "cancel" });
    },
    ok() {
      this.form.validateFields((err, values) => {
        if (!err) {
          var data = {
            faildesc: values.faildesc,
            apiIdList: this.selectedRowKeys,
            appid: this.$route.query.appid,
            serviceId: this.$route.query.serviceId,
            state: 0
          };
          apiVerify(data)
            .then(res => {
              this.$notification.success({
                message: "提示",
                description: "审核完成",
                duration: 1.5
              });
              this.$emit("callBack", { type: "ok" });
            })
            .catch(err => {
              showError(err);
            });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>