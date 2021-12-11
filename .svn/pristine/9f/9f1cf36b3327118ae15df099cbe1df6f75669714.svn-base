<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <div class="select-list">
        <div class="select-left">
          <a-button type="primary" @click="addModel">新建流程模板</a-button>
          <a-button type="primary" @click="go">模板组管理</a-button>
          <a-input-search
            v-model="searchkey"
            placeholder="请输入要搜索的流程模板"
            @search="searchList"
            enterButton
          />
        </div>
      </div>
      <TaskProgress :taskid="taskid" :defaultInfo="taskInfo" v-if="taskid" @finish="onProgressFinish"/>
      <div class="body-main">
        <a-table
          :columns="columns"
          :dataSource="datalist"
          :pagination="pagination"
          @change="handleTableChange"
          :rowKey="row=>row.id"
        >
          <span slot="operate" slot-scope="text,record">
            <span class="operate-type" @click="editModel(record.id)">
              <a-icon type="edit" />基本属性
            </span>
            <span class="operate-type" @click="editExtendModel(record.id)">
              <a-icon type="edit" />拓展属性
            </span>
            <span class="operate-type" @click="jump(record)">
              <a-icon type="deployment-unit" />设计
            </span>
            <span class="operate-type" @click="publish(record)">
              <a-icon type="flag" />发布
            </span>
            <span class="operate-type" @click="importConf(record)">
              <a-icon type="import" />导入
            </span>
            <input
            type="file"
            ref="fileBtn"
            class="fileBtn"
            accept=".txt"
            id="uploadFile"
            @change="importModel($event)"
            />
            <span class="operate-type" @click="exportModel(record)">
              <a-icon type="export" />导出
            </span>
            <a-popconfirm title="确定删除这条流程实例吗?" @confirm="del(record)" okText="确定" cancelText="取消">
              <span class="operate-type">
                <a-icon type="delete" />删除
              </span>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
      <!-- 消息模板弹框/基本属性弹框 -->
      <a-modal
        :title="type?'新建流程模板':'基本信息'"
        :visible="visible"
        class="message-modal"
        :footer="null"
        :destroyOnClose="true"
        @cancel="visible=false"
        width="600px"
        :bodyStyle="{
        'padding':'0',
        'height':'450px',
        'overflow':'auto'
      }"
      >
        <base-attributes :type="type" :nowid="nowid" @submit="handleOk"></base-attributes>
      </a-modal>

      <!-- 拓展属性弹框 -->
      <a-modal
        title="拓展属性"
        :visible="extendvisible"
        class="message-modal"
        :footer="null"
        :destroyOnClose="true"
        @cancel="handleExtendCancel"
        width="800px"
        :bodyStyle="{
        'padding':'0',
        'height':'600px',
        'overflow':'auto'
      }"
      >
        <expand-attributes :nowid="nowid" @submit="handleExtendOk"></expand-attributes>
      </a-modal>
      <!-- 有删除节点弹框 -->
      <a-modal
        title="发布提醒"
        :visible="visiblePublish"
        width="550px"
        :footer="null"
        class="publish-modal"
        @cancel="visiblePublish=false"
        :bodyStyle="bodyStyle"
      >
        <div class="publish-wrap">
          <h3>发布成功后，系统会自动把当前运行中的流程迁移至新版，是否立即发布？</h3>
          <p>
            <a-icon type="info-circle" />检测到以下节点在新版本中已被删除，请先指定到新节点!
          </p>
          <div class="publish-nodeslist">
            <a-row :gutter="20">
              <a-col :span="8" class="publish-title">原节点：</a-col>
              <a-col :span="8" class="publish-title">中转节点：</a-col>
              <a-col :span="8" class="publish-title">新节点：</a-col>
            </a-row>
            <a-row :gutter="20" v-for="(item,index) in delNodeLists" :key="index">
              <a-col :span="8" class="publish-nodename">{{item.name}}</a-col>
              <a-col :span="8">
                <a-select
                  v-model="processTransfers[index].transfresourceid"
                  placeholder="--请选择中转节点--"
                  style="width:100%"
                >
                  <a-select-option
                    v-for="item in item.transfernodes"
                    :key="item.value"
                    :label="item.text"
                  >{{item.text}}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="8">
                <a-select
                  v-model="processTransfers[index].pointresourceid"
                  placeholder="--请选择新节点--"
                  style="width:100%"
                >
                  <a-select-option
                    v-for="item in item.pointnodes"
                    :key="item.value"
                    :label="item.text"
                  >{{item.text}}</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="publish-btngroup">
          <a-button @click="visiblePublish=false">暂不发布</a-button>
          <a-button @click="publishOk">立即发布</a-button>
        </div>
      </a-modal>
      <!-- 无删除节点弹框 -->
      <a-modal
        title="发布提醒"
        :visible="nodelnodesvisible"
        width="500px"
        :footer="null"
        class="publish-modal"
        @cancel="nodelnodesvisible=false"
        :bodyStyle="bodyStyle"
      >
        <div class="publish-wrap">
          <h3>发布成功后，系统会自动把当前运行中的流程迁移至新版，是否立即发布？</h3>
        </div>
        <div class="publish-btngroup">
          <a-button @click="nodelnodesvisible=false">暂不发布</a-button>
          <a-button @click="publishOk">立即发布</a-button>
        </div>
      </a-modal>
      <a-modal v-model="importVisible" title="导入流程" ok-text="确认" cancel-text="取消" @ok="trigger">
        <p>{{importContent}}</p>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script>
const columns = [
  {
    dataIndex: "num",
    key: "num",
    align: "left"
  },
  {
    title: "流程模板名称",
    dataIndex: "name",
    key: "name",
    align: "left"
  },
  {
    title: "设计版本号",
    dataIndex: "designversion",
    key: "designversion",
    align: "left"
  },
  {
    title: "发布版本号",
    dataIndex: "deployversion",
    key: "deployversion",
    align: "left"
  },
  {
    title: "发布时间",
    dataIndex: "publishtime",
    key: "publishtime",
    align: "left"
  },
  {
    title: "发布用户",
    dataIndex: "publishusername",
    key: "publishusername",
    align: "left"
  },
  {
    title: "创建用户",
    dataIndex: "createusername",
    key: "createusername",
    align: "left"
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    align: "center",
    scopedSlots: { customRender: "operate" }
  }
];
import BaseAttributes from "../processModel/components/BaseAttributes";
import ExpandAttributes from "../processModel/components/ExpandAttributes";
import {
  getModelinstanceList,
  delModelinstance,
  getDelprocessnode,
  deploymentModelinstance,
  exportModelinstance,
  importModelInstance,
} from "@/workflow/api/modellist";
import { loopTaskResult } from "@/framework/api/asynctask";
import { showError } from "@/framework/utils/index";
import TaskProgress from "@/framework/components/TaskProgress";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Table,
  Input,
  Button,
  Modal,
  Select,
  Form,
  Icon,
  Popconfirm,
  Switch,
  Checkbox,
  Row,
  Col,
  Tooltip
} from "ant-design-vue";
import { uiConfigsCookies } from '@/framework/utils/auth';
let uiConfigs = uiConfigsCookies();
export default {
  name: "ModelList",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    AInput: Input,
    ATextarea: Input.TextArea,
    AInputSearch: Input.Search,
    AButton: Button,
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    AForm: Form,
    AFormItem: Form.Item,
    AIcon: Icon,
    APopconfirm: Popconfirm,
    ASwitch: Switch,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ARow: Row,
    ACol: Col,
    ATooltip: Tooltip,
    BaseAttributes,
    ExpandAttributes,
    TaskProgress
  },
  data() {
    return {
      columns,
      datalist: [],
      visible: false,
      nowid: null,
      pagination: {
        //流程模板列表分页
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      type: true,
      searchkey:'',
      //拓展属性
      extendvisible: false,
      //有删除节点发布弹框
      visiblePublish: false,
      bodyStyle: {
        padding: 0
      },
      nowRecord: null,
      delNodeLists: [],
      processTransfers: [],
      //无删除节点发布弹框
      nodelnodesvisible: false,
      exportUrl: uiConfigs['api.url'] + '/workflow/v2/modelinstance/export/',
      taskid: null,
      taskInfo: null,
      exportCurrentModel:null,
      importVisible:false,
      importContent:null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取流程实例列表
    getList() {
      let query = {};
      query.pagesize = this.pagination.pageSize;
      query.pagenum = this.pagination.current;
      query.needtotal = true;
      query.searchkey = this.searchkey;
      getModelinstanceList(query)
        .then(res => {
          if (res.code == "success") {
            this.pagination.total = res.result.total ? res.result.total : 0;
            this.pagination.current = res.result.pagenum
              ? res.result.pagenum
              : 1;
            this.datalist = res.result.rows;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //搜索
    searchList() {
      this.getList();
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getList();
    },
    //新增
    addModel() {
      this.visible = true;
      this.type = true;
    },
    //打开基本属性弹框
    editModel(id) {
      this.nowid = id;
      this.type = false;
      this.visible = true;
    },
    //打开拓展属性弹框
    editExtendModel(id) {
      this.nowid = id;
      this.extendvisible = true;
    },
    //基本属性新增和编辑
    handleOk(val) {
      if (val) {
        this.$message.success("流程模板新增成功！");
      } else {
        this.$message.success("流程模板更新成功！");
      }
      this.visible = false;
      this.getList();
    },
    //扩展属性编辑
    handleExtendOk(val) {
      if (val) {
        this.extendvisible = false;
        this.$message.success("扩展属性编辑成功！");
        this.reset();
        this.getList();
      }
    },
    //扩展属性关闭
    handleExtendCancel() {
      this.extendvisible = false;
      this.reset();
      this.optedflag = false;
      this.opteduserflag = false;
    },
    //重置表单
    reset() {
      this.applyData = [];
      this.submitData = [];
      this.submitFlag = false;
      this.applyFlag = false;
      this.objflag = 0;
    },
    //删除
    del(record) {
      delModelinstance(record.id)
        .then(res => {
          if (res.code == "success") {
            this.$message.success(record.name + "已成功删除！");
            this.getList();
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //判断有无删除节点
    publish(record) {
      this.nowRecord = record;
      getDelprocessnode(record.id)
        .then(res => {
          if (res.code == "success") {
            if (res.result.length) {
              this.processTransfers = [];
              this.visiblePublish = true;
              this.delNodeLists = res.result;
              res.result.forEach(item => {
                this.processTransfers.push({
                  modelinstanceid: record.id,
                  transfresourceid: undefined,
                  pointresourceid: undefined,
                  currresourceid: item.resourceid
                });
              });
            } else {
              this.nodelnodesvisible = true;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //流程发布
    publishOk() {
      let query = {};
      query.modelinstanceid = this.nowRecord.id;
      query.processTransfers = this.processTransfers;
      deploymentModelinstance(query)
        .then(res => {
          if (res.code == "success") {
            this.$message.success(this.nowRecord.name + "发布成功！");
            if (this.processTransfers.length) {
              this.visiblePublish = false;
            } else {
              this.nodelnodesvisible = false;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //流程模型导入
    importModel(event) {
      let file = event.target.files[0];
      importModelInstance(file,this.exportCurrentModel.id).then(resp => {
        this.taskInfo = "流程模型导入中。。。";
        this.taskid = resp.result;
        loopTaskResult(this.taskid);
      }).catch(err => {
        document.getElementById("uploadFile").value = null;
        showError(err);
      })
    },
    importConf(record) {
      this.exportCurrentModel = record;
      this.importContent = "是否导入到【"+record.name+"】流程模板中，导入后会覆盖原来的流程模板，请谨慎操作！";
      this.importVisible = true;
    },
    trigger() {
      this.importVisible = false;
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    //任务执行完成回调方法
    onProgressFinish(res){
        document.getElementById("uploadFile").value = null;
        this.$message.success(res);
    },
    //导出
    exportModel(record) {
       location.href = this.exportUrl + record.id;
    },
    //设计
    jump(val) {
      const { href } = this.$router.resolve({
        name: "newprocesstemplate",
        query: {
          modelInstanceId: val.id,
          modelId: val.modelid,
          flowname: val.name
        }
      });
      window.open(href, "_blank");
    },
    //跳到模板组管理
    go() {
      this.$router.push({ name: "processmodelgroup" });
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
      max-width: 550px;
      button {
        margin-right: 10px;
      }
    }
    .select-right {
      float: right;
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
.publish-modal {
  .publish-wrap {
    padding: 15px 20px;
    h3 {
      font-weight: bold;
      font-size: 15px;
      text-indent: 2em;
    }
    p {
      color: red;
      i {
        margin-right: 5px;
      }
    }
    .publish-nodeslist {
      /deep/ .ant-row {
        margin-bottom: 10px;
      }
      .publish-title {
        color: gray;
        font-weight: bold;
      }
      .publish-nodename {
        max-width: 170px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .publish-btngroup {
    text-align: center;
    border-top: 1px solid #ddd;
    padding: 10px 0;
    button {
      margin: 0 15px;
    }
  }
}
.message-modal {
  position: relative;
}
.fileBtn {
  width: 0px;
  height: 0px;
  opacity: 0;
}
</style>