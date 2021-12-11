<template>
  <div class="wrap">
      <div class="content">
        <div class="header">
          <div class="left" :span="6">
            <a-button icon="plus" class="btns" @click="designPage()">新增</a-button>
            <a-button icon="delete" class="btns" @click="delRows">删除</a-button>
          </div>
          <div class="right" :span="18" :style="{textAlign:'right'}">
            <a-select
              placeholder="分组"
              :style="{width:'200px',marginLeft:'15px'}"
              @change="groupChange"
            >
              <a-select-option
                :value="item.value"
                v-for="item in sortGroup"
                :key="item.id"
              >{{item.text}}</a-select-option>
            </a-select>
            <a-input
              placeholder="输入模块名称"
              v-model="modlesName"
              :style="{width:'200px',marginLeft:'15px'}"
            />
            <a-button type='primary' :style="{ marginLeft:'10px'}" @click="search">搜索</a-button>
            <a-button class="btns"  @click="reset">重置</a-button>
          </div>
        </div>
        <div class="main">
            <a-table
              :columns="columns"
              :dataSource="tableList"
              :loading="loading"
              :pagination="false"
              rowKey="id"
              :rowClassName="(row) => selectedRow && selectedRow.id == row.id ? 'selected': ''"
              :customRow="customRow"
            >
              <div class="operation" slot="operation" slot-scope="text, record">
                <a @click="designPage(record.id)">编辑</a>
              </div>
            </a-table>
        </div>
        <div class="footer" v-if="pagination.total > 0">
          <a-pagination
          showSizeChanger
          :pageSize='pagination.pagesize'
          @showSizeChange='showSizeChange'
          @change="pageChange"
          v-model="pagination.pagenum"
          :showTotal="total => `总共：${total}条`"
          :total="pagination.total"
          />
        </div>
      </div>
  </div>
</template>
<script>
import { templateList, delTemplate } from "@/person/api/booklet";
import { showError } from "@/framework/utils/index";
import assign from 'lodash/assign';
import {Layout,Row,Col,Breadcrumb,Table,Button,Select,Input,Pagination} from "ant-design-vue";
export default {
  name: "TemplateList",
  data() {
    return {
      loading: false,
      selectedRow:{},
      tableList: [],
      sortGroup: [],
      modlesName: "",
      columns: [
        {
          title: "序号",
          width:70,
          customRender: (text, record, index) =>
            `${(this.pagination.pagenum - 1) * this.pagination.pagesize +
              (index + 1)}`
        },
        {
          title: "模板名称",
          dataIndex: "name"
        },
        {
          title: "分组",
          dataIndex: "group"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination: {
        pagenum: 1,
        pagesize: 20,
        total: 0
      }
    };
  },
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ARow: Row,
    ACol: Col,
    APagination:Pagination,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input
  },
  created() {
    this.getTempList(this.pagination);
    let routers = this.$route.matched;
  },
  methods: {
    customRow(row){
      return {
        on: {
          click: () => {
            this.selectedRow = row;
          },
        }
      };
    },
    showSizeChange(pagenum,pagesize){
      this.getTempList({pagenum:1,pagesize});
    },
    pageChange(pagenum,pagesize){
      this.getTempList({pagenum,pagesize});
    },
    getTempList({pagenum,pagesize} = {}) {
      this.loading = true;
      let data = {
        needtotal: true,
        pagenum,
        pagesize,
        searchkey: this.modlesName
      };
      templateList(data)
        .then(res => {
          this.tableList = res.result.rows;
          assign(this.pagination,res.result)
        })
        .catch(error => {
          showError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    delRows() {
      let id = this.selectedRow.id
      if (id) {
        delTemplate(id)
          .then(res => {
            this.$notification.success({
              message: "提示",
              description: "删除成功",
              duration: 3
            });
            this.getTempList(this.pagination);
          })
          .catch(erroe => {
            showError(error);
          });
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择要删除的模板!",
          duration: 3
        });
      }
    },
    groupChange(value) {},
    tableChange(pagination, filters, sorter) {
      assign(this.pagination,pagination)
      this.getTempList();
    },
    designPage(templateId = undefined) {
      this.$router.push({
        path: "/person/charttemplate/design",
        query: { templateId }
      });
    },
    search() {
      this.pagination.pagenum = 1;
      this.getTempList(this.pagination);
    },
    reset() {
      this.pagination.pagenum = 1;
      this.modlesName = "";
      this.getTempList(this.pagination);
    }
  }
};
</script>
<style lang="less" scoped>

.wrap {
  height: 100%;
  padding: @layout-space-base;
  .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: @white;
    .header{
      display: flex;
      padding: @content-padding-v @content-padding-h;
      margin-top: 10px;
      .left,.right{
        .btns {
          margin-left: 10px;
          border-color: @primary-color;
          color: @primary-color;
          background-color: @white;
          border-color: @primary-color;
          &:hover{
            color: lighten(@primary-color, 20%);
            border-color: lighten(@primary-color, 20%);
          }
          &:first-child{
            margin-left: 0px;
          }
        }
      }
      .right{
        flex:1;
      }
    }
    .main{
      flex-shrink: 1;
      overflow-y: auto;
      padding: @content-padding-v @content-padding-h;
      /deep/.ant-table-thead {
        tr {
          th {
            border-right: 1px solid #e8e8e8;
            &:last-child {
              border-right: none;
            }
          }
        }
      }
      /deep/ table{
        tr{
          &.selected{
            background: @primary-2;
          }
          /deep/ td{
            padding: @padding-xs;
          }
        }
      }
    }
    .footer{
      padding: @content-padding-v @content-padding-h;
      margin: 10px;
      text-align: right;
    }
  }
}

</style>