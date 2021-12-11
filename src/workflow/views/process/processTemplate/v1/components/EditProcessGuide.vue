<template>
  <div class="EditProcessGuide">
    <div class="process-img">
      <h3>流程图：</h3>
      <div @click="trigger" class="uploadBtn">
        <img v-if="imageUrl" :src="imageUrl" />
        <span v-else class="uploadIcon">
          <a-icon type="upload" class="iconstyle" />点击上传
        </span>
      </div>
      <input
        type="file"
        ref="fileBtn"
        class="fileBtn"
        id="uploadFile"
        accept="image/*"
        @change="getFile($event)"
        multiple="multiple"
      />
    </div>
    <div class="file-list">
      <h3>审批材料：</h3>
      <div class="list-wrap">
        <a-button @click="openNodeModal" type="primary">添加节点</a-button>
        <ul class="p-list">
          <li v-for="(item,index) in list" :key="index">
            <div class="list-info">
              <span class="nodename" :title="item.name">{{item.name}}</span>
              <div class="operation">
                <span @click="addFile(item.id)">添加材料</span>
                <span @click="editNode(item)">编辑</span>
                <span @click="openSort(item.id)">排序</span>
                <a-popconfirm
                  title="确定删除这个节点吗?"
                  @confirm="del(item.name,item.id)"
                  okText="确定"
                  cancelText="取消"
                >
                  <span>删除</span>
                </a-popconfirm>
              </div>
            </div>
            <ul class="c-list">
              <li v-for="(obj,idx) in item.children" :key="idx">
                <div class="list-info">
                  <span :title="obj.name" class="list-info-name">{{obj.name}}</span>
                  <div class="operation">
                    <span @click="editFile(obj)">编辑</span>
                    <span @click="openSort(obj.id)">排序</span>
                    <a-popconfirm
                      title="确定删除这个材料吗?"
                      @confirm="del(obj.name,obj.id)"
                      okText="确定"
                      cancelText="取消"
                    >
                      <span>删除</span>
                    </a-popconfirm>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 添加/编辑节点弹窗 -->
    <a-modal :visible="nodevisible" :title="type?'添加节点':'节点属性编辑'" @ok="nodeOk" @cancel="nodereset">
      <a-form :form="nodeForm">
        <a-form-item label="节点名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            placeholder="请输入节点名称"
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写节点名称!` }],
          initialValue: nodeFormData.name
          }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="联系方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            placeholder="如：区委编办 0571-00000000"
            v-decorator="[
           `contactinfo`,
          {rules: [{ required: true, message:  `请填写联系方式!` }],
           initialValue: nodeFormData.contactinfo
          }]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 添加/编辑材料弹窗 -->
    <a-modal
      :visible="filevisible"
      :title="filetype?'添加材料':'材料属性编辑'"
      @ok="fileOk"
      @cancel="filereset"
      width="650px"
    >
      <a-form :form="fileForm">
        <a-form-item label="材料名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-input
            placeholder="请输入材料名称，如：用编计划表"
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写材料名称!` }],
          initialValue: fileFormData.name
          }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="是否必要" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-switch
            v-decorator="[
           `needtansfer`,
          {rules: [{ required: true, message:  `请选择是否必要!` }],
          initialValue: fileFormData.needtansfer,
          valuePropName: 'checked'}
        ]"
          />
        </a-form-item>
        <a-form-item label="材料来源" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-select
            v-decorator="[
           `type`,
          {rules: [{ required: true, message:  `请选择材料来源!` }],
           initialValue: fileFormData.type
          }]"
          >
            <a-select-option
              v-for="item in fileSourceList"
              :value="item.value"
              :key="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="材料格式" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-input
            placeholder="请输入材料格式"
            v-decorator="[
           `format`,
          {rules: [{ required: true, message:  `请填写材料格式!` }],
          initialValue: fileFormData.format
          }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 15}">
          <a-textarea
            :rows="4"
            v-decorator="[
           `memo`,
          {rules: [{ required: false}],
          initialValue: fileFormData.memo
          }]"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 排序弹窗 -->
    <a-modal title="排序" :visible="sortvisible" @ok="sortOk" @cancel="sortCancle" width="400px">
      <a-radio-group v-model="sorttype" @change="changeType">
        <a-radio :style="radioStyle" :value="1">调到最前</a-radio>
        <a-radio :style="radioStyle" :value="2">调到最后</a-radio>
        <a-radio :style="radioStyle" :value="3">
          调到
          <a-select
            :disabled="sorttype==3?false:true"
            placeholder="需要排到的材料/节点"
            showSearch
            style="width: 200px;margin:0 10px;"
            optionFilterProp="children"
            :filterOption="filterOption"
            v-model="afterId"
          >
            <a-select-option
              v-for="(item,index) in sortList"
              :key="index"
              :value="item.value"
            >{{item.text}}</a-select-option>
          </a-select>后
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>
import { uploadImg } from "@/workflow/api/workflow";
import {
  saveMaterial,
  deleteMaterial,
  materiaOrder,
  getMateriauiboxs
} from "@/workflow/api/catalog";
import { showError } from "@/framework/utils/index";
import { parseQueryString } from "@/workflow/utils/index";
import { uiConfigsCookies } from "@/framework/utils/auth";
import {
  Layout,
  Breadcrumb,
  Table,
  Input,
  Button,
  Pagination,
  Icon,
  Popconfirm,
  Form,
  Select,
  Modal,
  Radio,
  Switch
} from "ant-design-vue";
export default {
  props: ["materialList", "pictureurl"],
  data() {
    return {
      //流程图
      uiConfigs: uiConfigsCookies(),
      imageUrl: "",
      //节点属性
      nodevisible: false,
      type: true,
      nodeForm: this.$form.createForm(this),
      nodeFormData: {
        name: "",
        contactinfo: ""
      },
      nodeid: undefined,
      //材料属性
      filevisible: false,
      filetype: true,
      fileForm: this.$form.createForm(this),
      fileFormData: {
        name: "",
        needtansfer: false,
        type: 1,
        format: "",
        memo: ""
      },
      fileSourceList: [
        { value: 1, text: "在线生成" },
        { value: 2, text: "线下上传" }
      ],
      fileid: undefined,
      pid: undefined,
      //排序
      sortvisible: false,
      sorttype: undefined,
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px"
      },
      afterId: undefined,
      sortList: [],
      sortid: undefined
    };
  },
  components: {
    AInput: Input,
    AInputSearch: Input.Search,
    AButton: Button,
    AIcon: Icon,
    APopconfirm: Popconfirm,
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AModal: Modal,
    ASwitch: Switch,
    ATextarea: Input.TextArea,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  },
  computed: {
    list() {
      return this.materialList.modelMaterialVos;
    },
    catalogid() {
      return this.materialList.catalogid;
    },
    url() {
      return this.pictureurl
        ? this.uiConfigs["api.url"] +
            "/file/v1/download" +
            "?uri=" +
            encodeURIComponent(this.pictureurl)
        : "";
    }
  },
  watch: {
    url(newval) {
      this.imageUrl = newval;
    }
  },
  methods: {
    trigger(type, index) {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    //上传流程图
    getFile(event) {
      let imgFile = event.target.files[0];
      uploadImg(imgFile)
        .then(res => {
          if (res.code == "success") {
            this.imageUrl =
              this.uiConfigs["api.url"] +
              "/file/v1/download" +
              "?uri=" +
              encodeURIComponent(res.result);
            this.$message.success("文件上传成功！");
            document.getElementById("uploadFile").value = null;
            this.$emit("uploadMaterialImg", res.result);
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    //打开节点
    openNodeModal() {
      this.type = true;
      this.nodevisible = true;
    },
    //打开编辑节点
    editNode(item) {
      this.type = false;
      this.nodevisible = true;
      this.nodeid = item.id;
      this.nodeFormData = {
        name: item.name,
        contactinfo: item.contactinfo
      };
    },
    //节点保存
    nodeOk() {
      this.nodeForm.validateFields((err, values) => {
        if (!err) {
          values.catalogid = this.catalogid;
          values.pid = 0;
          if (!this.type) {
            values.id = this.nodeid;
          }
          saveMaterial(values)
            .then(res => {
              if (this.type) {
                this.$message.success("节点新增成功！");
              } else {
                this.$message.success("节点更新成功！");
              }
              this.$emit("updateNodeInfo");
              this.nodereset();
            })
            .catch(error => {
              showError(error);
            });
        }
      });
    },
    //节点清空
    nodereset() {
      this.nodeForm.resetFields();
      this.nodeFormData = {
        name: "",
        contactinfo: ""
      };
      this.nodevisible = false;
    },
    //添加材料
    addFile(pid) {
      this.pid = pid;
      this.filetype = true;
      this.filevisible = true;
    },
    //编辑材料
    editFile(item) {
      this.filetype = false;
      this.fileid = item.id;
      this.pid = item.pid;
      this.fileFormData = {
        name: item.name,
        needtansfer: item.needtansfer,
        type: item.type,
        format: item.format,
        memo: item.memo
      };
      this.filevisible = true;
    },
    //材料保存
    fileOk() {
      this.fileForm.validateFields((err, values) => {
        if (!err) {
          values.catalogid = this.catalogid;
          values.pid = this.pid;
          if (!this.filetype) {
            values.id = this.fileid;
          }
          saveMaterial(values)
            .then(res => {
              if (this.filetype) {
                this.$message.success("材料新增成功！");
              } else {
                this.$message.success("材料更新成功！");
              }
              this.$emit("updateNodeInfo");
              this.filereset();
            })
            .catch(error => {
              showError(error);
            });
        }
      });
    },
    //节点关闭
    filereset() {
      this.fileForm.resetFields();
      this.fileFormData = {
        name: "",
        needtansfer: false,
        type: 1,
        format: "",
        memo: ""
      };
      this.filevisible = false;
    },
    //打开排序
    openSort(id) {
      this.sortid = id;
      this.sortvisible = true;
      this.sorttype = undefined;
      this.afterId = undefined;
      getMateriauiboxs(id)
        .then(res => {
          this.sortList = res.result;
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
    sortOk() {
      if (this.sorttype == 3 && !this.afterId) {
        this.$message.error("必须选择排到的位置！");
        return;
      }
      let query = {};
      query.type = this.sorttype;
      query.id = this.sortid;
      if (this.sorttype == 3) {
        query.afterId = this.afterId;
      }
      materiaOrder(query)
        .then(res => {
          this.$message.success("排序保存成功！");
          this.sortvisible = false;
          this.$emit("updateNodeInfo");
        })
        .catch(err => {
          showError(err);
        });
    },
    sortCancle() {
      this.sortvisible = false;
    },
    //删除材料
    del(name, id) {
      deleteMaterial(id)
        .then(res => {
          if (res.code == "success") {
            this.$message.success(name + "已经成功删除！");
            this.$emit("updateNodeInfo");
          }
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.EditProcessGuide {
  h3 {
    font-size: 15px;
    font-weight: bold;
  }
  .process-img {
    .uploadBtn {
      padding-left: 30px;
      margin-top: 10px;
      .uploadIcon {
        cursor: pointer;
        .iconstyle {
          font-size: 20px;
          margin-right: 7px;
        }
      }
      img {
        max-width: 100%;
      }
    }
    .fileBtn {
      width: 0px;
      height: 0px;
      opacity: 0;
    }
  }
  .file-list {
    .list-wrap {
      padding-left: 30px;
      .list-info {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        .operation {
          flex-basis: 200px;
          text-align: right;
          padding-right: 15px;
          span {
            display: inline-block;
            margin-right: 10px;
            color: #45baea;
            cursor: pointer;
            &:last-child {
              color: red;
            }
          }
        }
      }
      .p-list {
        max-height: 500px;
        overflow: auto;
        margin-top: 20px;
        .nodename {
          flex-grow: 1;
          font-weight: bold;
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        li {
          line-height: 2.5;
        }
        > li {
          border-bottom: 1px solid #ddd;
          &:first-child {
            border-top: 1px solid #ddd;
          }
        }
      }
      .c-list {
        li {
          padding-left: 30px;
          border-top: 1px solid #ddd;
          .list-info-name {
            flex-grow: 1;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>