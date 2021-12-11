<template>
  <div class="quota-plan-used-detail">
     <a-table
        class="data-table"
        :columns="columns"
        :dataSource="dataList"
        rowKey="id"
        :loading="dataLoading"
        :pagination="false"
      ></a-table>
  </div>
</template>
<script>
import { Table } from "ant-design-vue";
import { showError } from '@/framework/utils/index'
import { listPlanPerform } from '@/person/api/orgQuotaPlan'

export default {
  props: ["id"],
  components:{
    ATable: Table,
  },
  data() {
    return {
       columns: [
        { title: "序号", width: '50px', customRender: (text, row, index) => index + 1},
        { title: "操作", dataIndex: 'desc' },
        { title: "操作人", dataIndex: 'operatorname' },
        { title: "操作时间", dataIndex: 'date', customRender: (text) => (text && text.substr(0, 10)) },
        { title: "被操作人", dataIndex: 'username'},
      ],
      dataLoading: false,
      dataList: [],
    };
  },
  created() {
    this.loadData(this.id)
  },
  watch:{
    id(id){
      this.loadData(id)
    }
  },
  methods: {
    loadData(id){
      if(!id){
        this.dataList = [];
      }else{
        this.dataLoading = true;
        listPlanPerform(id).then(({result}) => {
          this.dataLoading = false;
          this.dataList = result;
        }).catch(err => {
          showError(err);
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.quota-plan-used-detail {
  height: 100%;
  padding: 4px;
  .data-table{
    height: 100%;
    padding: 10px 20px;
    overflow-y: auto;
  }
}
</style>