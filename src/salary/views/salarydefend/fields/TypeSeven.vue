<template>
  <div class="container">
    <a-date-picker disabled @change="onChange" :defaultValue="moment(defaultData.value)" />
  </div>
</template>
<script>
import moment from "moment";
import {DatePicker} from 'ant-design-vue';
export default {
  name: "TypeSeven",
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
  components:{
    ADatePicker:DatePicker
  },
  mounted() {
    if (!this.defaultData.value) {
      let date = new Date();
      let dateStr =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: dateStr
      });
    }
  },
  methods: {
    moment,
    onChange(dateString) {
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: dateString
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  flex: 1;
  .ant-calendar-picker {
    width: 100%;
  }
}
</style>