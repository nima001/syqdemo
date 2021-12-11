<template>
  <div>
    <div class="layout_header">
      <SelectCondition @handleData="getData" :defaultDate="{ name: '近一周' }"></SelectCondition>
    </div>
    <div :style="{ margin: '16px', overflow: 'initial' }">
      <div class="overview">
        <div class="user_num">
          <div class="user_num_reg">
            <a-spin :spinning="loading">
              <p class="title">
                <span>
                  注册用户数
                </span>
                <span>
                  <img src="../../assets/img/more.png" alt="">
                </span>
              </p>
              <p class="date">{{time}}</p>
              <p class="total">
                <span>{{totalData.regnum ? totalData.regnum : 0}}</span>
                <span>
                  <span class="total_text">实名率&nbsp;</span>
                  {{totalData.realnamerate ? totalData.realnamerate : 0}}
                </span>
              </p>
            </a-spin>
          </div>
          <div class="user_num_login">
            <a-spin :spinning="loading">
              <p class="title">
                <span>
                  登陆用户数
                </span>
                <span>
                  <img src="../../assets/img/more.png" alt="">
                </span>
              </p>
              <p class="date">{{time}}</p>
              <p class="total">
                <span>{{totalData.loginnum ? totalData.loginnum : 0}}</span>
                <span>
                  <span class="total_text">日均活跃用户数&nbsp;</span>
                  {{totalData.activeUserNum ? totalData.activeUserNum : 0}}
                </span>
              </p>
            </a-spin>
          </div>
        </div>
        <div class="source">
          <div class="source_reg">
            <div class="title">
              注册来源
              <span>
                <img src="../../assets/img/more.png" alt="">
              </span>
            </div>
            <div class="date">{{time}}</div>
            <RingChart v-if="totalData.regsourceList.length > 0" :data="totalData.regsourceList" :loading="loading" style="height: 200px;margin-top: 24px;"></RingChart>
            <div class="empty" v-else>
              <EmptyData></EmptyData>
            </div>
          </div>
          <div class="source_login">
            <div class="title">
              登陆来源
              <span>
                <img src="../../assets/img/more.png" alt="">
              </span>
            </div>
            <div class="date">{{time}}</div>
            <RingChart v-if="totalData.resourceScale.length > 0" :data="totalData.resourceScale" :loading="loading" style="height: 200px;margin-top: 24px;"></RingChart>
            <div class="empty" v-else>
              <EmptyData></EmptyData>
            </div>
          </div>
        </div>
        <div class="hot_list">
          <div class="hot_list_reg">
            <div class="title">
              业务平台注册热榜
              <span>
                <img src="../../assets/img/more.png" alt="">
              </span>
            </div>
            <div class="date">{{time}}</div>
            <ul class="list_container" v-if="totalData.regAppidList.length > 0">
              <a-spin :spinning="loading">
                <li v-for="(list, index) in totalData.regAppidList" :key="index">
                  <div class="left" :style="{backgroundColor: 'rgba(28, 81, 147,'+ (1 - (index * 0.08)) +')'}">Top{{index+1}}</div>
                  <div class="right">
                    <div class="right_name">{{list.name}}</div>
                    <div class="right_con">
                      <span>{{list.num}}</span>
                      <span>{{handlePecent(list.percent)}}</span>
                    </div>
                  </div>
                </li>
              </a-spin>
            </ul>
            <div class="empty" v-else>
              <EmptyData></EmptyData>
            </div>
          </div>
          <div class="hot_list_login">
            <div class="title">
              业务平台登陆热榜
              <span>
                <img src="../../assets/img/more.png" alt="">
              </span>
            </div>
            <div class="date">{{time}}</div>
            <ul class="list_container" v-if="totalData.applicationScale.length > 0">
              <a-spin :spinning="loading">
                <li v-for="(list, index) in totalData.applicationScale" :key="index">
                  <div class="left" :style="{backgroundColor: 'rgba(150, 192, 56,'+ (1 - (index * 0.08)) +')'}">Top{{index+1}}</div>
                  <div class="right">
                    <div class="right_name">{{list.name}}</div>
                    <div class="right_con">
                      <span>{{list.count}}</span>
                      <span>{{handlePecent(list.percent)}}</span>
                    </div>
                  </div>
                </li>
              </a-spin>
            </ul> 
            <div class="empty" v-else>
              <EmptyData></EmptyData>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Spin } from "ant-design-vue";
import SelectCondition from '@/zfw/components/overview/SelectCondition';
import RingChart from '@/zfw/components/ringChart';
import { overview } from "@/zfw/api/naturalRegister";
import { getDate } from "../../utils/index";
import { showError } from '@/framework/utils';
import EmptyData from "@framework/components/EmptyData";

export default {
  props: {},
  components: { RingChart, SelectCondition, ASpin:　Spin, EmptyData },
  data() {
    return {
      loading: false,
      params: {
        startTime: getDate('lastOneWeek').startTime,
        endTime: getDate('lastOneDay').endTime,
        userType: 1
      },
      totalData: {}
    };
  },
  watch: {},
  computed: {
    time: {
      get() {
        return this.params.startTime + "-" + this.params.endTime;
      },
      set() {
        let time = this.params.startTime == this.params.endTime 
                   ? this.params.startTime
                   : this.params.startTime + "-" + this.params.endTime;
        return time;
      }
    }
  },
  created() {
    this.getData(this.params);
  },
  mounted() {},
  methods: {
    getData(params) {
      this.loading = true;
      let { startTime, endTime, userType } = params;
      this.params.startTime = startTime;
      this.params.endTime = endTime;
      overview({ startTime, endTime, userType })
      .then(({attr}) => {
        this.loading = false;
        this.totalData = attr;
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    handlePecent(num) {
      let value = parseFloat(num);
      if (!value) return 0;
      return Number(num * 100).toFixed(1) + "%";
    }
  },
};
</script>
<style lang="less" scoped>
p{
  margin: 0;
}
.empty{
  width: 100%;
  height: 200px;
}
.overview{
  .user_num{
    display: flex;
    >div{
      width: 50%;
      background-color: @white;
      padding: @padding-lg;
      border-radius: 5px;
      -moz-box-shadow:0px 0px 10px #E7E7E7; 
      -webkit-box-shadow:0px 0px 10px #E7E7E7; 
      box-shadow:0px 0px 10px #E7E7E7;
      >p{
        margin: 0;
      }
      .title{
        font-size: 20px;
        color: black;
        font-weight: bold;
        position: relative;
        margin: 0;
        span{
          &:nth-child(2){
            position: absolute;
            top: -10px;
            right: 0;
            cursor: pointer;
          }
        }
      }
      .date{
        // font-size: 12px;
        color: #939393;
        padding-top: 10px;
      }
      .total{
        margin-top: 10px;
        color: #1d4a8d;
        >span{
          margin-right: 88px;
          &:nth-child(1){
            font-size: 30px;
          }
          .total_text{
            color: #898989;
            font-size: 16px;
          }
        }
      }
      &:nth-child(2){
        .total{
          span{
            color: #96c038;
            .total_text{
              color: #898989;
              font-size: 16px;
            }
          }
        }
      }
    }
    .user_num_login{
      margin-left: 16px;
    }
  }
  .source{
    display: flex;
    margin-top: 16px;
    > div{
      width: 50%;
      background-color: @white;
      padding: @padding-lg;
      border-radius: 5px;
      -moz-box-shadow:0px 0px 10px #E7E7E7; 
      -webkit-box-shadow:0px 0px 10px #E7E7E7; 
      box-shadow:0px 0px 10px #E7E7E7;
      .title{
        font-size: 20px;
        color: black;
        font-weight: bold;
        position: relative;
        span{
          position: absolute;
          top: -10px;
          right: 0;
          cursor: pointer;
        }
      }
      .date{
        color: #989898;
      }
    }
    .source_login{
      margin-left: 16px;
    }
  }
  .hot_list{
    display: flex;
    margin-top: 16px;
    >div{
      width: 50%;
      padding: @padding-lg;
      background-color: @white;
      border-radius: 5px;
      -moz-box-shadow:0px 0px 10px #E7E7E7; 
      -webkit-box-shadow:0px 0px 10px #E7E7E7; 
      box-shadow:0px 0px 10px #E7E7E7;
      .title{
        font-size: 20px;
        color: black;
        font-weight: bold;
        position: relative;
        span{
          position: absolute;
          top: -10px;
          right: 0;
          cursor: pointer;
        }
      }
      .date{
        color: #989898;
      }
      .list_container{
        li{
          display: flex;
          height: 48px;
          margin: @padding-md 0;
          .left{
            width: 58px;
            line-height: 48px;
            // background-color: rgba(28,81,147,0.2);
            text-align: center;
            color: @white;
          }
          .right{
            width: calc(~"100% - 60px");
            height: 100%;
            margin-left: 2px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .right_name{
              margin-left: 14px;
            }
            .right_con{
              margin-right: 16px;
              span{
                display: inline-block;
                width: 50px;
                height: 100%;
                &:nth-child(1) {
                  margin-right: 40px;
                }
              }
            }
          }
        }
        
      }
    }
    .hot_list_login{
      margin-left: 16px;
      ul{
        li{
          .left{
            background-color:#96c038;
          }
        }
      }
    }
  }
}
</style>