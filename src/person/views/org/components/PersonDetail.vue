 <template>
  <div class="person-detail" ref="personDetail">
    <div class="top-btn">
      <a v-for="(item,index) in btnList" :key="index"
        class="topbtn"
        :class="{'act-btn': item == nowTab}"
        @click="changeType(item)"
      >{{item.name}}</a>
    </div>
    <div class="personlist">
      <div class="top">
        <div class="left">
          <a-button @click="handleExport"><a-icon type="upload"/>导出</a-button>
          <a-button v-if="nowTab.usertype == 2 || nowTab.usertype == 3" @click="deleteUser">减员</a-button>
        </div>
        <div class="right">
          <a-select v-if="nodeid" class="search-item scope" v-model="choice">
            <a-select-option :value="1">本级</a-select-option>
            <a-select-option :value="2">包含下级</a-select-option>
          </a-select>
          <dict-select dict="usermanage.user.postkind"
            v-if="!nowTab.usertype || nowTab.usertype==1"
            v-model="properties.postkind"
            placeholder="请选择人员分类"
            allowClear
            class="search-item"
          />
          <dict-select dict="usermanage.user.identitytype"
            v-if="!nowTab.usertype || nowTab.usertype==1"
            v-model="properties.identitytype"
            placeholder="请选择本人身份"
            allowClear
            class="search-item"
          />
          <a-input
            class="inputBox"
            placeholder="身份证、姓名或手机查询"
            style="width: 200px"
            allowClear
            v-model="keyWord"
          />
          <a-button class="searchBt" type="primary" @click="onSearch">搜索</a-button>
        </div>
      </div>
      <a-table
        class="per-table"
        rowKey="_id"
        :columns="nowTab.columns"
        :dataSource="pagination.rows"
        :rowClassName="(row) => pagination.selected && pagination.selected._id == row._id ? 'selected': ''"
        :customRow="customRow"
        :pagination="false"
        :loading="loading"
        >
        <div class="table-tr" slot="username" slot-scope="record">
          <span v-if="showWorkStatus" style="padding-right:3px">
            <img v-if="record._work && record._work.workstatus==5" class="worstatus" src="../../../assets/img/icon-workstatus-jd.png"/>
            <img v-else-if="record._work && record._work.workstatus==3" class="worstatus" src="../../../assets/img/icon-workstatus-dg.png" />
            <img v-else-if="record._work && record._work.workstatus==2" class="worstatus" src="../../../assets/img/icon-workstatus-jz.png" />
            <img v-else-if="record._work && record._work.workstatus==4" class="worstatus" src="../../../assets/img/icon-workstatus-gz.png" />
            <span class="worstatus" v-else />
          </span>
          <custom-icon type="user" :object="record" class="icon" />
          {{record.username}}
        </div>
      </a-table>
      <div class="footer">
        <a-pagination
          v-if="pagination.rows && pagination.rows.length"
          showSizeChanger
          :showTotal="total => `总共：${total}人`"
          @showSizeChange="onShowSizeChange"
          :total="pagination.total"
          :pageSize="pagination.pagesize"
          v-model="pagination.pagenum"
          @change="onPageChange"
        />
      </div>
    </div>
    <!-- 减员信息 -->
    <a-modal
      :footer="null"
      v-model="uservisible"
      :width="800"
      title="人员信息"
      :destroyOnClose="true"
      :bodyStyle="{ height: '600px', padding: '0'}"
      >
      <reduce-people :selected="pagination.selected" @finish="finishDeleteUser"></reduce-people>
    </a-modal>
    <TaskProgress :taskid="taskid" defaultInfo="正在导出" @finish="onProgressFinish"/>
  </div>
</template>
<script>
import { Row, Col, Button, Select, Input, Table, Pagination, Modal, Icon } from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import CustomIcon from "@/framework/components/CustomIcon";
import ReducePeople from "./ReducePeople";
import moment from "moment";
import { userquery, deptuserquery, userQueryExport, deptUserQueryExport } from "@/person/api/user";
import { showError } from "@/framework/utils/index";
import { download } from "@/framework/api/file";
import TaskProgress from "@/framework/components/TaskProgress";

export default {
  props: ["org", "nodeid", "treeid"],
  components: {
    ARow: Row,
    ACol: Col,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    ATable: Table,
    APagination: Pagination,
    AModal: Modal,
    AIcon: Icon,
    CustomIcon,
    DictSelect,
    ReducePeople,
    TaskProgress
  },
  data() {
    let columns = [
      { title: "序号", width: "45px", customRender: this.indexRender },
      { title: "姓名", width: "110px", scopedSlots: { customRender: "username" } },
      { title: "性别", width: "45px", dataIndex: "sex", customRender: this.dictRender("usermanage.user.sex"),},
      { title: "出生年月", width: "10%", dataIndex: "birthday", customRender: text => moment(text).format("YYYY-MM-DD") },
      { title: "所在处室", width: "10%", dataIndex: "_work.workdept.name", customRender: text => <span title={text}>{text}</span>},
      { title: "任职名称", width: "15%", dataIndex: "_work.workposition", customRender: text => <span title={text}>{text}</span> },
      { title: "职务级别", width: "10%", dataIndex: "_work.workpositionlevel", customRender: this.dictRender("usermanage.user.positionlevel") },
      { title: "人员分类", width: "160px", dataIndex: "_work.workpostkind", customRender: this.dictRender("usermanage.user.postkind") },
      { title: "本人身份", width: "80px", dataIndex: "identitytype", customRender: this.dictRender("usermanage.user.identitytype") },
      { title: "编制类型", width: "80px", dataIndex: "complietype", customRender: this.dictRender("usermanage.user.complietype") },
      { title: "编制单位", width: "15%", dataIndex: "org.shortname",　customRender: text => <span title={text}>{text}</span>}
    ];
    return {
      tabs: [
        {
          name: "在编人员",
          usertype: 1,
          scope: "ORG",
          columns: columns
        },
        {
          name: "编外人员",
          usertype: 2,
          scope: "ORG",
          columns: [
            { title: "序号", width: "45px", customRender: this.indexRender },
            {
              title: "姓名",
              width: "110px",
              scopedSlots: { customRender: "username" }
            },
            {
              title: "性别",
              dataIndex: "sex",
              customRender: this.dictRender("usermanage.user.sex"),
              width: "45px"
            },
            {
              title: "出生年月",
              dataIndex: "birthday",
              width: "10%",
              customRender: text => moment(text).format("YYYY-MM-DD")
            },
            {
              title: "岗位描述",
              dataIndex: "jobmemo",
              width: "20%",
              customRender: text => <span title={text}>{text}</span>
            },
            {
              title: "用工形式",
              dataIndex: "employform",
              width: "20%",
              customRender: this.dictRender("usermanage.user.employform")
            },
            {
              title: "人员归类",
              dataIndex: "ratedcontrol",
              width: "20%",
              customRender: this.dictRender("usermanage.user.ratedcontrol")
            }
          ]
        },
        {
          name: "政府雇员",
          usertype: 3,
          scope: "ORG",
          columns: [
            { title: "序号", width: "45px", customRender: this.indexRender },
            {
              title: "姓名",
              width: "110px",
              scopedSlots: { customRender: "username" }
            },
            {
              title: "性别",
              dataIndex: "sex",
              customRender: this.dictRender("usermanage.user.sex"),
              width: "45px"
            },
            {
              title: "出生年月",
              dataIndex: "birthday",
              width: "10%",
              customRender: text => moment(text).format("YYYY-MM-DD")
            },
            {
              title: "所在处室",
              dataIndex: "dept.name",
              width: "20%",
              customRender: text => <span title={text}>{text}</span>
            },
            {
              title: "任职名称",
              dataIndex: "position",
              width: "25%",
              customRender: text => <span title={text}>{text}</span>
            },
            {
              title: "职务级别",
              dataIndex: "positionlevel",
              width: "10%",
              customRender: this.dictRender("usermanage.user.positionlevel")
            }
          ]
        },
        {
          name: "在职人员",
          scope: "WORKORG",
          columns: columns
        }
        // { name: "新近人员", usertype: "zb" },
        // { name: "减少人员", usertype: "zb" }
      ],
      loading: false,
      showWorkStatus: false,
      choice: 1,
      btnList: [],
      nowTab: undefined,
      properties: {},
      keyWord: undefined,
      pagination: {
        selected: undefined,
        rows: null,
        pagesize: 20,
        pagenum: 1,
        total: 0
      },
      uservisible: false,
      taskid: undefined,
      proper: null
    };
  },
  created() {
    if (this.org && this.org.unittype) {
      this.btnList = this.tabs;
    } else {
      this.btnList = [this.tabs[2]];
    }
    this.nowTab = this.btnList[0];
    this.getUser(this.pagination);
  },
  activated(){
    this.getUser(this.pagination);
  },
  watch: {
    org(val) {
      if (this.org && this.org.unittype) {
        this.btnList = this.tabs;
      } else {
        this.btnList = [this.tabs[2]];
      }
      if (this.btnList.indexOf(this.nowTab) < 0) {
        this.nowTab = this.btnList[0];
      }
      this.getUser({pagesize: 20, pagenum: 1});
    },
    nowTab: {
      handler(val) {
        switch(val.usertype) {
          case 1:
            this.proper = '[{"key":"username","name":"姓名"},{"key":"sex","name":"性别"},{"key":"birthday","name":"出生年月"},{"key":"dept.name","name":"所在处室"},{"key":"position","name":"任职名称"},{"key":"positionlevel","name":"职务级别"},{"key":"postkind","name":"人员分类"},{"key":"identitytype","name":"本人身份"},{"key":"complietype","name":"编制类型"},{"key":"org.shortname","name":"编制单位"}]';
            break;
          case 2:
            this.proper = '[{"key":"username","name":"姓名"},{"key":"sex","name":"性别"},{"key":"birthday","name":"出生年月"},{"key":"jobmemo","name":"岗位描述"},{"key":"employform","name":"用工形式"},{"key":"ratedcontrol","name":"人员归类"}]';
            break;
          case 3: 
            this.proper = '[{"key":"username","name":"姓名"},{"key":"sex","name":"性别"},{"key":"birthday","name":"出生年月"},{"key":"dept.name","name":"所在处室"},{"key":"position","name":"任职名称"},{"key":"positionlevel","name":"职务级别"}]';
            break;
          default: 
            this.proper = '[{"key":"username","name":"姓名"},{"key":"sex","name":"性别"},{"key":"birthday","name":"出生年月"},{"key":"dept.name","name":"所在处室"},{"key":"position","name":"任职名称"},{"key":"positionlevel","name":"职务级别"},{"key":"postkind","name":"人员分类"},{"key":"identitytype","name":"本人身份"},{"key":"complietype","name":"编制类型"},{"key":"org.shortname","name":"编制单位"}]';
        }
      }
    }
  },
  methods: {
    changeType(val) {
      if (val != this.nowTab) {
        this.choice = 1;
        this.properties = {};
        this.nowTab = val;
        this.pagination = {pagesize: 20, pagenum: 1};
        this.getUser(this.pagination);
      }
    },
    indexRender(text, row, index){
      let p = this.pagination;
      return (p.pagenum - 1) * p.pagesize + index + 1;
    },
    dictRender(key) {
      return (text, row, index) => {
        let v = this.$store.getters.dictKey(key, text);
        text = (v && v.text) || "";
        return <span title={text}>{text}</span>;
      };
    },
    customRow(row){
      return {
        on: {
          click: () => {
            this.$set(this.pagination, 'selected', row);
          },
          dblclick: (event) => {
            this.$router.push({name: 'orgUserInfo', query: { userid: row._id }});
          },
        }
      };
    },
    onPageChange(pagenum, pagesize) {
      this.getUser({pagesize, pagenum});
    },
    onShowSizeChange(current, pagesize) {
      this.getUser({pagesize, pagenum: 1});
    },
    onSearch() {
      let {pagesize} = this.pagination
      this.getUser({pagesize, pagenum: 1});
    },
    getParams(page) {
      if (this.nodeid) {
        const params = {
          scope: this.nowTab.scope,
          treeid: this.treeid,
          nodeid: this.nodeid,
          usertype: this.nowTab.usertype,
          needtotal: true,
          searchkey: this.keyWord,
          properties: this.properties,
          ...page,
        };
        if (this.choice == 1) {
          params.orgid = this.org._id;
        }
        return params;
      } else {
        const params = {
          orgid: this.org._id,
          scope: this.nowTab.scope,
          usertype: this.nowTab.usertype,
          ...page,
          needtotal: true,
          searchkey: this.keyWord,
          properties: this.properties
        };
        return params;
      }
    },
    getUser(page) {
      if (!this.org) {
        return;
      }
      this.loading = true;
      let request;
      if(this.nodeid) {
        request = userquery(this.getParams(page));
      }else{
        request = deptuserquery(this.getParams(page));
      }
      request.then(({result}) => {
        this.pagination = result;
        let showWorkStatus = false;
        result.rows.forEach(element => {
          if(element._work){//有工作信息，根据工作信息的workstatus判断兼职顶岗
            if(element._work.workstatus){
              showWorkStatus = true;
            }
          }else{//没有工作信息设置编制信息到工作信息中
            element._work = { 
              workorg: element.org,
              workdept: element.dept,
              workpostkind: element.postkind,
              workposition: element.position,
              workpositionlevel: element.positionlevel,
            };
          }
        });
        this.showWorkStatus = showWorkStatus;
        this.loading = false;
      }).catch(error => {
        this.pagination = {};
        this.loading = false;
        showError(error);
      });
    },
    handleExport() {
      let title;
      if (this.nodeid) {
        title = this.org.shortname + this.nowTab.name;
        userQueryExport(this.getParams({}), title, this.proper).then(res => {
          this.taskid = res.result;
        }).catch(err => {
          showError(err);
        })
      } else {
        title = this.org.name + this.nowTab.name;
        deptUserQueryExport(this.getParams({}), title, this.proper).then(res => {
          this.taskid = res.result;
        }).catch(err => {
          showError(err);
        })
      }
    },
    onProgressFinish(uri){
      download(uri);
    },
    finishDeleteUser(data) {
      if(data == "ok") {
        this.uservisible = false;
        this.getUser(this.pagination);
      }
    },
    deleteUser() {
      if(!this.pagination.selected) {
        return this.$message.warning('请选择需要删除的数据');
      }
      this.uservisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.person-detail {
  height: 100%;
  flex-direction: column;
  display: flex;
  .top-btn {
    width: 100%;
    height: auto;
    padding: @content-padding-v @content-padding-h;
    background-image: linear-gradient(to right, #fcfcfc, @primary-1);
    .topbtn {
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      padding: 0 14px;
      float: left;
      border-radius: 3px;
      margin-right: 5px;
      color: @text-color;
      &:hover {
        background-color: @primary-1;
        color: @primary-color;
      }
      &.act-btn {
        background-color: @primary-2;
        color: @primary-color;
      }
    }
  }
  .personlist {
    flex: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    .top {
      padding: @content-padding-v/2 @content-padding-h @content-padding-v @content-padding-h;
      .left {
        float: left;
        margin-top: @content-padding-v/2;
        .ant-btn {
          margin-right: 10px;
          color: @primary-color;
          border-color: @primary-color;
        }
      }
      .right {
        margin-top: @content-padding-v/2;
        float: right;
        // line-height: 32px;
        .ant-select {
          margin-left: 5px;
        }
        .search-item {
          width: 180px;
          margin: 0 5px 0 0;
          &.scope {
            width: 100px;
          }
        }
        .searchBt {
          background-color: @primary-color;
          border: 0;
          color: @white;
          margin-left: 5px;
        }
      }
    }
    .per-table {
      flex-shrink: 1;
      min-height: 0;
      padding: 0 @content-padding-h;
      overflow-y: auto;
      /deep/table {
        table-layout: fixed;
        td,th {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        td{
           padding: 2px 2px;
        }
        tr.selected{
          background: @primary-2;
        }
      } 
      .icon{
        width: 18px;
        height: 18px;
        padding: 1px;
      }
      .table-tr {
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .worstatus {
          width: 16px;
          height: 16px;
          display: inline-block;
        }
      }
    }
    .footer {
      padding: @content-padding-v @content-padding-h;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
  }
}

</style>