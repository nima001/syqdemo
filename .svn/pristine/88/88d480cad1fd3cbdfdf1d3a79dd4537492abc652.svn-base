<template>
  <div class="container">
    <a-date-picker @change="onChange" :defaultValue="moment(dates[0])" />
    <a-date-picker
      :style="{marginLeft:'15px'}"
      @change="onChangeTwo"
      :defaultValue="moment(dates[1])"
      disabled
    />
  </div>
</template>
<script>
import moment from "moment";
import { DatePicker } from "ant-design-vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "TypeSix",
  props: {
    position: {
      type: String,
      required: true
    },
    defaultData: {
      type: Object,
      required: true
    }
  },
  components: {
    ADatePicker: DatePicker
  },
  computed: {
    dates() {
      if (this.defaultData.value) {
        return this.defaultData.value;
      } else {
        return [];
      }
    }
  },
  mounted() {
    if (!this.defaultData.value) {
      let date = new Date();
      let dateStr =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      let dates = [moment(dateStr), moment(dateStr)];
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: dates
      });
    }
  },
  methods: {
    moment,
    onChange(dateString) {
      let dates = cloneDeep(this.defaultData.value);
      dates.splice(0, 1, dateString);
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: dates
      });
    },
    onChangeTwo(dateString) {
      let dates = cloneDeep(this.defaultData.value);
      dates.splice(1, 1, dateString);
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: dates
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  flex: 2;
  display: flex;
  .ant-calendar-picker {
    flex: 1;
  }
}
</style>