<template>
  <a-modal :visible="value" :title="record.id ? '编辑对象' : '新增对象'" :width="600" 
  :bodyStyle="{ overflow: 'auto', height: '500px', padding: '8px 24px'}" destroyOnClose @ok="save" @cancel="cancel"
  >
  <a-form :form="form">
    <a-row :gutter="20">
      <a-col :span="12">
        <a-form-item label="统计对象">
          <a-input
            allowClear
            v-decorator="['title', { initialValue: record.title,  rules: [ { required: true, message: '请选择统计对象' },]}]"/>
        </a-form-item>
      </a-col>
       <a-col :span="12">
        <a-form-item label="依赖">
          <a-select mode="multiple" @change="form.setFieldsValue()"
            v-decorator="['depends', {  initialValue: getDepends(record.depends,true),}]">
            <template v-if="!this.record.id">
              <a-select-option v-for="item in targetlist" :key="item.id" >{{ item.title }}</a-select-option>
            </template>
            <template v-else>
              <a-select-option v-for="item in filterTatget" :key="item.id" >{{ item.title }}</a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="24" >
        <a-form-item label="数据源">
            <a-select v-decorator="['namespace',{ 
                rules: [ { required: true, message: '请输入数据源' } ], 
                initialValue: getModelVal(record.namespace || 'organization')
              }]"
              @change="(v) => referFilter = {namespace: v, filter: {}}"
             >
              <a-select-option value="organization">组织</a-select-option>
              <a-select-option value="user">用户</a-select-option>
            </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="24" >
        <a-form-item label="数据范围">
          <SimpleFilterEditor v-model="referFilter.filter" 
            :selectOp="true" 
            :namespace="referFilter.namespace" 
            ref="filterEditor"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</a-modal>
</template>
<script>
import SimpleFilterEditor from "@person/components/SimpleFilterEditor";
import { Modal, Row, Col, Select, Input, Form, Switch, InputNumber,Icon } from "ant-design-vue";
import { newfield, editupd, saveTarget } from "@/person/api/field";
import { showError } from "@/framework/utils/index";

export default {
  name: "StatisticsChange",
  components: {
    ARow: Row,
    ACol: Col,
    AIcon: Icon,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    AInputNumber: InputNumber,
    AForm: Form,
    AFormItem: Form.Item,
    ASwitch: Switch,
    ATextarea: Input.TextArea,
    AModal: Modal,
    SimpleFilterEditor
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default: () => ({})
    },
    targetlist: {
      type: Array,
      default: () => ([])
    },
    modelList: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      datasets: [],
      expr: {
        show: false,
        params: {},
        data: ""
      },
      referFilter: {
        namespace: undefined,
        filter: {},
      },
    };
  },
  computed:{
    filterTatget(){
      let arr = [];
      for(let i = 0;i<this.targetlist.length;i++){
        if(this.targetlist[i].title != this.record.title){
          arr.push(this.targetlist[i])
        }
      }
      return arr; 
    }
  },
  watch: {
    record(v){
      this.initData();
    }
  },
  created() {
    this.initData();   
  },
  methods: {
    getModelVal(model){
      if(model == "organization"){
        return "组织"
      }else if(model == "user"){
        return "用户"
      }
    },
    getModelStr(value){
      if(value == "组织"){
        return "organization"
      }else if(value == "用户"){
        return "user"
      }else {
        return value
      }
    },
    getDepends(values,type){
      if(values){
        let arr = values.map(item=>{
          return item.title
        })
        if(type){
          return arr
        }else{
          return arr.join('，')
        }      
      }
    },
    initData(){
      this.referFilter = {
        namespace : this.record.namespace || 'organization',
        filter: this.record.filters,
      }
      this.datasets = this.record.datasets || [];
    },
    cancel() {
      this.$emit("input", false);
    },
    save(){
      this.record.filters = this.$refs.filterEditor.getFilter();
      this.form.validateFields((err, values) => {
        values.namespace = this.getModelStr(values.namespace)
        let depends = []     
        if(values.depends){
          values.depends = values.depends.map(item=>{
            for(let i = 0;i<this.targetlist.length;i++){
              if(item == this.targetlist[i].title){
                depends.push({id:this.targetlist[i].id})
              }
              if(typeof item == "number"){
                depends.push({id:item})
              }
            }
        }) 
        } 
        if (!err) {
          let obj = {
            id: this.record.id,
            title: values.title,
            depends,
            namespace: values.namespace,
            filters:this.record.filters
          };
        if (!this.record.id) {
          saveTarget(obj).then(res=>{
            this.$message.success("新增成功");
            this.$emit("finish", obj);
          }).catch(err => {
            showError(err);
          });
        } else {
          saveTarget(obj).then(res=>{
            this.$message.success("编辑成功");
            this.$emit("finish", obj);
          }).catch(err => {
            showError(err);
          });
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>

</style>