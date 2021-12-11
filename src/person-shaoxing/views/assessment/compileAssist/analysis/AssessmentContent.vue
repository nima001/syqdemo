<template>
  <div class="wrapper">
    <div class="tip">
      <a-icon type="exclamation-circle" theme="twoTone" two-tone-color="#F8E3BB" />
      注：评估内容可多选
    </div>
    <div class="content">
      <div class="sort_item" v-for="(list,index) in sortArr" :key="index">
        <div class="title">{{list.title}}</div>
        <div class="container">
          <span 
          v-for="(item,num) in list.item" 
          :key="num" 
          :class="[selectedList.indexOf(item.id) === -1 ? '' : 'active']" 
          @click="selectItem(item)">
            {{item.content}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
import { listConfig } from "@/person-shaoxing/api/assessment";
import { showError } from "@/framework/utils/index";

export default {
  props: {},
  components: {
    AIcon: Icon
  },
  data() {
    return {
      sortArr: [],
      selectedList: []
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      listConfig()
      .then(({result}) => {
        this.sortArr = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    selectItem(item) {
      let index = this.selectedList.indexOf(item.id)
      if ( index === -1) {
        this.selectedList.push(item.id)
      } else {
        this.selectedList.splice(index, 1)
      }
    },
    onNext() {
      return new Promise((resolve, reject) => {
        if(this.selectedList.length > 0) {
          this.$store.commit('setConfigIds', this.selectedList); 
          resolve(true)
        }else{
          showError({code:'form_validate_fail', message: '请选择评估内容'});
          resolve(false)
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper{
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;
  .tip{
    color: #BFBFBF;
  }
  .content{
    .sort_item{
      .title{
        line-height: 30px;
        font-weight: bold;
      }
      .container{
        span{
          display: inline-block;
          width: 240px;
          text-align: center;
          padding: 10px 0;
          border: 2px dotted #d9d9d9;
          margin: 9px 17px;
          border-radius: 5px;
          color: @primary-color;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:nth-child(4n+1) {
            margin-left: 74px;
          }
          &:hover{
            background-color: @primary-2;
            border: 2px dotted transparent;
          }
        }
        .active{
          color: @white;
          background-color: @primary-color;
          border: 2px dotted transparent;
        }
      }
    }
  }
}
</style>