<template>
  <!-- 查看内容 -->
  <div class="doneDetail">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <!-- 表格 -->
          <a-table
            class="tableCls"
            :columns="columnsDone"
            :dataSource="datasourceDone"
            :pagination="paginationDone"
            :customRow="customRow"
            :bordered="true"
            @change="changePagination"
          >
            <span class="operateBtn" slot="operate">查看详情</span>
            <!-- <span class="operateBtn" slot-scope="val,record" slot="operate">查看详情</span> -->
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { Layout, Breadcrumb, Table } from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table
  },
  data() {
    return {
      columnsDone: [
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
      datasourceDone: [
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
      paginationDone: {
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
    }
  }
};
</script>
<style lang="less" scoped>
.doneDetail {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .content {
    padding: 12px;
  }
  .content > div {
    background-color: white;
    overflow: hidden;
    position: relative;
    height: 100%;
    padding: 24px 48px;
  }
  .operateBtn {
    color: #169bd5;
    cursor: pointer;
  }
}
</style>