<template>
  <div class="datafill">
    <a-button @click="visible=true;type=true;" style="margin:15px 0;" type="primary">新增</a-button>
    <a-table
      :columns="columns"
      :dataSource="data"
      class="modelinterface-table"
      :rowKey="record=>record.id"
      :pagination="false"
    >
      <template slot="operation" slot-scope="text, record">
        <div style="display:flex;">
          <a href="javascript:;" @click="edit(record.id)" style="color:#1890ff;">编辑</a>
          <a href="javascript:;" @click="bind(record.id)" style="color:#1890ff;margin:0 30px;">字段绑定</a>
          <a-popconfirm title="确定删除这条消息模板吗?" @confirm="del(record)" okText="确定" cancelText="取消">
            <a href="javascript:;" style="color:red;">删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>

    <!-- 新增/修改规则弹框 -->
    <a-modal
      :title="type?'新增规则':'编辑'"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
    >
      <a-form :form="form">
        <a-form-item label="规则名称" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-input
            :maxlength="30"
            placeholder="最多填30个字符!"
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写规则名称!` }],
          initialValue: formData.name}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="选择接口" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-select
            placeholder="--请选择--"
            v-decorator="[
           `apiid`,
          {rules: [{ required: true, message:  `请选择接口!` }],
          initialValue: formData.apiid}
        ]"
          >
            <a-select-option
              v-for="item in interfaces"
              :value="item.value"
              :key="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="规则说明" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
          <a-textarea
            :rows="4"
            :maxlength="200"
            placeholder="最多填200个字符!"
            v-decorator="[
           `describe`,
          {rules: [{ required: false}],
          initialValue: formData.describe}
        ]"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 字段绑定弹框 -->
    <a-modal
      title="字段绑定"
      :visible="visibleWord"
      @ok="handleOkWord"
      @cancel="handleCancelWord"
      width="600px"
      class="wordForm"
      :bodyStyle="{'max-height':'700px','overflow':'auto'}"
    >
      <a-form :form="formWord" :model="parametersList">
        <div class="titleWrap">
          <h3 class="title">传入参数</h3>
        </div>
        <a-row :gutter="20" v-for="(item, index) in parametersList.indata" :key="'info1'+index">
          <a-col :span="11">
            <a-form-item :label="index==0?'接口字段：':''" required>
              <a-tree-select
                showSearch
                :filterTreeNode="filterTreeNode"
                v-model="item.fieldcode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="infieldData"
                placeholder="--请选择接口字段--"
              ></a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item :label="index==0?'控件：':''" required>
              <a-tree-select
                v-model="item.code"
                showSearch
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="controlData"
                placeholder="--请选择控件（code）--"
              ></a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="2" :style="index==0?'margin-top:41px;':'margin-top:3px;'">
            <a-button @click="delinterface(index,1)" type="danger" shape="circle" icon="close"></a-button>
          </a-col>
        </a-row>
        <div class="addinterface" @click="add(1)" style="margin-bottom:15px;">添 加</div>
        <div class="titleWrap">
          <h3 class="title">返回参数</h3>
        </div>
        <a-row :gutter="20" v-for="(item, index) in parametersList.outdata" :key="'info2'+index">
          <a-col :span="11">
            <a-form-item :label="index==0?'接口字段：':''" required>
              <a-tree-select
                v-model="item.fieldcode"
                showSearch
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="outfieldData"
                placeholder="--请选择接口字段--"
              ></a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item :label="index==0?'控件：':''" required>
              <a-tree-select
                v-model="item.code"
                showSearch
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="controlData"
                placeholder="--请选择控件（code）--"
              ></a-tree-select>
            </a-form-item>
          </a-col>
          <a-col :span="2" :style="index==0?'margin-top:41px;':'margin-top:3px;'">
            <a-button @click="delinterface(index,2)" type="danger" shape="circle" icon="close"></a-button>
          </a-col>
        </a-row>
        <div class="addinterface" @click="add(2)">添 加</div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getComponentTree } from "@/workflow/api/workflow";
import {
  getModelInterfaceList,
  addModelInterface,
  updateModelInterface,
  delModelInterface,
  getSingleModelInterface,
  getUiboxs,
  getParamsCode,
  getInterfaceFieids,
  saveInterfaceFieids,
  getSystemCode
} from "@/workflow/api/modelinterface";
import {
  Button,
  Table,
  Form,
  Input,
  Popconfirm,
  Modal,
  Row,
  Col,
  TreeSelect,
  Select
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AButton: Button,
    ATable: Table,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    APopconfirm: Popconfirm,
    AModal: Modal,
    ARow: Row,
    ACol: Col,
    ATreeSelect: TreeSelect,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  data() {
    return {
      id: parseInt(this.$route.query.modelInstanceId),
      columns: [
        {
          title: "规则名称",
          dataIndex: "name",
          width: "25%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "接口名称",
          dataIndex: "apiname",
          width: "25%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "规则说明",
          dataIndex: "describe",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "20%",
          scopedSlots: { customRender: "operation" }
        }
      ],
      data: [],
      visible: false,
      form: this.$form.createForm(this),
      interfaces: [],
      type: true,
      formData: {
        name: undefined,
        apiid: undefined,
        describe: undefined
      },
      nowid: undefined,
      //字段绑定
      visibleWord: false,
      formWord: this.$form.createForm(this),
      parametersList: {
        indata: [], //传入参数
        outdata: [] //传出参数
      },
      controlData: [], //控件下拉框值
      infieldData: [], //传入参数接口字段下拉框值
      outfieldData: [] //传出参数接口字段下拉框值
    };
  },
  created() {
    this.getList();
    this.getInterfaceList();
  },
  methods: {
    //流程接口列表
    getList() {
      let modelInterfaceQuery = {};
      modelInterfaceQuery.modelInstanceId = this.id;
      modelInterfaceQuery.type = 1;
      getModelInterfaceList(modelInterfaceQuery)
        .then(res => {
          this.data = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取接口数据
    getInterfaceList() {
      getUiboxs({ type: 1 })
        .then(res => {
          if (res.code == "success") {
            this.interfaces = res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //编辑
    edit(id) {
      this.nowid = id;
      getSingleModelInterface(id)
        .then(res => {
          if (res.code == "success") {
            this.formData = {
              name: res.result.name,
              apiid: res.result.apiid,
              describe: res.result.describe
            };
            this.visible = true;
            this.type = false;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //删除
    del(record) {
      delModelInterface(record.id)
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
    //保存
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.type = 1;
          values.modelinstanceid = this.id;
          if (this.type) {
            addModelInterface(values)
              .then(res => {
                if (res.code == "success") {
                  this.$message.success("规则新增成功！");
                  this.getList();
                  this.visible = false;
                  this.reset();
                }
              })
              .catch(err => {
                showError(err);
              });
          } else {
            values.id = this.nowid;
            updateModelInterface(values)
              .then(res => {
                if (res.code == "success") {
                  this.$message.success("规则更新成功！");
                  this.getList();
                  this.visible = false;
                  this.reset();
                }
              })
              .catch(err => {
               showError(err);
              });
          }
        }
      });
    },
    //取消
    handleCancel() {
      this.visible = false;
      this.reset();
    },
    //重置表单
    reset() {
      this.form.resetFields();
      this.formData = {
        name: undefined,
        apiid: undefined,
        describe: undefined
      };
    },
    //字段绑定
    bind(id) {
      this.nowid = id;
      //获取传入参数字段下拉框列表
      getParamsCode(id)
        .then(res => {
          if (res.code == "success") {
            this.infieldData = res.result;
          }
        })
        .catch(error => {
          showError(error);
        });
      //数据回显
      this.parametersList.indata = [];
      this.parametersList.outdata = [];
      getInterfaceFieids({ id: id, type: 1 })
        .then(res => {
          res.result.forEach(item => {
            //传入参数
            if (item.paramtype == 1) {
              this.parametersList.indata.push({
                fieldcode: item.fieldcode,
                code: item.code,
                id: item.id
              });
            } else if (item.paramtype == 2) {
              this.parametersList.outdata.push({
                fieldcode: item.fieldcode,
                code: item.code,
                id: item.id
              });
            }
          });
          if (this.parametersList.outdata.length == 0) {
            this.parametersList.outdata.push({});
          }
          if (this.parametersList.indata.length == 0) {
            this.parametersList.indata.push({});
          }
        })
        .catch(error => {
          showError(error);
        });
      //获取系统字段下拉框列表
      getSystemCode(id)
        .then(res => {
          this.outfieldData = res.result;
        })
        .catch(error => {
          showError(error);
        });
      this.getControlList();
      this.visibleWord = true;
    },
    //获取表单字段（控件）
    getControlList() {
      getComponentTree({ modelInstanceId: this.id })
        .then(res => {
          if (res.code == "success") {
            this.controlData = res.result;
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    //树型选择框搜索筛选
    filterTreeNode(input, option) {
      return (
        option.componentOptions.propsData.title
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    add(type) {
      if (type == 1) {
        this.parametersList.indata.push({});
      } else {
        this.parametersList.outdata.push({});
      }
    },
    //删除字段
    delinterface(index, type) {
      if (type == 1) {
        if (this.parametersList.indata.length !== 1) {
          this.parametersList.indata.splice(index, 1);
        }
      } else if (type == 2) {
        if (this.parametersList.outdata.length !== 1) {
          this.parametersList.outdata.splice(index, 1);
        }
      }
    },
    handleOkWord() {
      let interfaceFieidList = [];
      let flag = true;
      //校验为空
      for (let i = 0; i < this.parametersList.indata.length; i++) {
        if (
          !this.parametersList.indata[i].code ||
          !this.parametersList.indata[i].fieldcode
        ) {
          flag = false;
          break;
        }
      }
      for (let i = 0; i < this.parametersList.outdata.length; i++) {
        if (
          !this.parametersList.outdata[i].code ||
          !this.parametersList.outdata[i].fieldcode
        ) {
          flag = false;
          break;
        }
      }
      if (flag) {
        //包装控件数据
        this.controlData.forEach(a => {
          if (a.children) {
            a.children.forEach(b => {
              this.parametersList.indata.forEach(c => {
                if (b.value == c.code) {
                  this.$set(c, "parentcode", a.value);
                }
              });
              this.parametersList.outdata.forEach(c => {
                if (b.value == c.code) {
                  this.$set(c, "parentcode", a.value);
                }
              });
            });
          }
        });
        this.parametersList.indata.forEach(item => {
          this.$set(item, "paramtype", 1);
          this.$set(item, "modelinterfaceid", this.nowid);
        });
        this.parametersList.outdata.forEach(item => {
          this.$set(item, "paramtype", 2);
          this.$set(item, "modelinterfaceid", this.nowid);
        });

        //包装接口字段数据
        this.infieldData.forEach(a => {
          if (a.children) {
            a.children.forEach(b => {
              this.parametersList.indata.forEach(c => {
                if (b.value == c.fieldcode) {
                  this.$set(c, "parentfieldcode", a.value);
                }
              });
            });
          }
        });
        this.outfieldData.forEach(a => {
          if (a.children) {
            a.children.forEach(b => {
              this.parametersList.outdata.forEach(c => {
                if (b.value == c.fieldcode) {
                  this.$set(c, "parentfieldcode", a.value);
                }
              });
            });
          }
        });
        interfaceFieidList = this.parametersList.indata.concat(
          this.parametersList.outdata
        );
        saveInterfaceFieids({
          interfaceFieidList,
          modelInterfaceId: this.nowid,
          type: 1
        })
          .then(res => {
            this.visibleWord = false;
            this.$message.success("字段绑定成功！");
          })
          .catch(error => {
            showError(error);
          });
      } else {
        this.$message.warning("请填写完整再保存！");
      }
    },
    handleCancelWord() {
      this.visibleWord = false;
    }
  }
};
</script>
<style lang="less" scoped>
.modelinterface-table {
  /deep/table {
    table-layout: fixed;
    td,
    th {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.wordForm {
  .titleWrap {
    width: 200px;
    border-top: 1px solid #ddd;
    position: relative;
    &:after {
      position: absolute;
      content: "";
      height: 0;
      width: 0;
      border-bottom: 20px solid transparent;
      border-right: 20px solid #bfbfbf;
      border-top: 20px solid transparent;
      border-left: 20px solid transparent;
      left: 64px;
      top: -20px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .title {
      width: 85px;
      background: #bfbfbf;
      color: #fff;
      padding: 3px 5px;
      font-size: 15px;
      text-align: center;
    }
  }
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