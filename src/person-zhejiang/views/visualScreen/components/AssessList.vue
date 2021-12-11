<template>
  <div class="content">
    <horn/>
    <div class="title">省属事业单位机构编制质效评估</div>
    <div class="jgname">
      <span>浙江省农业农村厅</span>
    </div>
    <div class="list">
      <FractionList :data="list" />
    </div>
    <div class="bottom" @click="()=>$router.go(-1)">
      <img src="../../../assets/img/screen/icon-go-prev.png" />
      <span>返回上一级</span>
    </div>
  </div>
</template>

<script>
import FractionList from "./FractionList";
import horn from "./horn";
export default {
  components: {
    horn,
    FractionList,
  },
  data() {
    return {
      list: [
        { name: "浙江省农业农村生态与能源总站", fraction: 84 },
        { name: "浙江省国有农场管理总站", fraction: 87 },
        { name: "浙江省土地质量与肥料管理总站", fraction: 87 },
        { name: "浙江省农业农村大数据发展中心", fraction: 83 },
        { name: "浙江省畜牧技术推广与种畜检测总站", fraction: 88 },
        { name: "浙江省农业广播电视学校", fraction: 80 },
        { name: "浙江省农业农村项目服务中心", fraction: 82 },
        { name: "浙江省种子管理总站", fraction: 87 },
        { name: "浙江省农业技术推广中心", fraction: 82 },
        { name: "浙江省农业农村宣传中心", fraction: 82 },
        { name: "浙江省动物疫情预防控制中心", fraction: 88 },
        { name: "浙江省淡水水产研究所", fraction: 89 },
        { name: "浙江省海洋水产养殖研究所", fraction: 81 },
        { name: "浙江省畜牧农机发展中心", fraction: 84 },
        { name: "浙江省海洋维权巡航执法基地", fraction: 87 },
        { name: "浙江省海洋与渔业执法总队", fraction: 86 },
        { name: "浙江省水产技术推广总站", fraction: 89 },
        { name: "浙江省植保检疫与农药管理总站", fraction: 83 },
        { name: "浙江省农业对外合作中心", fraction: 86 },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  border: 1px solid #0c336d;
  background: fade(#0245A1, 10%);
  display: flex;
  flex-direction: column;
  position: relative;
  .title {
    height: 10%;
    font-size: 35px;
    font-weight: bold;
    font-family: cursive;
    color: #fff;
    text-shadow: 0 0 8px #1169A2;
    text-align: center;
    overflow: hidden;
    background: url('../../../assets/img/screen/assess-halo-bg.png') no-repeat;
    background-position: top;
  }
  .jgname {
    height: 8%;
    padding-left: 40px;
    color: #7ee2f7;
    font-size: 16px;
    font-weight: 520;
    display: flex;
    align-items: flex-start;
    position: relative;
    &::before {
      width: 30px;
      height: 30px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-10%);
      background: url("../../../assets/img/screen/icon-title.png") no-repeat;
      background-size: 50%;
      background-position: 100%;
    }
  }
  .list {
    flex: auto;
    width: 90%;
    margin-left: auto;
  }
  .bottom {
    padding: 0 @padding-lg;
    margin-bottom: @padding-sm;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    cursor: pointer;
    span {
      margin-left: @padding-sm;
      color: #208cfb;
    }
  }
}
</style>
