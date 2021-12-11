<template>
  <a-modal
    title="编辑"
    :visible="visible"
    :destroyOnClose="true"
    :width="530"
    :bodyStyle="{padding: '24px'}"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form :form="form" layout="vertical" @submit="handleSubmit">
      <a-form-item label="奖惩时间">
        <a-month-picker
          :style="{width:'100%'}"
          v-decorator="['rpdesctime', { rules: [{ required: true, message: '请填写奖惩时间!' }] }]"
        />
      </a-form-item>
      <a-form-item label="奖惩单位">
        <a-input
          v-decorator="['rpdescorg', { rules: [{ required: false, message: '请填写奖惩单位!' }] }]"
        />
      </a-form-item>
      <a-form-item label="奖惩内容">
        <a-input
          v-decorator="['rpdesctext', { rules: [{ required: false, message: '请填写奖惩内容!' }] }]"
        />
      </a-form-item>
      <a-row>
        <a-col class="btnswrap">
          <a-button class="cancel" @click="handleCancel">取消</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import {
  Input,
  Modal,
  Form,
  DatePicker,
  Button,
  Row,
  Col
} from "ant-design-vue";
import { updateUser } from "@/person/api/user";
import moment from "moment";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "editorForm" })
    };
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    AInput: Input,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AMonthPicker: DatePicker.MonthPicker
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.form.setFieldsValue({
        rpdescorg: this.record.rpdescorg,
        rpdesctext: this.record.rpdesctext
      });
      if (this.record.rpdesctime) {
        this.form.setFieldsValue({
          rpdesctime: moment(this.record.rpdesctime)
        });
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let record = Object.assign({}, this.record, values);
          this.$emit("update", record);
        }
      });
    },
    handleCancel(e) {
      this.$emit("toggleModal", false);
    }
  }
};
</script>
<style lang="less" scoped>
.btnswrap {
  display: flex;
  justify-content: flex-end;
  .cancel {
    margin-right: @padding-xs;
  }
}
</style>