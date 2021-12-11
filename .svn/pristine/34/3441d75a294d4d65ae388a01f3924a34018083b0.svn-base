<template>
  <div class="area-compoile">
    <a-row v-if="isShow" :gutter="20">
      <a-col :span="24"> 
        <p class="section">
          <span class="section_content">重点领域编制配比要求及现状：{{data.result}}</span>
          <br>
          <span class="section_content">{{data.addition}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
//评估项-重点领域编制配比
export default {
  components: {
    ARow: Row,
    ACol: Col,
  },
  props: {
    data: Object
  },
  computed: {
    isShow() {
      return this.data.hasOwnProperty('display') ? false : true;
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    getHtml() {
      let result = this.data.result ? this.data.result : '';
      let addition = this.data.addition ? this.data.addition : '';
      let text = `<p style="${pStyle}">重点领域编制配比要求及现状：${result}</p><p style="${pStyle}">${addition}</p>`
      return createReportItem(text, '关联情况分析')
    }
  }
}
</script>
<style lang="less" scoped>
.area-compoile{
  margin-bottom: 10px;
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