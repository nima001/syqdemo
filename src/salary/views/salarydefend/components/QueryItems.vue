<template>
  <div class="itemwrap">
    <div
      class="field"
      v-for="ele in defaultDataArry"
      :key="ele.index"
      v-bind:class="[depth % 2 != 0 ? 'red':'yellow']"
    >
      <div class="column-one">
        <a-popover placement="bottomLeft" trigger="click">
          <template slot="content">
            <div class="popover" :style="{height:'180px',overflow:'auto'}">
              <field-one :fields="fields" :position="0" :searchObj="searchObj"></field-one>
            </div>
          </template>
          <a-input disabled read-only class="code-one" v-model="ele.field.showname">
            <a-tooltip slot="suffix">
              <a-icon type="down" style="color: rgba(0,0,0,.25)" />
            </a-tooltip>
          </a-input>
        </a-popover>
      </div>
      <!-- 等于 -->
      <div class="column-two">
        <a-popover placement="bottomLeft" trigger="click">
          <template slot="content">
            <div class="popover" :style="{height:'180px',overflow:'auto'}">
              <field-one :fields="fields" :position="0" :searchObj="searchObj"></field-one>
            </div>
          </template>
          <a-input disabled read-only class="code-one" v-model="ele.op">
            <a-tooltip slot="suffix">
              <a-icon type="down" style="color: rgba(0,0,0,.25)" />
            </a-tooltip>
          </a-input>
        </a-popover>
      </div>
      <!-- 这是第三个 -->
      <op-select :defaultData="ele" :position="position" :searchObj="searchObj"></op-select>
      <type-one v-if="cType == 1" :searchObj="searchObj" :position="position" :defaultData="ele"></type-one>
      <type-two v-if="cType == 2" :position="position" :defaultData="ele"></type-two>
      <type-three v-if="cType == 3" :position="position" :defaultData="ele"></type-three>
      <type-four v-if="cType == 4" :position="position" :defaultData="ele"></type-four>
      <type-five v-if="cType == 5" :position="position" :defaultData="ele"></type-five>
      <type-six v-if="cType == 6" :position="position" :defaultData="ele"></type-six>
      <type-seven v-if="cType == 7" :position="position" :defaultData="ele"></type-seven>
      <type-eight v-if="cType == 8" :position="position" :defaultData="ele"></type-eight>
      <type-nine
        style=" margin-top: 3px;"
        v-if="cType == 9"
        :position="position"
        :defaultData="ele"
      ></type-nine>
      <type-ten v-if="cType == 10" :position="position" :defaultData="ele"></type-ten>
      <type-eleven
        style=" margin-top: 3px;"
        v-if="cType == 11"
        :position="position"
        :defaultData="ele"
      ></type-eleven>
      <type-twelve v-if="cType == 12" :position="position" :defaultData="ele"></type-twelve>
      <type-thirteen v-if="cType == 13" :position="position" :defaultData="ele"></type-thirteen>
      <type-fourteen v-if="cType == 14" :position="position" :defaultData="ele"></type-fourteen>
      <type-fifteen v-if="cType == 15" :position="position" :defaultData="ele"></type-fifteen>
      <div class="field" v-if="leng >1 && ele !== defaultDataArry[leng - 1]">
        <!-- 判断并且 -->
        <div class="column-two">
          <a-popover placement="bottomLeft" trigger="click">
            <template slot="content">
              <div class="popover" :style="{height:'180px',overflow:'auto'}">
                <field-one :fields="fields" :position="0" :searchObj="searchObj"></field-one>
              </div>
            </template>
            <a-input
              disabled
              read-only
              class="code-one"
              v-model="defaultData.customQueryVos.filter.op"
            >
              <a-tooltip slot="suffix">
                <a-icon type="down" style="color: rgba(0,0,0,.25)" />
              </a-tooltip>
            </a-input>
          </a-popover>
        </div>
        <div class="column-two"></div>
        <div class="column-two"></div>
      </div>
    </div>
    <div class="field">
      <!-- 第二行第一个 -->
      <div class="column-three">
        <a-popover placement="bottomLeft" trigger="click">
          <a-input disabled read-only class="code-one" v-model="defaultDataObj.iscriteria">
            <a-tooltip slot="suffix">
              <a-icon type="down" style="color: rgba(0,0,0,.25)" />
            </a-tooltip>
          </a-input>
        </a-popover>
      </div>
      <!-- 第二行第二个  主要用来占位-->
      <div class="column-three"></div>
      <!-- 第二行第三个 -->
      <div class="column-three" v-if="this.defaultData.customQueryVos">
        <a-popover placement="bottomLeft" trigger="click">
          <a-input disabled read-only class="code-one" v-model="defaultDataObj.scalename">
            <a-tooltip slot="suffix">
              <a-icon type="down" style="color: rgba(0,0,0,.25)" />
            </a-tooltip>
          </a-input>
        </a-popover>
      </div>
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
import { Popover, Input, Tooltip, Icon } from "ant-design-vue";
export default {
  name: "QueryItem",
  data() {
    return {
      defaultDataArry: [],
      defaultDataObj: {},
      leng: 0,
      type: ""
    };
  },
  props: {
    defaultData: {
      type: Object,
      required: true
    },
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
    APopover: Popover,
    AInput: Input,
    ATooltip: Tooltip,
    AIcon: Icon,
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
    this.defaultDataObj = this.defaultData;
    if (this.defaultDataObj.iscriteria == 1) {
      this.defaultDataObj.iscriteria = "关联工资标准";
    } else if (this.defaultDataObj.iscriteria == 0) {
      this.defaultDataObj.iscriteria = "手动录入";
    }
    //判断 filter 是否在
    if (!this.defaultData.customQueryVos) {
      this.type = 0;
      return;
    } else {
      if (this.defaultData.customQueryVos.filter.op == "and") {
        this.defaultData.customQueryVos.filter.op = "并且";
      } else if (this.defaultData.customQueryVos.filter.op == "or") {
        this.defaultData.customQueryVos.filter.op = "或者";
      }
      this.defaultDataArry = this.defaultData.customQueryVos.filter.criteria;
      for (var i = 0; i < this.defaultDataArry.length; i++) {
        this.getListop(this.defaultDataArry[i].field.key);
      }
      this.leng = this.defaultDataArry.length;
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
      for (var i = 0; i < this.defaultDataArry.length; i++) {
        let type = comType(
          this.defaultDataArry[i].field,
          this.defaultDataArry[i].op
        );
        return type;
      }
    }
    //   showname() {
    //     return this.defaultData.field ? this.defaultData.field.showname : "";
    //   }
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
    getListop(key) {
      let data = {
        arith: "",
        modelNs: this.searchObj,
        key
      };
      querylistop(data)
        .then(res => {
          this.opList = res.result;
          for (var j = 0; j < this.defaultDataArry.length; j++) {
            for (var i = 0; i < this.opList.length; i++) {
              if (this.defaultDataArry[j].op == this.opList[i].value) {
                this.defaultDataArry[j].op = this.opList[i].text;
              }
            }
          }
        })
        .catch(err=>{
          showError(err);
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
    flex-wrap: wrap;
    align-items: center;
    .column-one {
      flex: 1;
      height: 30px;
      min-width: 100px;
      margin: 5px 15px 5px 0;
      position: relative;
      /deep/ input {
        cursor: pointer;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
      i {
        font-size: 12px;
      }
    }
    .column-two {
      flex: 1;
      height: 30px;
      min-width: 100px;
      margin: 5px 15px 5px 0;
      position: relative;
      /deep/ input {
        cursor: pointer;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
      i {
        font-size: 12px;
      }
    }
    .column-three {
      flex: 1;
      height: 30px;
      min-width: 100px;
      margin: 5px 15px 7px 0;
      position: relative;
      .active {
        margin-top: 0;
      }
      /deep/ input {
        cursor: pointer;
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
        border-color: @primary-color;
      }
    }
  }
}
</style>