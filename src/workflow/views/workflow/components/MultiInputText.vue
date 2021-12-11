<template>
  <div class="workflow">
    <a-form-item :label="property.showName?property.name:''">
      <a-textarea
        :style="property.showName?'':'margin-top:29px;'"
        class="hand"
        :placeholder="property.placehold"
        @change="changeHandler"
        :disabled="property.editable?false:true"
        :rows="4"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue: $store.getters.formData[property.code]?$store.getters.formData[property.code]:''
          }
        ]"
      ></a-textarea>
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
import Stamp from "./stampComponent/Stamp";
import { getStampInfo } from "@/workflow/api/stamplist";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { showError, debounce } from "@/framework/utils/index";
import "@/workflow/style/workflow.css";
import { Form, Input } from "ant-design-vue";
export default {
  name: "MultiInputText",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      code: this.property["code"],
      formData: this.$store.getters.formData,
      imgUrl: null,
      stamp: null
    };
  },
  props: {
    property: {
      type: Object,
      required: true
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
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    Stamp
  },
  created() {
    if (!this.formData[this.code]) {
      if (!this.property.require) {
        this.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
      }
      if (this.property.defaultType == 2) {
        this.formData[this.code] = this.property.defaultContent;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
      }
    } else {
      this.relateControl(this.formData[this.code]);
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
  methods: {
    changeHandler: debounce(function(e) {
      this.$store.getters.formData[this.code] = e.target.value;
      this.relateControl(e.target.value);
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
    },300),
    //获取签章
    getStamp(img) {
      if (img) {
        this.imgUrl = img;
        this.stamp = img;
      }
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
    }
  }
};
</script>