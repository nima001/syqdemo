<template>
  <div class="org-record-depts">
    <div class="dept-columns row">
      <div>机构名称</div>
      <div>上级机构</div>
      <div>机构级别</div>
      <div>机构类别</div>
      <div class="opt">操作</div>
    </div>
    <draggable class="dept-list"
      v-if="dataList && dataList.length"
      v-model="dataList" 
      handle='.sort-handle'
      :animation="200"
      ghost-class="ghost"
      @change="onSortChange"
    >
      <transition-group>
        <div v-for="(item, index) in dataList" :key="item.orgid" class="dept-item row">
          <div>
            <a-icon type="menu" class="sort-handle"/>{{item.name}}
          </div>
          <div>
            {{fildSupOrg(item.parentid)}}
          </div>
          <div>
            {{dictText('usermanage.org.politicallevel', item.extra && item.extra.politicallevel)}}
          </div>
          <div>
            {{dictText('usermanage.org.syssort', item.extra && item.extra.syssort)}}
          </div>
          <div class="opt">
            <a @click="editDept(item)">编辑</a>
            <a style="margin-left:10px" @click="deleteDept(item, index)">删除</a>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div v-else style="height: 120px">
      <a-spin v-if="loading" style="width: 100%;margin-top: 40px;"/>
      <empty-data v-else/>
    </div>
    <a-button v-if="!loading" type="dashed" class="add-dept" @click="editDept()">
      <a-icon type="plus" /> 添加内设机构
    </a-button>
    <a-modal v-model="showAdd" title="编辑内设科室" :footer="null" 
      width="60%" :bodyStyle="{ height: '600px', padding: '0'}">
      <div class="org-record-dept-form">
        <a-form class="form" :form="form" @submit.prevent="handleSubmit">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item label="机构名称">
                <a-input v-decorator="['name', { 
                  rules: [
                    { required: true, message: '请填写机构名称' }
                  ],
                  initialValue: dept && dept.name,
                }]"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="上级机构">
                <a-select 
                  allowClear
                  v-decorator="['parentid', { 
                    initialValue: dept && dept.parentid,
                  }]"
                >
                  <a-select-option v-for="item in suporgList" 
                    :key="item.orgid" 
                    :value="item.orgid"
                    :title="item.name"
                  >
                    {{item.name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="挂牌机构">
            <a-input v-decorator="['extra.attachname', {
              initialValue: dept && dept.extra && dept.extra.attachname,
            }]" placeholder="多个名称之间顿号隔开"/>
          </a-form-item>
          <a-form-item label="合署机构">
            <a-input v-decorator="['extra.unionname', {
              initialValue: dept && dept.extra && dept.extra.unionname,
            }]" placeholder="多个名称之间顿号隔开"/>
          </a-form-item>
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item label="机构级别" >
                <dict-select dict="usermanage.org.politicallevel" 
                  v-decorator="['extra.politicallevel', {
                    initialValue: dept && dept.extra && dept.extra.politicallevel,
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="机构类别">
                <dict-select dict="usermanage.org.syssort" 
                  v-decorator="['extra.syssort', {
                    initialValue: dept && dept.extra && dept.extra.syssort,
                  }]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="政法内设机构类别">
                <dict-select dict="usermanage.org.plsyssort" 
                  v-decorator="['extra.plsyssort', {
                    initialValue: dept && dept.extra && dept.extra.plsyssort,
                  }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="主要职责" style="margin-bottom:0"/>
          <vue-editor v-model="funcdesc" />
          <div class="footer">
            <a-button type="primary" html-type="submit">确定</a-button>
          </div>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { Table, Button, Icon, Modal, Spin, Form, Input, Row, Col, Select} from "ant-design-vue";
import EmptyData from "@/framework/components/EmptyData";
import VueEditor from "@/framework/components/VueEditor";
import DictSelect from "@/framework/components/DictSelect";
import draggable from "vuedraggable";
import { showError } from "@/framework/utils/index";
import { getRecordDepts } from "@/person/api/orgRecord";
import assign from 'lodash/assign';

export default {
  props: {
    record: Object,
  },
  components: {
    AModal: Modal,
    ATable: Table,
    AButton: Button,
    AIcon: Icon,
    ASpin: Spin,
    ARow: Row,
    ACol: Col,
    AForm:Form,
    AFormItem:Form.Item,
    AInput:Input,
    ATextarea: Input.TextArea,
    ASelect: Select,
    ASelectOption: Select.Option,
    DictSelect,
    VueEditor,
    EmptyData,
    draggable
  },
  data() {
    return {
      showAdd: false,
      dept: undefined,
      funcdesc: undefined,
      loading: false,
      dataList: undefined,
      form: this.$form.createForm(this, {}),
    };
  },
  computed:{
    suporgList(){
      return (this.dataList || []).filter(item => !item.parentid && (this.dept == undefined || this.dept.orgid != item.orgid));
    }
  },
  created(){
    this.loadDepts();
  },
  destroyed(){
    //控件销毁清除控件关联的字段
    this.record.deptments = undefined;
  },
  watch:{
    record(){
      this.loadDepts();
    }
  },
  methods: {
    loadDepts(){
      if(!this.record || !this.record.orgid){
        return;
      }
       let {orgid, docid} = this.record;
      this.loading = true;
      getRecordDepts(orgid, docid).then(({result}) => {
        this.loading = false;
        this.record.deptments = result;
        this.dataList = result;
      }).catch(error => {
        showError(error);
      })
    },
    onSortChange(evt){
      //排序变更后列表对象变更重新赋值
      this.record.deptments = this.dataList;
    },
    editDept(dept){
      this.dept = dept;
      this.funcdesc = dept && dept.funcdesc;
      this.form.resetFields();
      this.showAdd = true;
    },
    deleteDept(dept, index){
      this.$confirm({
        title: '提示',
        content: h => `确定删除【${dept.name}】？`,
        onOk: () => {
          if(dept.orgid.startsWith('temp_')){
            this.dataList.splice(index, 1);
          }else{
            //TODO 删除非新建的数据采用标记，可恢复（误删，新建同名保持ID相同）
            this.dataList.splice(index, 1);
          }
          this.dataList.forEach(item => {
            if(item.parentid == dept.orgid){
              item.parentid = undefined;
            }
          });
        },
      });
    },
    handleSubmit(e) {
      this.form.validateFields((error, values) => {
        if(!error){
          if(this.dept){
            assign(this.dept, values);
            this.dept.funcdesc = this.funcdesc;
          }else{
            values.orgid = 'temp_' + new Date().getTime();//拖拽排序需要一个唯一标识
            values.funcdesc = this.funcdesc;
            if(!this.dataList){
              this.dataList = [];
              this.record.deptments = this.dataList;
            }
            this.dataList.push({...values});
          }
          this.showAdd = false;
        }
      });
    },
    fildSupOrg(orgid){
      let org = this.dataList.find(item => item.orgid == orgid);
      return org ? org.name : orgid;
    },
    dictText(dict, value){
      let v = this.$store.getters.dictKey(dict, value);
      return v && v.text;
    }
  }
};
</script>
<style lang="less">
.org-record-depts{
  .row{
    display: flex;
    border-bottom: 1px solid @border-color-base;
    &.dept-columns{
      background: @background-color-light;
      color: fade(@black, 85%);
    }
    & > div{
      flex: 1 1 100%;
      box-sizing: border-box;
      vertical-align: middle;
      padding: @table-padding-vertical @table-padding-horizontal;
      text-align: left;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .opt{
      flex: 0 0 90px;
    }
  }
  .dept-item{
    .sort-handle{
      font-size: 1.1em;
      color: @border-color-base;
      margin-right: 10px;
      cursor: pointer;
    }
    &.ghost {
      background: @primary-1;
    }
  }
  .add-dept{
    width: 100%;
    margin-top: 10px;
  }
}
.org-record-dept-form {
  height: 100%;
  padding: 0 0 60px 0;
  & > .form{
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
  }
  .footer{
    position: absolute;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    line-height: 36px;
    padding: 12px 24px;
    text-align: right;
    border-top: 1px solid @border-color-base;
    & button:first-child{
      margin-right: 10px;
    }
  }
}
</style>