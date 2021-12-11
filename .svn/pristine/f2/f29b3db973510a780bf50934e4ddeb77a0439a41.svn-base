<template>
  <div class="report-temp-data-source">
    <div class="header">
      <a-button type="dashed" @click="addDataSource" style="width: 100%;">
        <a-icon type="plus" /> 添加自定义数据
      </a-button>
    </div>
    <div class="body">
      <ul class="ul">
        <li v-for="(item,index) in dataSource" 
          :key="item.id"
          @click="editor(item,index)"
          class="list"
          :title="item.name"
        >
          <span class="name">{{item.name}}</span><span class="code">({{item.code}})</span>
          <a-icon class="icon" type="delete" @click.stop="showConfirm(index)" />
        </li>
      </ul>
    </div>
    <expand-form v-model="expandModal" :initData='initData' @ok="emitOk"/>
  </div>
</template>
<script>
import { Input, Icon, Modal, Tooltip, Button} from "ant-design-vue";
import ExpandForm from './ExpandForm'
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "DataSource",
  components: {
    ExpandForm,
    AInput: Input,
    AButton: Button,
    AInputSearch: Input.Search,
    AIcon: Icon,
    AModal: Modal,
    ATooltip: Tooltip,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 数据源
      dataSource: cloneDeep(this.value),
      // 扩展数据modal
      expandModal: false,
      // 添加扩展数据初始化表单回显
      initData: {},
      //
      dataSourceIndex: undefined
    };
  },
  watch:{
    value(v) {
      this.dataSource = cloneDeep(v);
    }
  },
  methods: {
    emitOk(value,type){
      if(this.dataSourceIndex >= 0){
        this.$set(this.dataSource, this.dataSourceIndex, value);
      }else{
        this.dataSource.push(value);
      }
      this.$emit("input", this.dataSource);
      this.expandModal = false;
    },
    editorClose(index) {
      this.$emit('input', this.dataSource);
    },
    addDataSource() {
      this.expandModal = true;
      this.dataSourceIndex = undefined;
      this.initData = {};
    },
    editor(item,index) {
      this.dataSourceIndex = index;
      this.initData = item;
      this.expandModal = true;
    },
    del(index) {
      this.dataSource.splice(index, 1);
      this.$emit('input', this.dataSource);
    },
    showConfirm(index) {
      this.$confirm({
        title: "提示",
        content: "是否要删除这条数据？",
        onOk:() => {
          this.del(index);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.report-temp-data-source {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    padding: 10px;
  }
  .body {
    flex: auto;
    overflow-y: auto;
    ul {
      li {
        border-bottom: 1px solid #e8e8e8;
        line-height: 32px;
        padding: 2px 30px 2px 10px;
        position: relative;
        cursor: default;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        user-select: none;
        &:hover {
          background: #e8e8e8;
        }
        .icon {
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 50%;
          margin-top: -8px;
          &:hover {
            color: @primary-color;
          }
        }
        &:last-child {
          border-bottom: none;
        }
        .code{
          padding-left: 4px;
        }
      }
    }
  }
}
</style>