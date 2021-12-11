<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <div class="select-list">
        <div class="select-left">
          <a-button class="btn" type="primary" @click="editModel">添加签章</a-button>
          <a-button class="btn" type="primary" @click="trigger">导入签章</a-button>
          <a-button class="btn" type="primary" @click="download">下载模板</a-button>
          <input
            type="file"
            ref="fileBtn"
            class="fileBtn"
            accept=".xls, .xlsx"
            id="uploadFile"
            @change="getFile($event)"
          />
          <a-input-search
            v-model="searchkey"
            placeholder="请输入要搜索的签章"
            @search="searchList"
            enterButton
          />
        </div>
      </div>
      <div class="body-main">
        <a-table
          :columns="columns"
          :dataSource="datalist"
          :pagination="pagination"
          @change="handleTableChange"
          :rowKey="row=>row.id"
        >
          <span slot="operate" slot-scope="text,record">
            <span class="operate-type" @click="editModel(record)">
              <a-icon type="edit" />编辑
            </span>
            <span class="operate-type" @click="jump(record)">
              <a-icon type="deployment-unit" />查看授权角色
            </span>
            <span class="operate-type" @click="openSort(record)">
              <a-icon type="menu-unfold" />排序
            </span>
            <a-popconfirm title="确定删除这条签章信息吗?" @confirm="del(record)" okText="确定" cancelText="取消">
              <span class="operate-type">
                <a-icon type="delete" />删除
              </span>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </a-layout-content>
    <!-- 排序 -->
    <a-modal
      title="排序"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      :destroyOnClose="true"
      width="400px"
    >
      <a-radio-group v-model="type" @change="changeType">
        <a-radio :style="radioStyle" :value="1">调到最前</a-radio>
        <a-radio :style="radioStyle" :value="2">调到最后</a-radio>
        <a-radio :style="radioStyle" :value="3">
          调到
          <a-select
            :disabled="type==3?false:true"
            placeholder="需要排到的签章"
            showSearch
            style="width: 200px;margin:0 10px;"
            optionFilterProp="children"
            :filterOption="filterOption"
            v-model="afterId"
          >
            <a-select-option
              v-for="(item,index) in stampList"
              :key="index"
              :value="item.value"
            >{{item.text}}</a-select-option>
          </a-select>后
        </a-radio>
      </a-radio-group>
    </a-modal>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "签章名称",
    dataIndex: "name",
    key: "name",
    align: "left"
  },
  {
    title: "证书名称",
    dataIndex: "certificate",
    key: "certificate",
    align: "left"
  },
  {
    title: "签章ID",
    dataIndex: "tgsealid",
    key: "tgsealid",
    align: "left"
  },
  {
    title: "签章秘钥",
    dataIndex: "signkey",
    key: "signkey",
    align: "left"
  },
  {
    title: "UKEY证书",
    dataIndex: "ukey",
    key: "ukey",
    align: "left"
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    align: "left",
    scopedSlots: { customRender: "operate" }
  }
];
import {
  stampList,
  delStamp,
  importStamp,
  downSealTemplateUrl,
  getUiboxs,
  orderStamp
} from "@/workflow/api/stamplist";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { showError } from "@/framework/utils/index";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Icon,
  Input,
  Button,
  Popconfirm,
  Table,
  Modal,
  Radio,
  Select
} from "ant-design-vue";
export default {
  name: "ModelList",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AInput: Input,
    AInputSearch: Input.Search,
    AButton: Button,
    APopconfirm: Popconfirm,
    ATable: Table,
    AIcon: Icon,
    AModal: Modal,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      columns,
      datalist: [],
      editId: null,
      pagination: {
        //流程模板列表分页
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      stampurl: null,
      searchkey: undefined,
      //排序
      visible: false,
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px"
      },
      stampList: [],
      type: undefined,
      afterId: undefined,
      id: undefined
    };
  },
  created() {
    this.getList();
  },
  methods: {
    editModel(val) {
      this.$router.push({
        name: "signatureEdit",
        query: {
          id: val.id
        }
      });
    },
    jump(val) {
      this.$router.push({
        name: "signatureRole",
        query: {
          id: val.id
        }
      });
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getList();
    },
    getList() {
      let query = {};
      query.needtotal = true;
      query.pagenum = this.pagination.current;
      query.pagesize = this.pagination.pageSize;
      query.searchkey = this.searchkey;
      stampList(query)
        .then(res => {
          this.pagination.total = res.result.total ? res.result.total : 0;
          this.pagination.current = res.result.pagenum ? res.result.pagenum : 1;
          this.datalist = res.result.rows;
        })
        .catch(err => {
          showError(err);
        });
    },
    //搜索
    searchList() {
      this.getList();
    },
    //打开排序弹框
    openSort(record) {
      this.id = record.id;
      this.type = undefined;
      this.afterId = undefined;
      getUiboxs()
        .then(res => {
          this.stampList = res.result;
          this.visible = true;
        })
        .catch(err => {
          showError(err);
        });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    changeType() {
      this.afterId = undefined;
    },
    handleOk() {
      if (this.type == 3 && !this.afterId) {
        this.$message.error("必须选择排到的位置！");
        return;
      }
      let query = {};
      query.type = this.type;
      query.id = this.id;
      if (this.type == 3) {
        query.afterId = this.afterId;
      }
      orderStamp(query)
        .then(res => {
          this.$message.success("签章排序保存成功！");
          this.visible = false;
          this.getList();
        })
        .catch(err => {
          showError(err);
        });
    },
    handleCancle() {
      this.visible = false;
    },
    //删除
    del(record) {
      delStamp(record.id)
        .then(res => {
          this.$message.success(record.name + "已成功删除！");
          this.getList();
        })
        .catch(err => {
          showError(err);
        });
    },
    //签章导入
    getFile(event) {
      let file = event.target.files[0];
      importStamp(file)
        .then(res => {
          this.stampurl = res.result;
          this.$message.success("签章导入成功！");
          document.getElementById("uploadFile").value = null;
        })
        .catch(error => {
          showError(error);
        });
    },
    trigger() {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    //下载
    download() {
      downSealTemplateUrl()
        .then(res => {
          let url =
            this.uiConfigs["api.url"] +
            "/file/v1/download" +
            "?uri=" +
            encodeURIComponent(res.result);
          let a = document.createElement("a");
          a.href = url;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  padding: 24px;
  .select-list {
    margin: 12px 0;
    overflow: hidden;
    .select-left {
      display: flex;
      max-width: 600px;
      > button {
        margin-right: 10px;
      }
    }
  }
  .body-main {
    margin: 12px 0;
    .operate-type {
      padding: 0 5px;
      i {
        // #d60002
        color: skyblue;
        border: 0;
        padding-right: 3px;
      }
    }
  }
}
.uploadBtn {
  text-align: center;
  img {
    max-width: 100%;
  }
}
.fileBtn {
  width: 0px;
  height: 0px;
  opacity: 0;
}
</style>