<template>
  <div class="edit-orgdistr-category">
    <a-form :form="form" class="form-warp">
      <a-row :gutter="24" style="margin: 0 40px">
        <a-col :span="24">
          <a-form-item label="名称">
            <a-input 
              placeholder="请填写名称"
              v-decorator="[`name`,{
                rules: [{required: true, message: '请填写名称!'}],
                initialValue: dataList.name
                }]">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24" style="margin: 0 40px">
        <a-col :span="24">
          <a-form-item label="编码">
            <a-input
              placeholder="请填写编码"
              v-decorator="['code',{
                rules: [{ required: true, message: '请填写编码!' }],
                initialValue: dataList.code
              }]">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24" style="margin: 0 40px">
        <a-col :span="24">
          <a-form-item label="字典类型">
            <a-input
              placeholder="请填写单位类型"
              v-decorator="['dict',{
                rules: [{ required: true, message: '请填写单位类型!' }],
                initialValue: dataList.dict
              }]">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24"  v-for="(item,index) in dataList.values" :key="index" class="templist" style="margin: 0 40px">  
        <div class="remove" @click="removeTemp(item)">
          <a-icon type="close" />       
        </div>
        <a-col :span="12">
          <a-form-item label="value(值)">
            <dict-select 
              dict="usermanage.org.unittype"
              placeholder="--请选择--"
              v-decorator="[`values[${index}].value`,{
                rules: [
                  { required: false, message: '请选择单位类型!' },
                  { validator: validateRules }
                ],
                initialValue: item.value?item.value:''}]">
            </dict-select>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="模板名称">
            <a-select 
              showSearch
              :allowClear="true"
              placeholder="--请选择--" 
              style="width: 100%"
              optionFilterProp="children"
              v-decorator="[`values[${index}].tempname`,{
                rules: [{required: true, message: '请选择单位类型!'}],
                initialValue: item.tempname
              }]">
              <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 0;" />
                <div
                  @click="editTemp"
                  style="padding: 8px; cursor: pointer;"
                >
                  <a-icon type="plus" />添加模板
                </div>
              </div>
              <a-select-option 
                v-for="it in tempnameList" 
                :key="it.id"
                :value="it.name"
                >
                {{it.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="生效时间">
            <a-date-picker 
              :format="'YYYY-MM-DD'"
              style="width: 100%"
              placeholder="--请选择--"
              v-decorator="[`values[${index}].starttime`,{
                rules: [{required: false, message: '请选择生效时间!'}],
                initialValue: item.starttime?moment(item.starttime, 'YYYY-MM-DD HH:mm:ss'):undefined
                }]"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="失效时间">
            <a-date-picker 
              style="width: 100%"
              placeholder="--请选择--"
              v-decorator="[`values[${index}].endtime`,{
                rules: [{required: false, message: '请选择失效时间!'}],
                initialValue: item.endtime?moment(item.endtime, 'YYYY-MM-DD HH:mm:ss'):undefined
                }]"
            />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :gutter="24" class="add-btn" style="margin: 0 40px;">
        <a-col :span="24">
          <a-form-item>
            <a-button type="dashed" style="width: 100%" @click="addTemp">
              <a-icon type="plus" /> 添加模板
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
      
    </a-form>
    <a-modal
      v-model="showAddTemp"
      title="添加模板"
      :width="600"
      @ok="addTempitems"
      :bodyStyle="{ height: '520px', padding: '0'}">
        <add-temp ref="addTemp" :tempnameList="tempnameList"></add-temp>
    </a-modal>
  </div>
</template>

<script>
import { Form, Col, Row, Input, DatePicker, Select, Button, Icon, Modal, Divider } from "ant-design-vue";
import { addOrgdistrCategory, getOrgdistrTemplist, addOrgdistrTemp } from "@/person/api/orgRecord";
import { showError } from "@/framework/utils/index";
import DictSelect from "@/framework/components/DictSelect";
import AddTemp from './AddTemp';
import moment from 'moment';
export default {
  props: ["record"],
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ACol: Col,
    ARow: Row,
    AInput: Input,
    ADatePicker: DatePicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    ADivider: Divider,
    DictSelect,
    AddTemp,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      dataList: [],
      tempnameList: [],
      showAddTemp: false,
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.dataList = JSON.parse(JSON.stringify(this.record));
    this.loadTemplist();
  },
  methods: {
    moment,
    dictVal(val){
      let d = this.$store.getters.dictKey("usermanage.org.unittype", val);
      return d && d.text;
    },
    isRepeat(arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i].value]){
          return true; 
        }
        hash[arr[i].value] = true;
      }
      return false;
    },
    validateRules(rule, value, callback) {
      let allValue = this.form.getFieldsValue().values;
      if(value){
        let repeat = this.isRepeat(allValue);
        if(repeat) {
          callback("填写的值重复");
        }else{
          callback();
        }
      }else{
        let repeat = this.isRepeat(allValue);
        if(repeat) {
          callback("只能允许一个值为空");
        }else{
          callback();
        }
      }
    },
    loadTemplist() {
       getOrgdistrTemplist() 
       .then(res => {
         this.tempnameList = res.result;
       })
       .catch(err => {
         showError(err);
       })
    },
    editTemp() {
      setTimeout(() => {
        this.showAddTemp = true;
      },500)
    },
    getFormValue(){
      return new Promise((resolve, reject) => {
        this.form.validateFields((error, values) => {
          if(error){
            reject({code:'form_validate_fail', message: '表单验证失败'});
          }else if(!values.values) {
            reject({code:'form_validate_fail', message: '请添加模板'});
          }else{
            values.values.forEach(item => {
              this.tempnameList.forEach(it => {
                if(it.name == item.tempname) {
                  item.tempid = it.id;
                }
              }) 
              if(typeof(item.value) != "string") {
                item.value = JSON.stringify(item.value);
              }
              if(item.starttime) {
                item.starttime = moment(item.starttime).format("YYYY-MM-DD");
              }
              if(item.endtime) {
                item.endtime = moment(item.endtime).format("YYYY-MM-DD");
              }
            })
            resolve(values);
          }
        })
      })
    },
    addTemp() {
      let data = {
        tempid: undefined,
        tempname: undefined,
        value: undefined,
        starttime: undefined,
        endtime: undefined
      };
      this.dataList.values.push(data);
    },
    removeTemp(item) {
      let index = this.dataList.values.indexOf(item);
      if(index !== -1) {
        this.dataList.values.splice(index, 1);
      }
    },
    addTempitems() {
      const data = this.$refs.addTemp.datalist;
      const name = this.$refs.addTemp.tempname;
      if(data.length == 0) {
        showError({message: "模板不能为空"});
      }else if(!name) {
        showError({message: "模板名称不能为空"});
      }else{
        const query = {
          "id": 0,
          "name": name,
          "items": data
        }
        addOrgdistrTemp(query)
        .then(res => {
          this.showAddTemp = false;
          this.loadTemplist();
        })
        .catch(err => {
          showError(err);
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit-orgdistr-category{
  height: 100%;
  display: flex;
  flex-direction: column;
  .form-warp{
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: @content-padding-v @content-padding-h;
    .templist{
      position: relative;
      &:hover{
        outline: 1px dashed @primary-2;
        .remove{
          display: block;
        }
      }
    }
    .remove{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
      width: 16px;
      height: 16px;
      padding-left: 4px;
      padding-bottom: 4px;
      line-height: 12px;
      font-size: 12px;
      border-bottom-left-radius: 12px;
      background: fade(#666, 10%);
      color: #666;
      display: none;
      &:hover{
        color: @error-color;
        cursor: pointer;
      }
    }
  }
}
</style>