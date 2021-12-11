<template>
  <div class="transferLetter">
    <div v-if="show">
      <h2>{{property.name}}</h2>
      <a-row :gutter="10">
        <a-col :span="4" :offset="7">
          <input-text :property="property.childs[0]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="1" class="lineHeight">第（</a-col>
        <a-col :span="4">
          <input-text :property="property.childs[1]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="1" class="lineHeight">）</a-col>
        <a-col :span="4">
          <number-box :property="property.childs[2]" :bindform="bindform"></number-box>
        </a-col>
        <a-col :span="1" class="lineHeight">号</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="6" :offset="1">
          <org :property="property.childs[3]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="1" class="lineHeight">:</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="3" class="lineHeight" :offset="1" style="text-align:right;">经研究同意，拟调</a-col>
        <a-col :span="4">
          <org :property="property.childs[4]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="4">
          <user :property="property.childs[5]" :bindform="bindform"></user>
        </a-col>
        <a-col :span="2" class="lineHeight">同志到</a-col>
        <a-col :span="4">
          <org :property="property.childs[6]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="5" class="lineHeight">工作。如本人能服从组织安排，</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="3" class="lineHeight" :offset="1">请办理调动手续，于</a-col>
        <a-col :span="4">
          <date-box :property="property.childs[7]" :bindform="bindform"></date-box>
        </a-col>
        <a-col :span="10" class="lineHeight">前介绍来我局公务员管理科报道。</a-col>
      </a-row>
      <p style="text-align:right;">中共杭州市余杭区委组织部</p>
      <a-row :guuter="10">
        <a-col :span="4" :offset="19">
          <date-box :property="property.childs[8]" :bindform="bindform"></date-box>
        </a-col>
      </a-row>
    </div>
    <div class="showLetter" v-else>
      <h2>{{property.name}}</h2>
      <p
        style="text-align:right"
      >{{formData[property.childs[0].code]}}第（{{formData[property.childs[1].code]}}）{{formData[property.childs[2].code]}}号</p>
      <span>{{formData[property.childs[3].code]?formData[property.childs[3].code].name:''}}：</span>
      <p class="content">
        经研究同意，
        拟调
        <span>{{formData[property.childs[4].code]?formData[property.childs[4].code].name:''}}</span>
        &nbsp;
        <span>{{formData[property.childs[5].code]?formData[property.childs[5].code].username:''}}</span>
        同志到
        <span>{{formData[property.childs[6].code]?formData[property.childs[6].code].name:''}}</span>
        如本人能服从组织安排，请办理调动手续，于
        <span>{{formData[property.childs[7].code]?formData[property.childs[7].code].substr(0, 10):''}}</span>
        前介绍来我局公务员管理科报道。
      </p>
      <p style="text-align:right">中共杭州市余杭区委组织部</p>
      <p
        style="text-align:right"
      >{{formData[property.childs[8].code]?formData[property.childs[8].code].substr(0, 10):''}}</p>
    </div>
  </div>
</template>
<script>
import Org from "./Org";
import User from "./User";
import DateBox from "./DateBox";
import InputText from "./InputText";
import NumberBox from "./NumberBox";
import { Row, Col } from "ant-design-vue";
export default {
  name: "TransferLetter",
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
    ARow: Row,
    ACol: Col,
    Org,
    User,
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
.transferLetter {
  position: relative;
  background: #fff;
  padding: 5px;
  margin-top: 10px;
  border-radius: 4px;
  h2 {
    text-align: center;
    margin: 15px 0;
    font-weight: bold;
    font-size: 19px;
  }
  .lineHeight {
    margin-top: 35px;
  }
}
.showLetter {
  padding: 0 20px;
  p {
    line-height: 2.5;
  }
  span {
    text-decoration: underline;
  }
  .content {
    text-indent: 2em;
  }
}
</style>

