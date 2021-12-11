<template>
  <div class="cell">
    <div class="cell-top">
      <p class="title">函数</p>
      <a-select size="small" v-model="sort">
        <a-select-option :value="item" v-for="(item,index) in sorts" :key="index">{{item}}</a-select-option>
      </a-select>
    </div>
    <ul>
      <li v-for="item in computedFnlist" :key="item.name" @click="editorParams(item,1)">
        <a-tooltip placement="topLeft" :overlayStyle="{maxWidth:'max-content'}" :mouseLeaveDelay="0">
          <template slot="title">
            <div v-html="explain(item)"></div>
          </template>
          <div>{{item.name}}</div>
        </a-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFns } from "@person/api/booklet";
import { Tooltip, Select } from "ant-design-vue";
import { mixins} from './minxin';
import {showError} from "@framework/utils/index";
// 函数列表
export default {
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    ATooltip: Tooltip
  },
  mixins:[mixins],
  data() {
    return {
      fnList: [],
      sort: "全部"
    };
  },
  mounted() {
    this.getFnsList();
  },
  computed: {
    sorts() {
      let arr = ["全部"];
      this.fnList.map((item, index) => {
        let str = item.sort;
        if (!arr.includes(str)) {
          arr.push(str);
        }
      });
      return arr;
    },
    computedFnlist() {
      if (this.sort === "全部") {
        return this.fnList;
      } else {
        return this.fnList.filter((item, index) => {
          return item.sort == this.sort;
        });
      }
    }
  },
  methods: {
    getFnsList() {
      getFns(this.namespace)
        .then(res => {
          this.fnList = res.result;
          this.fnArray = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    explain(item) {
      let arr = item["arguments"];
      let variable = arr.some((item, index) => {
        return item.variable;
      });
      let argument = [];
      let argsDesc = [];
      arr.map((item, index) => {
        let desc = item.name +"&nbsp;&nbsp;" +item.desc +(item.optional ? "，选填" : "");
        argument.push(item.name);
        argsDesc.push(desc);
      });
      if (variable) {
        argument = arr.length == 0 ? "..." : arr[0].name + "，" + "...";
      } else {
        argument = argument.join(",");
      }
      const tmpl = loop =>`<table>${loop.map(item => `<tr><td nowrap="nowrap">${item}</td></tr>`).join("")}</table>`;
      let funName = `${item.name}(${argument})`;
      return `${this.joinHtml("函数", funName)}  ${this.joinHtml("功能",item.desc)} ${this.joinHtml("参数", tmpl(argsDesc))} `;
    },
    joinHtml(key, value) {
      return `<table><tr><td nowrap="nowrap" style="vertical-align:top;">${key}：</td><td nowrap="nowrap">${value}</td></tr></table>`;
    }
  }
};
</script>
<style lang='less' scoped>
.cell {
  width: 100%;
  border: 1px solid @border-color-base;
  margin-top: @padding-md;
  height: 360px;
  display: flex;
  flex-direction: column;
  &-top {
    display: flex;
    align-items: center;
    background: #d1d1d180;
    border-bottom: 1px solid #d9d9d9;
    p {
      width: 40%;
      margin: 0px;
      height: 30px;
      line-height: 30px;
      text-indent: 10px;
    }
    .ant-select {
      flex: 1;
      margin-right: 8px;
    }
  }
  ul {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    margin: 0px;
    li {
      padding: 0px 10px;
      width: 100%;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: #d1d1d180;
        cursor: pointer;
      }
    }
  }
}
</style>