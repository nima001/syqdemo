<template>
  <div>
    <dialog-box 
      v-model="show"
      :title="title"
    >
      <div class="detail-info">
        <loading v-if="loading"/>
        <template v-else>
          <div class="left" v-if="systype !== false">
            <ul>
              <li v-for="item in systypes" 
                :key="item.key" 
                :class="{active: search.systype === item.value}"
                @click="onSystypeClick(item)"
              >{{item.text}}</li>
            </ul>
          </div>
          <div class="right">
            <div class="header">
              <div class="left">
                <a-input v-model="search.searchkey"/>
              </div>
              <div class="right">
                <a-button @click="onSearch">搜索</a-button>
                <a-button @click="onReset">重置</a-button>
              </div>
            </div>
            <ul class="list" :class="{double: !group}">
              <li v-for="(org) in dataList" :key="org._id">
                <div>
                  <div>
                    <div class="adorn-corner left top"></div>
                    <div class="adorn-corner right top"></div>
                    <div class="border"></div>
                  </div>
                  <div class="content" :class="{disabled: !org._id}" :title="org.name" @click="onClick(org)">
                    <custom-icon v-if="org.children" type="tree"/>
                    <slot v-if="hasItemSlot" name="item" v-bind="org"/>
                    <template v-else>{{org[item || 'name']}}</template>
                  </div>
                  <div class="sub-item" v-for="sub in org.children" :key="sub._id" @click="onClick(sub)">
                    <slot v-if="hasItemSlot" name="item" v-bind="sub"/>
                    <template v-else>{{sub[item || 'name']}}</template>
                  </div>
                  <div>
                    <div class="border"></div>
                    <div class="adorn-corner right bottom"></div>
                    <div class="adorn-corner left bottom"></div>
                  </div>
                </div>
              </li>
              <li v-show="total > dataSize" class="footer-sentinel" ref="sentinel" style="text-align:center">
                <a-icon slot="indicator" type="loading"/>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </dialog-box>
    <dialog-box 
      v-model="orgDetail.show"
      :title="orgDetail.title"
      :destroyOnClose="true"
    >
      <org-detail :tab="infoTabIndex" :orgid="orgDetail.orgid"/>
    </dialog-box>
  </div>
</template>
<script>
import { Input, Button, Icon } from 'ant-design-vue'
import DialogBox from '../components/DialogBox'
import OrgDetail from '../components/OrgDetail'
import { showError } from "@/framework/utils/index";
import CustomIcon from '@framework/components/CustomIcon';
import Loading from "../components/Loading";

/**
 * 机构列表
 * 1.修改机构信息显示，见props的item参数
 * 2.修改机构点击事件 提供click事件
 */
export default {
  components: {
    AInput: Input,
    AButton: Button,
    AIcon: Icon,
    DialogBox,
    OrgDetail,
    CustomIcon,
    Loading
  },
  props: {
    value: Boolean,
    title: String,
    loadPage: {
      type: Function,
    },
    item: {//列表Item显示的字段或提供slot
      type: String //or slot
    },
    systype: {//单位是否按序列分组 false[不分组] true[分组,默认显示全部] | String [分组，指定分组]   
      type: [Boolean, String], 
      default: false,
    },
    group: Boolean, //按主管单位分组显示
    infoTabIndex: Number//组织信息默认定位的tabl
  },
  data(){
    return {
      show: this.value,
      search: {
        systype: null,
        searchkey: undefined,
      },
      dataList: [],
      pagenum: 1,
      loading:true,
      dataSize: 0,//dataList数据存在分组，不用数组长度判断已经加载的数据长度
      total: 0,
      orgDetail: {
        show: false,
        orgid: undefined,
        title: undefined
      },
      intersectionObserver: undefined
    }
  },
  computed: {
    systypes(){
      let arr = this.$store.getters.dict('usermanage.org.systype') || [];
      return [
        { key: '', value: null, text: '全部' },
        ...arr
      ]
    },
    hasItemSlot(){
      return !!this.$scopedSlots.item;
    }
  },
  created(){
    
  },
  destroyed(){
    this.unBindScrollSentinel();
  },
  watch: {
    value(value){
      if(value){//每次打开窗口，重置参数
        if(typeof this.systype == 'string'){
          this.search.systype = this.systype
        }else{
          this.search.systype = null;
        }
      }
      this.show = value;
    },
    show(show){
      this.$emit('input', show);
    },
    loadPage:{
      immediate: true,
      handler(fn){
        this.dataList = [];
        if(fn){
          this.loadData(true);
        }
      }
    }
  },
  methods: {
    onSearch(){
      this.loadData(true);
    },
    onReset(){
      if(this.search.searchkey){
        this.search.searchkey = undefined;
        this.loadData(true);
      }
    },
    onSystypeClick(item){
      this.search.systype = item.value;
      this.dataList = [];
      this.loadData(true)
    },
    loadData(reload){
      if(reload || this.total > this.dataSize){//重新加载或数据未加载完成
        let pagenum = reload ? 1 : this.pagenum + 1;
        this.loadPage({
          ...this.search,
          needtotal: reload,
          pagesize: 20,
          pagenum
        }).then(({result: {total, rows = []}}) => {
          this.pagenum = pagenum;
          let list;
          if(reload){
            this.total = total;
            this.dataSize = rows.length
            list = [];
          }else{
            this.dataSize += rows.length
            list = this.dataList;
          }
          if(this.group){//需要按主管单位分组显示(必须保证主管单位以及下设单位顺序正确)
            let last = list[list.length - 1];
            rows.forEach(item => {
              if(!last || !item.suporg || last.suporg != item.suporg){
                if(!item.suporg || item.name == item.suporg){//主管单位不存在或等于自己
                  list.push(item);
                  last = item;
                }else{
                  //主管单位存在，但前一个不是该主管单位，补上主管单位并灰化显示
                  last = { 
                    name: item.suporg, 
                    suporg: item.suporg,
                    children: [item]
                  }
                  list.push(last);
                }
              }else{
                last.children = (last.children || []).concat(item);
              }
            })
          }else{
            list = list.concat(rows);
          }
          if(rows.length < 20){//数据不足20条说明已经加载完成【容错处理】
            this.total = this.dataSize;
          }
          this.dataList = list;
          this.$nextTick(() => {
            if(this.total > this.dataSize){
              this.bindScrollSentinel();
            }else{
              this.unBindScrollSentinel();
            }
          })
          this.loading = false;
        }).catch(error => {
          showError(error)
        })
      }
    },
    onClick(item){
      if(item._id){
        if(this.$listeners.click){
          this.$emit('click', item);
        }else{
          this.orgDetail = { show: true, orgid: item._id, title: item.name }
        }
      }
    },
    bindScrollSentinel(){
      if(this.intersectionObserver){
        return;
      }
      let sentinel = this.$refs.sentinel;
      if(sentinel){
        this.intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio > 0){
            this.loadData(false);
          }
        });
        this.intersectionObserver.observe(sentinel);
      }
    },
    unBindScrollSentinel(){
      if(this.intersectionObserver){
        this.intersectionObserver.disconnect();
        this.intersectionObserver = undefined;
      }
    },
  }
}
</script>
<style lang="less" scoped>
.detail-info{
  height: 600px;
  display: flex;
  overflow: hidden;
  padding: 20px 50px;
  font-size: 16px;
  color: #fff;
  & > .left{
    width: 200px;
    height: 100%;
    flex: none;
    margin-right: 10px;
    background-color: #081220;
    overflow-y: auto;
    li{
      line-height: 46px;
      margin-top: 5px;
      cursor: pointer;
      color: fade(#fff, 60%);
      text-align: center;
      &:hover{
        background-color: #23364c;
      }
      &.active{
        background-color: #23364c;
        color: #fff;
      }
    }
  }
  & > .right{
    flex: auto;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    & > .header{
      display: flex;
      .left{
        flex: auto;
      }
      .right{
        flex: none;
      }
      .ant-input{
        background: #111c31;
        border: unset;
        color: #fff;
        height: 46px;
        &:focus{
          box-shadow: 0 0 3px 1px rgba(158, 197, 255, 0.582);
        }
      }
      .ant-btn{
        background: #111c31;
        color: fade(#fff, 60%);
        border-color: #1c97b8;
        margin-left: 20px;
        height: 44px;
        width: 80px;
        &:hover{
          color: #fff;
        }
      }
    }
    & > .list{
      flex: auto;
      overflow-y: auto;
      margin: 10px -10px;
      &.double li{
        width: 50%;
        float: left;
      }
      li{
        padding: 8px 14px;
        color: #FFF;
        & > div{
          position: relative;
          .border{
            height: 2px;
            background: radial-gradient(circle, #4A92FF 0%, #1598AD 100%);
            margin: 0 8px;
          }
          .adorn-corner{
            width: 10px;
            height: 10px;
            position: absolute;
            background-image: url('../img/list-item-adorn-corner.png');
            &.right{
              right: 0;
              transform: rotate(180deg);
            }
            &.bottom{
              bottom: 0;
            }
            &.right.top{
              transform:scaleX(-1);
            }
            &.left.bottom{
              transform:scaleY(-1);
            }
          }
        }
        
        .content{
          position: relative;
          margin: 0 10px;
          padding: 0 10px;
          padding-left: 40px;
          line-height: 46px;
          background-color: #101b2c;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          &.disabled{
            color: fade(#FFF, 50%);
          }
          &:not(.disabled):hover{
            background-color: lighten(#101b2c, 25%);
          }
          .icon{
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            color: fade(#8fc7ff, 40%);
          }
        }
        .sub-item{
          line-height: 40px;
          margin: 0 10px;
          margin-top: 5px;
          padding: 0 10px;
          padding-left: 40px;
          background-color: #1a1d20;
          color: fade(#fff, 90%);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          &:hover{
            background-color: lighten(#1a1d20, 25%);
          }
        }
      }
    }
    & > .footer{
      flex: none;
      .pagintion{
        width: 140px;
        height: 40px;
        margin: auto;
        padding: 5px;
        line-height: 30px;
        background-color: #101b2c;
        border-radius: 4px;
        color: white;
        text-align: center;
        span{
          display: inline-block;
          width: 3em;
        }
        a{
          display: inline-block;
          padding: 0 10px;
          &.disabled{
            cursor: not-allowed;
          }
        }
      }
    }
  }
}
</style>