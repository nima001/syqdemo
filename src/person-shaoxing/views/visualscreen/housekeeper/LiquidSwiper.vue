<template>
  <div class="wrap">
    <ul class="title">
      <li>机构</li>
      <li>编制</li>
      <li>职数</li>
    </ul>
    <div class="content">
      <swiper-ant :size="formatList['length']">
        <ul
          class="list"
          v-for="(item,index) in formatList"
          :slot="'swiper'+`${index}`"
          :key="index"
        >
          <li class="item" v-for="(lg,idx) in item" :key="idx">
            <p class="tip">{{lg.name}}</p>
            <div class="liquid-spot" @click="showOrgList(lg)">
              <liquid-spot :persent="lg.percent" :field="lg.field" ></liquid-spot>
            </div>
          </li>
        </ul>
      </swiper-ant>
    </div>
    <org-list v-model="orgList.show" 
      :title="orgList.title" 
      :systype="true"
      :group="orgList.group"
      :infoTabIndex="orgList.infoTabIndex"
      :loadPage="orgList.loader" 
    >
      <div slot="item" slot-scope="org" class="org-item">
        <div class="name">{{org.name}}</div>
        <div class="num">{{org.num}}</div>
      </div>
    </org-list>
  </div>
</template>
<script>
import liquidSpot from "../housekeeper/liquidSpot";
import SwiperAnt from "../components/SwiperAnt";
import { sliceArr } from "@/person-shaoxing/utils/index";
import { mixins } from "../components/minxin";
import { areaStatistics ,orgQuery} from "@/person-shaoxing/api/orgStaffReport";
import { showError } from "@/framework/utils/index";
import OrgList from "../components/OrgList";

export default {
  components: { liquidSpot, SwiperAnt ,OrgList},
  data() {
    return {
      list: [],
      fields: [
        "dzhgzl_xe", //党政机构限额
        "dzjgzl_sy", //党政机构实有
        "hdxzbzqy_sy", //行政编制实有
        "hdxzbzqy", //行政编制核定数
        "hdldzsqy", //行政领导核定
        "hdldzsqy_sy", //行政领导实有

        "syjg_xe", //事业单位限额
        "syjg_sy", //事业单位实有
        "hdsybzbbqy", //事业编核定
        "hdsybzqy_sy", //事业编制实有
        "syhdldzsqy", //事业领导核定
        "syhdldzsqy_sy" //事业领导实有
      ],
      countResult: {},
      orgList: {
        show: false,
        title: "",
        group: undefined,
        infoTabIndex: undefined,
        params: {}
      }
    };
  },
  mixins: [mixins],
  watch: {
    dictId(v) {
      this.getCount(v);
    }
  },
  mounted() {
    this.getCount(this.dictId);
  },
  computed: {
    formatList() {
      let {
        dzjgzl_sy = 0, dzhgzl_xe = 0,
        hdxzbzqy = 0, hdxzbzqy_sy = 0,
        hdldzsqy_sy = 0, hdldzsqy = 0,
        syjg_sy = 0, syjg_xe = 0,
        hdsybzbbqy = 0, hdsybzqy_sy = 0,
        syhdldzsqy_sy = 0, syhdldzsqy = 0
      } = this.countResult;
      let list = [
        { 
          name: "行政机构限额", 
          percent: dzjgzl_sy > 0 && dzhgzl_xe > 0 ? dzjgzl_sy/dzhgzl_xe : 0 
        },
        { 
          name: "行政编制核定", 
          percent: hdxzbzqy > 0 && hdxzbzqy_sy > 0 ? hdxzbzqy_sy/hdxzbzqy : 0 ,
          field:'dzqjgbzcks',
          type: 1,
          tabIndex: 1,
          title:'行政编制超编机构列表'
        },
        { 
          name: "行政领导职数配备", 
          percent: hdldzsqy_sy > 0 && hdldzsqy > 0 ? hdldzsqy_sy/hdldzsqy : 0 ,
          field:'ldzsck',
          type:1 ,
          tabIndex: 2,
          title:'行政领导超职机构列表'
        },
        { 
          name: "事业机构限额", 
          percent: syjg_sy > 0 && syjg_xe > 0 ? syjg_sy/syjg_xe : 0 
        },
        { 
          name: "事业编制核定", 
          percent: hdsybzbbqy > 0 && hdsybzqy_sy > 0 ? hdsybzqy_sy/hdsybzbbqy : 0 ,
          field:'sybzcks',
          type:0,
          tabIndex: 1,
          title:'事业编制超编机构列表'
        },
        { 
          name: "事业领导职数配备", 
          percent: syhdldzsqy_sy > 0 && syhdldzsqy > 0 ? syhdldzsqy_sy/syhdldzsqy : 0 ,
          field:'ldzsck',
          type:0 ,
          tabIndex: 2,
          title:'事业领导超职机构列表'
        }
      ];
      return sliceArr(list, 3);
    }
  },
  methods: {
    showOrgList({percent,field,type,title, tabIndex}) {
      if(!field ||  percent < 1){
        return false
      }
      this.orgList = {
        show: true,
        title: (this.districtName || "") + title,
        group: !!type,
        infoTabIndex: tabIndex,
        loader: (page) => {
          let filters = [
            { field: "_id@organization.statistic." + field, op: "lt", value: 0 }
          ];
          if(page.searchkey){
            filters.push({ field: "name", op: "regex", value: page.searchkey })
          }
          if(page.systype){
            filters.push({ field: "systype", op: "eq", value: page.systype })
          }
          return orgQuery({
            district: this.dictId, 
            unittypes: type ? [1, 5, 7] : [2, 3, 11],
            filters,
            fields: [
              { key: 'suporg', showname: '主管单位' },
              { key: "_id@organization.statistic." + field, showname: '超空数' }
            ],
            ...page,
          }).then(({result: {total, pagenum, pagesize, rows}}) => {
            return {
              result: {
                total, pagenum, pagesize,
                rows: rows.map(item => {
                  return {
                    _id: item._id,
                    name: item.name,
                    suporg: item.suporg,
                    num: item['_join0.' + field]
                  }
                })
              }
            }
          })
        }
      };
    },   
    getCount(dictId) {
      areaStatistics(dictId, this.fields)
        .then(res => {
          this.countResult = res.result;
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.wrap {
  .title {
    margin: 0px;
    height: 65px;
    background: url("../img/dote.png") repeat;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 65px;
      width: 40px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      opacity: 1;
    }
  }
  .content {
    width: 695px;
    position: relative;
    .list {
      display: flex;
      .item {
        flex: 1;
        .tip {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 20px;
          color: #ffffff;
          opacity: 0.8;
          margin: 0px;
          text-align: center;
          padding: 16px 0px;
        }
        .liquid-spot {
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }
      }
    }
  }
}
.org-item{
  display: flex;
  .name{
    flex: auto;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .num{
    flex: none;
    color: #8fc7ff;
    margin-left: 10px;
  }
}
</style>