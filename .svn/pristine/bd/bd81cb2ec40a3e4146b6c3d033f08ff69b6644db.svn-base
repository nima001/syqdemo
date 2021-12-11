<template>
  <div class="workflow">
    <a-form-item class="department" :label="property.showName?property.name:''">
      <a-select
        :style="property.showName?'':'margin-top:29px;'"
        class="hand"
        @focus="focus"
        @change="change"
        :class="property.code"
        :placeholder="property.placehold"
        :disabled="property.editable?false:true"
        :allowClear="true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue:$store.getters.formData[property.code]?$store.getters.formData[property.code]._id:''
          }
        ]"
      >
        <a-select-option :value="item._id" v-for="item in options" :key="item._id">{{item.name}}</a-select-option>
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
import { getStampInfo } from "@/workflow/api/stamplist";
import { orgquery } from "@/workflow/api/org";
import { get } from "http";
import Stamp from "./stampComponent/Stamp";
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/workflow.css";
import { Form, Select, Input } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "Department",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      code: this.property["code"],
      formData: this.$store.getters.formData,
      options: [],
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
    Stamp,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input
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
    }
    this.openOrg();
    if (this.formData[this.property.signcomponent.code]) {
      //获取签章图片
      getStampInfo(this.formData[this.property.signcomponent.code])
        .then(res => {
          if (res.code == "success") {
            this.imgUrl =
              this.uiConfigs['api.url'] + '/file/v1/download' +
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
    data() {
      let code = "";
      if (this.property.relateControlCode.length == 1) {
        code = this.$store.getters.formData[this.property.relateControlCode[0]]
          ? this.$store.getters.formData[this.property.relateControlCode[0]]._id
          : null;
      } else if (this.property.relateControlCode.length == 2) {
        code = this.$store.getters.formData[this.property.relateControlCode[0]][
          this.property.relateControlCode[1]
        ]
          ? this.$store.getters.formData[this.property.relateControlCode[0]][
              this.property.relateControlCode[1]
            ]._id
          : null;
      }
      return code;
    }
  },
  watch: {
    data(val) {
      if (this.property.editable) {
        this.getOrgDeptList(val)
          .then(res => {
            this.bindform.setFieldsValue({[this.code] : null});
            this.$store.getters.formData[this.code] = null;
            this.$store.commit({
              type: "SET_FORM_DATA",
              data: this.$store.getters.formData
            });
            this.options = res.result;
          })
          .catch(err => {
           showError(err);
          });
      }
    }
  },
  methods: {
    //打开机构选择弹框
    openOrg() {
      if (this.property.relateControlCode.length == 1) {
        if (
          this.$store.getters.formData[this.property.relateControlCode[0]]
        ) {
          this.getOrgDeptList(
            this.$store.getters.formData[this.property.relateControlCode[0]]
              ._id
          )
            .then(res => {
              this.options = res.result;
            })
            .catch(err => {
              showError(err);
            });
        }
      } else if (this.property.relateControlCode.length == 2) {
        if (
          this.$store.getters.formData[this.property.relateControlCode[0]][
            this.property.relateControlCode[1]
          ]
        ) {
          this.getOrgDeptList(
            this.$store.getters.formData[this.property.relateControlCode[0]][
              this.property.relateControlCode[1]
            ]._id
          )
            .then(res => {
              this.options = res.result;
            })
            .catch(err => {
              showError(err);
            });
        }
      }
    },
    //聚焦时判断
    focus() {
      if (!this.$store.getters.formData[this.property.relateControlCode[0]]) {
        this.$message.error("请先选择关联组织！");
      }
    },
    change(val) {
      let obj = null;
      this.options.forEach(item => {
        if (item._id == val) {
          obj = {};
          obj.name = item.name;
          obj._id = val;
        }
      });
      this.$store.getters.formData[this.code] = obj;
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
    },
    getOrgDeptList(id) {
      return orgquery({
        suporgid: id,
        unittypes: [9], //查询内设等指定单位
        pagesize: 50 //FIXME 内设科室暂定最多50条
      }).then(({ result }) => {
        return {
          result: result.rows
        };
      });
    }
  }
};
</script>
<style lang="less">
.orgIcon {
  color: #bfbfbf;
}
.myModal {
  .search {
    text-align: center;
    margin: 10px 0 20px 0;
    .ant-input-affix-wrapper {
      width: 40%;
    }
  }
  .ant-breadcrumb {
    cursor: pointer;
  }
  .selector {
    margin-top: 20px;
  }
  .selectOrg {
    width: 100%;
    display: flex;
    border: 1px solid #ddd;
    border-radius: 4px;
    &:hover {
      border-color: @primary-color;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

    span {
      &:first-child {
        width: 83%;
        padding: 5px 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .arrow_right {
      width: 17%;
      font-size: 16px;
      padding: 5px;
      text-align: center;
      cursor: pointer;
      color: #a9a9a9;
      background: rgba(0, 0, 0, 0.05);
    }
  }
  .activeOrg {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}
</style>