<template>
  <a-layout class="monitorstrategyinfo">
    <a-spin :spinning="spinning" wrapperClassName="form-submit-spin" :delay="300">
      <div class="monitorstrategy-form">
        <div class="body">
          <a-form class="form" :form="form" >
            <div class="title-bar">基本信息</div>
            <a-form-item label="策略名称:" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
              <a-input type="text" v-decorator="['name',{initialValue: record.name||'', rules:[{required: true, message:'请输入策略名称'}]}]" />
            </a-form-item>
            <a-form-item label="校验对象:" :label-col="{ span: 2 }" :wrapper-col="{ span: 4}">
              <a-select :disabled="initData.checktype === 2"
                v-decorator="['checkobj',{initialValue: record.checkobj ||'', rules:[{required:true,message:'请选择校验对象'}]}]" 
                placeholder="请选择校验对象">
                <a-select-option v-for="(item,index) in checkobjectList" :key="index" :value="item.value" >
                  {{item.text}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="策略类型:" :label-col="{ span: 2 }" :wrapper-col="{ span: 4}" v-show="initData.checktype === 2">
              <a-select 
                v-decorator="['strategytype',{initialValue: record.strategytype ||'', rules:[{required:true,message:'请选择策略类型'}]}]" 
                placeholder="请选择策略类型" :disabled="initData.checktype === 2">
                <a-select-option v-for="(item,index) in strategytypeList" :key="index" :value="item.value" >
                  {{item.text}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="运行状态:" :label-col="{ span: 2 }" :wrapper-col="{ span: 5}" >
              <a-switch 
                v-decorator="['runstatus', { initialValue: record.runstatus === 1, valuePropName: 'checked'}]"
                checkedChildren="已启用" unCheckedChildren="已停用" />
            </a-form-item>
            <a-form-item label="策略描述" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }" >
              <a-textarea :rows="5" v-decorator="['description',{initialValue: record.description}]" placeholder="请输入该规则描述信息"/>
            </a-form-item>
            <div class="title-bar">规则内容</div>
            <a-form-item label="校验方式:" :label-col="{ span: 2 }" :wrapper-col="{ span: 4}" >
              <a-select disabled
                v-decorator="['checktype',{initialValue: record.checktype, rules:[{required:true,message:'请选择校验方式'}]}]"
                placeholder="请选择校验方式" >
                <a-select-option v-for="(item,index) in checktypeList" :key="index" :value="item.value" >
                  {{item.text}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="预设方案:" :label-col="{ span: 2 }" :wrapper-col="{ span: 4}" v-if="initData.checktype === 2">
              <a-select :disabled="initData.checktype === 2"
                v-decorator="['strategyvalue',{initialValue: record.strategyvalue, rules:[{required:true,message:'请选择预设方案'}]}]"
                placeholder="请选择预设方案">
                <a-select-option v-for="(item,index) in presetList" :key="index" :value="item.strategyvalue" >
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <div class="presetContent" v-if="initData.checktype === 1">
              <a-form-item label="策略规则:" :label-col="{ span: 2 }" :wrapper-col="{ span: 4}" >
                <a-button class="selectBtn" @click="()=>showQueryModal = true">
                  <a-icon type="plus-circle" />规则配置
                </a-button>
                <a-input type="hidden" v-decorator="['customqueryid',{initialValue: record.customqueryid, rules:[{required:true,message:'请设置过滤条件'}]}]" />
              </a-form-item>
              <a-form-item label="机构字段" :label-col="{ span: 2 }" :wrapper-col="{ span: 4 }">
                <a-button class="selectBtn" @click="()=>orgFieldVisible = true" :disabled="!targetid" >
                  <a-icon type="plus-circle" />选择字段
                </a-button>
                <a-input type="hidden" v-decorator="['orgfield',{initialValue: record.orgfield, rules:[ {required:true,message:'请选择机构字段'}] }]" />
              </a-form-item>
              <a-form-item label="更新结果" :label-col="{ span: 2 }" :wrapper-col="{ span: 10 }" >
                <a-radio-group :disabled="!targetid"
                  v-decorator="['replace',{initialValue: record.replace, rules:[ {required:true,message:'请选择是否更新'}] }]" >
                  <a-radio :value="1"> 是 </a-radio>
                  <a-radio :value="0"> 否 </a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
            <div v-if="initData.strategytype !== 4">
              <div class="title-bar">触发设置</div>
              <a-form-item label="触发方式" :label-col="{ span: 2 }" :wrapper-col="{ span: 3 }" >
                  <a-checkbox @change="onTaskAutoRunChange" v-decorator="['autorun',{initialValue: record.autorun === 1,valuePropName: 'checked'} ]">自动触发</a-checkbox>
              </a-form-item>
              <a-form-item label="触发时间" :label-col="{ span: 2 }" :wrapper-col="{ span: 4 }" v-show="initData.autorun === 1" >
                <a-input read-only @click="()=> setFrequencyVisible = true"
                  v-decorator="['frequency',{initialValue: record.frequency,rules:[{required: initData.autorun === 1,message:'请填设置发频率'}]}]" />
              </a-form-item>
            </div>
            <a-form-item label="问题描述" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }" >
              <a-textarea :rows="5" read-only @click="()=>setWarnTemplateVisible = true"
                v-decorator="['warntemplate',{initialValue: record.warntemplate,rules:[{required:true, message:'请填写问题描述模板'}]}]" 
                placeholder="运行监测问题列表显示内容（支持参数加文本编辑）"
              ></a-textarea>
            </a-form-item>
          </a-form>
        </div>
        <div class="footer">
          <a-button type="primary" @click="handleSubmit">提 交</a-button>
        </div>
      </div>
    </a-spin>
    <!--数据范围设置-->
    <query-modal 
      :show="showQueryModal"
      :query="initData.customqueryid"
      namespace="monitorstrategy"
      @ok="callBack"
      @cancel="() => showQueryModal = false"
    />
    <!--机构字段选择-->
    <a-modal title="校验对象的机构字段选择" :destroyOnClose="true" :footer='null' :visible='orgFieldVisible' @cancel='()=>orgFieldVisible=false' 
      :width='800' :bodyStyle="{height: '600px', padding: '0px'}">
      <select-field :multi='false' :targetid="targetid" @finish="orgFinishHandle" :defaultSelected="orgFieldObjArr"/>
    </a-modal>
    <!-- 触发时间设置 -->
    <cron-editor v-if="setFrequencyVisible"
      :title="'设置频率'"
      :expression="initData.frequency"
      @save="frequencySave"
      @close="frequencyClose"
    >
    </cron-editor>
    <!--问题显示内容设置-->
    <equation-editor v-if="setWarnTemplateVisible" 
      namespace='monitorstrategy'
      :selfFields='selfFields'
      :fnData="initData.warntemplate"
      :title = "'问题内容模板编辑器'"
      @finish="setWarnTemplateFinishHandle">
    </equation-editor>
  </a-layout>
</template>
<script>
import { Layout, Spin, Form, Row, Col, Button, Input, Select, Checkbox, Switch, Icon, Radio, Modal} from "ant-design-vue";
import { getMonitorStrategy, addMonitorStrategy, updateMonitorStrategy,presetStrategyInfo,listModelFields} from "@/person/api/monitor";
import QueryModal from "@/person/views/integratedquery/QueryModal";
import SelectField from '@/person/views/integratedquery/components/SelectField';
import { getQuery } from "@/person/api/integratedquery";
import { showError } from "@/framework/utils/index";
import CronEditor from "@/framework/components/CronEditor";
import EquationEditor from "../../../components/EquationEditor/index";
export default {
  components: {
    ALayout: Layout,
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    AButton: Button,
    AInput: Input,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ASwitch: Switch,
    AIcon: Icon,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AModal: Modal,
    QueryModal,
    SelectField,
    EquationEditor,
    CronEditor,
  },
  data() {
    let checkobjectList = [
      {text:"人员",value:1},
      {text:"机构",value:2}
    ];
    return {
      spinning: false,
      record: {
        strategytype: 1,
        checktype: 1,
        autorun: 0,
        replace: 0,
      },

      checkobjectList: checkobjectList ,
      strategytypeList: [],
      checktypeList: [],
      presetList:[],

      initData: {
        checkobj: null,
        strategytype: 1,
        checktype: 1,
        strategyvalue: null,
        autorun: 0,
        warntemplate: "",
        customqueryid: null,
        model: null,
        orgfield: null
      },

      showQueryModal: false,
      orgFieldVisible: false,
      orgFieldObj: {},
      orgFieldObjArr: [],
      targetid: null,
      customqueryFields: [],
      setFrequencyVisible: false,
      setWarnTemplateVisible: false,
      selfFields: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created(){
    this.dictList();
    let id = this.$route.query.id;
    this.getMonitorStrategy(id);
  },
  watch:{
    customqueryFields(newVal,oldVal){
      this.getSelfFields(newVal, this.orgFieldObj);
    },
    orgFieldObj(newVal,oldVal){
      this.orgFieldObjArr = [];
      this.orgFieldObjArr.push(newVal);
      this.getSelfFields(this.customqueryFields, newVal);
    }
  },
  methods:{
    //获取常量
    dictList(){
      this.strategytypeList = this.$store.getters.dict("person.monitor.strategytype");
      this.checktypeList = this.$store.getters.dict("person.monitor.checktype");
    },
    //将预定方案转换成map集合
    presetStrategyInfo(strategyvalue){
      presetStrategyInfo(strategyvalue).then(resp => {
        this.presetList.push(resp.result);
        console.log(resp.result);
        if(1 === resp.result.checkobj){
          
        }
      })
    },
    //获取表单数据
    getMonitorStrategy(id){
      if(!id){
        return;
      }
      this.record.id = id;
      getMonitorStrategy(id).then(resp => {
        this.record = resp.result;
        this.initData = {...this.record};
        if(this.initData.customqueryid){
          this.getTargetid(this.initData.customqueryid);
        }
        if(this.initData.checktype === 2 && this.initData.strategyvalue){
          this.presetStrategyInfo({"strategyvalue": this.initData.strategyvalue});
          let model = null;
          if(this.initData.checkobj === 1){
            model = 'user';
          }
          if(this.initData.checkobj === 2){
            model = 'organization';
          }
          this.listModelFields(model);
        }
        if(this.initData.orgfield){
          this.orgFieldObj = JSON.parse(this.initData.orgfield);
        }
      });
    },
    //提交表单
    handleSubmit(){
      this.form.validateFields((err, values) => {
        if (!err) {
          this.spinning = true;
          this.record = {...this.record,...values};
          this.record.runstatus = this.record.runstatus ? 1 : 0;
          this.record.autorun = this.record.autorun ? 1 : 0;
          this.record.frequency = this.record.autorun ? this.record.frequency : '';
          if(this.record.id){
            values.id = this.record.id;
            updateMonitorStrategy(this.record).then(resp => {
              this.spinning = false;
              this.$notification.success({
                message: "提示",
                description: "修改成功!",
                duration: 3
              });
            }).catch(err => {
              this.spinning = false;
              showError(err);
            })
          }else{
            addMonitorStrategy(values).then(resp => {
              this.spinning = false;
              this.record.id = resp.result;
              this.$notification.success({
                message: "提示",
                description: "添加成功!",
                duration: 3
              });
            }).catch(err => {
              this.spinning = false; 
              showError(err); 
            })
          }
        }
      });
    },
    //是否自动运行变更的时候
    onTaskAutoRunChange(e){
      if(e.target.checked){
        this.initData.autorun = 1 ;
      }else{
        this.initData.autorun = 0;
      }
    },
    callBack(query) {
      this.initData.customqueryid = query.id
      this.targetid = query.target.id;
      this.initData.model = query.target.model;
      this.customqueryFields = [];
      this.customqueryFields.push(query.fields);
      this.form.setFieldsValue({'customqueryid': query.id});
      this.showQueryModal = false;
    },
    orgFinishHandle(type,data){
      if(type == 'ok'){
        this.orgFieldObj = data;
        this.form.setFieldsValue({'orgfield': JSON.stringify(data)});
      }
      this.orgFieldVisible = false;
    },
    getTargetid(queryid){
      getQuery(queryid).then(res => {
        this.customqueryFields = res.result.fields;
        this.targetid = res.result.target.id;
      }).catch(err => {
        showError(err);
      })
    },
    setWarnTemplateFinishHandle(type, expression){
      if(type == 'ok'){
        this.initData.warntemplate = expression;
        this.form.setFieldsValue({'warntemplate': expression});
      }
      this.setWarnTemplateVisible = false;
    },
    frequencySave(frequency){
      this.initData.frequency = frequency;
      this.form.setFieldsValue({'frequency': frequency});
      this.setFrequencyVisible = false;
    },
    frequencyClose(){
      this.setFrequencyVisible = false;
    },
    getSelfFields(customqueryFields,orgFieldObj){
      let keys = [];
      this.selfFields = [];
      if(customqueryFields && customqueryFields.length > 0){
        customqueryFields.forEach(element => {
          if(keys.indexOf(element.key) === -1){
              keys.push(element.key);
              this.selfFields.push({code:element.key,name:element.showname});
          }
        });
      }
      if(orgFieldObj && Object.keys(orgFieldObj).length > 0){
        if(keys.indexOf(orgFieldObj.key) === -1){
          keys.push(orgFieldObj.key);
          this.selfFields.push({code:orgFieldObj.key,name:orgFieldObj.showname});
        }
      }
    },
    listModelFields(model){
      listModelFields(model).then(res=>{
        if(res.result){
          res.result.forEach(item => {
            this.selfFields.push({code: item.name, name: item.desc});
          })
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.monitorstrategyinfo{
  height: 100%;
  padding: @layout-space-base;
  .form-submit-spin{
    height: 100%;
    /deep/.ant-spin-container{
      height: 100%;
    }  
  }
  .monitorstrategy-form{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: @white;
    border-radius: @border-radius-base;
    padding: 10px 0;
    > .body{
      flex-shrink: 10;
      -webkit-flex-shrink: 10;
      min-height: 0;
      overflow: auto;
      .form{
        padding: 0 10px;
        .title-bar {
          margin: 10px 0;
          line-height: 1em;
          border-left: 5px solid @primary-color;
          font-size: 18px;
          text-indent: 5px;
          color: @primary-color;
        }
        .selectBtn{
          border: @primary-color dashed 1px;
          width: 100%;
          .anticon{
            color: @primary-color;
          }
        }
      }
    }
    .footer{
      padding: @padding-sm @padding-lg;
      text-align: center;
      margin-top: 10px;
      button:first-child{
        margin-right: 20px;
      }
    }
  }
}
</style>