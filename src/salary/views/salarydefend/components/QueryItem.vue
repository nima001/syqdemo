<template>
  <div class="itemwrap">
    <div class="field" v-bind:class="[depth % 2 != 0 ? 'red':'yellow']">
      <div class="column-one">
        <a-popover placement="bottomLeft" trigger="click">
          <template slot="content">
            <div class="popover" :style="{height:'180px',overflow:'auto'}">
              <field-one :fields="fields" :position="0" :searchObj="searchObj"></field-one>
            </div>
          </template>
          <a-input disabled read-only class="code-one" v-model="showname">
            <a-tooltip slot="suffix">
              <a-icon type="down" style="color: rgba(0,0,0,.25)" />
            </a-tooltip>
          </a-input>
        </a-popover>
      </div>
      <!-- 等于 -->
      <div class="column-one">
        <a-popover placement="bottomLeft" trigger="click">
          <template slot="content">
            <div class="popover" :style="{height:'180px',overflow:'auto'}">
              <field-one :fields="fields" :position="0" :searchObj="searchObj"></field-one>
            </div>
          </template>
          <a-input disabled read-only class="code-one" v-model="op">
            <a-tooltip slot="suffix">
              <a-icon type="down" style="color: rgba(0,0,0,.25)" />
            </a-tooltip>
          </a-input>
        </a-popover>
      </div>
      <!-- 这是第三个 -->
      <op-select :defaultData="defaultData" :position="position" :searchObj="searchObj"></op-select>
      <type-one
        v-if="cType == 1"
        :searchObj="searchObj"
        :position="position"
        :defaultData="defaultData"
      ></type-one>
      <type-two v-if="cType == 2" :position="position" :defaultData="defaultData"></type-two>
      <type-three v-if="cType == 3" :position="position" :defaultData="defaultData"></type-three>
      <type-four v-if="cType == 4" :position="position" :defaultData="defaultData"></type-four>
      <type-five v-if="cType == 5" :position="position" :defaultData="defaultData"></type-five>
      <type-six v-if="cType == 6" :position="position" :defaultData="defaultData"></type-six>
      <type-seven v-if="cType == 7" :position="position" :defaultData="defaultData"></type-seven>
      <type-eight v-if="cType == 8" :position="position" :defaultData="defaultData"></type-eight>
      <type-nine v-if="cType == 9" :position="position" :defaultData="defaultData"></type-nine>
      <type-ten v-if="cType == 10" :position="position" :defaultData="defaultData"></type-ten>
      <type-eleven v-if="cType == 11" :position="position" :defaultData="defaultData"></type-eleven>
      <type-twelve v-if="cType == 12" :position="position" :defaultData="defaultData"></type-twelve>
      <type-thirteen v-if="cType == 13" :position="position" :defaultData="defaultData"></type-thirteen>
      <type-fourteen v-if="cType == 14" :position="position" :defaultData="defaultData"></type-fourteen>
      <type-fifteen v-if="cType == 15" :position="position" :defaultData="defaultData"></type-fifteen>
    </div>

    <div class="relation" v-if="index < length-1">
      <select-component :keys="position" :relationop="relationop"></select-component>
      <span class="split" @click="split($event)" v-if="depth != 0">拆分</span>
      <span class="union" @click="union($event)" v-if="length>2">组合</span>
    </div>
  </div>
</template>

<script>
import { querylistop } from "@/person/api/integratedquery";
import { comType } from "@/person/utils/index";
import SelectComponent from "./SelectComponent";
import FieldOne from "../fields/FieldOne";
import OpSelect from "../fields/OpSelect";
import TypeOne from "./../fields/TypeOne";
import TypeTwo from "./../fields/TypeTwo";
import TypeThree from "./../fields/TypeThree";
import TypeFour from "./../fields/TypeFour";
import TypeFive from "./../fields/TypeFive";
import TypeSix from "./../fields/TypeSix";
import TypeSeven from "./../fields/TypeSeven";
import TypeEight from "./../fields/TypeEight";
import TypeNine from "./../fields/TypeNine";
import TypeTen from "./../fields/TypeTen";
import TypeEleven from "./../fields/TypeEleven";
import TypeTwelve from "./../fields/TypeTwelve";
import TypeThirteen from "./../fields/TypeThirteen";
import TypeFourteen from "../fields/TypeFourteen";
import TypeFifteen from "../fields/TypeFifteen";
import { Tooltip, Popover, Input } from "ant-design-vue";
import {showError} from '@/framework/utils/index';
export default {
  name: "QueryItem",
  data() {
    return {
      op: ""
    };
  },
  props: {
    length: {
      type: Number,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    depth: {
      type: Number,
      required: true
    },
    defaultData: {
      type: Object,
      required: true
    },
    relationop: {
      type: String,
      required: true
    },
    searchObj: {
      type: String,
      required: true
    }
  },
  provide() {
    return { setField: this.setField };
  },
  components: {
    ATooltip: Tooltip,
    APopover: Popover,
    AInput: Input,
    SelectComponent,
    FieldOne,
    OpSelect,
    TypeOne,
    TypeTwo,
    TypeThree,
    TypeFour,
    TypeFive,
    TypeSix,
    TypeSeven,
    TypeEight,
    TypeNine,
    TypeTen,
    TypeEleven,
    TypeTwelve,
    TypeThirteen,
    TypeFourteen,
    TypeFifteen
  },
  created() {
    if (this.defaultData.op && !this.defaultData.opList) {
      this.getListop(this.defaultData.field.key);
    }
  },
  computed: {
    fields() {
      return this.$store.getters.fields;
    },
    index() {
      return parseInt(this.position.split("_").pop());
    },
    cType() {
      let type = comType(this.defaultData.field, this.defaultData.op);
      return type;
    },
    showname() {
      return this.defaultData.field ? this.defaultData.field.showname : "";
    }
  },
  methods: {
    setField(res) {
      this.getListop(res.key);
      this.$store.commit({
        type: "ADD_FIELD",
        position: this.position,
        field: res
      });
    },
    // addByPosition() {
    //   this.$store.commit({
    //     type: "ADD_BY_POSITION",
    //     data: this.position
    //   });
    // },
    // delByPosition() {
    //   this.$store.commit({
    //     type: "DEL_BY_POSITION",
    //     data: this.position
    //   });
    // },
    getListop(key) {
      let data = {
        arith: "",
        modelNs: this.searchObj,
        key
      };
      querylistop(data)
        .then(res => {
          if (res.code == "success") {
            this.opList = res.result;
            for (var i = 0; i < this.opList.length; i++) {
              if (this.defaultData.op == this.opList[i].value) {
                this.op = this.opList[i].text;
              }
            }
          }
        })
        .catch(err=>{
          showError(err);
        });
    },
    changeValue(e) {
      let val = e.target.value;
      let value =
        this.defaultData.field.datatype == 2 && !isNaN(val)
          ? parseInt(val)
          : val;
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value
      });
    },
    split(position) {
      this.$store.commit({
        type: "SPLIT",
        position: this.position
      });
    },
    union(position) {
      this.$store.commit({
        type: "UNION",
        op: this.relationop,
        position: this.position
      });
    }
  }
};
</script>
<style lang="less" scoped>
.itemwrap {
  .field {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &.red {
      border-left: 2px solid #d60002;
    }
    &.yellow {
      border-left: 2px solid #fbc352;
    }
    .column-one {
      flex: 1;
      height: 30px;
      margin-right: 15px;
      position: relative;
      /deep/ input {
        cursor: pointer;
        border-left: none;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
      i {
        font-size: 12px;
      }
    }
    .ant-select {
      flex: 1;
      margin-right: 15px;
    }
    .ant-input {
      flex: 1;
      margin-right: 15px;
    }
    .anticon {
      font-size: 16px;
      padding: 5px;
      cursor: pointer;
    }
  }
  .relation {
    display: flex;
    align-items: center;
    margin: 15px 0px;
    span {
      width: 72px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      background: #9e9e9e3d;
      border: 1px solid #9e9e9e3d;
      border-radius: 4px;
      cursor: pointer;
      color: #666;
      margin-left: 15px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        border-color: @border-color-base;
      }
    }
  }
}
</style>