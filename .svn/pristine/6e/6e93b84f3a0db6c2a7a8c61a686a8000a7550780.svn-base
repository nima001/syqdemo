<template>
  <div class="workflow">
    <a-form-item :label="property.showName?property.name:''" style="position:relative">
      <a-select
        :style="property.showName?'':'margin-top:29px;'"
        :placeholder="property.placehold"
        :class="property.code"
        @change="changeHandler"
        @blur="blur"
        :disabled="property.editable?false:true"
        :getPopupContainer="triggerNode => triggerNode.parentNode"
        :mode="property.multiple?'multiple':''"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required:property.require, validator:validateNums}],
           initialValue: ($store.getters.formData[property.code] || $store.getters.formData[property.code]==0)?$store.getters.formData[property.code]:[]
          }
        ]"
      >
        <template v-if="options[0].label">
          <a-select-opt-group v-for="(item,index) in options" :key="index" :label="item.label">
            <a-select-option
              v-for="(obj,idx) in item.data"
              :key="idx"
              :value="obj.value"
            >{{obj.text}}</a-select-option>
          </a-select-opt-group>
        </template>
        <template v-else>
          <a-select-option
            :label="item.value"
            v-for="item in options"
            :key="item.value"
          >{{item.text}}</a-select-option>
        </template>
      </a-select>
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
import { getUserInfo } from "@/workflow/api/workflow";
import { getStampInfo } from "@/workflow/api/stamplist";
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/workflow.css";
import { Form, Select, Input } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      options: [],
      formData: this.$store.getters.formData,
      code: this.property["code"],
      imgUrl: null,
      stamp: null
    };
  },
  name: "ComboBox",
  props: {
    property: {
      type: Object,
      required: true
    },
    bindform: {
      type: Object,
      required: true
    },
    typecode: {
      type: Object
    },
    relateControls: {
      type: Array
    },
    resourceId: {
      type: String
    }
  },
  components: {
    Stamp,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    ASelectOptGroup: Select.OptGroup
  },
  created() {
    //判断下拉选项是否需要分组
    let optionObj = {};
    this.property.options.forEach(item => {
      if (this.property.showGroup) {
        if (item.group) {
          if (!optionObj[item.group]) {
            this.$set(optionObj, item.group, [
              { text: item.text, value: item.value }
            ]);
          } else {
            optionObj[item.group].push({ text: item.text, value: item.value });
          }
        } else {
          if (!optionObj["其他"]) {
            this.$set(optionObj, "其他", [
              { text: item.text, value: item.value }
            ]);
          } else {
            optionObj["其他"].push({ text: item.text, value: item.value });
          }
        }
      } else {
        this.options.push({ text: item.text, value: item.value });
      }
    });
    for (var obj in optionObj) {
      this.options.push({
        label: obj,
        data: optionObj[obj]
      });
    }
    if (!(this.formData[this.code] || this.formData[this.code] == 0)) {
      if (!this.property.require) {
        this.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
      }
      //填写默认值
      if (this.property.defaultContent && this.property.defaultContent.length) {
        if (this.property.multiple) {
          let arr = [];
          this.property.defaultContent.forEach(item => {
            arr.push(item.value);
          });
          this.$store.getters.formData[this.code] = arr;
          this.relateControl(arr);
        } else {
          this.$store.getters.formData[
            this.code
          ] = this.property.defaultContent[0].value;
          this.relateControl(this.property.defaultContent[0].value);
        }
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.$store.getters.formData
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
    //校验
    validateNums(rule, value, callback) {
      if (rule.required) {
        if (this.property.multiple) {
          if (value.length) {
            if (this.property.num !== 0 && value.length > this.property.num) {
              callback("最多只能选" + this.property.num + "项！");
            } else {
              callback();
            }
          } else {
            callback("请选择" + this.property.name + "！");
          }
        } else {
          if (value || value == 0) {
            callback();
          } else {
            callback("请选择" + this.property.name + "！");
          }
        }
      } else {
        callback();
      }
    },
    changeHandler(value) {
      this.$store.getters.formData[this.code] = value;
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
      this.relateControl(value);
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
    },
    //失去焦点请求数据来源
    blur() {
      if (this.typecode) {
        let flag = false;
        for (var id in this.typecode) {
          let orgUserVo = {};
          this.typecode[id].forEach(code => {
            if (code == this.property.code) {
              flag = true;
              orgUserVo.resourceid = this.resourceId;
              orgUserVo.formatCfgId = parseInt(id);
              orgUserVo.modelinstanceid = parseInt(
                this.$route.query.modelinstanceid
              );
              orgUserVo.objectMap = {};
              this.typecode[id].forEach(code => {
                if (
                  this.$store.getters.formData[code] ||
                  this.$store.getters.formData[code] === 0
                ) {
                  orgUserVo.objectMap[code] = this.$store.getters.formData[
                    code
                  ];
                }
              });
            }
          });
          if (JSON.stringify(orgUserVo.objectMap) == "{}") flag = false;
          if (flag) {
            getUserInfo(orgUserVo)
              .then(res => {
                if (res.code == "success") {
                  if (JSON.stringify(res.result) !== "{}") {
                    this.bindform.resetFields();
                    let obj = {};
                    for (var a in res.result) {
                      if (res.result[a] || res.result[a] == 0) {
                        obj[a] = res.result[a];
                      }
                    }
                    this.formData = Object.assign(
                      {},
                      this.$store.getters.formData,
                      // obj
                      // TOIDO 
                      res.result
                    );
                    this.$store.commit({
                      type: "SET_FORM_DATA",
                      data: this.formData
                    });
                  }
                }
              })
              .catch(err => {
               showError(err);
              });
            flag = false;
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.workflow {
  /deep/ .ant-select-dropdown-menu-item-group-title {
    font-size: 14px;
    color: #534848;
    font-weight: bold;
  }
}
</style>