
<template>
  <div class="form-panel">
    <div class="form-body" ref="formBody">
      <div class="name">机构编制专项评估报告</div>
      <template v-for="item in itemList">
        <div class="item-group title" v-if="typeof(item.key) == 'number'" :key="item.sort">
          <span>{{item.sort}}</span>
        </div>
        <div class="title-bar title" v-else-if="item.show && item.show == true" :key="item.title">{{item.title}}</div>
        <div class="name-bar title" v-else-if="item.showName && item.showName == true" :key="item.name">{{item.name}}</div>
        <component v-else :is="item.key" :key="item.key" :id="item.key" :data="content[item.key]" :str="item.key" ref="reportItem" />
      </template>
    </div>
  </div>
</template>
<script>
import { Anchor } from "ant-design-vue";
import { getComponents, getItems } from './contentItems';
import { createReportItem, pStyle } from "@/person-shaoxing/utils/index";

const titleArr = ['机构基本情况分析', '实有人员结构分析', '编制职数岗位分析', '编制职数使用情况分析图']
//评估内容
export default {
  components: {
    AAnchor: Anchor,
    AAnchorLink: Anchor.Link,
    ...getComponents()
  },
  props: {
    content: Object,//分析内容
  },
  data(){
    return {
      itemList: [],
      titleList: []
    }
  },
  watch: {
    content: {
      handler(val) {
        this.getItemList();
        this.getTitleList();
      },
      deep: true
    }
  },
  created(){
    this.getItemList();
    this.getTitleList();
  },
  methods: {
    getVal() {
      let reportList = [];
      let itemIndex = 0, sortArr = ['', '一、' , '二、', ''];
      this.itemList.forEach((item, index) => {
        // 生成最外层大标题
        if (item.key && typeof(item.key) == 'number') {
          let obj = {
            children: [],
            showtitle: true,
            // title: `${sortArr[item.key]}${item.sort}`
            title: item.sort
          }
          reportList.push(obj)
        } else if (item.show) {
          //  生成二级标题
          let obj = {
            children: [],
            showtitle: true,
            title: `${item.title}`
          }
          reportList.forEach((list, index) => {
            if (list.title.split('、')[1] == item.sort) {
              list.children.push(obj)
            }
          })
        } else if(item.showName) {
          this.addTitle(reportList, item)
        }
        else if ((item.key && typeof(item.key) == 'string') ) {
          //  生成每一项内容
          let res = this.$refs.reportItem[itemIndex].getHtml()
          ++itemIndex
          this.addItem(reportList, res)
        } 
      })
      return reportList
    },
    //  递归添加三级标题
    addTitle(arr, res) {
      arr.forEach(item => {
        if (item.title) {
          if(item.title.split('.')[1] == res.title) {
            let data = createReportItem(`<p style="${pStyle}">${res.name}</p>`, res.name)
            item.children.push(data)
          } else {
            this.addTitle(item.children, res)
          }
        } else {
          return 
        }
      })
    },
    //  递归添加内容
    addItem(arr, res) {
      arr.forEach(item => {
        if (item.title) {
          if(item.title.split('.')[1] == res.title) {
            item.children.push(res)
          } else {
            this.addItem(item.children, res)
          }
        } else {
          return 
        }
      })
    },
    getItemList() {
      if(this.content){
        let arr = [], index = 0, sort, title, name, baseIndex = 1, reportIndex = 1, nameIndex = 1;
        let titleSort = ['一、', '二、', '三、', '四、', '五、', '六、'],sortIndex = 0;
        getItems(this.content).forEach(item => {
          if (item.sort && sort !== item.sort) {
            arr.push({key: ++index, sort: `${titleSort[sortIndex]}${item.sort}`, title: item.title});
            sortIndex ++;
            sort = item.sort;
          }
          if (item.title && title !== item.title) {
            if (titleArr.indexOf(item.title) !== -1) {//  判断是否为机构基本情况
              arr.push({ show: true, title: `${baseIndex}.${item.title}`, sort: item.sort});
              ++baseIndex
            } else {
              arr.push({ show: true, title: `${reportIndex}.${item.title}`, sort: item.sort});
              ++reportIndex
            }
            title = item.title
          }
          if (item.name) {
            //  添加序号
            if (titleArr.indexOf(item.title) !== -1) {//  判断是否为机构基本情况
            } else {
              if (item.title == '关联情况分析') {
                arr.push({ showName: true, name: `（${nameIndex}）${item.name}`, title: item.title });
                nameIndex ++
              }
            }
          }
          arr.push(item);
        })
        this.itemList = arr;
      }
    },
    getTitleList() {
      if(this.itemList){
        let arr = this.itemList.filter(item => typeof(item.key) == "string"), list = [], title;
        arr.forEach(item => {
          if(item.title && title !== item.title) {
            list.push(item);
            title = item.title;
          }
        })
        this.titleList = list;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.form-panel{
  position: relative;
  height: 100%;
  .form-body {
    height: 100%;
    overflow: hidden;
    .name{
      text-align: center;
      font-size: 24px;
      font-family: 宋体,SimSun;
      margin: 15px 0;
      font-weight: bold;
      color: black;
    }
    .title{
      line-height: 2em;
      margin: 15px 0;
      font-size: 16pt;
      color: black;
      font-family: 黑体,SimHei;
      font-weight: bold;
    }
  }
}
</style>