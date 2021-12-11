<template>
  <a-layout class="addnewrecord">
    <a-layout-content v-if="!ifChooseStandard" class="content">
      <div>
        <!-- steps -->
        <div class="stepBox">
          <div class="step">
            <!-- current从0开始 -->
            <a-steps progressDot :current="stepIndex">
              <a-step title="选择台账" />
              <a-step title="调整标准" />
            </a-steps>
          </div>
        </div>
        <!-- 调整标准 -->
        <div style="padding:12px 48px;margin-top:36px" v-if="stepIndex == 1">
          <button @click="chooseStandard" class="newbtn">选择标准</button>
          <!-- 表格 -->
          <a-table
            class="tableCls"
            :columns="columns"
            :dataSource="datasource"
            :bordered="true"
            :loading="false"
            :pagination="false"
            :customRow="customRow"
            @change="changePagination"
          >
            <div slot="operate" class="operateDiv" slot-scope="val,record">
              <span @click="detail(1,record)" class="lookDetail">查看详情</span>
              <span @click="update(record)" class="update">更新</span>
              <span @click="del(record)" class="del">删除</span>
            </div>
          </a-table>
          <!-- 详情 modal 引入的组件 -->
          <salaryStandard-Modal
            v-if="detailData.code"
            @closeModal="Modalcancel"
            :isShow="visible"
            :detailData="detailData"
            :type="type"
          ></salaryStandard-Modal>
        </div>
        <!-- 选择台账 -->
        <div v-if="stepIndex == 0">
          <div class="inputBox">
            <a-form :form="baseform">
              <a-row>
                <a-form-item label="调标原因：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                  <a-input
                    style="width: 300px;"
                    v-decorator="[
                                                'changeReason',
                                                {rules: [{required: true, message:'请完善信息'}]}
                                            ]"
                  />
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="文件标题：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                  <a-icon type="upload" class="iconstyle" />
                  <span @click="chooseFileSend" id="chooseFile" href="#">选择文件</span>
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
                <a-form-item
                  label="批准文号："
                  :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 12 }"
                  class="fatherbox"
                >
                  <a-input-group compact class="pzwh">
                    <a-input
                      type="text"
                      disabled="disabled"
                      style="width: 80px;"
                      v-model="fileData.name"
                    />
                    <a-input
                      disabled="disabled"
                      addonBefore="〔"
                      addonAfter="〕"
                      type="text"
                      style="width: 130px;"
                      v-model="fileData.year"
                    />
                    <a-input
                      addonAfter="号"
                      disabled="disabled"
                      type="text"
                      style="width: 90px;"
                      v-model="fileData.number"
                    />
                  </a-input-group>
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="发文时间：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                  <a-date-picker
                    disabled="disabled"
                    style="width: 300px"
                    v-decorator="[
                                                'sendTxtTime'
                                            ]"
                  />
                </a-form-item>
              </a-row>
            </a-form>
          </div>
        </div>
        <!-- 选择台账 调整标准 按钮 -->
        <div v-if="stepIndex == 0" class="twoButton">
          <button @click="cancel">取消</button>
          <button @click="changeStandard">下一步</button>
        </div>
        <div v-if="stepIndex == 1" class="twoButton">
          <button @click="chooseStandingBook">上一步</button>
          <button @click="sendInfo">确定</button>
        </div>
      </div>
      <chooseFile-Send
        ref="mychild"
        :isShowFile="visibleFile"
        @sendFileData="fileDataFn"
        @closeModal="Modalcancel"
      ></chooseFile-Send>
    </a-layout-content>

    <!-- 选择标准 -->
    <a-layout-content v-if="ifChooseStandard" class="content">
      <div>
        <div class="title">选择工资标准</div>
        <!-- 选择标准的表格 -->
        <a-table
          :rowSelection="rowSelection"
          class="tableClsForchoose"
          :columns="columnsChooseStandard"
          :dataSource="pagination.rows"
          :pagination="false"
          :customRow="customRow"
        >
          <div
            @click="detail(1,record)"
            slot="operate"
            slot-scope="val,record"
            class="lookDetail"
          >查看详情</div>
        </a-table>
        <div class="footer">
          <a-pagination
            v-if="pagination.rows && pagination.rows.length"
            showSizeChanger
            :showTotal="total => `总共：${total}条`"
            @showSizeChange="onShowSizeChange"
            :total="pagination.total"
            v-model="pagination.pagenum"
            @change="onPageChange"
          />
        </div>
        <div v-if="stepIndex == 1" class="twoButton">
          <button @click="quitChooseStandard">取消</button>
          <button @click="sendChooseStandard">确定</button>
        </div>
        <!-- modal -->
        <salaryStandard-Modal
          v-if="detailData.code"
          @closeModal="Modalcancel"
          :detailData="detailData"
          :isShow="visible"
          :type="type"
        ></salaryStandard-Modal>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import salaryStandardModal from "./SalaryStandardModal";
import chooseFileSend from "./ChooseFileModal";
import moment from "moment";
import {
  Layout,
  Breadcrumb,
  Steps,
  Button,
  Table,
  Form,
  Row,
  Col,
  Input,
  Select,
  Icon,
  DatePicker,
  Pagination,
} from "ant-design-vue";
import { scaleadjust, getnewdata, getscale } from "@/salary/api/wagesystem";
import { showError } from "@/framework/utils/index";
export default {
  name: "addnewrecord",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ASteps: Steps,
    AStep: Steps.Step,
    AButton: Button,
    ATable: Table,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AInputGroup: Input.Group,
    ASelect: Select,
    ADatePicker: DatePicker,
    ASelectOption: Select.Option,
    AIcon: Icon,
    APagination: Pagination,
    salaryStandardModal,
    chooseFileSend,
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  // created() {
  //   //vuex保存用户编辑的数据
  //   if (
  //     this.$store._modules.root.state.salary.fileData &&
  //     this.$store._modules.root.state.salary.fileData.changeReason
  //   ) {
  //     this.fileData = this.$store._modules.root.state.salary.fileData;
  //   }
  //   if (this.$route.params.saveData) {
  //     this.datasource = this.$route.params.saveData;
  //   }
  //   if (this.$route.params.ifUpdate == 0) {
  //     this.stepIndex = 1;
  //   }
  //   if (this.stepIndex == 0) {
  //     setTimeout(() => {
  //       this.baseform.setFieldsValue({
  //         changeReason: this.fileData.changeReason
  //       });

  //       this.baseform.setFieldsValue({
  //         sendTxtTime: moment(this.fileData.sendFileTime)
  //       });
  //     }, 0);
  //   }
  // },
  data() {
    return {
      //点击选择栏的回调
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.datasource = selectedRows; //selectedRows  选中的全部数据
        },
        onSelect: (record, selected, selectedRows) => {
          return;
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          return;
        },
      },
      ifChange: 0,
      visibleFile: false, //选择文件上传
      ifChooseStandard: false, //是否切换到 选择标准 组件
      type: 1, //查看的详情的类型
      fileData: {}, //选择文件后 获得的文件对象
      visible: false,
      baseform: this.$form.createForm(this),
      changeReason: "", //调标原因
      stepIndex: 0, //调整标准
      detailData: {}, //表格数据
      columns: [
        {
          title: "编号",
          dataIndex: "key",
          key: "key",
          align: "center",
          width: "5%",
          scopedSlots: { customRender: "key" },
        },
        {
          title: "工资标准名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "40%",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "启用时间",
          dataIndex: "enabletime",
          key: "enabletime",
          align: "left",
          width: "15%",
          scopedSlots: { customRender: "enabletime" },
        },
        {
          title: "最后更新时间",
          dataIndex: "lastUpdatetime",
          key: "lastUpdatetime",
          align: "left",
          width: "15%",
          scopedSlots: { customRender: "lastUpdatetime" },
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "25%",
          scopedSlots: { customRender: "operate" },
        },
      ],
      datasource: [],
      // pagination: {
      //   hideOnSinglePage: true //不展示分页效果
      // },
      columnsChooseStandard: [
        {
          title: "工资标准名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "40%",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "启用时间",
          dataIndex: "enabletime",
          key: "enabletime",
          align: "left",
          width: "15%",
          scopedSlots: { customRender: "enabletime" },
        },
        {
          title: "最后更新时间",
          dataIndex: "lastUpdatetime",
          key: "lastUpdatetime",
          align: "left",
          width: "15%",
          scopedSlots: { customRender: "lastUpdatetime" },
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "25%",
          scopedSlots: { customRender: "operate" },
        },
      ],
      paginationChooseStandard: {
        hideOnSinglePage: true, //不展示分页效果
      },
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0,
      },
    };
  },
  methods: {
    customRow: function (record) {
      //点击行的回调  record当前行的数据
      return {
        on: {
          click: function () {
            return;
          },
        },
      };
    },
    changePagination(pagination) {
      //点击分页的回调
      return;
    },
    cancel() {
      //取消
      this.$router.push("/salary/defend/change-standard");
    },
    sendInfo() {
      //stepIndex = 1  确认更新
      let that = this;
      if (this.datasource.length == 0) {
        this.$notification.error({
          message: "提示",
          description: "请选择至少一个标准",
          duration: 1.5,
        });
        return;
      }
      for (let i = 0; i < this.datasource.length; i++) {
        if (this.datasource[i].enabletime == "") {
          this.$notification.error({
            message: "提示",
            description: "请先更新标准",
            duration: 1.5,
          });
          return;
        }
      }
      //最终上传的对象
      let userObj = {};
      userObj.ledger = this.fileData.id; //文件id
      userObj.reason = this.fileData.changeReason; //调标原因
      userObj.wageScaleVoRes = []; //标准的所有每条数据
      let standard = {}; //一条标准数据： {表字段，表数据}
      //this.datasource  ->  全部表数据
      for (let i = 0; i < this.datasource.length; i++) {
        standard = {};
        standard.enabletime = this.datasource[i].enabletime;
        standard.id = this.datasource[i].id;
        standard.name = this.datasource[i].name;
        standard.wageScaleDataRe = {}; //具体表格数据
        standard.wageScaleDataRe.tbody = this.datasource[i].sendArr;
        userObj.wageScaleVoRes.push(standard);
      }
      //上传至后台
      scaleadjust(userObj)
        .then((res) => {
          //清空vuex中的数据
          that.$router.push("changeStandard");
        })
        .catch((error) => {
          showError(error);
        });
    },
    chooseStandingBook() {
      //选择台账
      this.stepIndex = 0;
      let that = this;
      //保存用户编辑的调标原因
      setTimeout(() => {
        this.baseform.setFieldsValue({
          changeReason: this.fileData.changeReason,
        });

        this.baseform.setFieldsValue({
          sendTxtTime: moment(that.fileData.sendFileTime),
        });
      }, 0);
    },
    changeStandard() {
      //调整标准
      let that = this;
      if (!this.fileData.year) {
        that.$notification.error({
          message: "提示",
          description: "请至少选择一个文件",
          duration: 2,
        });
        return;
      }
      this.baseform.validateFields((err, values) => {
        if (!err) {
          //控制表单验证
          that.changeReason = values.changeReason; //获取调标原因
          that.fileData.changeReason = values.changeReason;
          that.$store._modules.root.state.salary.fileData = that.fileData;
          that.stepIndex = 1;
        }
      });
    },
    //查看标准详情
    detail(type, record) {
      let id = record.id;
      this.type = type;
      getnewdata(id)
        .then((res) => {
          //查看标准详情
          res.itemName = record.name;
          this.visible = true;
          this.detailData = res; //传递到salaryModal的数据
        })
        .catch((error) => {
          showError(error);
        });
    },
    Modalcancel(close) {
      if (close == "close") {
        this.detailData = "";
      }
      this.visible = false;
      this.visibleFile = false;
    },
    update(record) {
      let id = record.id;
      //获取标准数据
      getnewdata(id)
        .then((res) => {
          res.itemName = record.name;
          this.$router.push({
            name: "update",
            params: { data: res, scaleId: id, saveData: this.datasource },
          });
        })
        .catch((error) => {
          showError(error);
        });
    },
    chooseStandard(page) {
      let data = {
        pagenum: page.pagenum ? page.pagenum : this.pagination.pagenum,
        pagesize: page.pageSize ? page.pageSize : this.pagination.pagesize,
        needtotal: true,
      };
      getscale(data)
        .then((res) => {
          this.pagination = res.result;
          for (let i = 0; i < this.pagination.rows.length; i++) {
            this.$set(
              this.pagination.rows[i],
              "key",
              res.result.pagenum * 10 + i - 9
            );
            this.$set(this.pagination.rows[i], "key", i);
          }
          this.ifChooseStandard = true;
        })
        .catch((error) => {
          showError(error);
        });
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(pagenum, size) {
      this.loadData(1, size);
    },
    loadData(pagenum, pageSize) {
      this.chooseStandard({ pagenum, pageSize });
    },
    quitChooseStandard() {
      //退出 选择标准
      this.ifChooseStandard = false;
    },
    sendChooseStandard() {
      for (let i = 0; i < this.datasource.length; i++) {
        this.datasource[i].enabletime = ""; //启用时间全部设置为空
        this.datasource[i].key = i + 1;
      }
      this.ifChooseStandard = false;
    },
    chooseFileSend() {
      //选择文件并上传
      this.visibleFile = true;
      this.$refs.mychild.getlist();
    },
    //拿到选择文件的数据
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
        sendTxtTime: moment(data.dispatchdate),
      });
    },
    del(record) {
      let arr = this.datasource;
      let index;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].key == record.key) {
          index = j;
        }
      }
      //删除
      this.datasource.splice(index, 1);
      //编号重新排序
      for (let i = 0; i < arr.length; i++) {
        arr[i]["key"] = i + 1;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.addnewrecord {
  height: 100%;
  padding: @layout-space-base;
  .content > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: @content-padding-v @content-padding-h;
  }
  /* 表格 */
  .tableCls {
    padding-top: @layout-space-base;
  }
  .tableClsForchoose {
    margin-top: 48px;
    padding: 0 @content-padding-h;
    flex-shrink: 1;
    min-height: 0;
    overflow-y: auto;
  }
  /* 表格编号 */
  .index {
    font-weight: bold;
    text-align: center;
  }
  /* 按钮 */
  .newbtn {
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
    position: absolute;
    left: 50%;
    height: 32px;
    width: 240px;
    margin-left: -120px;
    display: grid;
    grid-template-columns: repeat(2, 100px);
    justify-content: space-around;
    bottom: 25px;
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
    .fatherbox {
      // margin-right: 10px;
      .pzwh {
        width: auto;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        /deep/.ant-input {
          border: none;
          height: 30px;
        }
        /deep/.ant-input-group-addon {
          border: none;
          background: none;
        }
      }
      /deep/ .ant-input-group {
        top: 0.8px !important;
      }
    }
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
  .addnewrecord #chooseFile {
    text-decoration: underline;
    font-size: 15px;
  }
  /* 查看详情  更新 */
  .lookDetail,
  .update {
    cursor: pointer;
    color: @primary-color;
  }
  /* 查看详情 a标签 */
  .lookDetail {
    padding-right: 10px;
  }
  .lookDetail:hover {
    text-decoration: underline;
  }
  .update:hover {
    text-decoration: underline;
  }
  /* 更新 a标签 */
  .update {
    padding-left: 10px;
    padding-right: 10px;
  }
  .del {
    cursor: pointer;
    color: @primary-color;
    padding-left: 10px;
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
  .footer {
    padding: @content-padding-v @content-padding-h;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
  /* step */
  .ant-steps-item-process
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: @primary-color;
  }
  .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: @primary-color;
  }
  .ant-steps-item-finish > .ant-steps-item-tail:after {
    background: @primary-color;
  }
}
</style>