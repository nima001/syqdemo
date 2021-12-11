<template>
  <div class="details">
    <ul>
      <li v-for="(item, index) in data.filter((item, index)=>index<10)" @click="()=>$router.push('/person/screen/assessment/detail')">
        <span class="index">{{ index + 1 }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="fraction">
          <span>{{ item.fraction }}</span>
          <span>分</span>
        </span>
      </li>
    </ul>
    <ul>
      <li :class="{'error': index==7}" v-for="(item, index) in data.filter((item, index)=>index>9)" @click="()=>$router.push('/person/screen/assessment/detail')">
        <span class="index">{{ index + 11 }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="fraction">
          <span>{{ item.fraction }}</span>
          <span>分</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.details {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  ul {
    width: 50%;
    li {
      width: 95%;
      display: flex;
      align-items: center;
      background: url('../../../assets/img/screen/icon-list-bg.png') no-repeat;
      background-size: 70% 66%;
      background-position: 0 35%;
      cursor: pointer;
      span {
        font-size: 18px;
        &.index {
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin-bottom: 20px;
          text-align: center;
          display: inline-block;
          font-weight: bold;
          color: #fff;
          position: relative;
          z-index: 1;
          background: url('../../../assets/img/screen/icon-index-bg.png') no-repeat;
          background-size: 100% 100%;
        }
        &.name {
          margin-left: 10px;
          font-size: 15px;
          color: #c9c12e;
        }
        &.fraction {
          margin-left: auto;
          background-image: linear-gradient(to bottom, #D1D1DA, #E6E6D4, #E3E59D, #D0D48E); //背景色渐变，默认从上到下
          -webkit-background-clip: text; //CSS3属性：设定背景的绘制范围为文字
          color: transparent; //将字的颜色设置透明，只露出背景色
          span:first-child {
            font-size: 18px;
            font-family: math;
          }
          span:last-child {
            font-size: 15px;
            transform: translateX(-15%);
          }
        }
      }
      &.error span.name{
        color: #C0263B;
      }
    }
  }
}
</style>
