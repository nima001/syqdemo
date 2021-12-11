<template>
  <div class="staff-violate">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content" v-if="data.policyOrgLimit">行政机构限额：{{data.policyOrgLimit}}</span>
          <span class="section_content" v-else>事业机构限额：{{data.businessOrgLimit}}</span>
        </p>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">局级机构限额（包括副局级）：{{data.officeOrgLimit}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**区域机构限额
*/
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: Object
  },
  components: {
    ARow: Row,
    ACol: Col,
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
      let text = this.data.policyOrgLimit 
      ? `行政机构限额：${this.data.policyOrgLimit}` 
      : `事业机构限额：${this.data.businessOrgLimit}`;
      let data = `<p style="${pStyle}">${text}</p><p style="${pStyle}">局级机构限额（包括副局级）：${this.data.officeOrgLimit}</p>`
      return createReportItem(data, '关联情况分析')
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