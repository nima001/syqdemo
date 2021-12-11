<template>
  <table class="body">
    <thead>
      <tr>
        <td class="name tag"></td>
        <td>核定数</td>
        <td>实有数</td>
        <td>超空数</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in list" :key="item.id" :class="{odd: index%2 != 1}">
        <td class="name">{{item.name}}</td>
        <td>{{item.total}}</td>
        <td>{{item.used}}</td>
        <td>{{item.num}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { listOrgDistrItem } from "@person/api/org";
import { showError } from "@framework/utils/index";

export default {
  props: {
    orgid: String
  },
  data(){
    return {
      list: []
    }
  },
  created(){
    if(this.orgid){
      this.loadData(this.orgid);
    }
  },
  methods: {
    convert(list){
      let arr = [];
      (list || []).forEach(ele => {
        let total = (ele.count || 0) + (ele.change || 0),
          used = ele.usernum || 0,
          num = total - used;
        if(total > 0 || used > 0){
          arr.push({ id: ele.id, name: ele.name, total, used, num });
        }
        if(ele.children){
          arr = [...arr, ...this.convert(ele.children)]
        }
      });
      return arr;
    },
    loadData(orgid){
      listOrgDistrItem(orgid, 'post').then(({result}) => {
        let root = result[0]
        this.list = this.convert(root && root.children)
      }).catch(err => {
        showError(err);
      });
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>