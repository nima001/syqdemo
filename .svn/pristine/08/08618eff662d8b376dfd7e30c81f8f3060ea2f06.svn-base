<template>
  <!-- 历史调标done -->
  <!-- 记得增加路由守卫 -->
  <div class="historyChangeStandard">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="historyInfo">
            <div>名称：{{itemRecord.reason}}</div>
            <div style="width: 500px;">依据：{{itemRecord.title}}</div>
            <div>调整时间：{{itemRecord.operationtime}}</div>
            <div>批准文号：{{itemRecord.ledgerVo.num}}</div>
          </div>
          <!-- 表格 -->
          <a-table
            class="tableCls"
            :columns="columnsHistory"
            :dataSource="datasourceHistory"
            :bordered="false"
            :loading="false"
            :pagination="false"
            :customRow="customRow"
          >
            <div
              @click="showDetail(record)"
              style="color:#02A7F0;cursor: pointer; "
              slot="operate"
              slot-scope="val,record"
            >查看详情</div>
          </a-table>
          <button @click="back" class="btn">返回</button>
          <!-- 详情modal -->
          <salaryStandard-Modal
            v-if="detailData.code"
            @closeModal="Modalcancel"
            :detailData="detailData"
            :isShow="visible"
          ></salaryStandard-Modal>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import salaryStandardModal from "./SalaryStandardModal";
import { Layout, Breadcrumb, Table, Button } from "ant-design-vue";
import { getnewdata } from "@/salary/api/wagesystem";
import { showError } from "@/framework/utils/index";
export default {
  name: "historyChangeStandard",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: ALayout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    AButton: Button,
    salaryStandardModal
  },
  //增加路由守卫 查看详情 必须需要 从调标页进入
  // beforeRouteEnter (to,from,next) {
  //     next(vm => {
  //         if(vm.datasourceHistory.length == 0){
  //             vm.$router.push('/business/changeStandard')  //回到调标页面
  //         }
  //     })
  // },
  created() {
    if (this.$route.params.data.result) {
      this.itemRecord = this.$route.params.record;

      let historyList = this.$route.params.data.result;
      //增加唯一key
      for (let i = 0; i < historyList.length; i++) {
        historyList[i]["key"] = `key${i}`;
      }
      this.datasourceHistory = historyList;
    } else {
      return;
    }
  },
  data: function() {
    return {
      itemRecord: "",
      detailData: {}, // 详情数据
      visible: false, //展示详情
      datasourceHistory: [],
      columnsHistory: [
        {
          title: "工资标准名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "启用时间",
          dataIndex: "enabletime",
          key: "enabletime",
          align: "center",
          width: "35%",
          scopedSlots: { customRender: "enabletime" }
        },
        {
          title: "最后更新时间",
          dataIndex: "lastUpdatetime",
          key: "lastUpdatetime",
          align: "center",
          width: "15%",
          scopedSlots: { customRender: "lastUpdatetime" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "30%",
          scopedSlots: { customRender: "operate" }
        }
      ]
    };
  },
  methods: {
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
    back() {
      this.$router.go(-1);
    },
    //查看详情
    showDetail(record) {
      let id = record.id;
      getnewdata(id)
        .then(res => {
          res.itemName = record.name;
          this.detailData = res;
          this.visible = true;
        })
        .catch(error => {
          showError(error);
        });
    },
    Modalcancel(close) {
      if (close == "close") {
        this.detailData = "";
      }
      this.visible = false; //modal退出
    }
  }
};
</script>
<style lang="less" scoped>
.historyChangeStandard {
  .ant-layout {
    height: 100%;
    .ant-breadcrumb {
      margin: 10px 0;
    }
    /* 修改表头background */
    .ant-table-thead tr th {
      background-color: rgba(242, 242, 242, 1);
      color: black;
    }
    /* 表格 */
    .tableCls {
      margin: 0 auto;
      margin-top: 12px;
    }
    /* top信息 */
    .historyInfo {
      height: 100px;
      width: 500px;
      display: grid;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(2, 50%);
      align-items: center;
    }
    .historyInfo div {
      color: black;
      font-size: 15px;
    }
    /* 内容区样式 */
    .content {
      padding: 12px;
    }
    .content > div {
      background-color: #fff;
      overflow: hidden;
      padding: 12px 48px;
      height: 100%;
      position: relative;
    }
    .btn {
      width: 100px;
      position: absolute;
      left: 50%;
      margin-left: -50px;
      height: 32px;
      background-color: @primary-color;
      outline: none;
      color: white;
      border: none;
      border-radius: 5px;
      bottom: 24px;
    }
  }
}
</style>