<template>
  <div class="time-line" v-show="list.length">
    <div
      v-if="leftFlag"
      class="arrow left"
      @mousedown.prevent="startTimer(2)"
      @mouseup.prevent="clearTimer(2)"
    >
      <a-icon type="double-left" />
    </div>
    <div class="time-wrap" id="outwrap">
      <ul :style="'width:'+list.length*200+'px'" id="timewrap">
        <li v-for="(item,index) in list" :key="index">
          <div class="top">
            <h4 :title="item.auditusername">{{item.auditusername}}</h4>
            <span>{{moment(item.date).format("YYYY-MM-DD")}}</span>
          </div>
          <div class="middle">
            <div :class="item.type === 'return_back'?'circle returnback':'circle'"></div>
          </div>
          <div class="bottom">
            <h4 class="nodename" :title="item.nodename">{{item.nodename}}</h4>
            <ul v-if="item.formnames">
              <li v-for="(name,idx) in item.formnames" :key="idx">
                <h4 :title="'《 ' + name + ' 》'">{{'《 ' + name + ' 》'}}</h4>
              </li>
            </ul>
            <div
              class="back-reason"
              v-if="item.type === 'return_back'"
              :title="item.backreason"
            >{{item.backreason}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-show="rightFlag"
      class="arrow right"
      @mousedown.prevent="startTimer(1)"
      @mouseup.prevent="clearTimer(1)"
    >
      <a-icon type="double-right" />
    </div>
  </div>
</template>

<script>
import { getApprovalRecord } from "@/workflow/api/workflow";
import { showError } from "@/framework/utils/index";
import moment from "moment";
import { Icon } from "ant-design-vue";
export default {
  components: {
    AIcon: Icon
  },
  props: ["businessinstanceid"],
  data() {
    return {
      list: [],
      leftFlag: false,
      rightFlag: true,
      index: 0,
      loop: null,
      timer: null
    };
  },
  created() {
    this.get().then(data => {
      const outWrap = document.getElementById("outwrap");
      const outwrapWidth = outWrap.offsetWidth;
      if (
        outwrapWidth > this.list.length * 200 ||
        outwrapWidth === this.list.length * 200
      ) {
        this.leftFlag = false;
        this.rightFlag = false;
      }
      //   const listWrap = document.getElementById("timewrap");
      //   [...document.getElementsByClassName("arrow")].forEach(item => {
      //     item.style.height =
      //       listWrap.offsetHeight > 200
      //         ? listWrap.offsetHeight + "px"
      //         : 200 + "px";
      //   });
    });
  },
  methods: {
    moment,
    get() {
      let p = new Promise((resolve, reject) => {
        getApprovalRecord(this.businessinstanceid)
          .then(res => {
            this.list = res.result;
            resolve("ok");
          })
          .catch(err => {
            showError(err);
          });
      });
      return p;
    },
    goLeft() {
      const listWrap = document.getElementById("timewrap");
      listWrap.style["left"] = -(--this.index * 200) + "px";
      const flag = listWrap.style.left.slice(0, listWrap.style.left.length - 2)
        ? listWrap.style.left.slice(0, listWrap.style.left.length - 2)
        : 0;
      if (parseInt(flag) === 0) {
        clearTimeout(this.loop);
        this.loop = null;
        clearInterval(this.timer);
        this.timer = null;
        this.leftFlag = false;
        this.rightFlag = true;
      } else {
        this.rightFlag = true;
      }
    },
    goRight() {
      const listWrap = document.getElementById("timewrap");
      const outWrap = document.getElementById("outwrap");
      const outwrapWidth = outWrap.offsetWidth;
      listWrap.style["left"] = -(++this.index * 200) + "px";
      const flag = listWrap.style.left.slice(0, listWrap.style.left.length - 2)
        ? listWrap.style.left.slice(0, listWrap.style.left.length - 2)
        : 0;
      if (outwrapWidth - parseInt(flag) < this.list.length * 200) {
        this.leftFlag = true;
      } else {
        clearTimeout(this.loop);
        this.loop = null;
        clearInterval(this.timer);
        this.timer = null;
        this.rightFlag = false;
        this.leftFlag = true;
      }
    },
    isOnce(type, flag) {
      if (flag) {
        this.timer = setInterval(() => {
          if (type === 1) {
            this.goRight();
          } else {
            this.goLeft();
          }
        }, 100);
      } else {
        if (type === 1) {
          this.goRight();
        } else {
          this.goLeft();
        }
      }
    },
    startTimer(type) {
      this.loop = setTimeout(() => {
        this.loop = null;
        if (type === 1) {
          this.isOnce(1, true);
        } else {
          this.isOnce(2, true);
        }
      }, 200);
      return false;
    },
    clearTimer(type) {
      clearTimeout(this.loop);
      clearInterval(this.timer);
      this.timer = null;
      if (this.loop) {
        if (type === 1) {
          this.isOnce(1, false);
        } else {
          this.isOnce(2, false);
        }
      }
      return false;
    }
  }
};
</script>
<style lang="less" scoped>
.time-line {
  max-width: 1200px;
  position: relative;
  min-height: 200px;
  .time-wrap {
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    position: relative;
    > ul {
      position: absolute;
      left: 0;
      transition: left 0.4s linear;
      > li {
        float: left;
        width: 200px;
        h4 {
          text-align: center;
          padding: 0;
          margin: 0;
        }
        .top {
          margin-bottom: 30px;
          height: 42px;
          h4 {
            font-weight: 500;
            color: #000;
            height: 21px;
          }
          span {
            color: gray;
          }
        }
        .middle {
          position: relative;
          .circle {
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #2398EB;
            top: -24px;
            left: 50%;
            margin-left: -12px;
          }
          .returnback {
            background-color: #d90e10;
          }
          &::before {
            position: absolute;
            content: "";
            width: 182px;
            margin-left: 9px;
            top: -18px;
            height: 12px;
            background-color: rgba(35,152,235,0.4);
          }
        }
        .bottom {
          margin-top: 30px;
          width: 100%;
          .nodename {
            margin: 10px 0;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .back-reason {
            text-align: center;
            color: #d90e10;
            margin-top: 5px;
            width: 100%;
          }
          li {
            h4 {
              color: gray;
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
        &:last-child {
          .middle {
            &::before {
              width: 0;
            }
          }
        }
      }
    }
  }
  .arrow {
    width: 45px;
    position: absolute;
    font-size: 28px;
    height: 220px;
    color: gray;
    top: 0;
    background-color: #d9d9d94d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .left {
    left: 0;
    z-index: 100;
  }
  .right {
    right: 0;
    z-index: 100;
  }
}
</style>