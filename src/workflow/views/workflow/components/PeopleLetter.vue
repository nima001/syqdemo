<template>
  <div class="peopleLetter">
    <div v-if="show">
      <h2>{{property.name}}</h2>
      <a-row :gutter="10">
        <a-col :span="6" :offset="1">
          <org :property="property.childs[0]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="1" class="lineHeight">:</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="2" class="lineHeight" :offset="1" style="text-align:right">兹介绍</a-col>
        <a-col :span="4">
          <user :property="property.childs[1]" :bindform="bindform"></user>
        </a-col>
        <a-col :span="3" class="lineHeight">同志等 壹 名到</a-col>
        <a-col :span="4">
          <org :property="property.childs[2]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="3" class="lineHeight">工作，请接洽。</a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="lineHeight" :offset="1">（附名单）</a-col>
        <a-col :span="4" :offset="4">
          <date-box :property="property.childs[3]" :bindform="bindform"></date-box>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="4" :offset="1">
          <user :property="property.childs[4]" :bindform="bindform"></user>
        </a-col>
        <a-col :span="4">
          <combo-box :property="property.childs[5]" :bindform="bindform"></combo-box>
        </a-col>
        <a-col :span="4">
          <org :property="property.childs[6]" :bindform="bindform"></org>
        </a-col>
        <a-col :span="4">
          <input-text :property="property.childs[7]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="4">
          <input-text :property="property.childs[8]" :bindform="bindform"></input-text>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="4" :offset="1">
          <combo-box :property="property.childs[9]" :bindform="bindform"></combo-box>
        </a-col>
        <a-col :span="4">
          <combo-box :property="property.childs[10]" :bindform="bindform"></combo-box>
        </a-col>
        <a-col :span="4">
          <combo-box :property="property.childs[11]" :bindform="bindform"></combo-box>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="20" :offset="1">
          <input-text :property="property.childs[12]" :bindform="bindform"></input-text>
        </a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="1" class="lineHeight" :offset="14">*限</a-col>
        <a-col :span="4">
          <date-box :property="property.childs[13]" :bindform="bindform"></date-box>
        </a-col>
        <a-col :span="3" class="lineHeight">前报道有效</a-col>
      </a-row>
      <a-row :gutter="10">
        <a-col :span="4" :offset="7">
          <input-text :property="property.childs[14]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="1" class="lineHeight">第（</a-col>
        <a-col :span="4">
          <input-text :property="property.childs[15]" :bindform="bindform"></input-text>
        </a-col>
        <a-col :span="1" class="lineHeight">）</a-col>
        <a-col :span="4">
          <number-box :property="property.childs[16]" :bindform="bindform"></number-box>
        </a-col>
        <a-col :span="1" class="lineHeight">号</a-col>
      </a-row>
    </div>
    <div class="showLetter" v-else>
      <h2>{{property.name}}</h2>
      <div class="head">
        <span>{{formData[property.childs[0].code]?formData[property.childs[0].code].name:''}}：</span>
        <p>
          兹介绍
          <span>{{formData[property.childs[1].code]?formData[property.childs[1].code].username:''}}</span> 同志等 壹 名到
          <span>{{formData[property.childs[2].code]?formData[property.childs[2].code].name:''}}</span> 工作，请接洽。
        </p>
      </div>
      <div class="middle">
        <span>（附名单）</span>
        <span>{{formData[property.childs[3].code]?formData[property.childs[3].code].substr(0, 10):''}}</span>
      </div>
      <div class="content">
        <ul>
          <li>
            <span>姓名</span>
            <span>性别</span>
            <span>原工作单位</span>
            <span>原职务</span>
            <span>级别</span>
          </li>
          <li>
            <span>{{formData[property.childs[4].code]?formData[property.childs[4].code].username:''}}</span>
            <span>{{sex}}</span>
            <span>{{formData[property.childs[6].code]?formData[property.childs[6].code].name:''}}</span>
            <span>{{formData[property.childs[7].code]}}</span>
            <span>{{formData[property.childs[8].code]}}</span>
          </li>
          <li>
            <span style="display:flex;align-items:center;justify-content:center;">附记</span>
            <span class="inner">
              <ul>
                <li>{{property.childs[9].name}}</li>
                <li>{{property.childs[10].name}}</li>
                <li>{{property.childs[11].name}}</li>
              </ul>
            </span>
            <span class="inner">
              <ul>
                <li>{{reason}}</li>
                <li>{{material}}</li>
                <li>{{transfer}}</li>
              </ul>
            </span>
            <span style="display:flex;align-items:center;justify-content:center;">备注</span>
            <span>{{formData[property.childs[12].code]}}</span>
          </li>
        </ul>
        <p
          style="text-align:center"
        >*限{{formData[property.childs[13].code]?formData[property.childs[13].code].substr(0, 10):''}} 前报到有效</p>
      </div>
      <p
        style="text-align:right;margin-top:10px;"
      >{{formData[property.childs[14].code]}}第（{{formData[property.childs[15].code]}}）{{formData[property.childs[16].code]}}号</p>
    </div>
  </div>
</template>
<script>
import Org from "./Org";
import User from "./User";
import DateBox from "./DateBox";
import ComboBox from "./ComboBox";
import InputText from "./InputText";
import NumberBox from "./NumberBox";
import {Row,Col} from 'ant-design-vue';
export default {
  name: "PeopleLetter",
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
      show: true,
      reason: "",
      sex: "",
      material: "",
      transfer: ""
    };
  },
  components: {
    ARow:Row,
    ACol:Col,
    Org,
    User,
    DateBox,
    ComboBox,
    InputText,
    NumberBox
  },
  created() {
    if (this.allowCommit != 1) {
      this.show = false;
      //取下拉框的值
      this.property.childs[5].options.forEach((item, index) => {
        if (index == this.formData[this.property.childs[5].code][0]) {
          this.sex = item.text;
        }
      });
      this.property.childs[9].options.forEach((item, index) => {
        if (index == this.formData[this.property.childs[9].code][0]) {
          this.reason = item.text;
        }
      });
      this.property.childs[10].options.forEach((item, index) => {
        if (index == this.formData[this.property.childs[10].code][0]) {
          this.material = item.text;
        }
      });
      this.property.childs[11].options.forEach((item, index) => {
        if (index == this.formData[this.property.childs[11].code][0]) {
          this.transfer = item.text;
        }
      });
    }
    this.$store.commit({
      type: "SET_FORM_DATA",
      data: this.formData
    });
  }
};
</script>
<style lang="less" scoped>
.peopleLetter {
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
  .head {
    span {
      text-decoration: underline;
    }
    p {
      padding-left: 50px;
      margin-top: 10px;
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
  }
  .content {
    border-bottom: 2px solid gray;
    > ul {
      text-align: center;
      border: 1px solid #ddd;
      li {
        display: flex;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }
        span {
          display: inline-block;
          width: 20%;
          padding: 10px 0;
          border-right: 1px solid #ddd;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:last-child {
            border-right: none;
          }
        }
        .inner {
          padding: 0;
          li {
            display: flex;
            justify-content: center;
            height: 32px;
            padding: 5px 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>

