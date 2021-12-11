<template>
  <div>
    <a-form-item :label="property.showName?property.name:''">
      <a-date-picker
        :style="property.showName?'':'margin-top:29px;'"
        v-if="property.format=='YYYY-MM-DD' || property.format=='YYYY-MM-DD hh:mm:ss' || !property.format"
        class="hand"
        :disabledDate="disabledRange"
        :showTime="property.format=='YYYY-MM-DD hh:mm:ss'?true:false"
        :format="property.format?property.format:'YYYY-MM-DD'"
        placeholder="请选择日期"
        :getCalendarContainer="triggerNode => triggerNode.parentNode"
        @change="changeHandler"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue:date
          }
        ]"
      ></a-date-picker>
      <a-month-picker
        :style="property.showName?'':'margin-top:29px;'"
        v-if="property.format=='YYYY-MM'"
        :disabledDate="disabledRange"
        class="hand"
        placeholder="请选择日期"
        :getCalendarContainer="triggerNode => triggerNode.parentNode"
        @change="changeHandler"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue:date
          }
        ]"
      ></a-month-picker>
    </a-form-item>
  </div>
</template>

<script>
import moment from "moment";
import { Form, DatePicker } from "ant-design-vue";
export default {
  components: {
    AFormItem: Form.Item,
    ADatePicker: DatePicker,
    AMonthPicker: DatePicker.MonthPicker
  },
  props: {
    bindform: {
      type: Object,
      required: true
    },
    property: {
      type: Object,
      required: true
    },
    pcode: {
      type: String
    },
    relateControls: {
      type: Array
    }
  },
  data() {
    return {
      date: {}
    };
  },
  computed: {
    data() {
      return this.$store.getters.formData[this.pcode];
    }
  },
  watch: {
    data(newVal) {
      this.date = this.data[this.property.code]
        ? moment(this.data[this.property.code], this.property.format)
        : undefined;
      this.$emit("getData", {
        code: this.property.code,
        item: this.data[this.property.code]
      });
    }
  },
  created() {
    this.date = undefined;
    if (
      this.$store.getters.formData[this.pcode] &&
      this.$store.getters.formData[this.pcode][this.property.code]
    ) {
      this.date = moment(
        this.$store.getters.formData[this.pcode][this.property.code],
        this.property.format
      );
      this.relateControl(this.date);
    } else {
      let defaultType = this.property.defaultType;
      if (defaultType == 2) {
        this.date = this.moment();
        this.$emit("getData", {
          code: this.property.code,
          item: moment().format(this.property.format)
        });
      } else if (defaultType == 3) {
        this.date = moment(this.property.defaultContent, this.property.format);
        this.$emit("getData", {
          code: this.property.code,
          item: moment(this.date).format(this.property.format)
        });
      } else {
        this.date = undefined;
      }
    }
  },
  methods: {
    moment,
    changeHandler(date, dateString) {
      this.$emit("getData", { code: this.property.code, item: dateString });
      this.relateControl(dateString);
    },
    //时间范围限制
    disabledRange(val) {
      if (this.property.range) {
        let start = moment(this.property.range[0], this.property.format);
        let end = moment(this.property.range[1], this.property.format);
        return (
          val.valueOf() >= end.valueOf() || val.valueOf() <= start.valueOf()
        );
      }
    },
    //关联控件变化
    relateControl(e) {
      let formData = {};
      let flag = false;
      this.relateControls.forEach(item => {
        if (item.relate == this.property.code && e) {
          flag = true;
          if (item.type == "plus") {
            if (item.date == "days") {
              if (item.pcode) {
                if (this.$store.getters.formData[item.pcode]) {
                  this.$set(
                    this.$store.getters.formData[item.pcode],
                    item.code,
                    moment(e)
                      .add(item.num, "days")
                      .format(this.property.format)
                  );
                } else {
                  let obj = {};
                  obj[item.code] = moment(e)
                    .add(item.num, "days")
                    .format(this.property.format);
                  this.$store.getters.formData[item.pcode] = obj;
                }
              } else {
                this.$store.getters.formData[item.code] = moment(e)
                  .add(item.num, "days")
                  .format(this.property.format);
              }
            } else {
              if (item.pcode) {
                if (this.$store.getters.formData[item.pcode]) {
                  this.$set(
                    this.$store.getters.formData[item.pcode],
                    item.code,
                    moment(e)
                      .add(item.num, "months")
                      .format(this.property.format)
                  );
                } else {
                  let obj = {};
                  obj[item.code] = moment(e)
                    .add(item.num, "months")
                    .format(this.property.format);
                  this.$store.getters.formData[item.pcode] = obj;
                }
              } else {
                this.$store.getters.formData[item.code] = moment(e)
                  .add(item.num, "months")
                  .format(this.property.format);
              }
            }
          } else {
            if (item.date == "days") {
              if (item.pcode) {
                if (this.$store.getters.formData[item.pcode]) {
                  this.$set(
                    this.$store.getters.formData[item.pcode],
                    item.code,
                    moment(e)
                      .subtract(item.num, "days")
                      .format(this.property.format)
                  );
                } else {
                  let obj = {};
                  obj[item.code] = moment(e)
                    .subtract(item.num, "days")
                    .format(this.property.format);
                  this.$store.getters.formData[item.pcode] = obj;
                }
              } else {
                this.$store.getters.formData[item.code] = moment(e)
                  .subtract(item.num, "days")
                  .format(this.property.format);
              }
            } else {
              if (item.pcode) {
                if (this.$store.getters.formData[item.pcode]) {
                  this.$set(
                    this.$store.getters.formData[item.pcode],
                    item.code,
                    moment(e)
                      .subtract(item.num, "months")
                      .format(this.property.format)
                  );
                } else {
                  let obj = {};
                  obj[item.code] = moment(e)
                    .subtract(item.num, "months")
                    .format(this.property.format);
                  this.$store.getters.formData[item.pcode] = obj;
                }
              } else {
                this.$store.getters.formData[item.code] = moment(e)
                  .subtract(item.num, "months")
                  .format(this.property.format);
              }
            }
          }
        }
      });
      if (flag) {
        this.bindform.resetFields();
        formData = Object.assign({}, this.$store.getters.formData);
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: formData
        });
      }
    }
  }
};
</script>