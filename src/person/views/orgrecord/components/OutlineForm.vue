<template>
  <div class="org-record-outline-form">
     <div class="form">
       <a-form :form="form" 
        v-bind="{labelCol: { span: 5 }, wrapperCol: { span: 16 }}" 
        @submit.prevent="handleSubmit">
        <a-form-item label="类别">
          <a-select v-model="sort" placeholder="请选择类别" @change="onSortChange" :disabled="sortDisable">
            <a-select-option v-for="item in subjectGroupList" :key="item.key">{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="分设单位" v-if="sort == 'branch'">
          <a-input v-decorator="['target.orgname', {
              rules: [
                {required: true, whitespace: true, message: '请设置单位'},
                {validator: (r, v, cb) => {validateRecord('target', v, cb)}}
              ],
              validateTrigger: 'blur',
              validateFirst: true,
              initialValue: records.target.orgname,
            }]" :read-only="true" @input ="onInputOrgName('target')">
            <a-icon slot="addonAfter" type="select" @click="selectOrg('target')"/>
          </a-input>
          <a-input type="hidden" v-decorator="['target.orgid', {initialValue: records.target.orgid}]"/>
        </a-form-item>
        <div v-for="(k, index) in records.list" :key="generateKey(k)">
          <a-form-item :label="labelName">
            <a-input 
              v-decorator="[`records[${index}].orgname`, {
                rules: [
                  {required: true, whitespace: true, message: '请设置单位'},
                  {validator: (r, v, cb) => {validateRecord(`records[${index}]`, v, cb)}}
                ],
                validateTrigger: 'blur',
                validateFirst: true,
                initialValue: k.orgname,
              }]" 
              :read-only="sort!='create' && sort!='branch'"
              @input ="onInputOrgName(`records[${index}]`)"
            >
              <a-icon slot="addonAfter" type="select" @click="selectOrg(`records[${index}]`)"/>
            </a-input>
            <a-input type="hidden" v-decorator="[`records[${index}].orgid`, {initialValue: k.orgid}]"/>
            <div class="form-item-opts">
              <a-icon class="delete" type="minus-circle" 
                :class="{disabled: records.list.length <= 1}" 
                @click="removeRecord(k, index)"
              />
            </div>
          </a-form-item>
          <a-form-item label="主题词" v-if="sort == 'update'">
             <a-select mode="multiple" 
              v-decorator="[`records[${index}].subjects`, {
                rules: [{required: true, message: '请选择主题词'}],
                initialValue: k.subjects,
              }]">
              <a-select-option v-for="item in updateSubjectList" :key="item.value">{{item.text}}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <a-form-item v-bind="{wrapperCol: { span: 16, offset: 5 }}">
          <a-button type="dashed" @click="addRecord" style="width:100%">
            <a-icon type="plus" /> 添加{{labelName}}
          </a-button>
        </a-form-item>
        <a-form-item label="合并后的单位" v-if="sort == 'merge'">
          <a-input v-decorator="['target.orgname', {
              rules: [
                {required: true, whitespace: true, message: '请设置单位'},
                {validator: (r, v, cb) => {validateRecord('target', v, cb)}}
              ],
              validateTrigger: 'blur',
              validateFirst: true,
              initialValue: records.target.orgname,
            }]" @input ="onInputOrgName('target')">
            <a-icon slot="addonAfter" type="select" @click="selectOrg('target')"/>
          </a-input>
          <a-input type="hidden" v-decorator="['target.orgid', {initialValue: records.target.orgid}]"/>
        </a-form-item>
        <div class="footer">
          <a-button @click="cancel" >取消</a-button>
          <a-button type="primary" html-type="submit">提交</a-button>
        </div>
      </a-form>
     </div>
    <a-modal title="选择单位" :footer="null" v-model="orgSelectVisible" 
      :width="500" :bodyStyle="{ height: '600px', padding: '0'}">
      <org-user-select mode="org" @finish="onOrgSelected" :rootSelectable="true"/>
    </a-modal>
  </div>
</template>
<script>
import { Button, Form, Select, Imput, Input, Icon, Modal} from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import { showError } from '@/framework/utils/index'
import { saveOutline, validateOutline } from "@/person/api/orgRecord";
import assign from 'lodash/assign';

export default {
  props: {
    docid: { type: Number },
    outline: { type: Object}
  },
  components: {
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AIcon: Icon,
    ASelect: Select,
    ASelectOption: Select.Option,
    AModal: Modal,
    OrgUserSelect,
  },
  data() {
    return {
      form: this.$form.createForm(this, {}),
      records: undefined,
      sort: undefined,
      sortDisable: false,
      orgSelectVisible: false,
      orgSelectId: null,//选择record对象表单Key 例如 records[0] target
    };
  },
  created(){
    this.init();
  },
  computed:{
    subjectGroupList(){
      return [
        {key: 'create', text: '设立', label: '设立单位', subjects: [3]},
        {key: 'update', text: '变更', label: '变更单位', subjects: undefined},
        {key: 'reset', text: '三定', label: '三定单位', subjects: [4]},
        {key: 'merge', text: '合并', label: '合并单位', subjects: [1, 6]},
        {key: 'branch', text: '分设', label: '分设后的单位', subjects: [2, 3]},
        {key: 'delete', text: '撤销', label: '撤销单位', subjects: [6]},
      ]
    },
    labelName(){
      let s = this.subjectGroupList.find(item => item.key == this.sort);
      return s && s.label;
    },
    updateSubjectList(){
      let list = this.$store.getters.dict('person.orgrecordsubject');
      return (list || []).filter(item => item.group == '变更');
    }
  },
  watch:{
    docid(docid){
      this.init();
    },
    outline(list){
      this.init();
    }
  },
  methods: {
    init(){
      if(this.outline){
        if(this.outline.sort == 1){//合并
          let rs = {target: undefined, list: []};
          this.sort = 'merge';
          this.sortDisable = true;
          this.outline.items.forEach(item => {
            //FIXME 把主题设为初始值，提交时根据列表和target是否存在相同调整主题词
            if(item.subjects.indexOf(3) >= 0){//设立
              rs.target = {...item, subjects: [1, 3]};
            }else if(item.subjects.indexOf(4) >= 0){//三定
              rs.target = {...item, subjects: [1, 3]};
              rs.list.push({...item, subjects: [1, 6]});//清除id
            }else{
              rs.list.push({...item, subjects: [1, 6]});
            }
          });
          this.records = rs;
          this.form.resetFields();
          return;
        }else if(this.outline.sort == 2){//分设
          this.sort = 'branch';
          this.sortDisable = true;
          let rs = {target: undefined, list: []};
          this.outline.items.forEach(item => {
            //FIXME 把主题设为初始值，提交时根据列表和target是否存在相同调整主题词
            if(item.subjects.indexOf(3) >= 0){//设立
              rs.list.push({...item, subjects: [2, 3]});
            }else if(item.subjects.indexOf(4) >= 0){//三定
              rs.list.push({...item, subjects: [2, 3]});//清除id
              rs.target = {...item, subjects: [2, 6]};
            }else{
              rs.target = {...item, subjects: [2, 6]};
            }
          });
          this.records = rs;
          this.form.resetFields();
          return;
        }
      }
      this.sort = 'create';
      this.sortDisable = false;
      this.onSortChange()
    },
    onSortChange(){
      let s = this.subjectGroupList.find(item => item.key == this.sort);
      if(s){
        let target;
        if(this.sort == 'merge'){
          target = {subjects: [1, 3], docid: this.docid}
        }else if(this.sort == 'branch'){
          target = {subjects: [2, 6], docid: this.docid}
        }
        this.records = { target, list: [{subjects: s.subjects, docid: this.docid}] };
        this.form.resetFields();
      }
    },
    onInputOrgName(key){//FIXME sunwen 组织名称手动修改后删除组织ID（建议修改交互形式）
      this.form.setFieldsValue({ [key + '.orgid']: undefined });
    },
    addRecord(){
      let s = this.subjectGroupList.find(item => item.key == this.sort);
      if(s){
        this.records.list.push({subjects: s.subjects, docid: this.docid});
      }
    },
    generateKey(record){
      if(record.id){
        return record.id;
      }else if(!record.__key__){
        record.__key__ = new Date().getTime();
      }
      return record.__key__;
    },
    removeRecord(config, index){
      let {list, deleted} = this.records;
      if(list.length > 1){
        //拷贝表单列表数据到data中，防止列表变更，页面重新渲染数据丢失
        this.form.getFieldValue('records').forEach((item, index) => {
          assign(list[index], item);
        });
        let delList = list.splice(index, 1);
        if(!deleted){
          deleted = [];
          this.records.deleted = deleted;
        }
        delList.forEach(item => {
          if(item.id){//编辑的记录删除需记录删除,
            //FIXME 删除后又重新添加该单位需要恢复id,不然服务器校验会显示单位已存在
            deleted.push(item);
          }
        })
      }
    },
    selectOrg(key){
      this.orgSelectVisible = true;
      this.orgSelectId = key;
    },
    onOrgSelected(type, list){
      this.orgSelectVisible = false;
      if(type == 'ok' && list.length > 0){
        let {_id, name} = list[0];
        this.form.setFieldsValue({
          [this.orgSelectId + '.orgid']: _id,
          [this.orgSelectId + '.orgname']: name,
        });
        // this.form.validateFields([this.orgSelectId + '.orgname']);
      }
    },
    validateRecord(recordkey, text, cb){
      const r = this.form.getFieldValue(recordkey);
      const target = this.form.getFieldValue('target');
      const list = this.form.getFieldValue('records');
      let record, same;
      if(recordkey == 'target'){
        record = { ...this.records.target, ...r }
        if(list.find(i => r.orgid == i.orgid && (r.orgid || r.orgname == i.orgname))){
          //如果列表中存在target指定单位，不验证target，验证由列表中的单位处理
          //以下情况target单位和列表单位相同
          //1.合并到已有单位 	 A(合并、撤销)、B（合并、三定） -> B
          //2.分设本单位不撤销 A -> A（分设、三定）、B（分设、设立）
          if(this.sort == 'merge'){
            record.subjects = [1, 4];//合并三定
          }else if(this.sort == 'branch'){
            record.subjects = [2, 4];//分设三定
          }else{
            same = true;
          }
        }
      }else{
        same = list.find((i, idx) => {
          if(recordkey == `records[${idx}]`){
            if(target && r.orgid === target.orgid){
              //列表中的操作的项和target相同，不验证，验证由target触发
              return false;
            }
            record = { ...this.records.list[idx], ...r };
            return false;
          }
          return r.orgid == i.orgid && (r.orgid || r.orgname == i.orgname);
        });
      }
      if(same){
        cb('单位重复设置');
      }else if(record){
        validateOutline(record).then(({result}) => {
          cb();
        }).catch(error => {
          cb(error.message);
        })
      }else{
        cb();
      }
    },
    handleSubmit(e){
      this.form.validateFields((error, values) => {
        if(!error){
          let list = this.form.getFieldValue('records').map((ele, index) => ({
            ...this.records.list[index], ...ele
          }));
          let deleteIds;
          if(this.sort == 'merge'){
            let target = this.form.getFieldValue('target');
            let record = {
              ...this.records.target,
              ...target,
              from: list,
            }
            let index = list.findIndex(item => item.orgid === target.orgid);
            if(index >= 0){//合并到已有单位  A(合并、撤销)、B（合并、三定） -> B
              record.subjects = [1, 4];
              list.splice(index, 1);
            }
            list = [record]
          }else if(this.sort == 'branch'){
            let target = this.form.getFieldValue('target');
            let formRecord = {
              ...this.records.target,
              ...target
            }
            let index = list.findIndex(item => item.orgid === target.orgid);
            if(index >= 0){//分设本单位不撤销 A -> A（分设、三定）、B（分设、设立）
              formRecord.subjects = [2, 4]
              list.splice(index, 1);
            }
            list.forEach(ele => ele.from = [formRecord])
          }
          if(this.records.deleted){
            deleteIds = this.records.deleted.map(item => item.id);
          }
          saveOutline({
            records: list, 
            deleteIds
          }).then(({result}) => {
            this.$emit('finish', 'ok');
          }).catch(error => {
            showError(error);
          })
        }
      });
    },
    cancel(){
      this.$emit('finish', 'cancel');
    }
  }
};
</script>
<style lang="less" scoped>
.org-record-outline-form {
  height: 100%;
  padding: 4px 4px 60px 4px;
  & > .form{
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    padding: 20px 20px 0 20px;

    /deep/.ant-input-group-addon{
      cursor: pointer;
    }
    .form-item-opts{
      position: absolute;
      right: 0;
      top: 0;
      margin-right: -32px;
      line-height: 1em;
      .anticon{
        font-size: 20px;
        cursor: pointer;
        &:hover{
          color: @primary-color;
        }
        &.disabled{
          color: @disabled-color;
      }
      }
    }
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