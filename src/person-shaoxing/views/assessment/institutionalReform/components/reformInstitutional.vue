<template>
  <div class="reformInstitutional">
    <div class="reform-div" v-if="data && data.length > 0">
      <h3 class="reform-h3">{{title}}</h3>
      <ul class="reform-ul"> 
        <li
          :class="['reform-li',{'hover': check(index,hover)},{'active': check(index,isActive)}]"
          v-for="(item, index) in data"
          :key="index"
          @mouseover="mouseoneOver(index)"
          @mouseleave="mouseLeave"
          @click="goReform(item, index)"
        >
          <custom-icon type="bg-assessment-reform"/>
          <p class="li-p">
            <a-tooltip placement="right">
              <template slot="title">
                {{ item.orgname }}
              </template>
              <span>{{ item.orgname.substring(0,13) }}</span>
              <span v-if="item.orgname.length>13" class="ellipsis">...</span>
              <span v-else/>
            </a-tooltip>
          </p>
        </li>
      </ul>
      <div class="content">
        <Institutional v-if="params" :params="params"/>
      </div>
    </div>
  </div>
</template>
<script>
import { Button,Tooltip } from "ant-design-vue";
import CustomIcon from "@/framework/components/CustomIcon";
import Institutional from '../Institutional';
import { orgevolution } from "@/person-shaoxing/api/analysis";
import { showError } from "@/framework/utils/index";
import VClamp from 'vue-clamp';
export default {
  name: "reformInstitutional",
  components: {
    ATooltip: Tooltip,
    AButton: Button,
    Institutional,
    CustomIcon,
    VClamp,
  },
  data() {
    return {
      hover: undefined,//机构列表情况处于hover状态的类
      g6timedata: null,
      G6data: {},
      params: undefined,
      finddata: null,
    };
  },
  props: {
    data: {
      type: Array
    },
    title: String,
    typeList: Array,
    active: Object,
    isActive: {
      type: Number,
    },
  },
  watch: {
    isActive(val) {
      if(val==undefined) {
        this.params = undefined;
      }
    }
  },
  methods: {
    mouseoneOver(index) {
      this.hover = index;
    },
    mouseLeave() {
      if(this.hover) {
        this.hover = undefined;
      }
    },
    check(index,param) {
      if(index === param) {
        return true;
      }
      return false;
    },
    getevolution(item) {
      let data = {
        orgid: item.orgid,
        evolutionyear: this.active.value,
      };
      orgevolution(data)
        .then((res) => {
          //时间轴
          let g6timedata = [];
          let g6time = [];
          res.result.nodelist.forEach((item) => {
            //截取字符串
            g6time.push(parseInt(item.evolutiontime.substring(0, 4)));
            //时间去重
            g6timedata = new Set(g6time);
            //排序
            let arr = [];
            g6timedata.forEach((item) => {
              arr.push(item);
            });
            arr.sort((a, b) => {
              return a - b;
            });
            this.g6timedata = arr;
          });
          //画布
          this.G6data.nodes = [];
          this.G6data.edges = [];
          res.result.nodelist.forEach((item) => {
            this.G6data.nodes.push({
              orgname: item.orgname,
              id:
                parseInt(item.evolutiontime.substring(0, 4)) + "-" + item.orgid,
              evolutiontime: item.evolutiontime,
              orgid: item.orgid,
            });
          });
          this.finddata = this.G6data.nodes.slice(0, 1)[0];
          res.result.linklist.forEach((item) => {
            if (item.fromevolutiontime && item.toevolutiontime) {
              this.G6data.edges.push({
                source:
                  parseInt(item.fromevolutiontime.substring(0, 4)) +
                  "-" +
                  item.fromorgid,
                target:
                  parseInt(item.toevolutiontime.substring(0, 4)) +
                  "-" +
                  item.toorgid,
              });
            }
          });
          this.hover = undefined;
          // this.$router.push({
          //   name: "reformInstitutional",
          //   params: {
          //     G6data: this.G6data,
          //     g6timedata: this.g6timedata,
          //     finddata: this.finddata,
          //   },
          // });
          this.params = {
            G6data: this.G6data,
            g6timedata: this.g6timedata,
            finddata: this.finddata,
          };
        })
        .catch((err) => {
          showError(err);
        });
    },
    goReform(item, index) {
      this.$emit('update:isActive', index);
      this.getevolution(item);
    },
  },
};
</script>
<style lang="less" scoped>
.reformInstitutional {
  .reform-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .reform-h3 {
      padding: 8px 24px;
      margin-bottom: 0;
      text-align: center;
      font-size: 1.28em;
      font-weight: 700;
    }
    .reform-ul {
      max-width: 95%;
      margin: 10px 24px;
      padding: 0;
      display: flex;
      border-top: 2px solid fade(@primary-color, 40%);
      box-shadow: 0 4px 10px 2px fade(@primary-1, 10%);
      .reform-li {
        width: 60px;
        height: 300px;
        transform: translateY(-2px);
        display: flex;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        overflow-x: hidden;
        cursor: pointer;
        position: relative;
        svg.icon {
          position: absolute;
          bottom: 4%;
          width: 143px;
          height: 80px;
          left: 28%;
          transform: translateX(-28%);
          filter: drop-shadow(0 0 .5px @primary-color);
          opacity: 0;
          transition: all .1s;
        }
        &:not(:first-child):not(.hover):not(.active):before {
          content: '';
          width: 2px;
          height: 90%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background-color: fade(@primary-color, 5%);
        }
        &.active {
          border: 0;
          background-color: @primary-1;
          z-index: 999;
          & + li {
            border-left: 0;
          }
          p {
            color: @primary-color;
          }
        }
        &:hover {
          background-color: @primary-1;
        }
        .li-p {
          min-width: 21px;
          margin-bottom: 0;
          color: #666666;
          overflow: hidden;
          z-index: 999;
          letter-spacing: 5px;
          & > span {
            display: flex;
            flex-direction: column;
            align-items: center;
            & > span:not(.ellipsis) {
              writing-mode: vertical-rl;
            }
            span.ellipsis {
              letter-spacing: 2px;
            }
          }
        }
        &:hover {
          z-index: 1;
          p {
            color: @primary-color;
          }
        }
      }
      .hover,.active {
        svg.icon {
          opacity: 1;
        }
      }
      .active::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background-color: @primary-color;
      }
    }
    .content {
      width: 100%;
      position: relative;
    }
  }
}
</style>