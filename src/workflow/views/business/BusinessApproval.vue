<template>
  <div>
    <div class="main">
      <div class="list">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="jump(item.id)">
            <div class="content">
              <a-tooltip>
                <template slot="title">{{item.name}}</template>
                <span class="title">{{item.name}}</span>
              </a-tooltip>
              <span class="content-num">{{item.number}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getListProcessV2 } from "@/workflow/api/workflow";
import { Breadcrumb,Tooltip } from "ant-design-vue";
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATooltip:Tooltip
  },
  created() {
    getListProcessV2().then(res => {
      if (res.code == "success") {
        this.list = res.result;
      }
    });
  },
  methods: {
    jump(id) {
      this.$router.push({ path: "/workflow/thingbank", query: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped>
.breadcrumb {
  height: 64px;
  background-color: #fff;
  .ant-breadcrumb {
    display: inline-block;
    padding: 20px;
  }
}
.main {
  margin: 12px;
  .list {
    ul {
      li {
        width: 25%;
        float: left;
        list-style: none;
        cursor: pointer;
        .content {
          height: 50px;
          font-size: 16px;
          font-weight: bold;
          line-height: 50px;
          background-color: #fff;
          margin: 12px;
          padding: 0 20px;
          position: relative;
          .title {
            display: inline-block;
            max-width: 230px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .content-num {
            position: absolute;
            color: #ffc62c;
            width: 10px;
            right: 25px;
          }
        }
      }
    }
  }
}
</style>
