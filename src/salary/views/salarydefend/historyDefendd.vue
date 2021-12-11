     
<template>
  <a-layout>
    <a-layout-content>
      <div>
        <!-- 历史版本的数据 -->
        <a-table
          class="tableCls tableClsHistory"
          :columns="columnsHistory"
          :dataSource="datasourceHistory"
          :loading="historyloading"
          :pagination="paginationHistory"
          :customRow="customRowHistory"
          @change="changePaginationHistory"
        >
          <!-- 参数 record -->
          <div
            @click="showHistoryDetail(record)"
            class="spancss"
            slot="operate"
            slot-scope="val,record"
          >查看详情</div>
          <template slot="ledgertitle" slot-scope="title">
            <p class="pcss" :title="title">{{title}}</p>
          </template>
        </a-table>
        <button @click="back" class="btn">返回</button>
        <!-- 详情modal -->
        <salaryStandard-Modal
          v-if="detailData.code"
          @closeModal="Modalcancel"
          :detailData="detailData"
          :isShow="visible"
        ></salaryStandard-Modal>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import salaryStandardModal from "./SalaryStandardModal";
import { Layout, Table, Button, Pagination } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
import {
  getnewdata,
  gethistory
} from "@/salary/api/wagesystem";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    salaryStandardModal
  },
  name: "hsitoryDefendd",
  data() {
    return {
      detailData: {}, //详情数据 传递到modal组件中
      visible: false,
      columns: [],
      datasourceHistory: [],
      historyloading: false,
      // 历史数据
      columnsHistory: [
        {
          title: "工资标准名称",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "启用时间",
          dataIndex: "enabledate",
          key: "enabledate",
          customRender: function(time) {
            return (
              time.substring(0, 4) +
              "-" +
              time.substring(4, 6) +
              "-" +
              time.substring(6, 8)
            );
          },
          scopedSlots: { customRender: "enabledate" }
        },
        {
          title: "停用时间",
          dataIndex: "disabledate",
          key: "disabledate",
          customRender: function(time) {
            return (
              time.substring(0, 4) +
              "-" +
              time.substring(4, 6) +
              "-" +
              time.substring(6, 8)
            );
          },
          scopedSlots: { customRender: "disabledate" }
        },
        {
          title: "文件名称",
          dataIndex: "ledgertitle",
          key: "ledgertitle",
          width: "25%",
          scopedSlots: { customRender: "ledgertitle" }
        },
        {
          title: "批准文号",
          dataIndex: "num",
          key: "num",
          scopedSlots: { customRender: "num" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          scopedSlots: { customRender: "operate" }
        }
      ],
      paginationHistory: {
        defaultPageSize: 10,
        showTotal: total => `总共：${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
      records: {}
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.records = this.$store.state.salary.historyRecord;
      let id = this.records.id;
      //单个标准的历史
      let data = {
        scaleid: id,
        needtotal: true,
        pagenum: 1, //第一次请求第一页
        pagesize: 10
      };
      this.historyloading = true;
      gethistory(data)
        .then(res => {
          let arr = res.result.rows;
          this.historyloading = false;
          for (let i = 0; i < arr.length; i++) {
            arr[i]["key"] = `key${i}`;
          }
          this.datasourceHistory = arr;
          //本地做分页
          this.paginationHistory.total = arr.length;
          this.paginationHistory.pageSize = 10;
          this.paginationHistory.pagenum = 1;
        })
        .catch(error => {
          this.historyloading = false;
          showError(error);
        });
    },
    //历史的表格点击行事件
    customRowHistory(record) {
      let that = this;
      return {
        on: {
          click: function() {
            if (record) {
              that.showHistoryDetail(record);
            }
          }
        }
      };
    },
    Modalcancel() {
      //清空数据
      this.detailData = {};
      this.visible = false; //modal退出
    },
    changePaginationHistory(val) {
      //跳转当前页
      this.paginationHistory.current = val.current;
    },
    //获取单个标准的历史记录 - 详情表格数据
    showHistoryDetail(record) {
      let id = record.scaleid;
      let that = this;
      getnewdata(id)
        .then(res => {
          res.itemName = record.name;
          res.record = record;
          this.detailData = res; //Obj
          this.visible = true; //历史详情table
        })
        .catch(error => {
          showError(error);
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.ant-layout {
  .ant-layout-content {
    margin: @layout-space-base;
    padding: @content-padding-v @content-padding-h;
    background-color: white;
  }
  /* 修改表头background */
  .ant-table-thead tr th {
    background-color: rgba(242, 242, 242, 1);
    color: black;
  }
  .ant-table-tbody tr {
    cursor: pointer;
  }

  .title {
    font-size: 25px;
    color: black;
    font-weight: bold;
    width: 600px;
    text-align: center;
    margin: 0 auto;
    margin-top: 36px;
  }
  /* 返回按钮 */
  .btn {
    width: 100px;
    position: absolute;
    height: 32px;
    left: 50%;
    margin-left: -50px;
    background-color: @primary-color;
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
    bottom: 48px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: @primary-color;
  }
  /* 查看详情  历史版本 未启用版本 */
  .spancss {
    color: @primary-color;
    cursor: pointer;
  }
  .spancss:hover {
    text-decoration: underline;
  }
  .pcss {
    width: 400px;
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .panel {
    flex: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    .footer {
      padding: 12px 0px;
      // min-width: 1200px;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
    .tablecount {
      flex-shrink: 1;
      min-height: 0;
      overflow: auto;
    }
  }
}
</style>