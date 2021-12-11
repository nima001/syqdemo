<template>
  <div>
      <div class="detail-info">
        <template>
          <div class="right">
            <div class="header">
              <p></p>
            </div>
            <div class="table">
              <div class="header">
                <span v-for="item in head">{{item.text}}</span>
                </div>
                <div class="body">
                  <ul v-for="item in dataList" @click="orgClick(item)">
                    <li v-for="val in head">{{item[val.key]}}</li>
                  </ul>
                  <p v-show="pagination.pagenum < pagination.pagetotal" 
                    class="footer-sentinel" ref="sentinel" style="text-align:center">
                    <a-icon slot="indicator" type="loading"/>
                  </p>
              </div>
            </div>
          </div>
        </template>
      </div>
  </div>
</template>
<script>
import { Button, Input, Icon, Tooltip } from "ant-design-vue";
import DialogBox from "./DialogBox";
import { map } from 'lodash';
import { query } from "@/person/api/integratedquery";
import { showError } from "@/framework/utils/index";
import { openOrgInfo } from './smzUtils';
import BaseMixin from './BaseMixin'
import { transform } from '@antv/g2/lib/util/transform';

export default {
  mixins: [BaseMixin],
  props: {
    head: {
      type: Array 
    },
    district: {
      type: String,
    },
    jgtypes: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: ()=>[]
    },
    filter: {
      type: Array,
      default: ()=>[]
    },
  },
  components: {
    DialogBox,
    AInput: Input,
    AButton: Button,
    AIcon: Icon,
    ATooltip: Tooltip,
  },
  data() {
    return {
      show: false,
      dataList: [],
      pagination: {
        pagenum: 1,
        pagesize: 20,
        total: 0,
        pagetotal: 0,
      },
      intersectionObserver: undefined,
    };
  },
  watch: {
  },
  computed: {
    params(){
      let query = {
        target: { id: 1, title: "组织" },
        fields: [],
        filter: { 
          op: 'and',
          criteria: [],
        },
        orders: [
          { orderby: 'index', ordertype: "ASC" }  
        ],
      }
      let criteria = [];
      let fields = [
          { key: "name", showname: "机构名称" },
          { key: "orgcode", showname: "组织编码" },
        ];
      if(this.district){
        criteria.push({
          field: { key: "district", showname: "所在区划" },
          op: "in",
          value: this.matchCode(this.district),
        })
      }
      if(this.jgtypes){
        criteria.push({
          field: { key: "jgtype", showname: "机构类型" },
          op: "in",
          value: this.jgtypes,
        })
      }
      if(this.fields.length) {
        fields = [...fields, ...this.fields];
      }
      if(this.filter.length){
        criteria = [...criteria, ...this.filter];
      }
      query.fields = fields;
      query.filter.criteria = criteria;
      return query;
    }
  },
  mounted() {
    this.dataList = [];
    this.show = false;
    this.loadData(this.pagination);
  },
  destroyed(){
    this.unBindScrollSentinel();
  },
  methods: {
    orgClick(org){
      openOrgInfo(org.orgcode);
    },
    onSystypeClick(item) {
      this.pagination = {
        pagenum: 1,
        pagesize: 20,
        total: 0,
        pagetotal:0,
      };
      this.dataList = [];
      this.sysvalue = item.value;
      this.loadData(this.pagination);
    },
    loadData({ pagenum, pagesize }) {
      query({
        ...this.params,
        pagenum,
        pagesize,
        needTotal: true,
      }).then(({result})=>{
        this.dataList = [...this.dataList, ...result.rows];
        this.pagination.pagenum = result.pagenum;
        this.pagination.pagesize = result.pagesize;
        this.pagination.total = result.total;
        this.pagination.pagetotal = Math.ceil(this.pagination.total/this.pagination.pagesize);
        if(this.pagination.pagenum < this.pagination.pagetotal){
          this.bindScrollSentinel();
        }else{
          this.unBindScrollSentinel();
        }
      }).catch((err)=>{
        showError(err);
      })
    },
    bindScrollSentinel(){
      if(this.intersectionObserver){
        return;
      }
      let sentinel = this.$refs.sentinel;
      if(sentinel){
        this.intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio > 0){
            let { pagenum, pagesize } = this.pagination;
            this.loadData({ pagenum: pagenum + 1, pagesize });
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
  },
};
</script>
<style lang="less" scoped>
.detail-info{
  height: 600px;
  display: flex;
  overflow: hidden;
  padding: 50px 50px;
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
    .table {
      height: 100%;
      color: #fff;
      .header {
        padding: @padding-xs;
        margin-bottom: @layout-space-base;
        display: flex;
        justify-content: space-evenly;
        // background: url('../../../assets/img/screen/top-adorn.png') no-repeat;
        background-size: cover;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: fade(#151326, 80%);
          z-index: -1;
        }
        span {
          display: inline-block;
          width: 140px;
          &:first-child {
            width: 360px;
          }
          &:nth-child(2) {
            text-align: center;
          }
        }
      }
      .body {
        height: 400px;
        color: fade(#fff, 80%);
        overflow: auto;
        ul {
          padding: @padding-xs;
          margin: 0;
          display: flex;
          justify-content: space-evenly;
          cursor: pointer;
          &:nth-child(2n-1) {
            background: #151E32;
          }
          li {
            width: 140px;
            &:first-child {
                width: 360px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            &:nth-child(2) {
                text-align: center;
            }
          }
          .footer-sentinel{
            flex: none;
            width: 100%;
            padding: 5px;
          }
        }
      }
    }
    .pagination {
        width: 120px;
        padding: @padding-xs @padding-lg;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: @border-radius-base;
        color: fade(#fff, 80%);
        background: fade(#000, 30%);
        .current {
            color: #fff;
        }
        .prev, .next {
            margin: 0 16px;
            cursor: pointer;
        }
    }
  }
}
</style>
