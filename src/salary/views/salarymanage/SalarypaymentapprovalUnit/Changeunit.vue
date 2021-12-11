<template>
  <!-- 查看内容 -->
  <div class="doneunit">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="head">
            <div class="orgname">{{record.orgname}}</div>

            <div class="name">{{record.name}}</div>

            <a-select @change="AllorChange" style="width: 15%;" defaultValue="全部人员">
              <a-select-option value="all">全部人员</a-select-option>
              <a-select-option value="change">变动人员</a-select-option>
            </a-select>
            <a-button class="btn" @click="send">工资发放</a-button>
          </div>
          <!-- 表格 -->
          <a-table
            style="margin-top: 12px;"
            class="tableCls"
            :columns="columnsDone"
            :dataSource="datasourceDone"
            :pagination="paginationDone"
            :bordered="true"
            :loading="loading"
            @change="changePagination"
          >
            <span
              @click="showDetail(record)"
              class="operateBtn"
              slot-scope="val,record"
              slot="operate"
            >查看详情</span>
          </a-table>
        </div>
        <payProvideModal
          v-if="isShowpayprovide"
          :isShow="isShowpayprovide"
          @modalClose="closePayprovide"
          :provideRes="provideRes"
        ></payProvideModal>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import {
  salaryDirection,
  processdetail,
  prostatistic,
} from "@/salary/api/salaryManage";
import { showError } from "@/framework/utils/index";
import payProvideModal from "../Payprovide.vue";
import { Layout, Breadcrumb, Table, Select, Button } from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    payProvideModal,
  },
  data() {
    return {
      nowOrg: "",
      provideRes: {},
      isShowpayprovide: false,
      loading: true,
      slots: "",
      record: "",
      argDate: "",
      ischange: 0,
      columnsDone: [],
      datasourceDone: [],
      paginationDone: {
        position: "bottom",
        pageSize: 10,
        current: 1,
        total: 10,
        showTotal: function (total, range) {
          return `共 ${total} 条记录`;
        },
      },
    };
  },
  created() {
    if (this.$route.params.record) {
      this.nowOrg = this.$route.params.record.args.orgid;
      this.record = this.$route.params.record;
      this.argDate = this.record.args.date;
      this.getData(1);
    } else {
      this.record = this.$store.state.salary.approvalUnitNowRecord;
      this.argDate = this.record.args.date;
      this.nowOrg = this.record.orgid;
      this.getData(1);
    }
  },
  methods: {
    AllorChange(val) {
      if (val == "change") {
        this.ischange = 1;
        this.getData(1);
      } else if (val == "all") {
        this.ischange = 0;
        this.getData(1);
      }
    },
    closePayprovide() {
      this.isShowpayprovide = false;
    },
    //工资发放
    send() {
      let data = {
        date: this.argDate,
        orgid: this.nowOrg,
      };
      salaryDirection(data)
        .then((res) => {
          this.provideRes.send = true;
          this.provideRes.result = res.result;
          this.provideRes.nowOrg = this.nowOrg;
          this.provideRes.nowTime = this.argDate;
          this.isShowpayprovide = true;
        })
        .catch((err) => {
          showError(err);
        });
    },
    //查看详情
    showDetail(record) {
      let that = this;
      let data = {
        process: that.record.id,
        userid: record.userid,
      };
      processdetail(data)
        .then(function (res) {
          let userObj = {};
          userObj.result = res.result;
          userObj.userid = record.userid;
          userObj.argDate = that.argDate;
          userObj.processid = that.record.id;
          that.$router.push({
            name: "detailunitForChange",
            params: userObj,
          });
        })
        .catch((err) => {
          showError(err);
        });
    },
    changePagination(pagination) {
      //点击分页的回调
      this.paginationDone.current = pagination.current;
      this.getData(this.paginationDone.current);
    },
    getData(pagenum) {
      this.loading = true;
      let that = this;
      //获取数据
      let data = {
        process: that.record.id,
        ischange: that.ischange,
        needtotal: true,
        pagenum: pagenum,
        pagesize: 10,
      };
      prostatistic(data)
        .then(function (res) {
          //封装数据
          let thead = res.result.thead;
          let tbody = res.result.salaryResultVo.rows;
          let dataKey = []; //指定唯一 dataIndex
          let slots = []; //定义插槽数组
          //封装columns
          let ifHead = false;
          let index = 0;
          for (let i = 0; i < thead.length; i++) {
            if (thead.length == 1) {
              let childrenArr = thead[i].children;
              let childrenOnly;
              for (let j = 0; j < childrenArr.length; j++) {
                if (j == 0) {
                  childrenOnly = `head`;
                } else {
                  childrenOnly = `children${j - 1}`;
                  slots.push(childrenOnly);
                  childrenArr[j].scopedSlots = { customRender: childrenOnly };
                }
                childrenArr[j].key = childrenOnly;
                childrenArr[j].align = "center";
                childrenArr[j].dataIndex = childrenOnly;
                dataKey.push(childrenOnly);
              }
            } else {
              if (thead[i].title) {
                if (ifHead) {
                  let only = `children${index}`;
                  index++;
                  thead[i].align = "center";
                  thead[i].dataIndex = only;
                  thead[i].key = only;
                  if (thead[i].children) {
                  } else {
                    thead[i].scopedSlots = { customRender: only };
                    slots.push(only);
                    dataKey.push(only);
                  }
                } else {
                  ifHead = true;
                  thead[i].align = "center";
                  thead[i].dataIndex = "head";
                  thead[i].width = "6%";
                  thead[i].key = "head";
                  if (thead[i].children) {
                  } else {
                    dataKey.push("head");
                  }
                }
              }
              if (thead[i].children) {
                let childrenArr = thead[i].children;
                let num;
                for (let j = 0; j < childrenArr.length; j++) {
                  let childrenOnly = `children${j + index}`;
                  num = j + index;
                  slots.push(childrenOnly);
                  childrenArr[j].key = childrenOnly;
                  childrenArr[j].scopedSlots = { customRender: childrenOnly };
                  childrenArr[j].align = "center";
                  childrenArr[j].dataIndex = childrenOnly;
                  dataKey.push(childrenOnly);
                }
                index = num + 1;
              }
            }
          }
          that.slots = slots;

          thead.push({
            dataIndex: "operate",
            key: "operate",
            title: "操作",
            align: "center",
            width: "6%",
            scopedSlots: { customRender: "operate" },
          });
          that.columnsDone = thead; //列

          // let num = 0
          // for(let i=0;i<thead.length;i++){
          //     if(thead[i].children){
          //         num += thead[i].children.length
          //     }

          // }
          // if(num < 3 && thead.length < 3){
          //     this.theWidth = '40vw'
          // }else{
          //     this.theWidth = '80vw'
          // }

          //封装 datasource
          let datasourceArr = [];

          for (let i = 0; i < tbody.length; i++) {
            let arr = [];
            let rowObj = {};

            arr.push(tbody[i].username);

            for (let j = 0; j < tbody[i].detail.length; j++) {
              arr.push(tbody[i].detail[j]);
            }
            arr.push(tbody[i].userid);

            for (let m = 0; m < dataKey.length; m++) {
              rowObj[dataKey[m]] = arr[m];
            }
            rowObj.userid = arr[arr.length - 1];
            rowObj.key = `row${i}`; //指定唯一key

            datasourceArr.push(rowObj);
          }

          that.paginationDone.total = res.result.salaryResultVo.total;
          that.loading = false;
          that.datasourceDone = datasourceArr;
        })
        .catch((err) => {
          showError(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.doneunit {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .content {
    padding: 12px;
  }
  .content > div {
    background-color: white;
    overflow: hidden;
    position: relative;
    height: 100%;
    padding: 10px 24px;
  }
  .operateBtn {
    color: @primary-color;
    cursor: pointer;
  }

  .tableCls {
    height: 100%;
    overflow: auto;
    /deep/.ant-table-content {
      /deep/ .ant-table-body {
        /deep/.ant-table-thead > tr > th {
          padding: 13px;
        }
        /deep/.ant-table-tbody > tr > td {
          padding: 12px;
        }
      }
    }
  }
  .head {
    position: relative;
    height: 32px;
    margin: 0 auto 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    .name {
      line-height: 35px;
      padding-right: 80px;
    }
    .orgname {
      line-height: 35px;
      padding-right: 80px;
    }
    .btn {
      position: absolute;
      left: 0;
      outline: none;
      border: none;
      background-color: @primary-color;
      color: white;
      border-radius: 5px;
      height: 32px;
      width: 100px;
      cursor: pointer;
    }
  }
}
</style>
