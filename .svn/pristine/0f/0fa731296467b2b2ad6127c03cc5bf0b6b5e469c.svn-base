<template>
  <div class="expand-attributes">
    <a-form :form="form">
      <a-form-item label="操作对象：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
        <a-select
          :disabled="formData.operatetype?true:false"
          @change="changeObj"
          v-decorator="[
           `operatetype`,
          {rules: [{ required: false }],
          initialValue: formData.operatetype}
        ]"
        >
          <a-select-option
            v-for="item in operationObjList"
            :key="item.value"
            :label="item.text"
          >{{item.text}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-if="objflag"
        :label="objflag==1?'是否减员：':'是否撤销：'"
        :label-col="{ span: 7}"
        :wrapper-col="{ span: 14 }"
      >
        <a-select
          v-decorator="[
           `removeflag`,
          {rules: [{ required: true, message:  `请选择!` }],
          initialValue: formData.removeflag}
        ]"
        >
          <a-select-option
            v-for="item in isremove"
            :key="item.value"
            :label="item.text"
          >{{item.text}}</a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="objflag">
        <template v-if="objflag==1">
          <a-form-item label="被操作人姓名控件类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
            <a-select
              :allowClear="true"
              @change="changeOptedUsernamecodetype"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              placeholder="--请选择--"
              v-decorator="[
           `optedusernamecodetype`,
          {rules: [{ required: true, message:  `请选择被操作人姓名控件类型!` }],
          initialValue: formData.optedusernamecodetype}
        ]"
            >
              <a-select-option
                v-for="(item,index) in optedusernamecodetypelist"
                :key="index"
                :value="item.value"
              >{{item.text}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="opteduserflag"
            label="被操作人姓名控件"
            :label-col="{ span:7 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-tree-select
              showSearch
              :allowClear="true"
              :treeDefaultExpandAll="true"
              :filterTreeNode="filterTreeNode"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="optedusernameList"
              placeholder="--请选择控件（code）--"
              v-decorator="[
           `optedusernamecode`,
          {rules: [{ required: true, message:  `请选择被操作人姓名控件!` }],
          initialValue: formData.optedusernamecode}
        ]"
            ></a-tree-select>
          </a-form-item>
          <a-form-item label="被操作人标识控件类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
            <a-select
              :allowClear="true"
              @change="changeOptedcodetype"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
              placeholder="--请选择--"
              v-decorator="[
           `optedcodetype`,
          {rules: [{ required: true, message:  `请选择被操作人标识控件类型!` }],
          initialValue: formData.optedcodetype}
        ]"
            >
              <a-select-option
                v-for="(item,index) in optedcodetypelist"
                :key="index"
                :value="item.value"
              >{{item.text}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="optedflag"
            label="被操作人标识控件"
            :label-col="{ span:7 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-tree-select
              showSearch
              :allowClear="true"
              :treeDefaultExpandAll="true"
              :filterTreeNode="filterTreeNode"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="optedList"
              placeholder="--请选择控件（code）--"
              v-decorator="[
           `optedcode`,
          {rules: [{ required: true, message:  `请选择被操作人标识控件!` }],
          initialValue: formData.optedcode}
        ]"
            ></a-tree-select>
          </a-form-item>
        </template>
        <a-form-item label="发起单位标识控件" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-tree-select
            showSearch
            :allowClear="true"
            :treeDefaultExpandAll="true"
            :filterTreeNode="filterTreeNode"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="orglist"
            placeholder="--请选择控件（code）--"
            v-decorator="[
           `applycode`,
          {rules: [{ required: true, message:  `请选择发起单位标识控件!` }],
          initialValue: formData.applycode}
        ]"
          ></a-tree-select>
        </a-form-item>
        <template v-if="objflag==2">
          <a-form-item label="被操作单位标识控件" :label-col="{ span:7 }" :wrapper-col="{ span: 14 }">
            <a-tree-select
              showSearch
              :allowClear="true"
              :treeDefaultExpandAll="true"
              :filterTreeNode="filterTreeNode"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="orglist"
              placeholder="--请选择控件（code）--"
              v-decorator="[
           `optedcode`,
          {rules: [{ required: true, message:  `请选择被操作单位标识控件!` }],
          initialValue: formData.optedcode}
        ]"
            ></a-tree-select>
          </a-form-item>
        </template>
      </template>
      <template>
        <a-form-item label="发起校验" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-switch
            @change="changeApplyCheck"
            v-decorator="[
           `applycheck`,
          {rules: [{ required: true, message:  `请选择是否发起校验!` }],
          initialValue: formData.applycheck,
          valuePropName: 'checked'}
        ]"
          />
        </a-form-item>
        <template v-if="applyFlag">
          <div class="fieldList">
            <a-checkbox-group v-model="applyData">
              <a-row :gutter="20">
                <a-col :span="8" v-for="(item,index) in applyList" :key="index">
                  <a-checkbox :value="item.value">
                    <a-tooltip>
                      <template slot="title">{{item.text}}</template>
                      {{item.text}}
                    </a-tooltip>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
          <div class="apply-submit-wrap">
            <a-form-item
              v-for="(obj,i) in applyFlow"
              :key="i"
              :label="obj.name"
              :label-col="{ span: 7}"
              :wrapper-col="{ span: 14 }"
            >
              <template v-if="obj.type">
                <a-row :gutter="20" v-for="(row,j) in obj.data" :key="j">
                  <a-col :span="8">
                    <a-select
                      placeholder="--请选择--"
                      v-model="obj.data[j].code"
                      @change="getApplyVlaue(i,j)"
                    >
                      <a-select-option
                        v-for="(item,index) in applyOrgList"
                        :key="index"
                        :value="item.id"
                      >{{item.name}}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="6">
                    <a-select
                      v-model="obj.data[j].relation"
                      @change="applyFlow[i].data[j].values = undefined"
                    >
                      <a-select-option
                        v-for="(item,index) in operatoList"
                        :key="index"
                        :value="item.value"
                      >{{item.text}}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="8">
                    <a-select
                      placeholder="--请选择--"
                      v-model="obj.data[j].values"
                      :mode="(obj.data[j].relation==3 || obj.data[j].relation==4)?'multiple':''"
                      :disabled="(obj.data[j].code && obj.data[j].relation)?false:true"
                    >
                      <a-select-option
                        v-for="(item,index) in applyValueList[obj.data[j].code]"
                        :key="index"
                        :value="item.value"
                      >{{item.text}}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="2">
                    <a-button @click="delApplyList(i,j)" type="danger" shape="circle" icon="close"></a-button>
                  </a-col>
                </a-row>
                <a-button style="width:100%" @click="addApplyList(i,obj.pcode)">添加</a-button>
              </template>
              <template v-else>
                <a-select placeholder="--请选择--" v-model="obj.data.modelinterfaceid">
                  <a-select-option
                    v-for="(item,index) in applyinterfaces"
                    :key="index"
                    :value="item.value"
                  >{{item.text}}</a-select-option>
                </a-select>
              </template>
            </a-form-item>
          </div>
        </template>
        <a-form-item label="提交校验" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-switch
            @change="changeSubmitCheck"
            v-decorator="[
           `submitcheck`,
          {rules: [{ required: true, message:  `请选择是否提交校验!` }],
          initialValue: formData.submitcheck,
          valuePropName: 'checked'}
        ]"
          />
        </a-form-item>
        <template v-if="submitFlag">
          <div class="fieldList">
            <a-checkbox-group v-model="submitData">
              <a-row :gutter="20">
                <a-col :span="8" v-for="(item,index) in submitList" :key="index">
                  <a-checkbox :value="item.value">
                    <a-tooltip>
                      <template slot="title">{{item.text}}</template>
                      {{item.text}}
                    </a-tooltip>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
          <div class="apply-submit-wrap">
            <a-form-item
              v-for="(obj,i) in submitFlow"
              :style="obj.type==3?'display:none':''"
              :key="i"
              :label="obj.type!==3?obj.name:''"
              :label-col="{ span: 7}"
              :wrapper-col="{ span: 14 }"
            >
              <template v-if="obj.type==1">
                <a-row :gutter="20" v-for="(row,j) in obj.data" :key="j">
                  <a-col :span="8">
                    <a-select
                      placeholder="--请选择--"
                      v-model="obj.data[j].code"
                      @change="getSubmitVlaue(i,j)"
                    >
                      <a-select-option
                        v-for="(item,index) in submitUserList"
                        :key="index"
                        :value="item.id"
                      >{{item.name}}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="6">
                    <a-select
                      v-model="obj.data[j].relation"
                      @change="submitFlow[i].data[j].values = undefined"
                    >
                      <a-select-option
                        v-for="(item,index) in operatoList"
                        :key="index"
                        :value="item.value"
                      >{{item.text}}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="8">
                    <a-select
                      placeholder="--请选择--"
                      v-model="obj.data[j].values"
                      :mode="(obj.data[j].relation==3 || obj.data[j].relation==4)?'multiple':''"
                      :disabled="(obj.data[j].code && obj.data[j].relation)?false:true"
                    >
                      <a-select-option
                        v-for="(item,index) in submitValueList[obj.data[j].code]"
                        :key="index"
                        :value="item.value"
                      >{{item.text}}</a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="2">
                    <a-button @click="delSubmitList(i,j)" type="danger" shape="circle" icon="close"></a-button>
                  </a-col>
                </a-row>
                <a-button style="width:100%" @click="addSubmitList(i,obj.pcode)">添加</a-button>
              </template>
              <template v-if="obj.type==2">
                <a-select
                  @change="changeUserInterface"
                  placeholder="--请选择--"
                  v-model="obj.data.modelinterfaceid"
                >
                  <a-select-option
                    v-for="(item,index) in userinterfaces"
                    :key="index"
                    :value="item.value"
                  >{{item.text}}</a-select-option>
                </a-select>
                <a-select v-if="userInterfaceFlag" placeholder="--请选择--" v-model="obj.data.code">
                  <a-select-option
                    v-for="(item,index) in submitinterfaces"
                    :key="index"
                    :value="item.value"
                  >{{item.label}}</a-select-option>
                </a-select>
              </template>
            </a-form-item>
          </div>
        </template>
      </template>
    </a-form>
    <div class="expand-btn">
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
  </div>
</template>

<script>
import {
  getSingleModelinstanceExtende,
  getValidationType,
  getValidationOperator,
  getListOrgUser,
  saveModelinstanceExtende
} from "@/workflow/api/modellist";
import {
  getListconstantbydictkeys,
  getRelateComponents,
  getListconstantbydictkey
} from "@/workflow/api/workflow";
import { getUiboxs } from "@/workflow/api/modelinterface";
import { showError } from "@/framework/utils/index";
import {
  Input,
  Button,
  Select,
  Form,
  Switch,
  Checkbox,
  Row,
  Col,
  Tooltip,
  TreeSelect
} from "ant-design-vue";
export default {
  components: {
    AInput: Input,
    ATextarea: Input.TextArea,
    AInputSearch: Input.Search,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    AForm: Form,
    AFormItem: Form.Item,
    ASwitch: Switch,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ARow: Row,
    ACol: Col,
    ATooltip: Tooltip,
    ATreeSelect: TreeSelect
  },
  props: {
    nowid: {
      type: Number
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formData: {
        operatetype: 0,
        removeflag: 0,
        optedcodetype: undefined,
        optedcode: undefined,
        optedusernamecodetype: undefined,
        optedusernamecode: undefined,
        applycode: undefined,
        applycheck: false,
        submitcheck: false
      },
      isremove: [
        { value: 0, text: "否" },
        { value: 1, text: "是" }
      ],
      operationObjList: [],
      modelinstanceid: undefined,
      optedcodetypelist: [],
      optedusernamecodetypelist: [],
      optedusernameList: [],
      optedList: [],
      orglist: [],
      objflag: 0,
      optedflag: false,
      opteduserflag: false,
      //发起、提交校验
      applyFlag: false,
      submitFlag: false,
      applyList: [], //发起校验多选框值
      submitList: [], //提交校验多选框值
      applyinterfaces: [],
      submitinterfaces: [],
      applyData: [],
      submitData: [],
      applyFlow: [],
      submitFlow: [],
      operatoList: [],
      applyOrgList: [],
      submitUserList: [],
      applyValueList: {},
      submitValueList: {},
      userinterfaces: [],
      userInterfaceFlag: false
    };
  },
  watch: {
    id: {
      handler(newval, oldvalue) {
        if (newval !== oldvalue) {
          this.get(newval);
        }
      },
      immediate: true
    },
    applyData(newval, oldval) {
      if (newval.length > oldval.length) {
        this.applyList.forEach(a => {
          newval.forEach(b => {
            if (a.value == b && oldval.indexOf(b) < 0) {
              if (a.selected) {
                this.applyFlow.push({
                  type: a.selected,
                  name: a.text,
                  pcode: b,
                  data: [
                    {
                      createOrComplete: 1,
                      type: b,
                      modelinstanceid: this.nowid,
                      code: undefined,
                      relation: 1,
                      values: undefined
                    }
                  ]
                });
              } else {
                this.applyFlow.push({
                  type: a.selected,
                  name: a.text,
                  pcode: b,
                  data: {
                    modelinterfaceid: undefined,
                    createOrComplete: 1,
                    type: b,
                    modelinstanceid: this.nowid
                  }
                });
              }
            }
          });
        });
      } else {
        this.applyFlow = this.applyFlow.filter(item => {
          return newval.indexOf(item.pcode) > -1;
        });
      }
    },
    submitData(newval, oldval) {
      if (newval.length > oldval.length) {
        this.submitList.forEach(a => {
          newval.forEach(b => {
            if (a.value == b && oldval.indexOf(b) < 0) {
              if (a.selected) {
                this.submitFlow.push({
                  type: 1,
                  name: a.text,
                  pcode: b,
                  data: [
                    {
                      createOrComplete: 2,
                      type: b,
                      modelinstanceid: this.nowid,
                      code: undefined,
                      relation: 1,
                      values: undefined
                    }
                  ]
                });
              } else {
                if (b == 3) {
                  this.submitFlow.push({
                    type: 3,
                    name: a.text,
                    pcode: b,
                    data: {
                      createOrComplete: 2,
                      type: b,
                      modelinstanceid: this.nowid
                    }
                  });
                } else {
                  this.userInterfaceFlag = false;
                  this.submitFlow.push({
                    type: 2,
                    name: a.text,
                    pcode: b,
                    data: {
                      code: undefined,
                      createOrComplete: 2,
                      type: b,
                      modelinstanceid: this.nowid
                    }
                  });
                }
              }
            }
          });
        });
      } else {
        this.submitFlow = this.submitFlow.filter(item => {
          return newval.indexOf(item.pcode) > -1;
        });
      }
    }
  },
  computed: {
    id() {
      return this.nowid;
    }
  },
  methods: {
    async get(id) {
      //获取发起、提交校验的多选框值
      await this.getTypeList(1);
      await this.getTypeList(2);
      await this.getInterfaceList(3);
      await this.getInterfaceList(4);
      //获取运算符
      await this.getOperator();
      //获取常量字段
      await this.getConstant("org");
      await this.getConstant("user");
      await this.getnodePropertyCodeList("combobox", 3);
      await this.getOperateTypeList();
      getSingleModelinstanceExtende(id)
        .then(res => {
          if (res.code == "success") {
            this.modelinstanceid = res.result.id;
            this.formData.operatetype = res.result.operatetype
              ? res.result.operatetype
              : 0;
            if (res.result.operatetype == 1) {
              this.getOperateUserTypeList();
              this.getOperateUsernameTypeList();
            }
            this.objflag = res.result.operatetype;
            this.formData.removeflag = res.result.removeflag ? 1 : 0;
            //被操作人姓名控件数据回显
            if (res.result.optedusernamecodetype) {
              this.formData.optedusernamecodetype =
                res.result.optedusernamecodetype;
              this.opteduserflag = true;
              if (res.result.optedusernamecodetype == 2) {
                this.getnodePropertyCodeList("inputtext", 4);
              } else if (res.result.optedusernamecodetype == 1) {
                this.getnodePropertyCodeList("user", 4);
              }
            }
            //被操作人标识控件数据回显
            if (res.result.optedcodetype) {
              this.formData.optedcodetype = res.result.optedcodetype;
              this.optedflag = true;
              if (res.result.optedcodetype == 2) {
                this.getnodePropertyCodeList("idcard", 1);
              } else if (res.result.optedcodetype == 1) {
                this.getnodePropertyCodeList("user", 1);
              } else{
                this.getnodePropertyCodeList("certificate", 1);
              }
            }
            this.getnodePropertyCodeList("org", 2);
            this.formData.optedcode = res.result.optedcode
              ? this.treeData(null, res.result.optedcode, 2)
              : undefined;
            this.formData.applycode = res.result.applycode
              ? this.treeData(null, res.result.applycode, 2)
              : undefined;
            this.formData.optedusernamecode = res.result.optedusernamecode
              ? this.treeData(null, res.result.optedusernamecode, 2)
              : undefined;
            //拓展属性回显
            if (res.result.flowValidations) {
              res.result.flowValidations.forEach(item => {
                if (item.createOrComplete == 1) {
                  this.formData.applycheck = true;
                  this.applyFlag = true;
                  if (item.type == 0) {
                    this.applyData.push(item.otherFlowValidations[0].type);
                    let arr = [];
                    item.otherFlowValidations.forEach(o => {
                      arr.push(o.code);
                    });
                    this.getConstants(arr, 1);
                    this.applyFlow.push({
                      type: true,
                      name: "其他",
                      pcode: item.otherFlowValidations[0].type,
                      data: item.otherFlowValidations
                    });
                  }
                  //发起校验
                  this.applyList.forEach(a => {
                    if (a.value == item.type) {
                      this.applyData.push(item.type);
                      this.applyFlow.push({
                        type: a.selected,
                        name: a.text,
                        pcode: item.type,
                        data: item
                      });
                    }
                  });
                } else if (item.createOrComplete == 2) {
                  this.formData.submitcheck = true;
                  this.submitFlag = true;
                  if (item.type == 0) {
                    this.submitData.push(item.otherFlowValidations[0].type);
                    let arr = [];
                    item.otherFlowValidations.forEach(o => {
                      arr.push(o.code);
                    });
                    this.getConstants(arr, 2);
                    this.submitFlow.push({
                      type: true,
                      name: "其他",
                      pcode: item.otherFlowValidations[0].type,
                      data: item.otherFlowValidations
                    });
                  }
                  //提交校验
                  this.submitList.forEach(a => {
                    if (a.value == item.type) {
                      this.submitData.push(item.type);
                      if (item.type == 3) {
                        this.submitFlow.push({
                          type: 3,
                          name: a.text,
                          pcode: item.type,
                          data: item
                        });
                      } else {
                        let obj = this.userinterfaces.find(a => {
                          return a.value == item.modelinterfaceid;
                        });
                        this.userInterfaceFlag = obj ? obj.selected : false;
                        this.submitFlow.push({
                          type: 2,
                          name: a.text,
                          pcode: item.type,
                          data: item
                        });
                      }
                    }
                  });
                }
              });
            }
            this.extendvisible = true;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取操作对象类型
    getOperateTypeList() {
      this.getConstantByDictkey("workflow.operatetype");
    },
    //修改操作对象
    changeObj(val) {
      this.formData.optedcode = undefined;
      this.formData.applycode = undefined;
      this.formData.optedcodetype = undefined;
      this.form.resetFields(["optedcode"]);
      this.form.resetFields(["applycode"]);
      this.form.resetFields(["optedcodetype"]);
      this.objflag = val;
      if (val == 1) {
        this.getOperateUserTypeList();
        this.getOperateUsernameTypeList();
      }
    },
    //被操作人姓名控件变化
    changeOptedUsernamecodetype(val) {
      this.formData.optedusernamecode = undefined;
      this.form.resetFields(["optedusernamecode"]);
      this.opteduserflag = true;
      if (val == 1) {
        this.getnodePropertyCodeList("user", 4);
      } else if (val == 2) {
        this.getnodePropertyCodeList("inputtext", 4);
      }
      if (!val) {
        this.opteduserflag = false;
      }
    },
    //被操作人标识控件变化
    changeOptedcodetype(val) {
      this.formData.optedcode = undefined;
      this.form.resetFields(["optedcode"]);
      this.optedflag = true;
      if (val == 1) {
        this.getnodePropertyCodeList("user", 1);
      } else if(val == 2) {
        this.getnodePropertyCodeList("idcard", 1);
      }else {
        this.getnodePropertyCodeList("certificate", 1);
      }
      if (!val) {
        this.optedflag = false;
      }
    },
    //切换发起校验
    changeApplyCheck(val) {
      this.applyFlag = val;
      this.applyData = [];
    },
    //切换提交校验
    changeSubmitCheck(val) {
      this.submitFlag = val;
      this.submitData = [];
      this.userInterfaceFlag = false;
    },
    //添加提交校验的其他
    addSubmitList(index, type) {
      this.submitFlow[index].data.push({
        createOrComplete: 2,
        type: type,
        modelinstanceid: this.nowid,
        code: undefined,
        relation: 1,
        values: undefined
      });
    },
    //添加发起校验的其他
    addApplyList(index, type) {
      this.applyFlow[index].data.push({
        createOrComplete: 1,
        type: type,
        modelinstanceid: this.nowid,
        code: undefined,
        relation: 1,
        values: undefined
      });
    },
    getApplyVlaue(i, j) {
      this.applyFlow[i].data[j].values = undefined;
      this.getConstants(this.applyFlow[i].data[j].code, 1);
    },
    getSubmitVlaue(i, j) {
      this.submitFlow[i].data[j].values = undefined;
      this.getConstants(this.submitFlow[i].data[j].code, 2);
    },
    //删除发起校验的其他
    delApplyList(i, j) {
      this.applyFlow[i].data.splice(j, 1);
    },
    //删除提交校验的其他
    delSubmitList(i, j) {
      this.submitFlow[i].data.splice(j, 1);
    },
    //批量获取常量字段
    getConstants(value, type) {
      let dictkeys = "";
      let flag = true;
      if (Array.isArray(value)) {
        dictkeys = value.join(",");
      } else {
        dictkeys = value;
        flag = false;
      }
      getListconstantbydictkeys(dictkeys)
        .then(res => {
          if (type == 1) {
            if (flag) {
              this.applyValueList = res.result;
            } else {
              this.$set(this.applyValueList, value, res.result[value]);
            }
          } else {
            if (flag) {
              this.submitValueList = res.result;
            } else {
              this.$set(this.submitValueList, value, res.result[value]);
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    changeUserInterface(val) {
      let obj = this.userinterfaces.find(item => {
        return item.value == val;
      });
      this.userInterfaceFlag = obj.selected;
      this.submitFlow.forEach(item => {
        if (item.type == 2) {
          if (!obj.selected) {
            item.data.code = undefined;
          }
        }
      });
    },
    //获取被操作人标识控件类型
    getOperateUserTypeList() {
      this.getConstantByDictkey("workflow.operateusertype");
    },
    getOperateUsernameTypeList() {
      this.getConstantByDictkey("workflow.operateusernametype");
    },
    getConstantByDictkey(dictkey) {
      getListconstantbydictkey(dictkey)
        .then(res => {
          if (dictkey === "workflow.operatetype") {
            this.operationObjList = res.result;
          } else if (dictkey === "workflow.operateusertype") {
            this.optedcodetypelist = res.result;
          } else if (dictkey === "workflow.operateusernametype") {
            this.optedusernamecodetypelist = res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取发起、提交校验的多选框值
    getTypeList(type) {
      getValidationType(type)
        .then(res => {
          if (res.code == "success") {
            //1:发起校验多选框   2：提交校验多选框
            if (type == 1) {
              this.applyList = res.result;
            } else if (type == 2) {
              this.submitList = res.result;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取接口数据
    getInterfaceList(type) {
      //type:3是发起校验的用编计划  type:4是提交校验的编外计划
      getUiboxs({ type: type })
        .then(res => {
          if (res.code == "success") {
            if (type == 3) {
              this.applyinterfaces = res.result;
            } else if (type == 4) {
              this.userinterfaces = res.result;
            }
            return res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取运算符接口
    getOperator() {
      getValidationOperator()
        .then(res => {
          if (res.code == "success") {
            this.operatoList = res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取常量字段
    getConstant(type) {
      getListOrgUser(type)
        .then(res => {
          if (res.code == "success") {
            if (type == "user") {
              this.submitUserList = res.result;
            } else if (type == "org") {
              this.applyOrgList = res.result;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取控件类型的下拉框值
    getnodePropertyCodeList(val, type) {
      let query = {};
      query.modelInstanceId = this.nowid;
      query.types = val;
      /**
       * 1：被操作人标识控件：idcard、user
       * 2：被操作单位标识控件，发起单位标识控件：org
       * 3：提交校验编外计划的第二个下拉框的值：combobox
       * 4：被操作人姓名控件:inputtext,user
       */
      getRelateComponents(query)
        .then(res => {
          if (res.code == "success") {
            res.result.forEach(item => {
              if (item.children && val != "certificate") {
                this.$set(item, "selectable", false);
              }
            });
            if (type == 1) {
              this.optedList = res.result;
            } else if (type == 2) {
              this.orglist = res.result;
            } else if (type == 3) {
              this.submitinterfaces = res.result;
            } else if (type == 4) {
              this.optedusernameList = res.result;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //树型选择框搜索筛选
    filterTreeNode(input, option) {
      return (
        option.componentOptions.propsData.title
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //包装树结构的数据
    treeData(list, val, type) {
      if (type == 1) {
        let value;
        list.forEach(item => {
          if (item.children) {
            item.children.forEach(o => {
              if (o.value == val) {
                value = item.value + "." + val;
              }
            });
          }
        });
        return value ? value : val;
      } else if (type == 2) {
        if (val.split(".").length > 1) {
          return val.split(".")[1];
        } else {
          return val;
        }
      }
    },
    //提交
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.applycodetype = 1;
          if (values.operatetype == 2) {
            values.optedcodetype = 4;
          }
          //几个树选择包装数据 optedusernamecode applycode optedcode
          if (values.operatetype == 1) {
            values.applycode = this.treeData(this.orglist, values.applycode, 1);
            values.optedcode = this.treeData(
              this.optedList,
              values.optedcode,
              1
            );
            values.optedusernamecode = this.treeData(
              this.optedusernameList,
              values.optedusernamecode,
              1
            );
          } else if (values.operatetype == 2) {
            values.applycode = this.treeData(this.orglist, values.applycode, 1);
            values.optedcode = this.treeData(this.orglist, values.optedcode, 1);
          }

          //发起、提交校验包装数据
          values.flowValidations = [];
          let arr = this.applyFlow.concat(this.submitFlow);
          arr.forEach(item => {
            if (Array.isArray(item.data)) {
              item.data.forEach(a => {
                if (a.relation == 1 || a.relation == 2) {
                  this.$set(a, "value", [a.value]);
                }
              });
              values.flowValidations.push({
                type: 0,
                otherFlowValidations: item.data
              });
            } else {
              values.flowValidations.push(item.data);
            }
          });
          values.id = this.modelinstanceid;
          values.modelinstanceid = this.nowid;
          saveModelinstanceExtende(values)
            .then(res => {
              if (res.code == "success") {
                this.$emit("submit", true);
                this.optedflag = false;
                this.opteduserflag = false;
              }
            })
            .catch(err => {
              showError(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.expand-attributes {
  padding-top: 20px;
  padding-bottom: 53px;
  .fieldList {
    margin-top: 5px;
    padding-left: 29.16666667%;
    /deep/ .ant-col-8 {
      margin: 3px 0;
    }
    /deep/.ant-checkbox-group {
      width: 100%;
    }
    /deep/.ant-checkbox-wrapper {
      span {
        &:last-child {
          display: inline-block;
          max-width: 70px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:first-child {
          margin-top: -18px;
        }
      }
    }
  }
  .expand-btn {
    background-color: #fff;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #efefef;
    text-align: center;
    padding: 10px 0;
  }
}
</style>