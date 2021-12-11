<template>
  <a-select
    :size="size"
    placeholder="请选择(单选)"
    v-model="defaultData.value"
    style="width: 200px"
    @change="handleChange"
    disabled
  >
    <a-select-option v-for="item in keyLisy" :key="item.value" :value="item.value">{{item.text}}</a-select-option>
  </a-select>
</template>
<script>
import { Select } from "ant-design-vue";
export default {
  name: "TypeEleven",
  data() {
    return {
      size: "default",
      list: []
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
    keyLisy() {
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