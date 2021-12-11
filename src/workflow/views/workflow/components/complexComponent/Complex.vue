<template>
  <div class="complex">
    <a-form-item
      :label="item.name"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 15 }"
      :prop="item.code"
    >
      <!-- 单行文本框 -->
      <a-input
        @blur="blur"
        :data-code="item.code"
        v-if="item.componenttype=='inputtext'"
        :disabled="item.editable?false:true"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请输入${item.name}!` }]}
        ]"
      ></a-input>
      <!-- 多行文本框 -->
      <a-textarea
        v-if="item.componenttype=='multiinputtext'"
        :disabled="item.editable?false:true"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请输入${item.name}!` }]}
        ]"
      ></a-textarea>
      <!-- 下拉选择框 -->
      <a-select
        @blur="blur"
        :disabled="item.editable?false:true"
        v-if="item.componenttype=='combobox'"
        v-decorator="[`${item.code}`,
          {rules: [{ required: item.require, message:  `请选择${item.name}!` }]}
        ]"
      >
        <template v-if="item.options[0].label">
          <a-select-opt-group v-for="(i,index) in item.options" :key="index" :label="i.label">
            <a-select-option v-for="(j,idx) in i.data" :key="idx" :value="j.value">{{j.text}}</a-select-option>
          </a-select-opt-group>
        </template>
        <template v-else>
          <a-select-option
            :label="obj.value"
            v-for="obj in item.options"
            :key="obj.value"
          >{{obj.text}}</a-select-option>
        </template>
      </a-select>
      <!-- 单选框 -->
      <a-radio-group
        :disabled="item.editable?false:true"
        v-if="item.componenttype=='radio'"
        v-decorator="[`${item.code}`,
          {rules: [{ required: item.require, message:  `请选择${item.name}!` }]}
        ]"
      >
        <a-row>
          <a-col :span="12" v-for="(obj,idx) in item.options" :key="idx">
            <a-tooltip>
              <template slot="title" v-if="obj.text.length>5">{{obj.text}}</template>
              <a-radio :value="obj.value">{{obj.text}}</a-radio>
            </a-tooltip>
          </a-col>
        </a-row>
      </a-radio-group>
      <!-- 人员选择框 -->
      <a-input
        @click="openUser(item.editable)"
        :disabled="item.editable?false:true"
        @blur="blur"
        :data-code="item.code"
        v-if="item.componenttype=='user'"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请选择${item.name}!` }]}
        ]"
      >
        <a-icon slot="suffix" type="user" class="userIcon" @click="uservisible=true" />
      </a-input>
      <a-modal
        title="人员选择"
        :visible="uservisible"
        @cancel="uservisible=false"
        :bodyStyle="tstyle"
        width="450px"
        class="userModal hand"
        :footer="null"
        :maskStyle="{backgroundColor:'rgba(0,0,0,0.05)'}"
      >
        <org-user-select 
          mode="user" 
          @finish="submitUser" 
          :showDept="true"
          :userFilter="item.userFilter ? JSON.parse(item.userFilter) : {}"
          >
        </org-user-select>
      </a-modal>
      <!-- 机构选择框 -->
      <a-input
        @click="openOrg(item.editable)"
        :disabled="item.editable?false:true"
        @blur="blur"
        :data-code="item.code"
        v-if="item.componenttype=='org'"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请选择${item.name}!` }]}
        ]"
      >
        <a-icon @click="orgvisible=true" slot="suffix" type="fork" class="orgIcon" />
      </a-input>
      <a-modal
        title="单位名称选择"
        :visible="orgvisible"
        @cancel="orgvisible=false"
        width="450px"
        :bodyStyle="tStyle"
        class="myModal hand"
        :footer="null"
        :maskStyle="{backgroundColor:'rgba(0,0,0,0.05)'}"
      >
        <org-user-select mode="org" @finish="orgOk" :rootSelectable="true"></org-user-select>
      </a-modal>
      <!-- 数字框 -->
      <a-input-number
        style="width:100%"
        v-if="item.componenttype=='numberbox'"
        :disabled="item.editable?false:true"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请输入${item.name}!` }]}
        ]"
      ></a-input-number>
      <!-- 日期选择框 -->
      <a-date-picker
        v-if="item.componenttype=='datebox'"
        :disabled="item.editable?false:true"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请输入${item.name}!` }]}
        ]"
      ></a-date-picker>
      <!-- 身份证 -->
      <a-input
        v-if="item.componenttype=='idcard'"
        :disabled="item.editable?false:true"
        @blur="blur"
        :data-code="item.code"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require,validator:validateIdcode}]}
        ]"
      ></a-input>
      <!-- 多选框 -->
      <a-checkbox-group
        v-if="item.componenttype=='checkbox'"
        :disabled="item.editable?false:true"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require, message:  `请选择${item.name}!` }]}]"
      >
        <a-row class="textStyle">
          <a-col :span="12" v-for="(obj,idx) in item.options" :key="idx">
            <a-tooltip>
              <template slot="title" v-if="obj.text.length>5">{{obj.text}}</template>
              <a-checkbox :value="obj.value">{{obj.text}}</a-checkbox>
            </a-tooltip>
          </a-col>
        </a-row>
      </a-checkbox-group>
      <!-- 地区选择控件 -->
      <a-cascader
        style="width:100%"
        v-if="item.componenttype=='region'"
        :disabled="item.editable?false:true"
        placeholder="请选择地区"
        :options="options"
        @change="onChange"
        :loadData="loadData"
        changeOnSelect
      >
        <a-input
          :disabled="item.editable?false:true"
          autocomplete="off"
          read-only
          :allowClear="true"
          v-decorator="[
          `${item.code}`,
          {rules: [{required: item.require, message: `请输入${item.name}!`}],
          initialValue:region}]"
        ></a-input>
      </a-cascader>
      <!-- 开关控件 -->
      <a-switch
        v-if="item.componenttype=='switchbox'"
        :disabled="item.editable?false:true"
        checkedChildren="是"
        unCheckedChildren="否"
        v-decorator="[
           `${item.code}`,
          {rules: [{ required: item.require,message: `请选择${item.name}!`}],
          valuePropName: 'checked',
           initialValue:switchData}
        ]"
      />
    </a-form-item>
  </div>
</template>

<script>
import { checkIdcard, showError } from "@/framework/utils/index";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import moment from "moment";
import { getUserInfo, getRegion } from "@/workflow/api/workflow";
import {
  Form,
  Input,
  Cascader,
  Modal,
  Checkbox,
  Tooltip,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Icon,
  Select,
  Radio,
  Switch
} from "ant-design-vue";
export default {
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    ACascader: Cascader,
    AModal: Modal,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ATooltip: Tooltip,
    ARow: Row,
    ACol: Col,
    ADatePicker: DatePicker,
    AInputNumber: InputNumber,
    AIcon: Icon,
    ASelect: Select,
    ASelectOption: Select.Option,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    OrgUserSelect,
    ASelectOptGroup: Select.OptGroup,
    ASwitch: Switch
  },
  props: {
    bindform: {
      type: Object
    },
    item: {
      type: Object
    },
    current: {
      type: Object
    },
    typecode: {
      type: Object
    },
    pcode: {
      type: String
    },
    dateArr: {
      type: Array
    },
    resourceId: {
      type: String
    }
  },
  data() {
    return {
      //人员选择
      uservisible: false,
      userCode: undefined,
      tstyle: { padding: " 10px  3px 5px 10px", height: "550px" },
      curUser: null,
      //机构选择
      orgvisible: false,
      orgCode: undefined,
      curOrg: null,
      tStyle: {
        padding: "5px 3px 5px 10px",
        width: "100%",
        height: "550px",
        color: "black"
      },
      //多选框
      plainOptions: [],
      //地区选择控件
      options: [],
      region: "",
      path: "",
      regionCode: undefined,
      switchData: false
    };
  },
  mounted() {
    if (JSON.stringify(this.current) == "{}") {
      this.bindform.resetFields();
      this.curOrg = null;
      this.curUser = null;
      this.region = "";
    } else {
      this.$nextTick(() => {
        for (var a in this.current) {
          if (this.item.code == a) {
            if (this.item.componenttype == "org" && this.current[a]) {
              this.bindform.setFieldsValue({ [a]: this.current[a].name });
              this.curOrg = this.current[a];
              this.$emit("getComplex", {
                obj: { code: a, item: this.current[a] },
                type: 1
              });
            } else if (this.item.componenttype == "user" && this.current[a]) {
              this.bindform.setFieldsValue({ [a]: this.current[a].username });
              this.curUser = this.current[a];
              this.$emit("getComplex", {
                obj: { code: a, item: this.current[a] },
                type: 2
              });
            } else if (
              this.item.componenttype == "datebox" &&
              this.current[a]
            ) {
              this.bindform.setFieldsValue({
                [a]: this.moment(this.current[a], "YYYY-MM-DD")
              });
            } else if (this.item.componenttype == "region") {
              this.region = this.current[a];
            } else if (this.item.componenttype == "switchbox") {
              this.switchData = this.current[a];
            } else {
              this.bindform.setFieldsValue({ [a]: this.current[a] });
            }
          }
        }
      });
    }
  },
  created() {
    if (this.item.componenttype == "user") {
      this.userCode = this.item.code;
    } else if (this.item.componenttype == "org") {
      this.orgCode = this.item.code;
    } else if (this.item.componenttype == "region") {
      this.regionCode = this.item.code;
      this.getRegionList();
    }
  },
  computed: {
    data() {
      return this.current;
    }
  },
  watch: {
    data: {
      handler(val) {
        if (JSON.stringify(val) == "{}") {
          this.bindform.resetFields();
          this.curOrg = null;
          this.curUser = null;
          this.region = "";
        } else {
          this.$nextTick(() => {
            for (var a in val) {
              if (this.item.code == a) {
                if (this.item.componenttype == "org" && val[a]) {
                  this.bindform.setFieldsValue({ [a]: val[a].name });
                  this.curOrg = val[a];
                  this.$emit("getComplex", {
                    obj: { code: a, item: val[a] },
                    type: 1
                  });
                } else if (this.item.componenttype == "user" && val[a]) {
                  this.bindform.setFieldsValue({ [a]: val[a].username });
                  this.curUser = val[a];
                  this.$emit("getComplex", {
                    obj: { code: a, item: val[a] },
                    type: 2
                  });
                } else if (this.item.componenttype == "datebox" && val[a]) {
                  this.bindform.setFieldsValue({
                    [a]: this.moment(val[a], "YYYY-MM-DD")
                  });
                } else if (this.item.componenttype == "region") {
                  this.region = val[a];
                } else if (this.item.componenttype == "switchbox") {
                  this.switchData = val[a];
                } else {
                  this.bindform.setFieldsValue({ [a]: val[a] });
                }
              }
            }
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    //身份证校验
    validateIdcode(rule, value, callback) {
      if (rule.required) {
        if (value) {
          if (checkIdcard(value)) {
            callback();
          } else {
            callback("身份证格式不正确，请检查后重新输入！");
          }
        } else {
          callback("请输入身份证！");
        }
      } else {
        callback();
      }
    },
    // 人员选择
    openUser(editable) {
      if (editable) {
        this.uservisible = true;
      }
    },
    //机构选择
    openOrg(editable) {
      if (editable) {
        this.orgvisible = true;
      }
    },
    //确定选择的机构
    orgOk(type, list) {
      if (type == "ok" && list.length > 0) {
        let org = list[0];
        this.orgvisible = false;
        let obj = {};
        obj.name = org.name;
        obj._id = org._id;
        this.curOrg = obj;
        this.bindform.setFieldsValue({ [this.orgCode]: obj.name });
        this.$emit("getComplex", {
          obj: { code: this.orgCode, item: obj },
          type: 1
        });
      } else if (type == "cancel") {
        this.orgvisible = false;
      }
    },
    //确定人员
    submitUser(type, list) {
      if (type == "ok" && list.length > 0) {
        let user = list[0];
        let obj = {};
        obj.username = user.username;
        obj._id = user._id;
        this.uservisible = false;
        this.curUser = obj;
        this.bindform.setFieldsValue({ [this.userCode]: user.username });
        this.$emit("getComplex", {
          obj: { code: this.userCode, item: obj },
          type: 2
        });
      } else if (type == "cancel") {
        this.uservisible = false;
      }
    },
    //失去焦点请求数据来源
    blur() {
      if (this.typecode) {
        let flag = false;
        let formdata = this.bindform.getFieldsValue();
        for (var id in this.typecode) {
          let orgUserVo = {};
          this.typecode[id].forEach(code => {
            if (code == this.item.code) {
              flag = true;
              orgUserVo.resourceid = this.resourceId;
              orgUserVo.formatCfgId = parseInt(id);
              orgUserVo.modelinstanceid = parseInt(
                this.$route.query.modelinstanceid
              );
              orgUserVo.objectMap = {};
              this.typecode[id].forEach(code => {
                if (formdata[code] || formdata[code] === 0) {
                  if (code == this.userCode) {
                    orgUserVo.objectMap[code] = this.curUser;
                  } else if (code == this.orgCode) {
                    orgUserVo.objectMap[code] = this.curOrg;
                  } else {
                    orgUserVo.objectMap[code] = formdata[code];
                  }
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
                    for (var a in res.result[this.pcode]) {
                      if (
                        Object.prototype.toString.call(
                          res.result[this.pcode][a]
                        ) === "[object Object]"
                      ) {
                        if (res.result[this.pcode][a].username) {
                          this.bindform.setFieldsValue({
                            [a]: res.result[this.pcode][a].username
                          });
                          this.$emit("getComplex", {
                            obj: {
                              code: a,
                              item: res.result[this.pcode][a]
                            },
                            type: 2
                          });
                        } else if (res.result[this.pcode][a].name) {
                          this.bindform.setFieldsValue({
                            [a]: res.result[this.pcode][a].name
                          });
                          this.$emit("getComplex", {
                            obj: {
                              code: a,
                              item: res.result[this.pcode][a]
                            },
                            type: 1
                          });
                        }
                      } else if (this.dateArr.indexOf(a) > -1) {
                        this.bindform.setFieldsValue({
                          [a]: this.moment(
                            res.result[this.pcode][a],
                            "YYYY-MM-DD"
                          )
                        });
                      } else {
                        this.bindform.setFieldsValue({
                          [a]: res.result[this.pcode][a]
                        });
                      }
                    }
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
    },
    moment,
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
              isLeaf: false
            });
          });
        }
      });
    },
    onChange(value) {
      this.region = value[value.length - 1].split("_")[1];
      this.bindform.setFieldsValue({ [this.regionCode]: this.region });
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      let code = targetOption.value.split("_")[2];
      targetOption.loading = true;
      let districtPageQuery = {};
      districtPageQuery.code = code;
      districtPageQuery.subordinate = true;
      if (targetOption.value.split("_")[0] == 1)
        districtPageQuery.county = true;
      getRegion(districtPageQuery)
        .then(res => {
          if (res.code == "success") {
            targetOption.loading = false;
            targetOption.children = [];
            res.result.forEach(item => {
              let flag = true;
              if (item.rindex - item.lindex == 1) {
                flag = true;
              } else {
                flag = false;
              }
              targetOption.children.push({
                label: item.name,
                value: item.level + "_" + item.path + "_" + item.code,
                isLeaf: flag ? true : false
              });
            });
            this.options = [...this.options];
          }
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.complex {
  .userIcon {
    color: #bfbfbf;
  }
  .userModal {
    height: 600px;
    .ant-modal-content {
      height: 100%;
      .ant-modal-body {
        padding: 0;
      }
    }
  }
}
.textStyle {
  /deep/.ant-checkbox-wrapper {
    > span {
      &:last-child {
        width: 100px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
    }
  }
}
/deep/ .ant-select-dropdown-menu-item-group-title {
  font-size: 14px;
  color: #534848;
  font-weight: bold;
}
/deep/ .ant-form-item-label {
  text-overflow: ellipsis;
}
</style>