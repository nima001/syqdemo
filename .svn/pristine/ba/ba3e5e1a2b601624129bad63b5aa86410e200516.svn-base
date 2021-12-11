<template>
  <!-- 查看内容 -->
  <div class="doneDetailunit">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="head">
            <div class="orgname">{{record.orgname}}</div>
            <div class="name">{{record.name}}</div>
            <a-select class="change" @change="AllorChange" defaultValue="全部">
              <a-select-option value="all">全部</a-select-option>
              <a-select-option value="change">变动</a-select-option>
            </a-select>
          </div>
          <div class="timeAndTable">
            <a-table
              class="tableCls"
              :columns="columnsDone"
              :dataSource="datasourceDone"
              :pagination="pagationShow"
              :bordered="true"
              :loading="loading"
            >
              <span
                @click="showDetail(record)"
                class="operateBtn"
                slot-scope="val,record"
                slot="operate"
              >查看详情</span>
            </a-table>
            <!-- <div v-if="noData" style="width: 100%;text-align: center;padding: 20px;">无数据</div> -->
          </div>
          <div class="footer">
            <a-pagination
              class="pagation"
              showSizeChanger
              size="middle"
              :pageSize.sync="pagination.pageSize"
              @showSizeChange="onShowSizeChange"
              @change="onChange"
              :total="pagination.total"
              v-model="pagination.current"
              :showTotal="total => `共${total} 条`"
            />
          </div>
        </div>
        <approvalModal v-if="isShow" :isShow="isShow" @Modalcancel="closeModal" :id="record.id"></approvalModal>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { processdetail, prostatistic } from "@/salary/api/salaryManage";
import { showError } from "@/framework/utils/index";
import approvalModal from "../Salarypaymentapproval/ApprovalModal";
import { Layout, Select, Pagination, Table } from "ant-design-vue";
export default {
  name: "doneDetailunit",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ASelect: Select,
    ASelectOption: Select.Option,
    APagination: Pagination,
    ATable: Table,
    approvalModal
  },
  data() {
    return {
      loading: true,
      noData: false,
      isShow: false,
      slots: "",
      record: "",
      ischange: 0,
      argDate: "",
      columnsDone: [],
      datasourceDone: [],
      pagationShow: false, // 关闭table自己的分页器
      pagination: {
        pageSize: 10,
        current: 1,
        total: 10
      }
    };
  },
  created() {
    this.record = this.$route.params.record;
    this.argDate = this.record.args.date;
    this.getData(1);
  },
  methods: {
    // 改变 pageSize
    onShowSizeChange(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getData(this.pagination.current);
    },
    // 改变 页数
    onChange(current, pageSize) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getData(this.pagination.current);
    },
    closeModal() {
      this.isShow = false;
    },
    approval() {
      this.isShow = true;
    },
    AllorChange(val) {
      if (val == "change") {
        this.ischange = 1;
        this.getData(1);
      } else if (val == "all") {
        this.ischange = 0;
        this.getData(1);
      }
    },
    //查看详情
    showDetail(record) {
      let that = this;
      let data = {
        process: this.record.id,
        userid: record.userid
      };
      processdetail(data)
        .then(function(res) {
          let userObj = {};
          userObj.result = res.result;
          userObj.userid = record.userid;
          userObj.argDate = that.argDate;
          that.$router.push({
            name: "detailunit",
            params: userObj
          });
        })
        .catch(err => {
          showError(err);
        });
    },
    getData(pagenum) {
      this.loading = true;
      let that = this;
      //获取数据
      let data = {
        needtotal: true,
        pagenum: this.pagination.current,
        pagesize: this.pagination.pageSize,
        process: this.record.id,
        ischange: this.ischange
      };
      prostatistic(data)
        .then(function(res) {
          if (!res.result) {
            that.noData = true;
            that.loading = false;
            that.datasourceDone = [];
            that.columnsDone = [];
          }else{
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
            scopedSlots: { customRender: "operate" }
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

          that.pagination.total = res.result.salaryResultVo.total;
          that.loading = false;
          that.datasourceDone = datasourceArr;
          }
          // if (res.result.salaryResultVo.total == 0) {
          //   that.datasource = [];
          //   that.loading = false;
          // }
        })
        .catch(err => {
          that.noData = true;
          that.loading = false;
          that.datasource = [];
          that.columns = [];
          showError(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
@media screen and (max-width: 1500px) {
  /deep/ .ant-table-tbody tr td {
    padding: 10px 2px;
  }
}
.doneDetailunit {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .content {
    padding: 12px 12px;
  }
  .content > div {
    background-color: white;
    overflow: hidden;
    position: relative;
    padding: 0 24px;
    height: 100%;
  }

  .operateBtn {
    color: @primary-color;
    cursor: pointer;
  }
  .content .tableCls {
    height: 100%;
    overflow: auto;
    /deep/ .ant-table-thead > tr > th {
      padding: 8px 14px;
    }
    /deep/ .ant-table-tbody > tr > td {
      padding: 9px 4px;
    }
  }

  .head {
    width: 100%;
    padding: 12px 24px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    .name {
      padding-top: 5px;
      padding-right: 40px;
    }
    .orgname {
      padding-top: 5px;
      padding-right: 40px;
    }
    .change {
      width: 13%;
    }
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
  /* 查看历史 表格样式 */
  .timeAndTable {
    // height:95%;
    width: 100%;
    max-height: 537px;
    padding: 0px 24px;
    overflow: auto;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    height: 32px;
    margin-top: 12px;
    padding: 0 14px;
    .pagation {
      height: 100%;
    }
  }
}
</style>