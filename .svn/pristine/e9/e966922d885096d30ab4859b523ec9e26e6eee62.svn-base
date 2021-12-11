<template>
  <div class="wrapper">
    <div class="top">
      <a-input
        class="queryitem"
        style="width: 200px;"
        placeholder="输入机构名称搜索"
        v-model="search.name"
      >
      </a-input>
      <a-button class="queryitem" type="primary" @click="onSearch">搜索</a-button>
      <a-button class="queryitem" @click="onReset">重置</a-button>
    </div>
    <div class="table_content">
      <a-table
        rowKey="id"
        :loading="loading"
        :columns="columns"
        :dataSource="pagination.rows"
        :pagination="false"
      >
        <template slot="operation" slot-scope="text, record">
          <span>操作</span>
        </template>
      </a-table>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
import { Button, Table, Pagination, Input } from "ant-design-vue";

export default {
  props: {},
  components: {
    AButton: Button,
    ATable: Table,
    APagination: Pagination,
    AInput: Input,
  },
  data() {
    return {
      columns: [
        {
          title: '身份证号',
          dataIndex: 'idcard',
        },
        {
          title: '身份证号',
          dataIndex: 'idcard',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          key:10
        },
      ],
      loading: false,
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0
      },
      search: {
        name: undefined
      }
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onReset(){

    },
    onSearch(){

    }
  },
};
</script>
<style lang="less" scoped>
.wrapper{}
</style>