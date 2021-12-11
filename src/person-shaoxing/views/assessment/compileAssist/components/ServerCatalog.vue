<template>
  <div class="server-catalog">
    <div class="choose-panel">
      <div class="header">
        <div class="search-bar">
          <a-input placeholder="输入关键词搜索" v-model="search.key" @change="onSearch" @pressEnter="onSearch">
            <a-icon slot="suffix" :type="search.key ? 'close-circle' : 'search'" @click="clearSearch" />
          </a-input>
        </div>
      </div>
      <div class="body">
        <template v-if="search.key">
          <div class="loading" v-if="!search.result"><a-spin tip="正在搜索..."/></div>
          <EmptyData class="nodata" v-else-if="!search.result.length" msg="没有搜索结果"/>
          <ul v-else class="search-list">
            <template v-for="(item, index) in search.result">
              <li 
                :key="item.key"
                @click="doCheck(item, checkedKeys.checked.indexOf(item.key)<0)"
              >
                <a-checkbox 
                    :checked="checkedKeys.checked.indexOf(item.key)>=0"
                  />
                <span class="title" :title="`${item.title}`">{{item.title}}</span>
              </li>
            </template>
          </ul>
        </template>
        <div v-else class="choose-data">
          <div class="data-list">
            <a-spin :spinning="loading"> 
              <a-tree
                checkable
                :selectable="false"
                :checked-keys="checkedKeys"
                :expanded-keys="expandedKeys"
                :tree-data="treeData"
                :load-data="onLoadData"
                :check-strictly="true"
                @expand="onExpand"
                @check="onCheck"
              >
              </a-tree>
            </a-spin>
          </div>
        </div>
      </div>
    </div>
    <div class="selected-panel">
      <div class="header">
        <div class="select-desc">
          <span class="tag">已选{{selectList.length}}</span>
          <span class="desc"></span>
        </div>
        <a class="select-clear" @click="onClearAll">
          <a-icon type="delete"></a-icon>
          清空
        </a>
      </div>
      <div class="body">
        <div class="selected-data">
          <ul class="list" v-if="selectList.length">
            <li v-for="(item, index) in selectList" :key="index">
              <a-icon type="unordered-list" class="icon"></a-icon>
              <span class="text">{{item.catalogcode}}-{{item.catalog}}</span>
              <a-icon type="delete" class="delete" @click="onDeleteItem(item)"></a-icon>
            </li>
          </ul>
          <empty-data v-else tips="`请选择"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left">

      </div>
      <div class="right">
        <a-button @click="onFinish('cancel')">取消</a-button>
        <a-button type="primary" @click="onFinish('ok')">确认</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Breadcrumb, Button, Checkbox, Icon, Spin, Input, Tree } from "ant-design-vue"
import EmptyData from "@framework/components/EmptyData";
import { policyServerCatalog } from "@/person-shaoxing/api/assessment";
import { showError } from '../../../../../framework/utils';
export default {
  props: {},
  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AInput: Input,
    ACheckbox: Checkbox ,
    AButton: Button,
    ASpin: Spin,
    AIcon: Icon,
    ATree: Tree,
    EmptyData
  },
  data() {
    return {
      loading: false,
      selectList: [],

      search: {
        key: undefined,
        queue: [],
        timer: 0,
        result: undefined,
        loadnext: false
      },
      treeData: [],
      checkedKeys: {
        checked: []
      },
      expandedKeys: []
    };
  },
  watch: {},
  computed: {},
  created() {
    //  首次搜索 pid = 0   type = 1
    this.getData(0, undefined, 1);
  },
  mounted() {},
  methods: {
    getKey(length){
      return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    },
    getData(pid, searchkey, type) {
      this.loading = true;
      policyServerCatalog(pid, searchkey, type)
      .then(({result}) => {
        this.loading = false;
        result.forEach(item => {
          item.isLeaf = false;
          item.key = item.id;
          item.title = item.catalogcode + "-" + item.catalog;
        })
        this.treeData = [...result];
      })
      .catch(err => {
        showError(err);
      })
    },
    onFinish(type) {
      if(type == 'ok' && this.selectList.length == 0) {
        return;
      }
      let list = [...this.selectList];
      this.$emit('finish', type, list);
    },
    onSearch() {
      //  清空前一个搜索数据和状态
      if(this.search.key) {
        this.treeData = [];
        this.loading = true;
        if(this.search.timer) {
          clearTimeout(this.search.timer);
        }
        //  500ms发起一次请求
        this.search.timer = setTimeout(() => {
          policyServerCatalog(0, this.search.key, 2)
          .then(({result}) => {
            this.loading = false;
             result.forEach((item,index) => {
              item.key = item.id;
              item.isLeaf = true;
              item.title = item.catalogcode + "-" + item.catalog;
            })
            this.search.result = [...result];
          })
          .catch(err => {
            showError(err);
          })
        }, 500)
      }else{
        this.clearSearch();
      }
    },
    clearSearch() {
      if(this.search.timer) {
        clearTimeout(this.search.timer);
        this.search.timer = 0;
        this.search.key = undefined;
        this.getData(0, undefined, 1);
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    onCheck(checkedKeys, info) {
      //对每一项添加key
      let field = info.node.$options.propsData;
      let dataRef = field.dataRef;
      this.doCheck(dataRef, info.checked);
    },
    doCheck(field, checked) {
      if(checked) {//多选
        this.selectList.push(field);
        this.checkedKeys.checked.push(field.key);
      }else{//取消选中
        let index = this.selectList.findIndex(item => item.key == field.key);
        if(index >= 0){
          this.selectList.splice(index, 1);
        }
        index = this.checkedKeys.checked.findIndex(item => item == field.key);
        if(index >= 0){
          this.checkedKeys.checked.splice(index, 1);
        }
      }
    },
    onClearAll() {
      this.selectList = [];
      this.checkedKeys = {
        checked: []
      };
    },
    onDeleteItem(item) {
      //选中时对每个item添加了key  
      let index = this.selectList.findIndex(i => i.key == item.key);
      if(index >= 0) {
        this.selectList.splice(index, 1);
      }
      index = this.checkedKeys.checked.findIndex(i => i == item.key);
      if(index >= 0) {
        this.checkedKeys.checked.splice(index, 1);
      }
    },
    onLoadData(treeNode) {
      return new Promise(resolve => {
        policyServerCatalog(treeNode.dataRef.id, undefined, 1)
        .then(({result}) => {
          if(result && result.length > 0) {
            result.forEach(item => {
              item.key = item.id;
              item.title = item.catalogcode + "-" + item.catalog;
              if(parseInt(item.cataloglevel) > 2) {
                item.isLeaf = true;
              }else{
                item.isLeaf = false;
              }
            })
            treeNode.dataRef.children = result;
          }else{
            treeNode.dataRef.isLeaf = true;
          }
          this.treeData = [...this.treeData];
          resolve();
        })
        .catch(err => {
          showError(err);
        })
      })
    }
  },
};
</script>
<style lang="less" scoped>
@header-height: 58px;
@footer-height: 60px;
@base-padding: 34px;

.server-catalog{
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  .header{
    height: @header-height;
    padding: 20px @base-padding 8px @base-padding;
  }
  .body{
    height: 100%;
    box-sizing: border-box;
    margin-top: -@header-height;
    padding-top: @header-height;
    padding-bottom: @footer-height;
  }

  //左侧待选数据
  & > .choose-panel{
    flex: 1 1 50%;
    min-width: 0;
    .loading{
      height: 100%;
      /deep/.ant-spin{
        width: 100%;
        margin-top: 20px;
      }
    }
    .search-list{
        height: 100%;
        overflow-y: auto;
        padding: 6px 4px 0 20px;
        li{
          padding: 0 16px;
          line-height: 30px;
          cursor: pointer;
          &:not(.loading-more):hover{
            background-color: @primary-1;
          }
          & > .title{
            text-indent: 10px;
          }
        }
        li.loading-more{
          .ant-spin{
            display: block;
            text-align: center;
            .anticon-loading{
              vertical-align: middle
            }
            /deep/.ant-spin-text{
              display: inline-block;
              vertical-align: middle;
              margin-left: 6px;
              line-height: 30px;
              color: fade(@black, 30%);
            }
          }
        }
      }
    .choose-data{
      height: 100%;
      display: flex;
      flex-direction: column;
      .data-list{
        flex: 1 1 100%;
        overflow: auto;
        padding: 6px 4px 0 20px;
      }
    }
  }

  //右侧已选列表
  & > .selected-panel{
    flex: 1 1 50%;
    min-width: 0;
    border-left: 1px solid @border-color-split;
    .select-desc{
      float: left;
      line-height: 32px;
      .tag{
        line-height: 1.4em;
        border-left: 4px solid @primary-color;
        padding: 0 4px 0 6px;
      }
      .desc{
        color: @primary-color;
      }
    }
    .select-clear{
      float: right;
      line-height: 32px;
      i{
        margin-right: 6px;
      }
      &:hover{
        color: lighten(@primary-color, 20%);
      }
    }
    .selected-data{
      height: 100%;
      overflow-y: auto;
      .list{
        padding: 0 @base-padding - 4;
        li{
          padding: 8px 20px 8px 0;
          position: relative;
          .icon{
            margin-right: 6px;
          }
          .delete{
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -0.5em;
            margin-right: 3px;
            cursor: pointer;
          }
          &:hover {
            background: @primary-1;
            .delete {
              color: @primary-color;
              cursor: pointer;
              visibility: visible;
            }
          }
        }
      }
    }
  }

  //底部功能按钮
  & > .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: @footer-height;
    display: flex;
    & > .left{
      width: 50%;
      line-height: @footer-height - 20;
      padding: 10px @base-padding;
    }
    & > .right{
      flex: 1 0 50%;
      line-height: @footer-height - 20;
      padding: 10px 20px;
      text-align: right;
      .ant-btn{
        margin-left: 12px;
      }
    }
  }
}
</style>