<template>
  <!-- 全单位五险一金维护 -->
  <div class="FivesocialOnehousingfund">
    <a-layout>
      <!-- 当前五险一金详情 -->
      <a-layout-content v-if=" mode == 'normal' " class="contentNow">
        <div class="layout-content">
          <div class="header">
            <div class="providebtn">
              <button class="btn" style="margin-right:10px" @click="trigger">
                <a-icon type="upload" />&nbsp;上传文件
              </button>
              <input
                type="file"
                ref="fileBtn"
                class="fileBtn"
                @change="uploadFile($event)"
                multiple="multiple"
              />
              <button class="btn" @click="openModel">
                <a-icon type="download" />&nbsp;导出文件
              </button>
            </div>
            <div class="selectgroup">
              <a-input-group size="default">
                <!-- 月时间选择器 -->
                <a-month-picker
                  :disabledDate="disabledDate"
                  :value="date"
                  @change="chooseTime"
                  style="width:13%;margin-right: 0px;float: right;"
                />
                <a-input
                  style="width: 13%;margin-right: 10px;float: right;"
                  allowClear
                  read-only
                  @click="OrgModelShow"
                  @change="resetRange"
                  v-model="node.nodename"
                  placeholder="请选择组织范围"
                />
              </a-input-group>
            </div>
          </div>
          <div class="container">
            <!-- 全部工资详情 -->
            <a-table
              class="tableCls"
              :columns="columns"
              :dataSource="datasource"
              :customRow="customRow"
              :loading="loading"
              :bordered="true"
              :pagination="pagationShow"
            ></a-table>
          </div>
          <div class="footer" v-if="pagationvisiable">
            <a-pagination
              class="pagation"
              showSizeChanger
              size="middle"
              :pageSize.sync="pagination.pageSize"
              @showSizeChange="onShowSizeChange"
              @change="onChange"
              :total="pagination.total"
              v-model="pagination.current"
              :showTotal="total => `共${total} 条`"
            />
          </div>
        </div>
        <a-modal title="提示" :visible="visible">
          <p>{{ ModalText }}</p>
          <template slot="footer">
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click="exportHandler">确定</a-button>
          </template>
        </a-modal>
        <!--组织选择-->
        <a-modal
          title="选择组织"
          v-model="orgVisible"
          :footer="null"
          :width="500"
          :bodyStyle="{ height: '600px', padding: '0'}"
        >
          <org-user-select
            mode="orgtree"
            :defaultTree="catalogid"
            :root-selectable="true"
            @finish="selectOrg"
          />
        </a-modal>
        <TaskProgress :taskid="taskid" :defaultInfo="defaultInfo" v-if="taskid" />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import moment from "moment";
import {
  salaryMonthList,
  salaryExpand,
  exportwuxian,
  importwuxian,
} from "@/salary/api/salaryManage";
import { taskProgress } from "@/framework/api/asynctask";
import { treeroot } from "@/salary/api/org";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import TaskProgress from "@/framework/components/TaskProgress";
import { download } from "@/framework/api/file";
import {
  Layout,
  Breadcrumb,
  Input,
  Select,
  Table,
  Modal,
  Button,
  Icon,
  Spin,
  Pagination,
  DatePicker,
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AInput: Input,
    AInputGroup: Input.Group,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    AModal: Modal,
    AButton: Button,
    AIcon: Icon,
    ASpin: Spin,
    APagination: Pagination,
    AMonthPicker: DatePicker.MonthPicker,
    OrgUserSelect,
    TaskProgress,
  },
  name: "FivesocialOnehousingfund",
  data: function () {
    return {
      node: {
        nodeid: null,
        nodename: null,
        orgid: null,
      },
      defaultInfo: "",
      orgVisible: false,
      catalogid: undefined,
      provideRes: [],
      isShowpayprovide: false,
      pagationShow: false, // 关闭table自己的分页器
      noData: false,
      nowOrgId: "", // 当前组织 id
      nowTime: "",
      dateArr: [],
      ischange: 0,
      loading: true,
      mode: "normal", //当前详情
      columns: [],
      datasource: [],
      pagationvisiable: true,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 10,
      },
      type: null,
      visible: false,
      ModalText: "确认导出《五险一金表》吗？",
      taskid: null,
    };
  },
  created() {
    this.getorg();
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
  computed: {
    //月记录   日期
    date() {
      if (this.nowTime) {
        return moment(this.nowTime, "YYYY-MM");
      }
    },
  },
  methods: {
    getorg() {
      treeroot()
        .then((res) => {
          this.node.nodeid = res.result.children[0].id;
          this.node.nodename = res.result.children[0].data.name;
          this.node.orgid = res.result.children[0].data._id;
          this.nowOrgId = this.node.orgid;
          this.getsalaryoverMonth(this.node.orgid);
        })
        .catch((err) => {
          showError(err);
        });
    },
    selectOrg(type, list) {
      this.orgVisible = false;
      if (type == "ok" && list.length) {
        this.node.nodename = list[0].name;
        this.node.nodeid = list[0].id;
        this.node.orgid = list[0].data._id;
        this.nowOrgId = this.node.orgid;
        this.getsalaryoverMonth(this.node.orgid);
      }
    },
    OrgModelShow() {
      this.orgVisible = true;
    },
    resetRange() {
      if (!this.node.nodename && this.node.nodeid) {
        this.node.nodeid = "";
      }
    },
    //上传文件
    uploadFile(event) {
      let file = event.target.files[0];
      importwuxian(file)
        .then((res) => {
          this.fileName = file.name;
          this.taskid = res.data.result;
          this.defaultInfo = "正在上传";
          this.loop(this.taskid);
        })
        .catch((error) => {
          showError(error);
        });
    },
    trigger() {
      this.$refs.fileBtn.value = null;
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    openModel() {
      this.visible = true;
    },
    // 改变 pageSize
    onShowSizeChange(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getsalaryResult(
        this.pagination.current,
        this.nowOrgId,
        this.nowTime
      );
    },
    // 改变 页数
    onChange(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getsalaryResult(
        this.pagination.current,
        this.nowOrgId,
        this.nowTime
      );
    },
    handleCancel() {
      this.visible = false;
    },
    exportHandler() {
      let data = {
        date: this.nowTime,
        usertype: 4,
        orgid: this.node.orgid,
      };
      exportwuxian(data)
        .then((res) => {
          this.visible = false;
          this.taskid = res.result;
          this.loop(this.taskid);
        })
        .catch((error) => {
          showError(error);
        });
    },
    // 轮循获取进度
    loop(data) {
      let _that = this;
      taskProgress(data)
        .then((res) => {
          //进度
          this.progress = res.result.progress;
          //任务类型
          this.stage = res.result.stage;
          //状态
          this.status = res.result.status;
          //总条数
          this.total = res.result.total;
          //完成后地址
          this.downloadurl = res.result.data;
          if (res.result.status === "FINISH") {
            if (res.result.data) {
              download(this.downloadurl);
            } else {
              this.$notification.success({
                message: "提示",
                description: "文件上传成功!",
                duration: 3,
              });
              this.getsalaryResult(
                this.pagination.current,
                this.nowOrgId,
                this.nowTime
              );
            }
          } else if (res.result.status == "ERROR") {
            clearInterval(this.myInterval);
          } else {
            this.myInterval = window.setTimeout(() => {
              _that.loop(data);
            }, 2000);
          }
        })
        .catch((error) => {
          showError(error);
        });
    },
    // 初始化请求时间接口
    getsalaryoverMonth() {
      let orgid = this.nowOrgId;
      salaryMonthList(orgid)
        .then((res) => {
          this.nowDate = res.result ? res.result[0].date : "";
          if (!this.nowDate) {
            this.loading = false;
            this.datasource = [];
            this.columns = [];
            this.pagationvisiable = false;
          } else {
            this.nowTime = this.nowDate;
            // 请求详情信息
            this.getsalaryResult(
              this.pagination.current,
              this.nowOrgId,
              this.nowTime
            );
          }
        })
        .catch((err) => {
          this.loading = false;
          this.noData = true;
          this.datasource = [];
          this.columns = [];
          showError(err);
        });
    },
    customRow: function (record) {
      //点击行
      return {
        on: {
          click: function () {
            return;
          },
        },
      };
    },
    chooseTime(val) {
      if (val) {
        this.loading = true;
        this.nowTime = moment(val).format("YYYY-MM");
        //获取数据
        this.getsalaryResult(1, this.nowOrgId, this.nowTime);
      } else {
        return;
      }
    },
    disabledDate(current) {
      let time = this.nowDate;
      return current && current > moment(time);
    },
    //请求方法 current（当前页数）
    getsalaryResult(current, orgid, time) {
      this.loading = true;
      //   if (this.type === 0) {
      //     this.userstatus = 1;
      //   } else if (this.type === 1) {
      //     this.userstatus = 1;
      //   } else if (this.type === 9) {
      //     this.userstatus = 4;
      //   }
      let data = {
        needtotal: true,
        pagenum: this.pagination.current,
        orgid: orgid, //组织id
        pagesize: this.pagination.pageSize,
        usertype: 4,
        ischange: this.ischange,
        date: time, //时间
      };
      salaryExpand(data)
        .then((res) => {
          if (res.result == undefined || res.result.salaryResultVo.total == 0) {
            //  根据 为只返回 success 清楚所有数据
            this.loading = false;
            this.datasource = [];
            this.columns = [];
            this.pagationvisiable = false;
          } else {
            let index = 0;
            let fatherIndex = 0;
            let arr = []; //最终的行数据 数组
            //表格列数据
            for (let i = 0; i < res.result.thead.length; i++) {
              if (i == 0) {
                res.result.thead[i].dataIndex = "username";
                res.result.thead[i].key = "username";
                res.result.thead[i].align = "center";
                res.result.thead[i].width = "8%";
                //宽度 暂时不考虑
              } else {
                if (res.result.thead[i].children) {
                  for (
                    let j = 0;
                    j < res.result.thead[i].children.length;
                    j++
                  ) {
                    res.result.thead[i].children[j].dataIndex = index;
                    res.result.thead[i].children[j].key = index;
                    index++;
                    res.result.thead[i].children[j].align = "center";
                  }
                  //父类表头
                  res.result.thead[i].dataIndex = fatherIndex; //用不到的
                  res.result.thead[i].key = `father${fatherIndex}`;
                  fatherIndex++;
                  res.result.thead[i].align = "center";
                } else {
                  res.result.thead[i].dataIndex = index;
                  res.result.thead[i].key = index;
                  index++;
                  res.result.thead[i].align = "center";
                }
              }
            }
            this.columns = res.result.thead; //列 数据
            //表格行数据
            let datasourceArr = res.result.salaryResultVo.rows;
            for (let m = 0; m < datasourceArr.length; m++) {
              let obj = {};
              obj.username = datasourceArr[m].username;
              obj.key = `datasource${m}`;
              obj.userid = datasourceArr[m].userid;
              for (let n = 0; n < datasourceArr[m].detail.length; n++) {
                obj[n] = datasourceArr[m].detail[n];
              }
              arr.push(obj);
            }
            this.pagationvisiable = true;
            this.pagination.total = res.result.salaryResultVo.total;
            this.datasource = arr;
            this.loading = false;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.datasource = [];
          this.columns = [];
          showError(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 1500px) {
  .ant-table-tbody tr td {
    padding: 10px 2px;
  }
  .ant-table-thead tr th {
    font-size: 15px;
    padding: 12px 8px;
  }
}
.FivesocialOnehousingfund {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .ant-layout-content {
    padding: 12px;
    .layout-content {
      overflow: hidden;
      position: relative;
      height: 100%;
      width: 100%;
      background-color: #fff;
      // layout-content 头部
      .header {
        padding: 12px 24px;
        width: 100%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 40% 60%;
        .providebtn {
          display: flex;
          .fileBtn {
            width: 0px;
            height: 0px;
            opacity: 0;
          }
          .btn {
            outline: none;
            border: none;
            background-color: @primary-color;
            color: white;
            border-radius: 5px;
            height: 32px;
            width: 100px;
            cursor: pointer;
          }
        }
      }
      // layout-content 内容 table
      .container {
        max-height: 537px;
        padding: 0 24px;
        overflow: auto;
        .tableCls {
          margin: 0 auto;
          width: 100%;
          height: 100%;
          .detail {
            color: @primary-color;
            cursor: pointer;
          }
        }
      }
      // layout-content 内容 footer 分页器
      .footer {
        display: flex;
        justify-content: flex-end;
        height: 32px;
        margin-top: 12px;
        padding: 0 15px;
        .pagation {
          height: 100%;
        }
      }
      .errorMsg {
        color: @primary-color;
        margin: 10px 0px 0px;
      }
      /deep/.ant-input {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }
  }
}
</style>