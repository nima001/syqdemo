<template>
  <div>    
    <div class="detail-info1" :style="{padding:  (!isRetire ? '20px': '0'),height:(!isRetire ? '600px' : '488px')}">
      
      <template>
        <div class="header" :class="{'headerPadding': !isRetire}" :style="{'margin-top':  (isRetire ? '15px': '0')}">
          <div class="lcd-title"><span>{{lcdTitle}}</span></div>
          <lcd-font :length="4" :smooth="false" :realNumber="page.total"/>
        </div>
        <div class="middle">
          <ul class="list">
            <li class="item tag" >
              <span class="name">人员姓名</span>
              <span class="org">机构名称</span>
              <span class="birthday">出生日期</span>
              <span class="sex">性别</span>
              <span class="education">最高学历</span>
              <span class="reason">退休依据</span>
              <span class="retireTime">预计退休时间</span>
            </li>
            <li class="nodata" v-if="hasdata === 0">暂无数据</li>
            <li v-if="loading"><loading /></li>
            <li v-else
              class="item"
              v-for="(item,index) in page.rows"
              :key="index"
            >
              <span class="name">{{item.username}}</span>
              <span class="org" :title="item.org">{{item.org}}</span>
              <span class="birthday">{{item.birthday}}</span>
              <span class="sex">{{item.sex}}</span>
              <span class="education">{{item.highesteducation}}</span>
              <span class="reason" :title="getReason(item)">{{getReason(item)}}</span>
              <span class="retireTime">{{item['_join0.yjtxsj']}}</span>
            </li>
          </ul>
        </div>
        <div class="footer">
          <div class="pagintion">
            <a
              :class="{ disabled: page.pagenum <= 1 }"
              @click="loadData(page.pagenum - 1)"
              ><img src="../img/p-down.png"
            /></a>
            <span>{{ page.pagenum }}/{{ pageTotal }}</span>
            <a
              :class="{ disabled: page.pagenum >= pageTotal }"
              @click="loadData(page.pagenum + 1)"
              ><img src="../img/p-up.png"
            /></a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { retireNearlyAMonth, retireError } from "@/person-shaoxing/api/orgStaffReport";
import { showError } from "@framework/utils/index";
import LcdFont from "../components/LcdFont";
import Loading from "../components/Loading";
export default {
  components: {
    LcdFont,
    Loading
  },
  props: {
    district: String,
    orgid: String,
    lcdTitle: String,
    isRetire: Boolean,
  },
  data() {
    return {
      hasdata: -1,
      loading:true,
      page: {
        pagenum: 1,
        pagesize: 10,
        rows: [],
        total: 0
      }
    };
  },
  created(){
    this.loadData(1);
  },
  computed: {
    pageTotal() {
      let { pagesize, total } = this.page;
      if (total > 0) {
        return Math.ceil(total / pagesize);
      }
      return 1;
    },
  },
  methods: {
    loadData(pagenum) {
      this.loading = true;
      if (pagenum < 1 || pagenum > this.pageTotal ) {
        return;
      }
      let pagenation = {...this.page, pagenum, needtotal:true};
      let requestMethod;
      //退休情况
      if(this.isRetire){
        requestMethod = retireNearlyAMonth( this.district, this.orgid, pagenation);
      }else{
        //未退休情况
        requestMethod = retireError( this.district, this.orgid, pagenation);
      }
      requestMethod.then(res => {
        this.page = res.result;
        this.hasdata = res.result.total;
        this.loading = false;
      })
      .catch(err => {
        showError(err);
      });
    },
    getReason(userData){
      let reason = [];
      if(userData.zhgllgwyzj) {
        reason.push(userData.zhgllgwyzj);
      }
      if(userData.identitytype) {
        reason.push(userData.identitytype);
      }
      if(userData.technicaltitle) {
        reason.push(userData.technicaltitle);
      }
      if(userData.leaderpostlevel) {
        reason.push(userData.leaderpostlevel);
      }
      return reason.join("/");
    }
  }
};
</script>
<style lang="less" scoped>
.detail-info1 {
  display: flex;
  flex-direction: column;
  & > .header {
    text-align: center;
    margin-bottom: 20px;
    flex: none;
    .lcd-title {
      color: #fff;
      font-size: 16px;
    }
  }
  .headerPadding{
    padding: 15px 0px;
  }
  & > .middle {
    flex: auto;
    min-height: 1px;
    display: flex;
    .list {
      flex: auto;
      margin: 0px;
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        align-items: center;
        padding: 0px 15px;
        position: relative;
        cursor: pointer;
        margin: 2px 0;
        &:nth-child(even) {
          background: #111c31;
        }
        &.tag {
          background: linear-gradient(
            90deg,
            #417edc 0%,
            rgba(23, 25, 26, 0) 100%
          );
          span {
            font-size: 18px;
          }
          &::before {
            width: 2px;
            height: 29px;
            content: "";
            background: #0ffcfe;
            opacity: 0.6;
            position: absolute;
            left: 0px;
            top: 0px;
          }
        }
        span {
          color: #fff;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          opacity: 0.8;
          &.name{
            width: 12%;
          }
          &.org{
            width: 20%;
          }
          &.birthday{
            width: 12%;
          }
          &.sex{
            width: 10%;
          }
          &.education{
            width: 15%;
          }
          &.reason{
            width: 30%;
          }
          &.retireTime{
            width: 12%;
          }
        }
      }
      .nodata{
        margin-top: 20px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.3);
        text-align: center;
      }
    }
  }
  & > .footer {
    overflow: hidden;
    flex: none;
    .pagintion {
      height: 40px;
      width: 140px;
      margin: 15px auto 0px;
      padding: 5px;
      line-height: 30px;
      background-color: #101b2c;
      border-radius: 4px;
      color: white;
      text-align: center;
      span {
        margin: 0px 12px;
      }
      a {
        padding: 0 10px;
        width: 14px;
        height: 9px;
        &.disabled {
          cursor: not-allowed;
        }
        &.pre {
          background: url("../img/p-down.png") no-repeat center center;
        }
        &.next {
          background: url("../img/p-up.png") no-repeat center center;
        }
        &.disabled {
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>