<template>
  <a-modal
    class="user-list-table"
    :visible="visible"
    title="人员列表"
    width="80%"
    :bodyStyle="bodystyle"
    okText="确定"
    cancelText="取消"
    @cancel="() => { $emit('cancel') }"
    :footer="null"
    :centered="true"
  >
    <a-table
      class="standing-table"
      :columns="columns"
      :dataSource="userList"
      rowKey="id"
      size="middle"
      :pagination="pagination"
      @change="handleTableChange"
    ></a-table>
  </a-modal>
</template>
<script>
import moment from "moment";
import { getUserListWithChart } from "@/person/api/org";
import { Modal, Table } from "ant-design-vue";
import { showError } from "@/framework/utils/index";

export default {
  data() {
    return {
      columns: [],
      bodystyle: {
        height: "500px",
        overflow: "auto",
        padding: "24px 36px"
      },
      userList: [],
      docData: {
        fileid: null,
        fileName: null,
        fileUrl: null
      },
      pagination: {
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      }
    };
  },
  components: {
    AModal: Modal,
    ATable: Table
  },
  props: ["visible", "orgid", "code"],
  watch: {
    visible(val) {
      if (this.visible) {
        this.getUserlist();
      }
    }
  },
  methods: {
    moment,
    //切换分页
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getUserlist();
    },
    //获取文件名称
    getUserlist() {
      let val = {};
      val.id = this.orgid;
      val.code = this.code;
      getUserListWithChart(val, this.pagination)
        .then(res => {
          this.columns = [];
          if (res.result.header.length > 0) {
            for (let i = 0; i < res.result.header.length; i++) {
              let item = res.result.header[i];
              this.columns.push({
                title: item.showname,
                dataIndex: item.column
              });
            }
          }
          this.userList = res.result.rows;
          for (let i = 0; i < this.userList.length; i++) {
            this.userList[i].birthday = this.userList[i].birthday
              ? moment(this.userList[i].birthday).format("YYYY-MM-DD")
              : undefined;
          }
          this.pagination.total = res.result.total;
          this.pagination.current = res.result.pagenum;
        })
        .catch(error => {
          showError(error);
        });
    }
  }
};
</script>
<style lang="less">
.user-list-table {
  table {
    table-layout: fixed;
    td,
    th {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>