<template>
  <div class="data-table">
    <div class="container">

      <div class="top">
        <div class="title">{{title}}</div>
        <div class="btn">
          <span @click="goBack">返回</span>
          <span @click="download">导出</span>
        </div>
      </div>

      <div class="table">
        <a-table 
          :columns="columns" 
          :data-source="data"
          :loading="loading"
          :pagination="false"
          >
        </a-table>
      </div>

      <div class="bottom">
        <a-pagination
          v-if="data && data.length"
          showSizeChanger
          :showTotal="total => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="page.total"
          :pageSize="page.pagesize"
          v-model="page.pagenum"
          @change="onPageChange"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { Table, Pagination } from "ant-design-vue";
import { detailPageReg, detailPageLogin, exportReg, exportLogin } from "@/zfw/api/naturalRegister";
import { showError } from '@/framework/utils';

export default {
  props: {},
  components: { ATable: Table, APagination: Pagination },
  data() {
    return {
      columns: [],
      data: [],
      page: {
        pagesize: 10,
        pagenum: 1,
        total: 0
      },
      target: undefined,
      loading: false
    };
  },
  watch: {},
  computed: {
    params() {
      return this.$store.getters.params;
    },
    detailPage() {
      if (this.$store.getters.params.title === '用户注册') {
        return detailPageReg
      } else {
        return detailPageLogin
      }
    },
    downloadFile() {
      if (this.$store.getters.params.title === '用户注册') {
        return exportReg
      } else {
        return exportLogin
      }
    },
    title() {
      return this.$route.query.name + '数据表'
    }
  },
  created() {
    this.target = this.$route.query.target;
    this.getData({ page: this.page.pagenum, rows: this.page.pagesize });
  },
  mounted() {},
  methods: {
    getData(page) {
      this.loading = true;
      this.detailPage({
        ...this.params,
        ...page,
        target: this.target
      })
      .then(({attr}) => {
        this.loading = false;
        this.page.total = attr.total;
        let columns = [], data = [];
        (attr.data || []).forEach(item => {
          let obj = {};
          item.forEach((list, index) => {
            obj[index] = list;
          })
          data.push(obj);
        })
        attr.title.forEach((list, index) => {
          let columnObj = {};
          columnObj.title = list;
          columnObj.dataIndex = index;
          columns.push(columnObj);
        })
        this.data = data;
        this.columns = columns;
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    onPageChange(pagenum, pagesize) {
      this.getData({ page: pagenum, rows: this.page.pagesize });
    },
    onShowSizeChange(pagenum, pagesize) {
      this.page.pagesize = pagesize;
      this.getData({ page: 1, rows: pagesize });
    },
    goBack() {
      this.$router.go(-1);
    },
    download() {
      this.downloadFile({
        ...this.params,
        target: this.target
      })
      .then(res => {

      })
      .catch(err => {
        showError(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>
.data-table{
  height: 100%;
  background-color: #F4F4F4;
  .container{
    height: 100%;
    padding: 10px;
    background-color: @white;
    display: flex;
    flex-direction: column;
    .top{
      display: flex;
      justify-content: space-between;
      padding: @padding-xs @padding-lg;
      .title{
        font-size: 20px;
        font-weight: bold;
        color: #000000;
      }
      .btn{
        span{
          margin-left: 20px;
          color: @primary-color;
          cursor: pointer;
        }
      }
    }
    .table{
      // flex: 1;
      padding: @padding-xs @padding-lg;
    }
    .bottom{
      display: flex;
      flex-direction: row-reverse;
      padding: @padding-xs @padding-lg;
    }
  }
}
</style>