<template>
  <div class="con">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-table 
          :rowKey="generateRowKey"
          :columns="columns" 
          :dataSource="tableData" 
          :pagination="false"
          :bordered="true"
          class="table_wrap"
          >
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**  行政周转编制使用分析评估情况
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
          title: '内容', 
          dataIndex: 'content',
          colSpan: 3,
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index === 1) {
              obj.attrs.rowSpan = 0;
            }
            if (index === 2) {
              obj.attrs.colSpan = 0;
            }
            if (index === 3) {
              obj.attrs.rowSpan = 2;
            }
            if (index === 4) {
              obj.attrs.colSpan = 0;
            }
            if (index === 5) {
              obj.attrs.rowSpan = 3;
            }
            if (index === 6) {
              obj.attrs.colSpan = 0;
            }
            if (index === 7) {
              obj.attrs.rowSpan = 0;
            }
            return obj;
          }
        },
        { 
          title: 'name', 
          dataIndex: 'name', 
          colSpan: 0,
        },
        { 
          title: 'percent', 
          dataIndex: 'percent', 
          colSpan: 0,
        },
        { 
          title: '备注', 
          scopedSlots: { customRender: "operation" },
        }
      ],
      tableData: [
        {
          content: '年龄结构分析',
          name: '35岁以下人员占比',
          percent: '',
          key: 'under',
        },
        {
          content: '年龄结构分析',
          name: '35-50岁人员占比',
          percent: '',
          key: 'between',
        },
        {
          content: '年龄结构分析',
          name: '50岁以上人员占比',
          percent: '',
          key: 'up',
        },
        {
          content: '存在不予使用情况',
          name: '已核定周转编制',
          percent: '',
          key: 'turnoverCompileNum',
        },
        {
          content: '存在不予使用情况',
          name: '部门领导控制数',
          percent: '',
          key: 'departmentLeaderNum',
        },
        {
          content: '周转期限分析',
          name: '全市周转编制剩余量',
          percent: '',
          key: 'residueCompileNum',
        },
        {
          content: '周转期限分析',
          name: '2年内退休人数',
          percent: '',
          key: 'retireInTwoYear',
        },
        {
          content: '周转期限分析',
          name: '5年内退休人数',
          percent: '',
          key: 'retireInFiveYear',
        },
      ]
    };
  },
  watch: {},
  computed: {
  },
  created() {
    let data = JSON.parse(JSON.stringify(this.data));
    let all = this.data.up + this.data.between + this.data.under;
    if(all) {//不为0
      data.up = (Math.floor(this.data.up / all * 10000) / 100.00)+"%";
      data.between = (Math.floor(this.data.between / all * 10000) / 100.00)+"%";
      data.under = (Math.floor(this.data.under / all * 10000) / 100.00)+"%";
    }
    this.tableData.forEach(item => {
      if(data.hasOwnProperty(item.key)) {
        item.percent = data[item.key]
      }
    })
  },
  mounted() {},
  methods: {
    getHtml() {
      let thead = `<thead><tr style="${trStyle}">`
      let tbody = `<tbody>`
      const headArr = [
        {text: '', colspan: 0}, 
        {text: '', colspan: 0}, 
        {text: '内容', colspan: 3}, 
        {text: '备注', colspan: 1}, 
      ]
      //  生成表头
      headArr.forEach(item => {
        let colspan = item.colspan
        if (colspan) {
          if (colspan > 1) {
            thead += `<td style="text-align: center;" colspan="${item.colspan}">${item.text}</td>`
          } else {
            thead += `<td colspan="${item.colspan}">${item.text}</td>`
          }
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
          if (index == 0 || index == 5) {
            if (num == 0) {
              tbody += `<td style="width: ${width};" rowspan="3">${item.content}</td>`
            } else if(num == 1) {
              tbody += `<td style="width: ${width};" rowspan="1">${item.name}</td>`
            } else if(num == 2) {
              tbody += `<td style="width: ${width};" rowspan="1">${item.percent}</td>`
            } else {
              tbody += `<td style="width: ${width};" rowspan="1"></td>`
            }
          } else if (index == 3) {
            if (num == 0) {
              tbody += `<td style="width: ${width};" rowspan="2">${item.content}</td>`
            } else if(num == 1) {
              tbody += `<td style="width: ${width};" rowspan="1">${item.name}</td>`
            } else if(num == 2) {
              tbody += `<td style="width: ${width};" rowspan="1">${item.percent}</td>`
            } else {
              tbody += `<td style="width: ${width};" rowspan="1"></td>`
            }
          } else {
            if (num == 0) {
              tbody += ``
            } else if(num == 1) {
              tbody += `<td style="width: ${width};" rowspan="1">${item.name}</td>`
            } else if(num == 2) {
              tbody += `<td style="width: ${width};" rowspan="1">${item.percent}</td>`
            } else {
              tbody += `<td style="width: ${width};" rowspan="1"></td>`
            }
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
    .table_wrap{
      border-collapse: collapse;
      font-family: arial, helvetica, sans-serif;
      font-size: 14px;
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