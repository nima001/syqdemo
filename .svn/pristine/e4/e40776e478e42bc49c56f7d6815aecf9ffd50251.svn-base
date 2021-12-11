<template>
  <div class="chart-layout">
    <div class="layout-content">
      <div class="settings-panel">
        <div class="top">
          <div class="subject">
            <div class="title title-font">分析主题</div>
            <div class="title-option menu">
              <ul>
                <li
                  v-for="(item, index) in menus"
                  :key="index"
                  @click="active(item)"
                  :class="{ active: checkActive(item), disabled: loading }"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="title">分析条件</div>
            <div class="title-option">
              <component
                :is="history"
                :typeActive="typeActive"
                :data.sync="data"
                :district="district"
                :orglineid="orglineid"
                :checked.sync="checked"
                :loading.sync="loading"
                :columns.sync="columns"
                :tableData.sync="tableData"
                :codesvalue.sync="codesvalue"
                :pagination.sync="pagination"
                :selectdisAll.sync="selectdisAll"
                :conditionActive.sync="conditionActive"
                @qlsxLine="qlsxLine"
                @qlsxIncode="qlsxIncode"
                @qlsxdateLine="qlsxdateLine"
                @chagedistrict="chagedistrict"
                @qlsxsearchOrg="qlsxsearchOrg"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="content-panel">
        <div class="top">
          <div>
            <a-select :disabled="this.loading" v-if="this.history==='history'||this.history==='transformation'" :default-value="1" @change="handleChange">
              <a-select-option v-for="item in type" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
            </a-select>
          </div>
          <div >
            <a-button type="primary" v-if="!(this.businesstList.length&&this.history==='history')" :disabled="this.loading||!this.tableData.length" ghost @click="exportExcel">
              <a-icon type="export" :rotate="270" />导出
            </a-button>
            <a-button type="primary" :disabled="this.loading" v-if="this.businesstList.length&&this.history==='history'" @click="shaoxingOrgline">条线对比</a-button>
          </div>
        </div>
        <div class="content">
          <task-progress
            :taskid="taskid"
            defaultInfo="请稍候..."
            @finish="onProgressFinish"
          />
          <div class="condition">
            <div class="orglineshow" v-if="(this.history === 'orgline'||this.history === 'issue')&&this.districtnum>1">
              <span :class="[{ disabled: this.loading, active: chooseActive('all') }, 'all']" @click="clickActive('all')">全部事项</span>
              <span class="title">共性区域数：</span>
              <ul :class="{ disabled: this.loading }">
                <li v-for="item in districtnum" :key="item" @click="clickActive(item)" :class="[{ active: chooseActive(item) }]">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="transhow" v-if="this.history === 'transformation'&&this.tableData.length">
              <span @click="clickActive('region')" :class="['regin', { active: chooseActive('region'), disabled: this.loading }]" >按区划</span>
              <span @click="clickActive('type')" :class="['type', { active: chooseActive('type'), disabled: this.loading }]" >按分类</span>
            </div>
          </div>
          <div class="data">
            <tableconsole
              :loading="loading"
              :columns="columns"
              :history="history"
              :district="district"
              :tableData="tableData"
              :pagination.sync="pagination"
              :businesstList="businesstList"
              :conditionActive.sync="conditionActive"
              @qlsxLine="qlsxLine"
              @qlsxIncode="qlsxIncode"
              @chageorgid="chageorgid"
              @qlsxHistory="qlsxHistory"
              @qlsxdateLine="qlsxdateLine"
              @qlsxsearchOrg="qlsxsearchOrg"
              @authoritysearch="authoritysearch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Select } from "ant-design-vue";
import history from "./components/history.vue";
import issue from "./components/issue.vue";
import orgline from "./components/orgline.vue";
import batchview from './components/batchview.vue';
import transformation from "./components/transformation.vue";
import tableconsole from "./components/tableconsole.vue";
import TaskProgress from "@/framework/components/TaskProgress";
import { showError } from "@/framework/utils";
import { assign, cloneDeep, groupBy, pull, find, last, has } from "lodash";
import { download } from "@/framework/api/file";
import { qlsxhistory, qlsxsearchorg, qlsxline, qlsxdateline, qlsxincode, shaoxingorgline, exportexcel } from "@/person-shaoxing/api/assessment";
import { qlsxstatistic, qlsxsearch } from "@/person-shaoxing/api/monitor";
import { validateCom } from "@/framework/api/menu";
const columndata = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: "15%",
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: "权力基本码",
    dataIndex: "quanlicode",
    key: 'quanlicode',
    width: "15%",
  },
  {
    title: "权力事项名称",
    dataIndex: "quanliname",
    key: "quanliname",
    width: "70%",
  }
];
export default {
  components: {
    issue,
    orgline,
    history,
    batchview,
    AIcon: Icon,
    tableconsole,
    TaskProgress,
    transformation,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  data() {
    return {
      data: [], //接口返回数据
      columndata,//按时间查看区域历史情况--权力事项表头初始数据
      columns: [], //表头数据
      tableData: [], //表格显示数据
      loading: true,
      districtnum: 0,//共性区域数
      pagination: {},
      codesvalue: undefined,//权力基本码
      businesstList:[],//权力事项列表
      taskid: undefined,//异步任务id
      history: undefined,//主题选中项
      checked: undefined,//index跳转details，区间类型的选中值
      selectdisAll: false,//是否全选地区
      methodname: undefined, //表格点击事件名
      orglineid: [],//'条线对比'查询出的条线id
      qlsxhistory: false,
      qlsxtransformation: false,
      qlsxbatch: false,
      conditionActive: 'region',
      menus: [],
      type: [{id: 1, name: '全部'},{id: 2, name: '主项'},{id: 3, name: '叶子事项'}],
      typeActive: 1,
    };
  },
  computed: {
    district() {
      return this.$store.getters.dict("usermanage.org.district");
    },
    businesst() {
      return this.$store.getters.dict("person.business.businesstype");
    },
  },
  async mounted() {
    await this.valiDateCom('/person/qlsx/history')
    await this.valiDateCom('/person/qlsx/transformation');
    await this.valiDateCom('/person/qlsx/batch');
    let menu = [
        { name: "按地区分布查看发布情况", condition: "history" },
        { name: "按条线部门查看发布情况", condition: "orgline" },
        { name: "按时间趋势查看发布情况", condition: "transformation" },
        { name: "按权力基本码查看发布情况", condition: "issue" },
        { name: "自定义查看发布情况", condition: "batchview" },
      ];
    if(!this.qlsxhistory) {
      pull(menu,find(menu,{ name: "按地区分布查看发布情况", condition: "history" }));
    }
    if(!this.qlsxtransformation) {
      pull(menu,find(menu,{ name: "按时间趋势查看发布情况", condition: "transformation" }));
    }
    if(!this.qlsxbatch) {
      pull(menu,find(menu,{ name: "自定义查看发布情况", condition: "batchview" }));
    }
    this.menus = cloneDeep(menu);
    this.data = [];
    this.tableData = [];
    if(this.$route.params.checked) {
      this.checked = this.$route.params.checked;
    }
    if(this.$route.params.codes) {
      this.codesvalue = this.$route.params.codes;
    }
    if(this.$route.params.active) {
      this.history = this.$route.params.active;
      if(this.history === 'issue') {
        this.selectdisAll = true;
      }
    }else{
      this.loading =false;
      this.history = this.menus[0].condition;
    }
  },
  methods: {
    handleChange(val) {
      this.typeActive = val;
      this.pagination.type = val;
      if(this.history==='history') {
        this.chagedistrict();
      }else if(this.history==='transformation') {
        this.qlsxdateLine(this.pagination);
      }
    },
    async valiDateCom(url) {
      await validateCom(url)
        .then(({ result }) => {
          let permitname = `qlsx${last(url.split('/'))}`;
          this[permitname] = result;
        })
        .catch((err) => {
          showError(err);
        });
    },
    //区域数切换
    clickActive(item) {
      this.conditionActive = item;
      if(this.history === 'issue') {
        assign(this.pagination, {pagenum: 1, total: 0});
        this.qlsxsearchOrg(this.pagination);
      }else if(this.history === 'orgline') {
        assign(this.pagination, {pagenum: 1, total: 0});
        this.qlsxLine(this.pagination);
      }
    },
    //按区划或按分类切换
    chooseActive(item) {
      return this.conditionActive === item;
    },
    checkActive(item) {
      return this.history === item.condition;
    },
    //主题切换
    active(item) {
      if (!this.loading) {
        if(this.history !== item.condition) {
          this.data = [];
          this.columns = [];
          this.tableData = [];
          this.orglineid = [];
          this.districtnum = 0;
          this.taskid = undefined;
          this.history = item.condition;
          if (this.history === "issue"||this.history === "orgline") {
            this.conditionActive = "all";
          } else if (this.history === "transformation") {
            this.conditionActive = "region";
          } else {
            this.conditionActive = undefined;
          }
        }
      }
    },
    chagedistrict() {
      let result = this.district.filter((item)=>item.text===this.pagination.district);
      if(result.length||this.pagination.district==='绍兴市') {
        this.businesstList = [];
        this.qlsxHistory(this.pagination);
      }else{
        this.chageorgid(this.pagination);
      }
    },
    async chageorgid(val) {
      this.businesstList = cloneDeep(this.businesst);
      if (this.businesstList[0].key != "total") {
        this.businesstList.unshift({ key: "total", text: "全部", value: 0 });
      }
      await this.qlsxslist(val);
      this.authoritysearch(val);
    },
    exportExcel() {
      let type = {};
      let data = cloneDeep(this.pagination);
      data.pagesize = undefined;
      if(this.history==='history') {
        type.type = 1;
      }else if(this.history==='issue') {
        type.type = 2;
      }else if(this.history==='orgline') {
        type.type = 3;
      }else if(this.history==='transformation') {
        type.type = 4;
        if(this.conditionActive==='region') {
          data.statisticMode = 1;
        }else if(this.conditionActive==='type') {
          data.statisticMode = 2;
        }
      }else if(this.history==='batchview') {
        type.type = 5;
      }
      exportexcel(data,type)
        .then((res)=>{
          if(res.result) {
            this.taskid = res.result;
          }
        }).catch((err)=>{
          showError(err);
        });
    },
    onProgressFinish(res) {
      if(res) {
        download(res);
      }
    },
    //按时间查看区域历史情况--权力事项头部条件
    qlsxslist(data) {
      qlsxstatistic(data.orgid)
        .then((res) => {
          if (res.result) {
            this.businesstList = this.businesst;
            if (this.businesstList[0].key != "total") {
              this.businesstList.unshift({ key: "total", text: "全部", value: 0 });
            }
            this.businesstList.forEach((item) => {
              item["num"] = res.result.data[item.key];
            });
          } else {
            this.tableData = [];
          }
        })
        .catch((err) => {
          showError(err);
        });
    },
    //处理权力事项表格数据
    qlsxData(data) {
      let orgname = [];
      this.tableData = [];
      data.forEach((item, index) => {
        this.tableData.push({ key: index, quanlicode: item.quanlicode, name: item.name, });
        orgname = groupBy(item.orgList, "district");
        this.loadchildren(orgname, index, item);
      });
    },
    //处理子节点
    loadchildren(orgname, index, tableitem) {
      for (let a in orgname) {
        let childnode = [];
        let names = {};
        //处理父节点数据
        names[a] = orgname[a][0].orgname;
        assign(this.tableData[index], names);
        //处理子节点数据
        if (orgname[a].length > 1) {
          //删除第一行数据，将剩下的数据放入children属性中
          orgname[a].splice(0, 1);
          orgname[a].forEach((nameItem, nameIndex) => {
            nameItem.key = `${this.tableData[index].quanlicode}${nameItem.orgname}`;
            nameItem[nameItem.district] = nameItem.orgname;
            childnode.push(nameItem);
          });
          // 合并数据
          this.tableData[index].children = childnode;
        }
      }
    },
    //按时间查看区域历史情况--权力事项表格数据
    authoritysearch(data) {
      this.loading = true;
      qlsxsearch(data)
        .then((res) => {
          this.loading = false;
          if(res.result) {
            this.columns = this.columndata;
            res.result.rows.forEach((item,index)=>{
              res.result.rows[index].key = item.id;
            })
            this.tableData = res.result.rows;
            delete res.result.rows;
          }else{
            this.data = [];
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            });
          }
          if(res.result.total) {
            assign(this.pagination, res.result);
          }else{
            this.pagination.total = 0;
            this.pagination.pagenum = 1;
          }
        })
        .catch((err) => {
          this.loading = false;
          showError(err);
        });
    },
    //按时间查看区域历史情况
    qlsxHistory(data) {
      this.loading = true;
      qlsxhistory(data)
        .then((res) => {
          this.loading = false;
          if (res.result) {
            this.data = res.result.rows;
            delete res.result.rows;
            if(res.result.total) {
              assign(this.pagination, res.result);
            }else{
              this.pagination.total = 0;
              this.pagination.pagenum = 1;
            }
          }else{
            this.data = [];
            this.pagination.total = 0;
            this.pagination.pagenum = 1;
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.tableData=[];
          showError(err);
        });
    },
    //按权利基本码对比具体事项
    qlsxsearchOrg(data) {
      this.loading = true;
      if(typeof this.conditionActive !== 'string') {
        this.pagination.count = this.conditionActive;
      }else{
        this.pagination.count = undefined;
      }
      qlsxsearchorg({ ...data, count: this.pagination.count })
        .then((res) => {
          this.loading = false;
          if(data.districts.length>1) {
            this.districtnum = data.districts.length;
          }else{
            this.districtnum = 0;
          }
          if(res.result) {
            this.qlsxData(res.result.rows);
            delete res.result.rows;
            assign(this.pagination, res.result);
          }else{
            this.tableData = [];
            this.pagination.total = 0;
            this.pagination.pagenum = 1;
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.tableData = [];
          showError(err);
        });
    },
    //按条线部门对比具体事项
    qlsxLine(data) {
      this.loading = true;
      if(typeof this.conditionActive !== 'string') {
        this.pagination.count = this.conditionActive;
      }else{
        this.pagination.count = undefined;
      }
      qlsxline({...data, count: this.pagination.count })
        .then((res) => {
          this.loading = false;
          if(data.districts.length>1) {
            this.districtnum = data.districts.length;
          }else{
            this.districtnum = 0;
          }
          if (res.result) {
            let datas = [];
            if(has(res.result,'rows')&&res.result.rows.length) {
              res.result.rows.forEach((item, index) => {
                let row = {};
                row.quanlicode = item.quanlicode;
                row.name = item.name;
                row.key = index;
                item.orgList.forEach((orgItem) => {
                  this.columns.forEach((colItem, colIndex) => {
                    if (colItem.dataIndex === orgItem.orgid) {
                      row[`${colItem.dataIndex}`] = true;
                    }
                  });
                });
                datas.push(row);
              });
            }
            this.tableData = datas;
            assign(this.pagination, res.result);
          }else{
            this.pagination.total = 0;
            this.pagination.pagenum = 1;
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.tableData = [];
          showError(err);
        });
    },
    //按时间查看区域（机构）趋势
    qlsxdateLine(data) {
      this.loading = true;
      qlsxdateline(data)
        .then((res) => {
          this.loading = false;
          if(res.result) {
            this.data = res.result.rows;
            delete res.result.rows;
          }
          if(res.result.total) {
            assign(this.pagination, res.result);
          }else{
            this.pagination.total = 0;
            this.pagination.pagenum = 1;
          }
        })
        .catch((err) => {
          this.tableData = [];
          this.loading = false;
          showError(err);
        });
    },
    //批量查看事项发布情况
    qlsxIncode(data) {
      this.loading = true;
      qlsxincode(data)
        .then((res) => {
          this.loading = false;
          if(res.result) {
            this.qlsxData(res.result.rows);
            delete res.result.rows;
            if(res.result.total) {
              assign(this.pagination, res.result);
            }else{
              this.pagination.total = 0;
              this.pagination.pagenum = 1;
            }
          }else{
            this.pagination.total = 0;
            this.pagination.pagenum = 1;
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            });
          }
        })
        .catch((err) => {
          this.tableData = [];
          this.loading = false;
          showError(err);
        });
    },
    //根据组织查询条线ID
    shaoxingOrgline() {
      shaoxingorgline({ orgid: this.pagination.orgid}).then((res)=>{
        if(res.result) {
          this.businesstList = [];
          this.tableData = [];
          this.orglineid = [];
          this.orglineid.push(res.result);
          this.history = 'orgline';
          this.conditionActive = "all";
        }else{
          this.$notification.warning({
            message: '提示',
            description: '未查询到条线',
            duration: 3,
          })
        }
      }).catch((err)=>{
        showError(err);
      });
    }
  },
};
</script>
<style scoped lang="less">
.chart-layout {
  height: 100%;
  width: 100%;
  display: flex;
  padding: @layout-space-base;
  .layout-content {
    flex: 1;
    width: 100%;
    display: flex;
    .settings-panel {
      height: 100%;
      max-width: 248px;
      min-width: 248px;
      width: 248px;
      display: flex;
      flex-direction: column;
      border-radius: @border-radius-base;
      background: #ffffff;
      margin-right: @layout-space-base;
      & .top {
        height: 100%;
        .subject {
          height: 100%;
        }
        .title {
          font-weight: bold;
          color: @primary-color;
          padding: @padding-xs;
          background-color: rgb(250, 251, 252);
        }
        .title-option {
          padding: @padding-xs;
          overflow-y: auto;
          background-color: #ffffff;
          ul {
            margin-bottom: 0;
            li {
              user-select: none;
              margin: @padding-md 0;
              cursor: pointer;
            }
            li.active {
              color: @primary-color;
            }
            li.disabled {
              color: rgba(0, 0, 0, 0.35);
              border-color: #d9d9d9;
              cursor: not-allowed;
            }
          }
        }
        .title-option.menu {
          height: 30%;
        }
        .title-option:last-child {
          height: 55%;
        }
      }
      .active {
        color: @primary-color;
      }
    }
    .content-panel {
      height: 100%;
      display: flex;
      min-width: 0;
      flex-direction: column;
      flex: 1;
      background: #ffffff;
      border-radius: @border-radius-base;
      & .top {
        padding: @padding-md @padding-lg;
        box-shadow: 0px 3px 6px 0px @primary-1;
        display: flex;
        justify-content: space-between;
        div {
          .ant-select {
            width: 200px;
          }
          .ant-btn {
            margin-right: @padding-lg;
          }
        }
      }
      .content {
        overflow: auto;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        padding: @content-padding-v @content-padding-h;
        .condition {
          padding: @padding-md 0;
          .orglineshow {
            display: flex;
            align-items: center;
            .all {
              padding: 2px 12px;
              background-color: rgb(246, 248, 251);
              border-radius: 50px;
              user-select: none;
              margin-right: 12px;
              transition: all .3s;
              cursor: pointer;
              &.active.disabled {
                color: #ffffff;
                background-color: @primary-2;
              }
              &.disabled {
                color: rgba(0, 0, 0, 0.35);
              }
            }
            .title {
              margin-right: 12px;
            }
            ul {
              background-color: rgb(246, 248, 251);
              border-radius: 50px;
              display: flex;
              flex-direction: row-reverse;
              margin-bottom: 0;
              &.disabled {
                color: rgba(0, 0, 0, 0.35);
                background-color: #f5f5f5;
                border-color: #d9d9d9;
                cursor: not-allowed;
                li.active {
                  background-color: @primary-2;
                }
              }
              li {
                padding: 2px 12px;
                border-radius: 50px;
                transition: all .3s;
                user-select: none;
                cursor: pointer;
              }
            }
            .active {
              color: #ffffff;
              background-color: @primary-color;
            }
          }
          .transhow {
            display: flex;
            align-items: center;
            .regin,
            .type {
              padding: 2px 12px;
              border-radius: 50px;
              user-select: none;
              margin-right: 12px;
              transition: all .3s;
              cursor: pointer;
            }
            .active.disabled{
              background-color: @primary-2;
              border-color: #d9d9d9;
              cursor: not-allowed;
            }
            .disabled:not(.active) {
              color: #f5f5f5;
            }
            .active {
              color: #ffffff;
              background-color: @primary-color;
            }
          }
        }
        .data {
          flex: 1;
          .content {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
