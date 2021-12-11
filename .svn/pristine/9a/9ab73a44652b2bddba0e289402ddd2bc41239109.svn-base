<template>
  <div class="examine">
    <div class="topTitle">
      <span class="title" v-if="currentYear">{{currentYear}}年考核结果</span>
      <span class="title" v-else>年考核结果</span>
      <a-divider></a-divider>
    </div>
    <div class="funWrap">
      <div class="left">
        <a-upload
          name="file"
          :customRequest="customRequest"
          class="upload-button"
          :showUploadList="false"
          accept=".xlsx"
          >
          <a-button :disabled="!(hasPermit('/person/examine/govstreetmanager/edit') && disabled)"> 
            <a-icon type="upload" />上传
          </a-button>
        </a-upload>
        <a-button icon="download" @click="downloadTemplate">下载模板</a-button>
      </div>
      <div class="right">
        <a-select 
          showSearch
          :allowClear="true"
          placeholder="年份选择" 
          style="width: 200px"
          optionFilterProp="children"
          @change="handleChange">
          <a-select-option v-for="(item, index) in datasourceSelect" :key="index" :value="index">{{item}}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="countWrap">
      <ul>
        <li>
          <span class="index"></span>
          <span>专职社区工作者总人数</span>
          <span>实际参加考核人数</span>
        </li>
        <li>
          <span class="index"></span>
          <span>{{preset.orgtotal}}</span>
          <span>{{preset.realtotal}}</span>
        </li>
      </ul>
      <a-divider></a-divider>
      <ul>
        <li>
          <span class="index"></span>
          <span>优秀比例</span>
          <span>优秀人数</span>
          <span>合格等次人数</span>
          <span>基本合格等次人数</span>
          <span>不合格等次人数</span>
          <span>未定等次人数</span>
        </li>
        <li>
          <span class="index">预设</span>
          <span>{{preset.percent}}</span>
          <span>{{preset.preexcellent}}</span>
          <span>{{preset.prepass}}</span>
          <span>{{preset.prebasicpass}}</span>
          <span>{{preset.preflunk}}</span>
          <span></span>
        </li>
        <li>
          <span class="index">实际</span>
          <span>{{actual.percent}}</span>
          <span>{{actual.realexcellent}}</span>
          <span>{{actual.realpass}}</span>
          <span>{{actual.realbasicpass}}</span>
          <span>{{actual.realflunk}}</span>
          <span>{{actual.notexamine}}</span>
        </li>
      </ul>
    </div>
    <div class="tableWrap">
      <a-tabs v-model="tabActiveKey" @change="callback">
        <a-tab-pane tab="优秀人员名单" key="1">
          <a-table 
            rowKey="username"
            :columns="columns" 
            :dataSource="tabdata" 
            :pagination="false"
            :loading="loading"
            :scroll="{ y: 350 }"
            >
          </a-table>
        </a-tab-pane>
        <a-tab-pane tab="合格/基本合格/不合格" key="2" forceRender>
          <a-table 
            rowKey="name"
            :columns="columns" 
            :dataSource="tabdata" 
            :pagination="false"
            :loading="loading"
            :scroll="{ y: 350 }"
            >
          </a-table>
        </a-tab-pane>
        <a-icon type="download" v-if="showDowanload" slot="tabBarExtraContent" @click="download" />
      </a-tabs>
      <div class="footer">
        <a-pagination
          v-if="pagination.rows && pagination.rows.length"
          showSizeChanger
          @showSizeChange="onShowSizeChange"
          :showTotal="total => `总共：${total}人`"
          :total="pagination.total"
          :pageSize="pagination.pagesize"
          v-model="pagination.pagenum"
          @change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Upload, Table, Divider, Tabs, Icon, Pagination, Select } from "ant-design-vue";
import { getexamine, getuserinfo, uploaduserinfo, exportexamine } from '@/person/api/examineManage';
import { uiConfigsCookies } from '@/framework/utils/auth';
import { showError } from "@/framework/utils/index";
import moment from "moment";
const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => `${index + 1}`,
    width: "10%"
  },
  {
    title: "姓名",
    dataIndex: "username",
    key: "username",
    ellipsis: true,
    width: "18%"
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
    ellipsis: true,
    width: "18%"
  },
  {
    title: "年龄",
    dataIndex: "birthday",
    key: "birthday",
    ellipsis: true,
    width: "18%"
  },
  {
    title: "岗位",
    dataIndex: "position",
    key: "position",
    ellipsis: true,
    width: "18%"
  },
  {
    title: "考核结果",
    dataIndex: "checkResult",
    key: "checkResult",
    ellipsis: true,
    width: "18%"
  }
];
export default {
  props: ['loadData'],
  data() {
    return {
      orgid: '',
      orgname: '',
      nodeid: '',
      isExcellent: true,
      tabActiveKey: "1",
      columns,
      tabdata: [],
      datasourceSelect: [],
      loading: false,
      showDowanload: true,
      preset: {
        orgtotal: null,
        realtotal: null,
        preexcellent: null,  //  预设优秀人数
        prepass: null,       //  预设合格人数
        prebasicpass: null,  //  预设基本合格人数
        preflunk: null,      //  预设不合格人数
        percent: null        //  预设优秀比例
      },
      actual: {
        year: null,
        realexcellent: null,  //  实际优秀人数
        realpass: null,       //  实际合格人数
        realbasicpass: null,  //  实际基本合格人数
        realflunk: null,      //  实际不合格人数
        notexamine: null,     //  实际未定等次人数
        percent: null         //  实际优秀比例
      },
      total: {
        org: 0,
        real: 0      
      },
      pagination: {
        rows: null,
        pagenum: 1,
        pagesize: 10,
        total: 0
      },
      currentYear: '',
      disabled: true
    };
  },
  components: {
    AButton: Button,
    AUpload: Upload,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    ADivider: Divider,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AIcon: Icon,
    APagination: Pagination
  },
  watch: {
    loadData: function(data) {
      if (data) {
        this.orgid = data.node.data._id;
        this.orgname = data.node.data.name;
        this.nodeid = data.node.id;
        this.getData(this.orgid, this.nodeid);
        this.getTabData(this.orgid, this.currentYear, this.pagination.pagenum, this.pagination.pagesize);
      }
    }
  },
  created() {
    if(this.loadData) {
      this.orgid = this.loadData.node.data._id;
      this.orgname = this.loadData.node.data.name;
      this.nodeid = this.loadData.node.id;
      this.getData(this.orgid, this.nodeid);
      this.getTabData(this.orgid, this.currentYear, this.pagination.pagenum, this.pagination.pagesize);
    }
    this.createYear();
  },
  methods: {
    getData(orgid, nodeid, year) {
      if (this.loadData && this.loadData.node && this.loadData.node.data) {
        getexamine({
          orgid,
          nodeid,
          year
        })
        .then(data => {
          let time = new Date().getFullYear();
          let res = data.result;
          Object.keys(this.preset).forEach(key => {
            this.preset[key] = res[key];
          })
          Object.keys(this.actual).forEach(key => {
            this.actual[key] = res[key];
          })
          this.preset.percent = res.pretotal?(this.preset.preexcellent/res.pretotal).toFixed(2):'';
          this.actual.percent = res.realtotal?(this.actual.realexcellent/res.realtotal).toFixed(2):'';
          this.showDowanload = res.realtotal?true:false;
          //  importuserinfoflag为true 且年份为今年和去年 => 可上传 反之
          if(!year) {
            this.currentYear = res.year?res.year:time -1;
          }
          if(res.importuserinfoflag && this.currentYear == (time -1)) {
            this.disabled = true;
          }else{
            this.disabled = false;
          }
        })
        .catch(err => {
          showError(err);
        })
      }
    },
    getTabData(id, year, pagenum, pagesize) {
      if (this.loadData && this.loadData.node && this.loadData.node.data) {
        this.loading = true;
        getuserinfo({
          "needtotal": true,
          "excellent": this.isExcellent,
          "orgid": id,
          "pagenum": pagenum,
          "pagesize": pagesize,
          "year": year || ''
        })
        .then(data => {
          this.loading = false;
          let rows = data.result.rows;
          this.pagination.rows = rows;
          this.pagination.total = data.result.total;
          rows.forEach(val => {
            val.birthday = this.age(val.birthday);
            val.sex = this.sex(val.sex);
            val.position = this.position(val.position);
            val.checkResult = this.checkResult(val.checkResult);
          })
          this.tabdata = rows;
        })
        .catch(err => {
          showError(err);
        }) 
      }
    },
    customRequest(info) {
      uploaduserinfo({
        orgid: this.orgid,
        file: info.file
      })
      .then(data => {
        let res = data.data;
        if(res.code == "illegal_args" &&  res.message == "参数错误") {
          return this.$message.warning("上传人员不能重复，请重新上传");
        }
        this.$message.success("文件上传成功！");
        this.getData(this.orgid, this.nodeid);
        this.getTabData(this.orgid, this.currentYear, this.pagination.pagenum, this.pagination.pagesize);
        
      })
      .catch(err => {
        showError(err);
      })
    },
    sex(sex){
      let d = this.$store.getters.dictKey("usermanage.user.sex", sex);
      return d && d.text;
    },
    position(position){
      let d = this.$store.getters.dictKey("usermanage.user.postlevel", position);
      return d && d.text;
    },
    checkResult(checkResult){
      let d = this.$store.getters.dictKey("usermanage.org.sndkhqk", checkResult);
      return d && d.text;
    },
    age(birthday) {
      let nowYear = new Date().getFullYear();
      let bornYear = birthday.split('-')[0];
      let age = nowYear - bornYear;
      return age;
    },
    createYear() {
      let year = new Date().getFullYear();
      for(let i = year; i > 1970; i --) {
        this.datasourceSelect.push(i);
      }
    },
    handleChange(value) {
      this.currentYear = this.datasourceSelect[value];
      this.getData(this.orgid, this.nodeid, this.currentYear);
      this.getTabData(this.orgid, this.currentYear, this.pagination.pagenum, this.pagination.pagesize);
    },
    callback(key) {
      this.isExcellent = key == 1?true:false;
      this.getTabData(this.orgid, this.currentYear, this.pagination.pagenum, this.pagination.pagesize);
    },
    download() {
      if (this.loadData && this.loadData.node && this.loadData.node.data) {
        exportexamine({
          "orgid": this.orgid,
          "year": this.actual.year,
          "orgname": this.orgname
        })
        .then(data => {
          let uiConfigs = uiConfigsCookies();
          window.open(uiConfigs['api.url'] + '/file/v1/download?uri=' + encodeURIComponent(data.result));
        })
        .catch(err => {
          showError(err);
        })
      }
    },
    downloadTemplate() {
      let uiConfigs = uiConfigsCookies();
      window.open(uiConfigs['api.url'] + '/file/v1/download?uri=' + uiConfigs['examine.template.url']);
    },
    onPageChange(value) {
      this.getTabData(this.orgid, this.currentYear, value, this.pagination.pagesize);
    },
    onShowSizeChange(current, size) {
      this.pagination.pagesize = size;
      this.getTabData(this.orgid, this.currentYear, current, size);
    },
  }
};
</script>
<style lang='less' scoped>
.examine {
  background-color: @white;
  height: 100%;
  overflow: hidden;
  .topTitle{
    padding: @padding-md @padding-md 0;
    font-size: 15px;
    font-weight: bold;
  }
  .funWrap {
    display: flex;
    justify-content: space-between;
    padding: @padding-md;
    align-items: center;
    .left {
      .upload-button{
        display: inline-block;
      }
      button:last-child {
        margin-left: 16px;
        color: @primary-color;
        border-color: @primary-color;
      }
    }
    .right {
      button {
        margin-left: 16px;
      }
    }
  }
  .countWrap {
    padding: @padding-md;
    ul {
      li {
        display: flex;
        span {
          width: 16%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          line-height: 28px;
          color: @text-color;
          &.index {
            width: 80px;
          }
        }
        &:first-child {
          span {
            color: #000;
            font-size: 14px;
          }
        }
      }
    }
  }
  .tableWrap {
    padding: @padding-md;
    /deep/ .ant-tabs-bar {
      background-color: @primary-2;
    }
    /deep/ .ant-tabs-extra-content {
      padding: 0px 10px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: @primary-color;
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      padding: @content-padding-v 0;
      .ant-pagination {
        margin-bottom: 10px;
      }
    }
  }
}
</style>