<template>
  <div class="search-center">
    <a-input-search
      allowClear
      :loading="loading"
      enterButton
      placeholder="请输入单位名称/人员姓名/身份证号"
      v-model.trim="inputkey"
      @search="onSearch"
    />
    <UserOrgQueryModal v-model="searchkey" @loaded="loading=false"/>
  </div>
</template>
<script>
import { Input, Button } from "ant-design-vue";
import UserOrgQueryModal from './components/UserOrgQueryModal'
import { showError } from "@/framework/utils/index";

export default {
  components: {
    AButton: Button,
    AInputSearch: Input.Search,
    UserOrgQueryModal
  },
  data() {
    return {
      inputkey: undefined,
      loading: false,
      searchkey: undefined,
    };
  },
  methods: {
    onSearch(e) {
      this.loading = !!this.inputkey;
      this.searchkey = this.inputkey;
    },
  },
};
</script> 
<style lang="less" scoped>
.search-center {
  padding: 24px 32px;
  overflow: hidden;
  border: none;
  height: 80px;
}
</style>