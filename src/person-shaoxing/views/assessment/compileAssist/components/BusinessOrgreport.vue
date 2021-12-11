<template>
  <div class="business-orgreport">
    <a-row :gutter="20">
      <a-col :span="24">
        <p class="section">
          <span class="section_content">事业单位运行评估情况：{{result}}</span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/*
**事业单位运行评估结果
*/
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
export default {
  props: {
    data: Number
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
      if(this.data == 1) {
        return '事业单位运行评估通过'
      }else if(this.data == 2){
        return '事业单位运行评估未通过'
      }else{
        return '事业单位运行评估进行中'
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    getHtml() {
      let data = `<p style="${pStyle}">事业单位运行评估情况：${this.result}</p>`
      return createReportItem(data, '审议条件满足情况')
    }
  },
};
</script>
<style lang="less" scoped>
.business-orgreport{  
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