<template>
  <div class="user-login">
    <div class="container">
      <div class="login-system">
        <div class="title">登陆设备</div>
        <ul class="list">
          <li v-for="(item, index) in system" :key="index">
            <div class="left">
              <span class="iconfont" v-html="item.iconfont"></span>
            </div>
            <div class="right">
              <div class="name">{{item.name}}</div>
              <div class="right-info">
                <div class="time">{{item.time}}</div>
                <div class="outline">下线</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="login-record">
        <div class="title">
          登陆足迹
        </div>
        <div class="timeline" v-if="timeline.length">
          <a-timeline>
            <a-timeline-item v-for="(list, index) in timeline" :key="index">
              <p>{{list.info}}</p>
              <p>{{list.ip}}</p>
            </a-timeline-item>
          </a-timeline>
          <div class="more" @click="showMore" v-if="!page.isBottom">
            <a-spin :spinning="spinning">
              <a-icon slot="indicator" type="loading" style="font-size: 18px" spin />
            </a-spin>
            &nbsp;更多
          </div>
        </div>
        <EmptyData v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { Timeline, Spin, Icon } from "ant-design-vue";
import EmptyData from "@framework/components/EmptyData";
import { userdeviceList, userdeviceLogout, loginoutLog } from "@/idm/api/userdevice";
import { showError, dateFormat } from "@/framework/utils/index";

export default {
  props: ["account"],
  components: {
    ASpin: Spin,
    AIcon: Icon,
    ATimeline: Timeline,
    ATimelineItem: Timeline.Item,
    EmptyData
  },
  data() {
    return {
      accountId: undefined,
      system: [
        { name: 'iphone iPhone10,2 13.1.2', time: '2020-07-16 13:10:36', iconfont: '&#xe61b;' },
        { name: 'iphone iPhone10,2 13.1.2', time: '2020-07-16 13:10:36', iconfont: '&#xe61b;' },
      ],
      timeline: [],
      page:{
        pagenum: 1,
        pagesize: 3,
        total: 0,
        isBottom: false
      },
      spinning: false
    }
  },
  created() {
    this.accountId = this.$route.query.accountId;
    this.getUserDeviceList();
    this.getLoginoutLog(this.page);
  },
  methods: {
    getUserDeviceList() {
      userdeviceList(this.accountId)
      .then(res => {
        
      })
      .catch(err => {
        showError(err);
      })
    },
    getLoginoutLog(page) {
      this.spinning = true;
      loginoutLog({
        ...page,
        accountid: this.accountId
      })
      .then(res => {
        this.spinning = false;
        this.page.total = res.result.total;
        let rows = res.result.rows;
        let jugeleDate = this.isToday();
        let data = rows.reduce((pre, cur) => {
          let curDate = cur.logintime.split(' ');
          cur.logintime = jugeleDate(curDate[0]) 
                          ? '今天' + ' ' + curDate[1] 
                          : curDate[0] + ' ' + curDate[1];
          return pre.concat({
            info: cur.logintime + '\xa0\xa0\xa0\xa0'+ cur.media,
            ip: cur.ip
          })
        }, [])
        this.timeline = [...this.timeline, ...data];
      })
      .catch(err => {
        this.spinning = false;
        showError(err);
      })
    },
    showMore() {
      let maxPage = Math.ceil(this.page.total / this.page.pagesize);
      this.page.pagenum ++;
      if (this.page.pagenum > maxPage) {
        this.page.isBottom = true;
        return
      }
      this.getLoginoutLog(this.page);
    },
    isToday() {
      let today = new Date();
      let res = dateFormat(today, 'yyyy-MM-dd');
      return function(date) {
        return date === res ? true : false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
ul,li,p{
  margin: 0;
}
.commontitle{
  font-size: 24px;
  line-height: 40px;
  color: #000;
}

.user-login{
  .container{
    margin: 30px 90px;
    .login-system{
      .title{
        .commontitle();
      }
      .list{
        padding: @padding-lg 0;
        li{
          display: flex;
          border-bottom: 1px solid #e8e8e8;
          .left{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
            .iconfont{
              font-size: 40px;
              color: @primary-color;
            }
          }
          .right{
            width: calc(~'100% - 90px');
            .name{
              font-size: 24px;
              color: #000;
              line-height: 40px;
            }
            .right-info{
              display: flex;
              justify-content: space-between;
              .time{
                font-size: 16px;
                line-height: 40px;
              }
              .outline{
                color: @primary-color;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .login-record{
      overflow: hidden;
      .title{
        .commontitle();
      }  
      .timeline{
        position: relative;
        padding: @padding-lg 0 0 0;
          margin-bottom: 24px;
        /deep/.ant-timeline{
          .ant-timeline-item{
            .ant-timeline-item-content{
              p{
                &:last-child{
                  color: #bbb;
                }
              }
            }
          }
        }
        .more{
          position: absolute;
          left: 20px;
          bottom: -5px;
          color: @primary-color;
          line-height: 40px;
          cursor: pointer;
        }
      }
    } 
  }
}
</style>