<template>
  <div class="staff-violate">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">现核定事业编制{{data.bzzj}}名，实有人员{{data.bzzj_sy}}人，本次申请核增事业编制{{data.adjust}}名。</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**机构编制调整事项基本情况
*/
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: Object
  },
  components: {
    ARow: Row,
    ACol: Col
  },
  data() {
    return {

    };
  },
  watch: {},
  computed: {
  },
  created() {},
  mounted() {

  },
  methods: {
    getHtml() {
      let text = `<p style="${pStyle}">现核定事业编制${this.data.bzzj}名，实有人员${this.data.bzzj_sy}人，本次申请核增事业编制${this.data.adjust}名。</p>`
      return createReportItem(text, '机构编制调整事项基本情况')
    }
  },
};
</script>
<style lang="less" scoped>
.staff-violate{  
  /deep/.ant-row{
    .section{
      line-height: 2em;
      text-indent: 2em;
      margin: 5px 0;
      .section_content{
        text-indent: 2em;
        font-size: 21px;
        font-family: 仿宋_GB2312;
      }
    }
  }
}
</style>