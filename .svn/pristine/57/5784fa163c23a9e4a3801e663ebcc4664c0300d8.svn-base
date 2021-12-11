<template>
  <div class="layout">
    <div class="tab">
      <ul>
        <li v-for="(item, index) in tasktypeList" :key="`${item.key}${index}`" 
          :class="{selected: tasktype == item.category}"
          @click="onTypeChange(item)"
        >{{item.text}}</li>
        <li v-for="(item, index) in otherTasktypeList" :key="`${item.key}${index}`" 
          :class="{selected: tasktype == item.category}"
          @click="onTypeChange(item)"
        >{{item.text}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="content">
        <keep-alive>
          <component 
            v-bind:is="currentComponent" 
            :tasktypeList="tasktypeList" 
            :otherTasktypeList="otherTasktypeList" 
            :tasktype="Number(active)"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import ConcernBody from './components/ConcernBody';
import ConcernDealBody from './components/ConcernDealBody';
import { cloneDeep, map, has, concat } from 'lodash';


/**
 * 关注列表
 */
export default {
  name: 'ConcernTask',
  components: {
    ConcernBody,
    ConcernDealBody,
  },
  data(){
    return {
      active: 1,
      tasktype: 1,
      currentComponent: 'ConcernBody',
    }
  },
  computed: {
    tasktypeList(){
      return this.$store.getters.dict('person.work.tasktype');
    },
  },
  watch: {
    tasktype(val) {
     if(this.tasktypeList.length<val) {
        this.currentComponent = 'ConcernDealBody';
      }else{
        this.currentComponent = 'ConcernBody';
      }
    }
  },
  computed: {
    tasktypeList(){
      let v = this.$store.getters.dict('person.work.tasktype');
      map(v, (item, index)=>{
        item.category = index+1;
      });
      return v;
    },
    otherTasktypeList() {
      let v = cloneDeep(this.$store.getters.dict('person.work.flowtype'));
      map(v, (item, index)=>{
        item.category = this.tasktypeList.length+index+1;
      });
      return v;
    },
  },
  methods: {
    onTypeChange(item){
      this.active = item.value;
      this.tasktype = item.category;
    },
  }
}
</script>
<style lang="less" scoped>
.layout{
  height: 100%;
  display: flex;
  border-radius: @border-radius-base;
  background: white;
  & > .tab{
    width: 150px;
    background-color: #f2f2f2;
    ul{
      margin-top: 50px;
    }
    li{
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: @primary-1;
        color: @primary-color;
      }
      &.selected{
        background-color: white;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
  & > .content{
    flex: auto;
    width: 0;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    .header{
      padding: @content-padding-v @content-padding-h;
      & > .left{
        margin-bottom: 24px;
        margin-top: 10px;
        padding: @padding-xs;
        display: flex;
        justify-content: space-between;
        overflow-x: auto;
        cursor: pointer;
        li{
          flex: 0 1 160px;
          min-width: 160px;
          height: 100px;
          text-align: center;
          margin: 0 @padding-xs;
          border-radius: @border-radius-base;
          box-shadow: 0px 0px 10px 0px #eee;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          .spin {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: fade(white, 60%);
            .ant-spin {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .total {
            font-size: 3.1em;
            font-weight: bold;
            color: fade(@primary-color, 80%);
          }
          .name {
            padding: 0 @layout-space-base;
            position: relative;
            top: -5%;
            font-weight: bold;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          &:hover{
            background-color: @primary-1;
            .total {
              color: @primary-color;
            }
          }
        }
        li.active {
          background-color: @primary-1;
        }
      }
      & > .right{
        float: right;
        margin-bottom: 8px;
        li{
          display: inline-block;
          margin-left: 5px;
        }
        .clear-user{
          color: @disabled-color;
          font-size: 0.9em;
        }
      }
    }
    .body{
      padding: 0 @content-padding-h;
      flex: 0 1 auto;
      overflow-y: auto;
      .ant-table thead {
        tr th:first-child {
          text-align: center;
        }
      }
      /deep/.ant-table  {
        .ant-table-thead{
          tr th.ant-table-row-cell-break-word:first-child {
            text-align: center;
          }
        }
        tr {
          td:first-child {
            .index {
              display: flex;
              justify-content: space-between
            }
          }
          td:not(:nth-child(2)){
            .title span{
              max-width: 100px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              display: inline-block;
            }
          }
          td:last-child,td:nth-last-child(2) {
            white-space: nowrap;
          }
          td:nth-child(2) {
            max-width: 100px;
            .title {
              overflow: hidden;
              text-overflow: ellipsis;
            }
            span {
              white-space: nowrap;
            }
          }
        }
        .expire{
          display: inline-block;
          width: 1.4em;
          margin-left: 4px;
          border: 1px solid @accent-color;
          border-radius: @border-radius-base;
          line-height: 1.4em;
          font-size: 0.8em;
          text-align: center;
          color: @accent-color;
          &:not(.will){
            border-color: @error-color;
            color: @error-color;
          }
        }
      }
    }
    .footer{
      padding: @content-padding-v @content-padding-h;
      .ant-pagination{
        float: right;
      }
    }
  }
}
</style>