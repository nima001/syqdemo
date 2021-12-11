<template>
  <div class="org-record">
    <div class="tabs">
      <a
        v-for="item in typeList"
        :key="item.value"
        :class="tabIndex == item.value ? 'tab active' : 'tab'"
        @click="onTabSelect(item.value)"
      >
        <span>{{item.text}}</span>
      </a>
    </div>
    <div class="panel">
      <div class="toolbar">
        <div class="left">
          <a-select
            v-if="tabIndex == 1 && proxyList && proxyList.length"
            v-model="search.orgid"
            @change="changeOrg"
            style="width:200px"
          >
            <a-select-option :key="org._id" :value="org._id">本单位</a-select-option>
            <a-select-option
              v-for="item in proxyList"
              :key="item.orgid"
              :value="item.orgid"
              :title="item.orgname"
            >{{item.orgname}}</a-select-option>
          </a-select>
        </div>
        <div class="right">
          <ul>
            <li>
              <span class="name">发文字号</span>
              <a-input-group compact class="pzwh">
                <a-input type="text" style="width: 80px;" v-model="search.zihao" />
                <a-input
                  addonBefore="〔"
                  addonAfter="〕"
                  type="text"
                  style="width: 110px;"
                  v-model="search.year"
                />
                <a-input addonAfter="号" type="text" style="width: 90px;" v-model="search.ordinal" />
              </a-input-group>
            </li>
            <li>
              <!-- <span class="name">发文时间</span> -->
              <a-input-group compact>
                <a-date-picker placeholder="开始时间" style="width: 120px" v-model="search.starttime" />
                <a-date-picker placeholder="结束时间" style="width: 120px" v-model="search.endtime" />
              </a-input-group>
            </li>
            <li>
              <dict-select
                v-if="tabIndex==1"
                dict="person.orgrecordsubject"
                :multiple="true"
                placeholder="请选择主题词"
                style="width: 140px;"
                v-model="search.subjects"
                :show-group="false"
              />
              <a-select
                v-else
                placeholder="文件来源"
                style="width: 140px;"
                v-model="search.level"
                allowClear
              >
                <a-select-option
                  v-for="(item,index) in levelList"
                  :key="index"
                  :value="item.value"
                >{{item.text}}</a-select-option>
              </a-select>
            </li>
            <li v-if="tabIndex==4">
              <a-input style="width: 140px;" placeholder="请输入关键字" v-model="search.keywords" />
            </li>
            <li>
              <a-button class="btn" type="primary" @click="onSearch">查询</a-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="body">
        <a-table
          class="data-table"
          :columns="columns"
          :dataSource="page.rows"
          rowKey="id"
          :loading="pageLoading"
          :pagination="false"
          :rowClassName="(row) => page.selected == row.id ? 'selected': ''"
          :customRow="customRow"
        >
          <span slot="level" slot-scope="level">{{level == 1 ? '上级文件' : '本级文件'}}</span>
          <a
            slot="download"
            slot-scope="uri"
            href="javascript:;"
            :class="uri ? '': 'disabled'"
            @click="downloadFile(uri)"
          >下载</a>
        </a-table>
      </div>
      <div class="footer">
        <a-pagination
          v-if="page.rows && page.rows.length"
          showSizeChanger
          :showTotal="total => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="page.total"
          :pageSize="page.pagesize"
          v-model="page.pagenum"
          @change="onPageChange"
        />
      </div>
      <!-- 编辑弹窗 -->
      <edit-doc
        style="display:none"
        :detail="modalDetail"
        :editvisible="editvisible"
        @closeModal="editCancel"
      />
    </div>
  </div>
</template>
<script>
import EditDoc from "../../doccenter/components/EditDoc";
import {
  Input,
  Select,
  Button,
  Table,
  Pagination,
  DatePicker,
} from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import moment from "moment";
import { recordQuery, getOrgProxy } from "@/person/api/orgRecord";
import { showError } from "@/framework/utils/index";
import { docQuery, updatedoc, getdoc } from "@/person/api/document";
import { download } from "@/framework/api/file";
import request from "@/framework/utils/request";
export default {
  props: ["org"],
  components: {
    AInput: Input,
    AInputSearch: Input.Search,
    AInputGroup: Input.Group,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    ATable: Table,
    APagination: Pagination,
    ADatePicker: DatePicker,
    DictSelect,
    EditDoc,
  },
  data() {
    return {
      tabIndex: 1,
      tabColums: [
        [
          {
            title: "发文文号",
            dataIndex: "doc.num",
            width: "180px",
            customRender: (text, row) => {
              return (
                <span>
                  <span class={row.begin ? "begin" : "begin hiddren"}></span>
                  {text}
                </span>
              );
            },
          },
          {
            title: "文件标题",
            dataIndex: "doc.title",
            customRender: (text) => <span title={text}>{text}</span>,
          },
          {
            title: "主题词",
            dataIndex: "subjects",
            width: "200px",
            customRender: this.subjectText(),
          },
          { title: "发文时间", dataIndex: "doc.dispatchdate", width: "100px" },
          {
            title: "操作",
            dataIndex: "doc.fileuri",
            width: "80px",
            scopedSlots: { customRender: "download" },
          },
        ],
        [
          { title: "发文文号/文件编号", dataIndex: "num", width: "180px" },
          {
            title: "文件标题",
            dataIndex: "title",
            customRender: (text) => <span title={text}>{text}</span>,
          },
          { title: "发文时间", dataIndex: "dispatchdate", width: "100px" },
          {
            title: "文件来源",
            dataIndex: "level",
            width: "100px",
            scopedSlots: { customRender: "level" },
          },
          {
            title: "操作",
            dataIndex: "fileuri",
            width: "80px",
            scopedSlots: { customRender: "download" },
          },
        ],
        [
          { title: "发文字号", dataIndex: "num", width: "180px" },
          {
            title: "文件标题",
            dataIndex: "title",
            customRender: (text) => <span title={text}>{text}</span>,
          },
          { title: "发文时间", dataIndex: "dispatchdate", width: "100px" },
          {
            title: "关键字",
            dataIndex: "keywords",
            width: "100px",
          },
          {
            title: "文件来源",
            dataIndex: "level",
            width: "100px",
            scopedSlots: { customRender: "level" },
          },
          {
            title: "操作",
            dataIndex: "fileuri",
            width: "80px",
            scopedSlots: { customRender: "download" },
          },
        ],
      ],
      proxyList: undefined,
      search: {
        orgid: null,
        zihao: null,
        year: null,
        ordinal: null,
        starttime: null,
        endtime: null,
        subjects: undefined,
        level: undefined,
        searchkey: null,
        keywords: undefined,
      },
      columns: null,
      pageLoading: false,
      page: {
        selected: undefined,
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0,
      },
      editvisible: false,
      modalDetail: {},
      typeList: [],
      levelList: [],
    };
  },
  created() {
    this.typeDict("library.doctype");
    this.levelDict("library.doclevel");
    this.columns = this.tabColums[0];
    if (this.org) {
      this.search.orgid = this.org._id;
      let { pagenum, pagesize } = this.page;
      this.loadData(pagenum, pagesize);
      this.getProxyList(this.org._id);
    }
  },
  computed: {
    subjectList() {
      return this.$store.getters.dict("person.orgrecordsubject");
    },
  },
  watch: {
    org(org) {
      if (org) {
        this.search.orgid = org._id;
        this.loadData(1, 10);
        this.getProxyList(org._id);
      }
    },
  },
  methods: {
    typeDict(key) {
      request({
        url: `base/constant/dict?key=${encodeURIComponent(key)}`,
        method: "get",
      })
        .then((resp) => {
          this.typeList = resp.result;
        })
        .catch((error) => {});
    },
    levelDict(key) {
      request({
        url: `base/constant/dict?key=${encodeURIComponent(key)}`,
        method: "get",
      })
        .then((resp) => {
          this.levelList = resp.result;
        })
        .catch((error) => {});
    },
    subjectText() {
      return (subjects, row, index) => {
        let text = "";
        if (
          this.subjectList &&
          this.subjectList.length &&
          subjects &&
          subjects.length
        ) {
          this.subjectList.forEach((item) => {
            if (subjects.indexOf(item.value) >= 0) {
              text += `、${item.text}`;
            }
          });
          if (text) {
            text = text.substr(1);
          }
        }
        return <span title={text}>{text}</span>;
      };
    },
    onTabSelect(index) {
      if (this.tabIndex != index) {
        this.tabIndex = index;
        this.search.orgid = this.org._id;
        this.search.zihao = null;
        this.search.year = null;
        this.search.ordinal = null;
        this.search.starttime = null;
        this.search.endtime = null;
        this.search.subjects = undefined;
        this.search.level = undefined;
        this.search.searchkey = null;
        this.loadData(1, 10);
      }
    },
    changeOrg() {
      this.loadData(1, this.page.pagesize);
    },
    onSearch() {
      this.loadData(1, this.page.pagesize);
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(current, size) {
      this.loadData(1, size);
    },
    customRow(row) {
      return {
        on: {
          click: () => {
            this.$set(this.page, "selected", row.id);
          },
          dblclick: (event) => {
            // this.onRowClick(row);
          },
        },
      };
    },
    onRowClick(row) {
      if (this.tabIndex == 1) {
        let routeUrl = this.$router.resolve({
          name: "bookEdit",
          query: { id: row.id },
        });
        window.open(routeUrl.href, "_blank");
      } else {
        getdoc(row.id)
          .then((res) => {
            this.modalDetail.fileurl = row.fileurl ? row.fileurl : "";
            this.modalDetail = res.result;
            this.modalDetail.dispatchdate = moment(row.dispatchdate);
            this.editvisible = true;
          })
          .catch((err) => {
            showError(err);
          });
      }
    },
    editCancel() {
      this.editvisible = false;
    },
    downloadFile(uri) {
      if (uri) {
        download(uri);
      }
    },
    loadData(pagenum, pagesize) {
      let params = {
        ...this.search,
        needtotal: true,
        status: 1,
        pagenum,
        pagesize,
      };
      let tab = this.tabIndex;
      this.pageLoading = true;
      if (tab == 1) {
        recordQuery(params)
          .then((resp) => {
            if (this.tabIndex == tab) {
              this.pageLoading = false;
              this.columns = this.tabColums[0];
              this.page = resp.result;
            }
          })
          .catch((err) => {
            showError(err);
          });
      } else if (tab == 2 || tab == 4 || tab == 5) {
        params.type = this.tabIndex;
        docQuery(params)
          .then((resp) => {
            if (this.tabIndex == tab) {
              this.pageLoading = false;
              if (this.tabIndex == 4) {
                this.columns = this.tabColums[2];
              } else {
                this.columns = this.tabColums[1];
              }
              this.page = resp.result;
            }
          })
          .catch((err) => {
            showError(err);
          });
      } else if (tab == 3) {
        delete this.search.orgid;
        let tabparams = {
          ...this.search,
          needtotal: true,
          status: 1,
          pagenum,
          pagesize,
        };
        tabparams.type = this.tabIndex;
        docQuery(tabparams)
          .then((resp) => {
            if (this.tabIndex == tab) {
              this.pageLoading = false;
              this.columns = this.tabColums[1];
              this.page = resp.result;
            }
          })
          .catch((err) => {
            showError(err);
          });
      }
    },
    getProxyList(orgid) {
      getOrgProxy(orgid)
        .then(({ result }) => {
          this.proxyList = result;
        })
        .catch((err) => {
          showError(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.org-record {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .tabs {
    padding: @content-padding-v @content-padding-h;
    background-image: linear-gradient(to right, #fcfcfc, @primary-1);
    .tab {
      display: inline-block;
      padding: 0 14px;
      line-height: 26px;
      border-radius: 3px;
      margin-right: 4px;
      color: @text-color;
      &:hover {
        color: @primary-color;
        background-color: @primary-1;
      }
      &.active {
        color: @primary-color;
        background-color: @primary-2;
      }
    }
  }
  & > .panel {
    flex: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    & > .toolbar {
      padding: @content-padding-v @content-padding-h;
      margin: 0;
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
        .ant-btn {
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

    .body {
      flex-shrink: 1;
      min-height: 0;
      overflow: auto;
      padding: 0 @content-padding-h;
      .begin {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: @accent-color;
        border-radius: 4px;
        margin-right: 4px;
        margin-bottom: 2px;
        &.hiddren {
          visibility: hidden;
        }
      }

      /deep/table {
        table-layout: fixed;
        td,
        th {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        tr.selected {
          background: @primary-2;
        }
        .disabled {
          color: @disabled-color;
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
  }
}
</style>