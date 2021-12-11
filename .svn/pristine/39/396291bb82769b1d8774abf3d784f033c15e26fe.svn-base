<template>
  <div class="staff-balcklist">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">机构编制审批黑名单：{{result}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**机构黑名单
*/
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: Boolean
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
    result() {
      return this.data ? "存在" : "不存在"
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    getHtml() {
      let data = `<p style="${pStyle}">机构编制审批黑名单：${this.result}</p>`
      return createReportItem(data, '审议条件满足情况')
    }
  },
};
</script>
<style lang="less" scoped>
.staff-balcklist{
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