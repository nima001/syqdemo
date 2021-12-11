<template>
  <div class="power-list">
    <div class="top">
      <div class="left">
      </div>
      <div class="right">
        <dict-select dict="usermanage.qlsx.quanlikind"
          placeholder="权力事项类型"
          allowClear
          v-model="power.quanlikind"
          class="search-item"
        />
        <a-input
          placeholder="权力名称"
          style="width: 200px"
          allowClear
          v-model="power.quanliname"
        />
        <a-button class="searchBt" type="primary" @click="serach">搜索</a-button>
        <a-button class="searchBt" @click="reset">重置</a-button>
      </div>
    </div>
    <a-table
      class="per-table"
      :rowKey="Math.random() + ''"
      :columns="columns"
      :dataSource="pagination.rows"
      :pagination="false"
      :loading="loading"
      >
    </a-table>
    <div class="footer">
      <a-pagination
        v-if="pagination.rows && pagination.rows.length"
        showSizeChanger
        :showTotal="total => `总共：${total}人`"
        @showSizeChange="onShowSizeChange"
        :total="pagination.total"
        :pagesize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
    </div>
  </div>
</template>
<script>
import { Button, Select, Input, Table, Pagination, Modal } from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import { qlsxquery } from "@/person/api/org"
import { showError } from "@/framework/utils/index";
export default {
  props: ["org"],
  data() {
    return {
      columns: [
        {
          title: '权力名称',
          dataIndex: 'quanliname',
          width: '65%'
        },
        {
          title: '权力主项编码',
          dataIndex: 'quanlimainitemid',
          width: '10%'
        },
        {
          title: '实施机关（主管部门名称）',
          dataIndex: 'quanlidep',
          width: '15%'
        },
        {
          title: '权力来源',
          dataIndex: 'itemsource',
          customRender: this.dictRender('usermanage.qlsx.itemsource'),
          width: '10%'
        },
      ],
      loading: false,
      pagination: {
        rows: null,
        pagesize: 20,
        pagenum: 1,
        total: 0
      },
      power: {
        quanliname: undefined,
        quanlikind: undefined
      }
    }
  },
  components: {
    AButton: Button,
    ASelect: Select,
    AInput: Input,
    ATable: Table,
    APagination: Pagination,
    AModal: Modal,
    DictSelect
  },
  watch: {
    org(val) {
      this.loadData({pagenum: 1, pagesize: this.pagination.pagesize});
    }
  },
  created() {
    this.loadData({pagenum: 1, pagesize: this.pagination.pagesize});
  },
  methods: {
    loadData(page) {
      this.loading = true;
      const params = {
        orgid: this.org._id,
        needtotal: true,
        ...page,
      }
      qlsxquery(params)
      .then(({result}) => {
        this.loading = false;
        if(result && result.rows.length > 0) {
          this.pagination = result;
        }else{
          this.pagination.rows = null;
        }
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    dictRender(key, attr){
      return (text, row, index) => {
        let v =  this.$store.getters.dictKey(key || row[attr], text);
        text = (v && v.text) || ''
        return <span title={text}>{text}</span>;
      }
    },
    serach() {
      const params = {
        orgid: this.org._id,
        needtotal: true,
        pagenum: this.pagination.pagenum,
        pagesize: this.pagination.pagesize,
        ...this.power
      }
      this.loading = true;
      qlsxquery(params)
      .then(({result}) => {
        this.loading = false;
        if(result && result.rows.length > 0) {
          this.pagination = result;
        }else{
          this.pagination.rows = null;
        }
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    reset() {
      this.power.quanliname = undefined;
      this.power.quanlikind = undefined;
      this.loadData({pagenum: 1, pagesize: this.pagination.pagesize});
    },
    onShowSizeChange(current, pagesize) {
      this.loadData({pagesize, pagenum: 1});
    },
    onPageChange(pagenum, pagesize) {
      this.loadData({pagesize, pagenum});
    }
  }
}
</script>
<style lang="less" scoped>
.power-list{
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    padding: @content-padding-v @content-padding-h;
    .left {
      float: left;
      .ant-btn {
        margin-right: 10px;
        color: @primary-color;
        border-color: @primary-color;
      }
    }
    .right {
      float: right;
      .ant-select {
        margin-left: 5px;
      }
      .search-item {
        width: 180px;
        margin: 0 8px 0 0;
        &.scope {
          width: 100px;
        }
      }
      .searchBt {
        margin-left: 8px;
      }
    }
  }
  .per-table {
    flex-shrink: 1;
    min-height: 0;
    padding: 0 @content-padding-h;
    overflow-y: auto;
    /deep/table {
      table-layout: fixed;
      td,th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
</style>