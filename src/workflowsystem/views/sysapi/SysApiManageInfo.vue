<template>
  <div class="main">
    <a-spin :spinning="spinning" wrapperClassName="form-submit-spin" :delay="300">
      <a-form-model layout="horizontal" ref="form" :model="formData" :rules="rules" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">


        <a-form-model-item label="名称" prop="name" >
          <a-input v-model="formData.name" placeholder="请输入名称"/>
        </a-form-model-item>

        <a-form-model-item label="类别" prop="type">
          <a-select v-model="formData.type" placeholder="请选择类别"  >
            <a-select-option v-for="(item,index) in type" :key="index" :value="item.value"  >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        
        <a-form-model-item label="接口类型" prop="httptype">
          <a-select v-model="formData.httptype" placeholder="请选择接口类型"  @change="httpTypeChange" >
            <a-select-option v-for="(item,index) in httptype" :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="内容体类型" prop="contenttype">
          <a-select v-model="formData.contenttype" placeholder="请选择内容体类型"  >
            <a-select-option v-for="(item,index) in contenttype" :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="请求方式"  prop="requesttype">
          <a-select  v-model="formData.requesttype" placeholder="请选择请求方式" >
            <a-select-option v-for="(item,index) in requesttype"  :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="请求路径" prop="url" >
          <a-input v-model="formData.url" placeholder="请输请求路径"/>
        </a-form-model-item>

        <div class="weblabel" v-if="formData.httptype == 2">
          <a-form-model-item label="名称空间" prop="targetnamespace" >
            <a-input v-model="formData.targetnamespace" placeholder="请输入目标名称空间"/>
          </a-form-model-item>
                  <a-form-model-item label="目标方法名" prop="targetaction" >
            <a-input v-model="formData.targetaction" placeholder="请输入目标方法名"/>
          </a-form-model-item>
                  <a-form-model-item label="内容模板" prop="template" >
            <a-input v-model="formData.template" placeholder="请输入内容模板"/>
          </a-form-model-item>          
        </div>

        <a-form-model-item label="编码格式" prop="encodetype">
          <a-select v-model="formData.encodetype" placeholder="请选择编码格式"  >
            <a-select-option v-for="(item,index) in encodetype" :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="鉴权策略" prop="authStrategyName" >
          <a-input v-model="formData.authStrategyName" placeholder="请输入鉴权策略名称"/>
        </a-form-model-item>                                

        <a-form-model-item label="图标" prop="icon">
          <a-input v-model="formData.icon" placeholder="请输图标路径"/>
        </a-form-model-item>

        <a-form-model-item label="描述" prop="describe">
          <a-textarea v-model="formData.describe" placeholder="请输描述信息" :rows="5"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import { Spin, FormModel, Input, Select} from "ant-design-vue";
import { addApi, updateApi, getApi} from "@/workflowsystem/api/sysapimanage";
import { showError } from '../../../framework/utils';

export default {
  name:"SysApiManageInfo",
  props: {
    selectedid: Number
  },
  components: {
    ASpin: Spin,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea,
  },
  data() {
    return {
      spinning: false,
      type: [],
      httptype:[],
      encodetype:[],
      contenttype:[],
      requestType: [],
      defaultFormData: {
        id: undefined,
        name: "",
        authStrategyName: "",
        url: "",
        targetnamespace: "",
        targetaction: "",
        template: "",
        icon: "",
        describe: ""
      },
      formData: {},
      rules: {
        name: [
          { required: true, message: '请输入名称'},
          { max: 50, message: "长度不能超过50个"}
        ],
        type: [{ required: true, message: '请输入类型'}],
        httptype: [{ required: true, message: '请选择请求类型'}],
        contenttype: [{ required: true, message: '请选择内容提类型'}],
        requesttype: [{ required: true, message: '请输入请求方式'}],
        url: [{ required: true, message: '接口请求路径'}],
        targetnamespace: [{ required: true, message: '请输入目标名称空间'}],
        targetaction: [{ required: true, message: '请输入目标方法名'}],
        icon: [{ max: 100, message: '长度不能超过100个'}],
        describe: [
          { max: 200, message: '长度不能超过200个'}
        ],
      }
    };
  },
  mounted(){
    this.dictList();
    
  },
  methods:{
    //切换请求类型
    httpTypeChange(value) {
      if(value == 1){
        this.requesttype = this.$store.getters.dict("workflow.http.httpRequest");
      }
      if(value == 2){
        this.requesttype = this.$store.getters.dict("workflow.webservice.webServiceRequest");
      }
    },
    //获取常量
    dictList(){
      this.type = this.$store.getters.dict("workflow.api.apiType");
      this.httptype = this.$store.getters.dict("workflow.api.apiHttpType");
      this.requesttype = this.$store.getters.dict("workflow.http.httpRequest");
      this.encodetype = this.$store.getters.dict("workflow.api.apiEncodeType");
      this.contenttype = this.$store.getters.dict("workflow.api.apiContentType");
      this.loadData(this.selectedid);
    },
    //获取表单数据
    loadData(id){
      this.formData = {};
      if(!id){
        this.formData = {...this.defaultFormData};
        this.$emit("enableOkBtn");
        return;
      }
      this.spinning = true;
      getApi(id).then(resp => { 
        this.spinning = false;
        this.$emit("enableOkBtn");
        let {name, url,type, requesttype, httptype, encodetype, contenttype, authStrategyName, targetnamespace, targetaction, template, icon, describe} = resp.result;
        this.formData = {name, url, type, requesttype, httptype, encodetype, contenttype, authStrategyName, targetnamespace, targetaction, template, icon, describe}
      }).catch(err => showError(err));
    },
    //提交表单
    handleSubmit(){
      this.$refs.form.validate(valid => {
        if (valid) {
          this.spinning = true;
          let data = {...this.formData};
          if(this.selectedid){
            this.update(data);
          }else{
            this.add(data);
          }
        }
      });
    },
    add(data){
      addApi(data).then(res => {
        this.spinning = false;
        this.$notification.success({
          message: "提示",
          description: "新增成功！",
          duration: 3,
        });
        this.$emit("closeApi");
      }).catch(err => {
        this.spinning = false;
        showError(err);
      });
    },
    update(data){
      data.id = this.selectedid;
      updateApi(data).then(res => {
        this.spinning = false;
        this.$notification.success({
          message: "提示",
          description: "修改成功！",
          duration: 3
        });
        this.$emit("closeApi");
      }).catch(err => {
        this.spinning = false;
        showError(err);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main{
  height: 100%;
  .form-submit-spin{
    height: 100%;
  }
  .ant-form {
    .ant-form-item {
      width: 95%;
      margin-bottom: 8px;
    }
  }
}
</style>