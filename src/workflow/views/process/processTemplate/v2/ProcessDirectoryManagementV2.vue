<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <div class="btngroup">
        <a-button @click="visible=true" type="primary">添加主项</a-button>
        <a-input-search
          placeholder="请输入要搜索的流程"
          v-model="searchkey"
          @search="searchList"
          enterButton
        />
      </div>
      <a-table
        :columns="columns"
        :dataSource="mainList"
        :rowKey="(record)=>record.id"
        :pagination="false"
        :scroll="screenLevel<1115?{ y: 550}:{}"
      >
        <template slot="status" slot-scope="text, record" v-if="!record.children">
          <span
            :style="record.status==1?'color:#35ac35cf':'color:gray'"
          >{{record.status==1?'上架':'下架'}}</span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="openEdit(record,1)" style="color:blue;">编辑</a>
          <a
            href="javascript:;"
            @click="!record.children?openProcess(record.id):''"
            style="color:blue"
          >{{!record.children?'流程说明':''}}</a>
          <a href="javascript:;" @click="openEdit(record,2)" style="color:blue;">添加子项</a>
          <a
            href="javascript:;"
            @click="!record.children?changeStatus(record.id):''"
            :style="record.status==1?'color:gray':'color:#35ac35cf'"
          >{{!record.children?record.status==1?'下架':'上架':''}}</a>
          <a-popconfirm title="确定删除这条流程吗?" @confirm="del(record.id)" okText="确定" cancelText="取消">
            <a href="#" style="color:red;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
      <a-pagination
        style="text-align:right;margin-top:30px;"
        @change="onShowChange"
        showQuickJumper
        :pageSize.sync="pageSize"
        :defaultCurrent="currentPage"
        :total="total"
      />
    </a-layout-content>
    <!-- 添加主项 -->
    <a-modal :visible="visible" title="添加主项" @ok="handleOk" @cancel="cancel">
      <a-form :form="addForm">
        <a-form-item label="主项名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写要添加的主项名称!` }]}
        ]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 编辑、添加子项 -->
    <a-modal :visible="edit" :title="type" @ok="editOk" @cancel="cancel">
      <a-form :form="editForm">
        <a-form-item
          :label="(flag==1||flag==3)?'名称':'主项名称'"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :read-only="(flag==1||flag==3)?false:true"
            v-decorator="['mainname',{
              rules: [{ required: (flag==1||flag==3)?true:false, message:  `请填写名称!` }],
              initialValue: formData.mainname
          }]"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="flag==2 || flag==4 || flag==5"
          :read-only="(flag==1||flag==3)?false:true"
          label="父级名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            :read-only="flag==2?false:true"
            v-decorator="['pname',{
            initialValue: formData.pname
          }]"
            placeholder="请填写父级名称"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="flag==2 || flag==4 || flag==5"
          label="子项名称"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="['name',{
               rules: [{ required:true, message:  `请填写子项名称!` }],
            initialValue: formData.name
          }]"
            placeholder="请填写子项名称"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="flag==1 || flag==4"
          label="PC办理地址"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="['pcurl',{
            initialValue: formData.pcurl
          }]"
            placeholder="请填写PC办理地址"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="flag==1 || flag==4"
          label="移动端办理地址"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="['appurl',{
            initialValue: formData.appurl
          }]"
            placeholder="请填写移动端办理地址"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="flag==1 || flag==4"
          label="流程类型"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            placeholder="请选择流程类型"
            v-decorator="['flowtype',{
              rules: [{ required:true, message:  `请选择流程类型!` }],
            initialValue: formData.flowtype
          }]"
          >
            <a-select-option
              v-for="item in FlowTypeList"
              :key="item.value"
              :label="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 流程说明 -->
    <a-modal
      :visible="process"
      title="流程说明编辑"
      @ok="saveMaterial"
      @cancel="closeProcess"
      width="70%"
    >
      <div class="process">
        <p>审批材料:</p>
        <ul>
          <li>
            <span>材料名称</span>
            <span>审核单位</span>
            <span>盖章单位</span>
            <span>联系方式</span>
            <span>备注</span>
            <span>模板文件</span>
            <span></span>
          </li>
          <li v-for="(item,index) in approvalList" :key="index">
            <span>
              <a-input placeholder="如：用编计划表" v-model="item.name"></a-input>
            </span>
            <span>
              <a-input placeholder="如：调入单位、区委编办" v-model="item.approvalunit"></a-input>
            </span>
            <span>
              <a-input placeholder="如：调入单位、区委编办" v-model="item.signunit"></a-input>
            </span>
            <span>
              <a-input placeholder="如：区委编办0571-00000" v-model="item.contactinfo"></a-input>
            </span>
            <span>
              <a-input v-model="item.memo"></a-input>
            </span>
            <span>
              <a-input v-model="item.filename" @click="trigger(2,index)" placeholder="点击上传/重新上传"></a-input>
              <input
                type="file"
                ref="fileBtn2"
                id="uploadFile2"
                class="fileBtn"
                @change="getFile2($event,index)"
                multiple="multiple"
              />
            </span>
            <span>
              <a-icon type="menu-unfold" />
              <a-icon type="minus-circle" @click="delMaterial(1,index)" />
            </span>
          </li>
        </ul>
        <a-button icon="plus" @click="addMaterial(1)">添加材料</a-button>
      </div>
      <div class="process">
        <p>佐证材料:</p>
        <ul>
          <li>
            <span>材料名称</span>
            <span>审核单位</span>
            <span>盖章单位</span>
            <span>联系方式</span>
            <span>备注</span>
            <span>模板文件</span>
            <span></span>
          </li>
          <li v-for="(item,index) in evdienceList" :key="index">
            <span>
              <a-input placeholder="如：用编计划表" v-model="item.name"></a-input>
            </span>
            <span>
              <a-input placeholder="如：调入单位、区委编办" v-model="item.approvalunit"></a-input>
            </span>
            <span>
              <a-input placeholder="如：调入单位、区委编办" v-model="item.signunit"></a-input>
            </span>
            <span>
              <a-input placeholder="如：区委编办0571-00000" v-model="item.contactinfo"></a-input>
            </span>
            <span>
              <a-input v-model="item.memo"></a-input>
            </span>
            <span>
              <a-input v-model="item.filename" @click="trigger(3,index)" placeholder="点击上传/重新上传"></a-input>
              <input
                type="file"
                ref="fileBtn3"
                id="uploadFile3"
                class="fileBtn"
                @change="getFile3($event,index)"
                multiple="multiple"
              />
            </span>
            <span>
              <a-icon type="menu-unfold" />
              <a-icon type="minus-circle" @click="delMaterial(2,index)" />
            </span>
          </li>
        </ul>
        <a-button icon="plus" @click="addMaterial(2)">添加材料</a-button>
      </div>
      <div class="process">
        <p>流程图:</p>
        <div @click="trigger(1)" class="uploadBtn">
          <img v-if="imageUrl" :src="imageUrl" />
          <a-button icon="plus" v-else>上传流程图</a-button>
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
    </a-modal>
  </a-layout>
</template>

<script>
import { setTimeout } from "timers";
import { getListconstantbydictkey, uploadImg } from "@/workflow/api/workflow";
import {
  changeStatus,
  deleteCatalog,
  getListMaterial,
  saveMaterial,
  getListCatalogv2,
  addCatalogV2,
  getCatalogInfoV2
} from "@/workflow/api/catalog";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { showError } from "@/framework/utils/index";
import { parseQueryString } from "@/workflow/utils/index";
import "@/workflow/style/process.css";
const columns = [
  {
    title: "流程名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: "12%",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "30%",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
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
  Modal
} from "ant-design-vue";
export default {
  name: "ProcessDirectoryManagemenV2",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    AInput: Input,
    AInputSearch: Input.Search,
    AButton: Button,
    APagination: Pagination,
    AIcon: Icon,
    APopconfirm: Popconfirm,
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AModal: Modal
  },
  data() {
    return {
      columns,
      editForm: this.$form.createForm(this),
      addForm: this.$form.createForm(this),
      //分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      //打开模态框的条件
      visible: false,
      edit: false,
      process: false,
      //用来判断打开的是哪一个
      type: "",
      flag: null,
      id: null,
      topid: null,
      mainList: [],
      orgList: [],
      subjectsList: [],
      options: [],
      approvalList: [{}],
      evdienceList: [{}],
      imageUrl: "",
      imageId: null,
      formData: {
        mainname: "",
        name: "",
        pname: "",
        appurl: "",
        pcurl: "",
        flowtype: null
      },
      newVal: null,
      screenLevel: document.documentElement.clientWidth,
      FlowTypeList: [],
      searchkey: undefined,
      uiConfigs: uiConfigsCookies()
    };
  },
  //实时监听屏幕大小
  mounted() {
    this.screenLevel = document.documentElement.clientWidth;
    const that = this;
    window.onresize = function temp() {
      that.screenLevel = document.documentElement.clientWidth;
    };
  },
  created() {
    this.getListCatalog();
  },
  watch: {
    currentPage(val) {
      this.currentPage = val;
      this.getListCatalog(this.searchkey);
    }
  },
  computed: {
    totalPage() {
      let page = Math.ceil(this.total / this.pageSize);
      return page;
    }
  },
  methods: {
    //获取初始数据
    getListCatalog(searchkey) {
      getListCatalogv2({ pagenum: this.currentPage, searchkey })
        .then(res => {
          this.mainList = [];
          if (res.code == "success") {
            this.mainList = res.result.rows;
            this.current = res.result.pagenum ? res.result.pagenum : 1;
            this.total = res.result.total ? res.result.total : 0;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //搜索
    searchList(val) {
      this.getListCatalog(val);
    },
    //获取字典常量
    getListdicts() {
      getListconstantbydictkey("workflow.flowtype")
        .then(res => {
          if (res.code == "success") {
            this.FlowTypeList = res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //添加
    add(info) {
      addCatalogV2(info)
        .then(res => {
          if (res.code == "success") {
            this.getListCatalog();
            this.visible = false;
            this.addForm.resetFields();
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //添加主项
    handleOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          values.pid = 0;
          this.add(values);
        }
      });
    },
    //打开编辑子项、主项和添加子项
    openEdit(record, type) {
      this.edit = true;
      this.id = record.id;
      this.topid = record.topid;
      if (type == 1) {
        if (!record.children && record.pid == 0) {
          //无子项的主项编辑
          this.type = "主项编辑";
          this.flag = 1;
          this.getListdicts();
        } else if (record.children && record.pid !== 0) {
          //有子项的子项编辑
          this.type = "编辑";
          this.flag = 2;
        } else if (record.children && record.pid == 0) {
          //有子项的主项编辑
          this.type = "主项编辑";
          this.flag = 3;
        } else if (!record.children && record.pid !== 0) {
          //子项编辑
          this.flag = 4;
          this.type = "子项编辑";
          this.getListdicts();
        }
      } else if (type == 2) {
        this.type = "添加子项"; //添加子项
        this.flag = 5;
      }
      getCatalogInfoV2(record.id)
        .then(res => {
          if (res.code == "success") {
            if (this.flag == 1) {//编辑主项
              this.formData.mainname = res.result.name;
              this.formData.appurl = res.result.appurl;
              this.formData.pcurl = res.result.pcurl;
              this.formData.flowtype = res.result.flowtype;
            } else if (this.flag == 2) {//有子项的子项编辑
              this.formData.mainname = res.result.mainname;
              this.formData.pname = res.result.pname;
              this.formData.name = res.result.name;
            } else if (this.flag == 3) {//有子项的主项编辑
              this.formData.mainname = res.result.name;
            } else if (this.flag == 4) {//子项编辑
              this.formData.name = res.result.name;
              this.formData.mainname = res.result.mainname;
              this.formData.pname = res.result.pname;
              this.formData.appurl = res.result.appurl;
              this.formData.pcurl = res.result.pcurl;
              this.formData.flowtype = res.result.flowtype;
            } else if (this.flag == 5) {//添加子项
              this.formData.mainname = res.result.mainname;
              this.formData.pname = res.result.name;
              this.formData.name = "";
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //编辑主项、子项和添加子项
    editOk() {
      this.editForm.validateFields((err, values) => {
        if (!err) {
          values.topid = this.topid;
          if (this.flag == 5) {
            values.pid = this.id;
            this.add(values);
          } else if (this.flag == 1 || this.flag == 3) {
            this.newVal = JSON.parse(
              JSON.stringify(values).replace(/mainname/g, "name")
            );
            this.newVal.id = this.id;
            this.add(this.newVal);
          } else if (this.flag == 2) {
            this.newVal = JSON.parse(
              JSON.stringify(values).replace(/pname/g, "name")
            );
            this.newVal.id = this.id;
            this.add(this.newVal);
          } else {
            values.id = this.id;
            this.add(values);
          }
          this.edit = false;
          this.editForm.resetFields();
        }
      });
    },
    //删除流程
    del(id) {
      deleteCatalog(id)
        .then(res => {
          if (res.code == "success") {
            this.getListCatalog();
            this.$message.success("流程删除成功！");
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //上下架状态改变
    changeStatus(id) {
      changeStatus(id)
        .then(res => {
          if (res.code == "success") {
            this.getListCatalog();
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //打开流程编辑
    openProcess(id) {
      this.id = id;
      this.process = true;
      getListMaterial(id)
        .then(res => {
          if (res.code == "success") {
            //判断是否返回值
            this.approvalList = [];
            this.evdienceList = [];
            res.result.modelMaterials.forEach(item => {
              if (item.fileurl) {
                let name = parseQueryString(item.fileurl).filename;
                this.$set(item, "filename", name);
              }
              if (item.type == 1) {
                this.approvalList.push(item);
              } else if (item.type == 2) {
                this.evdienceList.push(item);
              }
            });
            //判断是否返回图片id
            if (res.result.pictureurl) {
              this.imageUrl =
                this.uiConfigs["api.url"] +
                "/file/v1/download" +
                "?uri=" +
                encodeURIComponent(res.result.pictureurl);
            }
            //判断返回值为空的时候，让流程自动生成一条
            if (!this.approvalList.length) {
              this.approvalList.push({ catalogid: id, type: 1 });
            }
            if (!this.evdienceList.length) {
              this.evdienceList.push({ catalogid: id, type: 2 });
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //添加材料
    addMaterial(type) {
      if (type == 1) {
        this.approvalList.push({ catalogid: this.id, type: 1 });
      } else {
        this.evdienceList.push({ catalogid: this.id, type: 2 });
      }
    },
    //上传流程图
    getFile(event) {
      let imgFile = event.target.files[0];
      uploadImg(imgFile)
        .then(res => {
          if (res.code == "success") {
            let url =
              this.uiConfigs["api.url"] +
              "/file/v1/download" +
              "?uri=" +
              encodeURIComponent(res.result);
            this.imageUrl = url;
            this.imageId = res.result;
            this.$message.success("文件上传成功！");
            document.getElementById("uploadFile").value = null;
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    getFile2(event, index) {
      let imgFile = event.target.files[0];
      uploadImg(imgFile)
        .then(res => {
          if (res.code == "success") {
            this.approvalList[index].fileurl = res.result;
            this.$set(this.approvalList[index], "filename", imgFile.name);
            this.$message.success("文件上传成功！");
            document.getElementById("uploadFile2").value = null;
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    getFile3(event, index) {
      let imgFile = event.target.files[0];
      uploadImg(imgFile)
        .then(res => {
          if (res.code == "success") {
            this.evdienceList[index].fileurl = res.result;
            this.$set(this.evdienceList[index], "filename", imgFile.name);
            this.$message.success("文件上传成功！");
            document.getElementById("uploadFile3").value = null;
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    trigger(type, index) {
      if (type == 1) {
        this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
      } else if (type == 2) {
        this.$refs.fileBtn2[index].dispatchEvent(new MouseEvent("click"));
      } else if (type == 3) {
        this.$refs.fileBtn3[index].dispatchEvent(new MouseEvent("click"));
      }
    },
    //删除某一条流程
    delMaterial(type, index) {
      if (type == 1) {
        this.approvalList.splice(index, 1);
      } else {
        this.evdienceList.splice(index, 1);
      }
    },
    //保存流程
    saveMaterial() {
      let info = {};
      info.catalogid = this.id;
      let arr = this.approvalList.concat(this.evdienceList);
      info.modelMaterials = [];
      arr.forEach(item => {
        let obj = {};
        for (var a in item) {
          if (a !== "filename") {
            obj[a] = item[a];
          }
        }
        info.modelMaterials.push(obj);
      });
      info.pictureurl = this.imageId ? this.imageId : null;
      saveMaterial(info)
        .then(res => {
          if (res.code == "success") {
            this.$notification.success({
              message: "提示",
              description: "保存成功！",
              duration: 3
            });
            this.process = false;
            this.imageUrl = "";
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //关闭流程
    closeProcess() {
      this.process = false;
      this.imageUrl = "";
    },
    //取消表单
    cancel() {
      this.edit = false;
      this.visible = false;
      this.editForm.resetFields();
      this.addForm.resetFields();
    },
    //分页
    onShowChange(page, pageSize) {
      this.currentPage = page;
      this.getListCatalog(this.searchkey);
    }
  }
};
</script>

<style lang="less" scoped>
.body {
  padding: 24px;
  .ant-table-tbody > tr > td {
    &:last-child {
      a {
        text-decoration: none;
        display: inline-block;
        margin-right: 15px;
        width: 56px;
        &:first-child,
        &:nth-child(4),
        &:last-child {
          width: 28px;
        }
      }
    }
  }
  .btngroup {
    display: flex;
    margin-bottom: 20px;
    max-width: 500px;
    > button {
      margin-right: 10px;
    }
  }
}
.process {
  margin-top: 15px;
  p {
    font-size: 15px;
    font-weight: bold;
  }
  li {
    display: flex;
    span {
      width: 14.3%;
      margin: 5px 10px;
      cursor: pointer;
      &:last-child {
        line-height: 32px;
      }
      i {
        font-size: 18px;
        &:last-child {
          color: red;
          margin-left: 10px;
        }
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