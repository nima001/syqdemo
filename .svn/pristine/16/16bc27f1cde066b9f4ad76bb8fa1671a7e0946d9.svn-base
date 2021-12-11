<template>
  <div :class="['my-state',{'EmptyData': !data.length}]">
    <a-spin :spinning="spinning" class="spin">
      <div class="spin-content">
        <!-- <ul > -->
        <transition-group
          class="newList"
          name="list"
          tag="ul" 
        >
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
import { Spin } from 'ant-design-vue';
import { msglist, msgreadMark } from "@/framework/api/message";
import { showError, dateFormat } from "@/framework/utils/index";
import EmptyData from "@/framework/components/EmptyData";

export default {
  //index首页实现改变高度加载数据，需要新增的方法
  components: {
    EmptyData,
    ASpin: Spin,
  },
  props:{
    rowcount:{
      type: Number
    },
  },
  data() {
    return {
      data: [],
      spinning: false,
    };
  },
  //index首页实现改变高度加载数据，需要新增的方法
  watch:{
    rowcount(){
      this.getMsglist();
    },
    '$store.getters.notification'(n, old) {
      if(n.count > 0){//有新的消息，刷新消息列表
        this.getMsglist();
      }
    },
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
      msgreadMark({ mark: 1, messageid }).then((res) => {
        this.getMsglist();
      }).catch((err) => {
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
        pagesize: this.rowcount,//index首页实现改变高度加载数据，需要新增的代码
      }).then(({ result }) => {
        this.spinning = false;
        (result.rows || []).forEach((i) => {
          i.sendtime = dateFormat(new Date(i.sendtime), "yyyy-MM-dd");
        });
        this.data = result.rows;
      }).catch((err) => {
        this.spinning = false;
        showError(err);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.my-state {
  padding: 10px 20px;
  overflow: hidden;
  // height: 272px;
  border: none;
  /deep/.spin {
    height: 100%;
    .ant-spin-container,.spin-content{
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
        line-height: 28px;

        &:hover {
          background: @primary-1;
        }
        .dot {
          margin-top: -8px;
          width: 4px;
          height: 4px;
          background: @accent-color;
          border-radius: 50%;
        }
        .newsLink {
          width: 80%;
          height: 28px;
          font-size: 14px;
          padding: 0px 10px;
          color: #171717;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-decoration: none;
        }
        .newDate {
          position: absolute;
          right: 9px;
          font-size: 12px;
          font-family: Noto Sans S Chinese;
          font-weight: 400;
          color: #595959;
        }
      }
    }
    .data-nodata {
      height: 100%;
    }
  }
}
.EmptyData{
  height: 272px;
}
.list-enter-active, .list-leave-active { 
  transition: all .2s; 
} 
.list-enter, .list-leave-to { 
  opacity: 0; 
}

</style>