<template>
  <div class="wrap">
    <div class="cell">
      <p class="title">机构编制事项调整</p>
      <div class="table">
        <loading v-if="loading"/>
        <template v-else>
          <div class="tHeader">
            <span></span>
            <span>{{keyCols[0] &&keyCols[0]['showname']}}</span>
            <span>{{keyCols[1] &&keyCols[1]['showname']}}</span>
          </div>
          <ul class="tBody">
            <li v-for="(item,index) in list" :key="index" @click="lookup(item)">
              <span>{{item.name}}</span>
              <span>{{item.v1}}</span>
              <span>{{item.v2}}</span>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <dialog-box v-model="changeLookup.show" title="调整机构列表">
      <div class="detail-info">
        <div class="tabs">
          <div class="tabs-wrapper">
            <ul>
              <li v-for="(item, index) in changeLookup.list" :key="index" :class="{active: index == changeLookup.active}" @click="changeLookup.active = index">
                  <span>{{item.settings.name}}</span>
                </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <table class="body" v-if="table">
            <thead>
              <tr>
                <td v-for="(col, index) in table.valueCols" :key="index" :class="{name: !index, tag: !index}">{{col.showname}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in table.rows" :key="item.id" :class="{odd: index%2 != 1}">
                <td v-for="(col, i) in table.valueCols" :key="i" :class="{name: !i}">{{item[col.column]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </dialog-box>
  </div>
</template>
<script>
import { orgDistrChange, orgDistrChangeLookup } from "@/person-shaoxing/api/monitor";
import { showError } from "@/framework/utils/index";
import SplitLine from '../components/SplitLine';
import DialogBox from '../components/DialogBox';
import Loading from "../components/Loading";
export default {
  components: { SplitLine, DialogBox,Loading },
  data() {
    return {
      list: [],
      keyCols: [],
      loading:true,
      changeLookup: {
        show: false,
        active: 0, 
        list: []
      }
    };
  },
  computed: {
    table(){
      let { list , active } = this.changeLookup;
      let data = list[active];
      return data && data.data;
    },
  },
  mounted() {
    this.orgMattersChange();
  },
  methods: {
    lookup(item){
      this.changeLookup = { show: true, active: 0, list: [] };
      orgDistrChangeLookup(1, item.key).then(({result}) => {
        this.changeLookup.list = result;
      }).catch(error => {
        showError(error)
      })
    },
    // 机构编制事项调整
    orgMattersChange() {
      orgDistrChange(1)
        .then(res => {
          let { keyCols, rows, valueCols } = res.result.data;
          this.keyCols = keyCols;
          this.loading = false;
          this.list = valueCols.map(item => {
            return {
              name: item.showname,
              key: item.key,
              v1: rows[0][item["column"]],
              v2: rows[1][item["column"]]
            };
          });
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.wrap {
  .cell {
    .title {
      height: 26px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 26px;
      color: #FFF;
      opacity: 0.8;
      margin: 0px;
    }
    .table {
      margin-top: 8px;
      height: 235px;
      position: relative;
      .tHeader {
        width: 301px;
        height: 37px;
        background: linear-gradient(
          90deg,
          #417edc 0%,
          rgba(8, 126, 127, 0) 100%
        );
        opacity: 0.6;
        position: relative;
        display: flex;
        align-items: center;
        &::before {
          width: 2px;
          height: 37px;
          content: "";
          background: #0ffcfe;
          opacity: 0.6;
          position: absolute;
          left: 0px;
          top: 0px;
        }
        span {
          flex: 1;
          text-align: center;
          height: 21px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: #ffffff;
          opacity: 0.8;
        }
      }
      .tBody {
        padding: 12px 0px;
        margin: 0;
        li {
          display: flex;
          height: 29px;
          align-items: center;
          cursor: pointer;
          &:nth-child(odd) {
            background: url("../img/warn-dote.png") repeat;
          }
          &:hover{
            background: url("../img/dote.png") repeat;
          }
          span {
            flex: 1;
            height: 21px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 21px;
            color: #ffffff;
            opacity: 0.8;
            text-align: center;
            &:first-child {
              text-align: left;
              padding-left: 9px;
            }
          }
        }
      }
    }
  }
}
.detail-info{
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  font-size: 16px;
  & > .tabs{
    flex: none;
    background: linear-gradient(to right, rgba(78, 120, 244, .24), rgba(143, 248, 255, .24));
    height: 74px;
    .tabs-wrapper{
      height: 100%;
      background: url('../img/tab-bg.png') no-repeat;
    }
    ul{
      margin: 0;
      overflow: hidden;
    }
    li{
      float: left;
      min-width: 120px;
      padding: 0 24px;
      margin-left: 20px;
      color: fade(#FFF, 80%);
      font-weight: bold;
      font-size: 1.1em;
      line-height: 74px;
      text-align: center;
      cursor: pointer;
      &:hover{
        color: #FFF;
      }
      &.active{
        background: url('../img/tab-active-bg.png') no-repeat center center;
        color: #FFF;
      }
    }
  }
  & > .content{
    flex: auto;
    min-height: 1px;
    overflow-y: auto;
    .body{
      width: 100%;
      margin-top: 20px;
      table-layout: fixed;
      font-size: 16px;
      color: #fff;
      line-height: 30px;
      thead{
        background: linear-gradient(to right, rgba(65, 126, 220, .6), rgba(8, 126, 127, .06));
        padding-bottom: 10px;
        .tag{
          border-left: 2px solid #2a89c4;
        }
      } 
      td{
        padding: 5px 8px;
        text-align: center;
        &.name{
          width: 380px;
          text-align: left;
          text-indent: 20px;
        }
      }
      & .odd{
        background-color: #111c31;
      }
    }
  }
}
</style>