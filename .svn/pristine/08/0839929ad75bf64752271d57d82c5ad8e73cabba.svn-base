<template>
    <!--账号id:{{this.accountId}}-->
    <div class="form-div">
    <a-form :form="form" @submit="handleSubmit">
        <a-form-item
            :validate-status="accountNameError() ? 'error' : ''"
            :help="accountNameError() || ''"
        >
            <a-input class="name-input"
                    v-decorator="[
                    'loginname',
                    {rules: [{ required: true, message: '请输入用户名!' }]}
                  ]"
                    placeholder="用户名"
            ></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())" block class="login-btn">修改</a-button>
        </a-form-item>
    </a-form>
    </div>
</template>
<script>
import { Form, Input, Button } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
import {accountUpdate} from "@/idm/api/account";
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
    props: ["accountId"],
    data() {
        return {
            hasErrors,
            form: this.$form.createForm(this),
        };
    },
    components: {
        AInput: Input,
        AForm: Form,
        AFormItem: Form.Item,
        AButton: Button,
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {},
    methods: {
        accountNameError() {
            const { getFieldError, isFieldTouched } = this.form;
            return isFieldTouched("loginname") && getFieldError("loginname");
        },
        handleSubmit(e){
            let that = this;
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    let params = Object.assign({},values,{_id:this.accountId})
                    accountUpdate(params).then(res=>{
                        this.form.setFieldsValue({'loginname': null});
                        this.$emit('finish',"loginname",res.result.loginname);
                    }).catch(err=>{
                        showError(err);
                    });

                }
            });
        },
    },
};
</script>
<style lang="less" scoped>
.form-div{
    width: 65%;
    margin: 0 auto;
    padding-top: 40px;
}
</style>