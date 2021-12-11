<template>
  <a-layout class="docstay">
    <div class="panel">
      <div class="toolbar">
        <div class="left">
          <a-button icon="upload" type="primary" @click="showModal">上传</a-button>
          <a-button icon="delete" type="primary" @click="deletedoc" style="margin-left:8px;">删除</a-button>
        </div>
        <div class="right">
          <ul>
            <li>
              <a-select style="width:100px" v-model="defaultValue" @change="changeState">
                <a-select-option value="全部" key="0,2">全部</a-select-option>
                <a-select-option value="待入库" key="0">待入库</a-select-option>
                <a-select-option value="无需入库" key="2">无需入库</a-select-option>
              </a-select>
            </li>
            <li>
              <!-- <span class="name">发文字号</span> -->
              <a-input-group compact class="pzwh">
                <a-input type="text" style="width: 80px;" v-model="searchCondition.zihao" />
                <a-input
                  addonBefore="〔"
                  addonAfter="〕"
                  type="text"
                  style="width: 100px;"
                  v-model="searchCondition.year"
                />
                <a-input
                  addonAfter="号"
                  type="text"
                  style="width: 80px;"
                  v-model="searchCondition.ordinal"
                />
              </a-input-group>
            </li>
            <li>
              <a-input-group compact>
                <a-date-picker
                  placeholder="发文开始时间"
                  style="width: 130px"
                  v-model="startValue"
                  :disabled-date="disabledStartDate"
                />
                <a-date-picker
                  placeholder="发文结束时间"
                  style="width: 130px"
                  v-model="endValue"
                  :disabled-date="disabledEndDate"
                />
              </a-input-group>
            </li>
            <li>
              <a-input
                placeholder="请输入文件标题"
                style="width: 140px"
                v-model="searchCondition.searchkey"
              />
            </li>
            <li>
              <a-button type="primary" @click="onSearch">搜索</a-button>
              <a-button @click="onreset" style="margin-left:8px;">重置</a-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="tablecount">
        <a-table
          :loading="loading"
          :columns="columns"
          :dataSource="pagination.rows"
          :pagination="false"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:radio,columnWidth:columnWidth}"
        >
          <span slot="action" class="operation" slot-scope="text, record">
            <a @click="editModal(record)" v-if="record.status == 0">编辑</a>
            <a @click="reductionModal(record)" v-if="record.status == 2">还原</a>
            <a @click="deleteModal(record)" v-if="record.status == 0">删除</a>
            <a @click="downDoc(record)">下载</a>
          </span>
          <template slot="filetitle" slot-scope="title">
            <p class="pcss" :title="title">{{title}}</p>
          </template>
        </a-table>
      </div>
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
    <upload-doc
      style="display:none"
      @closeModal="cancelModel"
      @getDocList="refresh"
      v-if="hackReset"
      :visible="visible"
    />
    <edit-doc
      v-if="hackReset"
      style="display:none"
      :detail="modalDetail"
      @getDocList="refresh"
      :editvisible="editvisible"
      @closeModal="editCancel"
    />
  </a-layout>
</template>
<script>
import moment from "moment";
import UploadDoc from "./components/UploadDoc";
import EditDoc from "./components/EditDoc";
import {
  Layout,
  Pagination,
  Select,
  Table,
  Button,
  Input,
  DatePicker
} from "ant-design-vue";
import { doclistSearch, editdoc, getdoc } from "@/person/api/document";
import { download } from "@/framework/api/file";
import { showError } from "@/framework/utils/index";
export default {
  name: "DocStay",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    APagination: Pagination,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    AButton: Button,
    AInput: Input,
    AInputGroup: Input.Group,
    ADatePicker: DatePicker,
    UploadDoc,
    EditDoc
  },
  data() {
    return {
      searchCondition: {
        zihao: null,
        year: null,
        ordinal: null,
        starttime: null,
        endtime: null,
        searchkey: null,
        statusIn: [0, 2]
      },
      startValue: null,
      endValue: null,
      columns: [
        {
          title: "发文字号",
          dataIndex: "num",
          width: "15%",
          key: "num"
        },
        {
          title: "文件标题",
          dataIndex: "title",
          key: "title",
          align: "left",
          width: "25%",
          scopedSlots: { customRender: "filetitle" }
        },
        {
          title: "发文时间",
          dataIndex: "dispatchdate",
          key: "dispatchdate",
          align: "left",
          width: "10%"
        },
        {
          title: "数据源",
          dataIndex: "type",
          key: "type",
          align: "left",
          width: "10%",
          customRender: function(text) {
            return "OA系统";
          }
        },
        {
          title: "文件来源",
          dataIndex: "level",
          key: "level",
          width: "10%",
          customRender: function(text) {
            if (text == "1") {
              return "上级文件";
            } else if (text == "2") {
              return "本级文件";
            }else if (!text) {
              return "暂无来源";
            }
          },
          align: "left"
        },
        {
          title: "文件状态",
          dataIndex: "status",
          key: "status",
          width: "10%",
          customRender: function(status) {
            if (status == 0) {
              return "待入库";
            } else if (status == 2) {
              return "无需入库";
            }
          },
          align: "left"
        },
        {
          title: "操作",
          width: "20%",
          scopedSlots: { customRender: "action" }
        }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,
      radio: "checkbox",
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0
      },
      visible: false,
      editvisible: false,
      modalDetail: {},
      fileuri: "",
      columnWidth: "40px",
      hackReset: true,
      defaultValue: "全部"
    };
  },
  created() {
    this.refresh();
  },
  watch: {
    startValue(val) {
      this.searchCondition.starttime = val;
    },
    endValue(val) {
      this.searchCondition.endtime = val;
    }
  },
  methods: {
    //获取文件列表
    refresh() {
      let { pagenum, pagesize } = this.pagination;
      this.loadData(pagenum, pagesize);
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(current, size) {
      this.loadData(1, size);
    },
    loadData(pagenum, pagesize) {
      let params = {
        ...this.searchCondition,
        needtotal: true,
        pagenum,
        pagesize
      };
      this.loading = true;
      doclistSearch(params)
        .then(resp => {
          this.loading = false;
          this.pagination = resp.result;
        })
        .catch(err => {
          this.loading = false;
          showError(err);
        });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    rebuileComponents() {
      // 销毁子标签
      this.hackReset = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    showModal() {
      this.rebuileComponents();
      this.visible = true;
    },
    editModal(record) {
      getdoc(record.id)
        .then(res => {
          this.modalDetail.fileuri = record.fileuri ? record.fileuri : "";
          this.modalDetail = res.result;
          this.modalDetail.dispatchdate = moment(record.dispatchdate);
          this.editvisible = true;
        })
        .catch(error => {
          showError(error);
        });
    },
    editCancel() {
      this.editvisible = false;
      this.rebuileComponents();
    },
    cancelModel() {
      this.visible = false;
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    //带参查询
    onSearch() {
      this.loadData(1, this.pagination.pagesize);
    },
    handleCancel(e) {
      this.visible = false;
    },
    //修改状态（删除）
    deleteModal(record) {
      record.status = 2;
      let ids = [record.id];
      editdoc(ids, record.status)
        .then(res => {
          this.$notification.success({
            message: "提示",
            description: "删除成功!",
            duration: 3
          });
          this.getDocList();
        })
        .catch(error => {
          showError(error);
        });
    },
    changeState(val, key) {
      let valkey = key.data.key.split(",");
      this.searchCondition.statusIn = valkey;
    },
    //还原
    reductionModal(record) {
      record.status = 0;
      let ids = [record.id];
      editdoc(ids, record.status)
        .then(res => {
          this.$notification.success({
            message: "提示",
            description: "还原成功!",
            duration: 3
          });
          this.getDocList();
        })
        .catch(error => {
          showError(error);
        });
    },
    //文件下载
    downDoc(record) {
      if (record.fileuri) {
        download(record.fileuri);
      } else {
        this.$notification.warning({
          message: "提示",
          description: "暂无可下载内容!",
          duration: 3
        });
      }
    },
    //删除数据
    deletedoc() {
      let selected = this.selectedRowKeys.length == 0 ? false : true;
      if (selected) {
        let status = 2;
        let ids = [this.selectedRowKeys];
        editdoc(ids, status)
          .then(res => {
            this.$notification.success({
              message: "提示",
              description: "删除成功!",
              duration: 3
            });
            this.getDocList();
          })
          .catch(error => {
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
    onreset() {
      this.searchCondition = { input: {} };
      this.searchCondition.statusIn = [0, 2];
      this.defaultValue = "全部";
      this.startValue = null;
      this.endValue = null;
      this.loadData(1, this.pagination.pagesize);
    }
  }
};
</script>
<style lang="less" scoped>
.docstay {
  height: 100%;
  padding: @layout-space-base;
  .panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: white;
    padding-top: @layout-space-base;
    .toolbar {
      padding: @content-padding-v @content-padding-h;
      width: 100%;
      height: auto;
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
        .ant-input,
        .ant-btn,
        .ant-input-affix-wrapper {
          display: inline-block;
          vertical-align: middle;
        }
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
    .footer {
      padding: @content-padding-v @content-padding-h;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
    .tablecount {
      padding: 0 @content-padding-h;
      flex-shrink: 1;
      min-height: 0;
      overflow-y: auto;
      .operation {
        a {
          margin-right: 20px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .pcss {
        width: 400px;
        overflow: hidden;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
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
  /deep/.ant-select-selection__placeholder,
  .ant-select-search__field__placeholder {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>