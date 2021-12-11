<template>
  <div class="task-node">
    <a-spin :spinning="spin">
      <a-table
        :dataSource="data"
        :columns="columns"
        :pagination="false"
        :rowKey="record => record.taskId"
      >
        <template slot="operate" slot-scope="text,record">
          <div class="operation">
            <span @click="handler(record)">办理页</span>
            <span @click="cancel(record)" :style="record.isAssignee == 1?'color:gray':''">取消签收</span>
            <span @click="reback(record)">重发消息</span>
          </div>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script>
import { Table, Popconfirm, Spin } from "ant-design-vue";
import { getListTask, unClaim, getFormcfg, sendmsg } from "@/workflow/api/monitor";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ATable: Table,
    APopconfirm: Popconfirm,
    ASpin: Spin
  },
  props: {
    instanceId: {
      type: String
    },
    businessinstanceid: {
      type: Number
    }
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "节点/任务名称",
          dataIndex: "taskName",
          key: "taskName",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "表单名称",
          dataIndex: "formNames",
          key: "formNames",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "节点办理人",
          dataIndex: "assigneeUsers",
          key: "assigneeUsers",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "签收状态",
          dataIndex: "isAssignee",
          key: "isAssignee",
          width: 80,
          customRender: text => <span>{text == 1 ? "未签收" : "已签收"}</span>
        },
        {
          title: "签收人",
          dataIndex: "assigneeUser",
          key: "assigneeUser",
          width: 100
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          width: 200,
          scopedSlots: { customRender: "operate" }
        }
      ],
      spin: true,
      nowId:undefined
    };
  },
  computed: {
    id() {
      return this.instanceId;
    }
  },
  watch: {
    id: {
      handler(val) {
        this.spin = true;
        this.nowId = val.split("_")[0];
        this.getList(this.nowId);
      },
      immediate: true
    }
  },
  methods: {
    //获取节点任务
    getList(instanceId) {
      getListTask({ instanceId })
        .then(res => {
          this.data = res.result;
          this.spin = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    //办理页
    handler(record) {
      let query = {};
      query.businessInstanceId = this.businessinstanceid;
      query.taskId = record.taskId;
      getFormcfg(query)
        .then(res => {
          this.isUrl(res.result);
        })
        .catch(err => {
          showError(err);
        });
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
    //取消签收
    cancel(record) {
      if (record.isAssignee == 2) {
        unClaim({ taskId: record.taskId })
          .then(res => {
            this.$message.success(record.formNames + "已取消签收！");
            this.getList(this.nowId);
          })
          .catch(err => {
            showError(err);
          });
      }
    },
    //重发消息
    reback(record) {
      let query = {};
      query.taskId = record.taskId;
      query.businessInstanceId = this.businessinstanceid;
      sendmsg(query)
        .then(res => {
          this.$message.success("消息重新发送成功！");
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.task-node {
  /deep/table {
    table-layout: fixed;
    td,
    th {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .operation {
    display: flex;
    flex-wrap: nowrap;
    span {
      cursor: pointer;
      color: #29d;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>