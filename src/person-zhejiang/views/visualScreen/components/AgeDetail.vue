<template>
  <div>
      <div class="detail-info">
        <div class="header">
          <p class="title">职务层次平均年龄</p>
          <div class="orgs">
            <ul>
              <li>
                <div class="name">厅局级</div>
                <div class="content">
                    <div class="principal" @click="onClick('tjjzz')">
                        <span>正职</span>
                        <span v-if="data.dzqtjjzzpjnl||data.sybztjjzzpjnl||data.zftjjfzpjnl">{{`${(data.dzqtjjzzpjnl||data.sybztjjzzpjnl||data.zftjjfzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                    <div class="vice" @click="onClick('tjjfz')">
                        <span>副职</span>
                        <span v-if="data.dzqtjjfzpjnl||data.sybztjjfzpjnl||data.zftjjfzpjnl">{{`${(data.dzqtjjfzpjnl||data.sybztjjfzpjnl||data.zftjjfzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                </div>
              </li>
              <li>
                <div class="name">县处级</div>
                <div class="content">
                    <div class="principal" @click="onClick('xcjzz')">
                        <span>正职</span>
                        <span v-if="data.dqzxcjzzpjnl||data.sybzxcjzzpjnl||data.zfxcjzzpjnl">{{`${(data.dqzxcjzzpjnl||data.sybzxcjzzpjnl||data.zfxcjzzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                    <div class="vice" @click="onClick('xcjfz')">
                        <span>副职</span>
                        <span v-if="data.dqzxcjfzpjnl||data.sybzxcjfzpjnl||data.zfxcjfzpjnl">{{`${(data.dqzxcjfzpjnl||data.sybzxcjfzpjnl||data.zfxcjfzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                </div>
              </li>
              <li>
                <div class="name">乡科级</div>
                <div class="content">
                    <div class="principal" @click="onClick('xkjzz')">
                        <span>正职</span>
                        <span v-if="data.dqzxkjzzpjnl||data.sybzxkjzzpjnl||data.zfxkjzzpjnl">{{`${(data.dqzxkjzzpjnl||data.sybzxkjzzpjnl||data.zfxkjzzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                    <div class="vice" @click="onClick('xkjfz')">
                        <span>副职</span>
                        <span v-if="data.dzqxkjfzpjnl||data.sybzxkjfzpjnl||data.zfxkjfzpjnl">{{`${(data.dzqxkjfzpjnl||data.sybzxkjfzpjnl||data.zfxkjfzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                </div>
              </li>
              <li>
                <div class="name">股级</div>
                <div class="content">
                    <div class="principal" @click="onClick('gjzz')">
                        <span>正职</span>
                        <span v-if="data.dzqgjzzpjnl||data.sybzgjzzpjnl||data.zfgjzzpjnl">{{`${(data.dzqgjzzpjnl||data.sybzgjzzpjnl||data.zfgjzzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                    <div class="vice" @click="onClick('gjfz')">
                        <span>副职</span>
                        <span v-if="data.dzqgjfzpjnl||data.sybzgjfzpjnl||data.zfgjfzpjnl">{{`${(data.dzqgjfzpjnl||data.sybzgjfzpjnl||data.zfgjfzpjnl).toFixed(2)}`}}</span>
                        <span v-else>0</span>
                    </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="body">
          <div class="left">
            <div v-if="dataList.length">
              <p>{{title}}排行</p>
              <div class="all-list" @click="showAges">
                全部列表
              </div>
            </div>
            <div>
              <ul v-if="dataList.length">
                <li v-for="(item,index) in dataList.filter((item,itemIndex)=>itemIndex+1<6)">
                  <span class="index">{{index+1}}</span>
                  <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
                    <template slot="title">
                      <span>{{item.name}}</span>
                    </template>
                    <span class="name">{{item.name}}</span>
                  </a-tooltip>
                  <span class="num">{{`${(item['_join0.jgpjnl']).toFixed(2)}`}}</span>
                </li>
              </ul>
              <ul v-if="dataList.length>5">
                <li v-for="(item, index) in dataList.filter((item,itemIndex)=>itemIndex+1>5)">
                  <span class="index">{{index}}</span>
                  <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
                    <template slot="title">
                      <span>{{item.name}}</span>
                    </template>
                    <span class="name">{{item.name}}</span>
                  </a-tooltip>
                  <span class="num">{{`${(item['_join0.jgpjnl']).toFixed(2)}`}}</span>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="right">
            <p>{{title}}机构排行(后十)</p>
            <div>
              <ul v-if="data.xzpjnlhsgdw||data.sypjnlhsgdw">
                <li v-for="item in JSON.parse(data.xzpjnlhsgdw||data.sypjnlhsgdw).filter((item)=>item.index<6)">
                  <span class="index">{{item.index}}</span>
                  <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
                    <template slot="title">
                      <span>{{item.orgname}}</span>
                    </template>
                    <span class="name">{{item.orgname}}</span>
                  </a-tooltip>
                  <span class="num">{{`${(item.avgage).toFixed(2)}`}}</span>
                </li>
              </ul>
              <ul v-if="data.xzpjnlhsgdw||data.sypjnlhsgdw">
                <li v-for="item in JSON.parse(data.xzpjnlhsgdw||data.sypjnlhsgdw).filter((item)=>item.index>5)">
                  <span class="index">{{item.index}}</span>
                  <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
                    <template slot="title">
                      <span>{{item.orgname}}</span>
                    </template>
                    <span class="name">{{item.orgname}}</span>
                  </a-tooltip>
                  <span class="num">{{`${(item.avgage).toFixed(2)}`}}</span>
                </li>
              </ul>
            </div>
          </div> -->
        </div>
      </div>
      <DialogBox v-model="showUser" :title="dialogTitle">
        <UserList
          :district="districtCode" 
          :jgtypes="complietype"
          :leaderpostlevel="leaderpostlevel"/>
      </DialogBox>
      <DialogBox v-model="showOrgs" :title="'平均年龄'">
        <OrgList :toFixed="true" :district="districtCode" :jgtypes="jgtypes" :displayField="'_id@organization.statistic.jgpjnl'"/>
      </DialogBox>
  </div>
</template>
<script>
import { Tooltip } from 'ant-design-vue';
import OrgList  from '../components/OrgList';
import UserList  from '../components/UserList';
import DialogBox from "../components/DialogBox";
import LcdFont from "../components/LcdFont";
import { includes } from 'lodash';
import { query } from "@/person/api/integratedquery";
import { showError } from "@/framework/utils/index";
import BaseMixin from './BaseMixin'

export default {
  mixins: [BaseMixin],
  components: {
    DialogBox,
    LcdFont,
    OrgList,
    UserList,
    ATooltip: Tooltip,
  },
  props: {
    districtCode: String,
    title: String,
    type: String,
    data: {
      type: Object,
      default: ()=> {
        return {}
      }
    },
    jgtype: {
      type: Array,
      default: ()=>{
        return []
      }
    },
  },
  data() {
    return {
      showUser: false,
      showOrgs: false,
      dataList: [],
      jgtypes: [],
      dialogTitle: undefined,
      leaderpostlevel: undefined,
    };
  },
  watch: {
    jgtype(val) {
      return val;
    },
    leaderpostlevels(val) {
      return val;
    }
  },
  computed: {
    // unittype() {
    //   let v = this.$store.getters.dict('usermanage.org.unittype');
    //   return v;
    // },
    leaderpostlevels() {
      let v = this.$store.getters.dict('usermanage.user.leaderpostlevel');
      return v;
    },
    params(){
      let query = {
        target: { id: 1, title: "组织" },
        fields: [
          { key: "name", showname: "机构名称" },
          { key: "orgcode", showname: "机构编码" },
          { key: "_id@organization.statistic.jgpjnl", showname: "机构平均年龄"},
        ],
        filter: { 
          op: 'and',
          criteria: [],
        },
        orders: [
          { orderby: '_id@organization.statistic.jgpjnl', ordertype: "Desc" }  
        ],
      }
      let criteria = [];
      if(this.districtCode){
        criteria.push({
          field: { key: "district", showname: "所在区划" },
          op: "in",
          value: this.matchCode(this.districtCode),
        })
      }
      if(this.jgtypes){
        criteria.push({
          field: { key: "jgtype", showname: "单位类型" },
          op: "in",
          value: this.jgtypes,
        })
      }
      query.filter.criteria = criteria;
      return query;
    },
    complietype(){
      if(this.type=='dz') {
        return ['a010101'];
      }else if(this.type=='zf') {
        return ['a010105'];
      }else if(this.type=='sy') {
        return ['a010103'];
      }
    },
  },
  mounted() {
    if(this.type&&this.params) {
      this.loadData();
    }
  },
  methods: {
    showAges() {
      this.showOrgs = true;
    },
    createJgtype() {
      let val = undefined;
      if(this.type=='zf') {
        val='政法';
      }else if(this.type=='sy') {
        val='事业';
      }else if(this.type=='dz') {
        val='党政';
      }
      let values = this.jgtype.filter((item)=>includes(item.text,val));
      this.jgtypes[0] = values[0].value;
    },
    
    onClick(type) {
      let v= this.leaderpostlevels.filter((item)=>item.key==type);
      if(type=='tjjzz') {
        this.dialogTitle = '厅级局正职人员列表';
      }else if(type=='tjjfz') {
        this.dialogTitle = '厅级局副职人员列表';
      }else if(type=='xcjzz') {
        this.dialogTitle = '县处级正职人员列表';
      }else if(type=='xcjfz') {
        this.dialogTitle = '县处级副职人员列表';
      }else if(type=='xkjzz') {
        this.dialogTitle = '乡科级正职人员列表';
      }else if(type=='xkjfz') {
        this.dialogTitle = '乡科级副职人员列表';
      }else if(type=='gjzz') {
        this.dialogTitle = '股级正职人员列表';
      }else if(type=='gjfz') {
        this.dialogTitle = '股级副职人员列表';
      }
      this.leaderpostlevel = v[0].value;
      this.showUser = true;
    },
    loadData() {
      this.createJgtype();
      query({...this.params,pagesize: 10, pagenum: 1}).then(({result})=>{
        this.dataList = result.rows;
      }).catch((err)=>{
        showError(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>
.detail-info {
  height: 90%;
  & > .header {
    text-align: center;
    margin-top: 75px;
    height: 145px;
    p.title {
      color: fade(#fff, 80%);
      font-size: 1.3em;
      font-weight: bold;
    }
    .orgs {
      ul {
        display: flex;
        justify-content: space-evenly;
        color: fade(#fff, 80%);
        li {
          display: flex;
          align-items: center;
          .name {
              margin-right: 30px;
          }
          .content {
            position: relative;
            &::before {
              content: '';
              position: absolute;
              left: -32px;
              height: 75px;
              width: 30px;
              background: url('../../../assets/img/screen/org-background.png') no-repeat;
              background-position: 100% 50%;
            }
            .principal, .vice {
              width: 140px;
              height: 32px;
              border-radius: @border-radius-base;
              padding: 0 @padding-xs;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #17324E;
              cursor: pointer;
              span:last-child {
                color: #02e7ef;
              }
            }
            .principal {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
  & .body {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .left, .right {
      // width: 48%;
      text-align: center;
      & > div {
        width: 612px;
        display: flex;
        justify-content: center;
        position: relative;
        p {
          color: fade(#fff, 80%);
          font-size: 1.4em;
          font-weight: bold;
        }
        .all-list {
          text-align: right;
          float: right;
          color: fade(#fff, 60%);
          letter-spacing:8px;
          font-weight: 700;
          font-size: 15px;
          position: absolute;
          top: 8px;
          right: -8px;
          cursor: pointer;
          &:hover{
            color: #fff;
            user-select: none;
          }
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding-left: @padding-sm;
        &:last-child {
          margin-left: 50px;
        }
        li {
          width: 100%;
          margin: 10px 0;
          display: flex;
          justify-content: flex-end;
          span {
            padding: 0 @padding-xs;
            display: inline-block;
            height: 32px;
          }
          span.index {
            width: 32px;
            padding: 0;
            line-height: 32px;
            margin-right: 2px;
            border-radius: @border-radius-base;
            text-align: center;
            font-weight: bold;
            color: #313B72;
            background: #978FFF;
          }
          span.name{
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            width: 185px;
            line-height: 32px;
            color: fade(#fff, 80%);
            background: #3A404F;
          }
          span.num {
            width: 50px;
            padding: 0;
            text-align: center;
            line-height: 32px;
            color: #02E7EF;
            background: #232B42;
            white-space: nowrap;
          }
        }
      }
    }
    .right ul li span.index {
      background: #FE7A2E;
    }
  }
}
</style>
