<template>
  <div class="org-record-info-base">
    <a-form :form="form" @submit.prevent="handleSubmit">
      <template v-if="isDelete(record)">
        <a-row :gutter="20" v-if="record.subjects.length == 1">
          <a-col :span="24">
            <a-form-item label="历史文档接收单位">
              <a-input
                v-decorator="['data.name', {initialValue: record.data && record.data.name}]"
                :read-only="true"
                allowClear
                @change="onOrgChange(false, $event.target.value)"
              >
                <a-icon slot="addonAfter" type="select" @click="openSelectOrg(false)"/>
              </a-input>
              <a-input type="hidden" v-decorator="['data._id', {initialValue: record.data && record.data._id}]"/>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template v-else>
        <a-row :gutter="20" v-if="isCreateOrReset(record)">
          <a-col :span="8">
            <a-form-item label="单位类型">
              <dict-select dict="usermanage.org.unittype" 
                v-decorator="['data.unittype', {
                  rules: [
                    {required: true, message: '请选择单位类型'},
                  ],
                  initialValue: record.data && record.data.unittype,
                }]"
                :disabled="record.status != 0"
                @change="changeUnittype"
              /><!-- 记录未提交单位类型允许修改或 -->
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="主管部门">
              <a-input
                v-decorator="['data.suporg.name', {
                  initialValue: record.data && record.data.suporg && record.data.suporg.name,
                }]"
                :read-only="true"
                allowClear
                @change="onOrgChange(true, $event.target.value)"
              >
                <a-icon slot="addonAfter" type="select" @click="openSelectOrg(true)"/>
              </a-input>
              <a-input type="hidden"  v-decorator="['data.suporg._id', {
                initialValue: record.data && record.data.suporg && record.data.suporg._id,
              }]"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="!record.orgid">
            <a-form-item label="所在组织目录">
              <a-input v-model="pnodename" :read-only="true">
                <a-icon slot="addonAfter" type="select"  @click="showSelectTreeNode=true"/>
              </a-input>
              <a-input type="hidden"
                v-decorator="['pnodeid', {
                  rules: [
                    {required: true, message: '请选择组织目录'},
                  ],
                }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <template>
          <a-row :gutter="20">
            <a-col :span="16">
              <a-form-item label="机构名称">
                <a-input
                  v-decorator="['data.name', {
                    rules: [
                      {required: true, message: '请填写机构名称'},
                    ],
                    initialValue: (record.data && record.data.name) || record.orgname,
                  }]"
                  @blur="syncOrgName"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="规范简称">
                <a-input 
                  v-decorator="['data.shortname', {
                    initialValue: record.data && record.data.shortname,
                  }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="挂牌机构">
            <a-input placeholder="多个名称之间顿号隔开" 
              v-decorator="['data.attachname', {
                initialValue: record.data && record.data.attachname,
              }]"
            />
          </a-form-item>
          <a-form-item label="合署机构">
            <a-input placeholder="多个名称之间顿号隔开" 
              v-decorator="['data.unionname', {
                initialValue: record.data && record.data.unionname,
              }]"
            />
          </a-form-item>
          <a-form-item label="挂牌合署机构简称">
            <a-input placeholder="多个名称之间顿号隔开" 
              v-decorator="['data.othershortname', {
                initialValue: record.data && record.data.othershortname,
              }]"
            />
          </a-form-item>
        </template>
        <a-row :gutter="20">
          <a-col :span="6">
            <a-form-item label="经费形式">
              <dict-select dict="usermanage.org.fundform"
                :allowClear="true"
                v-decorator="['data.fundform', {
                  initialValue: record.data && record.data.fundform,
                }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6"><!-- 事业单位分类和名称一样 -->
            <a-form-item label="事业单位分类">
              <dict-select dict="usermanage.org.institutionssort"
                :allowClear="true"
                v-decorator="['data.institutionssort', {
                  initialValue: record.data && record.data.institutionssort,
                }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="机构级别">
              <dict-select dict="usermanage.org.politicallevel"
                :allowClear="true"
                v-decorator="['data.politicallevel', {
                  initialValue: record.data && record.data.politicallevel,
                }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="批准内设机构数">
              <a-input-number
                :min="0"
                :max="50"
                style="width:100%"
                v-decorator="['data.ratedsubcount', {
                  initialValue: record.data && record.data.ratedsubcount,
                }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="6">
            <a-form-item label="核定人员编制控制数">
              <a-input-number
                :min="0"
                style="width:100%"
                v-decorator="['data.hdrybzkzs', {
                  initialValue: record.data && record.data.hdrybzkzs,
                }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="辅助岗位定员数">
              <a-input-number
                :min="0"
                style="width:100%"
                v-decorator="['data.fzgwdys', {
                  initialValue: record.data && record.data.fzgwdys,
                }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="20">
          <a-col :span="24">
            <a-form-item label="主要职责">
              <vue-editor v-model="funcdesc"></vue-editor>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item label="摘要">
            <a-textarea
              :autoSize="{ minRows: 2, maxRows: 6 }" 
              v-decorator="['desc', {
                initialValue: record.desc,
              }]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="20">
        <a-col :span="24">
          <a-form-item label="关键词">
            <a-input class="keywords-input" v-model="keyword">
              <a-icon slot="addonAfter" type="plus" @click="addKeyword" />
            </a-input>
            <div v-for="(item, index) in keywords" :key="index" class="keywords-item">
              {{item}}
              <a-icon type="close" class="remove" @click="removeKeyWord(item, index)" />
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal
      v-model="showSelectTreeNode"
      title="选择组织目录"
      :footer="null"
      :width="500"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <org-user-select mode="orgtree" @finish="onTreeNodeSelected" />
    </a-modal>
    <a-modal
      v-model="showSelectOrg"
      title="选择单位"
      :footer="null"
      :width="500"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <org-user-select mode="org" @finish="onOrgSelected" />
    </a-modal>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Modal,
  Icon
} from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import VueEditor from "@/framework/components/VueEditor";
import DictSelect from "@/framework/components/DictSelect";

export default {
  props: ["record"],
  components: {
    ARow: Row,
    ACol: Col,
    AIcon: Icon,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputGroup: Input.Group,
    ATextarea: Input.TextArea,
    AInputNumber: InputNumber,
    ADatePicker: DatePicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    AModal: Modal,
    OrgUserSelect,
    DictSelect,
    VueEditor
  },
  data() {
    return {
      form: undefined,
      showSelectTreeNode: false,
      selectSuporg: undefined,
      showSelectOrg: false,
      pnodename: undefined,
      funcdesc: undefined,
      keyword: undefined,
      keywords: [],
    };
  },
  created() {
    this.form = this.$form.createForm(this, {});
    //基本信息不修改原值，只提交根据主题词需要变更的数据
    let ks = this.record.keywords;
    if(ks){
      this.keywords = [...ks];
    }
    this.funcdesc = this.record.funcdesc;
  },
  watch: {
    record(){
      let ks = this.record.keywords;
      if(ks){
        this.keywords = [...ks];
      }
      this.funcdesc = this.record.funcdesc;
    },
  },
  methods: {
    validateFields() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((error, values) => {
          if(error){
            let data = error.data, message;
            try{
              message = data[Object.keys(data)[0]].errors[0].message;//获取第一个错误
            }catch(e){
              //ignore
            }
            reject({code: 'form_validate_fail', message: message || '表单验证失败'});
          }else{
            values.funcdesc = this.funcdesc;
            values.keywords = this.keywords;
            if(values.data && values.data.suporg && !values.data.suporg._id){
              values.data.suporg = null;
            }
            resolve(values);
          }
        });
      })
    },
    syncOrgName(e){
      let orgname = e.target.value;
      if(orgname){
        this.record.orgname = orgname;
      }
    },
    changeUnittype(v){
      if(this.record.data){
        this.$set(this.record.data, 'unittype', v)
      }else{
        this.$set(this.record, 'data', {unittype: v});
      }
    },
    onTreeNodeSelected(type, list) {
      this.showSelectTreeNode = false;
      if (type == "ok" && list.length) {
        let { id, name } = list[0];
        this.pnodename = name;
        this.form.setFieldsValue({ 'pnodeid': id });
      }
    },
    openSelectOrg(suporg){
      this.showSelectOrg = true;
      this.selectSuporg = suporg;
    },
    onOrgSelected(type, list) {
      this.showSelectOrg = false;
      if (type == "ok" && list.length) {
        let { _id, name } = list[0];
        if(this.selectSuporg){
          this.form.setFieldsValue({ 'data.suporg._id': _id, 'data.suporg.name': name });
        }else{
          this.form.setFieldsValue({ 'data._id': _id, 'data.name': name });
        }
      }
    },
    onOrgChange(suporg, value){
      if(value){
        return;
      }
      if(suporg){
        //主管单位删除时，删除表单中主管单位ID
        this.form.setFieldsValue({ 'data.suporg._id': undefined, 'data.suporg.name': undefined });
      }else{
        //历史文档接收单位删除时，删除表单中历史文档接收单位ID
        this.form.setFieldsValue({ 'data._id': undefined });
      }
    },
    addKeyword() {
      if (!this.keyword) {
        return;
      }
      if (this.keywords && this.keywords.indexOf(this.keyword) >= 0) {
        this.$notification.info({ message: '关键词已存在', duration: 2 })
        return;
      }
      this.keywords.push(this.keyword);
      this.keyword = null;
    },
    removeKeyWord(k, index) {
      this.keywords.splice(index, 1);
    },
    isCreateOrReset(record) {
      let subjects = record.subjects;
      if (subjects && subjects.length) {
        return subjects.indexOf(3) >= 0 || subjects.indexOf(4) >= 0;
      }
      return false;
    },
    isDelete(record) {//单独撤销
      let subjects = record.subjects;
      if (subjects && subjects.length) {
        return subjects.indexOf(6) >= 0;
      }
      return false;
    },
    nameEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/更名/ 可以编辑机构所有名称简称
      return (record.subjects || []).some(item => [3, 4, 11, 8, 7].indexOf(item) >= 0);
    },
    fundformEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/经费形式变动 可以编辑机构级别
      return (record.subjects || []).some(item => [3, 4, 11, 8, 12].indexOf(item) >= 0);
    },
    plevelEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/级别变动 可以编辑经费形式
      return (record.subjects || []).some(item => [3, 4, 11, 8, 14].indexOf(item) >= 0);
    },
    funcdescEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/职能变动 可以编辑机构级别
      return (record.subjects || []).some(item => [3, 4, 11, 8, 15].indexOf(item) >= 0);
    },
  }
};
</script>
<style lang="less" scoped>
.org-record-info-base {
  .keywords-input {
    width: 33%;
    margin: 0 12px 5px 0;
    float: left;
    /deep/.ant-input-group-addon {
      cursor: pointer;
      &:hover {
        color: @primary-color;
      }
    }
  }
  .keywords-item {
    float: left;
    max-width: 100%;
    position: relative;
    margin: 0 8px 5px 0;
    padding: 0 12px 0 8px;
    line-height: 32px;
    background: #e8e8e8;
    border-radius: @border-radius-base;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
</style>