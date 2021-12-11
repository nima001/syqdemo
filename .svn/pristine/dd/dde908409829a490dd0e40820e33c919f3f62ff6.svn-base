<template>
  <div class="assess-edit">
    <div class="content">
    <div class="header">
      <span>报表名称：{{listName}}</span>
      <span>评估表对象：{{listTarget}}</span>
    </div>
    <a-tree
      :expanded-keys="expandedKeys"
      :draggable="draggable"
      :tree-data="contentData"
      @drop="onDrop"
      @expand="onExpand"
    >
      <template slot="custom" slot-scope="record">
        <div class="item">
          <span class="node-title">{{ record.title }}</span>
          <span class="option">
            <a href="javascript:;" class="edit" @click="edit(record)">编辑</a>
            <a href="javascript:;" class="del" @click="onDelete(record.key)"
              >删除</a
            >
          </span>
        </div>
      </template>
    </a-tree>
  </div></div>
</template>
<script>
import {
  Tree,
  List,
} from "ant-design-vue";
import { queryContentList } from "@/person/api/kpi";

export default {
  name:"assessEdit",
  components:{
    ATree: Tree,
    AList: List,
  },
  data(){
    return{
    contentData:[],
    listName:"",
    listTarget:""
    }
  },
  created() {
    let id = this.$route.query.id;
    this.listName=this.$route.query.name;
    this.listTarget=this.$route.query.target;
     this.queryList(id)
  },
  methods:{
    queryList(id){
    queryContentList(id).then(res=>{
    this.contentData={
      children: this.replaceFields(item.children),
      title: item.name,
      key,
      scopedSlots: {
       icon: "icon",
      },
    }
    })
    }
  }
};
</script>
<style lang="less" scoped>


.assess-edit{
  height: 100%;
  padding: @layout-space-base;
  .content{
     height: 100%;
    background: @white;
    .header{
      width: 100%;
      border-bottom: rgb(197, 190, 190) solid 1px;
      padding: 10px 0 10px 0;
      span{
      margin-right: 100px;
    }
    }
    
  }
 

}
</style>
