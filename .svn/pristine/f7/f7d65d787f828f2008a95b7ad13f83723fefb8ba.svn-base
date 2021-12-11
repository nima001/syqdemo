<template>
  <a-modal :visible="true" :footer="null" width="998px" @cancel="cancel">
    <p class="title">{{user.username}}的哺乳假详情</p>
    <!-- <div class="total">
      <span>哺乳假合计：</span>
      <span class="num">{{pagination.total}}次</span>
    </div> -->
    <div class="content">
      <div class="table">
        <a-table rowKey="dutytime" :loading="loading"  :columns="columns" :data-source="dataSource"  :pagination="false"></a-table>
      </div>
      <div class="pagination">
        <a-pagination show-size-changer :total="pagination.total" :page-size="pagination.pagesize"
         :default-current="pagination.pagenum" :show-total="(total) => `共 ${total} 条`" 
         @change="onChange" @showSizeChange="onShowSizeChange">
        </a-pagination>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { Modal, Table, Pagination } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import {lactationQuery} from "@/hall/api/leave";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AModal: Modal,
    ATable: Table,
    APagination: Pagination
  },
  data() {
    return {
      loading: false,
      dataSource: [],
      columns: [
        {
          title: "请假开始时间",
          dataIndex: "start",
        },
        {
          title: "请假结束时间",
          dataIndex: "end",
        },
        {
          title: "请假时段（上午）",
          dataIndex: "morning",
        },
        {
          title: "请假时段（下午）",
          dataIndex: "night",
        },
      ],
      pagination: {
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true
      }
    };
  },
  props:{
    user:{
      type:Object,
      required:true
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let query = {
        userid: this.user.userid,
        ...this.pagination
      };
      lactationQuery(query)
        .then(({result:{ pagesize, pagenum, total, rows=[]}}) => {
          assign(this.pagination, { pagesize, pagenum, total });
          rows.forEach((item) => {
            item.start=item.startdate.slice(0, 11)
            item.end=item.enddate.slice(0, 11)
            item.morning=item.morningstart+'-'+item.morningend
            item.night=item.nightstart+'-'+item.nightend
          });
          this.dataSource = rows;
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("input", false);
    },
    onChange(pagenum, pagesize) {
      assign(this.pagination, { pagesize, pagenum });
    },
    onShowSizeChange(current, pagesize) {
      assign(this.pagination, { pagenum: 1, pagesize });
    }
  }
};
</script>
<style lang='less' scoped>
.title {
  font-size: 18px;
  color: @black;
  font-weight: bold;
  text-align: center;
  margin: 0px;
  padding: @content-padding-v 0px;
}
.total {
  padding: @content-padding-v 0px;
  display: flex;
  .num {
    color: @primary-color;
  }
}
.content {
  max-height: 600px;
  display: flex;
  flex-direction: column;
  .table {
    flex-shrink: 1;
    overflow-y: auto;
    padding: @content-padding-v 0px;
  }
  .pagination {
    text-align: right;
    padding: @content-padding-v 0px;
  }
}
</style>