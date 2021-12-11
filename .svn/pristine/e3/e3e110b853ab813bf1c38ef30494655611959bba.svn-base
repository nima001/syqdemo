<template>
  <div>
    <!-- 查看调整记录 modal -->
    <a-modal
      :visible="isShow"
      title="调整记录"
      width="800px"
      :bodyStyle="bodystyle"
      v-if="!footer"
      @cancel="Modalcancel"
      @ok="handleok"
    >
      <div class="salaryManageModal">
        <div class="infoBox">
          <div class="itemName">
            <span class="rulename">调整记录：</span>
            <span class="rules">
              <div v-for="(item,index) in record.changeHistory" :key="index">
                <div class="time" :class="index!=0?'top':'' ">
                  <span>开始时间：</span>
                  {{item.startTime}}
                </div>
                <div class="time">
                  <span>结束时间：</span>
                  {{item.endTime}}
                </div>
                <div class="change">
                  <span class="ratio">{{record.ratio == undefined?'金额变化':'比例变化'}}</span>
                  <span v-if="record.ratio">{{item.lastratio}} --> {{item.ratio}}</span>
                  <span v-else>{{item.salary}}</span>
                </div>
                <div class="changeHistoryDiv">
                  <div class="reason">调整原因：</div>
                  <div v-if="item.reason">{{item.reason}}</div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { Modal } from "ant-design-vue";
export default {
  props: ["isShow", "record"],
  components: {
    AModal: Modal
  },
  data() {
    return {
      text: "",
      footer: "",
      bodystyle: {
        "max-height": "50vh",
        overflow: "auto",
         padding: "8px 24px",
        width: "800px"
      }
    };
  },
  created() {
    this.footer = this.record.sure == "no" ? true : false;
    let that = this;
    if (this.record.ratio) {
      this.text = "比例变化";
    } else {
      this.text = "金额变化";
    }
  },
  methods: {
    Modalcancel() {
      this.$emit("closeModal");
    },
    handleok() {
      this.$emit("closeModal");
    }
  }
};
</script>
<style lang="less" >
.salaryManageModal {
  .infoBox {
    width: 85%;
    margin: 0 auto;
    .itemName {
      width: 100%;
      margin-top: 10px;
      .rulename {
        display: inline-block;
        height: 230px;
        width: 110px;
        text-align: right;
        float: left;
      }
      .rules {
        display: inline-block;
        margin-left: 15px;
        height: 230px;
        width: 70%;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        padding: 10px;
        overflow-y: auto;
        .time {
          > span {
            display: inline-block;
            width: 80px;
            color: rgba(0, 0, 0, 0.65);
          }
        }
        .top {
          margin-top: 24px;
        }
        .change {
          .ratio {
            display: inline-block;
            width: 80px;
            color: rgba(0, 0, 0, 0.65);
          }
        }
        /* 调整记录的样式 */
        .changeHistoryDiv {
          display: grid;
          grid-template-columns: 80px auto;
          .reason {
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
}
.salaryManageModal .name {
  display: inline-block;
  height: 30px;
  width: 140px;
  line-height: 30px;
  text-align: right;
}
.salaryManageModal .showBox,
.down {
  margin-left: 15px;
  display: inline-block;
  height: 30px;
  width: 300px;
  border-radius: 5px;
  line-height: 30px;
  text-indent: 0px;
}
.salaryManageModal .down {
  background-color: white;
}

.nowModal .ant-modal-content {
  width: 800px;
}
</style>