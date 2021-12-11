<template>
  <div class="main">
    <a-spin :spinning="spinning" wrapperClassName="form-submit-spin" :delay="300">
      <a-form-model layout="horizontal" ref="form" :model="formData" :rules="rules" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">

        <a-form-model-item label="名称" prop="name" >
          <a-input v-model="formData.name" placeholder="请输入名称"/>
        </a-form-model-item>

        <a-form-model-item label="类型" prop="type">
          <a-select v-model="formData.type" placeholder="请选择类型" :disabled="selectedid != null">
            <a-select-option v-for="(item,index) in modelAppTypeList" :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="分类">
          <a-select v-model="formData.categoryidarr" placeholder="请选择分类" mode="multiple">
            <a-select-option v-for="(item,index) in categoryList" :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="适用终端" prop="clientarr">
          <a-select v-model="formData.clientarr" placeholder="请选择适用终端" mode="multiple">
            <a-select-option v-for="(item,index) in clientList" :key="index" :value="item.value" >
              {{item.text}}
            </a-select-option>
          </a-select>
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
import { addModelApp, updateModelApp, getModelApp} from "@/workflowsystem/api/modelapplication";
import { listCategoryByType } from "@/workflowsystem/api/category";
import { showError } from '../../../framework/utils';
export default {
  name:"ModelApplicationInfo",
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
      modelAppTypeList: [],
      categoryList: [],
      clientList: [],
      defaultFormData: {
        id: undefined,
        name: "",
        type: 1,
        categoryidarr:[],
        clientarr: [1],
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
        clientarr: [{ required: true, message: '请选择适用终端'}],
        icon: [{ max: 100, message: '长度不能超过100个'}],
        describe: [
          { max: 100, message: '长度不能超过200个'}
        ],
      }
    };
  },
  mounted(){
    this.dictList();
    this.loadCategory();
  },
  methods:{
    //获取常量
    dictList(){
      this.modelAppTypeList = this.$store.getters.dict("workflow.model.modelapptype");
      this.clientList = this.$store.getters.dict("workflow.sys.client");
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
      getModelApp(id).then(resp => {
        this.spinning = false;
        this.$emit("enableOkBtn");
        let {name, type, categoryidarr,clientarr, icon, describe} = resp.result;
        this.formData = {name, type, categoryidarr,clientarr, icon, describe}
      }).catch(err => showError(err));
    },
    //获取分类
    loadCategory(){
      listCategoryByType(1).then(resp => {
        this.loadData(this.selectedid);
        let result = resp.result;
        if(result && result.length > 0){
          result.forEach(item => {
            this.categoryList.push({value:item.id,text:item.name});
          });
        }
      }).catch(err => showError(err))
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
      addModelApp(data).then(res => {
        this.spinning = false;
        this.$notification.success({
          message: "提示",
          description: "新增成功！",
          duration: 3,
        });
        this.$emit("closeModel");
      }).catch(err => {
        this.spinning = false;
        showError(err);
      });
    },
    update(data){
      data.id = this.selectedid;
      updateModelApp(data).then(res => {
        this.spinning = false;
        this.$notification.success({
          message: "提示",
          description: "修改成功！",
          duration: 3
        });
        this.$emit("closeModel");
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