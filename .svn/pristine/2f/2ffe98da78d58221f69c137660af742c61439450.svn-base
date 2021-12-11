<template>
  <div :class="['my-state',{'EmptyData': !data.length}]">
    <a-spin :spinning="spinning" class="spin">
      <div class="spin-content">
        <!-- <ul > -->
        <transition-group class="newList" name="list" tag="ul">
          <li v-for="(item) in data" :key="item.messageid">
            <span class="dot"></span>
            <div style="cursor: pointer;" class="newsLink" @click="jump(item)">{{item.content}}</div>
            <span class="newDate">{{item.sendtime}}</span>
          </li>
        </transition-group>
        <!-- </ul> -->

        <div class="data-nodata" v-if="data&&data.length == 0">
          <template>
            <empty-data></empty-data>
          </template>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { Spin } from "ant-design-vue";
import { msglist, msgreadMark } from "@/framework/api/message";
import { showError, dateFormat } from "@/framework/utils/index";
import EmptyData from "@/framework/components/EmptyData";

export default {
  //index首页实现改变高度加载数据，需要新增的方法
  components: {
    EmptyData,
    ASpin: Spin
  },
  props: {
    value: {
      type: Boolean
    },
    rowcount: {
      type: Number
    }
  },
  data() {
    return {
      data: [],
      spinning: false
    };
  },
  //index首页实现改变高度加载数据，需要新增的方法
  watch: {
    value() {
      let routeData = this.$router.resolve({
        path: "/main/message"
      });
      window.open(routeData.href, "_blank");
    },
    rowcount() {
      this.getMsglist();
    },
    "$store.getters.notification"(n, old) {
      if (n.count > 0) {
        //有新的消息，刷新消息列表
        this.getMsglist();
      }
    }
  },
  created() {
    this.getMsglist();
  },
  methods: {
    jump(item) {
      window.open(item.pcurl);
      this.read(item.messageid);
    },
    read(messageid) {
      msgreadMark({ mark: 1, messageid })
        .then(res => {
          this.getMsglist();
        })
        .catch(err => {
          //ignore
        });
    },
    getMsglist() {
      this.spinning = true;
      msglist({
        ishandle: 0,
        isread: 0,
        needtotal: true,
        pagenum: 1,
        pagesize: this.rowcount //index首页实现改变高度加载数据，需要新增的代码
      })
        .then(({ result }) => {
          this.spinning = false;
          (result.rows || []).forEach(i => {
            i.sendtime = dateFormat(new Date(i.sendtime), "yyyy-MM-dd");
          });
          this.data = result.rows;
        })
        .catch(err => {
          this.spinning = false;
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.my-state {
  padding: 10px 20px;
  overflow: hidden;
  border: none;
  /deep/.spin {
    height: 100%;
    .ant-spin-container,
    .spin-content {
      height: 100%;
    }
    ul.newList {
      padding: 0px;
      margin-bottom: 0px;
      li {
        position: relative;
        display: flex;
        list-style: none;
        align-items: center;
        line-height: 30px;
        &:hover {
          background: @primary-1;
        }
        .dot {
          width: 4px;
          height: 4px;
          background: @accent-color;
          border-radius: 50%;
        }
        .newsLink {
          width: 80%;
          padding: 0px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-decoration: none;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #666666;
          opacity: 1;
        }
        .newDate {
          position: absolute;
          right: 9px;
          font-weight: 400;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #bfbfbf;
          opacity: 1;
        }
      }
    }
    .data-nodata {
      height: 100%;
    }
  }
}
.EmptyData {
  height: 272px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>