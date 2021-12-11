<template>
  <div class="business_platform">
    <div class="search">
      <a-input placeholder="输入关键词搜索" v-model="search.key" @change="onSearch" @pressEnter="onSearch">
        <a-icon slot="suffix" :type="search.key ? 'close-circle' : 'search'" @click="clearSearch" />
      </a-input>
    </div>
    <div class="select">
      <template v-if="search.key">
          <div class="loading" v-if="!search.result"><a-spin tip="正在搜索..."/></div>
          <EmptyData class="nodata" v-else-if="!search.result.length" msg="没有搜索结果"/>
          <ul v-else class="search-list">
            <a-tree
              checkable
              :selected-keys="selectedKeys"
              :expanded-keys="expandedKeys"
              :tree-data="search.result"
              :replace-fields="replaceFields"
              @expand="onExpand"
              @check="onCheck"
            >
          </a-tree>
          </ul>
      </template>
      <div v-else class="choose_data">
        <a-spin :spinning="loading"> 
          <a-tree
            checkable
            :selected-keys="selectedKeys"
            :expanded-keys="expandedKeys"
            :tree-data="treeData"
            :replace-fields="replaceFields"
            @expand="onExpand"
            @check="onCheck"
          >
          </a-tree>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Icon, Tree, Spin } from "ant-design-vue";
import { getList } from "@/zfw/api/naturalRegister";
import { showError } from "@/framework/utils/index";
import EmptyData from "@framework/components/EmptyData";

export default {
  props: {},
  components: {
    AInput: Input,
    AIcon: Icon,
    ATree: Tree,
    ASpin: Spin,
    EmptyData
  },
  data() {
    return {
      loading: false,
      search: {
        key: '',
        result: undefined,
        timer: null
      },
      replaceFields: {
        key: 'id',
      },
      treeData: [],
      selectedKeys: [],
      expandedKeys: []
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      getList({keyword: '', resource: []}).then(({attr}) => {
        this.treeData = attr;
      })
      .catch(err => {
        showError(err);
      })
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    onCheck(selectedKeys, info) {
      this.selectedKeys = selectedKeys;
    },
    onSearch() {
      if (this.search.key) {
        this.treeData = [];
        this.loading = true;
        if (this.search.timer) {
          clearTimeout(this.search.timer);
        }
        //  500ms发起一次请求
        this.search.timer = setTimeout(() => {
          getList({keyword: this.search.key, resource: []})
          .then(({attr}) => {
            this.loading = false;
            this.search.result = [...attr];
          })
          .catch(err => {
            showError(err);
          })
        },500)
      } else {
        this.clearSearch();
      }
    },
    clearSearch() {
      if(this.search.timer) {
        clearTimeout(this.search.timer);
        this.search.timer = 0;
        this.search.key = undefined;
        this.getData();
      }
    },
    getVal() {
      if (this.selectedKeys.length > 0) {
        return this.selectedKeys; 
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择数据!",
          duration: 3
        });
        return [];
      }
    }
  },
};
</script>
<style lang="less" scoped>
.business_platform{
  padding: @padding-lg;
  .select{
    .loading{
      .ant-spin{
        width: 100%;
        margin-top: @padding-lg;
      }
    }
  }
}
</style>