<template>
  <div class="home_body">
    <div class="home_body_top">
      <div class="content">
        <div class="help">
          <img src="../../assets/img/helps.png" alt="">
          <router-link to="/zfw/overview/index">
            <img src="../../assets/img/more.png" alt="">
          </router-link>
        </div>
        <ul class="statistical">
          <li class="statistical_list" v-for="(item,index) in statistical" :key="index">
            <p><span>{{item.num ? item.num : 0}}</span></p>
            <p>{{item.name}}</p>
            <p>{{item.date}}</p>
          </li>
        </ul>
        <div class="chart">
          <div class="register_chart chart_item">
            <div class="title">今日注册用户趋势图</div>
            <div class="date">{{today}}</div>
            <LineChart :data="regData" style="height: 219px;margin-top: 24px;"></LineChart>
          </div>
          <div class="login_chart chart_item">
            <div class="title">今日登陆用户趋势图</div>
            <div class="date">{{today}}</div>
            <LineChart :data="loginData" style="height: 219px;margin-top: 24px;"></LineChart>
          </div>
        </div>
      </div>
    </div>
    <div class="home_body_bottom">
      <div class="left">
        <div class="title">
          <span>消息中心</span>
          <span>
            <img src="../../assets/img/more.png" alt="">
          </span>
        </div>
        <ul class="msg">
          <li class="msg_list" v-for="(list, index) in msgList" :key="index">
            <div>{{list.text}}</div>
            <div>{{list.date}}</div>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="title">
          <span>常用业务</span>
          <span>
            <img src="../../assets/img/more.png" alt="">
          </span>
        </div>
        <ul class="business">
          <li class="business_list" v-for="(list, index) in businessList" :key="index" @click="link(list.url)">
            <img :src="list.img" alt="">
            <span>{{list.text}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { indexReportdata, loginDate, realTimeData, isFristLogin, getListMenu } from "../../api/index";
import { showError } from "@/framework/utils/index";
import LineChart from '@/zfw/components/lineChart';
import { getCookie } from '@/framework/utils/auth';
import Bus from '@/framework/utils/EventBus';

export default {
  props: {},
  components: { LineChart },
  data() {
    return {
      indexData: undefined,
      loginData: [],
      regData: [],
      today: undefined,
      statistical: [],
      timer: null,
      msgList: [
        { text: '[微信小程序]业务平台接入', date: '15:23' },
        { text: '[微信小程序]业务平台接入', date: '15:23' },
        { text: '[微信小程序]业务平台接入', date: '15:23' },
        { text: '[微信小程序]业务平台接入', date: '15:23' },
        { text: '[微信小程序]业务平台接入', date: '15:23' },
      ],
      businessList: [
        { img: require("../../assets/img/business1.png"), text: '用户数据统计', url: '/zfw/overview/index' },
        { img: require("../../assets/img/business2.png"), text: '我向总理说句话' },
        { img: require("../../assets/img/business3.png"), text: '我向总理说句话' },
        { img: require("../../assets/img/business4.png"), text: '我向总理说句话' },
      ],
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getIsFristLogin();
    this.getIndexData();
    this.getRegData();
    this.getLoginData();
  },
  mounted() {
    //  每隔5秒刷新一次
    this.timer = setInterval(() => {
      this.getRegData();
      this.getLoginData();
    },5000)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    getIndexData() {
      indexReportdata()
      .then(({attr}) => {
        this.indexData = attr;
        this.statistical = this.initStatisticalData(attr);
        let data = getCookie();
        let result = {};
        result.jwt = data.sso_token;
        result.uid = data.sso_userid;
        result.username = attr.username;
        Bus.$emit("afterLogin", result);
      })
      .catch(err => {
        showError(err);
      })
    },
    getRegData() {
      realTimeData()
      .then(({attr}) => {
        this.regData = this.handleData(attr.time, attr.userregnum, '注册');
      })
      .catch(err => {
        showError(err);
      })
    },
    getLoginData() {
      loginDate()
      .then(({ attr }) => {
        this.loginData = this.handleData(attr.dayList, attr.dataList, '登陆');
      })
      .catch(err => {
        showError(err);
      })
    },
    getIsFristLogin() {
      isFristLogin()
      .then(({attr}) => {
        //  1表示已经登录过，0表示未登录
        let isFirstLogin = attr.isFirstLogin == 1 ? false : true;
        this.$store.commit('set_isFristLogin', isFirstLogin)
      })
      .catch(err => {
        showError(err);
      })
    },
    initStatisticalData(indexData) {
      let names = ['用户总数', '业务平台总数', '昨日注册用户数', '昨日登陆用户数'], arr = [];
      //昨天的时间
      let day1 = new Date();
      day1.setTime(day1.getTime()-24*60*60*1000);
      let yesterday = day1.getFullYear()+"/" + (day1.getMonth()+1) + "/" + day1.getDate();
      //今天的时间
      let day2 = new Date();
      day2.setTime(day2.getTime());
      let today = day2.getFullYear()+"/" + (day2.getMonth()+1) + "/" + day2.getDate();
      this.today = today;
      names.forEach((item, index) => {
        let obj = {};
        obj.name = item;
        switch(index) {
          case 0:
            obj.num = indexData.usernum;
            obj.date = '截止' + today;
            break;
          case 1:
            obj.num = indexData.appNum;
            obj.date = '截止' + today;
            break;
          case 2:
            obj.num = indexData.yesterDayNum;
            obj.date = yesterday;
            break;
          case 3:
            obj.num = indexData.yesterDayLoginUserNum;
            obj.date = yesterday;
            break;
        }
        arr.push(obj);
      })
      return arr;
    },
    handleData(years, values, title) {
      let arr = [];
      years.forEach((item, index) => {
        let obj = {};
        obj.year = item;
        obj.value = values[index];
        obj.name = title + '用户数';
        arr.push(obj)
      })
      return arr;
    },
    link(url) {
      this.$router.push({
        path: url
      })
    }
  },
};
</script>
<style lang="less" scoped>
.home_body {
  padding: @layout-space-base;
  height: 100%;
  .home_body_top{
    background-color: @white;
    height: 510px;
    border-radius: 5px;
    .content{
      height: 100%;
      padding: @padding-xs @padding-lg;
      .help{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 12px 0;
        img{
          display: inline-block;
          margin-left: 14px;
          cursor: pointer;
        }
      }
      .statistical{
        display: flex;
        margin-bottom: 14px;
        .statistical_list{
          width: 25%;
          height: 115px;
          margin-right: @padding-md;
          background-color: #f0f5f9;
          border-radius: 5px;
          p{
            text-align: center;
            margin: 0;
            &:nth-child(1){
              font-size: 36px;
              color: #fe8f01;
            }
            &:nth-child(2){
              font-size: 16px;
              color: #939292;
              font-weight: bold;
            }
            &:nth-child(3){
              font-size: 15px;
              color: #939292;
              padding: 4px 0;
            }
          }
          &:nth-child(3) {
            p{
              span{
                color: #1b518f;
              }
            }
          }
          &:nth-child(4) {
            margin-right: 0;
            p{
              span{
                color: #87b90c;
              }
            }
          }
        }
      }
      .chart{
        display: flex;
        padding: @padding-lg 0;
        .register_chart{
          width: 50%;
        }
        .login_chart{
          width: 50%;
          margin-left: 20px;
        }
        .chart_item{
          .title{
            font-size: 20px;
            font-weight: bold;
          }
          .date{
            font-style: 12px;
            color: #b0b0b0;
          }
          .chart_container{
            margin-top: @padding-lg;
          }
        }
      }
    }
  }
  .home_body_bottom{
    margin-top: 16px;
    height: calc(~"100% -  526px");
    display: flex;
    .left{
      width: 50%;
      background-color: @white;
      border-radius: 5px;
      padding: @padding-lg;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          &:nth-child(1){
            font-size: 20px;
            font-weight: bold;
          }
          &:nth-child(2){
            cursor: pointer;
          }
        }
      }
      .msg{
        margin-top: @padding-lg;
        .msg_list{
          display: flex;
          justify-content: space-between;
          line-height: 35px;
          font-size: 16px;
          div{
            &:last-child{
              color: #939292;
            }
          }
        }
      }
    }
    .right{
      width: 50%;
      margin-left: 16px;
      background-color: @white;
      border-radius: 5px;
      padding: @padding-lg;
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          &:nth-child(1){
            font-size: 20px;
            font-weight: bold;
          }
          &:nth-child(2){
            cursor: pointer;
          }
        }
      }
      .business{
        margin-top: @padding-lg;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .business_list{
          width: 49%;
          margin-bottom: 15px;
          height: 89px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          background-color: #eaeaeb;
          border-radius: 8px;
          img{
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>