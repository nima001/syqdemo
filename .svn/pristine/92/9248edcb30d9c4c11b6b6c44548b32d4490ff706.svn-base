<template>
  <div class="group-manage">
    <a-button @click="add">点击添加</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="text, record">
        <div>
          <a-input
            v-if="record.editable"
            style="margin: -5px 0;width:90%"
            :value="text"
            @change="e => handleChange(e.target.value,record.key)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id,record.key)">保存</a>
            <a-popconfirm title="确定取消编辑吗?" @confirm="() => cancel(record.id,record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingId" @click="() => edit(record.id)">编辑</a>
            <a-popconfirm title="删除后不可恢复，确定删除吗?" @confirm="() => del(record)">
              <a :disabled="editingId">删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
    <div class="groupmanage-btn">
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
  </div>
</template>

<script>
import { Button, Table, Popconfirm, Input } from "ant-design-vue";
import { showError, guid } from "@/framework/utils/index";
import {
  getModelistGroup,
  addModelistGroup,
  delListGroup
} from "@/workflow/api/modellist";
const columns = [
  {
    title: "分组名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },

  {
    title: "操作",
    dataIndex: "operation",
    width: 120,
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  components: {
    AButton: Button,
    ATable: Table,
    APopconfirm: Popconfirm,
    AInput: Input
  },
  data() {
    return {
      data: [],
      cacheData: [],
      columns,
      editingId: undefined,
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      }
    };
  },
  created() {
    this.get();
  },
  methods: {
    //获取分组列表
    get() {
      let page = {};
      page.needtotal = true;
      page.pagenum = this.pagination.current;
      page.pagesize = this.pagination.pagesize;
      getModelistGroup(page)
        .then(res => {
          this.pagination.total = res.result.total;
          res.result.rows.forEach(item => {
            this.$set(item, "key", guid());
          });
          this.data = res.result.rows;
          this.cacheData = this.data.map(item => ({ ...item }));
        })
        .catch(err => {
          showError(err);
        });
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.get();
    },
    //添加
    add() {
      const newData = [...this.data];
      const emptyTarget = newData.filter(item => !item.id)[0];
      if (!emptyTarget && !this.editingId) {
        newData.unshift({ name: "", key: guid(), editable: true });
        this.editingId = 1;
        this.data = newData;
      } else {
        this.$message.warning("请先填写完正在编辑的分组，再添加新的分组！");
      }
    },
    //输入框修改
    handleChange(value, key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.name = value;
        this.data = newData;
      }
    },
    //编辑后保存
    save(id, key) {
      const target = this.data.filter(item => key === item.key)[0];
      if (target && target.name) {      
        let validationGroup = {};
        validationGroup.name = target.name;
        if (id) {
          validationGroup.id = id;
        }
        addModelistGroup(validationGroup)
          .then(res => {
            if (id) {
              this.$message.success("分组修改成功！");
            } else {
              this.$message.success("分组新增成功！");
            }
            this.get();
            delete target.editable;
            this.editingId = undefined;
          })
          .catch(err => {
            showError(err);
          });
      }else{
        this.$message.warning("请填写分组名称后再保存！");
      }
    },
    //取消编辑
    cancel(id, key) {
      let newData = [...this.data];
      this.editingId = undefined;
      let target;
      if (id) {
        target = newData.filter(item => id === item.id)[0];
        if (target) {
          //合并对象,若有冲突，则旧数据（后者）会覆盖修改过的数据（前者）
          Object.assign(
            target,
            this.cacheData.filter(item => id === item.id)[0]
          );
          delete target.editable;
        }
      } else {
        target = newData[newData.length - 1];
        if (target) {
          delete target.editable;
          newData = newData.filter(item => item.key !== key);
        }
      }
      this.data = newData;
    },
    //删除
    del(record) {
      delListGroup(record.id)
        .then(res => {
          this.$message.success(record.name + "删除成功！");
          this.get();
        })
        .catch(err => {
          showError(err);
        });
    },
    //编辑
    edit(id) {
      const newData = [...this.data];
      const target = newData.filter(item => id === item.id)[0];
      this.editingId = id;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    submit() {
      this.$emit("changeNotify", true);
    }
  }
};
</script>
<style lang="less" scoped>
.group-manage {
  padding: 20px 15px 53px 15px;
  > button {
    margin-bottom: 15px;
  }
  .editable-row-operations {
    span {
      display: flex;
      flex-wrap: nowrap;
      a {
        &:last-child {
          padding-left: 20px;
        }
      }
    }
  }

  .groupmanage-btn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #efefef;
    text-align: center;
    padding: 10px 0;
    z-index: 10;
    background-color: #fff;
  }
}
</style>