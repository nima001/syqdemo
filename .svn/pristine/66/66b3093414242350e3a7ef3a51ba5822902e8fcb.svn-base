<template>
  <div>
    <a-form :form="form" @submit="handleSearch" :layout="formLayout">
      <a-row>
        <a-col class="bar">基本信息</a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="姓名">
            <a-input
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入姓名!',
                    },
                  ],
                },
              ]"
              placeholder="姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="性别">
            <dict-select dict="usermanage.user.sex"
              :allowClear="true"
              v-decorator="[
                    'sex',
                    { rules: [{ required: false, message: '请选择性别!' }]},
                ]"
              placeholder="性别"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{display:'none'}">
          <a-form-item label="头像">
            <a-input v-decorator="['profilephoto']" />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{height:'93px'}">
          <div class="uploadimg-wrap" @click="trigger">
            <img :src="profilephoto" v-if="profilephoto" />
            <img v-else src="@/person/assets/img/head-default-70x98.jpg" />
          </div>
          <input
            type="file"
            ref="fileBtn"
            class="fileBtn"
            accept="image/*"
            @change="getFile($event)"
            multiple="multiple"
            :style="{display:'none'}"
          />
        </a-col>
        <a-col :span="8">
          <a-form-item label="出生日期">
            <a-date-picker
              v-decorator="['birthday', {rules: [{ type: 'object', required: true, message: '请选择出生日期!' }]}]"
              placeholder="出生日期"
              :style="{width:'100%'}"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <!---身份证 护照-->
          <a-form-item label="证件类型">
            <a-select
              @change="papersChange"
              v-decorator="[
                    'cardType',
                    { rules: [{ required: true, message: '请选择证件类型!' }] ,initialValue:'1'},
                ]"
              placeholder="证件类型"
            >
              <a-select-option value="1">身份证</a-select-option>
              <a-select-option value="2">护照</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="身份证" v-if="papersType == 1">
            <a-input
              v-decorator="[
                'idcard',
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入身份证号码!',
                    },
                  ],
                },
              ]"
              placeholder="身份证号码"
            />
          </a-form-item>
          <a-form-item label="护照" v-if="papersType == 2">
            <a-input
              v-decorator="[
                'passport',
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入护照号码!',
                    },
                  ],
                },
              ]"
              placeholder="请输入护照号码"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="婚姻状况">
            <dict-select dict="usermanage.user.maritalstatus"
              :allowClear="true"
              v-decorator="[
                    'maritalstatus',
                    { rules: [{ required: false, message: '请选择婚姻状况!' }]},
                ]"
              placeholder="婚姻状况"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="籍贯">
            <a-input
              v-decorator="[
                'nativeplace',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入籍贯!',
                    },
                  ],
                },
              ]"
              placeholder="籍贯"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="政治面貌">
            <dict-select dict="usermanage.user.politicsface"
              :allowClear="true"
              v-decorator="[
                    'politicsface',
                    { rules: [{ required: true, message: '请选择政治面貌!' }]},
                ]"
              placeholder="政治面貌"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="民族">
            <dict-select dict="usermanage.user.nation"
              :allowClear="true"
              v-decorator="[
                    'nation',
                    { rules: [{ required: true, message: '请选民族!' }]},
                ]"
              placeholder="民族"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="户口所在地">
            <a-input
              v-decorator="[
                'address',
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入户口所在地!',
                    },
                  ],
                },
              ]"
              placeholder="户口所在地"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="详细户籍地">
            <a-input
              v-decorator="[
                'nativeaddress',
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入详细户籍地!',
                    },
                  ],
                },
              ]"
              placeholder="详细户籍地"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <!--模块2-->
      <a-row>
        <a-col class="bar">教育信息</a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="最高学位">
            <dict-select dict="usermanage.user.degree"
              :allowClear="true"
              v-decorator="[
                    'ftdegree',
                    { rules: [{ required: true, message: '请选最高学位!' }]},
                ]"
              placeholder="最高学位"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="全日制专业">
            <a-input
              v-decorator="[
                'ftspecialty',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入全日制专业!',
                    },
                  ],
                },
              ]"
              placeholder="全日制专业"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="最高学历">
            <dict-select dict="usermanage.user.education"
              :allowClear="true"
              v-decorator="[
                    'education',
                    { rules: [{ required: true, message: '请选最高学历!' }]},
                ]"
              placeholder="最高学历"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <!--模块三-->
      <a-row>
        <a-col class="bar">岗位信息</a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="所在单位">
            <a-input
              read-only
              v-decorator="[
                'org',
                { rules: [{ required: false, message: '请输入所在单位!' }] ,initialValue:this.titleList[this.titleList.length - 1].name},
              ]"
              placeholder="所在单位"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="所在科室">
            <a-select
              :allowClear="true"
              v-decorator="[
                    'dept',
                    { rules: [{ required: false, message: '请选所在科室!' }]},
                ]"
              placeholder="所在科室"
            >
              <a-select-option
                v-for="item in deptList"
                :key="item._id"
                :value="item._id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="首次进入单位时间">
            <a-date-picker
              v-decorator="['firstemploytime', {rules: [{ type: 'object', required: true, message: '请选择首次进入单位时间!' }]}]"
              placeholder="首次进入单位时间"
              :style="{width:'100%'}"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="用工形式">
            <dict-select dict="usermanage.user.employform"
              :allowClear="true"
              v-decorator="[
                    'employform',
                    { rules: [{ required: false, message: '请选用工形式!' }]},
                ]"
              placeholder="用工形式"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="人员归类">
            <dict-select dict="usermanage.user.ratedcontrol"
              :allowClear="true"
              v-decorator="[
                    'ratedcontrol',
                    { rules: [{ required: false, message: '请选人员归类!' }]},
                ]"
              placeholder="人员归类"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="岗位类别">
            <dict-select dict="usermanage.user.jobname"
              :allowClear="true"
              v-decorator="[
                    'jobname',
                    { rules: [{ required: false, message: '请选岗位类别!' }]},
                ]"
              placeholder="岗位类别"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="岗位描述">
            <a-input
              v-decorator="[
                'jobmemo',
                {
                  rules: [
                    {
                      required: false,
                      message: '请输入岗位描述!',
                    },
                  ],
                },
              ]"
              placeholder="岗位描述"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <!--合同管理-->
      <a-row>
        <a-col class="bar">合同管理</a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="现聘用（派遣）起始时间">
            <a-date-picker
              v-decorator="['employstartdate', {rules: [{ type: 'object', required: true, message: '请选择现聘用（派遣）起始时间!' }]}]"
              placeholder="现聘用（派遣）起始时间"
              :style="{width:'100%'}"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="现聘用（派遣）终止时间">
            <a-date-picker
              v-decorator="['employenddate', {rules: [{ type: 'object', required: true, message: '请选择现聘用（派遣）终止时间!' }]}]"
              placeholder="现聘用（派遣）终止时间"
              :style="{width:'100%'}"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="现聘用（派遣）单位">
            <a-input
              v-decorator="[
                'employorg',
                {
                  rules: [
                    {
                      required: true,
                      message: '其输入现聘用（派遣）单位!',
                    },
                  ],
                },
              ]"
              placeholder="现聘用（派遣）单位"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form>
  </div>
</template>
<script>
import { uploadImg } from "@/person/api/workflow";
import { orgquery } from "@/person/api/org";
import { createUser } from "@/person/api/user";
import { uiConfigsCookies } from "@/framework/utils/auth";
import {
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Select
} from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";

export default {
  data() {
    return {
      formLayout: "vertical",
      // 证件类型
      profilephoto: null,
      papersType: 1,
      expand: false,
      form: this.$form.createForm(this),
      deptList: []
    };
  },
  props: {
    titleList: {
      type: Array,
      required: true
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ADatePicker: DatePicker,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    DictSelect
  },
  created() {
    let id = this.titleList[this.titleList.length - 1]["data"]["_id"];
    orgquery({
      suporgid: id,
      unittypes: [9],//查询内设等指定单位
      pagesize: 50,//FIXME 内设科室暂定最多50条
    }).then(({result}) => {
      this.deptList = result.rows;
    })
  },
  methods: {
    papersChange(value) {
      this.papersType = value;
    },
    trigger() {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    getFile(event) {
      let imgFile = event.target.files[0];
      uploadImg(imgFile)
        .then(res => {
          if (res.code == "success") {
            let url =
              uiConfigsCookies()["api.url"] +
              "/file/v1/download?uri=" +
              decodeURI(res.result);
            this.profilephoto = url;
            this.form.setFieldsValue({
              profilephoto: url
            });
          }
        })
        .catch(error => {
          this.$notification.error({
            message: "提示",
            description: "上传失败",
            duration: 1.5
          });
        });
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if (!error) {
          let data = Object.assign({}, { usertype: 2 }, values, {
            org: this.titleList[this.titleList.length - 1]["data"]["_id"]
          });

          createUser(data)
            .then(res => {
              if (res.code == "success") {
                this.$notification.success({
                  message: "提示",
                  description: "添加成功!",
                  duration: 1.5
                });
                this.$emit("input", false);
              } else {
                this.$notification.error({
                  message: "提示",
                  description: res.message,
                  duration: 1.5
                });
              }
            })
            .catch(error => {
              this.$notification.error({
                message: "提示",
                description: "网络错误!",
                duration: 1.5
              });
            });
        }
      });
    },
    handleReset() {
      this.form.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
form {
  padding: 15px;
}
.bar {
  color: #d60002;
  font-size: 16px;
  text-indent: 12px;
  position: relative;
  margin-bottom: 10px;
  &:before {
    content: "";
    position: absolute;
    width: 4px;
    height: 70%;
    background: #d60002;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
  }
}
.uploadimg-wrap {
  width: 93px;
  height: 93px;
  margin: 0 auto;
  cursor: pointer;
  img {
    max-width: 100%;
  }
}
.ant-btn {
  display: block;
  margin: 0 auto;
}
</style>