<template>
  <div class="workflow">
    <a-form-item :label="property.showName?property.name:''">
      <a-cascader
        style="width:100%"
        class="hand"
        :placeholder="property.placehold"
        :disabled="property.editable?false:true"
        :options="options"
        @change="onChange"
        :loadData="loadData"
        :changeOnSelect="(property.range==3||property.range==5)?false:true"
      >
        <a-input
          :style="property.showName?'':'margin-top:29px;'"
          :disabled="property.editable?false:true"
          read-only
          :allowClear="true"
          autocomplete="off"
          v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue:region
          }
        ]"
        ></a-input>
      </a-cascader>
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
import { getRegion } from "@/workflow/api/workflow";
import { getStampInfo } from "@/workflow/api/stamplist";
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/workflow.css";
import { Form, Input, Modal, Cascader } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "Region",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      code: this.property["code"],
      formData: this.$store.getters.formData,
      options: [],
      region: "",
      path: "",
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
    }
  },
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    AModal: Modal,
    ACascader: Cascader,
    Stamp
  },
  computed: {
    data() {
      return this.$store.getters.formData[this.code];
    }
  },
  watch: {
    data: {
      handler(newval) {
        this.region = newval;
      },
      immediate: true
    }
  },
  created() {
    this.getRegionList();
    if (!this.formData[this.code]) {
      if (!this.property.require) {
        this.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
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
  methods: {
    //获取地区
    getRegionList() {
      let districtPageQuery = {};
      getRegion(districtPageQuery).then(res => {
        if (res.code == "success") {
          this.options = [];
          res.result.forEach(item => {
            this.options.push({
              label: item.name,
              value: item.level + "_" + item.path + "_" + item.code,
              isLeaf: this.property.range == 1 ? true : false
            });
          });
        }
      });
    },
    //动态加载数据
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      let code = targetOption.value.split("_")[2];
      targetOption.loading = true;
      let districtPageQuery = {};
      districtPageQuery.code = code;
      districtPageQuery.subordinate = true;
      if (targetOption.value.split("_")[0] == 1)
        districtPageQuery.county = true;
      getRegion(districtPageQuery).then(res => {
        if (res.code == "success") {
          targetOption.loading = false;
          targetOption.children = [];
          res.result.forEach(item => {
            let flag = true;
            if (
              (item.level == 2 &&
                (this.property.range == 2 || this.property.range == 3)) ||
              (item.level == 3 &&
                (this.property.range == 4 || this.property.range == 5))
            ) {
              flag = true;
            } else {
              if (item.rindex - item.lindex == 1) {
                flag = true;
              } else {
                flag = false;
              }
            }
            targetOption.children.push({
              label: item.name,
              value: item.level + "_" + item.path + "_" + item.code,
              isLeaf: flag ? true : false
            });
          });
          this.options = [...this.options];
        }
      });
    },
    //选择地区
    onChange(value) {
      this.region = value[value.length - 1].split("_")[1];
      this.$store.getters.formData[this.code] = this.region;
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
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