<template>
  <a-col>
    <a-col :span="this.child.jobtitle?8:10">
      <a-form-item>
        <div style="display:flex">
          <a-month-picker
            :disabledDate="disabledStartDate"
            :disabled="startDisable"
            format="YYYY-MM"
            v-model="startValue"
            placeholder="开始时间"
            @openChange="handleStartOpenChange"
            @change="startDate"
            :getCalendarContainer="triggerNode => triggerNode.parentNode"
          />
          <span style="line-height:32px;margin:0 10px;">-</span>
          <a-month-picker
            v-if="flag"
            :disabledDate="disabledEndDate"
            :disabled="property.editable?false:true"
            format="YYYY-MM"
            placeholder="结束时间"
            v-model="endValue"
            :open="endOpen"
            @change="endDate"
            @openChange="handleEndOpenChange"
            :getCalendarContainer="triggerNode => triggerNode.parentNode"
          ></a-month-picker>
        </div>
      </a-form-item>
    </a-col>
    <a-col :span="this.child.jobtitle?8:10">
      <a-form-item>
        <a-textarea
          :disabled="property.editable?false:true"
          class="hand"
          @change="inputExperience"
          placeholder="任职信息"
          v-model="experience"
          :rows="1"
        />
      </a-form-item>
    </a-col>
    <a-col :span="4" v-if="this.child.jobtitle">
      <a-form-item>
        <a-input
          :disabled="property.editable?false:true"
          class="hand"
          @change="inputJobTitle"
          placeholder="职务名称"
          v-model="jobtitle"
        />
      </a-form-item>
    </a-col>
  </a-col>
</template>

<script>
import moment from "moment";
import { Form, Row, Col, Input, DatePicker, Button } from "ant-design-vue";
import { debounce } from "@/framework/utils/index";
export default {
  props: ["property", "child", "item", "index", "len", "starttimes"],
  data() {
    return {
      obj: {},
      experience: "",
      startValue: undefined,
      endValue: undefined,
      jobtitle: "",
      endOpen: false,
      startDisable: false,
      flag: true
    };
  },
  components: {
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ATextarea: Input.TextArea,
    AMonthPicker: DatePicker.MonthPicker,
    AButton: Button
  },
  computed: {
    lastEndTime() {
      return this.starttimes[this.index - 1]
        ? this.starttimes[this.index - 1]
        : undefined;
    }
  },
  watch: {
    lastEndTime: {
      handler(newval) {
        if (this.property.continuousTime) {
          this.$nextTick(function() {
            if (this.index !== 0) {
              this.startValue = newval ? moment(newval) : undefined;
              this.get(this.child.starttime, newval);
            }
            if (this.startValue > this.endValue) {
              this.$message.error(
                "本条简历的结束时间小于或等于开始时间，请重新填写！"
              );
              this.endValue = undefined;
              this.$emit("changeTimesArr", {
                idx: this.index,
                data: this.endValue
              });
            }
          });
        }
      },
      immediate: true
    }
  },
  created() {
    this.startValue = this.item[this.child.starttime]
      ? moment(this.item[this.child.starttime])
      : undefined;
    this.endValue = this.item[this.child.endtime]
      ? moment(this.item[this.child.endtime])
      : undefined;
    this.experience = this.item[this.child.content];
    this.jobtitle = this.item[this.child.jobtitle];
    this.obj = this.item;
    if (this.property.editable) {
      if (this.property.continuousTime) {
        if (this.index == 0) {
          this.startDisable = false;
        } else {
          this.startDisable = true;
        }
      } else {
        this.startDisable = false;
      }
    } else {
      this.startDisable = true;
    }
  },
  methods: {
    //给父传值
    get(type, value) {
      this.obj[type] = value;
      if (
        (this.index !== this.len - 1 &&
          this.obj[this.child.starttime] &&
          this.obj[this.child.endtime] &&
          this.obj[this.child.content]) ||
        (this.index == this.len - 1 &&
          this.obj[this.child.starttime] &&
          this.obj[this.child.content])
      ) {
        this.$emit("changeHandle", {
          idx: this.index,
          obj: this.obj
        });
      } else {
        this.$emit("isAll", value);
      }
    },
    //选择开始时间后给表单传值
    startDate(date, dateString) {
      this.get(this.child.starttime, dateString);
      this.$emit("isAll", dateString);
    },
    //选择结束时间后给表单传值
    endDate(date, dateString) {
      this.get(this.child.endtime, dateString);
      if (this.property.continuousTime) {
        this.$emit("changeTimesArr", {
          idx: this.index,
          data: dateString
        });
      }
      if (this.index !== this.len - 1) {
        this.$emit("isAll", dateString);
      }
    },
    //填写经历后给表单传值
    inputExperience(e) {
      this.get(this.child.content, e.target.value);
      this.$emit("isAll", e.target.value);
    },
    //填写任职名称给表单传值
    inputJobTitle(e) {
      this.get(this.child.jobtitle, e.target.value);
    },
    //日期限制
    disabledStartDate(startValue) {
      return startValue > this.moment();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return (
        startValue.valueOf() >= endValue.valueOf() ||
        endValue.valueOf() >= this.moment()
      );
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    moment
  }
};
</script>