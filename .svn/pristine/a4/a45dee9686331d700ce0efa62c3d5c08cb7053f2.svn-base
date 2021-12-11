<template>
  <div class="wrap">
    <a-form-item label="名称：" :required="true">
      <a-input v-model="value.name" placeholder="模板名称" />
    </a-form-item>
    <a-form-item label="分组：">
      <a-input v-model="value.sort" placeholder="模板分组" />
    </a-form-item>
    <!-- <a-form-item label="统计对象：">
      <a-select placeholder="选择统计对象" style="width:100%"></a-select>
    </a-form-item> -->
    <a-form-item label="单元格合并规则：" v-if="mergeRule && mergeRule.show">
      <a-input prefix="左" :read-only="true" 
        :value="mergeRule.data['merge-left']"
        :title="mergeRule.data['merge-left']" 
        @click="$emit('editmergerule', 'merge-left')"
      />
      <a-input prefix="上" :read-only="true" 
        :value="mergeRule.data['merge-top']" 
        :title="mergeRule.data['merge-top']" 
        @click="$emit('editmergerule', 'merge-top')"
      />
      <a-input prefix="右" :read-only="true" 
        :value="mergeRule.data['merge-right']" 
        :title="mergeRule.data['merge-right']" 
        @click="$emit('editmergerule', 'merge-right')"
      />
      <a-input prefix="下" :read-only="true" 
        :value="mergeRule.data['merge-bottom']" 
        :title="mergeRule.data['merge-bottom']" 
        @click="$emit('editmergerule', 'merge-bottom')"
      />
    </a-form-item>
  </div>
</template>
<script>
import { Form, Input, Select } from "ant-design-vue";

export default {
  name: "PropertyComp",
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    mergeRule: {
      type: Object,
      default: () => {}
    },
  }
};
</script>
<style lang="less" scoped>
.wrap {
  padding: 15px 15px 7px;
}
</style>