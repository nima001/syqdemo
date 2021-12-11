<template>
  <div class="wrap">
    <org-distr category="post"></org-distr>
  </div>
</template>
<script>
import OrgDistr from "./OrgDistr";
import Vue from "vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "职数信息",
  components: {
    OrgDistr
  },
  props: {
    org: {
      required: true
    }
  },
  provide() {
    /**
     * provide/inject绑定是不可响应的，
     * 如果传入一个可监听对象，对象属性是可响应的
     */
    const _this = this;
    return {
      formData: new Vue({
        data() {
          return {
            // 初始化表单数据
            data: cloneDeep(_this.org)
          };
        }
      })
    };
  },
  watch: {
    org: {
      handler(v) {
        this._provided.formData.data = v;
      },
      deep: true
    }
  }
};
</script>
<style scoped lang='less'>
.wrap{
    padding: @content-padding-v @content-padding-h;
}
</style>
