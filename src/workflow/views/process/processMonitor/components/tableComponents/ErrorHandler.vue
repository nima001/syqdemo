<template>
  <div class="err-handler">
    <a-spin :spinning="spin">
      <a-table
        :dataSource="data"
        :columns="columns"
        :pagination="false"
        :rowKey="record => record.key"
      >
        <template slot="operate" slot-scope="text, record, index">
          <span
            @click="handler(record,index)"
            style="cursor:pointer;color:#29d"
          >{{record.status == 1?'':record.status == 2?'重新生成':'重新入库'}}</span>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  {
    title: "异常内容",
    dataIndex: "content",
    key: "content"
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 120,
    scopedSlots: { customRender: "operate" }
  }
];
import { Table, Popconfirm, Spin } from "ant-design-vue";
import { getDealexception, handle, remedy } from "@/workflow/api/monitor";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ATable: Table,
    APopconfirm: Popconfirm,
    ASpin: Spin
  },
  props: ["businessinstanceid"],
  data() {
    return {
      data: [],
      columns,
      spin: true
    };
  },
  computed: {
    id() {
      return this.businessinstanceid;
    }
  },
  watch: {
    id: {
      handler(val) {
        this.spin = true;
        const id = val.split("_")[0];
        this.getList(id);
      },
      immediate: true
    }
  },
  methods: {
    getList(id) {
      getDealexception({ businessinstanceid: id })
        .then(res => {
          res.result.forEach((item, index) => {
            this.$set(item, "key", index);
            if (item.status) {
              if (item.status === 1) {
                this.$set(
                  item,
                  "content",
                  `节点办理人角色下无用户，请在角色下添加用户。角色名称：《${item.name}》`
                );
              } else if (item.status === 2) {
                this.$set(
                  item,
                  "content",
                  `《${item.name}》PDF生成失败，请点击重新生成，若连续多次生成失败请联系运维人员。`
                );
              } else if (item.status === 3) {
                this.$set(
                  item,
                  "content",
                  `"${item.name}"入库失败，请点击重新入库。`
                );
              }
            }
          });
          this.data = res.result;
          this.spin = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    //操作
    handler(record,index) {
      if (record.status == 1) {
      } else if (record.status == 2) {
        //pdf重新生成
        let query = {};
        query.id = record.id;
        remedy(query)
          .then(res => {
            // todo
            const data = [...this.data];
            this.data = data.filter((item,dataindex) => dataindex != index);

            this.$message.success(record.name + "已重新生成！");
          })
          .catch(err => {
            showError(err);
          });
      } else if (record.status == 3) {
        //规则重新入库
        let query = {};
        query.id = record.id;
        handle(query)
          .then(res => {
            // todo
            const data = [...this.data];
            this.data = data.filter((item,dataindex) => dataindex != index);

            this.$message.success(record.name + "已重新入库！");
          })
          .catch(err => {
            showError(err);
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>