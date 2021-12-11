<template>
  <div>
    <a-form-item :label="property.showName?property.name:''" :required="property.require">
      <a-input-number
        :style="property.showName?'':'margin-top:29px;'"
        class="hand"
        placeholder="数字选择框"
        :disabled="property.editable?false:true"
        @change="change"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, validator:validateRules}],
            initialValue: value
          }
        ]"
      ></a-input-number>
    </a-form-item>
  </div>
</template>

<script>
import { Form, InputNumber } from "ant-design-vue";
export default {
  components: {
    AFormItem: Form.Item,
    AInputNumber: InputNumber
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
      value: null
    };
  },
  computed: {
    data() {
      return this.$store.getters.formData[this.pcode];
    }
  },
  watch: {
    data(newVal) {
      this.value = this.data[this.property.code];
      this.$emit("getData", { code: this.property.code, item: this.value });
    }
  },
  created() {
    if (
      this.$store.getters.formData[this.pcode] &&
      this.$store.getters.formData[this.pcode][this.property.code]
    ) {
      this.value = this.$store.getters.formData[this.pcode][this.property.code];
      this.relateControl(this.value);
    } else {
      if (this.property.defaultType == 2) {
        this.value = this.property.defaultContent;
        this.change(this.property.defaultContent);
      }
    }
  },
  methods: {
    //校验
    validateRules(rule, value, callback) {
      if (rule.required) {
        if (value || value == 0) {
          if (this.property.validate && this.property.validate !== "range") {
            let range = this.property.validate
              .slice(6, this.property.validate.length - 1)
              .split(",");
            let min = parseInt(range[0]);
            let max = parseInt(range[1]);
            if (min <= value && value <= max) {
              callback();
            } else {
              callback(
                "输入数字大小为" + min + "~" + max + "之间，请检查后重新输入！"
              );
            }
          } else {
            callback();
          }
        } else {
          callback("请输入" + this.property.name + "！");
        }
      } else {
        callback();
      }
    },
    change(e) {
      this.$emit("getData", { code: this.property.code, item: e });
      this.relateControl(e);
    },
    //关联控件变化
    relateControl(e) {
      let formData = {};
      let flag = false;
      this.relateControls.forEach(item => {
        if (item.relate == this.property.code) {
          flag = true;
          if (item.pcode) {
            if (this.$store.getters.formData[item.pcode]) {
              this.$set(
                this.$store.getters.formData[item.pcode],
                item.code,
                item.type == "plus" ? e + item.num : e - item.type
              );
            } else {
              let obj = {};
              obj[item.code] =
                item.type == "plus" ? e + item.num : e - item.type;
              this.$store.getters.formData[item.pcode] = obj;
            }
          } else {
            this.$store.getters.formData[item.code] =
              item.type == "plus" ? e + item.num : e - item.type;
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
<style lang="less" scoped>
</style>