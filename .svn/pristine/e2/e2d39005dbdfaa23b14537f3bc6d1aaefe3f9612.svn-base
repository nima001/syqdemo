<template>
  <div class="examine-record">
    <div class="top-btn">
      <span @click="download">导出</span>
    </div>
    <div class="main-table">
      <a-table 
        rowKey="year"
        :columns="columns" 
        :dataSource="tabdata" 
        :pagination="false"
        :loading="loading"
        :scroll="{ y: 540 }"
        >
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="pagination.rows && pagination.rows.length"
        showSizeChanger
        @showSizeChange="onShowSizeChange"
        :showTotal="total => `总共：${total}条`"
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
import { personcheckresult, exportcheckresult } from '@/person/api/examineManage';
import { showError } from "@/framework/utils/index";
import { uiConfigsCookies } from '@/framework/utils/auth';
export default {
  props: ['user'],
  components: {
    ATable: Table,
    APagination: Pagination
  },
  data() {
    return {
      columns: [
        {
          title: "考核年度",
          dataIndex: "year",
          key: "year",
          ellipsis: true,
          width: '50%'
        },
        {
          title: "考核结果",
          dataIndex: "checkResult",
          key: "checkResult",
          ellipsis: true,
          width: '50%'
        },
      ],
      tabdata: [],
      loading: false,
      pagination: {
        rows: null,
        pagenum: 1,
        pagesize: 10,
        total: 0
      },
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      if(this.user) {
        personcheckresult({
          "needtotal": true,
          "pagenum": this.pagination.pagenum,
          "pagesize": this.pagination.pagesize,
          "userid": this.user._id
        }) 
        .then(data => {
          let res = data.result;
          this.pagination.rows = res.rows;
          (res.rows).forEach(val => {
            val.checkResult = this.checkResult(val.checkResult);
          })
          this.tabdata = res.rows;
          this.pagination.total = res.total;
        })
        .catch(err => {
          showError(err);
        })
      }
    },
    checkResult(checkResult){
      let d = this.$store.getters.dictKey("usermanage.org.sndkhqk", checkResult);
      return d && d.text;
    },
    download() {
      exportcheckresult(
        this.user._id
      ) 
      .then(data => {
        let uiConfigs = uiConfigsCookies();
        window.open(uiConfigs['api.url'] + '/file/v1/download?uri=' + encodeURIComponent(data.result));
      })
      .catch(err =>{
        showError(err);
      })
    },
    onShowSizeChange(current, size) {
      this.pagination.pagenum = current;
      this.pagination.pagesize = size;
      this.loadData();
    },
    onPageChange(value) {
      this.pagination.pagenum = value;
      this.loadData();
    }
  }
}
</script>

<style lang="less" scoped>
.examine-record{
  height: 100%;
  .top-btn{
    padding: 0 @padding-lg;
    margin-top: @padding-xs;
    display: flex;
    justify-content: flex-end;
    span{
      cursor: pointer;
    }
  }
  .main-table{
    padding: @padding-xs @padding-lg;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: @content-padding-v @padding-lg;
    .ant-pagination {
      margin-bottom: 10px;
    }
  }
}
</style>