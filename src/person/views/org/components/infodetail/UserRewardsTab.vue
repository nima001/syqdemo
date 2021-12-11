<template>
  <div class="tablewrap">
    <div class="top-btn" v-if="hasPermit('/person/org/user/edit')">
      <template v-if="edit">
        <a-button type="primary" @click="saveTable">保存</a-button>
        <a-button @click="cancelSaveTable" style="margin-left: 10px;">取消</a-button>
      </template>
      <a-button v-else type="primary" @click="edit=true">编辑</a-button>
    </div>
    <a-table rowKey="key" :columns="columns" :dataSource="rpdesc" :pagination="false">
      <template slot="rpdesctime" slot-scope="record">
        <span>{{record.rpdesctime | formateDate}}</span>
      </template>
      <template slot="operation" slot-scope="text, record,index" v-if="edit">
        <a class="editor" @click="editor(record,index)">编辑</a>
        <a class="editor" @click="remove(index)">删除</a>
      </template>
    </a-table>
    <a-button v-if="edit" class="abbBtn" type="dashed" @click="addRecord">
      <a-icon type="plus" />添加
    </a-button>
    <editor-rewards-form
      v-if="visible"
      :record="record"
      :user="user"
      :visible="visible"
      @update="updateRecord"
      @toggleModal="switchModal"
    ></editor-rewards-form>
  </div>
</template>
<script>
import { showError } from "@/framework/utils/index";
import { updateUser } from "@/person/api/user";
import { Row, Col, Table, Button, Icon } from "ant-design-vue";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import EditorRewardsForm from "./EditorRewardsForm";

let columns = [
  {
    title: "奖惩时间",
    scopedSlots: { customRender: "rpdesctime" },
    width: 90
  },
  {
    title: "奖惩单位",
    dataIndex: "rpdescorg"
  },
  {
    title: "奖惩内容",
    dataIndex: "rpdesctext"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    width: 100
  }
];
export default {
  data() {
    return {
      visible: false,
      columns,
      record: {},
      recordList: Array.isArray(this.user.rpdesc) ? this.user.rpdesc : [],
      copyRecordList: Array.isArray(this.user.rpdesc)
        ? cloneDeep(this.user.rpdesc)
        : [],
      recordIndex: "",
      opType: "",
      edit: false
    };
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rpdesc() {
      let arr = this.recordList.map(function(item, index, ary) {
        item.key = Math.random();
        return item;
      });
      arr.sort(this.sortUpDate);
      return arr;
    }
  },
  components: {
    ARow: Row,
    ACol: Col,
    ATable: Table,
    AButton: Button,
    AIcon: Icon,
    EditorRewardsForm
  },
  filters: {
    formateDate(value) {
      if (!value) {
        return "";
      } else {
        return moment(value).format("YYYY-MM");
      }
    }
  },
  methods: {
    sortUpDate(a, b) {
      return Date.parse(b.rpdesctime) - Date.parse(a.rpdesctime);
    },
    switchModal(type) {
      this.visible = type;
    },
    editor(record, index) {
      this.record = record;
      this.recordIndex = index, 
      this.opType = "edit";
      this.visible = true;
    },
    addRecord() {
      this.record = {};
      this.opType = "add";
      this.visible = true;
    },
    remove(index) {
      this.recordList.splice(index, 1);
    },
    updateRecord(record) {
      if (this.opType == "edit") {
        this.recordList.splice(this.recordIndex, 1, record);
      } else {
        this.recordList.push(record);
      }
      this.visible = false;
    },
    saveTable() {
      updateUser(this.user._id, { rpdesc: this.recordList })
        .then(res => {
          this.$notification.open({
            message: "提示",
            description: "保存成功",
            duration: 3
          });
          if (res.result && res.result.rpdesc) {
            this.recordList = res.result.rpdesc;
            this.copyRecordList = cloneDeep(res.result.rpdesc);
          } else {
            this.recordList = [];
          }
          this.edit = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    cancelSaveTable() {
      this.recordList = cloneDeep(this.copyRecordList);
      this.edit = false;
    }
  }
};
</script>

<style lang="less" scoped>
.tablewrap {
  padding: 0px @padding-md;
  height: 100%;
  overflow-y: auto;
  .top-btn {
    margin: 10px 0px;
  }
  /deep/ table {
    td {
      padding: 12px 6px;
    }
    th {
      padding: 12px 6px;
    }
    .editor {
      color: @primary-color;
      &:last-child {
        margin-left: 10px;
      }
    }
  }
  .abbBtn {
    width: 100%;
    margin: 6px 0;
  }
}
</style>