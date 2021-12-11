<template>
  <div class="add-role">
    <div class="toolbar">
      <div class="left">
      </div>
      <div class="right">
        <ul>
          <li>
            <a-input 
              class="queryitem" 
              style="width: 160px"
              placeholder="请输入关键词"
              v-model="search.searchkey"
              >
            </a-input>
          </li>
          <li>
            <a-button class="queryitem" type="primary" @click="onSearch">查询</a-button>
          </li>
          <li>
            <a-button class="queryitem" @click="onReset">重置</a-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="body">
      <a-table
        :columns="columns"
        :dataSource="pagination.rows"
        rowKey="id"
        :loading="pageLoading"
        :pagination="false"
        :rowClassName="(record) => selectRole && selectRole.id == record.id ? 'selected': ''"
        :customRow="row => ({on:{click: () => {onRowClick(row)}}})"
      >
        <span slot="operation" class="operation" slot-scope="text, record">
          <a @click="onCancelBlack(record.id)">取消黑名单</a>
          <a @click="onShowDetail(record.description)">查看详情</a>
        </span>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="pagination.rows && pagination.rows.length"
        showSizeChanger
        :showTotal="total => `总共：${total}条`"
        @showSizeChange="onShowSizeChange"
        :total="pagination.total"
        :pageSize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
      <!-- <a-button class="step-next" type="primary" @click="addRole">确定</a-button> -->
    </div>
    <a-modal centered v-model="detailVisible" title="详情" ok-text="确认" cancel-text="取消" :footer=null>
      <p>{{detailContent}}</p>
    </a-modal>
  </div>
</template>
<script>
import { Button, Table, Pagination, Input } from "ant-design-vue";
import { orgblackproblemspagequery,removeBlacklist } from "@/person-shaoxing/api/monitor";
import { showError } from "@/framework/utils/index";
export default {
  name: "AddRole",
  props: ['orgblackid'],
  data() {
    return {
      columns: [
        { title: "类别", dataIndex: "businesstype", customRender: this.dictRender('person.shaoxing.monitor.businesstype') , width:'20%' },
        { title: "问题或异动情况描述", dataIndex: "description", width:'40%' },
        { title: "创建时间", dataIndex: "discovertime", customRender: (text) => (text && text.substr(0, 10)) , width:'20%' },
        { title: "操作", scopedSlots: { customRender: "operation" }, width:'20%' }
      ],
      selectRole: null,
      search: {
        searchkey: null
      },
      pageLoading: false,
      pagination: {
        total: 0,
        pagenum: 1,
        pagesize: 10
      },
      detailContent: undefined,
      detailVisible: false
    }
  },
  components: {
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    AInput: Input
  },
  created() {
    this.loadData({ pagenum: 1, pagesize: this.pagination.pagesize });
  },
  watch: {
    orgblackid:{
      immediate: false,
      handler: function () {
        this.loadData({ pagenum: 1, pagesize: this.pagination.pagesize });
      }
    },
  },
  methods: {
    loadData(page) {
      this.pageLoading = true;
      orgblackproblemspagequery({
        ...page,
        needtotal: true,
        id: this.orgblackid,
        ...this.search,
      })
      .then(({result}) => {
        this.pageLoading = false;
        this.pagination = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    dictRender(key, attr){
      return (text, row, index) => {
        let v =  this.$store.getters.dictKey(key || row[attr], text);
        text = (v && v.text) || ''
        return <span title={text}>{text}</span>;
      }
    },
    onRowClick(row) {
      this.selectRole = row;
    },
    onSearch() {
      this.loadData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
    onReset() {
      this.search.searchkey = null;
      this.loadData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
    onShowSizeChange(pagenum, pagesize) {
      this.loadData({ pagenum: 1, pagesize });
    },
    onPageChange(pagenum, pagesize) {
      this.loadData({ pagenum, pagesize });
    },
    //  取消黑名单
    onCancelBlack(id) {
      if(id) {
        let that = this;
        that.$confirm({
          title: "确认移除黑名单?",
          onOk() {
            removeBlacklist(id)
              .then(res => {
                that.$notification.warning({
                  message: "提示",
                  description: "移除黑名单成功!",
                  duration: 3
                });
                that.loadData({ pagenum: that.pagination.pagenum, pagesize: that.pagination.pagesize });
              })
              .catch(error => {
                showError(error);
              });
          },
          onCancel() {}
        });
      }
    },
    onShowDetail(content) {
      this.detailVisible = true;
      this.detailContent = content;
    }
  }
}
</script>
<style lang="less" scoped>
.add-role{
  height: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    white-space: nowrap;
    padding: @content-padding-v @content-padding-h;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    ul {
      margin: 0;
      white-space: nowrap;
    }
    li {
      display: inline-block;
      margin-left: 8px;
      white-space: nowrap;
      .name {
        line-height: 32px;
        padding-right: 5px;
        vertical-align: middle;
      }
      .ant-input-group.ant-input-group-compact,
      .ant-select,
      .ant-btn,
      .ant-input-affix-wrapper {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .pzwh-tooltip {
      font-size: @font-size-base;
      color: @primary-color;
    }
    .pzwh {
      width: auto;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      &:hover {
        border-color: @primary-color;
      }
      &:focus-within {
        border-color: @primary-color;
        box-shadow: 0 0 0 2px fade(@primary-color, 20%);
      }
      /deep/.ant-input {
        border: none;
        height: 30px;
      }
      /deep/.ant-input-group-addon {
        border: none;
        background: none;
        padding: 0 4px;
      }
    }
  }
  & > .body {
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: 0 @content-padding-h;
    /deep/tr.selected {
      background: @primary-2;
    }
    /deep/.opts > .disable {
      color: @disabled-color;
      cursor: not-allowed;
    }
    .operation {
      a {
        margin-right: 15px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  & > .footer {
    padding: 12px @content-padding-h;
    border-top: 1px solid @border-color-base;
    .ant-pagination{
      float: left;
    }
    .ant-btn{
      float: right;
    }
  }
}
</style>