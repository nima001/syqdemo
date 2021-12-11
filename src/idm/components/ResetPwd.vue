<template>
    <div class="reset-content">
        <a-form :form="form" class="form-reset">
            <a-row>
                <a-col :span="18">
                    <a-form-item
                        label="设置密码"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <a-input
                            v-decorator="[
                              'password',
                              { rules: [{ required: true, message: '请输入密码!' }] },
                            ]"
                            placeholder="请输入或点击右侧图标自动生成随机密码"
                        >
                            <a-icon slot="addonAfter" type="reload" @click="getGeneratePwd" />
                        </a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-form-item class="switch-form"
                    label="是否短信通知"
                    :label-col="{ span: 7 }"
                    :wrapper-col="{ span: 17 }"
                >
                    <a-switch class="switch-btn"
                        checked-children="开"
                        un-checked-children="关"
                        @change="switchChange"
                        v-decorator="[
                        'sendsms',
                        {
                          initialValue: isMsgTemp, valuePropName: 'checked',
                          rules: [{ required: false, message: '请选择是否短信通知!' }]
                        }]"
                    />
                </a-form-item>
            </a-row>
            <a-row v-show="isMsgTemp">
                <a-col :span="6"></a-col>
                <a-col :span="18" class="mobile-hint">
                    <span>向{{this.account.mobilephone}}发送短信通知</span>
                </a-col>
            </a-row>
            <a-row v-show="isMsgTemp">
                <a-col :span="18">
                    <a-form-item
                        label="短信模板"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 10 }"
                    >
                        <a-select
                            @change="msgChange"
                            v-decorator="[
                              'tempid',
                              {initialValue: msgList[0] && msgList[0].id, rules: [{ required: false, message: '请输入短信模板!' }] },
                            ]"
                        >
                            <a-select-option v-for="msg in msgList" :value="msg.id" :key="msg.id">
                                {{msg.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row v-show="isMsgTemp">
                <a-form-item
                    label="短信内容"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 16 }"
                >
                    <a-textarea
                        v-decorator="[
                            'msgtemplate',
                            { initialValue: currentMsg, rules: [{ required: isMsgTemp, message: '请输入短信内容!' }] },
                          ]"
                        placeholder="请输入"
                        :auto-size="{ minRows: 3, maxRows: 3 }"
                        :autosize="true"
                    />
                </a-form-item>
            </a-row>
        </a-form>
        <div class="footer">
            <a-button @click="close">取消</a-button>
            <a-button type="primary" @click="handleSubmit">重置</a-button>
        </div>
    </div>
</template>
<script>
import {Form, Row, Col, Input, Icon, Switch, Select, Button} from "ant-design-vue";
import JSEncrypt from 'jsencrypt';
import { getPublicKey } from "@/idm/api/idmbase";
import { showError } from "@/framework/utils/index";
import {generatePwd, resetPwd} from "@/idm/api/account";
import {queryByGroupby, resetPwdMsgContent} from "@/idm/api/msgtemplate";

export default {
    props: ["account"],
    components: {
        AForm: Form,
        ARow: Row,
        ACol: Col,
        AFormItem: Form.Item,
        AInput: Input,
        AIcon: Icon,
        ASwitch: Switch,
        ASelect: Select,
        ASelectOption: Select.Option,
        ATextarea: Input.TextArea,
        AButton: Button,
    },
    data() {
        return {
            form: this.$form.createForm(this, {name: 'reset_pwd'}),
            isMsgTemp: true,
            msgList: [],
            currentMsg: undefined,
            // RSA加密公钥
            publicKey:undefined,

        }
    },
    created() {
        this.inItFn();
        this.getMsgTemplate();
    },
    methods: {
        inItFn(){
            getPublicKey().then(({result})=>{
                this.publicKey = result;
            }).catch(err=>{
                showError(err);
            });
        },
        getGeneratePwd(){
            generatePwd({accountId:this.account._id}).then(({result}) => {
                this.form.setFieldsValue({
                    password: result,
                });
            })
        },
        switchChange(ev) {
            this.isMsgTemp = ev;
        },
        getMsgTemplate() {
            queryByGroupby({ groupby: 5 }).then(({result}) => {
                this.msgList = result;
                this.getResetPwdMsgContent(result[0]);
            })
            .catch(err => {
                showError(err);
            })
        },
        msgChange(value) {
            this.msgList.forEach(item => {
                if (item.id === value) {
                    this.getResetPwdMsgContent(item);
                }
            })
        },
        getResetPwdMsgContent(showmsg) {
            resetPwdMsgContent({tempid:showmsg.id,loginname:this.account.loginname}).then(({result}) => {
                this.currentMsg = result;
                this.form.setFieldsValue({
                    msgtemplate: result,
                });
            })
        },
        close() {
            this.$emit('cancel');
        },
        handleSubmit(e){
            let that = this;
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    let enCrypt = new JSEncrypt();
                    enCrypt.setPublicKey(this.publicKey);
                    let params = Object.assign({},values,{accountid:this.account._id, password:enCrypt.encrypt(values.password)});
                    resetPwd(params).then(res=>{
                        this.$emit('finish');
                    }).catch(err=>{
                        showError(err);
                    });
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.reset-content{
    min-height: 100%;
    padding-top: 20px;
    .switch-form{
        margin-bottom: 0;
        .switch-btn{
            width: 60px;
        }
    }
    .mobile-hint{
        margin: 10px 0;
        span{
            font-size: 15px;
        }
    }
    .footer{
        float: right;
        margin-right: 40px;
        margin-top: 15px;
        button{
            margin: 0 10px;
        }
    }
}
</style>