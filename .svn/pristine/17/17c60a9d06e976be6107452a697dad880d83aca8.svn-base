<template>
  <div>
    <a-form :form="form">
      <a-row :gutter="24" v-for="(item,index) in value" :key="index">
        <a-col :span="7">
          <a-form-item label="考勤日期" :required="true">
            <a-range-picker
              @change="dateChange"
              v-if="item.dateStart"
              :disabled="!editor"
              v-decorator="[ `[date${index}]`,{initialValue:[moment(item['dateStart']),moment(item['dateEnd'])],rules: [{required: true,message: '请填写考勤日期'}]}]"
            ></a-range-picker>
            <a-range-picker
              v-else
              :disabled="!editor"
              @change="dateChange"
              v-decorator="[ `[date${index}]`,{rules: [{required: true,message: '请填写考勤日期'}]}]"
            ></a-range-picker>
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item label="开始时间">
            <a-time-picker
              v-if="item.startTime"
              :disabled="!editor"
              format="HH:mm"
              placeholder="开始时间"
              v-decorator="[ `[startTime${index}]`,{initialValue:moment(item['startTime'],'HH:mm:ss'),rules: [{required: true,message: '请填写开始时间'}]}]"
            />
            <a-time-picker
             :disabled="!editor"
              v-else
              format="HH:mm"
              placeholder="开始时间"
              v-decorator="[ `[startTime${index}]`,{rules: [{required: true,message: '请填写开始时间'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="7">
          <a-form-item label="结束时间" :required="true">
            <a-time-picker
             :disabled="!editor"
              v-if="item.endTime"
              format="HH:mm"
              placeholder="结束时间"
              v-decorator="[ `[endTime${index}]`,{initialValue:moment(item['endTime'],'HH:mm:ss'),rules: [{required: true,message: '请填写结束时间'}]}]"
            />
            <a-time-picker
              :disabled="!editor"
              v-else
              format="HH:mm"
              placeholder="结束时间"
              v-decorator="[ `[endTime${index}]`,{rules: [{required: true,message: '请填写结束时间'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-icon class="rowBtn" @click="addRow" type="plus-circle" />
          <a-icon
            class="rowBtn"
            @click="reduceRow(index)"
            type="minus-circle"
            v-if="value.length > 1"
          />
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { Form, Input, Row, Col, Icon } from "ant-design-vue";
import { DatePicker, TimePicker, Button } from "ant-design-vue";
import moment from "moment";
export default {
  components: {
    AForm: Form,
    AIcon: Icon,
    AFormItem: Form.Item,
    AInput: Input,
    ARow: Row,
    ACol: Col,
    ARangePicker: DatePicker.RangePicker,
    ATimePicker: TimePicker,
    AButton: Button
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "rulesForm" })
    };
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    editor:{
      type:Boolean
    }
  },
  methods: {
    moment,
    dateChange(v) {
      console.log(v);
    },
    addRow() {
      let arr = [
        ...this.value,
        {
          date: undefined,
          startTime: undefined,
          endTime: undefined
        }
      ];
      this.$emit("input", arr);
    },
    reduceRow(index) {
      this.value.splice(index, 1);
    }
  }
};
</script>
<style lang='less' scoped>
.ant-time-picker {
  width: 100%;
}
.ant-calendar-picker {
  width: 100%;
}
.rowBtn {
  font-size: 22px;
  margin-top: 42px;
  /deep/ svg {
    cursor: pointer;
  }
  &:last-child {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>