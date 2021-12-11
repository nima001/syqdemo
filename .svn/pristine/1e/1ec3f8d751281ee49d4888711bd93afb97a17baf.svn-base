<template>
  <a-layout class="docsearch">
    <div class="panel">
      <div class="toolbar">
        <a-form class="ant-advanced-search-form" :form="form">
          <a-row>
            <a-col class="colcss">
              <a-button @click="onreset">重置</a-button>
              <a-button type="primary" @click="onSearch" style="margin-left:10px;">查询</a-button>
            </a-col>
          </a-row>
          <div class="box">
            <ul class="in-box">
              <li class="li-content">
                <div>
                  <span class="name">发文文号/文件编号:</span>
                  <a-input-group compact class="pzwh">
                    <a-input type="text" style="width: 30%;" v-model="searchCondition.zihao" />
                    <a-input
                      addonBefore="〔"
                      addonAfter="〕"
                      type="text"
                      style="width: 40%;"
                      v-model="searchCondition.year"
                    />
                    <a-input
                      addonAfter="号"
                      type="text"
                      style="width: 30%;"
                      v-model="searchCondition.ordinal"
                    />
                  </a-input-group>
                </div>
              </li>
              <li class="li-content">
                <div>
                  <span class="name">文件来源:</span>
                  <a-select
                    placeholder="请选择文件来源"
                    v-model="searchCondition.level"
                    @change="levelChange"
                  >
                    <a-select-option
                      v-for="(item,index) in levelList"
                      :key="index"
                      :value="item.value"
                    >{{item.text}}</a-select-option>
                  </a-select>
                </div>
              </li>
              <li class="li-content">
                <div>
                  <span class="name">文件类型:</span>
                  <a-select
                    v-model="searchCondition.type"
                    placeholder="请选择文件类型"
                    @change="typeChange"
                  >
                    <a-select-option
                      v-for="(item,index) in typeList"
                      :key="index"
                      :value="item.value"
                    >{{item.text}}</a-select-option>
                  </a-select>
                </div>
              </li>
              <li class="li-content">
                <div>
                  <span class="name">文件标题:</span>
                  <a-input placeholder="请输入文件标题" v-model="searchCondition.searchkey" />
                </div>
              </li>
              <li class="li-content">
                <div>
                  <span class="name">发文时间:</span>
                  <a-input-group compact>
                    <a-date-picker
                      placeholder="开始时间"
                      v-model="startValue"
                      :disabled-date="disabledStartDate"
                      style="width:50%"
                    />
                    <a-date-picker
                      placeholder="结束时间"
                      v-model="endValue"
                      :disabled-date="disabledEndDate"
                      style="width:50%"
                    />
                  </a-input-group>
                </div>
              </li>
              <li class="li-content">
                <div>
                  <span class="name">关键字:</span>
                  <a-input placeholder="请输入关键字" v-model="searchCondition.keywords" />
                </div>
              </li>
              <li class="li-content">
                <div>
                  <span class="name">相关单位:</span>
                  <a-input
                    allowClear
                    @change="onOrgNameChange"
                    @click="orgVisible=true"
                    placeholder="请选择相关单位"
                    v-model="searchCondition._orgname"
                  />
                </div>
              </li>
              <li class="li-content" v-if="searchCondition.type === 1">
                <div>
                  <span class="name">主题词:</span>
                  <dict-select
                    dict="person.orgrecordsubject"
                    :multiple="true"
                    placeholder="请选择主题词"
                    v-model="searchCondition.subjects"
                    :show-group="false"
                  />
                </div>
              </li>
            </ul>
          </div>
        </a-form>
      </div>
      <div class="tablecount">
        <a-table
          :loading="loading"
          :columns="columns"
          :dataSource="pagination.rows"
          :pagination="false"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:radio}"
        >
          <span slot="action" class="operation" slot-scope="text, record">
            <a @click="searchModal(record)">文件详情</a>
            <a @click="downDoc(record)">下载</a>
            <a-popconfirm
              title="确认删除此文件？"
              ok-text="是"
              cancel-text="否"
              @confirm="confirm(record)"
              @cancel="cancel"
            >
              <a
                v-if="(record.type == 2||record.type == 3||record.type == 5) && hasPermit('/person/doc/docsearch/delete')"
              >删除</a>
            </a-popconfirm>
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
    <search-doc
      v-if="hackReset"
      style="display:none"
      :searchDetail="searchDetail"
      :searchvisible="searchvisible"
      @closeModal="searchCancel"
    />
    <!--组织选择-->
    <a-modal
      title="选择相关单位"
      :width="500"
      :bodyStyle="{height:'600px',padding:'0'}"
      v-model="orgVisible"
      :footer="null"
    >
      <org-user-select mode="org" :root-selectable="true" @finish="selectOrg" />
    </a-modal>
  </a-layout>
</template>
<script>
import moment from "moment";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import SearchDoc from "./components/SearchDoc";
import {
  Layout,
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Table,
  DatePicker,
  Pagination,
  Popconfirm,
  Icon,
  Modal,
} from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import { doclistSearch, getdoc, recordDelete } from "@/person/api/document";
import { download } from "@/framework/api/file";
import { showError } from "@/framework/utils/index";
export default {
  name: "DocSearch",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AInputGroup: Input.Group,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    ADatePicker: DatePicker,
    APagination: Pagination,
    APopconfirm: Popconfirm,
    AIcon: Icon,
    AModal: Modal,
    OrgUserSelect,
    DictSelect,
    SearchDoc,
  },
  data() {
    return {
      typeList: [],
      levelList: [],
      dateFormat: "YYYY-MM-DD",
      expand: false,
      node: {
        id: null,
        name: null,
      },
      form: this.$form.createForm(this, { name: "advanced_search" }),
      searchCondition: {
        zihao: null,
        year: null,
        ordinal: null,
        starttime: null,
        endtime: null,
        level: undefined,
        fileuri: null,
        subjects: undefined,
        keywords: null,
        searchkey: null,
        orgid: undefined,
        _orgname: undefined,
        statusIn: [1],
      },
      startValue: null,
      endValue: null,
      columns: [
        {
          title: "发文文号/文件编号",
          dataIndex: "num",
          key: "num",
        },
        {
          title: "文件标题",
          dataIndex: "title",
          key: "title",
          align: "left",
          width: "30%",
          scopedSlots: { customRender: "filetitle" },
        },
        // {
        //   title: "主题词",
        //   dataIndex: "subjects",
        //   customRender: this.subjectText()
        // },
        {
          title: "发文时间",
          dataIndex: "dispatchdate",
          key: "dispatchdate",
          align: "left",
        },
        {
          title: "文件类型",
          dataIndex: "type",
          key: "type",
          customRender: function (text) {
            if (text == "1") {
              return "台账文件";
            } else if (text == "2") {
              return "综合文件";
            } else if (text == "3") {
              return "法律法规";
            } else if (text == "4") {
              return "编外文件";
            } else if (text == "5") {
              return "其他文件";
            } else if (text == null) {
              return "暂未分类";
            }
          },
          align: "left",
        },
        {
          title: "操作",
          width: "20%",
          scopedSlots: { customRender: "action" },
        },
      ],
      datalist: [],
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,
      radio: "checkbox",
      pagination: {
        rows: null,
        pagesize: 20,
        pagenum: 1,
        total: 0,
      },
      orgVisible: false,
      searchvisible: false,
      searchDetail: {},
      fileuri: "",
      hackReset: true,
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
    // subjectList() {
    //   return this.$store.getters.dict("person.orgrecordsubject");
    // }
  },
  created() {
    this.refresh();
    this.dictList();
  },
  watch: {
    startValue(val) {
      this.searchCondition.starttime = val;
    },
    endValue(val) {
      this.searchCondition.endtime = val;
    },
  },
  methods: {
    dictList() {
      this.levelList = this.$store.getters.dict("library.doclevel");
      this.typeList = this.$store.getters.dict("library.doctype");
    },
    //获取文件列表
    refresh() {
      let { pagenum, pagesize } = this.pagination;
      this.loadData(pagenum, pagesize);
    },
    // subjectText() {
    //   return (subjects, row, index) => {
    //     let text = "";
    //     if (
    //       this.subjectList &&
    //       this.subjectList.length &&
    //       subjects &&
    //       subjects.length
    //     ) {
    //       this.subjectList.forEach(item => {
    //         if (subjects.indexOf(item.value) >= 0) {
    //           text += `、${item.text}`;
    //         }
    //       });
    //       if (text) {
    //         text = text.substr(1);
    //       }
    //     }
    //     return text;
    //   };
    // },
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
    //页数切换
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
        pagesize,
      };
      this.loading = true;
      doclistSearch(params)
        .then((resp) => {
          this.loading = false;
          this.pagination = resp.result;
        })
        .catch((err) => {
          showError(err);
        });
    },
    //时间
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    levelChange(value) {
      this.levelvalue = value;
    },
    typeChange(value) {
      this.typevalue = value;
    },
    searchModal(record) {
      getdoc(record.id)
        .then((res) => {
          this.searchDetail.fileuri = record.fileuri ? record.fileuri : "";
          this.searchDetail = res.result;
          this.searchDetail.dispatchdate = moment(record.dispatchdate);
          this.searchvisible = true;
        })
        .catch((error) => {
          showError(error);
        });
    },
    editCancel() {
      this.editvisible = false;
    },
    searchCancel() {
      this.searchvisible = false;
      this.rebuileComponents();
      this.refresh();
    },
    //带参查询
    onSearch() {
      this.loadData(1, this.pagination.pagesize);
    },
    onreset() {
      this.searchCondition = { input: {} };
      this.startValue = null;
      this.endValue = null;
      this.loadData(1, this.pagination.pagesize);
    },
    rebuileComponents() {
      // 销毁子标签
      this.hackReset = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    handleCancel(e) {},
    //文件下载
    downDoc(record) {
      if (record.fileuri) {
        download(record.fileuri);
      } else {
        this.$notification.warning({
          message: "提示",
          description: "暂无可下载内容!",
          duration: 3,
        });
      }
    },
    //文件删除
    confirm(record) {
      recordDelete(record.id)
        .then((res) => {
          this.$message.success("删除成功");
          this.refresh();
        })
        .catch((error) => {
          showError(error);
        });
    },
    cancel(e) {},
    onOrgNameChange() {
      if (!this.searchCondition._orgname) {
        this.searchCondition.orgid = undefined;
      }
    },
    //确定选择的机构
    selectOrg(type, list) {
      this.orgVisible = false;
      if (type == "ok" && list.length) {
        let org = list[0];
        this.searchCondition.orgid = org._id;
        this.searchCondition._orgname = org.name;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.docsearch {
  height: 100%;
  padding: @layout-space-base;
  .panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 10px;
    background-color: #fff;
    .toolbar {
      padding: @content-padding-v @content-padding-h;
      width: 100%;
      margin: 0 auto;
      .ant-advanced-search-form {
        .colcss {
          float: right;
        }
        .box {
          width: 100%;
          .in-box {
            overflow: hidden;
            // margin: 5px;
            .li-content {
              float: left;
              padding: 8px 10px;
            }
            .name {
              line-height: 32px;
              padding-right: 5px;
              // vertical-align: initial;
            }
            .ant-input-group.ant-input-group-compact {
              display: inline-block;
              vertical-align: super;
            }
            /deep/ .ant-input-group {
              top: 0.8px;
            }
            /deep/.ant-select-selection--multiple {
              padding-bottom: 0px;
            }
            @media screen and(max-width:1410px) {
              .li-content {
                width: 33%;
              }
            }
            @media screen and (min-width: 1410px) and(max-width:1750px) {
              .li-content {
                width: 25%;
              }
            }
            @media screen and (min-width: 1750px) {
              .li-content {
                width: 20%;
              }
            }
          }
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
}
</style>