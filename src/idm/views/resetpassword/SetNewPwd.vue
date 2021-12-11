<template>
  <div class="set-pwd">
    <a-form :form="form" class="form-account">

      <a-form-item>
        <a-input-password
          :maxLength="20"
          v-decorator="[
            'password',
            { rules: [{ required: true, validator: validateRules }] },
          ]"
          placeholder="设置密码"
        />
      </a-form-item>

      <a-form-item>
        <a-input-password
          :maxLength="20"
          v-decorator="[
            'repassword',
            { rules: [{ required: true, validator: validateIsSame }] },
          ]"
          placeholder="确认密码"
        />
      </a-form-item>

      <a-form-item class="submit">
        <a-button type="primary" html-type="submit" @click="nextStep">
          下一步
        </a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import { Form, Input, Button } from "ant-design-vue";
import { resetpwdSave } from "../../api/resetPassword";
import JSEncrypt from 'jsencrypt';
import { getPublicKey } from "../../api/idmbase";
import { showError } from "@/framework/utils/index";

export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    AButton: Button,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'phone-idcard' }),
      // RSA加密公钥
      publicKey:undefined,
    };
  },
  watch: {},
  computed: {},
  created() {
    this.inItFn();
  },
  mounted() {},
  methods: {
    inItFn(){
      getPublicKey().then(({result})=>{
        this.publicKey = result;
      }).catch(err=>{
        showError(err);
      });
    },
    //校验
    validateRules(rule, value, callback) {
      //  Todo 正则
      var reg = /^(?=.*\d)(?=.*[a-zA-Z]).{5,10}$/;      
      if (rule.required) {
        if (value) {
          if (value.length < 5) {
            callback("密码长度5-10位");
          } else {
            // if (reg.test(value)) {
            //   callback("密码ges");
            // } else {
              callback();
            // }
          }
        } else {
          callback("请输入密码！");
        }
      } else {
        callback();
      }
    },
    validateIsSame(rule, value, callback) {
      let pwd = this.form.getFieldsValue((['password'])).password;
      if (rule.required) {
        if (value) {
          if (value != pwd) {
            callback("两次密码不一致！");
          } else {
            callback();
          }
        } else {
          callback("请再次输入密码！");
        }
      } else {
        callback();
      } 
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.password !== values.repassword) {
            showError({
              message: '两次密码不一致！'
            });
          } else {
            //  进入下一步
            this.savePwd(values.password);
          }
        } else {
          showError({
            message: '请正确填写表单'
          });
        }
      })
    },
    savePwd(password) {
      let enCrypt = new JSEncrypt();
      enCrypt.setPublicKey(this.publicKey);
      resetpwdSave({
        password: enCrypt.encrypt(password),
        serialnum: this.userInfo.serialnum
      })
      .then(res => {
        this.$emit('toggle-step', 'next');
      })
      .catch(err => {
        showError(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>
.set-pwd{
  overflow: hidden;
  .form-account{
    width: 400px;
    margin: 100px auto 0;
    .submit{
      margin-top: 50px;
      button{
        width: 100%;
      }
    }
  }
}
</style>