<template>
    <div class="user-info" v-if="account">
        <div class="account-head">
            <div class="account-info">
                <div class="p-left" @click="trigger">
                    <img v-if="avaterPhoto"
                         :src="uiConfigs['api.url'] + '/file/v2/file/download?uri=' + avaterPhoto"
                         :onerror="`this.src='${defaultPhoto}'`"
                    />
                    <a-avatar :size="120" icon="user" />
                    <!--<img v-else :src="defaultPhoto" />-->
                    <input
                            type="file"
                            ref="fileBtn"
                            class="fileBtn"
                            @change="getFile($event)"
                            multiple="multiple"
                    />
                </div>
                <div class="p-right">
                    <div class="welcome">
                        <div>
                            <p class="name">{{account.username}}</p>
                            <p>{{account.loginname}}</p>
                            <p><custom-icon type="phone" class="icon"/>{{account.mobilephone}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="account-content">
            <a-tabs defaultActiveKey="base" tabPosition="top" :animated="false" :tabBarStyle="{padding: '0 24px', color: '#000'}" >
                <a-tab-pane tab="基本信息" key="base">
                    <account-base-tab :account="account" />
                </a-tab-pane>
                <a-tab-pane tab="个人资料" key="personalInfo">
                    <personal-info-tab :personal="personal" />
                </a-tab-pane>
                <a-tab-pane tab="单位资料" key="unitInfo">
                    <unit-info-tab :unit="unit" />
                </a-tab-pane>
                <a-tab-pane tab="用户登录" key="userLogin">
                    <user-login-tab :account="account" />
                </a-tab-pane>
                <a-tab-pane tab="变更记录" key="changeLog">
                    <change-log-tab :account="account" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script>
import {Tabs, Avatar} from "ant-design-vue";
import CustomIcon from "@/framework/components/CustomIcon";
import { getAccount, getPersonalInfo, getUnitInfo } from "@/idm/api/account";
import AccountBaseTab from "./components/infodetail/AccountBaseTab";
import PersonalInfoTab from "./components/infodetail/PersonalInfoTab";
import UnitInfoTab from "./components/infodetail/UnitInfoTab";
import UserLoginTab from "./components/infodetail/UserLoginTab";
import ChangeLogTab from "./components/infodetail/ChangeLogTab";

export default {
    components: {
        AAvatar: Avatar,
        ATabs: Tabs,
        ATabPane: Tabs.TabPane,
        CustomIcon,
        AccountBaseTab,
        PersonalInfoTab,
        UnitInfoTab,
        UserLoginTab,
        ChangeLogTab,
    },
    name: "AccountInfo",
    props: ["loadData"],
    data() {
        return {
            defaultPhoto: require('@/framework/assets/img/account-head-default-120x120.png'),
            account: {},
            avaterPhoto: null,
            personal: {},
            unit:{}
        };
    },
    created() {
        let accountId = this.$route.query.accountId;
        if(accountId){
            this.account = {_id: accountId};
            this.getAccountDetail(accountId);
            let params = {
                accountid: accountId
            }
            this.getPersonalDetail(params);
            this.getUnitDetail(params);
        }
    },
    methods: {
        getAccountDetail(id) {
            getAccount(id).then(({result: account}) => {
                this.account = account;
            })
        },
        getPersonalDetail(params){
            getPersonalInfo(params).then(res => {
                this.personal = res.result
            })
        },
        getUnitDetail(params){
            getUnitInfo(params).then(res=>{
                this.unit = res.result
            })
        },
        trigger() {
            this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
        },
    },
};
</script>
<style lang="less" scoped>
.user-info {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: @border-radius-base;
    background: @white;
    overflow: hidden;
    .account-head {
        flex: none;
        position: relative;
        height: 140px;
        width: 100%;
        background-image: url(../../assets/img/idm-account-background.jpg);
        background-repeat: round;
        .account-info {
            display: flex;
            padding: 10px @content-padding-h;
            .p-left {
                height: 120px;
                width: 120px;
                margin-right: @content-padding-h;
                overflow: hidden;
                cursor: pointer;
                .fileBtn {
                    width: 0;
                    height: 0;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .p-right {
                flex: 1;
                width: auto;
                height: 80px;
                .welcome {
                    height: 80px;
                    p {
                        margin: 5px;
                        font-size: 16px;
                        &.name {
                            line-height: 50px;
                            font-size: 30px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
    .account-content {
        height: 100%;
        flex: auto;
        min-height: 1px;
        .ant-tabs{
            height: 100%;
            :global(.ant-tabs-bar){
                margin-bottom: 0;
            }
            :global(.ant-tabs-content){
                height: 100%;
                overflow-y: auto;
            }
        }
    }
}
</style>