<template>
  <div class="org-namenotation">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">{{data}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**机构命名情况
*/
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: String
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
      return createReportItem(`<p style="${pStyle}">${this.data}</p>`, '关联情况分析')
    }
  },
};
</script>
<style lang="less" scoped>
.org-namenotation{  
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