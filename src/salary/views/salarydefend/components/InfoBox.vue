<template>
  <!-- 查看详情modal -->
  <a-modal
    v-if="detailData.ledger"
    :visible="visible"
    title="查看详情"
    width="50vw"
    :footer="null"
    :bodyStyle="bodystyle"
    @cancel="InforCancel"
  >
    <div class="infoBoxforitemdefend">
      <div class="itemName">
        <span class="name">项目名称：</span>
        <a-input
          :value="detailData.name"
          disabled="disabled"
          style="width: 300px;margin-left: 15px"
        />
      </div>
      <div class="itemName">
        <span class="name">项目分类：</span>
        <a-input
          :value="category(detailData.category)"
          disabled="disabled"
          style="width: 300px;margin-left: 15px"
        />
      </div>
      <div class="itemName" v-if="typename==='inner'">
        <span class="name">加/减项：</span>
        <a-select
          disabled="disabled"
          :getPopupContainer="scorllBug"
          style="width:300px;margin-left: 15px"
          :defaultValue=" detailData.issubitem == 0 ?'加项':'减项' "
        ></a-select>
      </div>
      <div class="itemName" v-if="typename==='inner'">
        <span class="name">是否统发：</span>
        <a-select
          disabled="disabled"
          :getPopupContainer="scorllBug"
          style="width:300px;margin-left: 15px"
          :defaultValue=" detailData.isdistribution == 0 ?'统发':'自发' "
        ></a-select>
      </div>
      <div class="itemName" v-if="typename==='inner'">
        <span class="name">标签：</span>
        <!-- 标签 -->
        <span v-for="(item,index) in detailData.tags" :key="index" class="label">{{item}}</span>
      </div>
      <div class="itemName">
        <span class="name">生效时间：</span>
        <a-select
          disabled="disabled"
          :getPopupContainer="scorllBug"
          style="width:300px;margin-left: 15px"
          :defaultValue="detailData.enabledate"
        ></a-select>
      </div>
      <div class="itemName" v-if="typename==='inner'">
        <!-- 展示框 浮动定位 -->
        <span class="rulename">适用范围：</span>
        <div class="rules">
          <query-lists :treeData="treeData" :depth="0" :searchObj="searchObj"></query-lists>
        </div>
      </div>
      <div class="itemName">
        <span class="name">相关台账：</span>
        <!-- 下载 -->
        <span class="down" :title="detailData.ledger.title">{{detailData.ledger.title}}</span>
        <a class="downA" @click="downloadurl">点击下载</a>
      </div>
      <div class="itemName">
        <span class="name">批准文号：</span>
        <a-input :value="num" disabled="disabled" style="width: 300px;margin-left: 15px" />
      </div>
      <div class="itemName">
        <span class="name">发文时间：</span>
        <a-select
          disabled="disabled"
          :getPopupContainer="scorllBug"
          style="width:300px;margin-left: 15px"
          :value="detailData.ledger.dispatchdate"
        ></a-select>
      </div>
    </div>
  </a-modal>
</template>
<script>
import QueryLists from "./QueryLists";
import { download } from "@/framework/api/file";
import { Modal, Input, Select } from "ant-design-vue";
export default {
  props: ["visible", "detailData", "treeData", "typename", "num", "datasource"],
  components: {
    AModal: Modal,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    QueryLists
  },
  name: "Infobox",
  data: function() {
    return {
      bodystyle: {
        "max-height": "70vh",
        overflow: "auto",
        padding: "8px 24px"
      },
      searchObj: "user"
    };
  },
  computed: {
    category() {
      return val => {
        for (let i = 0; i < this.datasource.length; i++) {
          if (this.datasource[i].id == val) {
            return this.datasource[i].name;
          }
        }
      };
    }
  },
  methods: {
    InforCancel() {
      this.$emit("closeModal");
    },
    //select 滚动 问题
    scorllBug(node) {
      return node;
    },
    //下载
    downloadurl() {
      let url = this.detailData.ledger.fileuri;
      download(url);
    },
    //退出 modal
    Modalcancel() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
/* 详情modal */
.infoBoxforitemdefend {
  width: 85%;
  margin: 0 auto;
}
.infoBoxforitemdefend .itemName {
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  .name {
    display: inline-block;
    height: 50px;
    width: 80px;
    line-height: 50px;
    text-align: right;
  }
  .down {
    background-color: #fff;
    padding-top: 0px;
    cursor: pointer;
    width: 58%; /*定义块元素的宽度*/
    white-space: nowrap; /*内容超宽后禁止换行显示*/
    overflow: hidden; /*超出部分隐藏*/
    text-overflow: ellipsis; /*文字超出部分以省略号显示*/
    padding-left: 15px;
  }
  .downA {
    text-decoration: underline;
    padding-left: 20px;
  }
  /* 标签 */
  .label {
    display: inline-block;
    height: 25px;
    width: 66px;
    background-color: @primary-color;
    border-radius: 5px;
    margin-left: 15px;
    line-height: 25px;
    text-align: center;
    color: white;
  }
  /* 信息展示 */
  .rulename {
    display: inline-block;
    height: 330px;
    width: 80px;
    text-align: right;
    float: left;
  }
  .rules {
    display: inline-block;
    margin-left: 15px;
    height: 280px;
    width: 70%;
    border: 1px dotted grey;
    border-radius: 5px;
  }
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 2px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.1);
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>