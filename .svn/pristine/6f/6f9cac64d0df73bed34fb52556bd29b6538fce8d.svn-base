<template>
    <!--<div>账号id:{{this.account._id}}</div>-->
    <div class="change-div">
        <div v-if="this.account.status == 3">
            <p>禁用后将无法使用该账号。</p>
            <a-button type="primary" block class="forbidden-btn" @click="changeStatus">禁用</a-button>
        </div>
        <div v-if="this.account.status == 4">
            <p>该账号已被禁用,是否恢复正常。</p>
            <a-button type="primary" block class="forbidden-btn" @click="changeStatus">确定</a-button>
        </div>
    </div>
</template>
<script>
import { Button } from "ant-design-vue";
import {changeStatus} from "@/idm/api/account";
import { showError } from "@/framework/utils/index";

export default {
    props: ["account"],
    components: {
        AButton: Button,
    },
    methods: {
        changeStatus(){
            //禁用操作
            let params;
            let accountStaus;
            if (this.account.status == 3){
                params = {accountId:this.account._id,status:4};
                accountStaus = 4;
            }
            if (this.account.status == 4){
                params = {accountId:this.account._id,status:3};
                accountStaus = 3;
            }
            changeStatus(params).then(res=>{
                this.$emit('finish',"status",accountStaus);
            }).catch(err=>{
                showError(err);
            });
        }
    }
}
</script>
<style lang="less" scoped>
.change-div{
    padding-top: 10px;
    text-align: center;
    p{
        font-size: 16px;
    }
    .forbidden-btn{
        width: 60px;
        text-align: center;

    }
}
</style>