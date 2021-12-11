<template>
  <div class="select-field">
    <div class="wrap">
      <div class="selectWrap" :class="{ fullPage: !multi }">
        <div class="opwrap">
          <a-input
            placeholder="输入字段名搜索"
            v-model="search.key"
            @pressEnter="onSearch"
          >
            <a-icon
              slot="suffix"
              class="clear-search"
              theme="filled"
              :type="search.key ? 'close-circle' : 'search'"
              @click="search.key = undefined"
            />
          </a-input>
        </div>
        <div class="body">
          <template v-if="search.key">
            <div class="loading" v-if="!search.result">
              <a-spin tip="正在搜索..." />
            </div>
            <EmptyData
              class="nodata"
              v-else-if="!search.result.length"
              msg="没有搜索结果"
            />
            <ul v-else class="search-list">
              <template v-for="item in search.result">
                <li
                  :key="item.key"
                  @click="
                    doCheck(
                      item.field,
                      checkedKeys.checked.indexOf(item.key) < 0
                    )
                  "
                >
                  <a-checkbox
                    :checked="checkedKeys.checked.indexOf(item.key) >= 0"
                    :disabled="item.disabled"
                  />
                  <custom-icon :type="item.icon" />
                  <span class="title" v-html="item.title"></span>
                  <div
                    v-if="item.searchtext"
                    class="search-text"
                    v-html="item.searchtext"
                  ></div>
                </li>
              </template>
            </ul>
          </template>
          <div v-else class="tree-list">
            <a-tree
              checkable
              :selectable="false"
              :checked-keys="checkedKeys"
              :tree-data="treeData"
              :check-strictly="true"
              @check="onCheck"
            >
              <template slot="title" slot-scope="item">
                <custom-icon :type="item.icon" class="field-icon" />
                <span>{{ item.title }}</span>
              </template>
            </a-tree>
          </div>
        </div>
      </div>
      <div class="resultWrap" v-if="multi">
        <div class="header">
          <span class="tips">
            已选择
            <span>{{ selected.length }}/{{ list.length }}</span>
          </span>
          <span class="clear" @click="clear">
            <a-icon type="delete" />&nbsp;清空
          </span>
        </div>
        <div class="content">
          <draggable
            :animation="150"
            ghost-class="ghost"
            v-model="selected"
            handle=".item"
          >
            <transition-group>
              <div
                class="listItem"
                v-for="(item, index) in selected"
                :key="item.key"
              >
                <a-icon type="bars" class="item" />
                <custom-icon :type="getIcon(item)" />
                <span>{{ item.showname }}</span>
                <a-icon
                  class="delBtn"
                  type="delete"
                  @click="delSelect(item, index)"
                />
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>
    <div class="footer" :class="{ single: !multi }">
      <div class="left"></div>
      <div class="right" :class="{ multi }">
        <a-button type="primary" @click="onFinish('ok')">确定</a-button>
        <a-button @click="onFinish('cancel')">取消</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Input, Icon, Checkbox, Button, Spin, Tree } from "ant-design-vue";
import EmptyData from "@/framework/components/EmptyData";
import CustomIcon from "@framework/components/CustomIcon";
import draggable from "vuedraggable";
import { showError } from "@/framework/utils/index";

export default {
  name: "FieldSelect",
  components: {
    ATree: Tree,
    ASpin: Spin,
    draggable,
    AInput: Input,
    AIcon: Icon,
    ACheckbox: Checkbox,
    AButton: Button,
    EmptyData,
    CustomIcon,
  },
  props: {
    // 查询对象ID
    targetid: {
      type: Number,
      required: true,
    },
    field: Object,
    //多选模式/默认单选
    multi: {
      type: Boolean,
      default: false,
    },
    // 默认选择
    defaultSelected: {
      type: Array,
      required: false,
    },
    // 最大选择数
    maxSelect: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      treeData: undefined, //当前数据列表
      selected: [], //选中列表
      checkedKeys: {
        checked: [],
      },
      search: {
        id: 0, //搜索ID
        key: undefined, //搜索关键词
        timer: 0, //延时搜索定时器，减少连续输入搜索频率
        result: undefined, //搜索结果
      },
      list: [
        {
          datasource: "usermanage.org.politicallevel",
          datatype: 2,
          joinable: false,
          key: "politicallevel",
          name: "机构级别",
          required: false,
          showname: "机构级别",
        },
        {
          datatype: 4,
          inputtype: 1,
          joinable: false,
          key: "_deptcount",
          name: "内设机构数",
          required: false,
          showname: "内设机构数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.dzqjgxzbz",
          name: "党政群机关行政编制",
          required: false,
          showname: "党政群机关行政编制",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.dzqjgxzbz_sy",
          name: "党政群机关行政编制实有数",
          required: false,
          showname: "党政群机关行政编制实有数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.gqbz",
          name: "工勤编制",
          required: false,
          showname: "工勤编制",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.gqbz_sy",
          name: "工勤编制实有数",
          required: false,
          showname: "工勤编制实有数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.bmldzz",
          name: "部门领导正职",
          required: false,
          showname: "部门领导正职",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.bmldzz_sy",
          name: "部门领导正职实有数",
          required: false,
          showname: "部门领导正职实有数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.bmldfz",
          name: "部门领导副职",
          required: false,
          showname: "部门领导副职",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.nsjgldzsgps",
          name: "内设机构领导职数高配数",
          required: false,
          showname: "内设机构领导职数高配数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.nsjgldzsgps_sy",
          name: "内设机构领导职数高配数实有数",
          required: false,
          showname: "内设机构领导职数高配数实有数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.bwkzs",
          name: "核定编外控制数",
          required: false,
          showname: "核定编外控制数",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.bwsys",
          name: "编外实有数",
          required: false,
          showname: "编外实有数",
        },
        {
          datatype: 4,
          inputtype: 0,
          joinable: false,
          key: "_deptnames",
          name: "内设机构名称列表",
          required: false,
          showname: "内设机构名称列表",
        },
        {
          datatype: 4,
          inputtype: 1,
          key: "_id@organization.statistic.tx_two_xz",
          name: "退休第二年（行政）",
          required: false,
          showname: "退休第二年（行政）",
        },
      ],
    };
  },
  created() {
    this.initData();
  },
  watch: {
    "search.key"() {
      this.onSearch();
    },
  },
  methods: {
    initData() {
      this.selected = this.defaultSelected ? [...this.defaultSelected] : [];
      let key = "";
      this.treeData = this.sort(key, this.list);
      (this.defaultSelected || []).forEach((item) => {
        this.checkedKeys.checked.push(item.key);
      });
    },
    onCheck(checkedKeys, event) {
      let field = event.node.dataRef.field;
      if (!field) {
        return;
      }
      this.doCheck(field, event.checked);
    },
    doCheck(field, checked) {
      if (field.disabled) {
        return;
      }
      if (this.multi) {
        if (checked) {
          //选中
          this.selected.push(field);
          this.checkedKeys.checked.push(field.key);
        } else {
          //取消选中
          let index = this.selected.findIndex((item) => item.key == field.key);
          if (index >= 0) {
            this.selected.splice(index, 1);
          }
          index = this.checkedKeys.checked.findIndex(
            (item) => item == field.key
          );
          if (index >= 0) {
            this.checkedKeys.checked.splice(index, 1);
          }
        }
      } else {
        //单选
        if (checked) {
          //选中
          this.selected = [field];
          this.checkedKeys = { checked: [field.key] };
        } else {
          //取消选中
          this.selected = [];
          this.checkedKeys = { checked: [] };
        }
      }
    },
    onSearch() {
      //清空前一个搜索状态和数据
      clearTimeout(this.search.timer);
      this.search.result = undefined;
      let searchid = ++this.search.id;
      if (this.search.key) {
        this.search.timer = setTimeout(() => {
          if (this.search.id != searchid) {
            return;
          }
          this.search.result = this.doSearch(this.search.key);
        }, 500); //延时500毫秒进行搜索
      }
    },
    doSearch(searchkey) {
      let arr = [];
      let props = this.list;
      props.forEach((item) => {
        let { name, showname, key } = item;
        let index = name.indexOf(searchkey);
        let reg = new RegExp("(" + searchkey + ")");
        if (index >= 0) {
          let searchtext,
            text = name.replace(reg, '<span class="key">$1</span>');
          if (showname.indexOf(name) >= 0) {
            showname = showname.replace(name, text);
          } else {
            //名称在显示的名称中不存在将名称显示在搜索结果中
            searchtext = text;
          }
          arr.push({
            key: item.key,
            icon: this.getIcon(item),
            title: showname,
            searchtext,
            disabled: item.disabled,
            field: item,
          });
        } else {
          index = key.lastIndexOf("."); //去除字段前缀
          if (index > 0) {
            key = key.substr(index + 1);
          }
          index = key.indexOf(searchkey);
          if (index >= 0) {
            arr.push({
              key: item.key,
              icon: this.getIcon(item),
              title: showname,
              searchtext: key.replace(reg, '<span class="key">$1</span>'),
              disabled: item.disabled,
              field: item,
            });
          }
        }
      });
      return arr;
    },
    clear() {
      this.selected = [];
      this.checkedKeys = { checked: [] };
    },
    delSelect(item, index) {
      this.selected.splice(index, 1);
      index = this.checkedKeys.checked.indexOf(item.key);
      if (index >= 0) {
        this.checkedKeys.checked.splice(index, 1);
      }
    },
    onFinish(type) {
      if (type == "ok") {
        let length = this.selected.length;
        if (length) {
          let data = this.multi ? this.selected : this.selected[0];
          this.$emit("finish", type, data);
        } else {
          this.$message.info("请选择字段");
        }
      } else {
        this.$emit("finish", type);
      }
    },
    sort(key, props) {
      let tree = [];
      props.forEach((item) => {
        tree.push({
          title: item.name,
          key: item.key,
          icon: this.getIcon(item),
          field: item,
          scopedSlots: {
            title: "title",
          },
          disableCheckbox: item.disabled,
        });
      });
      return tree;
    },
    getIcon(field) {
      let icon;
      if (field.datatype == 2) {
        //字典
        icon = "dict";
      } else if (field.datatype == 3) {
        //引用
        icon = "refer";
      } else if (field.datatype == 4) {
        //输入类型（排除字符串）
        if (1 == field.inputtype) {
          icon = "int";
        } else if (2 == field.inputtype) {
          icon = "float";
        } else if (3 == field.inputtype) {
          icon = "date";
        } else if (4 == field.inputtype) {
          icon = "bool";
        } else {
          icon = "string";
        }
      }
      return icon;
    },
  },
};
</script>
<style lang='less' scoped>
.select-field {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.wrap {
  flex: auto;
  height: 100%;
  min-height: 1px;
  display: flex;
  .selectWrap {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &.fullPage {
      width: 100%;
    }
    .opwrap {
      padding: @content-padding-v @content-padding-h;
    }
    .clear-search {
      color: @text-color-secondary;
      font-size: 12px;
      &:hover {
        color: @text-color;
      }
    }
    .body {
      flex: 1;
      min-height: 1px;
      /deep/ li.sort > .ant-tree-checkbox {
        display: none;
      }
      .loading {
        text-align: center;
        padding-top: 50px;
      }
      .search-list {
        height: 100%;
        overflow-y: auto;
        li {
          padding: 5px @content-padding-h;
          cursor: pointer;
          &:not(.loading-more):hover {
            background-color: @primary-1;
          }
          & > .icon {
            margin-left: 6px;
            opacity: 0.75;
          }
          & > .title {
            text-indent: 10px;
            padding: 0 4px;
          }

          .search-text {
            font-size: 0.85em;
            padding-left: 24px;
            color: @text-color-secondary;
          }
          /deep/.key {
            color: @accent-color;
          }
        }
        li.loading-more {
          .ant-spin {
            display: block;
            text-align: center;
            .anticon-loading {
              vertical-align: middle;
            }
            /deep/.ant-spin-text {
              display: inline-block;
              vertical-align: middle;
              margin-left: 6px;
              line-height: 30px;
              color: fade(@black, 30%);
            }
          }
        }
      }
      .tree-list {
        height: 100%;
        overflow: auto;
        padding: 0 20px;
        .field-icon {
          margin-right: 4px;
          opacity: 0.75;
        }
      }
    }
  }
  .resultWrap {
    width: 50%;
    border-left: 1px solid @border-color-split;
    display: flex;
    flex-direction: column;
    .header {
      margin: @content-padding-v 0px;
      display: flex;
      justify-content: space-between;
      span {
        margin: @content-padding-v @content-padding-h;
        height: 32px;
        line-height: 32px;
        &.tips {
          padding-left: @padding-sm;
          position: relative;
          &::after {
            content: "";
            width: 4px;
            height: 18px;
            background-color: @primary-color;
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
          span {
            color: @primary-color;
            margin: 0px;
          }
        }
        &.clear {
          cursor: pointer;
          color: @primary-color;
          &:hover {
            color: fade(@primary-color, 75%);
          }
        }
      }
    }
    .content {
      flex: 1;
      overflow: hidden auto;
      padding: 0px @padding-xs;
      .listItem {
        padding: @content-padding-v @padding-sm;
        color: @text-color;
        display: flex;
        align-items: center;
        i {
          cursor: move;
        }
        .icon {
          margin-left: 6px;
          opacity: 0.6;
        }
        span {
          padding: 0px 4px;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover {
          background: @primary-1;
          .delBtn {
            color: @primary-color;
            cursor: pointer;
            visibility: visible;
          }
        }
        &.ghost {
          background: @primary-1;
        }
      }
    }
  }
}
.footer {
  display: flex;
  align-items: center;
  &.single {
    border-top: 1px solid @border-color-split;
  }
  div {
    width: 50%;
    height: 100%;
    &.multi {
      border-left: 1px solid @border-color-split;
      border-top: 1px solid @border-color-split;
    }
    &.right {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding: 10px @content-padding-h;
      button {
        &:last-child {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>