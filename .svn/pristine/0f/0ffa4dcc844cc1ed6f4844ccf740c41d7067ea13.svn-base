<template>
  <div class="matterBody" style="height: 500px">
    <div class="header">
      <div>
      </div>
      <!-- <a-select placeholder="--请选择分类--" allowClear @change="handleChange" :disabled="spinning">
        <a-select-option v-for="item in categorys" :key="item.key" :value="item.value">{{item.text}}</a-select-option>
      </a-select> -->
      <a-input-search v-model="searchContent" placeholder="请输入事项名称" allowClear @search="getSearch"  :disabled="spinning"/>
    </div>
    <div class="content">
      <a-table
        v-if="data.length"
        :loading="spinning"
        :key="tableKey"
        :columns="columns"
        :dataSource="data"
        :scroll="{ y: 360 }"
        :pagination="pagination"
        @change="handleTableChange"
        :rowKey="(record)=>{return record.id}"
        :expandRowByClick="false"
        :defaultExpandAllRows="true"
      >
        <template slot="name" slot-scope="text, record">
          <h1 v-if="record.num==1">{{record.name}}</h1>
          <span class="name" v-else>
            <CustomIcon type="list" v-if="!record.children"/>
            <span :class="{'custom-icon': !record.children}">{{record.name}}</span>
          </span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="operation">
            <div class="operation-btn" v-if="!record.children">
              <a-button type="primary" @click="openPc(record)" ghost>在线办理</a-button>
            </div>
            <a-icon type="down" style="font-size:18px;color:gray" v-else></a-icon>
          </div>
        </template>
      </a-table>
      <EmptyData v-else/>
    </div>
    <!-- 发起单位弹框 -->
    <a-modal
      :visible="visiblePc"
      title="请选择发起单位"
      @cancel="visiblePc=false"
      :footer="null"
      width="450px"
      :bodyStyle="tStyle"
    >
      <org-user-select mode="org" @finish="deptOk" :rootSelectable="true"></org-user-select>
    </a-modal>
    <!-- 发起用户选择弹框 -->
    <a-modal
      :visible="visibleUser"
      title="选择被操作人员"
      @cancel="visibleUser=false"
      :footer="null"
      width="500px"
      :bodyStyle="{'height':'330px','padding':0}"
      :destroyOnClose="true"
    >
      <select-process-user @userOk="userOk"></select-process-user>
    </a-modal>
  </div>
</template>
<script>

/**
 * 事项办理列表
 */
import { Select, Input, Button, Spin, Table, Icon } from "ant-design-vue";
import EmptyData from "@/framework/components/EmptyData";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import SelectProcessUser from "./SelectProcessUser";
import CustomIcon from "@/framework/components/CustomIcon";
import { assign } from 'lodash';
import { getListCatalogv1, getCodeProcess, chooseOrg } from '@/person-shaoxing/api/bussiness';
import { showError, guid } from "@/framework/utils/index";
const columns = [
  {
    title: "流程名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "",
    dataIndex: "operation",
    width: 120,
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  components: {
    AIcon: Icon,
    EmptyData,
    CustomIcon,
    ASpin: Spin,
    ATable: Table,
    OrgUserSelect,
    AButton: Button,
    ASelect: Select,
    SelectProcessUser,
    AInputSearch: Input.Search,
    ASelectOption: Select.Option,
  },
  data() {
    return {
      columns,
      curCode: undefined,
      visiblePc: false,
      visibleUser: false,
      searchContent: "",
      tableKey: guid(),
      data: [],
      categorys: [],
      spinning: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      tStyle: {
        padding: "5px 3px 5px 10px",
        width: "100%",
        height: "550px",
        color: "black"
      },
    };
  },
  // computed: {
  //   mattersort() {
  //     return this.$store.getters.dict('person.mattersort');
  //   }
  // },
  mounted() {
    this.getSearch();
  },
  methods: {
    handleChange(value) {
    //   if(value) {
    //     this.pagination.mattersort = value;
    //   }else{
    //     this.pagination.mattersort = undefined;
    //   }
    //   this.matterSearch(this.pagination);
    // },
    // onSearch(value) {
    //   if(value) {
    //     this.pagination.mattercontent = value;
    //   }else{
    //     this.pagination.mattercontent = undefined;
    //   }
    //   this.matterSearch(this.pagination);
    },
    //办理流程
    openPc(record) {
      this.curCode = record.code;
      getCodeProcess(record.code)
        .then(res => {
          if (res.code == "success") {
            if (res.result.showtype == 3 || res.result.showtype == 9) {
              this.isUrl(res.result.gotoUrl);
            } else if (res.result.showtype == 1) {
              this.visiblePc = true;
            } else if (res.result.showtype == 5) {
              this.visibleUser = true;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    handleTableChange(pagination) {
      assign(this.pagination, { current: pagination.current });
      this.getSearch();
    },
    //获取业务流程的全部信息
    getSearch() {
      let query = {};
      query.needtotal = true;
      query.pagenum = this.pagination.current;
      query.pagesize = this.pagination.pagesize;
      query.searchkey = this.searchContent;
      query.subjectkey = this.subjectsKey;
      query.status = 1;
      this.spinning = true;
      getListCatalogv1(query)
        .then(res => {
          this.data = [];
          if (res.code == "success") {
            this.data = res.result.rows;
            this.pagination.total = res.result.total ? res.result.total : 0;
            this.tableKey = guid();
          }
        })
        .catch(err => {
          showError(err);
        }).finally(()=> {
          this.spinning = false;
        });
    },
    //确定选择的用户
    userOk(val) {
      this.visibleUser = false;
      let query = {};
      query.code = this.curCode;
      query.userid = val;
      chooseOrg(query)
        .then(res => {
          this.isUrl(res.result.gotoUrl);
        })
        .catch(err => {
          showError(err);
        });
    },
    //确定选择的机构
    deptOk(type, list) {
      if (type == "ok" && list.length > 0) {
        let obj = list[0];
        this.visiblePc = false;
        let query = {};
        query.code = this.curCode;
        query.orgid = obj._id;
        chooseOrg(query)
          .then(res => {
            this.isUrl(res.result.gotoUrl);
          })
          .catch(err => {
            showError(err);
          });
      } else if (type == "cancel") {
        this.visiblePc = false;
      }
    },
    //判断跳转的路径是否需要拼接
    isUrl(url) {
      if (url) {
        let link = decodeURIComponent(url);
        if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
          // 直接跳转
          window.open(link, "_blank");
        } else {
          // 相对路径
          if (link.indexOf("/") == 0) {
            link = link.substr(1);
          }
          let newURL =
            process.env.NODE_ENV === "production"
              ? process.env.BASE_URL + link
              : window.location.origin + "/" + link;
          window.open(newURL, "_blank");
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.matterBody {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: @border-radius-base;
  .header {
    padding: @padding-md;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
    .ant-select,
    .ant-input-search {
      width: 40%;
    }
    /deep/.ant-input-search .ant-input-search-icon {
      color: @primary-color;
    }
  }
  /deep/.content {
    flex: 1;
    padding: @padding-md;
    position: relative;
    & .ant-table-thead {
      display: none;
    }
    & .ant-table-body {
      & .ant-table-row-expand-icon {
        display: none;
      }
      & .operation .anticon {
        display: none;
      }
      & .name {
        .icon {
          width: 25px;
          height: 25px;
          margin: 0 20px 0 0;
        }
      }
      & tr {
        border-bottom: 0;
      }
      & h1 {
        font-weight: bold;
      }
      & span:not(.custom-icon) {
        font-size: 1.1em;
        font-weight: bold;
      }
    }
  }
}
</style>