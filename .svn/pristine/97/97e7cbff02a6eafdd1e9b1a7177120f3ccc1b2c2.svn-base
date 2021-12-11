<template>
  <div class="workflow">
    <a-form-item :label="property.showName?property.name:''">
      <a-checkbox-group
        :style="property.showName?'':'margin-top:29px;'"
        class="hand"
        :class="property.code"
        @change="changeHandler"
        @blur.native.capture="onblur"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请选择${property.name}!`}],
            initialValue:arr
          }
        ]"
      >
        <a-checkbox
          v-for="item in plainOptions"
          :key="item.value"
          :value="item.value"
          :disabled="(!arr.includes(item.value) && checkboxNum >= property.maxNum && property.maxNum!==0)"
        >{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <stamp
      :property="property"
      @imgUrl="getStamp"
      v-if="property.signcomponent.signcode && property.signcomponent.editable"
    ></stamp>
    <a-form-item class="stampNotice" v-if="!imgUrl && property.signcomponent.signcode">
      <a-input
        type="hidden"
        v-decorator="[
          `${property.signcomponent.code}`,
          {
            rules: [{required: property.signcomponent.require, message: `请选择签章!`}],
            initialValue: stamp
          }
        ]"
      ></a-input>
    </a-form-item>
    <div class="seal" v-if="imgUrl">
      <img :src="imgUrl" />
    </div>
  </div>
</template>
<script>
import { stringify } from "querystring";
import Stamp from "./stampComponent/Stamp";
import { getStampInfo } from "@/workflow/api/stamplist";
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/workflow.css";
import { Form, Checkbox, Input } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "CheckBox",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      plainOptions: [],
      code: this.property["code"],
      formData: this.$store.getters.formData,
      arr: [],
      imgUrl: null,
      stamp: null
    };
  },
  props: {
    property: {
      type: Object
    },
    bindform: {
      type: Object,
      required: true
    },
    relateControls: {
      type: Array
    }
  },
  components: {
    Stamp,
    AFormItem: Form.Item,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    AInput: Input
  },
  created() {
    this.property.options.forEach(item => {
      this.plainOptions.push({ label: item.text, value: item.value });
    });
    if (this.formData[this.code]) {
      this.arr = this.formData[this.code];
      this.relateControl(this.arr);
    } else {
      if (!this.property.require) {
        this.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
      }
      //填写默认值
      if (this.property.defaultContent && this.property.defaultContent.length) {
        let arr = [];
        this.property.defaultContent.forEach(item => {
          arr.push(parseInt(item.value));
          this.arr.push(item.value);
        });
        this.formData[this.code] = arr;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
        this.relateControl(arr);
      }
    }
    if (this.formData[this.property.signcomponent.code]) {
      //获取签章图片
      getStampInfo(this.formData[this.property.signcomponent.code])
        .then(res => {
          if (res.code == "success") {
            this.imgUrl =
              this.uiConfigs["api.url"] +
              "/file/v1/download" +
              "?uri=" +
              encodeURIComponent(res.result.pictureurl);
          }
        })
        .catch(err => {
          showError(err);
        });
    }
  },
  computed: {
    checkboxNum() {
      return this.arr.length;
    },
    data() {
      return this.$store.getters.formData[this.code]
        ? this.$store.getters.formData[this.code]
        : [];
    }
  },
  watch: {
    data(newVal) {
      this.arr = this.data;
    }
  },
  methods: {
    changeHandler(e) {
      this.arr = e;
      this.$store.getters.formData[this.code] = e;
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
      this.relateControl(e);
    },
    onblur(){
      this.$emit("fillData",this.code);
    },
    //关联控件变化
    relateControl(val) {
      let formData = {};
      let flag = false;
      this.relateControls.forEach(item => {
        if (item.relate == this.code) {
          flag = true;
          this.$store.getters.formData[item.code] = val;
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
    },
    //获取签章
    getStamp(img) {
      if (img) {
        this.imgUrl = img;
        this.stamp = img;
      }
    }
  }
};
</script>
