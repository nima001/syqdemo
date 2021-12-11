<template>
  <div style="position:relative">
    <a-form-item :label="property.showName?property.name:''">
      <a-switch
        :style="property.showName?'':'margin-top:29px;'"
        :id="property.code"
        @change="changeHandler"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [
            {required: property.require, message: `请选择${property.name}!`}],
            valuePropName: 'checked',
            initialValue: $store.getters.formData[property.code]?$store.getters.formData[property.code]:false
          }
        ]"
      />
    </a-form-item>
  </div>
</template>

<script>
import {Form,Switch} from 'ant-design-vue';
export default {
  name: "SwitchBox",
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
  components:{
    AFormItem:Form.Item,
    ASwitch:Switch
  },
  data() {
    return {
      code: this.property["code"],
      formData: this.$store.getters.formData
    };
  },
  created() {
    if (!this.formData[this.code]) {
      this.formData[this.code] = this.property.defaultContent;
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.formData
      });
    }
  },
  methods: {
    changeHandler(val) {
      this.$store.getters.formData[this.code] = val;
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>