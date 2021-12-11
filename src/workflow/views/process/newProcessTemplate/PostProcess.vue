<template>
  <div class="postProcessWrap">
    <div class="postProcess">
      <div class="save">
        <a-button type="primary" style="margin:15px 0;" @click="save">保存</a-button>
      </div>
      <a-form :form="form" @submit="save" class="post-form">
        <a-form-item class="form-item" label="是否操作后置流程" :label-col="{ span: 12 }" :wrapper-col="{ span: 4 }">
          <a-switch
            v-decorator="['therepostprocess',{valuePropName: 'checked'}]"
            @change="changeState"
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </a-form-item>
        <a-form-item
          class="form-item"
          v-show="therepostprocess"
          label="是否传递被操作人员ID"
          :label-col="{ span: 14 }"
          :wrapper-col="{ span: 4 }"
        >
          <a-switch
            v-decorator="['transmituserid',{valuePropName: 'checked'}]"
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </a-form-item>
        <a-form-item
          class="form-item"
          v-show="therepostprocess"
          label="是否传递发起单位ID"
          :label-col="{ span: 13 }"
          :wrapper-col="{ span: 4 }"
        >
          <a-switch
            v-decorator="['transmitorgid',{valuePropName: 'checked'}]"
            checkedChildren="是"
            unCheckedChildren="否"
          />
        </a-form-item>
      </a-form>
      <div class="table" v-show="addvisible">
        <a-button type="primary" style="margin:15px 0;" @click="open">新增</a-button>
        <a-table
          :rowKey="record=>record.id"
          :pagination="false"
          :columns="selectedColumns"
          :dataSource="selectedTemplateList"
          >
          <template slot="operation" slot-scope="text, record">
            <div style="display:flex;">
              <a href="javascript:;" @click="bind(record)" style="color:#1890ff;margin-right: 30px;">字段绑定</a>
              <a-popconfirm title="确定删除这条消息模板吗?" @confirm="del(record)" okText="确定" cancelText="取消">
                <a href="javascript:;" style="color:red;">删除</a>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 流程模板弹框 -->
    <a-modal
      title="流程模板"
      width="500px"
      :visible="visible"
      @cancel="onClose"
      @ok="addTemplate"
    >
      <div class="search">
        <a-input-search
          v-model="searchkey"
          placeholder="输入要查找的流程模板名称"
          @search="onSearch"
          enterButton
        />
      </div>
      <a-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio'}"
        :columns="columns"
        :rowKey="(record)=>{return record.id+'_'+record.name}"
        :pagination="pagination"
        @change="handleTableChange"
        :dataSource="templateList"
      />
    </a-modal>

    <!-- 字段绑定弹框 -->
    <a-modal
      title="字段绑定"
      width="600px"
      :visible="wordVisible"
      @cancel="onWordClose"
      @ok="addWord"
      class="wordForm"
      :bodyStyle="{'max-height':'700px','overflow':'auto'}"
      >
      <a-form :form="wordForm">
        <a-row :gutter="20" v-for="(item, index) in parametersList" :key="index">
          <a-col :span="11">
            <a-form-item :label="index==0?'当前流程控件：':''" required>
              <a-tree-select
                v-model="item.fieldcode"
                showSearch
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="modelData"
                placeholder="--请选择接口字段--"
                >
              </a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item :label="index==0?'后置流程控件：':''" required>
              <a-tree-select
                v-model="item.code"
                showSearch
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="apiData"
                placeholder="--请选择控件（code）--"
              ></a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="2" :style="index==0?'margin-top:41px;':'margin-top:3px;'">
            <a-button type="danger" shape="circle" icon="close" @click="delinterface(index)"></a-button>
          </a-col>
        </a-row>
        <div class="addinterface" @click="add">添 加</div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { Row, Col, TreeSelect, Button, Form, Switch, Select, Icon, Input, Modal, Table, Popconfirm} from "ant-design-vue";
import { getTemplates, getComponentTree } from "../../../api/workflow";
import { saveModel, getModelPreviewData } from "../../../api/postprocess";
import { getModelinstanceList } from "../../../api/modellist";
import { addModelInterface, getModelInterfaceList, delModelInterface, getInterfaceFieids, saveInterfaceFieids } from "../../../api/modelinterface";
import { showError } from "@/framework/utils/index";
const columns = [
  {
    title: "流程模板名称",
    dataIndex: "name",
    width: "100%"
  }
];
export default {
  data() {
    return {
      id: parseInt(this.$route.query.modelInstanceId),
      form: this.$form.createForm(this),
      wordForm: this.$form.createForm(this),
      therepostprocess: true,
      relationmodel: [],
      relationmodelNames: "",
      templateList: [],
      curId: null,
      visible: false,
      searchkey: "",
      selectedRowKeys: [],
      addvisible: false,
      columns,
      pagination: {
        //流程模板列表分页
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showTotal: function(total, range) {
          return `共 ${total} 条记录`;
        },
        size: "small"
      },
      selectedColumns: [
        {
          title: "后置流程名称",
          dataIndex: "apiname",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      selectedTemplateList: [],
      wordVisible: false,
      nowid: undefined,
      saveid: undefined,
      parametersList: [{}],
      modelData: [],
      apiData: []
    };
  },
  components: {
    ACol: Col,
    ARow: Row,
    ATreeSelect: TreeSelect,
    AForm: Form,
    AFormItem: Form.Item,
    ASwitch: Switch,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon,
    ATextarea: Input.TextArea,
    AModal: Modal,
    ATable: Table,
    AInputSearch: Input.Search,
    AButton: Button,
    APopconfirm: Popconfirm
  },
  mounted() {
    this.form.setFieldsValue({ ["therepostprocess"]: false });
  },
  created() {
    this.previewData(this.id);
    this.getData();
  },
  methods: {
    //获取所有流程
    getModels() {
      let query = {};
      query.pagesize = this.pagination.pageSize;
      query.pagenum = this.pagination.current;
      query.needtotal = true;
      query.searchkey = this.searchkey;
      getModelinstanceList(query)
        .then(res => {
          this.pagination.total = res.result.total;
          this.pagination.current = res.result.pagenum;
          this.templateList = res.result.rows;
        })
        .catch(err => {
          showError(err);
        });
    },
    //改变状态
    changeState(value) {
      this.therepostprocess = value;
      this.addvisible = value;
    },
    //后置流程数据回显
    previewData(id) {
      getModelPreviewData(id)
        .then(res => {
          if (res.result) {
            this.therepostprocess = res.result.therepostprocess == 1 ? true : false;
            this.addvisible = this.therepostprocess == 1 ? true : false;
            this.saveid = res.result.id ? res.result.id : undefined;
            this.form.setFieldsValue({
              ["therepostprocess"]:
                res.result.therepostprocess == 1 ? true : false
            });
            this.form.setFieldsValue({
              ["transmituserid"]: res.result.transmituserid == 1 ? true : false
            });
            this.form.setFieldsValue({
              ["transmitorgid"]: res.result.transmitorgid == 1 ? true : false
            });
            this.curId = res.result.id;
          }else{
            this.therepostprocess = false;
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    getData() {
      let query = {};
      query.modelInstanceId = this.id;
      query.type = 4;
      getModelInterfaceList(query)
      .then(({result}) => {
        this.selectedTemplateList = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    //保存
    save() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = {};
          values.therepostprocess
            ? (obj.therepostprocess = 1)
            : (obj.therepostprocess = 0);
          values.transmituserid
            ? (obj.transmituserid = 1)
            : (obj.transmituserid = 0);
          values.transmitorgid
            ? (obj.transmitorgid = 1)
            : (obj.transmitorgid = 0);
          obj.modelinstanceid = this.id;
          saveModel(obj)
            .then(({result}) => {
              if (this.curId) {
                this.$message.success("后置流程修改成功！");
              } else {
                this.$message.success("后置流程保存成功！");
              }
              this.saveid = result;
              this.selectedRowKeys = [];
            })
            .catch(err => {
              showError(err);
            });
        }
      });
    },
    open() {
      if(this.saveid) {
        this.getModels();
        this.visible = true;
      }else{
        this.$message.warning("请先点击保存！");
      }
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getModels();
    },
    onClose() {
      this.visible = false;
      this.reset();
    },
    //搜索
    onSearch() {
      this.getModels();
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    selectTemplates() {
      this.relationmodel = [];
      let arr = [];
      this.selectedRowKeys.forEach(item => {
        let temp = item.split("_");
        this.relationmodel.push(parseInt(temp[0]));
        arr.push(temp[1]);
      });
      this.relationmodelNames = arr.join(",");
      this.visible = false;
      this.reset();
    },
    addTemplate() {
      let apiid = parseInt(this.selectedRowKeys[0].split("_")[0]),
          modelInterface = {
            apiid,
            modelinstanceid: this.id,
            type: 4    
          };
      addModelInterface(modelInterface)
      .then(res => {
        this.visible = false;
        this.getData();
      })
      .catch(err => {
        showError(err);
      })
    },
    reset() {
      this.pagination.current = 1;
    },
    bind(record) {
      this.wordVisible = true;
      this.nowid = record.id;
      //数据回显
      this.parametersList = [];
      getInterfaceFieids({ id: record.id })
      .then(({result}) => {
        result.forEach(item => {
          this.parametersList.push({
            fieldcode: item.fieldcode,
            code: item.code,
            id: item.id
          });
        });
        if (this.parametersList.length == 0) {
          this.parametersList.push({});
        }
      })
      .catch(err => {
        showError(err);
      })
      Promise.all([
        getComponentTree({ modelInstanceId: this.id }).then(({result}) => result),
        getComponentTree({ modelInstanceId: record.apiid }).then(({result}) => result)
      ]).then(([modelData, apiData]) => {
        this.modelData = modelData;
        this.apiData = apiData;
      }).catch(err => {
        showError(err);
      })
    },
    del(record) {
      delModelInterface(record.id)
      .then(res => {
        this.$message.success(record.apiname + "已成功删除！");
        this.getData();
      })
      .catch(err => {
        showError(err);
      })
    },
    //树型选择框搜索筛选
    filterTreeNode(input, option) {
      return (
        option.componentOptions.propsData.title
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    add() {
      this.parametersList.push({});
    },
    //删除字段
    delinterface(index) {
      if (this.parametersList.length !== 1) {
        this.parametersList.splice(index, 1);
      }
    },
    onWordClose() {
      this.wordVisible = false;
    },
    addWord() {
      let interfaceFieidList = [];
      let flag = true;
      for (let i = 0; i < this.parametersList.length; i++) {
        if (!this.parametersList[i].code || !this.parametersList[i].fieldcode) {
          flag = false;
          break;
        }
      }
      if (flag) {
        //包装控件数据
        this.apiData.forEach(a => {
          if (a.children) {
            a.children.forEach(b => {
              this.parametersList.forEach(c => {
                if (b.value == c.code) {
                  this.$set(c, "parentcode", a.value);
                }
              });
            });
          }
        });
        this.parametersList.forEach(item => {
          this.$set(item, "paramtype", 3);
          this.$set(item, "modelinterfaceid", this.nowid);
        });
        //包装接口字段数据
        this.modelData.forEach(a => {
          if (a.children) {
            a.children.forEach(b => {
              this.parametersList.forEach(c => {
                if (b.value == c.fieldcode) {
                  this.$set(c, "parentfieldcode", a.value);
                }
              });
            });
          }
        });
        interfaceFieidList = this.parametersList;
        saveInterfaceFieids({
          interfaceFieidList,
          modelInterfaceId: this.nowid,
          type: 4
        })
          .then(res => {
            this.wordVisible = false;
            this.$message.success("字段绑定成功！");
          })
          .catch(error => {
            showError(error);
          });
      } else {
        this.$message.warning("请填写完整再保存！");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.postProcessWrap {
  margin-top: 20px;
  .save {
    width:70px;
    cursor: pointer;
    i {
      font-size: 17px;
      padding-right: 5px;
    }
  }
  .postProcess {
    width: 80%;
    margin: 15px auto;
    .post-form{
      display: flex;
      .form-item{
        width: 26%;
      }
    }
  }
}
.templateModal {
  .search {
    margin-bottom: 15px;
  }
}
.wordForm {
  .addinterface {
    border: 1px dashed #ddd;
    text-align: center;
    padding: 5px 0;
    color: gray;
    cursor: pointer;
    font-size: 15px;
  }
}
</style>