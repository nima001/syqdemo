<template>
  <!-- 调整金额 -->
  <a-modal
    :visible="isShow"
    title="调整单项金额"
    width="800px"
    :bodyStyle="bodystyle"
    @cancel="Modalcancel"
    @ok="handleok"
  >
    <div class="changePayModal">
      <div class="infoBox">
        <div class="itemName">
          <span class="name">工资项目名称：</span>
          <span class="showBox">{{record.name}}</span>
        </div>
        <!-- 工资项目分类： -->
        <div class="itemName">
          <span class="name">工资项目分类：</span>
          <span class="showBox">{{record.categoryName}}</span>
        </div>
        <!-- 加减项 -->
        <div class="itemName">
          <span class="name">加/减项：</span>
          <span class="showBox">{{record.issubitem==0?'加项':'减项'}}</span>
        </div>
        <!-- 金额  -->
        <div class="itemName">
          <span class="name">金额(元)：</span>
          <a-input
            class="showBox"
            style="width: 200px;"
            @change="changeActualsalary"
            v-model="record.actualsalary"
          />
        </div>
        <div class="itemName">
          <span class="rulename">调整原因：</span>
          <textarea v-model="reason" class="rules"></textarea>
        </div>
        <div class="itemName">
          <span class="name">
            <span>*</span> 开始时间：
          </span>

          <a-month-picker
            @change="chooseStartTime"
            :getCalendarContainer="datePickerBug"
            class="showBox"
            :disabledDate="notAllowFn"
            style="width: 300px"
          />
          <span class="detail" v-if="starterror">请完善信息</span>
        </div>
        <div class="itemName">
          <span class="name">
            <span>*</span> 结束时间：
          </span>
          <a-month-picker
            :disabledDate="notAllowENDFn"
            @change="chooseEndTime"
            :getCalendarContainer="datePickerBug"
            class="showBox"
            style="width: 300px"
          />
          <span v-if="enderror" class="detail">请完善信息</span>
          <span class="detail" v-if="timeError && endTime">请设置正确时间</span>
        </div>

        <div class="itemName">
          <span class="rulename">调整记录：</span>
          <span class="rules">
            <div v-for="(item,index) in record.changeHistory" :key="index">
              <div :class="index!=0?'top':'' ">
                <span style="display:inline-block;width: 80px;color: black;">开始时间：</span>
                {{item.startTime}}
              </div>
              <div>
                <span style="display:inline-block;width: 80px;color: black;">结束时间：</span>
                {{item.endTime}}
              </div>
              <div>
                <span style="display:inline-block;width: 80px;color: black;">金额变化：</span>
                <span v-if="item.salary">{{item.salary}}</span>
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
</template>
<script>
import { salaryUpdate } from "@/salary/api/salaryManage";
import moment from "moment";
import { Modal, Input, InputNumber, DatePicker } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AModal: Modal,
    AInput: Input,
    AInputNumber: InputNumber,
    AMonthPicker: DatePicker.MonthPicker
  },
  data() {
    return {
      timeError: false,
      starterror: false,
      enderror: false,
      isCurrent: false,
      startTime: "",
      endTime: "",
      reason: "", //调整原因
      bodystyle: {
        "max-height": "50vh",
        overflow: "auto",
        padding: "24px 36px"
      },
      pagination: {
        hideOnSinglePage: true //不展示分页效果
      }
    };
  },
  computed: {
    ratioShow() {
      return record => {
        return record.ratio == undefined ? "--" : 'record.ratio*100 + "%"';
      };
    }
  },
  props: ["isShow", "record"],
  methods: {
    changeActualsalary(value) {
      if (!value) {
        this.record.actualsalary = 0;
      }
    },
    //限制时间
    notAllowFn(current) {
      return current && current < moment(this.record.date);
    },
    notAllowENDFn(current) {
      return current && current < moment(this.startTime);
    },
    scorllBug(node) {
      return node;
    }, //目前存在问题
    datePickerBug(triggerNode) {
      return triggerNode.parentNode;
    },
    chooseStartTime(value) {
      let date = moment(value).format("YYYY-MM");
      this.startTime = date;

      if (value) {
        this.starterror = false;
      } else {
        this.startTime = "";

        return;
      }
    },
    chooseEndTime(value) {
      this.timeError = false;
      let date = moment(value).format("YYYY-MM");
      this.endTime = date;

      this.enderror = false;
      if (!value) {
        this.endTime = "";

        return;
      }
    },
    Modalcancel() {
      this.$emit("closeModal");
    },
    //确定  更改数据传给后端
    handleok() {
      if (!this.startTime && !this.endTime) {
        this.starterror = true;
        this.enderror = true;
        return;
      }
      if (!this.startTime) {
        this.starterror = true;
        return;
      }
      if (!this.endTime) {
        this.enderror = true;
        return;
      }

      if (moment(this.endTime) < moment(this.startTime)) {
        this.timeError = true;
        return;
      }
      let that = this;
      let obj = {}; //上传obj
      obj.payrollids = [this.record.id]; //子类的id  放进数组中
      //时间 目前先定死
      obj.endTime = this.endTime;
      obj.startTime = this.startTime;
      obj.reason = this.reason;
      obj.salary = this.record.actualsalary; //调整的金额
      //返回数据给后端  ->  请求
      // 先做一个判断 判断金额是否为零 再来调用
      salaryUpdate(obj)
        .then(res => {
          that.$emit("closeModal");
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" >
.changePayModal {
  .infoBox {
    width: 85%;
    margin: 0 auto;
    .itemName {
      width: 100%;
      margin-top: 10px;
      .name {
        display: inline-block;
        height: 30px;
        width: 140px;
        line-height: 30px;
        text-align: right;
        > span {
          color: @primary-color;
        }
      }
      .showBox {
        margin-left: 15px;
        display: inline-block;
        height: 30px;
        width: 300px;
        border-radius: 5px;
        line-height: 30px;
        text-indent: 0px;
      }
      .rulename {
        display: inline-block;
        height: 230px;
        width: 140px;
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
        /* 调整记录的样式 */
        .changeHistoryDiv {
          display: grid;
          grid-template-columns: 80px auto;
          .reason {
            color: black;
          }
        }
        .top {
          margin-top: 24px;
        }
      }
      .detail {
        margin-left: 15px;
        color: @primary-color;
      }
    }
  }
}
</style>