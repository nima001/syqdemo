<template>
    <div class="org-info">
        <div class="title">{{org && org.name}}</div>
        <div class="top-btn"><!-- v-if="hasPermit('/idm/org/edit')"-->
            <template v-if="editor">
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="editor=false" style="margin-left: 10px;">取消</a-button>
            </template>
            <a-button v-else type="primary" @click="editor=true">编辑</a-button>
        </div>
        <div class="main-form">
            <form-display :formConfig="formConfig" :formLayout="formLayout"  :formData="formData" :editor="editor" ref="formDisplay" v-if="show"/>
        </div>
    </div>
</template>
<script>
    import FormDisplay from "@/formdesign/views/FormDisplay";
    import { Button } from "ant-design-vue";
    import { showError } from "@/framework/utils/index";
    import { orgupdate } from "@/idm/api/org";
    import cloneDeep from "lodash/cloneDeep";

    export default {
        components: {
            AButton: Button,
            FormDisplay
        },
        props: {
            org: {
                type: Object
            }
        },
        data() {
            return {
                // 表单配置
                formConfig: [],
                // 表单初始化数据
                formData: cloneDeep(this.org),
                // 表单可编辑
                editor: false,
                // 表单布局  horizontal vertical
                formLayout: undefined
            };
        },
        computed:{
            show(){
                return this.formConfig.length ==0 ? false:true;
            }
        },
        watch: {
            org: {
                handler(v) {
                    this.formData = v;
                    this.renderForm()
                },
                deep: true
            }
        },
        created() {
            this.renderForm();
        },
        methods: {
            save() {
                // 表单验证并提交
                this.$refs.formDisplay && this.$refs.formDisplay
                    .submit()
                    .then(res => {
                        this.update(res);
                    })
                    .catch(errors => {
                        if(Array.isArray(errors)){
                            let firstError = errors[0];
                            showError({message: firstError.message || firstError})
                        }else{
                            showError(errors)
                        }
                    });
            },
            // 表单提交
            update(data) {
                orgupdate(this.org._id, data)
                    .then(res => {
                        this.formData = Object.assign({},this.formData,res.result)
                        this.editor = false;
                        this.$message.info("保存成功");
                    })
                    .catch(err => {
                        showError(err);
                    });
            },
            /**
             * fn1  : 获取表单数据
             * Fn2  : 获取可编辑的字段
             */
            renderForm(){
                let config = undefined
                if(!this.org || !this.org._id){
                    return false;
                }
                //TODO 该参数临时写死,待自定义表单公用后,进行改造
                let resultZero = JSON.parse("{\"list\":[{\"type\":\"titleBar\",\"code\":\"baseinfo\",\"name\":\"基本信息\"}," +
                    "{\"type\":\"inputText\",\"code\":\"name\",\"name\":\"机构名称\",\"required\":true,\"disabled\":false}," +
                    "{\"type\":\"colLayout\",\"children\":[{\"span\":8,\"components\":[{\"type\":\"inputText\",\"code\":\"shortname\",\"name\":\"规范简称\",\"required\":true,\"disabled\":false}]}," +
                    "{\"span\":8,\"components\":[{\"type\":\"inputText\",\"code\":\"usccode\",\"name\":\"统一社会信用代码\"}]}," +
                    "{\"span\":8,\"components\":[{\"type\":\"selectDict\",\"code\":\"unittype\",\"name\":\"单位类型\",\"dict\":\"usermanage.org.unittype\",\"required\":true,\"disabled\":false}]}]}," +
                    "{\"type\":\"colLayout\",\"children\":[{\"span\":8,\"components\":[{\"type\":\"inputText\",\"code\":\"dependent\",\"name\":\"内设机构\",\"disabled\":false}]}]}," +
                    "{\"type\":\"titleBar\",\"code\":\"contact\",\"name\":\"联系信息\"}," +
                    "{\"type\":\"colLayout\",\"children\":[{\"span\":8,\"components\":[{\"type\":\"selectUser\",\"code\":\"admin\",\"name\":\"联系人\",\"required\":true}]}," +
                    "{\"span\":8,\"components\":[{\"type\":\"inputText\",\"code\":\"admin.mobilephone\",\"name\":\"联系人手机\",\"disabled\":false}]}," +
                    "{\"span\":8,\"components\":[{\"type\":\"inputText\",\"code\":\"admin.officephone\",\"name\":\"电话\",\"disabled\":false}]}]}],\"formLayout\":\"horizontal\"}")

                let configArr = resultZero.list;
                let editCode = "[\"admin\",\"industrysort\"]";
                this.formLayout = resultZero['formLayout']
                this.formatData(configArr,editCode);
                this.formConfig = configArr;
                /*Promise.all([modelForm("organization", this.org._id),getEditableProps('organization')]).then(res=>{
                    debugger;
                    if(res[0]['code'] == "success" && res[1]['code'] == "success"){
                        config = res[0]['code'];
                        let resultZero = JSON.parse(res[0]['result'])
                        let configArr = resultZero.list;
                        let editCode = res[1]['result'];
                        this.formLayout = resultZero['formLayout']
                        this.formatData(configArr,editCode);
                        this.formConfig = configArr;
                    }
                }).catch(err=>{
                    if(config!= "success"){
                        this.formConfig = []
                    }
                    showError(err)
                });*/
            },
            // 判断表单字段是否可编辑
            formatData(formConfig,codeArr){
                (formConfig || []).forEach(c=>{
                    if(c.children){
                        c.children.forEach(ele => this.formatData(ele.components,codeArr))
                    }else{
                        let unittype = this.org['unittype'];
                        if((unittype >= 1 && unittype <= 5) || (unittype == 9)  || (unittype >= 20 && unittype <= 21)){
                            if(codeArr.includes(c.code)){
                                c.disabled = false;
                            }
                        }
                    }
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    .org-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        .title {
            font-size: 20px;
            padding: @content-padding-v @content-padding-h;
        }
        .top-btn {
            padding: 0 @content-padding-h;
        }
        .main-form {
            flex: 1 1 100%;
            min-height: 0;
            margin: @content-padding-v 0;
        }
    }
</style>