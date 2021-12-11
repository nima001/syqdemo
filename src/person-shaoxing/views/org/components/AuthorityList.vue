<template>
  <div class="power-list">
    <div class="mechanism-div">
      <div class="small-div"></div>
      <div class="small-p">权力清单</div>
    </div>
    <div class="categories-list" v-if="pagination.rows">
      <ul class="categories-ul">
        <li v-for="(item, index) in powerList" :key="item.key">
          <div
            :class="activeClass == index ? 'active' : ''"
            class="cate-gories"
            @click="active(index, item)"
          >
            <span class="cate-p">{{ item.text }}</span>
            <span class="cate-div"></span>
            <span class="cate-span">{{ item.num }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="power-table">
      <div class="table-div">
        <a-input
          placeholder="请输入关键词"
          style="width: 200px; margin-right: 15px"
          allow-clear
          v-model="searchkey"
        />
        <a-button type="primary" @click="onSearch">查询</a-button>
      </div>
      <div class="list-content">
        <a-table
          :loading="loading"
          :columns="columns"
          :dataSource="pagination.rows"
          :pagination="false"
        ></a-table>
      </div>
      <div class="footer">
        <a-pagination
          v-if="pagination.rows && pagination.rows.length"
          showSizeChanger
          :showTotal="(total) => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="pagination.total"
          v-model="pagination.pagenum"
          @change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { Button, Select, Input, Table, Pagination } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
import { qlsxstatistic, qlsxsearch } from "@/person-shaoxing/api/monitor";
export default {
  data() {
    return {
      activeClass: 0, // 0为默认选择第一个，-1为不选择
      searchkey: null,
      columns: [
        {
          title: "序号",
          key: "id",
          customRender: this.indexRender,
          width: "10%",
        },
        {
          title: "权利基本码",
          dataIndex: "quanlicode",
          key: "quanlicode",
          width: "20%",
        },
        {
          title: "权力事项名称",
          dataIndex: "quanliname",
          key: "quanliname",
          width: "50%",
        },
        {
          title: "变更时间",
          dataIndex: "enabletime",
          key: "enabletime",
          customRender: function (text, record, index) {
            if (text) {
              return moment(text).format("YYYY-MM-DD");
            }
          },
          width: "20%",
        },
      ],
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0,
      },
      powerList: null,
      activevalue: null,
      searchkey: null,
      loading: false,
    };
  },
  components: {
    AButton: Button,
    ASelect: Select,
    AInput: Input,
    ATable: Table,
    APagination: Pagination,
  },
  props: {
    orgid: String,
    businesst: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  created() {
    this.load();
  },
  watch: {
    orgid(orgid) {
      if(orgid) {
        this.load();
      }
    },
  },
  // computed: {
  //   businesst() {
  //     return this.$store.getters.dict("person.business.businesstype");
  //   },
  // },
  methods: {
    load() {
      this.businesstList = this.businesst;
      if (this.businesstList[0].key != "total") {
        this.businesstList.unshift({ key: "total", text: "全部", value: 0 });
      }
      this.qlsxslist(this.orgid);
      this.authoritysearch();
    },
    moment,
    indexRender(text, row, index) {
      let p = this.pagination;
      return (p.pagenum - 1) * p.pagesize + index + 1;
    },
    active(index, item) {
      this.activeClass = index;
      this.activevalue = item.value;
      this.authoritysearch();
    },
    qlsxslist(orgid) {
      qlsxstatistic(orgid)
        .then((res) => {
          if (res.result) {
            this.businesstList.forEach((item) => {
              item["num"] = res.result.data[item.key];
            });
            this.powerList = this.businesstList;
          }
        })
        .catch((err) => {
          showError(err);
        });
    },
    authoritysearch(pagenum, pagesize) {
      let data = {
        orgid: this.orgid,
        pagenum,
        pagesize,
        quanlikind: this.activevalue ? this.activevalue : "",
        searchkey: this.searchkey,
        needtotal: true,
      };
      qlsxsearch(data)
        .then((res) => {
          this.loading = false;
          if (res.result.rows.length) {
            this.pagination = res.result;
          } else {
            // this.$notification.warning({
            //   message: "提示",
            //   description: "暂无数据!",
            //   duration: 3,
            // });
            this.pagination.rows = null;
          }
        })
        .catch((err) => {
          this.loading = false;
          showError(err);
        });
    },
    //带参查询
    onSearch() {
      this.loading = true;
      this.authoritysearch(1, this.pagination.pagesize);
    },
    //页数切换
    onPageChange(page, pagesize) {
      this.authoritysearch(page, pagesize);
    },
    onShowSizeChange(current, size) {
      this.authoritysearch(1, size);
    },
  },
};
</script>
<style lang="less" scoped>
.power-list {
  padding: 10px 24px;
  height: 100%;
  .mechanism-div {
    display: flex;
    align-items: center;
    .small-div {
      width: 5px;
      height: 20px;
      background: @primary-color;
    }
    .small-p {
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .categories-list {
    margin: 10px 0;
    .categories-ul {
      display: flex;
      overflow-x: auto;
      white-space: nowrap;
      // justify-content: space-between;
      li {
        margin-right: 20px;
      }
      .cate-gories {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
        &:active {
          color: @primary-color;
          .cate-div {
            background: @primary-color;
            border-radius: 10px;
          }
        }
        .cate-p {
          font-size: 16px;
        }
        .cate-span {
          margin-top: 10px;
          text-align: center;
          width: 100%;
          font-size: 16px;
        }
        .cate-div {
          margin-top: 2px;
          height: 5px;
          width: 100%;
        }
      }
      &:last-child {
        margin-right: 0px;
      }
      .active {
        color: @primary-color;
        .cate-div {
          background: @primary-color;
          border-radius: 10px;
        }
      }
    }
  }
  .power-table {
    .table-div {
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .footer {
      padding: @content-padding-v @content-padding-h;
      padding-right: 0;
      .ant-pagination {
        float: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>