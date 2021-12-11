<template>
  <div :style="{position:'relative'}">
      <div class="container" v-if="data&&data.length==2">
        <div class="ring" v-for="item in data">
          <RingChart
            :data="item"
            :settings="{
              canvas: { height: 400 },
              padding: [-90, 0, 0, -50],
              radius: 0.5,
              innerRadius: 0.8,
              tooltip: {
                visible: true,
              },
              gemo: {
                color: [
                  '#F2A54D',
                  '#60B4F5',
                  '#F84848',
                  '#DF6EA3',
                  '#6EDF75',
                  '#A66DF5',
                  '#C3F1CE',
                  '#A0A4F5',
                ]
              },
              infoText: {
                title: item.rows[0].k0,
                offsetY: -20,
                style: { fontSize: 18, fill: '#fff', textAlign: 'center' },
              },
              contentStyle: {
                offsetY: 10,
                fontSize: 25,
                fill: '#fff',
                textAlign: 'center',
              },
            }"
          >
            <template v-slot:customLegend="props">
              <div class="legend">
                <p class="title">{{ title }}{{item.name}}</p>
                <ul>
                  <li v-for="(row, index) in item.rows" @click="showUserList(title,item.name,row)">
                    <span class="left">
                      <span :style="{ background: props[index] }" class="spot"></span>
                      <span>{{ row.k0 }}</span>
                    </span>
                    <span>{{ row.v0||0 }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </RingChart>
        </div>
      </div>
      <DialogBox v-model="showList" :title="'人员列表'">
        <UserList 
          :district="districtCode" 
          :jgtypes="complietype" 
          :age="age" 
          :ageop="ageop" 
          :filter="filter" 
          :education="education" 
          :leaderpostlevel="leaderpostlevel"/>
      </DialogBox>
  </div>
</template>
<script>
import DialogBox from "../components/DialogBox";
import UserList from "./UserList";
import RingChart from "@person/components/chart/RingChart";
import { includes } from 'lodash';

export default {
  components: {
    DialogBox,
    RingChart,
    UserList,
  },
  props: {
    districtCode: String,
    showChart: Boolean,
    title: String,
    type: String,
    dataList: {
      type: Array,
    },
  },
  data() {
    return {
      data: undefined,
      showList: false,
      age: undefined,
      ageop: undefined,
      filter: [],
      education: undefined,
      leaderpostlevel: undefined,
    };
  },
  computed: {
    leaderpostlevels() {
      let v = this.$store.getters.dict('usermanage.user.leaderpostlevel');
      return v;
    },
    // unittype() {
    //   let v = this.$store.getters.dict('usermanage.org.unittype');
    //   return v;
    // },
    educations() {
      let v = this.$store.getters.dict('usermanage.user.education');
      return v;
    },
    complietype(){
      if(this.type=='dz') {
        return ['a010101'];
      }else if(this.type=='zf') {
        return ['a010105'];
      }else if(this.type=='sy') {
        return ['a010103'];
      }
    }
  },
  watch: {
    leaderpostlevels(val) {
      return val;
    },
    educations(val) {
      return val;
    },
    districtCode(val) {
      return val;
    },
    dataList(val) {
      this.data = val;
    },
  },
  mounted() {
    this.showList = false;
  },
  methods: {
    createAge(age) {
      let op = undefined;
      let value = undefined;
      let filter = undefined;
      if(includes(age,'岁及以上')) {
        op = 'gte';
        value = (age).split('岁及以上')[0];
      }else if(includes(age,'-')) {
        op = 'between';
        let string = (age).split('岁')[0];
        // value = [string.split('-')[0], string.split('-')[1]];
        filter = [
          {
            field: { key: "age", showname: "年龄" },
            op: 'gte',
            value: string.split('-')[0],
          },
          {
            field: { key: "age", showname: "年龄" },
            op: 'lte',
            value: string.split('-')[1],
          }
        ];
      }else if(includes(age,'岁及以下')) {
        op = 'lte';
        value = (age).split('岁及以下')[0];
      }
      return {
        op, value, filter
      }
    },
    showUserList(title, type, row) {//条件=顶部标题的 年龄/学历 + 点击项（年龄/学历）+ 单位类型
      let filter = {};
      if(type == '年龄分布'){
        filter = this.createAge(row.k0);
      }else if(includes(title, '岁')){
        filter = this.createAge(title);
      }
      this.ageop = filter.op;
      this.age = filter.value;
      this.filter = filter.filter;

      let eduText = type == '学历分布' ? row.k0 : title;//FIXME 非学历维度匹配
      let edu = this.educations.find((item)=>item.text==eduText);
      this.education = edu && edu.value;

      if(type == '职务层次分布'){
        let leaders = this.leaderpostlevels.filter((item)=>item.text==row.k0);
        if(leaders.length) {
          this.leaderpostlevel = leaders[0].value;
        }else{
          this.leaderpostlevel = undefined;
        }
      }else{
        this.leaderpostlevel = undefined;
      }
      this.showList = true;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .ring {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    /deep/.ring-chart {
      // height: 300px;
      .chart {
        width: 60%;
        position: relative;
        top: 50%;
        &::before {
          content: "";
          background: #242b5b;
          position: absolute;
          width: 230px;
          height: 230px;
          left: 9.5%;
          top: 7.5%;
          border-radius: 50%;
        }
      }
    }
    .title {
      margin-bottom: 20px;
      font-size: 1.4em;
      font-weight: 600;
    }
    .legend {
      width: 50%;
      height: 500px;
      padding: @padding-lg;
      text-align: left;
      position: absolute;
      top: 15%;
      left: 45%;
      color: fade(#fff, 80%);
      display: flex;
      flex-direction: column;
      .title {
        text-align: center;
        position: relative;
        left: -50%;
      }
      ul {
        width: 100%;
        height: 500px;
        padding: @padding-md @padding-xs @padding-md 50px;
        margin: 0;
        margin-left: auto;
        background: url("../../../assets/img/screen/age-education-bg.png") no-repeat;
        background-size: cover;
        overflow-y: scroll;
        li {
          width: 100%;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.2em;
          cursor: pointer;
          user-select: none;
          .left {
            width: 70%;
            margin-right: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .spot {
              width: 10px;
              height: 10px;
              margin-right: 10px;
              border-radius: @border-radius-base;
              display: inline-block;
            }
          }
          &:hover {
            color: #fff;
          }
          span:last-child {
            text-align: right;
          }
          & > span:last-child {
            color: #02e7ef;
          }
        }
      }
    }
  }
}
</style>
