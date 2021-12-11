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
      <a-row type="flex" justify="space-between">
        <a-col :span="10">
          <a-form-item label="任职时间" style="{width:'50%'}">
            <a-month-picker
              :style="{width:'100%'}"
              v-decorator="['resumestarttime', { rules: [{ required: true, message: '请填写起始日期!' }] }]"
            />
            <!-- <a-date-picker
              :style="{width:'100%'}"
              v-decorator="['resumestarttime', { rules: [{ required: true, message: '请填写起始日期!' }] }]"
            /> -->
          </a-form-item>
        </a-col>
        <a-col class="line">
          <a-form-item label="下划线" style="{width:'50%'}">～</a-form-item>
        </a-col>
        <a-col :span="10" class="endtime">
          <a-form-item label="任职结束时间" style="{width:'50%'}">
            <!-- <a-date-picker :style="{width:'100%'}" @change="onChange" v-model="resumeendtime" /> -->
            <a-month-picker :style="{width:'100%'}" @change="onChange" v-model="resumeendtime" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="任职信息">
        <a-input
          v-decorator="['resumetext', { rules: [{ required: false, message: '请填写任职信息!' }] }]"
        />
      </a-form-item>
      <a-form-item label="职务名称">
        <a-input
          v-decorator="['resumeposition', { rules: [{ required: false, message: '请填写职务名称!' }] }]"
        />
      </a-form-item>
      <!-- <a-form-item label="连续日期">
        <a-range-picker @change="onChange" />
      </a-form-item>-->
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
      form: this.$form.createForm(this, { name: "editorForm" }),
      resumeendtime: undefined
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
    onChange(date, dateString) {
      let startTime = this.form.getFieldValue("resumestarttime");
      let type = startTime && startTime.isBefore(date);
      if (!type) {
        this.resumeendtime = undefined;
      }
    },
    initData() {
      this.form.setFieldsValue({
        resumeposition: this.record.resumeposition,
        resumetext: this.record.resumetext
      });
      if (this.record.resumestarttime) {
        this.form.setFieldsValue({
          resumestarttime: moment(this.record.resumestarttime)
        });
      }
      if (this.record.resumeendtime) {
        this.resumeendtime = moment(this.record.resumeendtime);
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let record = Object.assign(
            {},
            this.record,
            values,
            this.resumeendtime
          );
          record.resumeendtime = this.resumeendtime;
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
.line {
  /deep/.ant-form-item-label {
    visibility: hidden;
  }
  /deep/.ant-form-item-control {
    text-align: center;
  }
}
.endtime {
  /deep/.ant-form-item-label {
    visibility: hidden;
  }
}
.btnswrap {
  display: flex;
  justify-content: flex-end;
  .cancel {
    margin-right: @padding-xs;
  }
}
</style>