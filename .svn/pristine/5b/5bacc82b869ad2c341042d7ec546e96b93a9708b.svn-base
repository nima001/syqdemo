<template>
  <div>
    <Title title="预警信息列表"/>
    <div style="height:390px" class="container">
      <SwiperChart>
        <div slot="content" class="content">
          <ul>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  当满足以下条件之一时，触发预警：
                    1.正职实配数（不含事业单位正处长级专员）＞正职核定数;
                    2.副职实配数＞副职核定数;
                    3.其他领导实配数＞其他领导核定数;
                    4.总师实配数＞总师核定数；
                    5.内设正职实配数（不含行政机构临时性督查专员和事业单位正处长级专员）＞内设正职核定数；
                    6.内设机构副职实配数＞副职核定数；
                    7.部门其他工作机构领导实配数＞部门其他工作机构领导核定数；
                    8.与省级统发工资系统提供的实有领导人数及职务层级信息比对不一致
                </li>
              </template>
              <li>
                当满足以下条件之一时，触发预警：
                  1.正职实配数（不含事业单位正处长级专员）＞正职核定数;
                  2.副职实配数＞副职核定数;
                  3.其他领导实配数＞其他领导核定数;
                  4.总师实配数＞总师核定数；
                  5.内设正职实配数（不含行政机构临时性督查专员和事业单位正处长级专员）＞内设正职核定数；
                  6.内设机构副职实配数＞副职核定数；
                  7.部门其他工作机构领导实配数＞部门其他工作机构领导核定数；
                  8.与省级统发工资系统提供的实有领导人数及职务层级信息比对不一致
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  参公管理事业单位新入编人员的“人员身份”是非参照管理人员
                </li>
              </template>
              <li>
                参公管理事业单位新入编人员的“人员身份”是非参照管理人员
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  实名制系统中，未允许设置科级机构的省级单位填报的实有人员“行政职务”中出现科长、副科长等行政职务，或领导职务层级为正科级及以下；
                </li>
              </template>
              <li>
                实名制系统中，未允许设置科级机构的省级单位填报的实有人员“行政职务”中出现科长、副科长等行政职务，或领导职务层级为正科级及以下；
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  事业单位人员“行政职务”未使用核定领导职数时使用的名称，或出现“助理”“顾问”“经理”“董事长”等
                </li>
              </template>
              <li>
                事业单位人员“行政职务”未使用核定领导职数时使用的名称，或出现“助理”“顾问”“经理”“董事长”等
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                参公管理事业单位新入编人员的“人员身份”是非参照管理人员
              </li>
              </template>
              <li>
                参公管理事业单位新入编人员的“人员身份”是非参照管理人员
              </li>
            </a-tooltip>
          </ul>
        </div><div slot="content" class="content">
          <ul>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  事业编制实有人员数＞事业编制数（含周转编制）
                </li>
              </template>
              <li>
                事业编制实有人员数＞事业编制数（含周转编制）
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  实名制系统中，未允许设置科级机构的省级单位填报的实有人员“行政职务”中出现科长、副科长等行政职务，或领导职务层级为正科级及以下；
                </li>
              </template>
              <li>
                实名制系统中，未允许设置科级机构的省级单位填报的实有人员“行政职务”中出现科长、副科长等行政职务，或领导职务层级为正科级及以下；
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  参公管理事业单位新入编人员的“人员身份”是非参照管理人员
                </li>
              </template>
              <li>
                参公管理事业单位新入编人员的“人员身份”是非参照管理人员
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  是否执法队伍为“是”，但执法机构在全省执法队伍清单之外的
                </li>
              </template>
              <li>
                是否执法队伍为“是”，但执法机构在全省执法队伍清单之外的
              </li>
            </a-tooltip>
            <a-tooltip placement="topRight" :mouseEnterDelay="0.5">
              <template slot="title">
                <li>
                  是否执法队伍为“否”，含有“执法*队”“稽查*队”“监察*队”“监管中心”等名称的事业单位
                </li>
              </template>
              <li>
                是否执法队伍为“否”，含有“执法*队”“稽查*队”“监察*队”“监管中心”等名称的事业单位
              </li>
            </a-tooltip>
          </ul>
        </div>
      </SwiperChart>
      <div class="overtime">
        <span>超时处置问题数</span> 
        <span>
          <LcdFont :length="3" :realNumber="8" :realStyle="realStyle"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'ant-design-vue';
import Title from './Title'
import SwiperChart from './SwiperChart'
import LcdFont from './LcdFont';


export default {
  components: {
    Title,
    SwiperChart,
    LcdFont,
    ATooltip: Tooltip,
  },
  data() {
    return{
      realStyle: {
        color: "#CF6C56",
        textStroke: "1 #ECA066",
        opacity: 0.95,
      },
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  .ant-carousel {
    height: 70%;
  }
  /deep/.slick-initialized {
    .slick-dots {
      bottom: 15px;
    }
    .slick-slide {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .content {
        ul {
          display: flex;
          flex-direction: column;
          margin:0 @padding-lg;
          li {
            width: 100%;
            padding: @padding-xs @padding-md;
            padding-left: @padding-lg;
            border-radius: @border-radius-base;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            position: relative;
            color: fade(#fff, 80%);
            &::before {
              content: '';
              width: 8px;
              height: 8px;
              position: absolute;
              left: @padding-lg/2;
              top: 50%;
              background: #FF7C28;
              border-radius: 50%;
              transform: translate(-50%,-50%);
            }
            &:nth-child(2n-1) {
              background: fade(#E8835E, 20%);
            }
          }
        }
      }
    }
  }
  .overtime {
    padding: @padding-xs/2;
    background: fade(#7AC3E4,20%);
    color: #fff;
    border-radius: @border-radius-base;
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    span:last-child {
      font-size: 1.2em;
      color: #CF6C56;
      margin-left: @padding-lg;
    }
  }
}
</style>