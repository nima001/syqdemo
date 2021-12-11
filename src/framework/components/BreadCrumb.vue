<template>
  <div class="nav-panel" v-if="breadList && breadList.length">
    <a-breadcrumb :style="{padding:'8px',background:'#FFF', textIndent: '10px'}">
      <a-breadcrumb-item v-for="(item,index) in breadList" :key="index">
        <span v-if="index == breadList.length -1">{{item.name}}</span>
        <router-link v-else :to="{path:`${item.path}`}">{{item.name}}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a class="goback" @click="goBack">返回</a>
  </div>
</template>
<script>
import {Breadcrumb} from "ant-design-vue"

export default {
  name: "BreadCrumb",
  components:{
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
  },
  data() {
    return {
      breadList: undefined
    };
  },
  created() {
    this.getBreadCrumb();
  },
  watch: {
    $route() {
      this.getBreadCrumb();
    }
  },
  methods: {
    getBreadCrumb() {
      let matched = this.$route.matched;
      if (matched.length) {
        let meta = matched[matched.length - 1].meta;
        this.breadList = ((meta && meta.path) || []).map(item => {
          let menu = this.findMenu(item.path);
          return {
            path: item.path,
            name: menu ? menu.name : item.name
          }
        });
      } else {
        this.breadList = undefined;
      }
    },
    findMenu(path, menus){
      if(!menus){
        menus = this.$store.getters.menuList;
      }
      for(let i = 0; i < menus.length; i++){
        let item = menus[i];
        if(item.componenturi == path){
          return item;
        }else if(item.children && item.children.length){
          let m = this.findMenu(path, item.children);
          if(m){
            return m;
          }
        }
      }
    },
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.nav-panel{
  position: relative;
  a {
    text-decoration: none;
  }
  .goback{
    position: absolute;
    right: 10px;
    top: 0;
    line-height: 1.5em;
    margin: 8px;
  }
}
</style>