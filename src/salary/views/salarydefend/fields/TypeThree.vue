<template>
  <div class="container">
    <a-input disabled placeholder="请输入" v-model="dates[0]" type="number" @change="handleChange" />
    <a-input disabled placeholder="请输入" v-model="dates[1]" type="number" @change="handleChangeTwo" :style="{marginLeft:'15px'}" />
  </div>
</template>
<script>
import {Input} from 'ant-design-vue';
export default {
  name: "TypeThree",
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
    AInput:Input
  },
  data() {
    return {
      dates: []
    };
  },
  mounted() {
    this.dates = this.defaultData.value ? this.defaultData.value : [];
  },
  methods: {
    handleChange(e) {
      let value = parseInt(e.target.value);
      this.$set(this.dates, 0, value);
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: this.dates
      });
    },
    handleChangeTwo(e) {
      let value = parseInt(e.target.value);
      this.$set(this.dates, 1, value);
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value: this.dates
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  flex: 1;
  display: flex;
}
</style>