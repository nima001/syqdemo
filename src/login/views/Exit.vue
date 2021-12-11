<template>
  <div class="exiting">
    <a-icon type="loading"/>正在登出，请稍后…
  </div>
</template>
<script>
import { Spin, Icon } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
import {logout} from '../api/login'

export default {
  name: "Exit",
  components: {
    ASpin: Spin,
    AIcon: Icon,
  },
  computed: {
    ssoLogoutUrl(){
      return this.$store.getters.getConfig('sso.logout');
    }
  },
  created() {
    logout().finally(() => {
      if(this.ssoLogoutUrl){
        (window.top || window).location.replace(this.ssoLogoutUrl);
      }else{
        let { href } = this.$router.resolve('/login');
        (window.top || window).location.replace(href);  
      }
    })
  },
};
</script>
<style lang="less" scoped>
.exiting{
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -15px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  .anticon{
    margin-right: 10px;
    color: @primary-color;
  }
}
</style>