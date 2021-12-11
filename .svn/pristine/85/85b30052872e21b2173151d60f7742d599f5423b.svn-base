<template>
  <div class="realcount">
    <a-spin :spinning="spinning" :delay="300">
      <a-card :bordered="false" :bodyStyle="{padding: '10px', borderRadius: '3px'}">
        <ul class="titleBar">
          <template v-if="org && org.unittype == 2">
            <!-- <li style="margin-right: 4em;">
              <span>单位类型：</span>
              <span class="val">{{unittypeText}}</span>
            </li> -->
            <li>
              <span>机构级别：</span>
              <span class="val">{{politicallevelText}}</span>
            </li>
            <li @click="showList('sy')" class="showon">
              <span>编制数/实有数：</span>
              <span class="val">{{count.dwzzbz || 0}}/{{bzSyNum || 0}}</span>
            </li>
            <li>
              <span>可用编制数：</span>
              <span class="val">{{bzUseable}}</span>
            </li>
            <li @click="showList('txrs')" class="showon">
              <span>近三年预计退休数：</span>
              <span class="val">{{count.txrs || 0}}</span>
            </li>
          </template>
          <template v-else-if="org && org.unittype == 3">
            <!-- <li style="margin-right: 2em;">
              <span>单位类型：</span>
              <span class="val">{{unittypeText}}</span>
            </li> -->
            <li>
              <span>机构级别：</span>
              <span class="val">{{politicallevelText}}</span>
            </li>
            <li>
              <span>经费形式：</span>
              <span class="val">{{fundformText}}</span>
            </li>
            <li @click="showList('sy')" class="showon">
              <span>编制数/实有数：</span>
              <span class="val">{{count.dwzzbz || 0}}/{{bzSyNum || 0}}</span>
            </li>
            <li>
              <span>可用编制数：</span>
              <span class="val">{{bzUseable}}</span>
            </li>
            <li @click="showList('txrs')" class="showon">
              <span>近三年预计退休数：</span>
              <span class="val">{{count.txrs || 0}}</span>
            </li>
          </template>
          <template v-else>
             <!-- <li>
              <span>单位类型：</span>
              <span class="val">{{unittypeText}}</span>
            </li> -->
            <li>
              <span>机构级别：</span>
              <span class="val">{{politicallevelText}}</span>
            </li>
            <li @click="showList('sy')" class="showon">
              <span>编制数/实有数：</span>
              <span class="val">{{count.dwzzbz || 0}}/{{bzSyNum || 0}}</span>
            </li>
            <li>
              <span>可用编制数：</span>
              <span class="val">{{bzUseable}}</span>
            </li>
            <li @click="showList('gqbz_sy')" class="showon">
              <span>工勤编制数/实有数：</span>
              <span class="val">{{count.gqbz || 0}}/{{count.gqbz_sy || 0}}</span>
            </li>
            <li @click="showList('txrs')" class="showon">
              <span>近三年预计退休数：</span>
              <span class="val">{{count.txrs || 0}}</span>
            </li>
          </template>
          <li @click="showList('bwry_sy')" class="showon">
            <span>编外管控数/实有数：</span>
            <span class="val">{{count.berykzs || 0}}/{{count.bwry_sy || 0}}</span>
          </li>
          <li>
            <span>计划数：</span>
            <span class="val">{{count.bz_plan||0}}/{{bw||0}}</span>
          </li>
          <li @click="showList('dwld_sy')" class="showon" style="clear:left">
            <span>单位领导职数/实有数：</span>
            <span class="val">{{count.dwldzs || 0}}/{{count.dwld_sy || 0}}</span>
          </li>
          <li @click="showList('nsjgldcj_sy')" class="showon">
            <span>内设机构领导(处级)职数/实有数：</span>
            <span class="val">{{count.nsjgldcj || 0}}/{{count.nsjgldcj_sy || 0}}</span>
          </li>
          <li @click="showList('qtcjld_sy')" class="showon">
            <span>其它处级领导职数/实有数：</span>
            <span class="val">{{count.qtcjld || 0}}/{{count.qtcjld_sy || 0}}</span>
          </li>
          <li @click="showList('zcld_kj_sy')" class="showon">
            <span>中层领导(科级)职数/实有数：</span>
            <span class="val">{{count.zcldkjzs || 0}}/{{count.zcld_kj_sy || 0}}</span>
          </li>
        </ul>
        <div class="count-btn">
          <a @click="getStatisinfo(true)">刷新</a>
          <router-link :to="{ name: 'orgRealTable' }">一览表</router-link>
        </div>
      </a-card>
    </a-spin>
    <user-list :visible="visible" :orgid="org._id" :code="code" @cancel="visible=false" />
  </div>
</template>
<script>
import { Spin, Card, Row, Col } from 'ant-design-vue';
import UserList from "./UserList";
import { getstatisinfo,refreshStatisinfo } from "@/person/api/org";
import { PlanHistoryBw } from '@/person/api/orgQuotaPlan';
import { loopTaskResult, stopLoopTask } from "@/framework/api/asynctask";
import { showError } from "@/framework/utils/index";

export default {
  props: ['org'],
  components: {
    ASpin:Spin,
    ACard:Card,
    ARow: Row,
    ACol: Col,
    UserList
  },
  data() {
    return {
      bw: undefined,
      spinning: false,
      visible: false,
      code: null,
      count: {},
      taskid: undefined,
      page: {
        pagenum:1,
        pagesize:10,
      }
    };
  },
  created() {
    this.getStatisinfo(false);
  },
  destroyed(){
    if(this.taskid){
      stopLoopTask(this.taskid);
    }
  },
  watch: {
    org() {
      this.getStatisinfo(false);
    }
  },
  computed:{
    unittypeText(){
      if(this.org){
        let v = this.$store.getters.dictKey('usermanage.org.unittype', this.org.unittype)
        return v && v.text;
      }
    },
    politicallevelText(){
      if(this.org){
        let v = this.$store.getters.dictKey('usermanage.org.politicallevel', this.org.politicallevel)
        return v && v.text;
      }
    },
    fundformText(){
      if(this.org){
        let v = this.$store.getters.dictKey('usermanage.org.fundform', this.org.fundform)
        return v && v.text;
      }
    },
    institutionssortText(){
      if(this.org){
        let v = this.$store.getters.dictKey('usermanage.org.institutionssort', this.org.institutionssort)
        return v && v.text;
      }
    },
    bzUseable(){
      let xzbzs = Number(this.count.xzbzs) || 0
        , sy = Number(this.count.sy ) || 0
        , cg = Number(this.count.cg ) || 0
        , xizbz_sy= Number(this.count.xizbz_sy) || 0
        , sy_sy = Number(this.count.sy_sy) || 0
        , cg_sy = Number(this.count.cg_sy) || 0
        , bz_plan = Number(this.count.bz_plan) || 0;
      return Math.max(xzbzs + sy + cg - xizbz_sy - sy_sy - cg_sy - bz_plan, 0);
    },
    bzNum(){
      let text = '';
      [
        "dzqxzbz", 
        "jjjcxzbz", 
        "gabz", 
        "sfbz", 
        "jcybz", 
        "fybz",
        "czzxbz", 
        "wjsbz", 
        "gssbz", 
        "slgabz", 
        "xzbz", 
        "cg", 
        "sy", 
        "ba"
      ].forEach(code => {
        let value = this.count[code];
        if(value){
          text += '+' + value;
        }
      });
      return text && text.substr(1);
    },
    bzSyNum(){
      let text = '';
      [
        "dzqxzbz_sy", //党政群行政编制实有数
        "jjjcxzbz_sy", //纪检监察行政编制实有数
        "gabz_sy", //公安编制实有数
        "sfbz_sy", //司法编制实有数
        "jcybz_sy", //检察院编制实有数
        "fybz_sy", //法院编制实有数
        "czzxbz_sy", //财政专项编制实有数
        "wjsbz_sy", //物价所编制实有数
        "gssbz_sy", //工商所编制实有数
        "slgabz_sy", //森林公安编制实有数
        "xzbz_sy", //乡镇编制实有数
        "cg_sy", //参公编制实有数
        "sy_sy", //事业编制实有数
        "ba_sy" //备案编制实有数
      ].forEach(code => {
        let value = this.count[code];
        if(value){
          text += '+' + value;
        }
      });
      return text && text.substr(1);
    }
  },
  methods: {
    showList(code) {
      if (code == "sy") {
        if (this.org.unittype == 1 || this.org.unittype == 5) {
          this.code = "xizbz_sy";
        } else {
          this.code = "dw_sy";
        }
      } else {
        this.code = code;
      }
      this.visible = true;
    },
    planHistory(orgid) {
      PlanHistoryBw({
        ...this.page,
        needtotal: true,
        orgid: orgid,
        year: '2021'
      })
      .then(({result}) => {
        let total = result.sum?result.sum.total:0;
        let used = result.sum?result.sum.used:0;
        let recycle = result.sum?result.sum.recycle:0;
        this.bw = total - used - recycle;
      })
      .catch(err => {
        showError(err);
      })
    },
    getStatisinfo(refresh) {
      if(this.org){
        let {_id, unittype} = this.org;
        if (_id && unittype && unittype != 9) {
          if(this.taskid){
            stopLoopTask(this.taskid);
            this.taskid = undefined;
          }
          if(refresh){
            this.refresh(_id)
          }else{
            this.spinning = true;
            getstatisinfo(_id).then(({result}) => {
              this.planHistory(_id);
              this.spinning = false;
              this.count = result;
            }).catch(err => {
              this.spinning = false;
              this.count = {};
              if(err.code != 'notfound'){
                showError(err);
              }
            });
          }
        }
      }
    },
    async refresh(orgid){
      this.spinning = true;
      try {
        let {result} = await refreshStatisinfo(orgid);
        this.taskid = result;
        let data = await loopTaskResult(result);
        this.count = data;  
        this.spinning = false;
        this.taskid = undefined;
      } catch (error) {
        if(error !== 'canceled'){
          showError(error);
          this.spinning = false;
          this.taskid = undefined;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.realcount{
  /deep/.ant-card .ant-card-body{
    display: flex;
    justify-content: space-between;
    .titleBar {
      width: 95%;
      margin: 0;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 370px;
        float: left;
        line-height: 1.6em;
        white-space: nowrap;
        span{
          color: @black;
        }
        .val{
          display: inline-block;
          min-width: 3em;
        }
      }
      @media screen and (max-width: 1600px) {
        li {
          width: 300px;
        }
      }
      .showon {
        cursor: pointer;
        &:hover {
          span {
            color: @primary-color;
          }
        }
      }
    }
    .count-btn {
      flex: 1;
      float: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      a {
        float: right;
      }
      br{
        height: 0;
      }
      // position: absolute;
      // right: 10px;
      // top: 10px;
      // text-align: right;
      // line-height: 1.6em;
    }
  }
}
</style>