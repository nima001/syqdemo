<template>
  <div class="wrapper">
    <div class="report_wrap">
      <div class="report_wrap_content">
        <Content v-if="assessData" :content="assessData.details" ref="content" />
      </div>
    </div>
    <div class="empty"></div>
  </div>
</template>

<script>
import { addReport } from "@/person-shaoxing/api/assessment";
import Content from "../components/Content";
export default {
  props: {},
  components: {
    Content
  },
  data() {
    return {
      itemList: []
    };
  },
  watch: {},
  computed: {
    assessData() {
      return this.$store.getters.assessData
    },
    content() {
      return this.$store.getters.content
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    onNext() {
      return new Promise((resolve, reject) => {
        let { details, configid, args, inputs, orgname } = this.assessData
        addReport({ details, configid, args, inputs, orgname, content: this.content })
        .then(({result}) =>{
          resolve(true)
        })
        .catch(err => {
          resolve(false)
          showError(err);
        })
      })
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper{
  height: 100%;
  overflow-y: auto;
  padding: 0 @content-padding-h;
  background-color: #eee;
  background-image: url('../../../../assets/img/analysis_watermark.png');
  .report_wrap{
    width: 794px;
    min-height: 1123px;
    margin: 20px auto;
    -webkit-box-shadow: 1px 1px 20px #dad9d9;
    box-shadow: 1px 1px 20px #dad9d9;
    background-color: @white;
    overflow: hidden;
    .report_wrap_content{
      margin: 96px 120px;
      .title{
        line-height: 2em;
        margin: 15px 0;
        font-size: 16pt;
        color: black;
        font-family: 黑体,SimHei;
        font-weight: bold;
      }
    }
  }
  .empty{
    position: absolute;
    left: 50%;
    top: -20px;
    transform: translateX(-410px);
    width: 800px;
    height: 20px;
    z-index: 999;
    -moz-box-shadow:0px 5px 10px -5px #dad9d9; 
    -webkit-box-shadow:0px 5px 10px -5px #dad9d9; 
    box-shadow:0px 5px 10px -5px #dad9d9;
  }
}
</style>