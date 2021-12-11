<template>
  <!-- 调整比例 和 调整金额 -->
  <a-modal
    :visible="isShow"
    :title="record.titlename"
    width="800px"
    :bodyStyle="bodystyle"
    @cancel="Modalcancel"
    @ok="handleok"
  >
    <div class="salaryManageModal">
      <div class="infoBox">
        <div v-if="record.categoryName != 'father' " class="itemName">
          <span class="name">工资项目名称：</span>
          <span class="showBox">{{record.name}}</span>
        </div>
        <!-- 工资项目分类： -->
        <div v-if="record.categoryName != 'father' &&  !UserSelfChange" class="itemName">
          <span class="name">工资项目分类：</span>
          <span class="showBox">{{record.categoryName}}</span>
        </div>
        <div v-if="record.categoryName == 'father' " class="itemName">
          <span class="name">工资项目分类：</span>
          <span class="showBox">{{record.name}}</span>
        </div>
        <!-- 调整前金额  -->
        <div v-if="!UserSelfChange" class="itemName">
          <span class="name">调整前金额(元)：</span>
          <span class="showBox">{{record.totalsalary}}</span>
        </div>
        <!-- 调整金额 -->
        <div v-if="UserSelfChange" class="itemName">
          <span class="name">金额：</span>
          <a-input-number
            class="number-input"
            @change="changetotalsalary"
            v-model="record.totalsalary"
          />
        </div>
        <!-- 加减项 -->
        <div v-if="record.categoryName != 'father' && record.canBedelete!=1" class="itemName">
          <span class="name">加/减项：</span>
          <span class="showBox">{{record.issubitem==0?'加项':'减项'}}</span>
        </div>
        <!-- 依据 -->
        <div v-if="record.categoryName != 'father' && !UserSelfChange" class="itemName">
          <span class="name">依据：</span>
          <span class="showBox">{{record.basis?`${record.basis}`:'无'}}</span>
        </div>
        <!-- 发放比例 -->
        <div v-if="!UserSelfChange" class="itemName">
          <span class="name ratio">
            <span>*</span> 发放比例：
          </span>
          <span v-if="!UserSelfChange" class="showBox">
            <!-- :getPopupContainer="scorllBug" -->
            <a-select @change="handleChange" style="width: 50%" :defaultValue="ratioShow(record)">
              <a-select-option value="0">0%</a-select-option>
              <a-select-option value="0.5">50%</a-select-option>
              <a-select-option value="0.7">70%</a-select-option>
              <a-select-option value="0.8">80%</a-select-option>
              <a-select-option value="0.9">90%</a-select-option>
              <a-select-option value="1">100%</a-select-option>
            </a-select>
            <span class="detail" v-if="bilierror">请完善信息</span>
          </span>
        </div>
        <!-- 调整后金额 -->
        <div v-if="!UserSelfChange" class="itemName">
          <span class="name">调整后金额(元)：</span>
          <span class="showBox">{{record.actualsalary}}</span>
        </div>
        <!-- 调整原因 -->
        <div class="itemName">
          <span class="rulename">调整原因：</span>
          <textarea v-model="reason" class="rules"></textarea>
        </div>
        <!-- 时间 -->
        <div class="itemName">
          <span class="name">
            <span class="time">*</span> 开始时间：
          </span>
          <a-month-picker
            :disabledDate="notAllowFn"
            @change="chooseStartTime"
            :getCalendarContainer="datePickerBug"
            class="showBox"
            style="width: 300px"
          />
          <span class="message" v-if="starterror">请完善信息</span>
        </div>
        <div class="itemName">
          <span class="name">
            <span class="time">*</span> 结束时间：
          </span>
          <a-month-picker
            id="end_Time"
            :disabledDate="notAllowENDFn"
            @change="chooseEndTime"
            :getCalendarContainer="datePickerBug"
            class="showBox"
            style="width: 300px"
          />
          <span v-if="enderror" class="message">请完善信息</span>
          <span v-if="timeError && endTime" style="margin-left: 15px;color: red;">请设置正确时间</span>
        </div>
        <!-- 看 调整记录 -->
        <div v-if="record.categoryName != 'father' " class="itemName">
          <span class="rulename">调整记录：</span>
          <span class="rules">
            <div v-for="(item,index) in  record.changeHistory" :key="index">
              <div class="limit" :class="index!=0? 'top':'' ">
                <span>开始时间：</span>
                {{item.startTime}}
              </div>
              <div class="limit">
                <span>结束时间：</span>
                {{item.endTime}}
              </div>
              <div class="change">
                <span class="rats">{{UserSelfChange?'金额变化： ':'比例变化： '}}</span>
                <span
                  v-if="item.lastratio"
                >{{item.lastratio*100 + '%'}} --> {{item.ratio*100 + '%'}}</span>
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
</template>
<script>
import { salaryupdaterecord, salaryUpdate } from "@/salary/api/salaryManage";
import moment from "moment";
import { Modal, DatePicker, Select, InputNumber } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AModal: Modal,
    AMonthPicker: DatePicker.MonthPicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInputNumber: InputNumber
  },
  data() {
    return {
      money: "", //金额
      isCurrent: false,
      changeHistory: "", //调整记录
      ratio: "", //用户自定义的发放比例
      reason: "", //调整原因
      title: "",
      bodystyle: {
        "max-height": "50vh",
        overflow: "auto",
        padding: "8px 24px"
      },
      startTime: "",
      endTime: "",
      timeError: false,
      starterror: false,
      enderror: false,
      lastratio: "",
      bilierror: false,
      aftersalary: ""
    };
  },
  created() {
    //this.getchangeHistory();
    let that = this;
    this.money = this.record.actualsalary;
    //之前的比例
    this.ratio = this.record.ratio; //如果不选择就使用之前的比例作为更改后的比例
  },
  computed: {
    ratioShow() {
      return record => {
        return record.ratio == undefined ? "--" : record.ratio * 100 + "%";
      };
    }
  },
  watch:{
      record(val){}
  },
  props: ["isShow", "UserSelfChange", "record"],
  methods: {
    getchangeHistory() {
      let payroll = this.record.id;
      salaryupdaterecord(payroll)
        .then(res => {
          this.changeHistory = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    changetotalsalary(val) {
      if (!val) {
        this.record.totalsalary = 0;
      }
    },
    //限制时间
    notAllowFn(current) {
      if (this.record.children) {
        return current && current < moment(this.record.children[0].date);
      } else {
        return current && current < moment(this.record.date);
      }
    },
    notAllowENDFn(current) {
      return current && current < moment(this.startTime);
    },
    scorllBug(node) {
      return node.parentNode;
    },
    datePickerBug(triggerNode) {
      return triggerNode.parentNode;
    },
    Modalcancel() {
      this.$emit("closeModal");
    },
    chooseStartTime(value) {
      if (value) {
        let date = moment(value).format("YYYY-MM");
        this.startTime = date;
        this.starterror = false;
      } else {
        this.startTime = "";
      }
    },
    chooseEndTime(value) {
      if (!value) {
        this.endTime = "";
      } else {
        this.timeError = false;
        let date = moment(value).format("YYYY-MM");
        this.endTime = date; //结束时间
        this.enderror = false;
      }
    },
    handleChange(value) {
      if (value) {
        this.ratio = value;
        this.record.ratio = value; //更改发放比例
        //丢失精度问题
        let salary = this.record.totalsalary * 1000;
        let ratio = value * 100;
        this.record.actualsalary = (salary * ratio) / 100000;
        this.bilierror = false;
      }
    },
    //更改数据传给后端
    handleok() {
      if (this.UserSelfChange) {
        if (!this.startTime || !this.endTime) {
          if (!this.startTime && !this.endTime) {
            this.starterror = true;
            this.enderror = true;
            this.bilierror = true;
            return;
          }

          if (!this.startTime) {
            this.starterror = true;
          }

          if (!this.endTime) {
            this.enderror = true;
          }
          return;
        }
      } else {
        if (!this.startTime || !this.endTime || !this.ratio) {
          if (!this.startTime && !this.endTime && !this.ratio) {
            this.starterror = true;
            this.enderror = true;
            this.bilierror = true;
            return;
          }
          if (!this.ratio) {
            this.bilierror = true;
          }

          if (!this.startTime) {
            this.starterror = true;
          }

          if (!this.endTime) {
            this.enderror = true;
          }
          return;
        }
      }

      //设置正确时间
      if (moment(this.endTime) < moment(this.startTime)) {
        this.timeError = true;
        return;
      }
      let obj = {}; //上传obj
      //父类上传id 需要将子类的id全部push进数组里面
      if (this.record.categoryName == "father") {
        obj.payrollids = [];
        for (let i = 0; i < this.record.children.length; i++) {
          obj.payrollids.push(this.record.children[i].id);
        }
      } else {
        obj.payrollids = [this.record.id]; //子类的id  放进数组中
      }
      //时间 目前先定死
      obj.endTime = this.endTime;
      obj.startTime = this.startTime;
      //比例 金额等数据
      obj.lastratio = this.lastratio;
      this.record.actualsalary = parseInt(this.money);
      obj.ratio = this.ratio;
      obj.reason = this.reason;
      //1表 2表 接口区分
      if (this.record.actualsalary == 0) {
        //判断金额如果是 0 直接关闭
        this.$emit("closeModal");
      } else {
        //返回数据给后端  ->  请求
        obj.salary = this.record.totalsalary;
        salaryUpdate(obj)
          .then(res => {
            this.$emit("closeModal");
          })
          .catch(err => {
            showError(err);
          });
      }
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
      .name {
        display: inline-block;
        height: 30px;
        width: 140px;
        line-height: 30px;
        text-align: right;
        .time {
          color: @primary-color;
        }
        &.ratio {
          > span {
            color: @primary-color;
          }
        }
      }
      .change {
        .rats {
          display: inline-block;
          width: 80px;
          color: #171717;
        }
      }
      .message {
        margin-left: 15px;
        color: @primary-color;
      }
      .showBox {
        margin-left: 15px;
        display: inline-block;
        height: 30px;
        width: 300px;
        border-radius: 5px;
        line-height: 30px;
        text-indent: 0px;
        .detail {
          margin-left: 15px;
          color: @primary-color;
        }
      }
      .number-input {
        margin-left: 15px;
        width: 50%;
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
        resize: none;
        .limit {
          .top {
            margin-top: 24px;
          }
          > span {
            display: inline-block;
            width: 80px;
            color: black;
          }
        }
        /* 调整记录的样式 */
        .changeHistoryDiv {
          display: grid;
          grid-template-columns: 80px auto;
          .reason {
            color: black;
          }
        }
      }
    }
  }
}
</style>