<template>
  <div class="matters">
    <div class="header">
      <span class="title">业务详情</span>
    </div>
    <div class="content">
      <div class="view">
        <div class="top">
          <span class="title">综合业务</span>
          <ul class="dotlist">
            <li>
              <span class="dot"></span>
              <span class="text">空闲</span>
            </li>
            <li>
              <span class="dot last"></span>
              <span class="text">繁忙</span>
            </li>
          </ul>
        </div>
        <div class="middle">
          <div class="left">繁忙情况</div>
          <div class="right">
            <span
              v-for="(item,index) in itemClasslass"
              class="star-item"
              :key="index"
              :class="item"
            ></span>
          </div>
        </div>
        <div class="bottom">
          <div class="windows">
            <span class="name">窗口数</span>
            <span class="num">5</span>
          </div>
          <div class="windows">
            <span class="name">开窗数</span>
            <span class="num">5</span>
          </div>
        </div>
        <ul class="footer">
          <li v-for="(item,index) in list" :key="index">
            <span class="left">{{item.name}}</span>
            <span class="right">{{item.value}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: 3.5,
      list: [
        { name: "今日办件数", value: 124 },
        { name: "平均办理时长", value: "00:15:43" },
        { name: "平均等候时长", value: "00:08:15" },
        { name: "当前等候人数", value: 7 }
      ]
    };
  },
  computed: {
    itemClasslass() {
      const lengths = 5;
      const starOn = "on";
      const starHalf = "half";
      const starOff = "off";
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let starhalf = score % 1 != 0 ? true : false;
      let fullstar = Math.floor(score);
      for (var i = 0; i < fullstar; i++) {
        result.push(starOn);
      }
      if (starhalf) {
        result.push(starHalf);
      }
      if (result.length < lengths) {
        var offstar = lengths - result.length;
        for (var i = 0; i < offstar; i++) {
          result.push(starOff);
        }
      }
      return result.slice(0, 5);
    }
  }
};
</script>
<style lang='less' scoped>
.matters {
  width: 100%;
  height: 525px;
  background: url("../../assets/img/right-block.png") no-repeat top center;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 44px;
    display: flex;
    padding: 0px 16px;
    .title {
      font-size: 18px;
      line-height: 44px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      opacity: 0.8;
    }
  }
  .content {
    flex: 1;
    min-height: 0px;
    padding-top: 20px;
    .view {
      height: 100%;
      padding: 17px 20px 0px;
      .top {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
        }
        .dotlist {
          display: flex;
          align-items: center;
          margin: 0px;
          li {
            display: flex;
            align-items: center;
            &:last-child {
              margin-left: 32px;
            }
            .dot {
              width: 8px;
              height: 8px;
              background: #2bffff;
              border-radius: 50%;
              opacity: 1;
              &.last {
                background: #f8a700;
              }
            }
            .text {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 16px;
              color: #ffffff;
              opacity: 0.6;
              margin-left: 4px;
            }
          }
        }
      }
      .middle {
        width: 100%;
        height: 45px;
        background: linear-gradient(
          270deg,
          rgba(96, 144, 206, 0.2) 0%,
          #214bac 100%
        );
        opacity: 1;
        margin-top: 15px;
        padding: 0px 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.8;
          line-height: 45px;
        }
        .right {
          width: 100px;
          height: 37px;
          background: url("../../assets/img/busy.png") no-repeat center center;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0px 5px;
          .star-item {
            width: 10px;
            height: 24px;
            &.on {
              background: url("../../assets/img/on.png") no-repeat center center;
            }
            &.half {
              background: url("../../assets/img/half.png") no-repeat center
                center;
            }
            &.off {
              background: url("../../assets/img/off.png") no-repeat center
                center;
            }
          }
        }
      }
      .bottom {
        width: 100%;
        height: 86px;
        display: flex;
        justify-content: space-between;
        margin-top: 42px;
        .windows {
          width: 158px;
          height: 86px;
          background: url("../../assets/img/window.png") no-repeat center center;
          position: relative;
          span {
            display: block;
            position: absolute;
            width: 62px;
            text-align: center;
            &.name {
              height: 22px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 21px;
              color: #ffffff;
              opacity: 0.6;
              right: 0px;
              top: 4px;
            }
            &.num {
              height: 33px;
              font-size: 24px;
              font-family: D-DINExp;
              font-weight: normal;
              color: #4bf3f9;
              opacity: 1;
              right: 0px;
              bottom: 18px;
            }
          }
        }
      }
      .footer {
        margin: 0px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 37px;
          margin-top: 10px;
          &:first-child {
            margin-top: 0px;
          }
          .left {
            width: 134px;
            height: 37px;
            line-height: 37px;
            background: rgba(3, 12, 23, 0.8);
            padding-left: 16px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffffcc;
          }
          .right {
            width: 156px;
            height: 37px;
            background: rgba(110, 255, 253, 0.16);
            font-size: 24px;
            font-family: D-DINExp;
            font-weight: 400;
            line-height: 37px;
            color: #2BFFFF;
            opacity: 1;
            padding-left: 16px;
          }
        }
      }
    }
  }
}
</style>