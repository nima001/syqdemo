<template>
  <ScreenPane :width="1440" :height="900" >
    <div class="screen-wrapper">
      <Header class="header"/>
      <div class="body">
        <div class="left">
          <div class="header">机构质效</div>
          <div class="body">
            <div class="left">
              <KpiRank class="top"/>
              <KpiVariation class="middle"/>
              <KpiVeto class="bottom"/>
            </div>
            <KpiOrg class="right"/>
          </div>
        </div>
        <KpiDistrict class="right"/>
      </div>
    </div>
  </ScreenPane>  
</template>
<script>
import ScreenPane from './components/ScreenPane'
import Header from './components/Header'
import KpiRank from './components/KpiRank'
import KpiVariation from './components/KpiVariation'
import KpiVeto from './components/KpiVeto'
import KpiOrg from './components/KpiOrg'
import KpiDistrict from './components/KpiDistrict'


export default {
  components: {
    ScreenPane,
    Header,
    KpiRank,
    KpiVariation,
    KpiVeto,
    KpiOrg,
    KpiDistrict
  }
}
</script>
<style lang="less" scoped>
.screen-wrapper{
  display: flex;
  flex-direction: column;
  height: 100%;
  & > .header{
    flex: none;
  }
  & > .body{
    flex: auto;
    min-height: 1px;
    padding: 15px 20px;
    display: flex;
    & > .left{
      flex: auto;
      width: 850px;
      display: flex;
      flex-direction: column;
      & > .header{
        position: relative;
        flex: none;
        height: 48px;
        line-height: 48px;
        margin-left: 28px;
        background: linear-gradient(90deg, fade(#5EACB8, 40%) 0%, fade(#2F565C, 40%) 100%);
        font-size: 20px;
        font-weight: bold;
        color: fade(#fff, 75%);
        &::before{
          content: ' ';
          position: absolute;
          top: 0;
          left: -28px;
          display: inline-block;
          width: 28px;
          height: 100%;
          background: url('../../assets/img/screen/title-adorn-bg.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      & > .body{
        flex: auto;
        min-height: 1px;
        margin-top: 10px;
        display: flex;
        & > .left{
          flex: auto;
          width: 326px;
          display: flex;
          flex-direction: column;
          & > .top{
            flex: auto;
            height: 352px;
          }
          & > .middle{
            flex: auto;
            height: 208px;
            margin-top: 20px;
          }
          & > .bottom{
            flex: auto;
            height: 126px;
            margin-top: 20px;
          }
        }

        & > .right{
          flex: auto;
          width: 504px;
          margin-left: 20px;
        }
      }
    }
    & > .right{
      flex: auto;
      width: 530px;
      margin-left: 20px;
    }

  }
}
</style>