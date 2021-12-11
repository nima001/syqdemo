<template>
  <a-layout class="processwrap process">
    <a-layout-content class="content">
      <div class="header">
        <a-input-search
          placeholder="输入事项名称查询"
          @search="onSearch"
          v-model="searchContent"
          enterButton
          style="width:400px"
          size="large"
        />
        <a-button type="primary" size="large" @click="onSearch(searchContent)">搜索</a-button>
        <a-button size="large" @click="reset">重置</a-button>
      </div>
      <div class="processContent">
        <ul class="list">
          <template v-for="(item,index) in contentList">
            <li :key="index">
              <div class="parent">
                <span style="font-size:15px;">{{item.name}}</span>
                <div class="operation">
                  <span @click="openPc(item)">在线办理</span>
                </div>
              </div>
            </li>
          </template>
        </ul>
        <a-pagination
          style="text-align:right;margin-top:30px;"
          @change="onShowChange"
          showQuickJumper
          :pageSize.sync="pageSize"
          :defaultCurrent="currentPage"
          :total="total"
        />
      </div>
    </a-layout-content>
    <!-- 在线办理入口 -->
    <a-modal
      class="pc_child"
      :visible="visiblePc"
      title="请选择"
      @cancel="close"
      :footer="null"
      width="600px"
    >
      <div class="tree">
        <a-cascader
          style="width:80%;margin:0 auto;"
          :options="options"
          @change="selectChild"
          :loadData="loadData"
          placeholder="--请选择--"
          size="large"
          :popupStyle="popupStyle"
          v-model="processValue"
        />
      </div>
      <div class="btn">
        <a-button @click="processGuide(nowId,nowName)">在线办理</a-button>
      </div>
    </a-modal>
  </a-layout>
</template>

<script>
import { getListCatalogv2, getNextCatalog } from "@/workflow/api/catalog";
import { showError } from "@/framework/utils/index";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Input,
  Button,
  Pagination,
  Cascader,
  Modal
} from "ant-design-vue";
export default {
  name: "ProcessV2",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AInputSearch: Input.Search,
    AButton: Button,
    APagination: Pagination,
    ACascader: Cascader,
    AModal: Modal
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      contentList: [],
      searchContent: "",
      visiblePc: false,
      nowId: null,
      nowName: "",
      options: [],
      processValue: null,
      popupStyle: {
        maxWidth: "420px",
        overflowX: "auto"
      }
    };
  },
  created() {
    this.getSearch();
  },
  watch: {
    currentPage(val) {
      this.currentPage = val;
      this.getSearch(this.searchContent);
    }
  },
  methods: {
    //获取业务流程的全部信息
    getSearch(searchkey) {
      getListCatalogv2({
        pagenum: this.currentPage,
        pagesize: this.pageSize,
        searchkey: searchkey,
        status: 1
      })
        .then(res => {
          this.contentList = [];
          this.contentList = res.result.rows;
          if (res.result.total == 0) {
            res.result.total++;
          }
          this.total = res.result.total ? res.result.total : 0;
        })
        .catch(err => {
          showError(err);
        });
    },
    //分页
    onShowChange(page, pageSize) {
      this.currentPage = page;
      this.getSearch(this.searchContent);
    },
    //查询
    onSearch(value) {
      this.getSearch(value);
    },
    reset() {
      this.searchContent = "";
      this.getSearch();
    },
    //办理指南
    processGuide(modelid, name) {
      if (modelid) {
        this.$router.push({
          path: "/workflow/processguide",
          query: {
            id: this.nowId,
            name,
            modelid
          }
        });
        this.nowId = null;
        this.processValue = null;
      }
    },
    //办理流程
    openPc(item) {
      this.nowName = item.name;
      if (!item.children) {
        this.nowId = item.id;
        this.processGuide(item.id, item.name);
      } else if (item.children) {
        getNextCatalog(item.id)
          .then(res => {
            res.result.forEach(item => {
              res.result.forEach(item => {
                if (item.selected) {
                  this.$set(item, "isLeaf", true);
                } else {
                  this.$set(item, "isLeaf", false);
                }
              });
            });
            this.options = res.result;
            this.visiblePc = true;
          })
          .catch(err => {
            showError(err);
          });
      }
    },
    //点击下一级
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      getNextCatalog(targetOption.value)
        .then(res => {
          if (res.result.length > 0) {
            res.result.forEach(item => {
              if (item.selected) {
                this.$set(item, "isLeaf", true);
              } else {
                this.$set(item, "isLeaf", false);
              }
            });
            targetOption.children = res.result;
            this.options = [...this.options];
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //选择子项
    selectChild(value) {
      this.nowId = value[value.length - 1];
    },
    //关闭
    close() {
      this.visiblePc = false;
      this.nowId = null;
      this.processValue = null;
    }
  }
};
</script>
<style lang="less">
.process {
  .content {
    padding: 12px;
    .header {
      background: #fff;
      padding: 10px 10px 20px 10px;
      > button {
        margin-left: 20px;
      }
    }
    .processContent {
      background: #fff;
      height: auto;
      margin-top: 20px;
      padding: 10px 20px 40px 20px;
      .list {
        li {
          border-bottom: 1px solid #ddd;
          height: 55px;
          overflow: hidden;
          line-height: 55px;
          &:hover {
            background: #fc424512;
            cursor: pointer;
          }
          .parent {
            display: flex;
            justify-content: space-between;
            color: #000;
            padding-left: 15px;
            i {
              cursor: pointer;
              display: inline-block;
              line-height: 55px;
              margin-right: 15px;
              font-size: 16px;
              color: gray;
              transform: rotate(0deg);
              transition: ease-out 0.3s all;
              &.active {
                transform: rotate(180deg);
              }
            }
          }
          .operation {
            span {
              cursor: pointer;
              margin-right: 10px;
              padding: 10px 15px;
              color: #d60003;
              background: #fc42454d;
              border-radius: 4px;
              &:hover {
                background: #d60003;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}

.pc_child {
  .tree {
    padding-bottom: 200px;
    display: flex;
  }
  .btn {
    text-align: center;
    button {
      margin: 0 10px;
    }
  }
}
.ant-cascader-menus .ant-cascader-menu {
  min-width: 140px;
}
</style>