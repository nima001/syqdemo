<template>
  <!--  工改新增记录  -->
  <div class="workreformadd">
    <a-layout>
      <!-- content -->
      <a-layout-content class="content">
        <div>
          <!-- steps分步器 -->
          <div class="stepBox">
            <div class="step">
              <!-- current从0开始 -->
              <a-steps progressDot :current="stepIndex">
                <a-step title="选择台账" />
                <a-step title="设置启用时间" />
                <a-step title="调整工资项目" />
                <a-step title="调整工资标准" />
                <a-step title="项目标准关联" />
              </a-steps>
            </div>
          </div>

          <!-- 选择台账 -->
          <div v-if="stepIndex == 0">
            <div class="inputBox">
              <a-form :form="baseform">
                <a-row>
                  <a-form-item label="文件标题：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                    <a-icon type="upload" class="iconstyle" />
                    <span @click="chooseFile" id="chooseFile" href="#">选择文件</span>
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-form-item
                    label="文件名称："
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    v-if="fileData.title"
                  >
                    <span class="spanName">{{fileData.title}}</span>
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-form-item label="批准文号：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                    <a-input :value="fileData.name" disabled="disabled" style="width:100px;" />〔
                    <a-input :value="fileData.year" disabled="disabled" style="width: 70px;" />〕
                    <a-input :value="fileData.number" disabled="disabled" style="width: 60px;" />&nbsp;号
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-form-item label="发文时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                    <a-date-picker
                      disabled="disabled"
                      style="width: 300px"
                      v-decorator="['sendTxtTime']"
                    />
                  </a-form-item>
                </a-row>
              </a-form>
            </div>
          </div>

          <chooseFile-Send
            ref="mychild"
            :isShowFile="visibleFile"
            @sendFileData="fileDataFn"
            @closeModal="Modalcancel"
          ></chooseFile-Send>

          <!-- 设置启用时间 -->
          <div v-if="stepIndex == 1">
            <div class="inputBox">
              <a-form :form="baseform">
                <a-row>
                  <a-form-item label="更新原因：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                    <a-input
                      style="width: 300px"
                      v-decorator="['updateReason',{rules: [{required: true, message:'请完善信息'}]}]"
                    />
                  </a-form-item>
                </a-row>
                <a-row>
                  <a-form-item label="启用时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                    <a-date-picker
                      style="width: 300px"
                      v-decorator="['startTime',{rules: [{required: true, message:'请完善信息'}]}]"
                    />
                  </a-form-item>
                </a-row>
              </a-form>
            </div>
          </div>

          <!-- 调整工资项目 -->
          <div style="padding:12px 48px;margin-top:36px" v-if="stepIndex == 2">
            <button @click="newItemKind" class="btn">新建项目分类</button>
            <!-- 表格 -->
            <a-table
              v-if="datasourceItem.length"
              class="tableCls"
              :columns="columnsItem"
              :dataSource="datasourceItem"
              :bordered="false"
              :defaultExpandAllRows="true"
              :loading="false"
              :pagination="false"
            >
              <!-- 插槽 -->
              <div slot="operate" class="operateDiv" slot-scope="val,record">
                <!-- 子类 -->
                <span v-if="record.tags">
                  <span @click="soneditKind(record)" class="left">编辑详情</span>
                  <span @click="del(record)" class="right">删除项目</span>
                </span>
                <!-- 父类 -->
                <span v-else>
                  <span @click="editKind(record)" class="left">编辑分类</span>
                  <span @click="addItem(record)" class="center">新增项目</span>
                  <span @click="del(record)" class="right">删除分类</span>
                </span>
              </div>
            </a-table>
            <div style="height: 100px;"></div>
          </div>
          <!-- 输入信息modal -->
          <infoModal
            v-if="standardId"
            :isShowInfo="visibleInfo"
            @closeModal="Modalcancel"
            :standardId="standardId"
            :title="kind"
          ></infoModal>
          <!-- 提示 确认 modal组件 -->
          <confirmModal :isShowConfirm="visibleConfirm" @closeModal="Modalcancel"></confirmModal>

          <!-- 调整工资标准 -->
          <div style="padding:12px 48px;margin-top:36px" v-if="stepIndex == 3 && !ifEdit">
            <button @click="newpayStandard" class="btn">新增工资标准</button>
            <!-- 表格 -->
            <a-table
              class="tableCls"
              :columns="columnsStandard"
              :dataSource="datasourceStandard"
              :bordered="false"
              :loading="false"
              :customRow="customRow"
            >
              <div slot="operate" class="operateDiv" slot-scope="val,record">
                <span @click="detail(record)" class="left">查看详情</span>
                <span @click="update(record,$event)" class="center">编辑</span>
                <span @click="deleteKind(record,$event)" class="right">删除</span>
              </div>
            </a-table>
          </div>

          <!-- 编辑 -->
          <div class="editDiv" style="padding:12px 48px;margin-top:12px" v-if="ifEdit">
            <div class="titleEdit">工资标准名称：{{editItemName}}</div>
            <div class="operateFile">
              <span>更新内容：</span>
              <span>
                <a @click="modal('change')" href="#">在线编辑数值</a>
              </span>
              <span>
                <a href="#">导出Excel</a>
              </span>
              <span>
                <a href="#">导入Excel</a>
              </span>
              <span>
                <a @click="modal('house')" href="#">引用标准库</a>
              </span>
            </div>
            <a-table
              class="tableClsEdit"
              :columns="columnsEdit"
              :dataSource="datasourceEdit"
              :bordered="true"
              :loading="false"
              :pagination="false"
            ></a-table>
            <!-- 编辑 modal -->
            <salaryStandard-Modal
              v-if="detailDataForEdit.code"
              @closeModal="cancelEditModal"
              :isShow="visibleEditModal"
              :detailData="detailDataForEdit"
              :type="type"
            ></salaryStandard-Modal>
            <div style="height: 72px;"></div>
          </div>
          <!-- 按钮 -->
          <div v-if="stepIndex == 3 && ifEdit" class="twoButton">
            <button @click="backTostandard">取消</button>
            <button @click="changeTable">确定</button>
          </div>

          <!-- 表格modal -->
          <salaryStandard-Modal
            v-if="detailData.code"
            @closeModal="ModalcancelTable"
            :detailData="detailData"
            :isShow="visibleTable"
          ></salaryStandard-Modal>

          <!-- 项目关联标准 -->
          <div style="padding:12px 48px;margin-top:36px" v-if="stepIndex == 4 && !ifsetLink">
            <!-- 表格 -->
            <a-table
              v-if="datasourceLink.length"
              class="tableCls"
              :columns="columnsLink"
              :dataSource="datasourceLink"
              :bordered="false"
              :defaultExpandAllRows="true"
              :loading="false"
              :pagination="false"
            >
              <div slot="operate" class="operateDiv" slot-scope="val,record">
                <span v-if="record.tags" @click="setLink(record)" class="left">设置关联</span>
              </div>
            </a-table>
            <div style="height: 100px;"></div>
          </div>
          <!-- 设置关联 -->
          <div style="padding:12px 48px;margin-top:36px" v-if="ifsetLink">
            <div class="linkbox">
              <div class="rule">基本工资——职务工资</div>
              <div class="container">
                <!-- 80px -->
                <div>规则 1:</div>
                <!-- auto -->
                <div class="detailForm">
                  <!-- 第一条 -->
                  <div>
                    <!-- 嵌套下拉 -->
                    <!-- :value='ruleType' -->
                    <a-tree-select
                      style="width: 200px"
                      :dropdownStyle="{ maxHeight:'200px',overflow:'auto' }"
                      :treeData="sortArr"
                      placeholder="Please select"
                      @change="userChoose"
                      v-model="treeSelectVal"
                    ></a-tree-select>
                    <!-- =  <>  like  not -->
                    <a-select
                      @change="chooseSymbol"
                      style="width: 100px;margin-left: 12px;"
                      :defaultValue="ruleSymbol"
                    >
                      <a-select-option value="=">等于</a-select-option>
                      <a-select-option value="&lt;&gt;">不等于</a-select-option>
                      <a-select-option value="like">包含</a-select-option>
                      <a-select-option value="not">不包含</a-select-option>
                    </a-select>
                    <!-- ruleResult -->
                    <a-select style="width: 100px;margin-left: 12px;" :defaultValue="ruleResult">
                      <a-select-option value="1">字段值</a-select-option>
                    </a-select>
                    <!-- ruleVal -->
                    <a-input
                      @blur="chooseRuleVal($event)"
                      v-model="ruleVal"
                      style="width: 250px;margin-left: 12px;"
                    />
                    <a-icon
                      style="color:rgba(0, 0, 255, 0.514);font-size:18px;margin-left: 12px;cursor: pointer;"
                      type="plus"
                    />
                    <a-icon
                      style="color: red;font-size: 18px;margin-left: 12px;cursor: pointer;"
                      type="close"
                    />
                  </div>

                  <div style="margin-top: 36px;">
                    <span>是否关联标准：</span>
                    <a-select
                      @change="changelinkStandard"
                      style="width: 200px;margin-left: 12px;"
                      defaultValue="关联工资标准"
                    >
                      <a-select-option value="1">关联工资标准</a-select-option>
                      <a-select-option value="0">手动录入</a-select-option>
                    </a-select>

                    <span style="margin-left: 24px;">选择工资标准：</span>
                    <a-select
                      @change="changePayStandard"
                      style="width: 300px;margin-left: 12px;"
                      :defaultValue="userChoosePayStandard"
                    >
                      <a-select-option
                        v-for="(item,index) in choosepayStandard"
                        :key="index"
                        :value="item.code"
                      >{{item.name}}</a-select-option>
                      <!-- <a-select-option value="1">公务员职务工资</a-select-option>
                      <a-select-option value="2">公务员级别工资</a-select-option>-->
                    </a-select>
                  </div>
                </div>
                <!-- 100px -->
                <div style="text-align: right;color: red;cursor: pointer;">删除规则</div>
              </div>

              <!-- 遍历新建的规则 -->
              <div v-for="(item,index) in allRuleArr" class="container marginTop" :key="index">
                <!-- 80px -->
                <div>规则 {{index + 2}}:</div>
                <!-- auto -->
                <div class="detailForm">
                  <!-- 第一条 -->
                  <div>
                    <!-- 嵌套下拉 -->
                    <a-tree-select
                      style="width: 200px"
                      :dropdownStyle="{ maxHeight:'200px',overflow:'auto' }"
                      :treeData="sortArr"
                      placeholder
                      @change="userChoose"
                      value
                    ></a-tree-select>
                    <!-- =  <>  like  not -->
                    <a-select style="width: 100px;margin-left: 12px;" defaultValue="等于">
                      <a-select-option value="1">等于</a-select-option>
                      <a-select-option value="2">不等于</a-select-option>
                      <a-select-option value="3">包含</a-select-option>
                      <a-select-option value="4">不包含</a-select-option>
                    </a-select>
                    <!-- ruleResult -->
                    <a-select style="width: 100px;margin-left: 12px;" defaultValue="字段值">
                      <a-select-option value="1">字段值</a-select-option>
                    </a-select>
                    <!-- ruleVal -->
                    <a-input value style="width: 250px;margin-left: 12px;" />
                    <a-icon
                      style="color:rgba(0, 0, 255, 0.514);font-size:18px;margin-left: 12px;cursor: pointer;"
                      type="plus"
                    />
                    <a-icon
                      style="color: red;font-size: 18px;margin-left: 12px;cursor: pointer;"
                      type="close"
                    />
                  </div>

                  <div style="margin-top: 36px;">
                    <span>是否关联标准：</span>
                    <a-select style="width: 200px;margin-left: 12px;" defaultValue="关联工资标准">
                      <a-select-option value="1">关联工资标准</a-select-option>
                      <a-select-option value="2">手动录入</a-select-option>
                    </a-select>

                    <span style="margin-left: 24px;">选择工资标准：</span>
                    <a-select style="width: 300px;margin-left: 12px;" defaultValue>
                      <a-select-option
                        v-for="(item,index) in choosepayStandard"
                        :key="index"
                        :value="index"
                      >{{item.name}}</a-select-option>
                      <!-- <a-select-option value="1">公务员职务工资</a-select-option>
                      <a-select-option value="2">公务员级别工资</a-select-option>-->
                    </a-select>
                  </div>
                </div>
                <!-- 100px -->
                <div
                  @click="deleteRule(item)"
                  style="text-align: right;color: red;cursor: pointer;"
                >删除规则</div>
              </div>

              <div class="addrule">
                <div @click="addnewrule">
                  <a-icon
                    style="color:rgba(0, 0, 255, 0.514);font-size:18px;margin-left: 12px;cursor: pointer;"
                    type="plus"
                  />
                  <span style="cursor: pointer;">新建规则</span>
                </div>
              </div>
              <div style="height: 200px;"></div>
            </div>
          </div>
          <!-- 按钮 -->
          <div v-if="ifsetLink" class="twoButton">
            <button @click="back">返回</button>
            <button @click="save">保存</button>
          </div>

          <!-- 按钮 -->
          <div v-if="stepIndex == 0" class="singleButton">
            <button @click="next">下一步</button>
          </div>

          <div v-if="stepIndex != 0 && stepIndex != 4 && !ifEdit" class="twoButton">
            <button @click="before">上一步</button>
            <button @click="next">下一步</button>
          </div>

          <div v-if="stepIndex == 4 && !ifsetLink" class="twoButton">
            <button @click="before">上一步</button>
            <button @click="SendruleObjCopy">保存</button>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import chooseFileSend from "./ChooseFileModal";
import salaryStandardModal from "./SalaryStandardModal";
import confirmModal from "./ConfirmModal";
import infoModal from "./InfoModal";
import moment from "moment";
import getTable from "./table";
import { showError } from "@/framework/utils/index";
import {
  postarchive,
  getitem,
  getnewdata,
  getscale,
  docQuery,
  scalearchive
} from "@/salary/api/wagesystem";
import {
  Layout,
  Breadcrumb,
  Button,
  Table,
  Form,
  Input,
  Icon,
  Select,
  TreeSelect,
  Row,
  Steps,
  DatePicker
} from "ant-design-vue";
export default {
  name: "workreformadd",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    ATable: Table,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AIcon: Icon,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATreeSelect: TreeSelect,
    ARow: Row,
    ASteps: Steps,
    AStep: Steps.Step,
    ADatePicker: DatePicker,
    chooseFileSend,
    infoModal,
    confirmModal,
    salaryStandardModal
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
    this.editform = this.$form.createForm(this);
  },
  data() {
    return {
      editItemName: "", //当前编辑的项目的名称
      standardId: "", //该条标准的id
      detailDataForEdit: "", //传递给 编辑界面 在线编辑 打开的表格modal
      type: 1,
      fileTitle: "", // 文件标题
      sendTbody: "", //最终需要上传的tbody
      sendThead: "", //最终需要上传的thead
      scaleId: "",
      visibleEditModal: false,
      ifEdit: false, //是否编辑
      detailData: "", //表格数据
      visibleTable: false,
      ruleArr: [1, 2], //规则条数
      onlyKey: "", //编辑项目时候的唯一key
      visibleConfirm: false,
      fileData: "", //step 0  文件数据   包括 时间
      setStartTime: {}, //step 1  设置启用时间 和时间 数据
      ifsetLink: false,
      visibleFile: false,
      visibleInfo: false,
      kind: "",
      columnsEdit: [],
      datasourceEdit: [], //编辑处展示表格数据
      baseform: this.$form.createForm(this),
      editform: this.$form.createForm(this),
      stepIndex: 0,
      //调整工资项目
      columnsItem: [
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "70%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "left",
          width: "30%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasourceItem: [], //step 2调整工资项目 行数据
      //调整工资标准
      columnsStandard: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          width: "5%",
          scopedSlots: { customRender: "index" }
        },
        {
          title: "工资标准名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "65%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "30%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasourceStandard: [{ key: 1, index: 1, name: "xxxxxxxx" }],
      //项目标准关联
      columnsLink: [
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "关联标准",
          dataIndex: "linkStandard",
          key: "linkStandard",
          align: "center",
          width: "50%",
          scopedSlots: { customRender: "linkStandard" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "30%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasourceLink: [
        { key: 1, name: "xxxxxxx", linkStandard: "公务员职务工资" }
      ],
      allData: [], //89条人员信息
      ruleObj: {}, //标准的规则
      sortArr: [], //分类出来的数组
      linkScalecode: "", //工资标准  选择工资标准
      ruleType: "", //规则类型
      ruleVal: "", //规则值
      ruleResult: "", //规则字段值
      ruleSymbol: "", //等于 不等于 包含  不包含
      allRuleArr: [], //规则数组
      choosepayStandard: [], //工改提交的标准
      ruleObjCopy: "", //复制的规则对象
      treeSelectVal: "", //tree 下拉框的value
      operateId: "", //用户设置关联的id
      userChoosePayStandard: "" //选择工资标准的值
    };
  },
  // created() {
  //   this.gettabledata();
  // },
  methods: {
    gettabledata() {
      let data = {
        needtotal: true,
        pagenum: 10,
        pagesize: 1
      };
      docQuery(data)
        .then(res => {})
        .catch(error => {
          showError(error);
        });
    },
    customRow: function(record) {
      //点击行的回调  record当前行的数据
      let that = this;
      return {
        on: {
          click: function() {
            that.detail(record);
          }
        }
      };
    },
    //嵌套下拉 的事件回调
    /////////////////////////////////////条数对应/////////////////////////////////////////////////////////////////////////////
    userChoose(value, label, extra) {
      let type = label[0];

      let obj = this.allData.find(item => item.name == type);

      this.ruleObjCopy[0].expression[0].code = obj.code;
      this.treeSelectVal = label[0];
    },
    //Symbol 回调
    chooseSymbol(value, label, extra) {
      this.ruleObjCopy[0].expression[0].symbol = value;
    },
    //更改  RuleVal
    chooseRuleVal(e) {
      this.ruleObjCopy[0].expression[0].value = e.target.value;
    },
    //改变关联标准   0 手动录入
    changelinkStandard(value) {
      this.ruleObjCopy[0].iscriteria = value;
    },
    //选择工资标准
    changePayStandard(value) {
      this.ruleObjCopy[0].code = value;
    },
    //提交数据给后台
    SendruleObjCopy() {
      let obj = {};
      obj.enabledate = this.setStartTime.startTime; //启用时间
      obj.ledger = this.fileData.id; //文件id
      obj.reason = this.setStartTime.updateReason; //调标原因
      obj.wageCategoryVos = this.datasourceItem;
      // postarchive(obj)
      //   .then(res => {
      // this.$router.push("/business/workreform");
      //   })
      //   .catch(error => {
      //     showError(error);
      //   });
    },
    //编辑modal的退出
    cancelEditModal(changeObj) {
      this.visibleEditModal = false;
      if (changeObj.datasource) {
        this.datasourceEdit = changeObj.datasource; //更新界面表格数据
        this.sendTbody = changeObj.sendArr; //保存 当前操作的表格的tbody
        this.sendThead = changeObj.sendHead; //保存 表格的thead
      } else {
      }
      this.detailDataForEdit = ""; //清除缓存
    },
    ModalcancelTable(close) {
      if (close == "close") {
        this.detailData = "";
      }
      this.visibleTable = false;
    },
    //排序
    mySort(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i]["key"] = i + 1;
        let childrenArr = arr[i].children;
        if (childrenArr) {
          for (let j = 0; j < childrenArr.length; j++) {
            childrenArr[j]["key"] = `key${i + 1}-${j + 1}`; //children key
          }
        }
      }
    },
    //下一步
    next() {
      if (this.stepIndex == 0) {
        setTimeout(() => {
          this.baseform.setFieldsValue({
            updateReason: this.setStartTime.updateReason
          });

          this.baseform.setFieldsValue({
            startTime: this.setStartTime.startTimeMoment
          });
        }, 0);
      }
      if (this.stepIndex == 1) {
        this.baseform.validateFields((err, values) => {
          if (!err) {
            let startTime = values.startTime.format("YYYY-MM"); //字符串 date
            let updateReason = values.updateReason;
            this.setStartTime.startTime = startTime;
            this.setStartTime.startTimeMoment = moment(values.startTime); //moment date
            this.setStartTime.updateReason = updateReason;
            let _this = this;
            //显示存活的工资项
            getitem()
              .then(res => {
                let resdata = res.result; //arr
                _this.mySort(resdata);
                _this.datasourceItem = resdata; //表格 行数据
                _this.stepIndex = _this.stepIndex + 1;
              })
              .catch(error => {
                showError(error);
              });
          }
        });

        //之后上传需要的信息 文件信息  更改原因
        //  _this.datasourceItem 调整工资项目里的表格数据
      } else if (this.stepIndex == 2) {
        let _this = this;
        let dataArr;
        const data = {
          pagenum: 1,
          pagesize: 10,
          needtotal: true
        };
        getscale(data)
          .then(res => {
            dataArr = res.result.rows;
            for (let i = 0; i < dataArr.length; i++) {
              dataArr[i]["key"] = `key${i}`;
              dataArr[i].index = i + 1;
            }
            _this.datasourceStandard = dataArr;
            _this.stepIndex = _this.stepIndex + 1;
          })
          .catch(error => {
            showError(error);
          });
      } else if (this.stepIndex == 3) {
        //上传 工资标准的数据
        let _this = this;
        //最终上传的对象
        let userObj = {};
        userObj.enabledate = this.setStartTime.startTime; //启用时间
        userObj.ledger = this.fileData.id; //文件id
        userObj.reason = this.setStartTime.updateReason; //调标原因
        userObj.wageScaleVoRes = []; //每条工资标准
        let standard = {}; //一条标准的表格数据： {表字段，表数据}
        //this.datasourceStandard  ->  全部的标准的数据
        for (let i = 0; i < this.datasourceStandard.length; i++) {
          standard = {};
          standard.horizontal = this.datasourceStandard[i].horizontal;
          standard.id = this.datasourceStandard[i].id;
          standard.name = this.datasourceStandard[i].name;
          standard.standard = this.datasourceStandard[i].standard;
          standard.vertical = this.datasourceStandard[i].vertical;
          standard.wageScaleDataRe = {}; //表格数据tbody
          //封装 tbody 和 thead
          standard.wageScaleDataRe.tbody = this.datasourceStandard[i].sendArr;
          standard.wageScaleDataRe.thead = this.datasourceStandard[
            i
          ].sendArrThead;
          userObj.wageScaleVoRes.push(standard);
        }
        //上传
        scalearchive(userObj).then(res => {
          _this.stepIndex = _this.stepIndex + 1;
          _this.datasourceLink = _this.datasourceItem;
        });
      } else {
        if (!this.fileData) {
          this.$notification.error({
            message: "提示",
            description: "请至少选择一个文件",
            duration: 2
          });
          return;
        }
        this.stepIndex = this.stepIndex + 1;
      }
    },
    //上一步
    before() {
      if (this.stepIndex == 1) {
        setTimeout(() => {
          this.baseform.setFieldsValue({
            sendTxtTime: this.fileData.sendTxtTime
          });
        }, 0);
      }
      if (this.stepIndex == 2) {
        setTimeout(() => {
          this.baseform.setFieldsValue({
            updateReason: this.setStartTime.updateReason
          });

          this.baseform.setFieldsValue({
            startTime: this.setStartTime.startTimeMoment
          });
        }, 0);
      }
      this.stepIndex = this.stepIndex - 1;
    },
    //根据 kind 判断是哪种类型的值
    Modalcancel(obj) {
      if (obj == "closeEdit") {
        this.standardId = "";
        return;
      }
      //更改 项目统发  加减项 等的操作    已有的项目详情
      if (obj && obj.express && obj.express == "sendDetailItem") {
        for (let i = 0; i < this.datasourceItem.length; i++) {
          for (let j = 0; j < this.datasourceItem[i].children.length; j++) {
            if (this.datasourceItem[i].children[j].id == this.standardId.id) {
              this.datasourceItem[i].children[j].name = obj.values.kindName; //项目名称
              if (obj.values.ifAdd == "加项") {
                this.datasourceItem[i].children[j].issubitem = 0;
              } else if (obj.values.ifAdd == "减项") {
                this.datasourceItem[i].children[j].issubitem = 1;
              } else {
                this.datasourceItem[i].children[j].issubitem = obj.values.ifAdd; //是否加减项
              }

              if (obj.values.ifAll == "统发") {
                this.datasourceItem[i].children[j].isdistribution = 0;
              } else if (obj.values.ifAll == "自发") {
                this.datasourceItem[i].children[j].isdistribution = 1;
              } else {
                this.datasourceItem[i].children[j].isdistribution =
                  obj.values.ifAll; //是否统发 自发
              }
            }
          }
        }
      }
      //新建的 项目详情
      if (obj && obj.express && obj.express == "sendDetailItem_NEW") {
        for (let i = 0; i < this.datasourceItem.length; i++) {
          for (let j = 0; j < this.datasourceItem[i].children.length; j++) {
            if (
              this.datasourceItem[i].children[j].onlyItemKey ==
              obj.newValues.onlyItemKey
            ) {
              this.$set(this.datasourceItem[i].children, j, obj.newValues);
              //this.datasourceItem[i].children[j] = obj.newValues
            }
          }
        }
      }

      this.standardId = "";
      this.visibleFile = false;
      this.visibleInfo = false;
      this.visibleConfirm = false;
      if (obj) {
        // 1)  新增项目分类 逻辑
        if (obj.kind == "新增项目分类") {
          let newObj = {};
          newObj.name = obj.val;
          let len = this.datasourceItem.length;
          newObj.key = len + 1;
          this.datasourceItem.push(newObj); //对datasourceItem做更改
        }
        // 2)  编辑项目分类 逻辑
        if (obj.kind == "编辑项目分类") {
          for (let i = 0; i < this.datasourceItem.length; i++) {
            let childrenArr = this.datasourceItem[i].children;

            if (childrenArr) {
              for (let j = 0; j < childrenArr.length; j++) {
                if (childrenArr[j].key == this.onlyKey) {
                  childrenArr[j].name = obj.val;
                  return;
                }
              }
            }
            //更改datasourceItem中的项目类别名称
            if (this.datasourceItem[i].key == this.onlyKey) {
              this.datasourceItem[i].name = obj.val;
              if (childrenArr) {
                for (let j = 0; j < childrenArr.length; j++) {
                  childrenArr[j].categoryname = obj.val;
                  childrenArr[j].fatherName = obj.val;
                }
              }
              return;
            }
          }
        }

        // 3)  新增子项目 逻辑
        if (obj.kind == "新增项目") {
          for (let i = 0; i < this.datasourceItem.length; i++) {
            if (this.datasourceItem[i].key == this.onlyKey) {
              let newObj = {};
              newObj.name = obj.val;
              let len;
              if (this.datasourceItem[i].children) {
                len = this.datasourceItem[i].children.length;
              } else {
                len = 0;

                this.$set(this.datasourceItem[i], "children", []);
              }
              newObj.key = `key${i + 1}-${len + 1}`;
              newObj.tags = "child";
              newObj.fatherName = this.datasourceItem[i].name;
              newObj.orderby = len + 1;
              newObj.onlyItemKey = new Date().getTime();

              newObj.categoryname = this.datasourceItem[i].name;
              newObj.isdistribution = "";
              newObj.issubitem = "";
              newObj.rule = [];
              this.datasourceItem[i].children.push(newObj);
            }
          }
        }
        // 4)  删除项目分类 逻辑
        if (obj == 1) {
          for (let i = 0; i < this.datasourceItem.length; i++) {
            let childrenArr = this.datasourceItem[i].children;
            if (childrenArr) {
              for (let j = 0; j < childrenArr.length; j++) {
                if (childrenArr[j].key == this.onlyKey) {
                  childrenArr.splice(j, 1);
                  //对整个datasourceItem 进行重新排序
                  this.mySort(this.datasourceItem);
                  return;
                }
              }
            }
            //更改datasourceItem中的项目类别名称
            if (this.datasourceItem[i].key == this.onlyKey) {
              this.datasourceItem.splice(i, 1);
              this.mySort(this.datasourceItem);
              return;
            }
          }
        }

        // 5)  新增工资标准 逻辑
        if (obj.kind == "新增工资标准") {
          let newObj = {};
          newObj.name = obj.val;
          let len = this.datasourceStandard.length;
          newObj.key = `key${len}`;
          newObj.index = len + 1;
          this.datasourceStandard.push(newObj);
        }
      }
      this.standardId = "";
    },
    //选择文件
    fileDataFn(data) {
      let str = data.num;
      //截取有效字段
      let index_left = str.indexOf("〔");
      let index_right = str.indexOf("〕");
      let name = str.substring(0, index_left);
      let year = str.substring(index_left + 1, index_right);
      if (str.indexOf("号") != -1) {
        this.strnumber = str.substring(index_right + 1, str.lastIndexOf("号"));
      } else {
        this.strnumber = str.substring(index_right + 1, str.length);
      }
      let number = this.strnumber;
      //封装fileData
      this.fileData = data;
      this.fileData.fileName = data.fileName;
      this.fileData.name = name;
      this.fileData.year = year;
      this.fileData.number = number;
      this.fileData.sendFileTime = data.dispatchdate;
      //时期 setFieldsValue
      this.baseform.setFieldsValue({
        sendTxtTime: moment(data.dispatchdate)
      });
    },
    chooseFile() {
      this.visibleFile = true;
      this.$refs.mychild.getlist();
    },
    //新建项目分类
    newItemKind() {
      this.standardId = "nodetail";
      this.kind = "新增项目分类";
      this.visibleInfo = true;
    },
    //编辑 子项的分类
    soneditKind(record) {
      this.standardId = "";
      this.kind = "编辑项目详情分类";
      //当前项目
      if (record.id) {
        this.standardId = {};
        this.standardId.id = record.id;
        this.standardId.dataItem = this.datasourceItem;
      } else {
        //新增的时候加了一些字段 -》 点击编辑传入当前行数据 再modal中展示
        //用户新增的项目
        let Itemobj = {};
        Itemobj.mark = record.onlyItemKey; //时间戳 标识唯一项目

        Itemobj.struct = record;

        this.standardId = Itemobj;
      }
      this.visibleInfo = true;
    },
    //编辑分类
    editKind(record) {
      let key = record.key;
      this.onlyKey = key;
      this.kind = "编辑项目分类";
      this.standardId = "nodetail";
      this.visibleInfo = true;
    },
    //删除分类
    del(record) {
      this.onlyKey = record.key;
      this.visibleConfirm = true;
    },
    backTostandard() {
      this.ifEdit = false;
    },
    //新增项目
    addItem(record) {
      this.onlyKey = record.key;
      this.kind = "新增项目";
      this.visibleInfo = true;
      this.standardId = "nodetail";
    },
    //新增工资标准
    newpayStandard() {
      this.kind = "新增工资标准";
      this.standardId = "nodetail";
      this.visibleInfo = true;
    },
    //查看详情
    detail(record) {
      let id = record.id;
      getnewdata(id)
        .then(res => {
          res.itemName = record.name;
          //调取接口 将获得的data 传递至 salaryModal组件中进行处理展示表格
          this.detailData = res;
          this.visibleTable = true; //详情table
        })
        .catch(error => {
          showError(error);
        });
    },
    modal(type) {
      if (type == "change") {
        this.type = "change"; //编辑modal
        let id = this.scaleId; //直接根据 id 展示数据
        getnewdata(id)
          .then(res => {
            res.itemName = this.editItemName;
            this.detailDataForEdit = res; //将数据放置到 salaryModal中处理
            this.visibleEditModal = true; //展示详情table
          })
          .catch(error => {
            showError(error);
          });
      }
    },
    //确认更新表格数据
    changeTable() {
      let arr = this.datasourceStandard;
      for (let m = 0; m < arr.length; m++) {
        if (arr[m].id == this.scaleId) {
          //arr[m].enabletime = values.startTime.format("YYYY-MM-DD")
          //标准的表格数据   写入arr  用户做了相应的编辑操作
          arr[m].sendArr = this.sendTbody; ////tbody放进 该条id的数据中
          arr[m].sendArrThead = this.sendThead;
          this.ifEdit = false;
        }
      }
    },
    //编辑
    update(record, e) {
      if (e) {
        e.stopPropagation();
      }
      //根据id 调取接口  并存下用户当前操作的数据的id
      let id = record.id;
      this.scaleId = id; //操作中的scaleID
      getnewdata(id)
        .then(res => {
          this.editItemName = record.name;
          let resdata = getTable(res); //当前就处理好数据
          this.columnsEdit = resdata.columns; //列
          this.datasourceEdit = resdata.datasource; //行
          this.ifEdit = true; //打开编辑界面
        })
        .catch(error => {
          showError(error);
        });
    },
    //删除当前分类
    deleteKind() {
      return;
    },
    //设置关联
    setLink(record) {
      let that = this;
      this.operateId = record.id;
      this.ruleObj = record.rule[0].expression[0];
      this.ruleObjCopy = record.rule; //复制一个规则对象给用户操作

      //该条规则的相关信息 -> 选择工资标准
      this.linkScalecode = record.rule[0].scalecode;

      let code = this.ruleObj.code; //类型
      this.ruleVal = this.ruleObj.value; //值
      this.ruleResult = this.ruleObj.result; //规则字段值
      //this.ruleSymbol = this.ruleObj.symbol   //等于 不等于

      this.ruleSymbol =
        this.ruleObj.symbol == "="
          ? "等于"
          : this.ruleObj.symbol == "<>"
          ? "不等于"
          : this.ruleObj.symbol == "like"
          ? "包含"
          : "不包含";

      getperson()
        .then(res => {
          //全部数据  89条
          that.allData = res.result;
          let infoObj = {};
          let resultdata = res.result;
          resultdata.forEach((item, index) => {
            //配对code

            if (item.code == code) {
              that.treeSelectVal = item.name;
            }
            // sort 筛选
            item.title = item.name;
            item.value = `0-${index}`;
            if (infoObj[item.sort] == undefined) {
              infoObj[item.sort] = [];
              infoObj[item.sort].push(item);
            } else {
              infoObj[item.sort].push(item);
            }
          });
          //分类出来的全部数据
          let sortArr = [];
          let newObj = {};
          let index = 0;
          for (let key in infoObj) {
            newObj = {};
            newObj.title = key;
            newObj.value = `${index}`;
            newObj.disabled = true;
            index++;
            newObj.children = infoObj[key];
            sortArr.push(newObj);
          }
          that.sortArr = sortArr; //分类出来的数组
          //获取工改提交的标准
          getnotexist()
            .then(res => {
              //是否关联标准  选择工资标准  数据接口
              that.choosepayStandard = res.result;
              let obj = res.result.find(item => {
                return item.code == that.linkScalecode;
              });
              that.userChoosePayStandard = obj.name;
              that.ifsetLink = true;
            })
            .catch(error => {
              showError(error);
            });
        })
        .catch(error => {
          showError(error);
        });
    },
    //返回  ->  退出关联编辑
    back() {
      this.ifsetLink = false;
      this.allRuleArr = [];
      this.ruleObjCopy = {}; //返回不保存数据
    },
    //保存关联
    save() {
      for (let i = 0; i < this.datasourceItem.length; i++) {
        for (let j = 0; j < this.datasourceItem[i].children.length; j++) {
          if (this.datasourceItem[i].children[j].id == this.operateId) {
            this.datasourceItem[i].children[j].rule = this.ruleObjCopy;
          }
        }
      }
      this.ifsetLink = false;
    },
    //增加配对的 字段
    addForm() {},
    //删除工资标准
    deleteKind(record, e) {
      if (e) {
        e.stopPropagation();
      }

      for (let i = 0; i < this.datasourceStandard.length; i++) {
        if (this.datasourceStandard[i].key == record.key) {
          this.datasourceStandard.splice(i, 1);
          for (let m = 0; m < this.datasourceStandard.length; m++) {
            this.datasourceStandard[m].key = `key${m}`;
            this.datasourceStandard[m].index = m + 1;
          }
        }
      }
    },
    //新建规则
    addnewrule() {
      let len = this.allRuleArr.length;
      this.allRuleArr.push(len);
    },
    //删除规则
    deleteRule(item) {
      this.allRuleArr.splice(this.allRuleArr.indexOf(item), 1);
    }
  }
};
</script>
<style lang="less" scoped>
.workreformadd {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .ant-layout-header {
    height: 40px;
    padding: 0 24px;
    background-color: #fff;
    overflow: hidden;
  }
  .ant-breadcrumb {
    margin: 10px 0;
  }
  /* 内容区样式 */
  .content {
    padding: @layout-space-base;
  }
  .content > div:nth-of-type(1) {
    background-color: #fff;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: @content-padding-v @content-padding-h;
  }

  .ant-table-tbody tr {
    cursor: pointer;
  }
  /* 表格 */
  .tableCls {
    margin-top: 12px;
    height: 500px;
    overflow-y: auto;
  }
  /* 表格padding设置 */
  .editDiv .ant-table-thead tr th {
    padding: 6px;
  }
  .editDiv .ant-table-tbody tr td {
    padding: 6px;
  }
  .tableClsForchoose {
    margin-top: 48px;
  }
  /* 表格编号 */
  .index {
    font-weight: bold;
    text-align: center;
  }
  /* 按钮 */
  .btn {
    display: block;
    width: 100px;
    height: 32px;
    border: none;
    outline: none;
    background-color: @primary-color;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  /* 分步器 */
  .stepBox {
    width: 100%;
    margin: 0 auto;
    position: relative;
    height: 60px;
    margin-top: 48px;
  }
  .stepBox .step {
    width: 100%;
  }
  /* 按钮 */
  .twoButton {
    position: fixed;
    left: 50%;
    height: 32px;
    width: 240px;
    margin-left: -120px;
    display: grid;
    grid-template-columns: repeat(2, 100px);
    justify-content: space-around;
    bottom: 48px;
  }

  .singleButton {
    position: absolute;
    left: 50%;
    height: 32px;
    width: 100px;
    margin-left: -50px;
    bottom: 48px;
  }
  .singleButton button {
    border: none;
    outline: none;
    background-color: white;
    color: @primary-color;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid @primary-color;
    height: 32px;
    width: 100px;
  }

  .twoButton button:nth-of-type(1) {
    border: none;
    outline: none;
    background-color: @primary-color;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .twoButton button:nth-of-type(2) {
    border: none;
    outline: none;
    background-color: @primary-color;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  /* 表单信息 */
  .inputBox {
    width: 800px;
    margin: 0 auto;
    margin-top: 48px;
    .iconstyle {
      color: @primary-color;
    }
    .spanName {
      // padding-left: 15px;
      // width: 180px;
      // overflow: hidden;
      // margin: 0;
      white-space: nowrap;
      // text-overflow: ellipsis;
    }
  }
  /* 选择文件 */
  #chooseFile {
    cursor:pointer;
    font-size: 15px;
  }
  /* 查看详情  更新 */
  .left,
  .center {
    cursor: pointer;
    color: #02a7f0;
  }
  /* 查看详情 a标签 */
  .left {
    padding-right: 10px;
  }
  .left:hover {
    text-decoration: underline;
  }
  /* 更新 a标签 */
  .center {
    padding-left: 10px;
    padding-right: 10px;
  }
  .center:hover {
    text-decoration: underline;
  }
  .right {
    cursor: pointer;
    color: #d60002;
    padding-left: 10px;
  }
  .right:hover {
    text-decoration: underline;
  }
  .title {
    text-align: center;
    width: 40vw;
    margin: 0 auto;
    font-size: 25px;
    color: black;
    font-weight: bold;
    margin-top: 36px;
  }
  /* 关联 */
  .linkbox {
    width: 1000px;
    height: 400px;
    margin: 0 auto;
  }
  .rule {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: black;
  }
  .container {
    display: grid;
    grid-template-columns: 80px auto 100px;
    border: 1px dotted grey;
    padding: 10px;
    margin-top: 0;
    border-radius: 5px;
  }
  .marginTop {
    margin-top: 48px;
  }
  .detailForm {
    border: none;
  }
  .label {
    display: inline-block;
    margin-left: 12px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    width: 50px;
    text-align: center;
    background-color: lightblue;
  }
  /* step */
  .ant-steps-item-process
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: #d60002;
  }
  .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: #d60002;
  }
  .ant-steps-item-finish > .ant-steps-item-tail:after {
    background: #d60002;
  }

  /* 编辑样式 */
  /* 标题 */
  .titleEdit {
    width: 600px;
    margin: 0 auto;
    font-size: 20px;
    color: black;
    font-weight: bold;
    margin-top: 0px;
    text-align: center;
  }
  /* ant表单 */
  .form {
    margin-top: 24px;
  }
  .operateFile a {
    text-decoration: underline;
    padding-right: 12px;
    cursor: pointer;
  }
  .operateFile {
    width: 600px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, auto);
    justify-content: center;
    margin-top: 24px;
  }
  .addrule {
    margin-top: 48px;
    border: 1px dotted grey;
    padding: 10px;
    border-radius: 5px;
  }
  /* 表格  编辑处 */
  .tableClsEdit {
    /* width: 600px; */
    margin: 0 auto;
    margin-top: 24px;
    width: 60%;
    height: 400px;
    overflow-y: auto;
  }
}
</style>