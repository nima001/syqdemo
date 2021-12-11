<template>
  <div class="wrap">
    <div class="top">
      <span class="title">接口信息</span>
      <ul class="tipList">
        <li>
          <span class="dote odd"></span>
          <span class="text">正常</span>
        </li>
        <li>
          <span class="dote even"></span>
          <span class="text">异常</span>
        </li>
      </ul>
    </div>
    <div class="interface">
      <loading v-if="loading"/>
      <template v-else>
        <swiper-ant :size="list['length']" class="interface-info">
          <template
            v-for="(list, index) in list"
            :slot="'swiper' + `${index}`"
          >
            <ul class="list" :key="list[0].title">
              <li class="item" v-for="(item, index) in list" :key="index">
                <span class="icon"></span>
                <div class="info">
                  <div class="infoTitle">
                    <span class="dote" :class="{ even: index % 2 == 0 }"></span>
                    <span class="text">{{ item.name }}</span>
                  </div>
                  <div class="infoItem">
                    <span>数据校检量</span>
                    <span>{{ item.totalnum }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </swiper-ant>
      </template>
    </div>
  </div>
</template>

<script>
import SwiperAnt from "../components/SwiperAnt";
import { mixins } from "../components/minxin";
import { interfaceInfo } from "@/person-shaoxing/api/orgStaffReport";
import { showError } from "@/framework/utils/index";
import { sliceArr } from "@/person-shaoxing/utils/index";
import Loading from "../components/Loading";
export default {
  components: {
    SwiperAnt,
    Loading
  },
  data() {
    return {
      list: [],
      loading:true,
    };
  },
  mixins: [mixins],
  watch: {
    dictId(v) {
      this.Loading = true;
      this.getData(this.dictId);
    }
  },
  mounted() {
    this.getData(this.dictId);
  },
  methods: {
    getData(dictId) {
      interfaceInfo(dictId)
        .then((res) => {
          this.list = sliceArr(res.result,2);
          this.loading = false;
        })
        .catch((err) => {
          showError(err);
        });
    },
  },
};
</script>
<style lang='less' scoped>
.wrap {
  padding-top: 5px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 26px;
      color: #FFF;
      opacity: 0.8;
    }
    .tipList {
      display: flex;
      margin: 0px;
      li {
        display: flex;
        align-items: center;
        &:last-child {
          margin-left: 12px;
        }
        span {
          &.dote {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            opacity: 1;
            &.odd {
              background: #7dc8a3;
            }
            &.even {
              background: #fb2626;
            }
          }
          &.text {
            height: 19px;
            font-size: 14px;
            margin-left: 5px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            line-height: 19px;
            color: #FFF;
            opacity: 0.6;
          }
        }
      }
    }
  }
  .interface {
    position: relative;
    height: 230px;
    margin-top: 20px;
      /deep/ svg{
          top:95px
      }
    .list {
      margin: 0px;
      .item {
        width: 100%;
        height: 91px;
        background: url("../img/repeat.png") repeat;
        display: flex;
        align-items: center;
        &:last-child {
          margin-top: 8px;
        }
        .icon {
          width: 90px;
          height: 90px;
          background: url("../img/interface.png") center center no-repeat;
        }
        .info {
          flex: 1;
          padding-right: 24px;
          min-width: 0px;
          .infoTitle {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            .dote {
              width: 12px;
              height: 12px;
              background: #7dc8a3;
              border-radius: 50%;
              opacity: 1;
              &.even {
                background: #fb2626;
              }
            }
            .text {
              height: 21px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 21px;
              color: #FFF;
              opacity: 0.8;
              margin-left: 8px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .infoItem {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:last-child {
              margin-top: 4px;
            }
            span {
              height: 21px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              line-height: 21px;
              color: #ffffff;
              opacity: 0.8;
              &:first-child {
                opacity: 0.6;
              }
            }
          }
        }
      }
    }
  }
}
</style>