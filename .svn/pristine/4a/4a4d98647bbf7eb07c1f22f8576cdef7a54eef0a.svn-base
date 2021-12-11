<template>
  <div class="chartQuery">
    <div class="chartQueryContent">
      <div class="header">
        <div class="left" :span="6">
          <a-button icon="plus" class="btns" @click="designPage()"
            >新增</a-button
          >
        </div>
        <div class="right" :span="18" :style="{ textAlign: 'right' }">
          <a-input
            placeholder="输入统计图名称"
            v-model="searchkey"
            :style="{ width: '200px', marginLeft: '15px' }"
          />
          <a-button
            type="primary"
            :style="{ marginLeft: '10px' }"
            @click="search"
            >搜索</a-button
          >
          <a-button class="btns" @click="reset">重置</a-button>
        </div>
      </div>
      <div class="main">
        <a-table
          :columns="columns"
          :dataSource="page.rows"
          :loading="loading"
          :pagination="false"
          rowKey="id"
        >
          <div class="operation" slot="operation" slot-scope="text, record">
            <a @click="designPage(record.id)">编辑</a> |
            <a type="primary" @click="showModal(record.id)">删除</a>
          </div>
        </a-table>
      </div>
      <div class="footer" v-if="page.total > 0">
        <a-pagination
          showSizeChanger
          :pageSize="page.pagesize"
          @showSizeChange="showSizeChange"
          @change="pageChange"
          :current="page.pagenum"
          :showTotal="(total) => `总共：${total}条`"
          :total="page.total"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { queryChart, deleteChart } from "@/person/api/chart";
import { showError } from "@/framework/utils/index";
import { Table, Button, Input, Pagination } from "ant-design-vue";
export default {
  name: "statisticsChartQuery",
  components: {
    APagination: Pagination,
    ATable: Table,
    AButton: Button,
    AInput: Input,
  },
  data() {
    return {
      loading: false,
      searchkey: "",
      columns: [
        {
          title: "序号",
          width: 70,
          customRender: (text, record, index) =>
            `${(this.page.pagenum - 1) * this.page.pagesize + (index + 1)}`,
        },
        {
          title: "统计图名称",
          dataIndex: "title",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      page: {
        rows: undefined,
        pagenum: 1,
        pagesize: 20,
        total: 0,
      },
    };
  },
  created() {
    this.getChart(this.page);
  },
  methods: {
    showSizeChange(pagenum, pagesize) {
      this.getChart({ pagenum: 1, pagesize });
    },
    pageChange(pagenum, pagesize) {
      this.getChart({ pagenum, pagesize });
    },
    getChart({ pagenum, pagesize } = {}) {
      let data = {
        needtotal: true,
        pagenum,
        pagesize,
        searchkey: this.searchkey,
      };
      this.loading = true;
      queryChart(data)
        .then((res) => {
          this.loading = false;
          this.page = res.result;
        })
        .catch((error) => {
          this.loading = false;
          showError(error);
        });
    },
    //删除提示框
    showModal(id) {
      this.$confirm({
        title: "是否确定删除该统计图?",
        onOk: () => {
          deleteChart(id)
            .then((res) => {
              this.$message.info("删除成功");
              this.getChart(this.page);
            })
            .catch((error) => {
              showError(error);
            });
        },
      });
    },
    //编辑、新增
    designPage(id) {
      this.$router.push({
        path: "/person/statistics/chart/index",
        query: { id },
      });
    },
    //搜索
    search() {
      this.getChart({ pagenum: 1, pagesize: 20 });
    },
    //重置
    reset() {
      this.searchkey = "";
      this.getChart({ pagenum: 1, pagesize: 20 });
    },
  },
};
</script>
<style lang="less" scoped>
.chartQuery {
  height: 100%;
  padding: @layout-space-base;
  .chartQueryContent {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: @white;
    .header {
      display: flex;
      padding: @content-padding-v @content-padding-h;
      margin-top: 10px;
      .left,
      .right {
        .btns {
          margin-left: 10px;
          border-color: @primary-color;
          color: @primary-color;
          background-color: @white;
          border-color: @primary-color;
          &:hover {
            color: lighten(@primary-color, 20%);
            border-color: lighten(@primary-color, 20%);
          }
          &:first-child {
            margin-left: 0px;
          }
        }
      }
      .right {
        flex: 1;
      }
    }
    .main {
      flex-shrink: 1;
      overflow-y: auto;
      padding: @content-padding-v @content-padding-h;
      /deep/.ant-table-thead {
        tr {
          th {
            border-right: 1px solid #e8e8e8;
            &:last-child {
              border-right: none;
            }
          }
        }
      }
      /deep/ table {
        tr {
          &.selected {
            background: @primary-2;
          }
          /deep/ td {
            padding: @padding-xs;
          }
        }
      }
    }
    .footer {
      padding: @content-padding-v @content-padding-h;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>