<template>
  <div class="base-item">
    <a-row :gutter="20">
      <a-col v-if="data.isYetSy">
        <p class="section">
          <span class="section_content">
            <span> {{data.name}} </span>，隶属于<span>{{data.dependent}}</span>，机构规格为相当于<span>{{politicallevel}}</span>。是否为参公事业单位：<span>{{ifcangong}}</span>，事业单位分类：<span>{{institutionssort}}</span>，经费形式：<span>{{fundform}}</span>。
          </span>
        </p>
      </a-col>
      <a-col v-if="data.isYetXz" :span="24">
        <p class="section">
          <span class="section_content">
            <span>{{data.name}}</span>，隶属于<span>{{data.dependent}}</span>，机构规格为相当于<span>{{politicallevel}}</span>。
          </span>
        </p>
      </a-col>
      <a-col v-if="data.isNew" :span="24">
        <p class="section">
          <span class="section_content">
            <span>{{data.name}}</span>，机构规格为相当于<span>{{politicallevel}}</span>。
          </span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Row, Col } from "ant-design-vue";
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";
//评估项-基本信息
export default {
  components: {
    ARow: Row,
    ACol: Col,
  },
  props: {
    data: Object //内容数据
  },
  computed: {
    politicallevel() {//  机构级别
      return this.dictText('usermanage.org.politicallevel', this.data.politicallevel)
    },
    institutionssort() {//  单位分类
      if (!this.data.hasOwnProperty('institutionssort')) return
      return this.dictText('usermanage.org.institutionssort', this.data.institutionssort)
    },
    fundform() {//  单位形式
      if (!this.data.hasOwnProperty('fundform')) return
      return this.dictText('usermanage.org.fundform', this.data.fundform)
    },
    ifcangong() {//  是否参公
      if (!this.data.hasOwnProperty('ifcangong')) return
      return this.data.ifcangong ? '是' : '否'
    }
  },
  created() {},
  mounted() {},
  methods: {
    dictText(dict, value) {
      let v = this.$store.getters.dictKey(dict, value);
      if(v){
        return v.group ? `${v.group}/${v.text}` :  v.text;
      }
      return "";
    },
    getHtml() {
      let data = '';
      if (this.data.isYetSy) {
        data = `<p style="${pStyle}">${this.data.name}，隶属于${this.data.dependent}，机构规格为相当于${this.politicallevel}。是否为参公事业单位：${this.ifcangong}，事业单位分类：${this.institutionssort}，经费形式：${this.fundform}。</p>`
      } 
      if (this.data.isYetXz) {
        data = `<p style="${pStyle}">${this.data.name}，隶属于${this.data.dependent}，机构规格为相当于${this.politicallevel}。</p>`
      }
      if (this.data.isNew) {
        data = `<p style="${pStyle}">${this.data.name}，机构规格为相当于${this.politicallevel}。</p>`
      }
      return createReportItem(data, '机构基本情况分析')
    }
  }
}
</script>
<style lang="less" scoped>
.base-item{
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