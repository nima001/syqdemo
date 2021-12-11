<template>
  <div class="complete-reset">
    <a-result
      status="success"
      title="修改成功，请牢记新的登录密码，"
      sub-title="您可以："
    >
      <template #extra>
        <a-button key="console" type="primary" @click="login">
          立即登陆
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import { Result, Button } from "ant-design-vue";
import { resetpwdLogin } from "../../api/resetPassword";
import { showError } from "@/framework/utils/index";
import Bus from '@/framework/utils/EventBus'

export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  components: { AResult: Result, AButton: Button },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      resetpwdLogin({
        serialnum: this.userInfo.serialnum 
      })
      .then(({result}) => {
        this.onLoginSuccess(result);
      })
      .catch(err => {
        showError(err);
      })
    },
    onLoginSuccess(result) {
      Bus.$emit("afterLoginnew", result);
      let redirect = new URLSearchParams(window.location.search).get('redirect');
      if(redirect){
        this.$router.push(redirect);
      }else{
        window.location.replace(process.env.BASE_URL + 'idm/index');
      }
    },
  },
};
</script>