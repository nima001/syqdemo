<template>
  <a-spin :spinning="loading">
    <div class="rank_list" v-if="rankList.length > 0">
      <div class="name">省份</div>
      <div class="content">
        <ul>
          <li v-for="(list,index) in dataList" :key="index">
            <div class="left">
              <span>{{index + 1}}、</span>
              <span>{{list.name}}</span>
              <span>{{list.percent}}</span>
            </div>
            <div class="right">
              <div class="right_percent">
                <div class="percent" :style="'width:'+ list.percent "></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="empty" v-else>
      <EmptyData></EmptyData>
    </div>
  </a-spin>
</template>

<script>
import EmptyData from "@framework/components/EmptyData";
import { Spin } from "ant-design-vue";
import { numberToPercent } from "@/person-shaoxing/utils/index";
export default {
  props: {
    loading: {
      type: Boolean
    },
    rankList: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number
    }
  },
  components: { ASpin: Spin, EmptyData },
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    dataList() {
      this.rankList.forEach(item => {
        item.percent = numberToPercent(item.value, this.total, 1)
      })
      return this.rankList
    }
  },
  created() {
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.rank_list{
  width: 100%;
  height: 100%;
  .name{
    line-height: 30px;
    text-indent: 1em;
    margin-bottom: 10px;
  }
  .content{
    border-top: 1px solid #dedede;
    ul{
      li{
        height: 50px;
        display: flex;
        align-items: center;
        .left{
          width: 125px;
          span{
            &:nth-child(3){
              margin-left: 20px;
            }
          }
        }
        .right{
          width: calc(~'100% - 125px');
          .right_percent{
            width: 100%;
            height: 5px;
            background-color: #eeeeee;
            position: relative;
            .percent{
              position: absolute;
              left: 0;
              top: 0;
              height: 5px;
              background-color: #33c6fa;
            }
          }
        }
      }
    }
  }
  .empty{
    width: 100%;
    height: 100%;
  }
}
</style>