<template>
  <a-modal :visible="true" width="600px" @cancel="cancel" @ok="submit">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="窗口名称">
            <a-input
              v-decorator="[
                'org',
                { rules: [{ required: true, message: '请选择窗口' }] },
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="窗口人员">
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请选择窗口人员' }] },
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="好评反馈人">
            <a-input
              v-decorator="[
                'feedbackuser',
                { rules: [{ required: true, message: '请填写好评反馈人' }] },
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="反馈人联系方式">
            <a-input
              v-decorator="[
                'contactway',
                {
                  rules: [{ required: true, message: '请填写反馈人联系方式' }],
                },
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="反馈时间">
            <a-date-picker
              :disabledDate="disabledDate"
              :style="{ width: '100%' }"
              v-decorator="[
                'feedbacktime',
                { rules: [{ required: true, message: '请选择反馈时间' }] },
              ]"
              @change="dateChange"
            ></a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="反馈内容">
            <a-input
              v-decorator="[
                'advice',
                { rules: [{ required: true, message: '请填写反馈内容' }] },
              ]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import {
  Modal,
  Form,
  Select,
  Row,
  Col,
  DatePicker,
  Input,
  TimePicker,
} from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import {
  favorablefeedbackget,
  favorablefeedbackinsert,
} from "@/hall/api/hallmanage";
import moment from "moment";
import { showError } from "@/framework/utils";
export default {
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ADatePicker: DatePicker,
    ARow: Row,
    ACol: Col,
    AInput: Input,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "schedueForm" }),
      session: this.$store.getters.session,
    };
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    record: {
      type: Object,
    },
  },
  mounted() {
    if(this.record){
      this.getData();
    }
  },
  methods: {
    getData() {
      if (this.record.id) {
        favorablefeedbackget(this.record.id)
          .then((res) => {
            res.result.feedbacktime = res.result.feedbacktime.slice(0, 11);
            this.data = res.result;
            this.$nextTick(() => {
              if (this.form ) {
                let {org,username,feedbackuser,contactway,feedbacktime,advice} = res.result;
                this.form.setFieldsValue({
                  org,
                  username,
                  feedbackuser,
                  contactway,
                  feedbacktime,
                  advice
                });
              }
            });
          })
          .catch((err) => {
            showError(err);
          });
      }
    },
    submit() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          let feedbacktime = moment(values.feedbacktime).format("YYYY-MM-DD");
          let data = { feedbacktime,...this.record, ...values };
          favorablefeedbackinsert(data)
            .then((res) => {
              let message = this.record.id ? "编辑成功!" : "添加成功";
              this.$message.success(message);
              this.$emit("finish", { type: "ok" });
            })
            .catch((err) => {
              showError(err);
            });
        }
      });
    },
    dateChange(v){
      let feedbacktime = moment(v).format("dddd");
      this.form.setFieldsValue({
        feedbacktime
      })
    },
    disabledDate(current) {
      return (
        current && current >= moment(moment().add(-1, "days")).endOf("day")
      );
    },
    cancel() {
      this.$emit("finish", { type: "cancel" });
    },
  },
};
</script>
<style lang='less' scoped>
.ant-time-picker {
  width: 100%;
}
</style>