<template>
  <ScreenPane :width="1440" :height="900">
    <div class="contaner">
      <Header title="智慧监管"/>
      <div class="body">
        <div class="left">
          <ProblemType/>
          <ProblemChange/>
          <ExecState/>
        </div>
        <div class="center">
          <div class="header">
            <ProblemCount/>
          </div>
          <div class="body">
            <ProblemMap @select="onAreaSelect"/>
          </div> 
        </div>
        <div class="right">
          <WarnList/>
          <RuleSystem/>
        </div>
      </div>
    </div>
  </ScreenPane>
</template>
<script>
import ScreenPane from './components/ScreenPane'
import Header from './components/Header'
import ProblemCount from './components/ProblemCount'
import ProblemType from './components/ProblemType'
import ProblemChange from './components/ProblemChange'
import ExecState from './components/ExecState'
import WarnList from './components/WarnList'
import RuleSystem from './components/RuleSystem'
import ProblemMap from './components/ProblemMap'

export default {
  components: {
    ScreenPane,
    Header,
    ProblemCount,
    ProblemType,
    ProblemChange,
    ExecState,
    WarnList,
    RuleSystem,
    ProblemMap
  },
  data(){
    return {
      selected: undefined,
    }
  },
  methods: {
    onAreaSelect(area){
      this.selected = area; 
    }
  }
}
</script>
<style lang="less" scoped>
.contaner{
  display: flex;
  flex-direction: column;
  height: 100%;
  & > .body{
    flex: auto;
    display: flex;
    height: 100%;
    min-height: 1px;
    padding: 16px 24px 0 24px;
    & > .left{
      width: 28%;
      flex: none;
    }
    & > .center{
      flex: auto;
      margin: 0 10px;
      display: flex;
      flex-direction: column; 
      & > .header{
        flex: none;
        height: 250px;
      }
      & > .body{
        flex: auto;
        min-height: 1px;
      }
    } 
    & > .right{
      width: 28%;
      flex: none;
    }
  }
}
</style>