<template>
  <div class="examine-record">
    <div class="main-table">
      <a-table
        rowKey="id"
        :columns="columns"
        :bodyStyle="{height: '375px'}"
        :dataSource="pagination.rows"
        :pagination="false"
        :loading="loading"
        :customRow="click"
      >
        <div
          :title="record.changefields"
          :style="{maxWidth: '600px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden', wordWrap: 'break-word', wordBreak: 'break-all' }"
          slot="titleShow"
          slot-scope="text, record"
        >{{record.changefields?record.changefields.join(" , "):""}}</div>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="pagination.rows && pagination.rows.length"
        showSizeChanger
        @showSizeChange="onShowSizeChange"
        :showTotal="total => `总共：${total}条`"
        :total="pagination.total"
        :pageSize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
    </div>
    <a-modal v-model="visible" title="变动详情" @ok="handleOk">
      <a-table
     :rowKey="row=>row.key"
      :columns="columnstwo"
      :dataSource="dataSource"
      :pagination="false"
      />
    </a-modal>
  </div>
</template>
<script>
import moment from "moment";
import { Table, Pagination,Modal } from "ant-design-vue";
import { changeset,getchangeset } from "@/person/api/examineManage";
import { showError } from "@/framework/utils/index";
import { uiConfigsCookies } from "@/framework/utils/auth";
export default {
  props: ["user"],
  components: {
    ATable: Table,
    AModal: Modal,
    APagination: Pagination
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "10%"
        },
        {
          title: "类型",
          dataIndex: "tag",
          key: "tag",
          ellipsis: true,
          width: "20%"
        },
        {
          title: "变动时间",
          dataIndex: "excutetime",
          key: "excutetime",
          customRender: function(text, record, index) {
            if (text) {
              return moment(text).format("YYYY-MM-DD");
            }
          },
          width: "20%"
        },
        {
          title: "变动信息",
          dataIndex: "changefields",
          key: "changefields",
          scopedSlots: { customRender: "titleShow" },
          width: "50%"
        }
      ],
      columnstwo:[
        {
          title: "变动信息",
          dataIndex: "field",
          key: "field",
        },
        {
          title: "变动前",
          dataIndex: "beforeValue",
          key: "beforeValue",
        },
        {
          title: "变动后",
          dataIndex: "afterValue",
          key: "afterValue",
        },
      ],
      dataSource:null,
      loading: false,
      pagination: {
        rows: null,
        pagenum: 1,
        pagesize: 10,
        total: 0
      },
      visible:false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleOk(){
      this.visible = false;
    },
    click(record, index) {
      return {
        on: {
          click: () => {
            let id = record.id
            getchangeset(id).then(res=>{
              this.dataSource = res.result
            })
            this.visible = true;
          }
        }
      };
    },
    loadData() {
      if (this.user) {
        this.loading = true;
        changeset({
          needtotal: true,
          pagenum: this.pagination.pagenum,
          pagesize: this.pagination.pagesize,
          userid: this.user._id
        })
          .then(res => {
            this.loading = false;
            this.pagination = res.result;
            // res.rows.forEach(val => {
            //   val.checkResult = this.checkResult(val.checkResult);
            // });
          })
          .catch(err => {
            this.loading = false;
            showError(err);
          });
      }
    },
    // checkResult(checkResult) {
    //   let d = this.$store.getters.dictKey(
    //     "usermanage.org.sndkhqk",
    //     checkResult
    //   );
    //   return d && d.text;
    // },
    onShowSizeChange(current, size) {
      this.pagination.pagenum = current;
      this.pagination.pagesize = size;
      this.loadData();
    },
    onPageChange(value) {
      this.pagination.pagenum = value;
      this.loadData();
    }
  }
};
</script>

<style lang="less" scoped>
.examine-record {
  height: 100%;
  .top-btn {
    padding: 0 @padding-lg;
    margin-top: @padding-xs;
    display: flex;
    justify-content: flex-end;
    span {
      cursor: pointer;
    }
  }
  .main-table {
    padding: @padding-xs @padding-lg;
    flex-shrink: 1;
    min-height: 0;
    overflow-y: auto;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: @content-padding-v @padding-lg;
    .ant-pagination {
      margin-bottom: 10px;
    }
  }
}
</style>