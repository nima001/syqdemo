<template>
  <div class="wagecheckform">
    <div v-if="show">
      <h1>杭州市余杭区人力资源和社会保障局文件</h1>
      <a-row :gutter="10">
        <a-col :span="4" :offset="4">
          <input-text :property="property.childs[0]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="1" class="lineHeight">字</a-col>
        <a-col :span="1" class="lineHeight">[</a-col>
        <a-col :span="4">
         <input-text :property="property.childs[1]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="1" class="lineHeight">]</a-col>
        <a-col :span="4">
          <number-box :property="property.childs[2]" :bindform="bindform"></number-box>
        </a-col>
        <a-col :span="1" class="lineHeight">号</a-col>
      </a-row>
      <h2>关于机关工作人员增资批复</h2>
      <a-row :gutter="10">
        <a-col :span="4" :offset="3">
          <org :property="property.childs[3]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="17" class="lineHeight">：</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="21" :offset="4">根据国人部发〔2006〕58号、浙人薪〔2006〕306号文件规定，经审核，同意你单位：</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="5" class="lineHeight" :offset="5">一、增加职务工资 壹 人，月增资</a-col>
        <a-col :span="4">
          <number-box :property="property.childs[4]" :bindform="bindform"></number-box>
        </a-col>
        <a-col :span="1" class="lineHeight">元；</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="5" class="lineHeight" :offset="5">二、增加级别工资 壹 人，月增资</a-col>
        <a-col :span="4">
          <number-box :property="property.childs[5]" :bindform="bindform"></number-box>
        </a-col>
        <a-col :span="1" class="lineHeight">元；</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="5" class="lineHeight" :offset="5">三、增加生活性补贴 壹 人，月增资</a-col>
        <a-col :span="4">
          <number-box :property="property.childs[6]" :bindform="bindform"></number-box>
        </a-col>
        <a-col :span="1" class="lineHeight">元。</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="19" :offset="5">执行时间见附表。</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="19" :offset="5">特此批复</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="19" :offset="5">杭州市余杭区人力资源和社会保障局</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="4" :offset="17">
          <date-box :property="property.childs[7]" :bindform="bindform"></date-box>
        </a-col>
      </a-row>
      <p>抄送：区财政局</p>
    </div>
    <div class="showLetter" v-else>
        <h1>杭州市余杭区人力资源和社会保障局文件</h1>
        <p class="middle">{{formData[property.childs[0].code]}}[{{formData[property.childs[1].code]}}]{{formData[property.childs[2].code]}}号</p>
        <h2>关于机关工作人员增资批复</h2>
        <p class="title"><span>{{formData[property.childs[3].code]?formData[property.childs[3].code].name:''}}</span>：</p>
        <p>根据国人部发〔2006〕58号、浙人薪〔2006〕306号文件规定，经审核，同意你单位：</p>
        <p>一、增加职务工资 壹 人，月增资<span>{{formData[property.childs[4].code]}}</span>元;</p>
        <p>二、增加级别工资 壹 人，月增资<span>{{formData[property.childs[5].code]}}</span>元;</p>
        <p>三、增加生活性补贴 壹 人，月增资<span>{{formData[property.childs[6].code]}}</span>元。</p>
        <p>执行时间见附表。</p>
        <p>特此批复</p>
        <p class="right">杭州市余杭区人力资源和社会保障局</p>
        <p class="right">{{formData[property.childs[7].code]?formData[property.childs[7].code].substr(0, 10):''}}</p>
        <p class="title">抄送：区财政局</p>
    </div>
  </div>
</template>
<script>
import Org from "./Org";
import DateBox from "./DateBox";
import InputText from "./InputText";
import NumberBox from "./NumberBox";
import {Row,Col} from 'ant-design-vue';
export default {
  name: "WageCheckForm",
  props: {
    property: {
      type: Object,
      required: true
    },
    bindform: {
      type: Object,
      required: true
    },
    allowCommit: {
      type: Number
    }
  },
  data() {
    return {
      formData: this.$store.getters.formData,
      flag: true,
      show: true
    };
  },
  components: {
    ARow:Row,
    ACol:Col,
    Org,
    DateBox,
    InputText,
    NumberBox
  },
  created() {
    this.$store.commit({
      type: "SET_FORM_DATA",
      data: this.formData
    });
    if (this.allowCommit != 1) {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.wagecheckform {
  position: relative;
  background: #fff;
  padding: 5px;
  margin-top: 10px;
  border-radius: 4px;
  h1{
      text-align: center;
      font-weight: bold;
      color: red;
      font-size: 30px;
      margin-top: 20px;
  }
  h2 {
    text-align: center;
    margin: 15px 100px;
    padding-top: 20px;
    font-size: 26px;
    border-top: 2px solid red;
  }
  p{
      padding:0 100px;
  }
  .lineHeight {
    margin-top: 35px;
  }
}
.showLetter {
  padding: 0 20px;
  p {
    line-height: 2.5;
    font-weight: bold;
    font-size: 16px;
    padding: 0 150px;
    span{
        text-decoration: underline;
    }
  }
  .title{
      padding:0 100px;
  }
  .middle{
        text-align: center;
        font-size: 18px;
    }
    .right{
        text-align: right;
        margin: 0;
    }
}
</style>

