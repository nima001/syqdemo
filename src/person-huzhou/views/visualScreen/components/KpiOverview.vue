<template>
  <div class="kpi-overview">
    <div class="header inset-shadow">
      <div class="left">{{org && org.name}}</div>
      <div class="right">
        <div class="title">绩效得分</div>
        <div class="score">{{org && org.total}}</div>
      </div>
    </div>
    <div class="body">
      <ul>
        <li class="thead">
          <div>指标名称</div>
          <div>得分</div>
        </li>
        <li v-for="(item, index) in (org && org.overview)" :key="item.id">
          <div class="name">{{index+1}}. {{item.title}}</div>
          <div>{{item.score}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    org: Object,
  },
}
</script>
<style lang="less" scoped>
@supports(backdrop-filter: blur(30px)){
  .kpi-overview{
    backdrop-filter: blur(30px);
    &::before{
      content: none !important;
    }
  }
}
// @-moz-document url-prefix(){
//   .kpi-overview::before{
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     margin: -30px;
//     width: 480px;
//     height: 420px;
//     background: url('../../../assets/img/screen/test.jpg');
//     filter: blur(30px);
//   }
// }
.kpi-overview{
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  width: 420px;
  height: 360px;
  background-color: fade(#00FFEA, 8%);
  z-index: 10;
  color: fade(#fff, 95%);
  &::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/screen/overview-blur.png');
    background-size: 100% 100%;
    // margin: -35px;
    // filter: blur(30px);
  }
  & > .header{
    height: 76px;
    position: relative;
    display: flex;
    align-items: center;
    .left{
      flex: auto;
      width: 50%;
      font-size: 20px;
      font-weight: bold;
    }
    .right{
      flex: auto;
      width: 50%;
      // height: 100%;
      // background-color: fade(#000, 20%);
      .title{
        color: fade(#fff, 75%);
      }
      .score{
        font-size: 28px;
        line-height: 1.2em;
        font-weight: bold;
        color: #00FFEA;
      }
      &::before{
        content: ' ';
        position: absolute;
        height: 100%;
        width: 50%;
        top: 0;
        right: 0;
        background-color: fade(#000, 20%);
        z-index: -1;
      }
    }
  }
  & > .body{
    ul{
      margin: 10px 0;
    }
    li{
      display: flex;
      height: 42px;
      align-items: center;
      position: relative;
      &:not(.thead)::before{
        content: '';
        position: absolute;
        top: -5px;
        left: 0;
        width: 100%;
        height: 10px;
        background: url('../../../assets/img/screen/spliter.png') no-repeat;
        background-size: 100% auto;
        pointer-events: none;
      }
      & > div{
        flex: auto;
        width: 50%;
        text-align: center;
      }
      &.thead{
        color: fade(#fff, 75%);
        &::before{
          content: unset;
        }
      }
      .name{
        text-align: left;
        padding-left: 40px;
      }
    }

  }

  .inset-shadow{
    position: relative;
    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background: url('../../../assets/img/screen/radiance-small.png') no-repeat;
      background-size: 100% auto;
      pointer-events: none;
    }
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background: url('../../../assets/img/screen/radiance-small.png') no-repeat;
       background-size: 100% auto;
      transform: rotate(180deg);
      pointer-events: none;
    }
  }

}
</style>