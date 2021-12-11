<template>
  <!-- 调标done -->
  <a-layout>
    <a-layout-content class="content">
      <a-button type="primary" @click="add">新增记录</a-button>
      <!-- 表格 -->
      <a-table
        class="tableCls"
        :columns="columns"
        :dataSource="datasource"
        :bordered="false"
        :loading="false"
        :pagination="false"
        :customRow="customRow"
        @change="changePagination"
        :style="{marginTop:'12px'}"
      >
        <div
          @click="lookHistoryChangeStandard(record)"
          style="color: #02A7F0;cursor: pointer;"
          slot="operate"
          slot-scope="val,record"
        >查看历史详情</div>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { Layout, Button, Table } from "ant-design-vue";
import { getreason, getarchive } from "@/salary/api/wagesystem";
import { showError } from "@/framework/utils/index";
export default {
  name: "changeStandard",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    AButton: Button,
    ATable: Table
  },
  created() {
     this.getdispatchdate()
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
          dataIndex: "title",
          key: "title",
          align: "center",
          width: "30%",
          scopedSlots: { customRender: "title" }
        },
        {
          title: "发文时间",
          dataIndex: "dispatchdate",
          key: "dispatchdate",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "dispatchdate" }
        },
        {
          title: "操作时间",
          dataIndex: "operationtime",
          key: "operationtime",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "operationtime" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasource: []
    };
  },
  methods: {
    getdispatchdate() {
      //调标列表
      let type = 0;
      getreason(type)
        .then(res => {
          for (let i = 0; i < res.result.length; i++) {
            res.result[i]["key"] = `key${i}`;
            res.result[i].title = res.result[i].ledgerVo.title;
            res.result[i].dispatchdate = res.result[i].ledgerVo.dispatchdate;
          }
          this.datasource = res.result;
        })
        .catch(error => {
          showError(error);
        });
    },
    customRow: function(record) {
      //点击行的回调  record当前行的数据
      return {
        on: {
          click: function() {
            return;
          }
        }
      };
    },
    changePagination(pagination) {
      //点击分页的回调
      return;
    },
    //获取标准台账记录
    lookHistoryChangeStandard(record) {
      let archiveid = record.id;
      getarchive(archiveid)
        .then(res => {
          this.$router.push({
            name: "historyChangeStandard",
            params: { res, record }
          });
        })
        .catch(error => {
          showError(error);
        });
    },
    //新增记录
    add() {
      this.$router.push({ name: "addNewRecord" });
    }
  }
};
</script>
<style lang="less"  scoped>
.ant-layout {
  background: white;
  margin: @layout-space-base;
  padding: @content-padding-v @content-padding-h;
  .ant-layout-content{
  padding-top: @layout-space-base;
  }
}
</style>