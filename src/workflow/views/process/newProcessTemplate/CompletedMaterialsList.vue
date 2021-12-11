<template>
  <div class="completedMaterialsList">
    <a-button @click="openEditModal" style="margin:15px 0;" type="primary">编辑</a-button>
    <a-table
      :columns="columns"
      :dataSource="data"
      :rowKey="record=>record.id"
      :pagination="pagination"
      @change="handleTableChange"
    ></a-table>
    <a-modal
      title="编辑材料清单"
      :visible="visible"
      @cancel="visible=false"
      :footer="null"
      width="60%"
      class="materials-modal"
      :bodyStyle="{padding:'0','max-height':'700px','overflow':'auto'}"
    >
      <div class="materials-list-wrap">
        <a-button @click="addMaterials" style="margin:15px 0;" type="primary">增加</a-button>
        <a-table
          :columns="listcolumns"
          :dataSource="list"
          :rowKey="record=>record.id"
          :pagination="listpagination"
          @change="listChange"
        >
          <template slot="operation" slot-scope="text, record">
            <div style="display:flex;flex-wrap:nowrap;">
              <span @click="openEdit(record)" style="color:skyblue;cursor:pointer;">编辑</span>
              <span @click="sort(record.id)" style="color:skyblue;margin:0 10px;cursor:pointer;">排序</span>
              <a-popconfirm title="确定删除这条材料吗?" @confirm="del(record)" okText="确定" cancelText="取消">
                <span style="color:red;cursor:pointer;">删除</span>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
      <div class="materials-btns">
        <a-button @click="publishMaterial">发布</a-button>
        <a-button @click="save">保存</a-button>
      </div>
    </a-modal>
    <!-- 编辑/保存材料 -->
    <a-modal :title="type?'新增材料':'编辑材料'" :visible="materialsvisible" @ok="handleOk" @cancel="reset">
      <a-form :form="form">
        <a-form-item label="材料名称" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-input
            :maxlength="30"
            placeholder="请输入材料名称"
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写材料名称!` }],
          initialValue: formData.name}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="类型" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-select
            placeholder="--请选择--"
            @change="changeType"
            v-decorator="[
           `type`,
          {rules: [{ required: true,message:  `请选择类型!`}],
          initialValue: formData.type}
        ]"
          >
            <a-select-option
              v-for="(item,index) in typeList"
              :key="index"
              :value="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="flag==2?'关联页面':'关联文件'"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 14}"
        >
          <a-select
            placeholder="--请选择--"
            v-decorator="[
           `relateid`,
          {rules: [{ required: true,message:  `请选择关联的页面/文件!`}],
          initialValue: formData.relateid}
        ]"
          >
            <template v-if="fileList[0] && fileList[0].label">
              <a-select-opt-group v-for="(obj,i) in fileList" :key="i" :label="obj.label">
                <a-select-option
                  v-for="(val,j) in obj.data"
                  :key="j"
                  :value="val.value"
                >{{val.text}}</a-select-option>
              </a-select-opt-group>
            </template>
            <template v-else>
              <a-select-option
                :label="obj.value"
                v-for="obj in fileList"
                :key="obj.value"
              >{{obj.text}}</a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 材料排序 -->
    <a-modal title="排序" :visible="sortvisible" @ok="sortOk" @cancel="sortCancle" width="400px">
      <a-radio-group v-model="sorttype" @change="changeSortType">
        <a-radio :style="radioStyle" :value="1">调到最前</a-radio>
        <a-radio :style="radioStyle" :value="2">调到最后</a-radio>
        <a-radio :style="radioStyle" :value="3">
          调到
          <a-select
            :disabled="sorttype==3?false:true"
            placeholder="需要排到的材料"
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
import {
  getAttachmentList,
  getPdfList,
  publish,
  queryList,
  querypublishlist,
  save,
  saveorder,
  deleteMaterial,
  queryTracList
} from "@/workflow/api/material";
import { getForm } from "@/workflow/api/pdfsetting";
import { showError } from "@/framework/utils/index";
import {
  Button,
  Table,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Select,
  Radio,
  Popconfirm
} from "ant-design-vue";
const columns = [
  {
    title: "材料名称",
    dataIndex: "name",
    width: "30%"
  },
  {
    title: "类型",
    dataIndex: "typename",
    width: "30%"
  },
  {
    title: "关联",
    dataIndex: "relatename",
    width: "40%"
  }
];
const listcolumns = [
  {
    title: "材料名称",
    dataIndex: "name",
    width: "30%"
  },
  {
    title: "类型",
    dataIndex: "typename",
    width: "15%"
  },
  {
    title: "关联",
    dataIndex: "relatename",
    width: "30%"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "15%",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  components: {
    AButton: Button,
    ATable: Table,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AModal: Modal,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    APopconfirm: Popconfirm,
    ASelectOptGroup: Select.OptGroup
  },
  data() {
    return {
      columns,
      data: [],
      id: parseInt(this.$route.query.modelInstanceId),
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      visible: false,
      list: [],
      listcolumns,
      listpagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      materialsvisible: false,
      type: true,
      form: this.$form.createForm(this),
      formData: {
        name: "",
        type: undefined,
        relateid: undefined
      },
      typeList: [
        { value: 1, text: "PDF" },
        { value: 2, text: "电子表单" },
        { value: 3, text: "附件" }
      ],
      fileList: [],
      nowid: undefined,
      flag: undefined,
      //排序
      sortvisible: false,
      sorttype: undefined,
      sortList: [],
      afterId: undefined,
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px"
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getPublishedList();
  },
  methods: {
    //获取已发布列表
    getPublishedList() {
      let query = {};
      query.modelInstanceId = this.id;
      query.needtotal = true;
      query.pagenum = this.pagination.current;
      query.pagesize = this.pagination.pagesize;
      querypublishlist(query)
        .then(res => {
          this.data = res.result.rows;
          this.pagination.total = res.result.total;
        })
        .catch(err => {
          showError(err);
        });
    },
    //打开编辑列表弹框
    openEditModal() {
      this.visible = true;
      this.getEditList();
    },
    //获取编辑列表
    getEditList() {
      let query = {};
      query.modelInstanceId = this.id;
      query.needtotal = true;
      query.pagenum = this.listpagination.current;
      query.pagesize = this.listpagination.pagesize;
      queryList(query)
        .then(res => {
          this.list = res.result.rows;
          this.listpagination.total = res.result.total;
        })
        .catch(err => {
          showError(err);
        });
    },
    //更改类型
    changeType(val) {
      this.form.resetFields(["relateid"]);
      this.formData.relateid = undefined;
      this.getTypeChangeList(val);
    },
    //更改类型，获取对应下拉框的值
    getTypeChangeList(val) {
      this.flag = val;
      switch (val) {
        case 1:
          this.getPdf();
          break;
        case 2:
          this.getFormList();
          break;
        case 3:
          this.getfile();
          break;
      }
    },
    //获取附件列表
    getfile() {
      getAttachmentList(this.id)
        .then(res => {
          this.fileList = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取pdf列表
    getPdf() {
      getPdfList(this.id)
        .then(res => {
          this.fileList = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取表单
    getFormList() {
      getForm(this.id)
        .then(res => {
          this.fileList = [];
          //判断下拉选项是否需要分组
          let optionObj = {};
          res.result.forEach(item => {
            if (item.group) {
              if (!optionObj[item.group]) {
                this.$set(optionObj, item.group, []);
                optionObj[item.group].push(item);
              } else {
                optionObj[item.group].push({
                  text: item.text,
                  value: item.value
                });
              }
            } else {
              this.fileList.push(item);
            }
          });
          for (var obj in optionObj) {
            this.fileList.push({
              label: obj,
              data: optionObj[obj]
            });
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //编辑
    openEdit(record) {
      this.nowid = record.id;
      this.type = false;
      this.materialsvisible = true;
      this.getTypeChangeList(record.type);
      this.formData = {
        name: record.name,
        type: record.type,
        relateid: record.relateid ? record.relateid : record.relatecode
      };
    },
    //排序
    sort(id) {
      this.nowid = id;
      this.afterId = undefined;
      this.sorttype = undefined;
      this.sortvisible = true;
    },
    sortOk() {
      if (this.sorttype == 3 && !this.afterId) {
        this.$message.error("必须选择排到的位置！");
        return;
      }
      let query = {};
      query.type = this.sorttype;
      query.id = this.nowid;
      if (this.sorttype == 3) {
        query.afterId = this.afterId;
      }
      saveorder(query)
        .then(res => {
          this.$message.success("流程排序成功！");
          this.getEditList(this.searchkey);
          this.sortvisible = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    sortCancle() {
      this.sortvisible = false;
    },
    changeSortType() {
      this.afterId = undefined;
      if (this.sorttype == "3") {
        this.getSortList();
      }
    },
    getSortList() {
      if (this.sortList.length == 0) {
        queryTracList(this.id)
          .then(res => {
            this.sortList = res.result;
          })
          .catch(err => {
            showError(err);
          });
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //删除
    del(record) {
      deleteMaterial(record.id)
        .then(res => {
          this.$message.success(record.name + "已经成功删除！");
          this.getEditList();
        })
        .catch(err => {
          showError(err);
        });
    },
    //打开新增
    addMaterials() {
      this.type = true;
      this.materialsvisible = true;
    },
    //材料信息保存
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = {};
          obj.modelinstanceid = this.id;
          obj.name = values.name;
          obj.type = values.type;
          if (values.type == 3) {
            obj.relatecode = values.relateid;
          } else {
            obj.relateid = values.relateid;
          }
          if (!this.type) {
            obj.id = this.nowid;
          }
          save(obj)
            .then(res => {
              if (this.type) {
                this.$message.success("材料新增成功！");
              } else {
                this.$message.success("材料更新成功！");
              }
              this.reset();
              this.getEditList();
            })
            .catch(error => {
              showError(error);
            });
        }
      });
    },
    //清空表单
    reset() {
      this.materialsvisible = false;
      this.form.resetFields();
      this.fileList = [];
      this.pdfList = [];
      this.formData = {
        name: "",
        type: undefined,
        relateid: undefined
      };
    },
    //发布
    publishMaterial() {
      publish(this.id)
        .then(res => {
          this.$message.success("发布成功！");
          this.visible = false;
          this.getPublishedList();
        })
        .catch(err => {
          showError(err);
        });
    },
    //保存
    save() {
      this.visible = false;
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getPublishedList();
    },
    listChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.listpagination = pager;
      this.getEditList();
    }
  }
};
</script>
<style lang="less" scoped>
.completedMaterialsList {
  width: 80%;
  margin: 0 auto;
}
.materials-modal {
  .materials-list-wrap {
    padding: 0 24px 24px 24px;
  }
  .materials-btns {
    text-align: center;
    border-top: 1px solid #ddd;
    padding: 10px 0;
    button {
      margin: 0 20px;
    }
  }
}
/deep/ .ant-select-dropdown-menu-item-group-title {
  font-size: 14px;
  color: #534848;
  font-weight: bold;
}
</style>