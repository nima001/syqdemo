<template>
  <div class="org-listednumber">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">机构挂牌情况：{{data}}，{{attachname}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**机构挂牌情况
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
    attachname() {
      let tip = "挂牌机构是否超过2个及以上：";
      if(this.data) {
        if(this.data.indexOf("、") != -1) {
          return tip + "是"
        }else{
          return tip + "否"
        }
      }else{
        return tip + "否"
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    getHtml() {
      let text = `<p style="${pStyle}">机构挂牌情况：${this.data}，${this.attachname}</p>`
      return createReportItem(text, '关联情况分析')
    }
  },
};
</script>
<style lang="less" scoped>
.org-listednumber{  
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