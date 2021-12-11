<template>
  <div class="email-idcard">
    <div class="tip">您正在使用&nbsp;<span>邮箱{{isIdcard}}</span>&nbsp;进行校验</div>
    <div class="container">
      <div class="phone">{{userInfo.email}}</div>
      <a-form :form="form" class="form-account">

        <a-row class="row-code">
          <a-col :span="14">
            <a-form-item class="item-code">
              <a-input
                v-decorator="[
                  'code',
                  { rules: [{ required: true, message: '请输入验证码！' }] },
                ]"
                placeholder="请输入验证码"
              />
            </a-form-item>
          </a-col>
          <div class="verifyimg">
            <a-button v-if="!showTime" @click="getCode">获取验证码</a-button>
            <a-button :disabled="true" v-else>重发验证码({{time}}s)</a-button>
          </div>
        </a-row>

        <a-form-item>
          <a-input
            v-decorator="[
              'loginname',
              { rules: [{ required: true, message: '请输入账号名!' }] },
            ]"
            placeholder="姓名"
          />
        </a-form-item>

        <a-form-item>
          <a-input
            v-decorator="[
              'idcard',
              { rules: [{ required: idcardInput.required, validator: validateRules }] },
            ]"
            :placeholder="idcardInput.placeholder"
          />
        </a-form-item>

        <a-form-item class="submit">
          <a-button type="primary" html-type="submit" @click="nextStep">
            下一步
          </a-button>
        </a-form-item>

      </a-form>

      <div class="info">
        <div class="info-warp">
          <p>*有没收到邮件？</p>
          <p>先检查是否存在垃圾邮件中，如果未收到请再次获取验证码。</p>
          <p @click="selectWay">*重新选择验证方式。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Input, Button, Row, Col } from "ant-design-vue";
import JSEncrypt from 'jsencrypt';
import { getPublicKey } from "../../../api/idmbase";
import { resetpwdSendcode, resetpwdCheckcode, resetpwdValicode } from "../../../api/resetPassword";
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
    AButton: Button,
    ARow: Row,
    ACol: Col
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'email-idcard' }),
      // RSA加密公钥
      publicKey:undefined,
      showTime: false,
      time: 60,
      timer: null,
    };
  },
  watch: {},
  computed: {
    isIdcard() {
      return this.userInfo.idcard ? '+身份证' : '';
    },
    idcardInput() {
      if (this.userInfo.idcard) {
        return { required: true, placeholder: '身份证号码' };
      } else {
        return { required: false, placeholder: '身份证号码(可选)' };
      }
    }
  },
  created() {
    this.inItFn();
  },
  mounted() {},
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    inItFn(){
      getPublicKey().then(({result})=>{
        this.publicKey = result;
      }).catch(err=>{
        showError(err);
      });
    },
    //  校验身份证
    validateRules(rule, value, callback) {
      let idcard18_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0-9][0-9][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;      
      if (rule.required) {
        if (value) {
          if (!idcard18_patter.test(value)) {
            callback("请输入正确的身份证号码！");
          } else {
            callback();
          }
        } else {
          callback("请输身份证号码！");
        }
      } else {
        callback();
      }
    },
    getCode() {
      resetpwdSendcode({
        sendtype: 2,
        serialnum: this.userInfo.serialnum
      })
      .then(({result}) => {
        // this.code = 
        this.showTime = true;
        this.startTimer();
      })
      .catch(err => {
        showError(err);
      })
    },
    startTimer() {
      this.timer = setTimeout(() => {
        if (this.time > 0) {
          this.time --;
          this.timer && clearTimeout(this.timer);
          this.startTimer();
        } else {
          this.showTime = false;
          this.time = 60;
        }
      },1000)
    },
    clearTimer() {
      this.timer = null;
      clearTimeout(this.timer);
    },
    selectWay() {
      this.$emit('toggle-way', 'BackWay');
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if(!err) {
          this.validateCode(values);
        } else {
          showError({
            message: '请正确填写表单'
          });
        }
      })
    },
    validateCode(data) {
      //  检查验证码
      resetpwdCheckcode({
        code: data.code,
        serialnum: this.userInfo.serialnum
      })
      .then(res => {
        this.validateData(data);
      })
      .catch(err => {
        showError(err);
      })
    },
    validateData(data) {
      let enCrypt = new JSEncrypt();
      enCrypt.setPublicKey(this.publicKey);
      resetpwdValicode({
        code: data.code,
        serialnum: this.userInfo.serialnum,
        idcard: enCrypt.encrypt(data.idcard)
      })
      .then(res => {
        //  下一步
        this.$emit('toggle-step', 'ok')
      })
      .catch(err => {
        showError(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>
p{
  margin-bottom: 0;
}
.email-idcard{
  overflow: hidden;
  .tip{
    // text-align: center;
    margin: 50px 0 20px;
    span{
      color: @primary-color;
    }
  }
  .container{
    .phone{
      text-align: center;
      font-size: 18px;
      font-weight: bolder;
      line-height: 50px;
    }
    .form-account{
      width: 400px;
      margin: 20px auto;
      .row-code{
        .verifyimg{
          position: absolute;
          right: 0;
          top: 4px;
          width: 140px;
          button{
            width: 100%;
          }
        }
      }
      .submit{
        margin-top: 50px;
        button{
          width: 100%;
        }
      }
    }
    .info{
      .info-warp{
        width: 400px;
        margin: 0 auto;
        p{
          &:last-child{
            color: @primary-color;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>