<template>
  <div class="question">
    <div class="question_table">
      <a-table
        class="stra-table"
        rowKey="id"
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        >
      </a-table>
    </div>
  </div>
</template>

<script>
import { Table, Pagination } from "ant-design-vue";

export default {
  props: ['data'],
  components: {
    ATable: Table,
    APagination: Pagination,
  },
  data() {
    return {
      columns: [
        {    
          title: "姓名",
          dataIndex: "username",
          key: "username"
        },
        {    
          title: "身份证号",
          dataIndex: "idcard",
          key: "idcard"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.question{
  height: 100%;
  .question_table{
    display: flex;
    flex-direction: column;
    height: 100%;
    /deep/.stra-table{
      flex: 1;
      padding: @padding-lg;
      overflow-y: auto;
      // flex-shrink: 1;
    }
  }
}
</style>