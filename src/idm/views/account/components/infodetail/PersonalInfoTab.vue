<template>
    <div class="personal-info">
        <div class="personal-info-top">
            <a-button v-if="ifedit" type="primary" @click="ifedit=false">编辑</a-button>
            <template v-else>
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="ifedit=true" style="margin-left: 10px;">取消</a-button>
            </template>  
        </div>
        <a-form-model 
            ref="form"
            :model="form"
        >
            <p class="personal-info-title">基本信息</p>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="姓名" v-bind="formItemLayout" >
                        <a-input v-model="form.username" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span='8'>
                    <a-form-model-item label="性别" v-bind="formItemLayout" >
                        <a-input v-model="form.sex" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span='8'>
                    <a-form-model-item label="证件类型" v-bind="formItemLayout" >
                        <a-input v-model="form.idtype" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="身份证号" v-bind="formItemLayout" >
                        <a-input v-model="form.idcard" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <p class="personal-info-title">组织信息</p>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="所在组织" v-bind="formItemLayout" >
                        <a-input v-model="form.orgname" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="职务" v-bind="formItemLayout" >
                        <a-input v-model="form.position" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                 <a-col :span='8'>
                    <a-form-model-item label="岗位" v-bind="formItemLayout" >
                        <a-input v-model="form.job" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <p class="personal-info-title">联系信息</p>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="手机号码" v-bind="formItemLayout" >
                        <a-input v-model="form.mobilephone" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span='8'>
                    <a-form-model-item label="虚拟短号" v-bind="formItemLayout" >
                        <a-input v-model="form.virtualcornet" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span='8'>
                    <a-form-model-item label="办公室电话" v-bind="formItemLayout" >
                        <a-input v-model="form.officephone" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="邮箱" v-bind="formItemLayout" >
                        <a-input v-model="form.email" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                 <a-col :span='16'>
                    <a-form-model-item label="办公地址" v-bind="formItemLayout1" >
                        <a-input v-model="form.officeaddress" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span='16'>
                    <a-form-model-item label="家庭地址" v-bind="formItemLayout1" >
                        <a-input v-model="form.homeaddress" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
        
        
    </div>
</template>

<script>
import {Row, Col, FormModel, Input, Button} from "ant-design-vue"
import { showError } from "@/framework/utils/index";
import {editPersonalInfo} from "@/idm/api/account";
export default {
    components: {
        ARow: Row,
        ACol: Col,
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        AButton: Button,
    },
    name: 'PersonalInfo',
    props: ["personal"],
    created(){
        this.form.username = this.personal.username;
        this.form.idcard = this.personal.idcard;
        this.form.orgname = this.personal.orgname;
        this.form.mobilephone = this.personal.mobilephone;
        this.form.officephone = this.personal.officephone;
        this.form.email = this.personal.email;
        if(this.personal.sex == 1){
            this.form.sex = '男'
        }else if(this.personal.sex == 0){
            this.form.sex = '女'
        };
        this.form.position=this.personal.position;
        this.form.job=this.personal.job;
        this.form.idtype=this.personal.idtype;
        this.form.officeaddress=this.personal.officeaddress;
        this.form.homeaddress=this.personal.homeaddress;
        this.form.virtualcornet=this.personal.virtualcornet;
    },
    data() {
        return {
            formItemLayout: {
                labelCol: {
                span: 8 
                },
                wrapperCol: {
                span: 16 
                },
            },
            formItemLayout1: {
                labelCol: {
                span: 4 
                },
                wrapperCol: {
                span: 20 
                },
            },
            
            form: {
                username:'',
                sex:'',
                idtype:'',
                idcard:'',
                orgname:'',
                position:'',
                job:'',
                mobilephone:'',
                officephone:'',
                email:'',
                virtualcornet:'',
                officeaddress:'',
                homeaddress:''
            },
            ifedit: true,
        };
    },
    methods: {
        save() {
            let paramsform = this.form;
            if(this.form.sex == '男'){
                paramsform.sex = 1
            }else if(this.form.sex == '女'){
                paramsform.sex = 0
            }else{
                delete paramsform.sex
            };
            let params = Object.assign({},paramsform,{accountid:this.personal.accountid})
                    editPersonalInfo(params).then(res=>{
                        if(this.form.sex == 1){
                            this.form.sex = '男'
                        }else if(this.form.sex == 0){
                            this.form.sex = '女'
                        };
                        this.$message.success('编辑成功')
                        this.ifedit = true
                    }).catch(err=>{
                        showError(err);
                    });
        }
    }
    
}
</script>

<style lang="less" scoped>
.personal-info{
    height: 100%;
    overflow-y: auto;
    margin: 30px 90px;
    padding-bottom: 80px;
    .personal-info-top{
        margin-bottom: 10px;
    }
    .personal-info-title{
        font-size: 25px;
        line-height: 40px;
        font-weight: bold;
        margin-bottom: 10px;
    }
}
</style>