<template>
    <div class="unit-info">
        <div class="unit-info-top">
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
            <p class="unit-info-title">基本信息</p>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="名称" v-bind="formItemLayout" >
                        <a-input v-model="form.username" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <p class="unit-info-title">组织信息</p>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="所在组织" v-bind="formItemLayout" >
                        <a-input v-model="form.name" :read-only="ifedit"></a-input>
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
            <p class="unit-info-title">联系信息</p>
            <a-row>
                <a-col :span='8'>
                    <a-form-model-item label="联系人" v-bind="formItemLayout" >
                        <a-input v-model="form.linkedusername" :read-only="ifedit"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span='8'>
                    <a-form-model-item label="手机号码" v-bind="formItemLayout" >
                        <a-input v-model="form.mobilephone" :read-only="ifedit"></a-input>
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
            </a-row>
        </a-form-model>
        
        
    </div>
</template>

<script>
import {Row, Col, FormModel, Input, Button} from "ant-design-vue"
import { showError } from "@/framework/utils/index";
import {editUnitInfo} from "@/idm/api/account";
import {getOrg} from "@/idm/api/combOrg.js";
export default {
    components: {
        ARow: Row,
        ACol: Col,
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        AButton: Button,
    },
    name: 'UnitInfo',
    props: ["unit"],
    created(){
        this.form.username = this.unit.username;
        this.form.mobilephone = this.unit.mobilephone;
        this.form.officephone = this.unit.officephone;
        this.form.email = this.unit.email;
        this.form.position=this.unit.position;
        this.form.job=this.unit.job;
        this.form.linkedusername=this.unit.linkedusername;
        let params = {
            oid: this.unit.orgid
        };
        getOrg(params).then(res=>{
            this.form.name = res.result.name;
        })
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
                name:'',
                position:'',
                job:'',
                mobilephone:'',
                officephone:'',
                email:'',
                linkedusername:''
            },
            ifedit: true,
        };
    },
    methods: {
        save() {
            let paramsform = this.form;
            let params = Object.assign({},paramsform,{accountid:this.unit.accountid, oid:this.unit.orgid})
            console.log(params);
                    editUnitInfo(params).then(res=>{
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
.unit-info{
    height: 100%;
    overflow-y: auto;
    margin: 30px 90px;
    padding-bottom: 80px;
    .unit-info-top{
        margin-bottom: 10px;
    }
    .unit-info-title{
        font-size: 25px;
        line-height: 40px;
        font-weight: bold;
        margin-bottom: 10px;
    }
}
</style>