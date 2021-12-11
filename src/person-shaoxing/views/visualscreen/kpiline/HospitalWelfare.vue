<template>
  <public-welfare title="医疗公益指数" type="hospital" :defaultTheme='false'></public-welfare>
</template>

<script>
import PublicWelfare from "./PublicWelfare";
export default {
  components: { PublicWelfare },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>