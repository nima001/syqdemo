<template>
  <div class="wrap">
    <div class="content">
      <div class="header">
        <div class="left" :span="6">
          <a-button type="primary" @click="showModal()">新增</a-button>
          <a-button class="btns" @click="delRows">删除</a-button>
        </div>
        <div class="right" :span="18" :style="{ textAlign: 'right' }">
          <a-input
            placeholder="评估对象"
            v-model="searchdata.target"
            :style="{ width: '200px', marginLeft: '15px' }"
          />
          <a-input
            placeholder="评估表名称"
            v-model="searchdata.name"
            :style="{ width: '200px', marginLeft: '15px' }"
          />
          <dict-select
            v-model="searchdata.sort"
            dict="person.evaluate.templatetype"
            allowClear
            class="queryitem"
            style="width: 200px"
            placeholder="分类"
          />
          <a-button
            type="primary"
            :style="{ marginLeft: '10px' }"
            @click="search"
            >搜索</a-button
          >
          <a-button class="btns" @click="reset">重置</a-button>
        </div>
      </div>

      <div class="main">
        <a-table
          :columns="columns"
          :dataSource="tableList"
          :loading="loading"
          :pagination="false"
          rowKey="id"
          :rowClassName="
            (row) => (selectedRow && selectedRow.id == row.id ? 'selected' : '')
          "
          :customRow="customRow"
        >
          <div class="operation" slot="operation" slot-scope="text, record">
            <!--  -->
            <a class="operation-a" @click="showModal(record.id)">编辑</a>
            <a class="operation-a" @click="assessPreview(record.id)">预览</a>
            <a class="operation-a" @click="assessEdit(record)">内容管理</a>
            <a class="operation-a" @click="ruleMange(record.id)"
              >等级评定规则</a
            >
          </div>
        </a-table>
      </div>
      <div class="footer" v-if="pagination.total > 0">
        <a-pagination
          showSizeChanger
          :pageSize="pagination.pagesize"
          @showSizeChange="showSizeChange"
          @change="pageChange"
          v-model="pagination.pagenum"
          :showTotal="(total) => `总共：${total}条`"
          :total="pagination.total"
        />
      </div>
      <!-- 新增报表 -->
      <a-modal
        v-model="addvisible"
        title="新增报表"
        @ok="add"
        @cancel="handleCancel"
        :destroyOnClose="true"
        :width="800"
        :bodyStyle="{ padding: 0, overflow: 'hidden' }"
      >
        <AddReport ref="EditTemplate" :selectID="selectID" />
      </a-modal>
      <!-- 编辑报表 -->
      <a-modal
        v-model="visible"
        title="编辑报表"
        @ok="edit"
        @cancel="handleCancel"
        :width="800"
        :destroyOnClose="true"
        :bodyStyle="{ padding: 0, overflow: 'hidden' }"
      >
        <AddReport ref="EditTemplate" :selectID="selectID" />
      </a-modal>
    </div>
  </div>
</template>
<script>
import {
  queryList,
  addTemplate,
  updataTemplate,
  deleteTemplate,
} from "@/person/api/kpi";
import AddReport from "./components/AddReport";
import { showError } from "@/framework/utils/index";
import assign from "lodash/assign";
import { Table, Button, Input, Pagination } from "ant-design-vue";
import DictSelect from "@framework/components/DictSelect";
export default {
  name: "assessmange",
  data() {
    return {
      visible: false,
      addvisible: false,
      loading: false,
      selectedRow: {},
      tableList: [],
      searchdata: {
        name: undefined,
        target: undefined,
        sort: undefined,
      },
      columns: [
        {
          title: "序号",
          width: 70,
          customRender: (text, record, index) =>
            `${
              (this.pagination.pagenum - 1) * this.pagination.pagesize +
              (index + 1)
            }`,
        },
        {
          title: "评估指标体系名称",
          dataIndex: "name",
        },
        {
          title: "评估对象",
          dataIndex: "target",
        },
        {
          title: "分类",
          dataIndex: "sort",
          customRender: this.dictRender("person.evaluate.templatetype"),
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      pagination: {
        pagenum: 1,
        pagesize: 20,
        total: 0,
      },
      selectID: "",
    };
  },
  components: {
    APagination: Pagination,
    ATable: Table,
    AButton: Button,
    AInput: Input,
    AddReport,
    DictSelect,
  },
  created() {
    this.getTempList(this.pagination);
  },
  methods: {
    assessPreview(id) {
      this.$router.push({ name: "AssessPreview", query: { id } });
    },
    assessEdit(record) {
      this.$router.push({ name: "assessEdit", query: { id:record.id,name:record.name,target:record.target } });
    },
    ruleMange(id) {
      this.$router.push({ name: "RuleMange", query: { id } });
    },
    showModal(id) {
      if (id) {
        this.selectID = id;
        this.visible = true;
      } else {
        this.selectID = undefined;
        this.addvisible = true;
      }
    },
    //添加模板
    async add() {
      try{
      let value = await this.$refs.EditTemplate.getFormValue();
      addTemplate({
        ...value,
      })
        .then((res) => {
          this.addvisible = false;
          this.$message.success("编辑成功！");
         this.getTempList(this.pagination);

        })
        .catch((err) => {
          showError(err);
        });
      }catch (error) {
        showError(error);
      }
    },
    //更改模板
    async edit() {
      try{
      let value = await this.$refs.EditTemplate.getFormValue();
      updataTemplate({
        id: this.selectID,
        ...value,
      })
        .then((res) => {
          this.visible = false;
          this.$message.success("编辑成功！");
          this.getTempList(this.pagination);

        })
        .catch((error) => {
          showError(error);
        });
      }catch(error) {
        showError(error);
      }
    },
    handleCancel(e) {
      this.visible = false;
    },
    dictRender(key) {
      return (text, row, index) => {
        let v = this.$store.getters.dictKey(key, text);
        text = (v && v.text) || "";
        return <span title={text}>{text}</span>;
      };
    },
    customRow(row) {
      /* 点击行后获取一条数据 */
      return {
        on: {
          click: () => {
            this.selectedRow = row;
          },
        },
      };
    },
    showSizeChange(pagenum, pagesize) {
      this.getTempList({ pagenum: 1, pagesize });
    },
    pageChange(pagenum, pagesize) {
      this.getTempList({ pagenum, pagesize });
    },
    getTempList({ pagenum, pagesize } = {}) {
      /* 获取数据 */
      this.loading = true;
      let data = {
        needtotal: true,
        pagenum,
        pagesize,
        ...this.searchdata,
      };
      queryList(data)
        .then((res) => {
          this.tableList = res.result.rows;
          assign(this.pagination, res.result);
        })
        .catch((error) => {
          showError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    delRows() {
      /* 删除 */
      let id = this.selectedRow.id;
      if (id) {
        deleteTemplate(id)
          .then((res) => {
            this.$notification.success({
              message: "提示",
              description: "删除成功",
              duration: 3,
            });
            this.getTempList(this.pagination);
          })
          .catch((erroe) => {
            showError(error);
          });
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择要删除的模板!",
          duration: 3,
        });
      }
    },
    search() {
      /* 搜索 */
      this.pagination.pagenum = 1;
      this.getTempList(this.pagination);
    },
    reset() {
      /* 重置 */
      this.pagination.pagenum = 1;
      let resetdata = {
        name: undefined,
        target: undefined,
        sort: undefined,
      };
      this.searchdata = resetdata;
      this.getTempList(this.pagination);
    },
  },
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
    .header {
      display: flex;
      padding: @content-padding-v @content-padding-h;
      margin-top: 10px;
      .left,
      .right {
        .btns {
          margin-left: 10px;
          border-color: @primary-color;
          color: @primary-color;
          background-color: @white;
          border-color: @primary-color;
          &:hover {
            color: lighten(@primary-color, 20%);
            border-color: lighten(@primary-color, 20%);
          }
          &:first-child {
            margin-left: 0px;
          }
        }
      }
      .right {
        flex: 1;
        .queryitem {
          margin-left: 15px;
        }
      }
    }
    .main {
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
      /deep/ table {
        tr {
          &.selected {
            background: @primary-2;
          }
          /deep/ td {
            padding: @padding-xs;
          }
        }
      }
      .operation-a {
        margin-right: 30px;
      }
    }
    .footer {
      padding: @content-padding-v @content-padding-h;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>