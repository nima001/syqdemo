<template>
  <div class="wrap">

    <div class="data-panel">
      <div class="data-top">
        <a-radio-group default-value="defaultorg" :value="currentRadio" class="tree-select-radio">
          <a-radio-button
            value="defaultorg"
            :class="treeIdData.otherorgids ? 'tree-select-radio-button-other' : 'tree-select-radio-button'"
            @click="toggleRaio({ treeid: 12, value: 'defaultorg' })"
            >
            组织架构
          </a-radio-button>
          <a-radio-button
            value="verorg"
            :class="treeIdData.otherorgids ? 'tree-select-radio-button-other' : 'tree-select-radio-button'"
            @click="toggleRaio({ treeid: 10, value: 'verorg' })"
            >
            单位垂直
          </a-radio-button>

          <div
            class="tree-select-dropdown"
            @click="dropdownClick"
            :class="borderClass ? 'border-color-bule' : 'border-color-gray'"
            v-if="treeIdData.otherorgids">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link">
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item v-for="item in treeIdData.otherorgids" :key="item.value">
                  <a href="javascript:;" >{{item.name}}</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </a-radio-group>
      </div>
      <div class="warp-tree">
        <org-tree @select="onOrgSelect" :nodeid="nodeid" :treeid="treeid"/>
      </div>
    </div>

    <div class="selected-panel">
      <div class="search">
        <a-select v-if="nodeid" class="search-item scope" v-model="choice">
          <a-select-option :value="1">本级</a-select-option>
          <a-select-option :value="2">包含下级</a-select-option>
        </a-select>
        <dict-select dict="idm.account.authlevel"
           v-model="search.authlevel"
           placeholder="账号类型"
           allowClear
           style="width: 100px"
           class="search-item"
        />
        <dict-select dict="idm.account.status"
           v-model="search.status"
           placeholder="账号状态"
           allowClear
           style="width: 100px"
           class="search-item"
        />
        <a-input
          placeholder="请输入姓名/邮箱/手机/身份证号查询"
          style="width: 120px"
          allowClear
          class="search-item"
          v-model="keyWord"
        />
        <a-button class="searchBt" type="primary" @click="onSearch">搜索</a-button>
      </div>
      <div class="selected-data">
        <div class="container">

          <a-table
            class="per-table"
            rowKey="_id"
            :columns="columns"
            :dataSource="userList"
            :pagination="false"
            :loading="loadStatus"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
            >

          </a-table>
          <div class="footer">
            <a-pagination
              v-if="userList && userList.length"
              showSizeChanger
              :showTotal="total => `总共：${total}人`"
              @showSizeChange="onShowSizeChange"
              :total="pagination.total"
              :pageSize="pagination.pagesize"
              v-model="pagination.pagenum"
              @change="onPageChange"
              show-less-items
            />
          </div>
        </div>
      </div>
    </div>

    <div class="warp-footer">
      <div class="right">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="ok">确认</a-button>
      </div>
    </div>

  </div>
</template>

<script>
import { Dropdown, Menu, Icon, Radio, Button, Spin, Select, Input, Table, Pagination } from "ant-design-vue";
import OrgTree from "@/idm/components/OrgTree";
import EmptyData from "@framework/components/EmptyData";
import DictSelect from "@/framework/components/DictSelect";
import { treeids } from "@/idm/api/org";
import { accountquery, deptaccountquery } from "@/idm/api/account";
import { showError } from "@/framework/utils/index";

export default {
  props: {},
  components: {
    AIcon: Icon,
    AInput: Input,
    ATable: Table,
    APagination: Pagination,
    AButton: Button,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    ADropdown: Dropdown,
    AMenu: Menu,
    ASpin: Spin,
    AMenuItem: Menu.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    OrgTree,
    EmptyData,
    DictSelect
  },
  data() {
    return {
      columns: [
        { title: "用户名", width: '33%', dataIndex: "loginname", scopedSlots: { customRender: "loginname" } },
        { title: "姓名", width: '33%', dataIndex: "username", scopedSlots: { customRender: "username" } },
        { title: "手机号码", width: '33%', dataIndex: "mobilephone", scopedSlots: { customRender: "mobilephone" } },
      ],
      // nodeid: undefined,
      treeid: undefined,
      treeIdData: {},
      currentRadio: 'defaultorg',
      borderClass: false,
      selectedOrg: null,
      selectedUser: [],
      selectedRowKeys: [],
      pagination: {
        pagesize: 50,
        pagenum: 1,
        total: 0
      },
      userList: [],
      loadStatus: false,
      choice: 1,
      keyWord: undefined,
      search: {
        authlevel: undefined,
        status: undefined,
      }
    };
  },
  watch: {
    selectedOrg(val) {
      if (this.selectedUser.length > 0) {
        this.selectedUser.splice(0, this.selectedUser.length);
      }
      this.getUserList(this.pagination);
    }
  },
  computed: {
    nodeid(){
      if(this.selectedOrg){
        let {node, dept} = this.selectedOrg;
        return dept ? null : node && node.id;
      }
    },
  },
  created() {
    this.getTreeids();
  },
  mounted() {},
  methods: {
    onOrgSelect(node, dept, init) {
      this.selectedOrg = { node, dept, treeid: this.treeid};
    },
    cancel() {
      this.$emit('select-cancel', 'fail');
    },
    ok() {
      if (this.selectedUser && this.selectedUser.length > 0) {
        //  暂时单选
        this.$emit('select-ok', this.selectedUser[0]);
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择用户",
          duration: 1.5
        });
      }
    },
    getTreeids(){
      treeids()
      .then(({result}) => {
        this.treeIdData = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    toggleRaio(data) {
      let { value, treeid } = data;
      this.currentRadio = value;
      this.treeid = treeid;
      this.borderClass = false;
    },
    dropdownClick(element){
      this.borderClass = true;
      this.currentRadio = null;
    },
    handleMenuClick(e) {
      this.treeid = e.key;
    },
    getParams(page) {
      if (this.nodeid) {
        const params = {
          treeid: this.treeid,
          nodeid: this.nodeid,
          needtotal: true,
          properties: { ...this.search },
          searchkey: this.keyWord,
          ...page,
        }
        if (this.choice == 1) {
          params.orgid = this.selectedOrg.node.data._id;
        }
        return params;
      } else {
        const params = {
          orgid: this.selectedOrg.node.data._id,
          ...page,
          needtotal: true,
          searchkey: this.keyWord,
          properties: { ...this.search }
        };
        return params;
      }
    },
    getUserList(page) {
      if (!this.selectedOrg) {
        return;
      }
      this.loadStatus = true;
      let request;
      if (this.nodeid) {
        request = accountquery(this.getParams(page));
      } else {
        request = deptaccountquery(this.getParams(page));
      }
      request.then(({result}) => {
        this.pagination.total = result.total;
        this.userList = result.rows;
        this.loadStatus = false;
      }).catch(error => {
        this.loadStatus = false;
        showError(error);
      });
    },
    onPageChange(pagenum, pagesize) {
      this.getUserList({pagesize, pagenum});
    },
    onShowSizeChange(current, pagesize) {
      this.getUserList({pagesize, pagenum: 1});
    },
    onSearch() {
      let { pagesize } = this.pagination
      this.getUserList({pagesize, pagenum: 1});
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedUser = selectedRows;
    }
  },
};
</script>
<style lang="less" scoped>
.wrap{
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
 
    .data-panel{
      flex: 1 1 30%;
      min-width: 0;
      height: calc(~'100% - 56px');
      .data-top{
        // margin-top: 12px;
        padding: 12px 20px 0;
        .tree-select-radio{
          width: 100%;
          position: relative;
          // .tree-select-radio-button{
          //   width: 50%;
          // }
          // .tree-select-radio-button-other{
          //   width: 44%;
          // }
          .tree-select-dropdown{
            position: absolute;
            top: 0;
            left: 174px;
            width: 12%;
            height: 32px;
            line-height: 30px;
            border: 1px solid #d9d9d9;
            border-left-color: transparent;
            border-radius: 0 4px 4px 0;
            text-align: center;
          }
          .border-color-bule{
            border-color: @primary-color;
            border-left-color: @primary-color;
          }
          .border-color-gray{
            border-color: #d9d9d9;
            border-left-color: transparent;
          }
          .tree-select-dropdown-active{
            border-color: @primary-color;
          }
        }
      }
      .warp-tree{
        height: calc(~'100% - 44px');
      }
    }

    .selected-panel{
      flex: 1 1 70%;
      min-width: 0;
      height: calc(~'100% - 100px');
      border-left: 1px solid #e8e8e8;
      padding: 0 5px;
      .search{
        height: 44px;
        padding: 12px @padding-lg 0 @padding-lg;
        display: flex;
        justify-content: flex-end;
        .search-item{
          margin-right: 10px;
        }
      }
      .selected-data{
        height: 100%;
        // padding: 0 15px;
        .container{
          height: 100%;
          .per-table{
            height: calc(~'100% - 58px');
            padding: 12px @padding-lg;
            overflow-y: auto;
            /deep/table {
              table-layout: fixed;
              td,th {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              td{
                 padding: 5px 2px;
              }
              tr.selected{
                background: @primary-2;
              }
            } 
          }
          .footer {
            display: flex;
            justify-content: flex-end;
            padding: 12px @content-padding-h;
            // .ant-pagination {
            //   margin-bottom: 10px;
            // }
          }
        }
      }
    }

    .warp-footer{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 56px;
      .right{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 20px;
        height: 100%;
        border-top: 1px solid #e8e8e8;
        button{
          &:last-child{
            margin-left: 12px;
          }
        }
      }
    }

}
</style>