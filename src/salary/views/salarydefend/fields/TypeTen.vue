<template>
  <a-select
    mode="multiple"
    :size="size"
    placeholder="请选择(多选)"
    style="width: 200px"
    v-model="defaultData.value"
    @change="handleChange"
    disabled
  >
    <a-select-option v-for="item in keyList" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
  </a-select>
</template>
<script>
import { Select } from "ant-design-vue";
export default {
  name: "TypeTen",
  data() {
    return {
      size: "default"
    };
  },
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
    ASelect: Select,
    ASelectOption: Select.Option
  },
  computed: {
    keyList() {
      return this.$store.getters.dict(this.defaultData.field.datasource) || [];
    }
  },
  methods: {
    handleChange(value) {
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>