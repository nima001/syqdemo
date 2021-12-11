<template>
  <div class="annual-report">
    <div class="mechanism-div">
      <div class="small-div"></div>
      <div class="small-p">单位年报</div>
    </div>
    <div class="report-table">
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :rowKey="(row) => row.id"
      >
        <span slot="purpose" :title="text" slot-scope="text">{{text}}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="downloadFile(record.documentVo.fileuri)">点击下载</a>
        </span>
      </a-table>
      <div class="footer">
        <a-pagination
          v-if="pagination.rows && pagination.rows.length"
          showSizeChanger
          @showSizeChange="onShowSizeChange"
          :showTotal="(total) => `总共：${total}条`"
          :total="pagination.total"
          :pageSize="pagination.pagesize"
          v-model="pagination.pagenum"
          @change="onPageChange"
          :default-current="1"
        />
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    customRender: (text, record, index) => `${index + 1}`,
    width: "3%",
  },
  {
    title: "年份",
    dataIndex: "year",
    key: "year",
    width: "5%",
  },
  {
    title: "宗旨和业务范围",
    dataIndex: "purpose",
    key: "purpose",
    scopedSlots: { customRender: "purpose" },
  },
  {
    title: "主要内容",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: "10%",
    scopedSlots: { customRender: "action" },
  },
];
import { Table, Pagination } from "ant-design-vue";
import assign from "lodash/assign";
import { showError } from "@/framework/utils";
import { download } from "@/framework/api/file";
import { orgyearreport } from "@/person-shaoxing/api/monitor";
export default {
  props: {
    orgid: {
      type: String,
    },
  },
  components: {
    ATable: Table,
    APagination: Pagination,
  },
  data() {
    return {
      columns,
      data: [],
      loading: false,
      pagination: {
        needtotal: true,
        pagenum: 1,
        pagesize: 10,
        total: 0,
      },
    };
  },
  watch: {
    orgid(val) {
      this.getreportData({ ...this.pagination, orgid: val });
    },
  },
  created() {
    this.getreportData({ ...this.pagination, orgid: this.orgid });
  },
  methods: {
    //页数改变回调
    onPageChange(pagenum, pagesize) {
      assign(this.pagination, { pagesize, pagenum });
      this.getreportData({ ...this.pagination, orgid: this.orgid });
    },
    //pagesize改变回调
    onShowSizeChange(current, pagesize) {
      assign(this.pagination, { pagesize, pagenum: 1 });
      this.getreportData({ ...this.pagination, orgid: this.orgid });
    },
    //下载文件
    downloadFile(fileuri) {
      if (fileuri) {
        download(fileuri);
      }else{
        this.$notification.warning({
          message: '提示！',
          description: '无可下载文件！',
          duration: 3,
        });
      }
    },
    //数据接口调用
    getreportData(data) {
      this.loading = true;
      let that = this;
      orgyearreport(data)
        .then((res) => {
          that.data = res.result.rows;
          assign(that.pagination, res.result);
          that.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          showError(err);
        });
    },
  },
};
</script>
<style scoped lang="less">
.annual-report {
  padding: 10px 24px;
  height: 100%;
  .mechanism-div {
    display: flex;
    align-items: center;
    .small-div {
      width: 5px;
      height: 20px;
      background: @primary-color;
    }
    .small-p {
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .report-table {
    margin-top: 10px;
    /deep/ .ant-table-tbody > tr > td:nth-child(3) {
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/.ant-table-tbody > tr > td:nth-child(4) {
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/.ant-table-tbody > tr > td:nth-child(5) {
      max-width: 150px;
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .footer {
      float: right;
      padding: @content-padding-v @content-padding-h;
      padding-right: 0;
      .ant-pagination {
        float: right;
      }
    }
  }
}
</style>