<template>
  <div class="hospital-leader">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-table 
          class="table-con"
          :rowKey="generateRowKey"
          :columns="columns" 
          :dataSource="tableData" 
          :pagination="false"
          :bordered="true"
          >
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**医院领导职数配置规则
*/
import { Row, Col, Table } from "ant-design-vue";
import { createReportItem, trStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: Object
  },
  components: { ARow: Row, ACol: Col, ATable: Table },
  data() {
    return {
      columns: [
        { title: '病床数', dataIndex: 'sickbed', width: '30%' },
        { title: '领导职数', dataIndex: 'leadernum', width: '30%' },
        { title: '操作', dataIndex: 'ps', width: '40%' }
      ],
      tableData: []
    };
  },
  watch: {},
  computed: {},
  created() {
    this.tableData = [this.data];
  },
  mounted() {},
  methods: {
    getHtml() {
      let thead = `<thead><tr style="${trStyle}">`
      let tbody = `<tbody>`
      const headArr = [
        {text: '病床数', colspan: 1}, 
        {text: '领导职数', colspan: 1}, 
        {text: '操作', colspan: 1}
      ]
      //  生成表头
      headArr.forEach(item => {
        if (item.colspan) {
          thead += `<td colspan="${item.colspan}">${item.text}</td>`
        }
      })
      thead += '</tr></thead>'
      //  生成内容
      let width = Math.round(1/headArr.length * 10000) / 100 + '%';
      this.tableData.forEach((item, index) => {
        tbody += `<tr style="${trStyle}">`
        headArr.forEach((list, num) => {
          if (num == 0) {
            tbody += `<td style="width: ${width};" rowspan="1">${item.sickbed}</td>`
          } else if(num == 1) {
            tbody += `<td style="width: ${width};" rowspan="1">${item.leadernum}</td>`
          } else {
            tbody += `<td style="width: ${width};" rowspan="1">${item.ps}</td>`
          }
        })
        tbody += '</tr>'
      })
      tbody += `</tbody>`
      let temp = `<table style="width: 100%; margin: 20px 0;">${thead}${tbody}</table>`
      return createReportItem(temp, '关联情况分析')
    },
    generateRowKey() {
      return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
    },
  },
};
</script>
<style lang="less" scoped>
.hospital-leader{
  /deep/.ant-row{
    .table-con{
      border-collapse: collapse;
      font-family: arial, helvetica, sans-serif;
      font-size: 14px;
      tr,td{
        text-align: center;;
      }
      th{
        border: 1px solid;
        background-color: @white;
      }
      td{
        border: 1px solid;  
      }
    }
  }
}
</style>