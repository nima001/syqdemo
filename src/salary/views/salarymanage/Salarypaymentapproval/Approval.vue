<template>
  <!-- 审批细节 -->
  <div class="Approval">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="head">
            <div class="providebtn">
              <a-button v-if="!ifApproval" @click="approval" class="approvalBtn" type="primary">审批</a-button>
            </div>
            <div class="selectgroup">
              <div class="orgname">{{record.orgname}}</div>
              <div class="name">{{record.name}}</div>
              <a-select class="selectAll" @change="AllorChange" defaultValue="全部">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="change">变动</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- 表格 -->
          <a-table
            class="tableCls"
            :columns="columns"
            :dataSource="datasource"
            :pagination="pagationShow"
            :loading="loading"
            :customRow="customRow"
            :bordered="true"
          >
            <span
              @click="showDetail(record)"
              class="operateBtn"
              slot-scope="val,record"
              slot="operate"
            >查看详情</span>
          </a-table>
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
          <approvalModal v-if="isShow" :isShow="isShow" @Modalcancel="closeModal" :id="record.id"></approvalModal>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import approvalModal from "./ApprovalModal";
import { processdetail, process, prostatistic } from "@/salary/api/salaryManage";
import { showError } from "@/framework/utils/index";
import {
  Layout,
  Input,
  Breadcrumb,
  Button,
  Select,
  Table,
  Pagination
} from "ant-design-vue";
export default {
  created() {
    if (this.$route.params.record) {
      this.record = this.$route.params.record;
      this.argDate = this.record.args.date;
      this.ifApproval = this.$route.params.ifApproval;
      this.getData(1);
      this.getProcess();
    } else {
      this.record = this.$store.state.salary.nowApprovalRecord.record;
      this.ifApproval = this.$store.state.salary.nowApprovalRecord.ifApproval;
      this.argDate = this.record.args.date;
      this.getData(1);
    }
  },
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    ATextarea: Input.TextArea,
    APagination: Pagination,
    approvalModal
  },
  data() {
    return {
      argDate: "",
      noData: false,
      ifApproval: "",
      loading: true,
      record: "",
      isShow: false,
      ischange: 0,
      columns: [
        {
          dataIndex: "name",
          key: "name",
          title: "姓名",
          align: "center",
          scopedSlots: { customRender: "name" }
        },
        {
          dataIndex: "basePay",
          key: "basePay",
          title: "基本工资",
          align: "center",
          scopedSlots: { customRender: "basePay" },
          children: [
            {
              dataIndex: "jobpay",
              key: "jobpay",
              title: "职务工资",
              align: "center",
              scopedSlots: { customRender: "jobpay" }
            },
            {
              dataIndex: "indexpay",
              key: "indexpay",
              title: "级别工资",
              align: "center",
              scopedSlots: { customRender: "indexpay" }
            }
          ]
        },
        {
          dataIndex: "other",
          key: "other",
          title: "规范性津补贴",
          align: "center",
          children: [
            {
              dataIndex: "life",
              key: "life",
              title: "生活性补贴",
              align: "center",
              scopedSlots: { customRender: "life" }
            },
            {
              dataIndex: "rule",
              key: "rule",
              title: "规范性津贴",
              align: "center",
              scopedSlots: { customRender: "rule" }
            },
            {
              dataIndex: "town",
              key: "town",
              title: "城区生活补贴",
              align: "center",
              scopedSlots: { customRender: "town" }
            }
          ]
        },
        {
          dataIndex: "special",
          key: "special",
          title: "特岗津贴",
          align: "center",
          scopedSlots: { customRender: "special" }
        },
        {
          dataIndex: "change",
          key: "change",
          title: "改革性补贴",
          align: "center",
          scopedSlots: { customRender: "change" }
        },
        {
          dataIndex: "withhold",
          key: "withhold",
          title: "代扣",
          align: "center",
          scopedSlots: { customRender: "withhold" }
        },
        {
          dataIndex: "should",
          key: "should",
          title: "应发合计",
          align: "center",
          scopedSlots: { customRender: "should" }
        },
        {
          dataIndex: "reality",
          key: "reality",
          title: "实发合计",
          align: "center",
          scopedSlots: { customRender: "reality" }
        },
        {
          dataIndex: "operate",
          key: "operate",
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasource: [],
      pagationShow: false, // 关闭table自己的分页器
      pagationvisiable: true,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 10
      }
    };
  },
  methods: {
    // 改变 pageSize
    onShowSizeChange(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    // 改变 页数
    onChange(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    customRow: function(record) {
      //点击行
      return {
        on: {
          click: function() {
            return;
          }
        }
      };
    },
    approval() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
    AllorChange(val) {
      if (val == "change") {
        this.ischange = 1;
        this.getData(1);
      } else if (val == "all") {
        this.ischange = 0;
        this.getData(1);
      }
    },
    showDetail(value) {
      let that = this;
      let data = {
        process: this.record.id,
        userid: value.userid
      };
      processdetail(data)
        .then(function(res) {
          let userObj = {};
          userObj.result = res.result;
          userObj.userid = value.userid;
          userObj.argDate = that.argDate;
          that.$router.push({
            name: "detail",
            params: userObj
          });
        })
        .catch(err => {
          showError(err);
        });
    },
    getProcess() {
      let that = this;
      let data = {
        needtotal: true,
        pagenum: 1,
        pagesize: 10,
        orgid: that.record.orgid,
        status: that.record.status
      };
      process(data).then(function(res) {});
    },
    getData(pagenum) {
      this.loading = true;
      let that = this;
      //获取数据
      let data = {
        needtotal: true,
        pagenum: this.pagination.current,
        pagesize: this.pagination.pageSize,
        process: this.record.id,
        ischange: this.ischange
      };
      prostatistic(data)
        .then(function(res) {
          if (!res.result) {
            that.noData = true;
            that.loading = false;
            that.datasource = [];
            that.columns = [];
          } else {
            if (res.result.salaryResultVo.total == 0) {
              that.datasource = [];
              that.loading = false;
            }
            //封装数据
            let thead = res.result.thead;
            let tbody = res.result.salaryResultVo.rows;
            let dataKey = []; //指定唯一 dataIndex
            let slots = []; //定义插槽数组
            //封装columns
            let ifHead = false;
            let index = 0;
            for (let i = 0; i < thead.length; i++) {
              if (thead.length == 1) {
                let childrenArr = thead[i].children;
                let childrenOnly;
                for (let j = 0; j < childrenArr.length; j++) {
                  if (j == 0) {
                    childrenOnly = `head`;
                  } else {
                    childrenOnly = `children${j - 1}`;
                    slots.push(childrenOnly);
                    childrenArr[j].scopedSlots = { customRender: childrenOnly };
                  }
                  childrenArr[j].key = childrenOnly;
                  childrenArr[j].align = "center";
                  childrenArr[j].dataIndex = childrenOnly;
                  dataKey.push(childrenOnly);
                }
              } else {
                if (thead[i].title) {
                  if (ifHead) {
                    let only = `children${index}`;
                    index++;
                    thead[i].align = "center";
                    thead[i].dataIndex = only;
                    thead[i].key = only;
                    if (thead[i].children) {
                    } else {
                      thead[i].scopedSlots = { customRender: only };
                      slots.push(only);
                      dataKey.push(only);
                    }
                  } else {
                    ifHead = true;
                    thead[i].align = "center";
                    thead[i].width = "6%";
                    thead[i].dataIndex = "head";
                    thead[i].key = "head";
                    if (thead[i].children) {
                    } else {
                      dataKey.push("head");
                    }
                  }
                }
                if (thead[i].children) {
                  let childrenArr = thead[i].children;
                  let num;
                  for (let j = 0; j < childrenArr.length; j++) {
                    let childrenOnly = `children${j + index}`;
                    num = j + index;
                    slots.push(childrenOnly);
                    childrenArr[j].key = childrenOnly;
                    childrenArr[j].scopedSlots = { customRender: childrenOnly };
                    childrenArr[j].align = "center";
                    childrenArr[j].dataIndex = childrenOnly;
                    dataKey.push(childrenOnly);
                  }
                  index = num + 1;
                }
              }
            }
            that.slots = slots;

            thead.push({
              dataIndex: "operate",
              key: "operate",
              title: "操作",
              align: "center",
              width: "8%",
              scopedSlots: { customRender: "operate" }
            });
            that.columns = thead; //列
            let datasourceArr = [];
            for (let i = 0; i < tbody.length; i++) {
              let arr = [];
              let rowObj = {};
              arr.push(tbody[i].username);
              for (let j = 0; j < tbody[i].detail.length; j++) {
                arr.push(tbody[i].detail[j]);
              }
              arr.push(tbody[i].userid);
              for (let m = 0; m < dataKey.length; m++) {
                rowObj[dataKey[m]] = arr[m];
              }
              rowObj.userid = arr[arr.length - 1];
              rowObj.key = `row${i}`; //指定唯一key
              datasourceArr.push(rowObj);
            }
            that.pagination.total = res.result.salaryResultVo.total;
            that.loading = false;
            that.datasource = datasourceArr;
          }
        })
        .catch(err => {
          that.loading = false;
          that.noData = true;
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 1500px) {
  .ant-table-tbody tr td {
    padding: 10px 2px;
  }
}
.Approval {
  height: 100%;
}
.ant-layout {
  height: 100%;
}
/deep/.ant-table-thead > tr > th {
  padding: 12px;
}
/deep/.ant-table-tbody > tr > td {
  padding: 12px;
}
.content {
  padding: @layout-space-base;
}
.content > div {
  background-color: white;
  overflow: hidden;
  position: relative;
  height: 100%;
  // padding: 12px 24px;
}

.head {
  width: 100%;
  display: grid;
  margin-top:@layout-space-base;
  padding: @content-padding-v @content-padding-h;
  grid-template-columns: 40% 60%;
  .selectgroup {
    display: flex;
    justify-content: flex-end;
    .name {
      padding-top: 5px;
      padding-right: 40px;
    }
    .orgname {
      padding-top: 5px;
      padding-right: 40px;
    }
  }
  .Btn {
    position: absolute;
    left: 0;
    outline: none;
    border: none;
    background-color: @primary-color;
    color: white;
    border-radius: 5px;
    height: 32px;
    width: 100px;
    cursor: pointer;
  }
  .selectAll {
    width: 15%;
    float: right;
    height: 32px;
  }
  /deep/.ant-select-selection__rendered {
    font-size: 14px;
    /deep/ .ant-select-selection-selected-value {
    }
  }
}
.tableCls {
  // height: 100%;
  padding: 0px 24px;
  max-height: 570px;
  flex-shrink: 1;
  overflow: auto;
  /deep/.ant-table-content {
    /deep/ .ant-table-body {
      /deep/.ant-table-thead > tr > th {
        padding: 13px;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: @content-padding-v @content-padding-h;
  .pagation {
    height: 100%;
  }
}
.operateBtn {
  color: @primary-color;
  cursor: pointer;
}
</style>