<template>
  <div class="staff-violate">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span v-if="data.hasOwnProperty('policyCompileNum')" class="section_content">行政待分配编制数：{{data.policyCompileNum}}</span>
          <span v-else class="section_content">事业待分配编制数：{{data.businessCompileNum}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**区域内编制限额
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
  mounted() {},
  methods: {
    getHtml() {
      let data = this.data.hasOwnProperty('policyCompileNum')
      ? `<p style="${pStyle}">行政待分配编制数：${this.data.policyCompileNum}</p>`
      : `<p style="${pStyle}">事业待分配编制数：${this.data.businessCompileNum}</p>`
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