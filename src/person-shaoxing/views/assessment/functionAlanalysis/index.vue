<template>
  <div class="body">
    <div class="content">
      <div class="search">
        <a-input-search
          placeholder="请输入职能关键字进行搜索"
          allowClear
          @search="onSearch"
        >
          <template>
            <a-button type="primary" slot="enterButton">
              <a-icon type="search" />搜索
            </a-button>
          </template>
        </a-input-search>
        <div class="options">
          <p>常用搜索</p>
          <ul>
            <li v-for="(item, index) in searchOptions" :key="index" @click="toDetail(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button, Icon } from "ant-design-vue";
export default {
  components: {
    AIcon: Icon,
    AButton: Button,
    AInputSearch: Input.Search,
  },
  data() {
    return {
      searchOptions: ["医药", "卫生健康", "药品价格", "医疗服务"],
    };
  },
  methods: {
    onSearch(val) {
      if (val) {
        this.toDetail(val);
      }
    },
    toDetail(val) {
        this.$router.push({ name: 'detail', params:{ val }})
    }
  },
};
</script>
<style lang="less" scoped>
.body {
  height: 100%;
  padding: @layout-space-base;
  .content {
    height: 100%;
    background: white;
    display: flex;
    .search {
      flex: 1;
      height: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;
      top: 25%;
      .ant-input-group-wrapper {
        width: 35%;
        /deep/.ant-input,
        .ant-btn {
          height: 40px;
        }
      }
      .options {
        width: 35%;
        p {
          margin-top: 30px;
        }
        ul {
          li {
            float: left;
            color: #bfbfbf;
            padding: @padding-xs / 2 @padding-sm;
            border: 1px solid #dadada;
            border-radius: @border-radius-base;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
