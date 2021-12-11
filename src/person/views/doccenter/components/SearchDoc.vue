<template>
  <div class="main">
    <a-modal
      :visible="searchvisible"
      title="文件详情"
      :width="800"
      :bodyStyle="bodyStyle"
      destroyOnClose
      okText="确定"
      cancelText="取消"
      @cancel="searchCancel"
      @ok="searchCreate"
    >
      <a-form layout="horizontal" :form="form">
        <a-row :gutter="24" class="fatherbox">
          <a-form-item label="发文字号" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-input
              disabled
              v-decorator="['num', { initialValue: searchDetail.num||'', rules: [{ required: false, message: '请填写正确的发文字号' }] }]"
              type="text"
            />
          </a-form-item>
        </a-row>
        <a-row :gutter="24" class="fatherbox">
          <a-form-item label="文件标题" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-input
              v-decorator="['title', {    
              initialValue: searchDetail.title||'',
              rules: [{ required: false, message: '请填写正确的文件标题' }] }]"
              placeholder="请填写文件标题"
            />
          </a-form-item>
        </a-row>
        <a-row :gutter="24" class="fatherbox">
          <a-form-item label="文件来源" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-select
              v-decorator="['level',{initialValue: searchDetail.level||'',}]"
              placeholder="请选择文件来源"
              style="width: 100%"
            >
              <a-select-option
                v-for="(item,index) in levelList"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-row>
        <a-row :gutter="24" class="fatherbox">
          <a-form-item label="发文时间" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-date-picker
              disabled
              v-decorator="['dispatchdate', {initialValue: searchDetail.dispatchdate||'', rules: [{ required: false, message: '请选择发文时间' }] }]"
              :format="dateFormat"
              style="width: 100%"
            />
          </a-form-item>
        </a-row>
        <a-row :gutter="24" class="fatherbox" style="flex-direction: column;">
          <div v-if="!([1,3,4].includes(this.searchDetail.type))">
            <a-form-item
              v-bind="formItemLayoutWithOutLabel"
              class="formcss"
              label="相关单位"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
            >
              <div v-for="(item,index) in searchDetail.orgs" :key="index">
                <a-input :value="item.orgname" placeholder="请选择相关单位" class="inputcss" />
                <a-icon
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  @click="() => remove(index)"
                />
              </div>
              <a-button type="dashed" @click="addCompany" style="width:100%">
                <a-icon type="plus" />添加单位
              </a-button>
            </a-form-item>
          </div>
          <!-- 编外文件 -->
          <div v-if="([4].includes(this.searchDetail.type))">
            <a-form-item
              v-bind="formItemLayoutWithOutLabel"
              label="相关单位"
              class="formcss"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
            >
              <div v-for="(item,index) in searchDetail.orgs" :key="index">
                <a-input :value="item.orgname" placeholder="请选择相关单位" class="inputcss" />
                <a-icon
                  v-if="searchDetail.orgs.length > 1"
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  @click="() => remove(index)"
                />
              </div>
              <a-button type="dashed" @click="addCompany" style="width:100%">
                <a-icon type="plus" />添加单位
              </a-button>
            </a-form-item>
          </div>
          <div v-if="([1].includes(this.searchDetail.type))">
            <a-form-item
              v-if="searchDetail.orgs.length>0"
              v-bind="formItemLayoutWithOutLabel"
              label="相关单位"
              class="formcss"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
            >
              <div v-for="(item,index) in searchDetail.orgs" :key="index">
                <a-input :value="item.orgname" placeholder="请选择相关单位" disabled class="inputcss" />
              </div>
            </a-form-item>
          </div>
        </a-row>
        <a-row :gutter="24" class="fatherbox" style="display: flex;flex-direction: column;">
          <a-form-item
            label="关键字"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 21 }"
            style="margin-left:77px"
          >
            <a-input v-model="nowkeyword" style="width: 80%" />
            <a-button @click="addkeyword" style="width: 15%;margin-left:5%">添加</a-button>
            <div class="selected-data">
              <ul>
                <li v-for="(item, index) in searchDetail.keywords" :key="index">
                  <div class="item">
                    {{item}}
                    <a-icon type="close" class="remove" @click="deleteKeyWord(index)" />
                  </div>
                </li>
              </ul>
            </div>
          </a-form-item>
        </a-row>
        <a-row :gutter="24" class="fatherbox">
          <a-form-item label="文件上传" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <div class="storage-upload" @click="trigger">
              <span class="spanicon">
                <a-icon type="upload" class="iconstyle" />点击上传
              </span>
              <span class="spanname">{{docData.fileName}}</span>
            </div>
            <input
              type="file"
              ref="fileBtn"
              class="fileBtn"
              @change="getFile($event)"
              multiple="multiple"
            />
          </a-form-item>
        </a-row>
      </a-form>
    </a-modal>
    <!--组织选择-->
    <a-modal
      title="单位选择"
      v-model="orgVisible"
      :footer="null"
      :width="800"
      :bodyStyle="{height:'600px',padding:'0'}"
    >
      <org-user-select mode="org" :max-select="100" :root-selectable="true" :selected="selected" @finish="selectOrg" />
    </a-modal>
  </div>
</template>
<script>
import moment from "moment";
import { updatedoc } from "@/person/api/document";
import { upload } from "@/framework/api/file";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import {
  Modal,
  Form,
  Row,
  Input,
  Button,
  Icon,
  DatePicker,
  Select
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    AInput: Input,
    AButton: Button,
    AIcon: Icon,
    ADatePicker: DatePicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    OrgUserSelect
  },
  data() {
    return {
      levelList: [
        {
          id: 1,
          name: "上级文件"
        },
        {
          id: 2,
          name: "本级文件"
        }
      ],
      selected: [],
      orgVisible: false,
      keywords: [],
      nowkeyword: "",
      title: "基本信息",
      dateFormat: "YYYY-MM-DD",
      bodyStyle: {
        overflow: "auto",
        height: "400px",
        padding: "8px 24px"
      },
      docData: {
        fileid: null,
        fileName: null,
        fileuri: null
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    };
  },
  watch: {
    selected: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          if (oldValue[i] != newValue[i]) {
          }
        }
      },
      deep: true
    },
    searchDetail: function(newVal, oldVal) {
      let that = this;
      if (newVal.orgs.length == 0) {
        that.selected = [];
      } else {
        let orgsarr = [];
        newVal.orgs.forEach(function(item) {
          orgsarr.push({
            orgid: item.orgid,
            orgname: item.orgname,
            name: item.orgname
          });
        });
        that.searchDetail.orgs = orgsarr;
        that.selected = that.searchDetail.orgs;
      }
    }
  },
  props: ["searchvisible", "searchDetail"],
  created() {},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", {
      initialValue: [],
      preserve: true
    });
  },
  methods: {
    getFile(event) {
      let file = event.target.files[0];
      upload(file)
        .then(res => {
          this.docData.fileuri = res.data.result;
          //截取有效字段
          let indexleft = res.data.result.indexOf("=");
          let fileName = res.data.result.substring(
            indexleft + 1,
            res.data.result.length
          );
          this.docData.fileName = decodeURIComponent(fileName);
          this.$notification.success({
            message: "提示",
            description: "文件上传成功!",
            duration: 3
          });
        })
        .catch(error => {
          showError(error);
        });
    },
    trigger() {
      this.$refs.fileBtn.value = null;
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    onChange(value) {},
    addkeyword() {
      if (!this.nowkeyword || !this.nowkeyword.trim()) return;
      if (this.searchDetail.keywords) {
        if (this.searchDetail.keywords.indexOf(this.nowkeyword) !== -1) return;
        if (this.nowkeyword != "") {
          this.searchDetail.keywords.push(this.nowkeyword);
          this.nowkeyword = "";
        }
      } else {
        if (this.nowkeyword != "") {
          this.searchDetail.keywords = [];
          this.searchDetail.keywords.push(this.nowkeyword);
          this.nowkeyword = "";
        }
      }
    },
    deleteKeyWord(i) {
      this.searchDetail.keywords.splice(i, 1);
    },
    OrgModelShow() {
      this.orgVisible = true;
    },
    //确定选择的机构
    selectOrg(type, list) {
      this.orgVisible = false;
      if (type == "ok") {
        let orgarr = [];
        list.forEach(function(item) {
          orgarr.push({
            orgid: item._id,
            orgname: item.name,
            name: item.name
          });
        });
        this.searchDetail.orgs = orgarr;
        this.selected = this.searchDetail.orgs;
      }
    },
    addCompany() {
      let id = 0;
      const keys = this.form.getFieldValue("keys");
      const nextKeys = keys.concat(id++);
      this.OrgModelShow();
      this.form.setFieldsValue({
        keys: nextKeys
      });
    },
    remove(index) {
      this.searchDetail.orgs.splice(index, 1);
    },
    searchCreate() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let id = this.searchDetail.id;
          let fileuri = this.docData.fileuri
            ? this.docData.fileuri
            : this.searchDetail.fileuri;
          let keywords = this.searchDetail.keywords
            ? this.searchDetail.keywords
            : [];
          let orgs = this.searchDetail.orgs ? this.searchDetail.orgs : [];
          let obj = {};
          obj.dispatchdate = values.dispatchdate
            ? moment(values.dispatchdate).format("YYYY-MM-DD")
            : "";
          obj.num = this.searchDetail.num;
          obj.id = id;
          obj.fileuri = fileuri;
          obj.title = values.title;
          obj.orgs = [...orgs];
          obj.level = values.level;
          obj.keywords = [...keywords];
          obj.type = values.type ? values.type : null;
          updatedoc(id, obj)
            .then(res => {
              this.$notification.success({
                message: "提示",
                description: "编辑成功!",
                duration: 3
              });
              this.$emit("closeModal");
            })
            .catch(err => {
              showError(err);
            });
        }
      });
    },
    searchCancel() {
      this.selected = [];
      this.$emit("closeModal");
    }
  }
};
</script>
<style lang="less" scoped>
.ant-form {
  /deep/.ant-col-sm-offset-4 {
    margin-left: 0;
  }
  /deep/.ant-col-sm-20 {
    margin-left: 87px;
  }
  .item-name {
    line-height: 40px;
    float: right;
    font-size: 14px;
  }
  .ant-form-item {
    width: 80%;
    float: left;
    margin-bottom: 8px;
  }
  .fileBtn {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
  .org-btn {
    float: left;
    .anticon {
      cursor: pointer;
      font-size: 16px;
      line-height: 40px;
      padding-left: 10px;
    }
  }
}
/deep/.ant-input-group-wrapper :first-child {
  border-radius: 0;
  .ant-input {
    border-width: 1px 0;
  }
  .ant-input-group-addon {
    border-width: 1px 0;
  }
}
/deep/.ant-input-group-wrapper :last-child {
  border-radius: 0 4px 4px 0;
  .ant-input {
    border-width: 1px 0;
  }
  .ant-input-group-addon {
    border-right-width: 1px;
  }
}
.dynamic-delete-button {
  position: absolute;
  margin: 8px;
  cursor: pointer;
  font-size: 24px;
  color: @primary-color;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.selected-data {
  height: 100%;
  overflow-y: auto;
  ul {
    margin: 0;
    overflow: hidden;
  }
  li {
    float: left;
    padding: 4px;
    max-width: 100%;
    .item {
      position: relative;
      padding: 6px 12px 6px 8px;
      line-height: 1.4em;
      background: #e8e8e8;
      border-radius: @border-radius-base;
      cursor: pointer;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      i {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 10px;
        padding: 1px 1px 3px 3px;
        border-top-right-radius: @border-radius-base;
        border-bottom-left-radius: 10px;
        // background: rgba(#d3d2d2, 0.6);
      }
      & i:hover {
        color: @error-color;
      }
    }
  }
}
.inputcss {
  width: 100%;
}
.formcss {
  margin-left: 77px;
}
.fatherbox {
  display: flex;
  justify-content: center;
  .spanicon {
    float: left;
    width: 75px;
    cursor: pointer;
    .iconstyle {
      color: @primary-color;
    }
  }
  .spanname {
    float: left;
    padding-left: 15px;
    width: 180px;
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.form_item {
  // margin-left: 94px;
  margin-left: 20%;
}
.keyword-text {
  border-radius: 3px;
  background-color: #d3d3d3;
  color: #000;
  line-height: 30px;
  padding: 5px 10px;
  margin: 0 5px;
}
</style>