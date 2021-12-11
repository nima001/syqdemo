<template>
  <!-- 工改  -->
  <a-layout>
    <a-layout-content>
      <a-button type="primary" @click="add">新增记录</a-button>
      <!-- 表格 -->
      <a-table
        class="tableCls"
        :columns="columns"
        :dataSource="datasource"
        :bordered="false"
        :loading="loading"
        :pagination="pagination"
        :style="{marginTop:'8px'}"
      >
        <div
          @click="lookHistoryWorkreform(record)"
          class="divbutton"
          slot="operate"
          slot-scope="val,record"
        >查看详情</div>
        <template slot="titledemo" slot-scope="title">
          <p class="spancss" :title="title">{{title}}</p>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { getreason, gethistoryitem } from "@/salary/api/wagesystem";
import { Layout, Button, Table } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "workreform",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    AButton: Button,
    ATable: Table
  },
  data: function() {
    return {
      columns: [
        {
          title: "变更原因",
          dataIndex: "reason",
          key: "reason",
          align: "left",
          width: "10%",
          scopedSlots: { customRender: "reason" }
        },
        {
          title: "文件依据",
          dataIndex: "titledemo",
          key: "titledemo",
          align: "left",
          width: "25%",
          scopedSlots: { customRender: "titledemo" }
        },
        {
          title: "发文时间",
          dataIndex: "dispatchdate",
          key: "dispatchdate",
          align: "left",
          width: "10%",
          scopedSlots: { customRender: "dispatchdate" }
        },
        {
          title: "启用时间",
          dataIndex: "enabledate",
          key: "enabledate",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "enabledate" }
        },
        {
          title: "操作时间",
          dataIndex: "operationtime",
          key: "operationtime",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "operationtime" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "left",
          width: "35%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasource: [],
      loading: false,
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `总共：${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  created() {
    this.getwages();
  },
  methods: {
    getwages() {
      this.loading = true;
      let type = 1;
      getreason(type)
        .then(res => {
          this.loading = false;
          let resdata = res.result;
          for (let i = 0; i < resdata.length; i++) {
            resdata[i]["key"] = i + 1;
            resdata[i].titledemo = resdata[i].ledgerVo.title;
            resdata[i].dispatchdate = resdata[i].ledgerVo.dispatchdate;
          }
          this.datasource = resdata;
        })
        .catch(error => {
          this.loading = false;
          showError(error);
        });
    },
    //获取标准台账记录
    lookHistoryWorkreform(record) {
      let archive = record.id;
      gethistoryitem(archive).then(res => {
        res.id = id;
        this.$router.push({
          name: "historyworkreform",
          params: { res, record }
        });
      });
    },
    //新增记录
    add() {
      this.$router.push({ name: "workreformAdd" });
    }
  }
};
</script>
<style lang="less" scoped>
.ant-layout {
  background: white;
  margin: @layout-space-base;
  padding: @content-padding-v @content-padding-h;
  .ant-layout-content{
  padding-top: @layout-space-base;
  }
  .spancss {
    width: 400px;
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .divbutton {
    color: @primary-color;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>