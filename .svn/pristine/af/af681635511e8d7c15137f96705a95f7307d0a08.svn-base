<template>
  <div class="history">
    <div class="history_total">共{{pagination.total}}个历史版本</div>
    <div class="history_table">
      <a-table
        class="antd-table-con"
        rowKey="id"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :loading="loading"
        >
        <span slot="operation" class="operation" slot-scope="text, record">
          <a @click="onCheckReport(record.id)">查看报告</a>
        </span>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="tableData && tableData.length"
        showSizeChanger
        :showTotal="total => `总共：${total}条`"
        @showSizeChange="onShowSizeChange"
        :total="pagination.total"
        :pageSize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { Table, Pagination } from "ant-design-vue";
import { listHistory } from "@/person-shaoxing/api/assessment";
import { showError } from "@/framework/utils/index";
export default {
  props: ['reportid'],
  components: {
    ATable: Table,
    APagination: Pagination,
  },
  data() {
    return {
      loading: false,
      columns: [
        { title: '序号', customRender: (text, record, index) => ((this.pagination.pagenum - 1)*this.pagination.pagesize) + (index + 1), width: '10%' },
        { title: '报告保存时间', dataIndex: 'assesstime', customRender: (text) => (text && text.substr(0, 10)), width: '40%' },
        { title: '操作', scopedSlots: { customRender: "operation" }, width: '40%' }
      ],
      tableData: [],
      pagination: {
        total: 0,
        pagenum: 1,
        pagesize: 10
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
  },
  mounted() {},
  methods: {
    getData(page) {
      this.loading = true;
      let params = {
        ...page,
        reportid: this.reportid,
        needtotal: true
      }
      listHistory(params)
      .then(({result}) => {
        this.loading = false;
        this.pagination = result;
        this.tableData = result.rows;
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    onShowSizeChange(pagenum, pagesize) {
      this.getData({ pagenum: 1, pagesize });
    },
    onPageChange(pagenum, pagesize) {
      this.getData({ pagenum, pagesize });
    },
    onCheckReport(reportid) {
      this.$router.push({
        path: '/person/assessment/compileassist/report',
        query: {
          reportid,
          isHistory: 1
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
.history{
  // display: flex;
  // flex-direction: column;
  height: 100%;
  .history_table{
    margin-top: 10px;
    height: calc(~"100% -  111px");
    // flex-shrink: 1;
    overflow-y: auto;
    .antd-table-con{
      padding: @content-padding-v 0;
      .operation {
        a {
          margin-right: 15px;
          &:hover {
            text-decoration: underline;
          }
        }
      }  
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 12px @content-padding-h;
  }
}
</style>