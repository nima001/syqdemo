<template>
  <div class="policy-server">
    <a-row :gutter="20" class="title">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">
            新增职责：{{data.duty}}
          </span>
        </p>
      </a-col>
    </a-row>
    <a-row :gutter="20" class="title">
      <a-col :span="24">
        <p class="section">
          <span class="section_content"> 
            相关政府购买服务范围：
          </span>
        </p>
      </a-col>
    </a-row>
    <a-row class="title" :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content" v-html="scope"> 
          </span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**新增职责和是否已纳入政府购买服务范围
*/
import { Input, Row, Col } from "ant-design-vue"
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index"
export default {
  props: {
    data: Object
  },
  components: { ATextarea: Input.TextArea, ARow: Row, ACol: Col },
  data() {
    return {
      scope: undefined
    };
  },
  watch: {},
  computed: {
  },
  created() {
    this.scope = this.data.scope ? this.data.scope.replace(/\n/g,'<br/>') : '';
  },
  mounted() {
  },
  methods: {
    getHtml() {
      let text = `<p style="${pStyle}">新增职责：${this.data.duty}</p><p style="${pStyle}">相关政府购买服务范围：${this.scope}</p>`
      return createReportItem(text, '关联情况分析')
    }
  },
};
</script>
<style lang="less" scoped>
.policy-server{
  .title{
    padding: @content-padding-v 0;
  }
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
</style>