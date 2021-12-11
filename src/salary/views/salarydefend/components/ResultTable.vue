<template>
  <div class="resultTable">
    <div class="head">
      <h3>查询结果</h3>
      <div class="opIcon">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>导出</span>
          </template>
          <span class="export" @click="openModel">
            <a-icon type="upload" />
          </span>
        </a-tooltip>
      </div>
    </div>
    <a-table
      :pagination="false"
      :columns="herders"
      :dataSource="dataSource"
      size="middle"
      rowKey="_id"
    ></a-table>
    <a-pagination
      showSizeChanger
      @showSizeChange="onShowSizeChange"
      @change="onPageChange"
      :defaultCurrent="1"
      :total="tableData.total"
    />
    <a-modal
      title="导出"
      :bodyStyle="{padding:'24px'}"
      :visible="visible"
      @cancel="handleCancel"
      @ok="exportHandler"
    >
      <div v-if="loading" :style="{textAlign:'center'}">
        <a-spin size="large" tip="Loading..." />
      </div>
      <div v-else>
        <a-input placeholder="请输入文件名" @change="changeHandler" />
        <p class="errorMsg" v-if="!title && errorFlag">请填写文件名</p>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  formExportExcel,
  exportExcel
} from "@/person/api/integratedquery";
import { uiConfigsCookies } from "@/framework/utils/auth";
import {showError} from '@/framework/utils/index';
import {taskProgress} from '@/framework/api/asynctask';
import {Tooltip,Icon,Table,Pagination,Modal,Spin,Input} from 'ant-design-vue';
import cloneDeep from "lodash/cloneDeep";
export default {
  components:{
    ATooltip:Tooltip,
    AIcon:Icon,
    APagination:Pagination,
    AModal:Modal,
    ASpin:Spin,
    AInput:Input
  },
  data() {
    return {
      visible: false,
      errorFlag: false,
      title: "",
      loading: false,
      percent: 100
    };
  },
  props: {
    tableData: {
      type: Object,
      required: true
    },
    selected: {
      type: Array,
      required: true
    },
    searchObj: {
      type: String,
      required: true
    },
    node: {
      type: Object,
      required: true
    },
    userType: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    }
  },
  computed: {
    herders() {
      let arr = [];
      if (this.tableData.header.length > 0) {
        for (let i = 0; i < this.tableData.header.length; i++) {
          let item = this.tableData.header[i];
          arr.push({ title: item.showname, dataIndex: item.column });
        }
      }
      return arr;
    },
    dataSource() {
      let arr = [];
      if (this.tableData.rows && this.tableData.rows.length > 0) {
        arr = this.tableData.rows;
      }
      return arr;
    }
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.$emit("changeSize", pageSize);
    },
    onPageChange(page) {
      this.$emit("changeNum", page);
    },
    handleCancel() {
      this.visible = false;
      this.errorFlag = false;
    },
    openModel() {
      this.visible = true;
    },
    changeHandler(e) {
      this.title = e.target.value;
    },
    exportHandler() {
      this.errorFlag = true;
      if (!this.title) {
        return false;
      }
      let result = cloneDeep(this.$store.getters.treeData);
      let data = {
        fields: this.selected,
        filter: result,
        model: this.searchObj,
        needtotal: true,
        node: this.node,
        usertype: this.userType,
        pagenum: this.pagination.pagenum,
        pagesize: this.pagination.pagesize,
        title: this.title
      };
      this.loading = true;
      exportExcel(data)
        .then(res => {
          let taskid = res.result
          this.loop(taskid);
        })
        .catch(error => {
          showError(error);
        });
    },
    // 轮训获取进度
    loop(data) {
      let _that = this;
      taskProgress(data)
        .then(res => {
          let result = res.result;
          if (result.status == "FINISH") {
            this.visible = false;
            this.loading = false;
            window.open(
              uiConfigsCookies()["api.url"] +
                "/file/v1/download?uri=" +
                decodeURI(result.data),
              "_blank"
            );
          } else {
            setTimeout(() => {
              _that.loop(data);
            }, 2000);
          }
        })
        .catch(error => {
          showError(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.resultTable {
  .head {
    display: flex;
    height: 40px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
    align-items: center;
    position: relative;
    h3 {
      width: 100%;
      font-size: 15px;
      font-weight: 500;
      text-align: center;
      margin: 0;
      height: 40px;
      line-height: 40px;
    }
    .opIcon {
      width: 200px;
      height: 40px;
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;
      flex-direction: row-reverse;
      span {
        cursor: pointer;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        &:hover {
          color: #d60002;
          background: #9e9e9e2e;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
      }
    }
  }
  /deep/.ant-table-thead {
    th {
      border-right: 1px solid #e8e8e8;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.ant-pagination {
  margin-top: 20px;
  text-align: right;
}
.errorMsg {
  color: #d60002;
  margin: 10px 0px 0px;
}
</style>