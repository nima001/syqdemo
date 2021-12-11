<template>
  <!-- 审批细节 -->
  <div class="Approvalunit">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="head">
            <div>单位：杭州市余杭区运河社区服务中心</div>
            <div>工资月份：2018年12月</div>
            <div>申请人：杨</div>
            <a-button
              @click="approval"
              style="width:70px;background-color: #169BD5;"
              type="primary"
            >审批</a-button>
          </div>
          <!-- 表格 -->
          <a-table
            class="tableCls"
            :columns="columns"
            :dataSource="datasource"
            :pagination="pagination"
            :customRow="customRow"
            :bordered="true"
            @change="changePagination"
          >
            <span class="operateBtn"  slot="operate">查看详情</span>
            <!-- <span class="operateBtn" slot-scope="val,record" slot="operate">查看详情</span> -->
          </a-table>
          <approvalModal v-if="isShow" :isShow="isShow" @Modalcancel="closeModal"></approvalModal>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import approvalModal from "./ApprovalModalUnit";
import { Layout, Breadcrumb, Table } from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    approvalModal
  },
  data() {
    return {
      isShow: false,
      columns: [
        {
          dataIndex: "name",
          key: "name",
          title: "姓名",
          align: "center",
          scopedSlots: { customRender: "name" }
        },
        {
          dataIndex: "basePay",
          key: "basePay",
          title: "基本工资",
          align: "center",
          scopedSlots: { customRender: "basePay" },
          children: [
            {
              dataIndex: "jobpay",
              key: "jobpay",
              title: "职务工资",
              align: "center",
              scopedSlots: { customRender: "jobpay" }
            },
            {
              dataIndex: "indexpay",
              key: "indexpay",
              title: "级别工资",
              align: "center",
              scopedSlots: { customRender: "indexpay" }
            }
          ]
        },
        {
          dataIndex: "other",
          key: "other",
          title: "规范性津补贴",
          align: "center",
          children: [
            {
              dataIndex: "life",
              key: "life",
              title: "生活性补贴",
              align: "center",
              scopedSlots: { customRender: "life" }
            },
            {
              dataIndex: "rule",
              key: "rule",
              title: "规范性津贴",
              align: "center",
              scopedSlots: { customRender: "rule" }
            },
            {
              dataIndex: "town",
              key: "town",
              title: "城区生活补贴",
              align: "center",
              scopedSlots: { customRender: "town" }
            }
          ]
        },
        {
          dataIndex: "special",
          key: "special",
          title: "特岗津贴",
          align: "center",
          scopedSlots: { customRender: "special" }
        },
        {
          dataIndex: "change",
          key: "change",
          title: "改革性补贴",
          align: "center",
          scopedSlots: { customRender: "change" }
        },
        {
          dataIndex: "withhold",
          key: "withhold",
          title: "代扣",
          align: "center",
          scopedSlots: { customRender: "withhold" }
        },
        {
          dataIndex: "should",
          key: "should",
          title: "应发合计",
          align: "center",
          scopedSlots: { customRender: "should" }
        },
        {
          dataIndex: "reality",
          key: "reality",
          title: "实发合计",
          align: "center",
          scopedSlots: { customRender: "reality" }
        },
        {
          dataIndex: "operate",
          key: "operate",
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasource: [
        {
          key: 1,
          name: "1",
          jobpay: "1",
          indexpay: "1",
          life: "1",
          rule: "1",
          town: "1",
          special: "1",
          change: "1",
          withhold: "1",
          should: "1",
          reality: 1
        }
      ],
      pagination: {
        position: "bottom",
        pageSize: 1,
        current: 1,
        total: 10,
        showTotal: function(total, range) {
          return `共 ${total} 条记录`;
        }
      }
    };
  },
  methods: {
    changePagination(pagination) {
      //点击分页的回调
      return;
    },
    customRow: function(record) {
      //点击行
      return {
        on: {
          click: function() {
            return;
          }
        }
      };
    },
    approval() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    }
  }
};
</script>
<style lang="less" scoped>
.Approvalunit {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .content {
    padding: 12px;
  }
  .content > div {
    background-color: #fff;
    overflow: hidden;
    position: relative;
    height: 100%;
    padding: 24px 48px;
  }

  .head {
    height: 32px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
  .tableCls {
    margin-top: 24px;
  }
  .operateBtn {
    color: rgb(2, 167, 240);
    cursor: pointer;
  }
}
</style>