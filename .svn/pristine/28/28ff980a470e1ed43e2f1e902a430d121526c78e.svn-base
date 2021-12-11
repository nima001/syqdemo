<template>
    <div class="delete-content">
        <p class="delete-title">注销后，将同步删除以下信息：</p>
        <p class="delete-details">* 个人账号信息、身份信息将被清空且无法恢复。</p>
        <div class="footer">
            <a-button @click="close">取消</a-button>
            <a-button type="primary" @click="handleSubmit">确定</a-button>
        </div>
    </div>
</template>
<script>
import {Button} from "ant-design-vue";
import {deleteAccount} from "@/idm/api/account";
export default {
    props: ["account"],
    components: {
        AButton: Button,
    },
    methods: {
        handleSubmit(){
            deleteAccount({accountId:this.account._id}).then(({result}) => {
                this.$emit('finish');
            })
        },
        close() {
            this.$emit('cancel');
        },
    },
}
</script>
<style lang="less" scoped>
.delete-content{
    min-height: 100%;
    padding-top: 20px;
    .delete-title{
        font-size: 18px;
        margin-left: 25px;
    }
    .delete-details{
        font-size: 16px;
        margin-left: 25px;
    }
    .footer{
        float: right;
        margin-right: 25px;
        margin-top: 45px;
        button{
            margin-left: 25px;
        }
    }
}
</style>