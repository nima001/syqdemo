<template>
  <div class="workflow">
    <a-form-item :label="property.showName?property.name:''" class="single" :class="{range:property.range}">
      <a-time-picker
        class="start"
        :disabled="property.editable?false:true"
        format="HH:mm"
        @openChange="timeChange"
        :placeholder="tipname"
        v-decorator="[
          `${property.code}0`,
          {
            rules: [{required: property.require, message: tipname}],
            initialValue:startTime
          }
        ]"
      ></a-time-picker>
      <a-time-picker
        class="end"
        :disabled="property.editable?false:true"
        format="HH:mm"
        @openChange="timeChange"
        placeholder="请选择结束时间"
        v-decorator="[
          `${property.code}1`,
          {
            rules: [{required: property.require, message: `请选择结束时间`}],
            initialValue:endTime
          }
        ]"
        v-if="property.range"
      ></a-time-picker>
    </a-form-item>
  </div>
</template>
<script>
import { uiConfigsCookies } from "@/framework/utils/auth";
import moment from "moment";
import { Form, DatePicker, Input, TimePicker } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "TimePicker",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      code: this.property["code"],
      formData: this.$store.getters.formData
    };
  },
  props: {
    property: {
      type: Object,
      required: true
    },
    bindform: {
      type: Object,
      required: true
    }
  },
  components: {
    AFormItem: Form.Item,
    ADatePicker: DatePicker,
    AMonthPicker: DatePicker.MonthPicker,
    ATimePicker: TimePicker,
    AInput: Input
  },
  computed: {
    tipname(){
        return this.property.range ? '请选择起始时间':"请选择时间";
    },
    startTime() {
      let time = this.$store.getters.formData[this.code];
      if (time) {
        if (time.indexOf("-")) {
          return time.split("-")[0];
        } else {
          return time;
        }
      } else {
        return null;
      }
    },
    endTime() {
      let time = this.$store.getters.formData[this.code];
      if (time) {
        if (time.indexOf("-")) {
          return time.split("-")[1];
        }
      } else {
        return null;
      }
    }
  },
  methods: {
    timeChange() {
      let obj = this.bindform.getFieldsValue();
      if (this.property.range) {
        if (obj[this.property.code+'0'] && obj[this.property.code+'1']) {
          let start = moment(obj[this.property.code+'0']).format("HH:mm");
          let end = moment(obj[this.property.code+'1']).format("HH:mm");
          this.$store.getters.formData[this.code] = `${start}-${end}`;
        }
      } else {
        this.$store.getters.formData[this.code] = moment(obj[this.property.code+'0']).format("HH:mm");
      }
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
    }
  }
};
</script>
<style lang='less' scoped>
.workflow{
    .single{
        .start{
            width: 100%;
        }
    }
    .range{
        .start{
            width: 48%;
            float: left;
        }
        .end{
            width: 48%;
            float: right;
        }
    }
}
</style>