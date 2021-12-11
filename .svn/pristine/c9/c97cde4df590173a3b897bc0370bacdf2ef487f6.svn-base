<template>
  <!-- 工资标准维护 现在的 -->
  <a-layout v-if="isNow">
    <a-layout-content class="content">
      <div class="panel">
        <div class="tablecount">
          <!-- 表格 -->
          <a-table
            class="tableCls"
            :columns="this.getColumns()"
            :dataSource="pagination.rows"
            :loading="loading"
            :pagination="false"
            :customRow="customRow"
          >
            <!-- 查看详情 -->
            <div class="operateBox" slot="operate" slot-scope="val, record">
              <span @click="showDetail(record)">查看详情</span>
              <span
                @click="showHistory(record, $event)"
                v-if="record.namespace === 'inner'"
                style="margin-left: 40px"
                >查看历史</span
              >
              <!-- ifEarlyVer 未启用版本 -->
              <span
                v-if="record.hasNotEnable"
                @click="showDetail(record, 'ifEarlyVer', $event)"
                style="margin-left: 40px"
                >查看未启用版本</span
              >
            </div>
          </a-table>
          <!-- 详情  modal组件 -->
          <salaryStandard-Modal
            v-if="detailData.code"
            @closeModal="Modalcancel"
            :ifEarlyVer="ifEarlyVer"
            :detailData="detailData"
            :isShow="visible"
          ></salaryStandard-Modal>
        </div>
        <div class="footer">
          <a-pagination
            v-if="pagination.rows && pagination.rows.length"
            showSizeChanger
            :showTotal="(total) => `总共：${total}条`"
            @showSizeChange="onShowSizeChange"
            :total="pagination.total"
            v-model="pagination.pagenum"
            @change="onPageChange"
          />
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import salaryStandardModal from "./SalaryStandardModal";
import {
  getscale,
  getnewdata,
  getnewest,
  gethistory,
} from "@/salary/api/wagesystem";
import { Layout, Table, Button, Pagination, Breadcrumb } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "salaryStandardDefend",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    salaryStandardModal,
  },
  created() {
    this.getsurvival();
    this.getColumns();
  },
  data: function () {
    return {
      bodyArr: [],
      detailData: {}, //详情数据 传递到modal组件中
      visible: false,
      ifEarlyVer: false,
      isNow: true,
      columns: [],
      datasource: [],
      datasourceHistory: [],
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0,
      },
      loading: false,
      typename: "",
      type: null,
      //历史版本 -> 分页组件 分页本地做
      // paginationHistory: {
      //   position: "bottom",
      //   pageSize: 3,
      //   current: 1,
      //   total: 9,
      //   showTotal: function(total, range) {
      //     return `共 ${total} 条记录`;
      //   }
      // }
      paginationHistory: {
        defaultPageSize: 10,
        showTotal: (total) => `总共：${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
    };
  },
  methods: {
    //获取存活的标准
    getsurvival(page) {
      this.loading = true;
      let data = {};
      if (page) {
        let data1 = {
          pagenum: page.pagenum ? page.pagenum : this.pagination.pagenum,
          pagesize: page.pageSize ? page.pageSize : this.pagination.pagesize,
          needtotal: true,
        };
        data = data1;
      } else {
        let data2 = {
          pagenum: this.pagination.pagenum,
          pagesize: this.pagination.pagesize,
          needtotal: true,
        };
        data = data2;
      }
      getscale(data)
        .then((res) => {
          this.loading = false;
          this.pagination = res.result;
          for (let i = 0; i < this.pagination.rows.length; i++) {
            this.$set(
              this.pagination.rows[i],
              "key",
              res.result.pagenum * 10 + i - 9
            );
            this.$set(this.pagination.rows[i], "key", i);
            this.typename = this.pagination.rows[i].namespace;
          }
        })
        .catch((error) => {
          this.loading = false;
          showError(error);
        });
    },
    getColumns() {
      if (this.typename === "inner") {
        return [
          {
            title: "工资标准名称",
            dataIndex: "name",
            key: "name",
            width: "40%",
            scopedSlots: { customRender: "name" },
          },
          {
            title: "启用时间",
            dataIndex: "enabletime",
            key: "enabletime",
            width: "10%",
            scopedSlots: { customRender: "enabletime" },
          },
          {
            title: "最后更新时间",
            dataIndex: "lastUpdatetime",
            key: "lastUpdatetime",
            width: "20%",
            scopedSlots: { customRender: "lastUpdatetime" },
          },
          {
            title: "操作",
            dataIndex: "operate",
            key: "operate",
            width: "30%",
            scopedSlots: { customRender: "operate" },
          },
        ];
      }
      if (this.typename === "basicworker")
        return [
          {
            title: "工资标准名称",
            dataIndex: "name",
            key: "name",
            width: "80%",
            scopedSlots: { customRender: "name" },
          },
          {
            title: "操作",
            dataIndex: "operate",
            key: "operate",
            width: "20%",
            scopedSlots: { customRender: "operate" },
          },
        ];
    },
    //页数切换
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(pagenum, size) {
      this.loadData(1, size);
    },
    loadData(pagenum, pageSize) {
      this.getsurvival({ pagenum, pageSize });
    },
    customRow(record) {
      //点击行的回调  record当前行的数据
      let that = this;
      return {
        on: {
          click: function () {
            if (record) {
              return;
              //that.showDetail(record)
            }
          },
        },
      };
    },
    //当前详情   未启用版本 2个modal共用一个组件
    showDetail(record, ifEarlyVer, e) {
      if (e) {
        e.stopPropagation();
      }
      let id = record.id;
      if (ifEarlyVer == "ifEarlyVer") {
        //未启用版本
        getnewest(id)
          .then((res) => {
            //统一用itemName  标识title
            res.itemName = record.name;
            res.record = record;
            this.detailData = res; //Obj
            this.visible = true; //详情table
            this.ifEarlyVer = true;
          })
          .catch((error) => {
            showError(error);
          });
      } else {
        //启用版本
        getnewdata(id)
          .then((res) => {
            res.itemName = record.name;
            res.record = record;
            this.detailData = res; //Obj
            this.visible = true; //详情table
            this.ifEarlyVer = false;
          })
          .catch((error) => {
            showError(error);
          });
      }
    },
    Modalcancel() {
      //清空数据
      this.detailData = {};
      this.visible = false; //modal退出
    },
    //查看历史
    showHistory(record, e) {
      //本地存储record
      let arr = record;
      this.$store.commit("CommitHistoryRecord", arr);
      this.$router.push({ path: "/salary/defend/history-defendd" });
    },
  },
};
</script>
<style lang="less" scoped>
.ant-layout {
  background: white;
  margin: @layout-space-base;
  padding: @content-padding-v @content-padding-h;
  /* 修改表头background */
  .ant-layout-content {
    padding-top: @layout-space-base;
  }
  .ant-table-thead tr th {
    background-color: rgba(242, 242, 242, 1);
    color: black;
  }
  /* 表格css */
  .tableClsHistory {
    margin-top: 0px;
  }
  .ant-table-tbody tr {
    cursor: pointer;
  }

  // .title {
  //   font-size: 25px;
  //   color: black;
  //   font-weight: bold;
  //   width: 600px;
  //   text-align: center;
  //   margin: 0 auto;
  //   margin-top: 36px;
  // }
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
  .operateBox {
    width: 100%;
    // span:nth-child(2) {
    //   margin-left: 40px;
    // }
    // span:nth-last-child(1) {
    //   margin-left: 40px;
    // }
  }
  .operateBox span {
    color: @primary-color;
    cursor: pointer;
  }
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
  .operateBox span:hover {
    text-decoration: underline;
  }
  .panel {
    flex: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    .footer {
      padding: 8px 0px;
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