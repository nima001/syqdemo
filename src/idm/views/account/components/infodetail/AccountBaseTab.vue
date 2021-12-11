<template>
    <div class="base-info">
        <p class="base-info-head">基本信息</p>
        <p class="base-info-content">
            用户名：{{this.account.loginname}}
            <span class="info-change">[<span class="info-change-font" @click="changename">修改</span>]</span>
        </p>
        <p class="base-info-content">
            账号状态：{{this.dictRender("idm.account.accountstatus", this.account.status)}}
            <span class="info-change" v-if="this.account.status == 3">
                [<span class="info-change-font" @click="changestatus">禁用</span>]
            </span>
            <span class="info-change" v-if="this.account.status == 4">
                [<span class="info-change-font" @click="changestatus">激活</span>]
            </span>
        </p>
        <p class="base-info-content">
            账号类型：{{this.dictRender("idm.account.accounttype", this.account.accounttype)}}
        </p>
        <p class="base-info-content">
            注册时间：{{this.account.createtime}}
            <span class="info-change">[<span class="info-change-font" @click="deleteAccount">注销</span>]</span>
        </p>
        <p class="safety-info-head">
            安全等级 <span class="safety-font">高</span> <a-progress :showInfo="false" :percent="100" class="safety-percent" />
        </p>
        <div class="safety-content" v-if="this.account.accounttype == 1">
            <img class="safety-content-img" src="../../../../assets/img/idm-safety-auth.png"/>
            <div class="safety-content-info">
                <p class="safety-content-info-title">身份认证</p>
                <p class="safety-content-info-p">认证等级：<span>中级认证</span></p>
            </div>
        </div>
        <div class="safety-content">
            <img class="safety-content-img" src="../../../../assets/img/idm-safety-pwd.png"/>
            <div class="safety-content-info">
                <p class="safety-content-info-title">登录密码</p>
                <p class="safety-content-info-p">密码等级：<span>中级</span></p>
            </div>
            <div class="safety-content-right" @click="resetPwd">重置</div>
        </div>
        <div class="safety-content" v-if="this.account.accounttype == 1">
            <img class="safety-content-img" src="../../../../assets/img/idm-safety-phone.png"/>
            <div class="safety-content-info">
                <p class="safety-content-info-title">绑定手机</p>
                <p class="safety-content-info-p" v-if="this.account.mobilephone">已绑定：<span>{{this.account.mobilephone}}</span></p>
                <p class="safety-content-info-p" v-if="!this.account.mobilephone">未绑定</p>
            </div>
        </div>
        <div class="safety-content" v-if="this.account.accounttype == 1">
            <img class="safety-content-img" src="../../../../assets/img/idm-safety-email.png"/>
            <div class="safety-content-info">
                <p class="safety-content-info-title">绑定邮箱</p>
                <p class="safety-content-info-p" v-if="this.account.email">已绑定：<span>{{this.account.email}}</span></p>
                <p class="safety-content-info-p" v-if="!this.account.email">未绑定</p>
            </div>
        </div>
        <a-modal
                :footer="null"
                v-model="namevisible"
                :width="400"
                :centered="true"
                title="修改用户名"
                :bodyStyle="{ height: '250px', padding: '0'}"
        >
            <change-loginname :accountId="this.account._id" @finish="changeOk" />
        </a-modal>
        <a-modal
            :footer="null"
            v-model="statusvisible"
            :width="250"
            :centered="true"
            title="账号状态"
            :bodyStyle="{ height: '100px', padding: '0'}"
        >
            <change-status :account="this.account" @finish="changeOk" />
        </a-modal>
        <a-modal
                :footer="null"
                v-model="resetvisible"
                :destroyOnClose="true"
                :width="650"
                :centered="true"
                title="重置密码"
                :bodyStyle="{ height: '400px', padding: '0'}"
        >
            <reset-pwd :account="this.account" @finish="resetOk" @cancel="resetCancel"/>
        </a-modal>
        <a-modal
                :footer="null"
                v-model="deletevisible"
                :destroyOnClose="true"
                :width="450"
                :centered="true"
                title="注销"
                :bodyStyle="{ height: '220px', padding: '0'}"
        >
            <account-delete :account="this.account" @finish="deleteOk" @cancel="deleteCancel" />
        </a-modal>
    </div>
</template>

<script>
import {Progress,Modal} from "ant-design-vue";
import ChangeLoginname from "@/idm/components/ChangeLoginname";
import ChangeStatus from "@/idm/components/ChangeStatus";
import ResetPwd from "@/idm/components/ResetPwd";
import AccountDelete from "@/idm/components/AccountDelete";

export default {
    props: ["account"],
    components: {
        AProgress: Progress,
        AModal: Modal,
        ChangeLoginname,
        ChangeStatus,
        ResetPwd,
        AccountDelete,
    },
    data() {
        return {
            namevisible:false,
            statusvisible:false,
            resetvisible:false,
            deletevisible:false,
        }
    },

    created() {

    },
    methods: {
        changename(){
            this.namevisible = true;
        },
        changestatus(){
            this.statusvisible = true;
        },
        resetPwd(){
            this.resetvisible = true;
        },
        deleteAccount(){
            this.deletevisible = true;
        },
        dictRender(key, attr){
            let v =  this.$store.getters.dictKey(key, attr);
            let text = (v && v.text) || '';
            return text;
        },
        changeOk(field,value){
            if (field == 'loginname'){
                this.changeLoginName(value);
                this.namevisible = false;
            }
            if (field == 'status'){
                this.changeStatus(value);
                this.statusvisible = false;
            }
        },
        changeLoginName(value){
            this.account.loginname = value;
        },
        changeStatus(value){
            this.account.status = value;
        },
        resetOk(){
            this.$message.success('密码重置成功！');
            this.resetvisible = false;
        },
        resetCancel(){
            this.resetvisible = false;
        },
        deleteOk(){
            this.$message.success('账号注销成功！');
            this.deletevisible = false;
            this.$router.push({name: 'accountIndex'});
        },
        deleteCancel(){
            this.deletevisible = false;
        },
    },

}
</script>

<style lang="less" scoped>
.base-info{
    height: 100%;
    overflow-y: auto;
    margin: 30px 90px;
    padding-bottom: 80px;
    .base-info-head{
        font-size: 25px;
        line-height: 40px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .base-info-content{
        text-indent: 30px;
        font-size: 16px;
        .info-change{
            margin-left: 10px;
            .info-change-font{
                margin: 0 4px;
                color: #1B5293;
                cursor: pointer;
                font-size: 15px;
            }
        }
    }
    .safety-info-head{
        font-size: 25px;
        line-height: 40px;
        font-weight: bold;
        margin-top: 20px;
        .safety-font{
            font-size: 16px;
            line-height: 40px;
            font-weight: normal;
            color: #52C41A;
            margin: 0 20px;
        }
        .safety-percent{
            width: 400px;
        }
    }
    .safety-content{
        margin-top: 20px;
        height: 80px;
        width: 80%;
        margin-left: 5%;
        border-bottom: #DCDFE6 1px solid;
        .safety-content-img{
            float: left;
            height: 50px;
            width: 50px;
            margin-top: 5px;
            margin-left: 10px;
        }
        .safety-content-info{
            float: left;
            margin-top: 5px;
            margin-left: 60px;
            .safety-content-info-title{
                margin: 0;
                font-size: 20px;
                font-weight: bold;
            }
        }
        .safety-content-right{
            float: right;
            margin-top: 20px;
            margin-right: 20px;
            color: #1B5293;
            cursor: pointer;
        }
    }
}
</style>