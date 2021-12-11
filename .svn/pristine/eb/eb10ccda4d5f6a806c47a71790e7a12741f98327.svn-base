<template>
  <div class="con">
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
**  行政机构领导职数配置
*/
import { Row, Col, Table } from "ant-design-vue";
import { createReportItem, trStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: Object
  },
  components: {
    ARow: Row,
    ACol: Col,
    ATable: Table
  },
  data() {
    return {
      columns: [
        { 
          title: '部门领导', 
          dataIndex: 'allowNum',
          colSpan: 2,
          width: '25%'
        },
        { 
          title: 'name', 
          dataIndex: 'useNum', 
          colSpan: 0,
          width: '25%'
        },
        { 
          title: '中层领导', 
          dataIndex: 'averageInternalCopileNum', 
          colSpan: 2,
          width: '25%'
        },
        { 
          title: 'opt', 
          dataIndex: 'suggestNum', 
          colSpan: 0,
          width: '25%'
        },
      ],
      tableData: []
    };
  },
  watch: {},
  computed: {
  },
  created() {
    let obj = [{
      allowNum: '核定编制数',
      useNum: '建议配置数',
      averageInternalCopileNum: '剔除领导职数内设机构平均编制数',
      suggestNum: '建议配置数'
    }];
    this.tableData = obj.concat(this.data);
  },
  mounted() {},
  methods: {
    getHtml() {
      let thead = `<thead><tr style="${trStyle}">`
      let tbody = `<tbody>`
      const headArr = [
        {text: '', colspan: 0}, 
        {text: '部门领导', colspan: 2}, 
        {text: '', colspan: 0}, 
        {text: '中层领导', colspan: 2},
      ]
      //  生成表头
      headArr.forEach(item => {
        if (item.colspan) {
          thead += `<td style="text-align: center;" colspan="${item.colspan}">${item.text}</td>`
        } else {
          thead += ''
        }
      })
      thead += '</tr></thead>'
      //  生成内容
      let width = Math.round(1/headArr.length * 10000) / 100 + '%';
      this.tableData.forEach((item, index) => {
        tbody += `<tr style="${trStyle}">`
        headArr.forEach((list, num) => {
          if (num == 0) {
            tbody += `<td style="width: ${width};" rowspan="1">${item.allowNum}</td>`
          } else if(num == 1) {
            tbody += `<td style="width: ${width};" rowspan="1">${item.useNum}</td>`
          } else if(num == 2) {
            tbody += `<td style="width: ${width};" rowspan="1">${item.averageInternalCopileNum}</td>`
          } else {
            tbody += `<td style="width: ${width};" rowspan="1">${item.suggestNum}</td>`
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
.con{  
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