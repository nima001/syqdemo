<template>
  <div class="select_condition">
    <template>
      <div class="title" v-if="title">
        {{title}}
      </div>
      <div class="tabs" v-else>
        <span v-for="item in tabs" :key="item.userType" :class="{'active': tabActive.userType == item.userType}" @click="onToggleTab(item)">
          {{item.text}}
        </span>
      </div>
    </template>
    <div class="date">
      <div class="date_main">
        <span>日期：&nbsp;&nbsp;</span>
        <span v-for="(item, index) in dateLists" :key="index" :class="{'active': dateActive.name && dateActive.name == item.name}" @click="onToggleDate(item)">
          {{item.name}}
        </span>
        <div class="custom_date">
          <span>自定义：</span>
          <a-range-picker
            :value="[moment(search.startTime, 'YYYY/MM/DD'), moment(search.endTime, 'YYYY/MM/DD')]"
            @change="toggleRangeDate"
          />
        </div>
      </div>
    </div>
    <div class="source" v-if="title">
      <div class="source_main">
        <span>注册来源：</span>
        <span v-for="(source, index) in sourceList" :key="index" :class="{'sourced': sourceActive.indexOf(source.name) > -1}" @click="toggleSource(source)">
          {{source.name}}
        </span>
      </div>
    </div>
    <div class="platform" v-if="title">
      <span>业务平台：</span>
      <span @click="visible = true">全部</span>
    </div>
    <!--业务平台-->
    <a-modal
      title="业务平台"
      v-model="visible"
      :width="500"
      :bodyStyle="{ height: '600px', padding: '0' }"
      @ok="handleOk"
      @cancel="visible = false"
    >
      <BusinessPlatform ref="BusinessPlatform"></BusinessPlatform>
    </a-modal>
  </div>
</template>

<script>
import { DatePicker, Modal } from "ant-design-vue";
import BusinessPlatform from './BusinessPlatform';
import { getDate } from "../../utils/index";
import { getRegsortTypes } from "@/zfw/api/naturalRegister";
import { showError } from '../../../framework/utils';
import moment from "moment";

export default {
  props: {
    title: {
      type: String,
      default: undefined
    },
    defaultDate: {
      type: Object,
      default: () => {
        return { name: '近三个月' }
      }
    }
  },
  components: {
    ARangePicker: DatePicker.RangePicker,
    AModal: Modal,
    BusinessPlatform
  },
  data() {
    return {
      visible: false,
      tabs: [
        { text: '自然人用户', userType: 1 },
        { text: '法人用户', userType: 2  },
        { text: '境外用户', userType: 3  },
      ],
      tabActive: { text: '自然人用户', userType: 1 },
      dateActive: undefined,
      sourceActive: ['全部'],
      dateName: ['上线至今', '前日', '昨日', '今日', '近一周', '近一个月', '近三个月', '近半年'],
      sourceList: [],
      search: {
        startTime: undefined,
        endTime: undefined,
        resources: [],
        appIds: [],
        userType: 1
      }
    };
  },
  watch: {},
  computed: {
    dateLists() {
      //  ToDo 上线至今未处理
      let day = new Date();
      let currentYear = day.getFullYear();
      let dateNames = ['上线至今', '前日', '昨日', '今日', '近一周', '近一个月', '近三个月', '近半年', currentYear-2, currentYear - 1, currentYear];
      let dateVals = [getDate('lastTwoDay'), getDate('lastTwoDay'), getDate('lastOneDay'), getDate('today'), getDate('lastOneWeek'), getDate('lastOneMonth'), getDate('lastThreeMonth'), getDate('lastHalfYear'), getDate('lastTwoYear'), getDate('lastOneYear'), getDate('thisYear') ];
      let arr = [];
      dateNames.forEach((item, index) => {
        let obj = {};
        obj.name = item;
        obj.value = dateVals[index];
        arr.push(obj);
      })
      return arr;
    }
  },
  created() {
    //  默认近三月
    this.dateActive = this.defaultDate;
    if (this.title) {
      this.handlegetRegsortTypes();
    }
    this.dateLists.forEach(item => {
      if (item.name === this.defaultDate.name) {
        this.search.startTime = item.value.startTime;
        this.search.endTime = item.value.endTime;
      }
    })
    this.$store.commit('SET_PARAMS', {...this.search, title: this.title});
    this.$emit('handleData', this.search);
  },
  mounted() {},
  methods: {
    moment,
    handlegetRegsortTypes() {
      getRegsortTypes().then(({attr}) => {
        this.sourceList = [{value: [], name: '全部'}].concat(attr.data);
      })
      .catch(err => {
        showError(err);
      })
    },
    onToggleTab(item) {
      this.tabActive = item;
      this.search.userType = item.userType;
      this.$store.commit('SET_PARAMS', {...this.search, title: this.title});
      this.$emit('handleData', this.search);
    },
    async handleOk() {
      let data = await this.$refs.BusinessPlatform.getVal();
      if (data.length > 0) {
        this.visible = false;
        this.search.appIds = data;
        this.$store.commit('SET_PARAMS', {...this.search, title: this.title});
        this.$emit('handleData', this.search);
      }
    },
    onToggleDate(item) {
      this.dateActive.name = item.name;
      this.search.startTime = item.value.startTime;
      this.search.endTime = item.value.endTime;
      this.search.userType = this.tabActive.userType;
      this.$store.commit('SET_PARAMS', {...this.search, title: this.title});
      this.$emit('handleData', this.search);
    },
    toggleRangeDate(dates, string, dateString) {
      this.dateActive.name = undefined;
      let dateList = [];
      string.forEach(item => {
        item = item.replace(/-/g,"/");
        dateList.push(item);
      })
      this.search.startTime = dateList[0];
      this.search.endTime = dateList[1];
      this.search.userType = this.tabActive.userType;
      this.$store.commit('SET_PARAMS', {...this.search, title: this.title});
      this.$emit('handleData', this.search);
    },
    toggleSource(source) {
      if (source.name == '全部') {
        this.sourceActive = [];
        this.sourceActive[0] = source.name;
        this.search.resources = [];
      } else {
        //  选中 or 取消
        let activeIndex = this.sourceActive.indexOf(source.name);
        let valIndex = this.search.resources.indexOf(source.value);
        if (activeIndex > -1) {
          this.sourceActive.splice(activeIndex, 1);
          this.search.resources.splice(valIndex, 1);
        } else {
          this.sourceActive.push(source.name);
          this.search.resources.push(source.value);
        }
      }
      this.$store.commit('SET_PARAMS', {...this.search, title: this.title});
      this.$emit('handleData', this.search);
    }
  },
};
</script>
<style lang="less" scoped>
.select_condition{
  background-color: @white;
  padding: @padding-lg;
  -moz-box-shadow:0px 4px 6px #E7E7E7; 
  -webkit-box-shadow:0px 4px 6px #E7E7E7; 
  box-shadow:0px 4px 6px #E7E7E7;
  .title{
    font-size: 30px;
    color: black;
  }
  .tabs{
    span{
      display: inline-block;
      text-align: center;
      line-height: 50px;
      padding: 0 36px;
      border-radius: 5px;
      color: @primary-color;
      cursor: pointer;
    }
    span.active{
      background-color: @primary-1; 
      font-weight: bold;
    }
  }
  .date{
    margin-top: @padding-lg;
    .date_main{
      display: inline-block;
      position: relative;
      > span{
        display: inline-block;
        border: 1px solid #e2e2e2;
        border-right: none;
        padding: 0 14px;
        line-height: 30px;
        color: #a2a2a2;
        cursor: pointer;
        &:hover{
          color: @primary-color;
        }
        &:nth-child(1){
          border: none;
          padding-left: 0;
        }
        &:nth-child(2){
          margin-left: 20px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        &:nth-child(12){
          border-right: 1px solid #e2e2e2;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
      span.active{
        color: @white;
        background-color: @primary-color;
      }
      .custom_date{
        position: absolute;
        right: -423px;
        top: 0;
        // width: 100px;
        height: 32px;
        display: flex;
        > span{
          &:nth-child(1){
            display: inline-block;
            border: 1px solid #e2e2e2;
            border-right: none;
            color: #a2a2a2;
            line-height: 32px;
            padding: 0 5px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
        }
        /deep/.ant-calendar-picker{
          .ant-calendar-picker-input{
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
          }
        }
      }
    }
  }
  .source{
    margin-top: @padding-lg;
    .source_main{
      display: inline-block;
      position: relative;
      > span{
        display: inline-block;
        border: 1px solid #e2e2e2;
        border-right: none;
        padding: 0 14px;
        line-height: 30px;
        color: #a2a2a2;
        cursor: pointer;
        &:hover{
          color: @primary-color;
        }
        &:nth-child(1){
          border: none;
          padding-left: 0;
        }
        &:nth-child(2){
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        &:nth-child(8){
          border-right: 1px solid #e2e2e2;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
      span.sourced{
        color: @white;
        background-color: @primary-color;
      }
    }
  }
  .platform{
    color: #a2a2a2;
    margin-top: @padding-lg;
    line-height: 30px;
    span{
      display: inline-block;
      &:nth-child(2) {
        margin-left: 14px;
        padding: 0 15px;
        text-align: center;
        border: 1px solid #e2e2e2;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>