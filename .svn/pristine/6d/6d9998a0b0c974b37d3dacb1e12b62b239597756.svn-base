<template>
  <div>
    <a-modal :title="title" :width="'750px'" :visible='true' :destroyOnClose='true' @cancel="close()">
      <template slot="footer">
        <a-button type="primary" @click="save()">确定</a-button>
        <a-button @click="close()">取消</a-button>
      </template>
      <div class="cronexpression">
          <span class="text">{{this.cron}}</span>
          <a-popover title="最近10次执行时间" trigger="click" placement="rightTop" @visibleChange="visibleChange">
            <template slot="content">
              <p class="times" v-for="(item,index) in nextTimeList" :key="index">{{item}}</p>
            </template>
            <a-icon title="点击查看最近10次执行时间" type="info-circle" class="info"/>
          </a-popover>
      </div>
      <div class="crontabs">
        <a-tabs >
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="schedule" /> 秒 </span>
            <div class="tabcontent">
              <a-radio-group v-model="second.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="1">每一秒钟</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="2">
                      从
                      <a-input-number :min="0" :max="59" v-model="second.intervalStart"></a-input-number>
                      秒开始，每隔 
                      <a-input-number :min="1" :max="59" v-model="second.interval"></a-input-number> 
                      秒钟
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="3">
                      指定秒数（可多选）
                      <a-select mode="multiple" v-model="second.specific" :allowClear="true" placeholder="请选择秒钟">
                        <a-select-option v-for="item in 60" :key="item" :value="item-1">
                          {{item-1}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="4">
                      周期从
                      <a-input-number :min="1" :max="second.cycleEnd" v-model="second.cycleStart"></a-input-number> 
                      到
                      <a-input-number :min="0" :max="59" v-model="second.cycleEnd"></a-input-number> 
                      秒钟
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" >
            <span slot="tab"><a-icon type="schedule" /> 分 </span>
            <div class="tabcontent">
              <a-radio-group v-model="minute.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="1">每一分钟</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="2">
                      从
                      <a-input-number :min="0" :max="59" v-model="minute.intervalStart"></a-input-number>
                      分开始，每隔 
                      <a-input-number :min="1" :max="59" v-model="minute.interval"></a-input-number> 
                      分钟
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="3">
                      指定分钟数（可多选）
                      <a-select mode="multiple" v-model="minute.specific" :allowClear="true" placeholder="请选择分钟">
                        <a-select-option v-for="item in 60" :key="item" :value="item-1">
                          {{item-1}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="4">
                      周期从
                      <a-input-number :min="1" :max="minute.cycleEnd" v-model="minute.cycleStart"></a-input-number> 
                      到
                      <a-input-number :min="0" :max="59" v-model="minute.cycleEnd"></a-input-number> 
                      分钟
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" >
            <span slot="tab"><a-icon type="schedule" /> 时 </span>
            <div class="tabcontent">
              <a-radio-group v-model="hour.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="1">每一小时</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="2">
                      从
                      <a-input-number :min="0" :max="23" v-model="hour.intervalStart"></a-input-number>
                      小时开始，每隔 
                      <a-input-number :min="1" :max="23" v-model="hour.interval"></a-input-number> 
                      小时
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="3">
                      指定小时数（可多选）
                      <a-select mode="multiple" v-model="hour.specific" :allowClear="true" placeholder="请选择小时">
                        <a-select-option v-for="item in 24" :key="item" :value="item-1">
                          {{item-1}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="4">
                      周期从
                      <a-input-number :min="1" :max="hour.cycleEnd" v-model="hour.cycleStart"></a-input-number> 
                      到
                      <a-input-number :min="0" :max="23" v-model="hour.cycleEnd"></a-input-number> 
                      小时
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4" >
            <span slot="tab"><a-icon type="schedule" /> 日 </span>
            <div class="tabcontent">
              <a-radio-group v-model="day.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="1">每一日</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="2">
                      从
                      <a-input-number :min="1" :max="31" v-model="day.intervalStart"></a-input-number>
                      日开始，每隔 
                      <a-input-number :min="1" :max="31" v-model="day.interval"></a-input-number> 
                      日
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="3">
                      指定日期数（可多选）
                      <a-select mode="multiple" v-model="day.specific" :allowClear="true" placeholder="请选择日期">
                        <a-select-option v-for="item in 31" :key="item" :value="item">
                          {{item}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="4">
                      周期从
                      <a-input-number :min="1" :max="day.cycleEnd" v-model="day.cycleStart"></a-input-number> 
                      到
                      <a-input-number :min="1" :max="31" v-model="day.cycleEnd"></a-input-number> 
                      日
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="5">
                      本月最后一日
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="6">
                      本月最后一个工作日
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="7">
                      本月底前
                      <a-input-number :min="1" :max="30" v-model="day.beforeEndMonth"></a-input-number> 
                      日
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="8">
                      每月
                      <a-input-number :min="1" :max="30" v-model="day.nearstWeekDay"></a-input-number> 
                      日最近的那个工作日
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="6" >
            <span slot="tab"><a-icon type="schedule" /> 周 </span>
            <div class="tabcontent">
              <a-radio-group v-model="day.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="9">每周每天</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="10">
                      从
                      <a-select v-model="week.intervalStart" style="width: 128px">
                        <a-select-option v-for="item in 7" :key="item" :value="item">
                          {{weekdayTexts[item-1]}}
                        </a-select-option>
                      </a-select>
                      开始，每隔
                      <a-input-number :min="1" :max="7" v-model="week.interval"></a-input-number> 
                      周
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="11">
                      指定星期（可多选）
                      <a-select mode="multiple" v-model="week.specific" placeholder="请选择星期">
                        <a-select-option v-for="item in 7" :key="item" :value="weekdays[item-1]">
                          {{weekdayTexts[item-1]}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col >
                    <a-radio :value="12">
                      周期从
                      <a-select v-model="week.cycleStart" style="width: 128px">
                        <a-select-option v-for="item in 7" :key="item" :value="item">
                          {{weekdayTexts[item-1]}}
                        </a-select-option>
                      </a-select>
                      到
                      <a-select v-model="week.cycleEnd" style="width: 128px">
                        <a-select-option v-for="item in 7" :key="item" :value="item">
                          {{weekdayTexts[item-1]}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="13">
                      本月第
                      <a-input-number :min="1" :max="5" v-model="week.numberWeek"></a-input-number> 
                      个
                      <a-select v-model="week.weekdayOfWeek" style="width: 128px">
                        <a-select-option v-for="item in 7" :key="item" :value="item">
                          {{weekdayTexts[item-1]}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="14">
                      本月最后一个
                      <a-select v-model="week.lastWeekdayOfMonth" style="width: 128px">
                        <a-select-option v-for="item in 7" :key="item" :value="item">
                          {{weekdayTexts[item-1]}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="5" >
            <span slot="tab"><a-icon type="schedule" /> 月 </span>
            <div class="tabcontent">
              <a-radio-group v-model="month.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="1">每一月</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="2">
                      从
                      <a-input-number :min="1" :max="12" v-model="month.intervalStart"></a-input-number>
                      月开始，每隔 
                      <a-input-number :min="1" :max="12" v-model="month.interval"></a-input-number> 
                      月
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="3">
                      指定月份数（可多选）
                      <a-select mode="multiple" v-model="month.specific" :allowClear="true" placeholder="请选择月份">
                        <a-select-option v-for="item in 12" :key="item" :value="item">
                          {{item}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="4">
                      周期从
                      <a-input-number :min="1" :max="month.cycleEnd" v-model="month.cycleStart"></a-input-number> 
                      到
                      <a-input-number :min="1" :max="12" v-model="month.cycleEnd"></a-input-number> 
                      月份
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
          <a-tab-pane key="7" >
            <span slot="tab"><a-icon type="schedule" /> 年 </span>
            <div class="tabcontent">
              <a-radio-group v-model="year.radio">
                <a-row>
                  <a-col>
                    <a-radio :value="1">每一年</a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="2">
                      从
                      <a-input-number :min="2020" :max="2099" v-model="year.intervalStart"></a-input-number>
                      年开始，每隔 
                      <a-input-number :min="1" :max="2099 - year.currentYear" v-model="year.interval"></a-input-number> 
                      年
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-radio :value="3">
                      指定年份数（可多选）
                      <a-select mode="multiple" v-model="year.specific" :allowClear="true" placeholder="请选择年份">
                        <a-select-option v-for="item in 80" :key="item" :value="currentYear + item -1">
                          {{currentYear + item -1}}
                        </a-select-option>
                      </a-select>
                    </a-radio>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col>
                    <a-radio :value="4">
                      周期从
                      <a-input-number :min="currentYear" :max="year.cycleEnd" v-model="year.cycleStart"></a-input-number> 
                      到
                      <a-input-number :min="currentYear" :max="2099" v-model="year.cycleEnd"></a-input-number> 
                      年
                    </a-radio>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>
<script>
/**
 * cron表达式组件
 * 外部事件：
 *  确定 save(cron) 
 *  取消 close();
 * 参数见props
 * notes: 表达式回显未实现
 * @author wuzm
 */
import { Modal, Icon, Button, Tabs, Row, Col, Radio, Input, InputNumber, Select, Popover} from "ant-design-vue";
import {checkCronExpre, nextTimes} from "@/framework/api/qrtztask";
import { showError } from "@/framework/utils/index";
export default {
  name:'cronEditor',
  components: {
    AModal: Modal,
    AButton:Button,
    AIcon: Icon,
    ATabs: Tabs,
    ATabPane:Tabs.TabPane,
    ARow: Row,
    ACol: Col,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AInput: Input,
    AInputNumber:InputNumber,
    ASelect: Select,
    ASelectOption:Select.Option,
    APopover: Popover,
  },
  props:{
    //标题
    title: {
      type: String,
      required: false,
      default: "Cron编辑器"
    },
    expression:{//TODO 表达式回显
      type: String,
      required: false
    }
  },
  data() {
    let date = new Date();
    let currentYear = date.getFullYear();
    return {
      second:{
          radio: null,//选中的单选框
          intervalStart: 0,//间隔时间-从什么时间开始
          interval: 1,//间隔时间-间隔多少时间
          specific: [0],//指定时间数组
          cycleStart: 1,//周期-开始时间
          cycleEnd: 2,//周期-结束时间
      },
      minute:{
          radio: null,
          intervalStart: 0,
          interval: 1,
          specific: [0],
          cycleStart: 1,
          cycleEnd: 2,
      },
      hour:{
          radio: null,
          intervalStart: 0,
          interval: 1,
          specific: [0],
          cycleStart: 1,
          cycleEnd: 2,
      },
      day:{
          radio: null,
          intervalStart: 1,
          interval: 1,
          specific: [],
          cycleStart: 1,
          cycleEnd: 2,
          beforeEndMonth: 1,
          nearstWeekDay: 1
      },
      week:{
          radio: null,
          intervalStart: 1,
          interval: 1,
          specific: [],
          cycleStart: 1,
          cycleEnd: 2,
          numberWeek:1,
          weekdayOfWeek:1,
          lastWeekdayOfMonth: 1
      },
      month:{
          radio: null,
          intervalStart: 1,
          interval: 1,
          specific: [],
          cycleStart: 1,
          cycleEnd: 2,
      },
      year:{
          radio: null,
          intervalStart: currentYear,
          interval: 1,
          specific: [],
          cycleStart: currentYear,
          cycleEnd: currentYear + 1,
      },
      currentYear: currentYear,
      weekdays: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
      weekdayTexts:['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
      nextTimeList:[]
    }
  },
  computed:{
    secondsText() {
      let seconds = '';
      switch(this.second.radio){
        case 1 :
          seconds = "*";
          break;
        case 2:
          seconds = this.second.intervalStart+'/'+this.second.interval;
          break;
        case 3:
          seconds = this.second.specific.toString();
          break;
        case 4:
          seconds = this.second.cycleStart+'-'+this.second.cycleEnd;
          break;
      }
      return seconds;
    },
    minutesText() {
      let minutes = '';
      switch(this.minute.radio){
        case 1 :
          minutes = "*";
          break;
        case 2:
          minutes = this.minute.intervalStart+'/'+this.minute.interval;
          break;
        case 3:
          minutes = this.minute.specific.toString();
          break;
        case 4:
          minutes = this.minute.cycleStart+'-'+this.minute.cycleEnd;
          break;
      }
      return minutes;
    },
    hoursText() {
      let hours = '';
      switch(this.hour.radio){
        case 1 :
          hours = "*";
          break;
        case 2:
          hours = this.hour.intervalStart+'/'+this.hour.interval;
          break;
        case 3:
          hours = this.hour.specific.toString();
          break;
        case 4:
          hours = this.hour.cycleStart+'-'+this.hour.cycleEnd;
          break;
      }
      return hours;
    },
    daysText() {
      let days = '';
      switch(this.day.radio){
        case 1 :
          days = "*";
          break;
        case 2:
          days = this.day.intervalStart+'/'+this.day.interval;
          break;
        case 3:
          days = this.day.specific.toString();
          break;
        case 4:
          days = this.day.cycleStart+'-'+this.day.cycleEnd;
          break;
        case 5:
          days = "L";
          break;
        case 6:
          days = "LW";
          break;
        case 7:
          days = 'L-' + this.day.beforeEndMonth;
          break;
        case 8:
          days = this.day.nearstWeekDay + 'W';
          break;
        case 9:
          days = "?";
          break;
        case 10:
          days = "?";
          break;
        case 11:
          days = "?";
          break;
        case 12:
          days = "?";
          break;
        case 13:
          days = "?";
          break;
        case 14:
          days = "?";
          break;
      }
      return days;
    },
    weeksText() {
      let weeks = '';
      switch(this.day.radio){
        case 1:
          weeks = "?";
          break;
        case 2:
          weeks = "?";
          break;
        case 3:
          weeks = "?";
          break;
        case 4:
          weeks = "?";
          break;
        case 5:
          weeks = "?";
          break;
        case 6:
          weeks = "?";
          break;
        case 7:
          weeks = "?";
          break;
        case 8:
          weeks = "?";
          break;
        case 9 :
          weeks = "*";
          break;
        case 10:
          weeks = this.week.intervalStart+'/'+this.week.interval;
          break;
        case 11:
          weeks = this.week.specific.toString() || "*";
          break;
        case 12:
          weeks = this.week.cycleStart+'-'+this.week.cycleEnd;
          break;
        case 13:
          weeks = this.week.weekdayOfWeek + "#"+ this.week.numberWeek
          break;
        case 14:
          weeks= this.week.lastWeekdayOfMonth + "L";
          break;
      }
      return weeks;
    },
    monthsText() {
      let months = '';
      switch(this.month.radio){
        case 1 :
          months = "*";
          break;
        case 2:
          months = this.month.intervalStart+'/'+this.month.interval;
          break;
        case 3:
          months = this.month.specific.toString();
          break;
        case 4:
          months = this.month.cycleStart+'-'+this.month.cycleEnd;
          break;
      }
      return months;
    },
    yearsText() {
      let years = '';
      switch(this.year.radio){
        case 1 :
          years = "*";
          break;
        case 2:
          years = this.year.intervalStart+'/'+this.year.interval;
          break;
        case 3:
          years = this.year.specific.toString();
          break;
        case 4:
          years = this.year.cycleStart+'-'+this.year.cycleEnd;
          break;
      }
      return years;
    },
    cron(){
      return `${this.secondsText||'*'} ${this.minutesText||'*'} ${this.hoursText||'*'} ${this.daysText||'*'} ${this.monthsText||'*'} ${this.weeksText||'?'} ${this.yearsText||'*'}`
    }
  },
  methods:{
    save(){
      checkCronExpre(this.cron)
      .then(res => {
        this.$emit("save",this.cron);
      }).catch(err => {
        showError(err);
      })
    },
    close(){
      this.$emit("close");
    },
    visibleChange(visible){
      if(visible){
        nextTimes(this.cron)
        .then(resp => this.nextTimeList = resp.result)
        .catch(err => showError(err));
      }else{
        this.nextTimeList = [];
      }
    }
  }
}
</script>
<style lang='less' scoped>
  .cronexpression{
    text-align: center;
    .text{ 
      font-size: 24px;
      font-weight: bold;
    }
    .times{
      margin: 0;
    }
    .info{
      margin-left: 10px;
      color: @primary-color;
      cursor: pointer;
      font-size: 18px;
      vertical-align: super;
    }
  }
  .crontabs{
    .tabcontent{
      margin: 0 10px;
      .ant-row{
        margin: 5px 0;
      }
    }
  }
</style>