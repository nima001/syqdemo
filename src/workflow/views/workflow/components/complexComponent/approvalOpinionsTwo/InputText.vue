<template>
  <div>
    <a-form-item :label="property.showName?property.name:''">
      <a-input
        :style="property.showName?'':'margin-top:29px;'"
        class="hand"
        :id="property.code"
        placeholder="请填写文本"
        @change="change"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required:property.require,message:`请填写文本！`}],
            initialValue: value
          }
        ]"
      ></a-input>
    </a-form-item>
  </div>
</template>

<script>
import { Form, Input } from "ant-design-vue";
import { debounce } from "@/framework/utils/index";
export default {
  components: {
    AFormItem: Form.Item,
    AInput: Input
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
      value: ""
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
  methods: {
    change: debounce(function(e) {
      this.$emit("getData", { code: this.property.code, item: e.target.value });
      this.relateControl(e.target.value);
    }, 300),
    //关联控件变化
    relateControl(val) {
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
                val
              );
            } else {
              let obj = {};
              obj[item.code] = val;
              this.$store.getters.formData[item.pcode] = obj;
            }
          } else {
            this.$store.getters.formData[item.code] = val;
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
        this.$emit("getData", {
          code: this.property.code,
          item: this.property.defaultContent
        });
        this.relateControl(this.property.defaultContent);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>