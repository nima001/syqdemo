<template>
  <!-- 实名制//机构管理员 -->
  <div class="mechanismbody">
    <div class="panel">
      <div class="mechanism">
        <div class="top">
          <!-- <a-button type="primary" icon="plus" style="margin-right:10px;" @click="showModal">新增管理员</a-button> -->
          <!-- <a-button icon="delete" type="primary" @click="deletetable">删除</a-button> -->
          <div class="queryButton">
            <a-input-search placeholder="输入姓名或手机查询" enterButton="搜索" @search="onSearch" allowClear></a-input-search>
          </div>
        </div>
      </div>
      <a-table
        class="per-table"
        :loading="loading"
        rowKey="_id"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,columnWidth:columnWidth}"
        :columns="columns"
        :pagination="false"
        :dataSource="pagination.rows"
        @change="tableChange"
      />
      <div class="footer">
        <a-pagination
          v-if="pagination.rows && pagination.rows.length"
          showSizeChanger
          :showTotal="total => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="pagination.total"
          v-model="pagination.pagenum"
          @change="onPageChange"
        />
      </div>
    </div>
    <a-modal
      :footer="null"
      v-model="visible"
      :width="800"
      title="选择用户"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <org-user-select
        mode="user"
        :show-dept="true"
        :max-select="10"
        :default-tree="treeid"
        @finish="onUserSelected"
      />
    </a-modal>
  </div>
</template>
<script>
import { Button, Input, Table, Modal, Pagination } from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import moment from "moment";
import { showError } from "@/framework/utils/index";
import {getManager, seachManager, deleteManager, addManager } from "@/person/api/manager";
import {getUser} from "@/person/api/user";


let userLoader = {
  cache: new Map(),
  loading: new Set(),
};

export default {
  props: ["org", "treeid"],
  components: {
    AButton: Button,
    AInputSearch: Input.Search,
    ATable: Table,
    AModal: Modal,
    APagination: Pagination,
    OrgUserSelect
  },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          width: "25%",
          dataIndex: "user.username"
        },
        {
          title: "手机号码",
          width: "25%",
          dataIndex: "user.mobilephone"
        },
        {
          title: "所在组织",
          dataIndex: "user._id",
          customRender: this.orgRender
        }
      ],
      loading: false,
      columnWidth: "40px",
      selectedRowKeys: [],
      visible: false,
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0
      }
    };
  },
  computed: {
    nowOrg() {
      return this.org;
    }
  },
  created() {
    this.newAdministrators();
  },
  watch: {
    nowOrg() {
      if (this.nowOrg) {
        this.newAdministrators();
      }
    }
  },
  methods: {
    //初始化
    newAdministrators(page) {
      this.loading = true;
      const pagination = page ? page : this.pagination;
      getManager({ 
        ...pagination,
        orgid: this.org._id,
        needtotal: true,
      }).then(({result}) => {
        this.loading = false;
        this.pagination = result || {};
      }).catch(error => {
        this.loading = false;
        showError(error);
      });
    },
    orgRender(key, row, index){
      if(!key){
        return '';
      }
      let {cache, loading} = userLoader;
      let v = cache.get(key);
      if(v){
        return v.org && v.org.name;
      }
      if(!loading.has(key)){
        loading.add(key);
        getUser(key).then(({result}) => {
          loading.delete(key);
          cache.set(key, {org: result.org});
          this.pagination.rows = [...this.pagination.rows];
        }).catch(err => {
          loading.delete(key);
        })
      }
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(pagenum, size) {
      this.loadData(1, size);
    },
    loadData(pagenum, pageSize) {
      this.newAdministrators({ pagenum, pageSize });
    },
    showModal() {
      this.visible = true;
    },
    onUserSelected(type, list) {
      this.visible = false;
      if (type == "ok") {
        this.listid = [];
        for (let i = 0; i < list.length; i++) {
          this.listid.push(list[i]._id);
        }
        addManager(this.org._id, this.listid)
          .then(res => {
            this.newAdministrators();
          })
          .catch(error => {
            showError(error);
          });
      }
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    tableChange(pagination, filters, sorter) {
      this.pagination = pagination;
    },
    deletetable() {
      let selected = this.selectedRowKeys.length == 0 ? false : true;
      if (selected) {
        let userIdList = this.selectedRowKeys;
        let orgid = this.org._id;
        let that = this;
        this.$confirm({
          title: "确认删除该管理员信息?",
          onOk() {
            deleteManager(orgid, userIdList)
              .then(res => {
                that.newAdministrators();
              })
              .catch(error => {
                showError(error);
              });
          },
          onCancel() {}
        });
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择要删除的模板!",
          duration: 3
        });
      }
    },
    onSearch(value) {
      this.loading = true;
      if (value) {
        let data = { ...this.pagination };
        data.orgid = this.org._id;
        data.needtotal = true;
        data.searchkey = value;
        data.pagenum = 1;
        getManager(data)
          .then(res => {
            this.loading = false;
            this.pagination = res.result;
          })
          .catch(error => {
            showError(error);
          });
      } else {
        this.loading = false;
        this.newAdministrators();
      }
    },
    showModal() {
      this.visible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.mechanismbody {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .panel {
    flex: auto;
    min-height: 0;
    min-width: 1000px;
    display: flex;
    flex-direction: column;
    & > .mechanism {
      padding: @content-padding-v @content-padding-h;
      margin: 0;
      .queryButton {
        width: 300px;
        float: right;
      }
    }
    & > .per-table {
      padding: 0 @content-padding-h;
      flex-shrink: 1;
      min-height: 0;
      overflow-y: auto;
      /deep/table {
        table-layout: fixed;
        td,
        th {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    & > .footer {
      padding: @content-padding-v @content-padding-h;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>