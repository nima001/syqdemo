<template>
  <div class="processrevocation">
    <a-button @click="open" style="margin:15px 0;" type="primary">新增</a-button>
    <a-table
      class="modelinterface-table"
      :columns="columns"
      :dataSource="data"
      :rowKey="record=>record.id"
      :pagination="false"
    >
      <template slot="operation" slot-scope="text, record">
        <div style="display:flex;">
          <a href="javascript:;" @click="edit(record.id)" style="color:#1890ff;">编辑</a>
          <a
            href="javascript:;"
            @click="bind(record)"
            :style="record.sort=='自定义'?'color:gray;margin:0 30px;':'color:#1890ff;margin:0 30px;'"
          >字段绑定</a>
          <a-popconfirm title="确定删除这条消息模板吗?" @confirm="del(record)" okText="确定" cancelText="取消">
            <a href="javascript:;" style="color:red;">删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>

    <!-- 新增/编辑规则弹框 -->
    <a-modal
      :title="type?'新增规则':'编辑'"
      :visible="visible"
      :rowKey="record=>record.id"
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
      class="ruleModal"
      :bodyStyle="{
        'height':'600px',
        'overflow':'auto'
      }"
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
        <a-form-item label="分类" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-select
            @change="changeSort"
            placeholder="--请选择分类--"
            v-decorator="[
           `sort`,
          {rules: [{ required: false}],
          initialValue: formData.sort}
        ]"
          >
            <a-select-option
              v-for="item in sortList"
              :value="item.value"
              :key="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="sort==2"
          label="选择接口"
          :label-col="{ span: 7}"
          :wrapper-col="{ span: 14 }"
        >
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
        <a-form-item
          v-if="sort==2"
          label="是否批量入库"
          :label-col="{ span: 7}"
          :wrapper-col="{ span: 14 }"
        >
          <a-switch
            v-decorator="[
           `batch`,
          {rules: [{ required: true, message:  `请选择是否批量入库!` }],
          initialValue: formData.batch,
          valuePropName: 'checked'}
        ]"
          />
        </a-form-item>
        <a-form-item
          label="上传脚本"
          v-if="sort==1"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 14 }"
          prop="fileurl"
        >
          <a-row :gutter="20">
            <a-col :span="16">
              <a-input read-only placeholder="支持doc/docx格式" v-model="formData.filename"></a-input>
            </a-col>
            <a-col :span="8">
              <div class="addFile" @click="trigger">
                <a-icon type="upload" />选择文件
              </div>
            </a-col>
          </a-row>
          <input
            type="file"
            ref="fileBtn"
            class="fileBtn"
            id="uploadFile"
            accept=".doc, .docx"
            @change="getFile($event)"
            multiple="multiple"
          />
          <a-input
            v-if="!formData.filename"
            type="hidden"
            v-decorator="[
           `fileurl`,
          {rules: [{ required:true, message:  `请上传上传脚本!` }],
          initialValue: formData.filename}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="sort==2"
          label="预设字段"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-textarea
            :rows="4"
            placeholder="json格式字段合集"
            v-decorator="[
           `extendfield`,
          {rules: [{ required: false}],
          initialValue: formData.extendfield}
        ]"
          ></a-textarea>
          <div class="fieldList">
            <a-checkbox-group v-model="formData.fieldids">
              <a-row :gutter="20">
                <a-col :span="8" v-for="(item,index) in fieldList" :key="index">
                  <a-checkbox :value="item.value">
                    <a-tooltip>
                      <template slot="title">{{item.text}}</template>
                      {{item.text}}
                    </a-tooltip>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
        </a-form-item>
        <a-form-item label="选择节点" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-select
            :getPopupContainer="triggerNode => triggerNode.parentNode"
            mode="multiple"
            placeholder="--请选择--"
            v-decorator="[
           `nodeids`,
          {rules: [{ required: true, message:  `请选择节点!` }],
          initialValue: formData.nodeids}
        ]"
          >
            <a-select-option
              v-for="item in nodeLists"
              :value="item.text"
              :key="item.text"
            >{{item.value}}</a-select-option>
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
      <a-form :form="formWord">
        <a-row :gutter="20" v-for="(item, index) in parametersList" :key="index">
          <a-col :span="11">
            <a-form-item :label="index==0?'接口字段：':''" required>
              <a-tree-select
                v-model="item.fieldcode"
                showSearch
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="fieldData"
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
            <a-button @click="delinterface(index)" type="danger" shape="circle" icon="close"></a-button>
          </a-col>
        </a-row>
        <div class="addinterface" @click="add">添 加</div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { uploadImg, getComponentTree } from "@/workflow/api/workflow";
import {
  getModelInterfaceList,
  addModelInterface,
  updateModelInterface,
  delModelInterface,
  getSingleModelInterface,
  getModelInterfacefields,
  getUiboxs,
  getInterfaceFieids,
  saveInterfaceFieids,
  getSystemCode
} from "@/workflow/api/modelinterface";
import { getListNode } from "@/workflow/api/summarytable";
import { parseQueryString } from "@/workflow/utils/index";
import {
  Button,
  Table,
  Form,
  Row,
  Col,
  Modal,
  Popconfirm,
  Input,
  TreeSelect,
  Select,
  Icon,
  Checkbox,
  Tooltip,
  Switch
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AButton: Button,
    ATable: Table,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AModal: Modal,
    APopconfirm: Popconfirm,
    AInput: Input,
    ATextarea: Input.TextArea,
    ATreeSelect: TreeSelect,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ATooltip: Tooltip,
    ASwitch: Switch
  },
  data() {
    return {
      id: parseInt(this.$route.query.modelInstanceId),
      columns: [
        {
          title: "规则名称",
          dataIndex: "name",
          width: "15%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "分类",
          dataIndex: "sort",
          width: "10%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "接口名称",
          dataIndex: "apiname",
          width: "15%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "节点名称",
          dataIndex: "nodename",
          width: "15%",
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
      catelogs: [],
      type: true,
      sortList: [
        { value: 2, text: "接口" },
        { value: 1, text: "自定义" }
      ],
      fieldList: [],
      nodeLists: [],
      formData: {
        name: undefined,
        sort: 2,
        apiid: undefined,
        filename: undefined,
        extendfield: undefined,
        fieldids: [],
        nodeids: [],
        describe: undefined,
        batch: false
      },
      fileurl: undefined,
      nowid: undefined,
      sort: 2,
      //字段绑定
      visibleWord: false,
      formWord: this.$form.createForm(this),
      parametersList: [{}],
      controlData: [],
      fieldData: []
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
      modelInterfaceQuery.type = 3;
      getModelInterfaceList(modelInterfaceQuery)
        .then(res => {
          if (res.code == "success") {
            this.data = res.result;
            this.data.forEach(a => {
              if (a.sort == 1) {
                this.$set(a, "sort", "自定义");
              } else if (a.sort == 2) {
                this.$set(a, "sort", "接口");
              }
            });
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    open() {
      this.visible = true;
      this.type = true;
      this.getNodesList();
      this.getFields();
    },
    //获取接口数据
    getInterfaceList() {
      getUiboxs({ type: 2 })
        .then(res => {
          this.interfaces = res.result;
        })
        .catch(error => {
          showError(error);
        });
    },
    changeSort(value) {
      this.sort = value;
      this.formData.fieldids = [];
      this.formData.batch = false;
    },
    //获取流程节点
    getNodesList() {
      getListNode(this.id)
        .then(res => {
          this.nodeLists = res.result;
        })
        .catch(error => {
          showError(error);
        });
    },
    //获取预设字段集合
    getFields() {
      getModelInterfacefields()
        .then(res => {
          if (res.code == "success") {
            this.fieldList = res.result;
          }
        })
        .catch(err => {
          this.$notification.error({
            message: "提示",
            description: err.desc || "未知错误" + (err.code || ""),
            duration: 3
          });
        });
    },
    //上传文件
    getFile(event) {
      let file = event.target.files[0];
      uploadImg(file)
        .then(res => {
          if (res.code == "success") {
            this.fileurl = res.result;
            this.formData.filename = file.name;
            this.$message.success("文件上传成功！");
            document.getElementById("uploadFile").value = null;
          }
        })
        .catch(error => {
          this.$message.error("文件上传失败！");
        });
    },
    trigger() {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    //编辑
    edit(id) {
      this.nowid = id;
      this.getNodesList();
      this.getFields();
      getSingleModelInterface(id)
        .then(res => {
          if (res.code == "success") {
            this.formData = {
              name: res.result.name,
              sort: res.result.sort,
              apiid: res.result.apiid ? res.result.apiid : undefined,
              extendfield: res.result.extendfield,
              fieldids: res.result.fieldids,
              nodeids: res.result.nodeids,
              describe: res.result.describe,
              batch: res.result.batch
            };
            this.sort = res.result.sort;
            if (res.result.fileurl) {
              this.formData.filename = parseQueryString(
                res.result.fileurl
              ).filename;
            }
            this.visible = true;
            this.type = false;
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    //删除
    del(record) {
      delModelInterface(record.id)
        .then(res => {
          this.$message.success(record.name + "已成功删除！");
          this.getList();
        })
        .catch(error => {
          showError(error);
        });
    },
    //保存
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.type = 3;
          values.modelinstanceid = this.id;
          values.fieldids = this.formData.fieldids;
          if (this.fileurl) {
            values.fileurl = this.fileurl;
          }
          if (this.type) {
            addModelInterface(values)
              .then(res => {
                this.$message.success("规则新增成功！");
                this.getList();
                this.visible = false;
                this.reset();
              })
              .catch(error => {
                showError(error);
              });
          } else {
            values.id = this.nowid;
            updateModelInterface(values)
              .then(res => {
                this.$message.success("规则更新成功！");
                this.getList();
                this.visible = false;
                this.reset();
              })
              .catch(error => {
                showError(error);
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
        sort: 2,
        apiid: undefined,
        filename: undefined,
        extendfield: undefined,
        fieldids: [],
        nodeids: [],
        describe: undefined,
        batch: false
      };
      this.sort = 2;
    },
    //字段绑定
    bind(record) {
      if (record.sort == "接口") {
        this.nowid = record.id;
        //数据回显
        this.parametersList = [];
        getInterfaceFieids({ id: record.id, type: 2 })
          .then(res => {
            if (res.code == "success") {
              res.result.forEach(item => {
                this.parametersList.push({
                  fieldcode: item.fieldcode,
                  code: item.code,
                  id: item.id
                });
              });
              if (this.parametersList.length == 0) {
                this.parametersList.push({});
              }
            }
          })
          .catch(err => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3
            });
          });
        //获取系统字段下拉框列表
        getSystemCode(record.id)
          .then(res => {
            if (res.code == "success") {
              this.fieldData = res.result;
            }
          })
          .catch(err => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3
            });
          });
        this.getControlList();
        this.visibleWord = true;
      }
    },
    //获取表单字段（控件）
    getControlList() {
      getComponentTree({ modelInstanceId: this.id })
        .then(res => {
          if (res.code == "success") {
            this.controlData = res.result;
          }
        })
        .catch(err => {
          this.$notification.error({
            message: "提示",
            description: err.desc || "未知错误" + (err.code || ""),
            duration: 3
          });
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
    add() {
      this.parametersList.push({});
    },
    //删除字段
    delinterface(index) {
      if (this.parametersList.length !== 1) {
        this.parametersList.splice(index, 1);
      }
    },
    handleOkWord() {
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
        this.controlData.forEach(a => {
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
        this.fieldData.forEach(a => {
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
          type: 2
        })
          .then(res => {
            if (res.code == "success") {
              this.visibleWord = false;
              this.$message.success("字段绑定成功！");
            } else {
              this.$message.error(res.desc);
            }
          })
          .catch(err => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3
            });
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
.ruleModal {
  .fileBtn {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
  .addFile {
    cursor: pointer;
    i {
      color: #1890ff;
      font-size: 18px;
      font-weight: bold;
      margin-right: 5px;
    }
  }
  .fieldList {
    margin-top: 5px;
    /deep/ .ant-col-8 {
      margin: 3px 0;
    }
    /deep/.ant-checkbox-wrapper {
      span {
        &:last-child {
          display: inline-block;
          max-width: 70px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:first-child {
          margin-top: -18px;
        }
      }
    }
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