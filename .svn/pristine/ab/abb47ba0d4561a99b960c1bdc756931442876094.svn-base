<template>
  <div class="view">
    <ul class="list">
      <li v-for="(arr,index) in arrList" :key="index" :class="{firstrow:index ==0}">
        <div class="cell" v-for="(item,lk) in arr" :key="lk">
          <span>{{item.name}}</span>
          <span>{{item.num}}</span>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <span class="pre"></span>
      <div class="page">
        <span class="pagenum">1</span>
        <span class="total">&nbsp;/&nbsp;2</span>
      </div>
      <span class="next"></span>
    </div>
  </div>
</template>
<script>
import { chunk } from "lodash";
export default {
  components: {},
  data() {
    return {
      list: [
        { name: "医保综合", num: "00:15:43" },
        { name: "医保综合", num: "00:12:43" },
        { name: "社保综合", num: "00:15:43" },
        { name: "社保综合", num: "00:12:43" },
        { name: "公积金综合", num: "00:15:43" },
        { name: "公积金综合", num: "00:12:43" },
        { name: "综合业务", num: "00:15:43" },
        { name: "综合业务", num: "00:12:43" },
        { name: "查询", num: "00:15:43" },
        { name: "查询", num: "00:12:43" },
        { name: "公安户籍", num: "00:15:43" },
        { name: "公安户籍", num: "00:12:43" },
        { name: "一手房", num: "00:15:43" },
        { name: "一手房", num: "00:12:43" },
        { name: "天然气", num: "00:15:43" },
        { name: "天然气", num: "00:12:43" },
        { name: "供电", num: "00:15:43" },
        { name: "供电", num: "00:12:43" },
        { name: "供水", num: "00:15:43" },
        { name: "供水", num: "00:12:43" },
        { name: "其他业务", num: "00:15:43" },
        { name: "其他业务", num: "00:12:43" }
      ]
    };
  },
  computed: {
    arrList() {
      return chunk(
        [
          { name: "业务名称", num: "平均办理时长" },
          { name: "业务名称", num: "平均办理时长" },
          ...this.list
        ],
        2
      );
    }
  }
};
</script>
<style lang='less' scoped>
.view {
  padding-top: 50px;
  .list {
    width: 100%;
    padding: 0px 18px;
    margin: 0px;
    li {
      width: 100%;
      display: flex;
      &:nth-child(even) {
        .cell {
          background: rgba(110, 255, 253, 0.2);
        }
      }
      &.firstrow {
        .cell {
          span {
            opacity: 1;
          }
        }
      }
      .cell {
        flex: 1;
        height: 37px;
        line-height: 37px;
        display: flex;
        justify-content: space-between;
        padding: 0px 24px;
        &:nth-child(even) {
          margin-left: 44px;
        }
        span {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.6;
          &:first-child {
            flex: 1;
          }
          &:last-child {
            width: 150px;
            text-align: center;
          }
        }
      }
    }
  }
  .pagination {
    width: 146px;
    height: 43px;
    background: url("../../assets/img/page.png") no-repeat center center;
    margin: 24px auto 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .pre {
      width: 8px;
      height: 21px;
      background: url("../../assets/img/step.png") no-repeat center center;
      cursor: pointer;
      transform: rotate(180deg);
    }
    .page {
      width: 60px;
      display: flex;
      justify-content: center;
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
        text-stroke: 1 rgba(0, 0, 0, 0);
        &.pagenum {
          opacity: 1;
        }
        &.total {
          opacity: 0.6;
        }
      }
    }
    .next {
      width: 8px;
      height: 21px;
      background: url("../../assets/img/step.png") no-repeat center center;
      cursor: pointer;
    }
  }
}
</style>