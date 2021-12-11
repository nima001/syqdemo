<template>
  <div class="check-model">
    <div class="check-search">
      <a-button type="primary" @click="loadData">刷新</a-button>
      <a-select allowClear placeholder="数据来源" style="width: 200px" @change="onSourceChange">
        <a-select-option v-for="(item) in datasourceSelect" :key="item">{{item}}</a-select-option>
      </a-select>
    </div>
    <div class="table" style="height: 410px">
      <a-table
        :columns="columns"
        rowKey="key"
        :dataSource="datalist"
        :rowClassName="rowClassName"
        :rowSelection="rowSelection"
        :pagination="false"
        :loading="loading"
        :scroll="{ y: 375 }"
      ></a-table>
    </div>
  </div>
</template>
<script>
import { getusertransfer, getUser, datavalidation } from "@/person/api/user";
import { Modal, Select, Input, Table, Button, Spin } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      columns: [
        { title: "序号", width: "2em", customRender: this.indexRender },
        { title: "名称", dataIndex: "name", width: "20%" },
        {
          title: "本地数据",
          width: "25%",
          customRender: this.dataRender("local")
        },
        {
          title: "源数据",
          width: "25%",
          customRender: this.dataRender("remote")
        },
        { title: "数据来源", dataIndex: "datasource", width: "15%" }
      ],
      datasourceSelect: ["公安人口库","省人力社保厅","教育部"],
      rows: [
        { name: "姓名", datasource: "公安人口库", key: "username" },
        {name: "性别",datasource: "公安人口库",key: "sex",dict: "usermanage.user.sex"},
        { name: "身份证号", datasource: "公安人口库", key: "idcard" },
        { name: "出生日期", datasource: "公安人口库", key: "birthday" },
        {name: "民族",datasource: "公安人口库",key: "nation",dict: "usermanage.user.nation"},
        {name:'籍贯',datasource:'公安人口库',key:'nativeplace'},
        {name:'参加工作时间',datasource:'省人力社保厅',key:'worktime'},
        {name:'全日制教育学历',datasource:'教育部',dict:'usermanage.user.education',key:'fteducation'},
        {name:'全日制教育毕业院校及专业',datasource:'教育部',key:'ftspecialtyschools'},
        {name:'全日制教育毕业时间',datasource:'教育部',key:'ftgraduationtime'},
        {name:'在职教育学历',datasource:'教育部',dict:'usermanage.user.education',key:'pteducation'},
        {name:'在职教育毕业院校及专业',datasource:'教育部',key:'ptspecialtyschools'},
        {name:'在职教育毕业时间',datasource:'教育部',key:'ptgraduationtime'}
      ],
      datalist: undefined,
      userdata: {
        local: undefined,
        remote: undefined
      },
      loading: false,
      selectedKeys: undefined,
      rowSelection: {
        columnWidth: 20,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedKeys = selectedRowKeys;
        },
        getCheckboxProps: row => {
          let { local, remote } = this.userdata;
          return {
            props: {
              disabled: !(
                remote.hasOwnProperty(row.key) &&
                local[row.key] != remote[row.key]
              )
            }
          };
        }
      }
    };
  },
  components: {
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    ATable: Table,
    AButton: Button,
    ASpin: Spin
  },
  created() {
    this.loadData();
  },
  methods: {
    onSourceChange(value) {
      if (value) {
        this.datalist = this.rows.filter(item => item.datasource == value);
      } else {
        this.datalist = this.rows;
      }
    },
    indexRender(text, row, index) {
      return index + 1;
    },
    dataRender(key) {
      return row => {
        let user = this.userdata[key];
        if (user) {
          let val = user[row.key];
          if (val) {
            if (row.dict) {
                let d = this.$store.getters.dictKey(row.dict, val);
                return (d && d.text) || val;
            } else if (row.key == "birthday") {
              return val.split(" ")[0];
            } else {
              return val;
            }
          }else if(key == 'remote' && !user.hasOwnProperty(row.key)){
            return "未获取到数据";
          }
        }
      };
    },
    rowClassName(row, rowIndex) {
      let { local, remote } = this.userdata;
      if (remote.hasOwnProperty(row.key)) {
        if (local[row.key] != remote[row.key]) {
          return "err-result";
        }
      } else {
        return "unknown-result";
      }
    },
    loadData() {
      this.loading = true;
      Promise.all([
        getUser(this.user._id).then(({ result }) => result),
        datavalidation(this.user.idcard, this.user.username)
          .then(({ result }) => result)
          .catch(err => Promise.resolve({}))
      ])
        .then(([local, remote]) => {
          this.loading = false;
          this.userdata = { local, remote };
          this.datalist = this.rows;
        })
        .catch(err => {
          showError(err);
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.check-model {
  .check-search {
    padding: @content-padding-v @content-padding-h;
    .ant-select {
      float: right;
    }
  }
  & > .table {
    padding: 0 @content-padding-h;
    /deep/.ant-table {
      .err-result {
        color: @primary-color;
      }
      .unknown-result {
        color: fade(@disabled-color, 50%);
      }
    }
  }
  .check-btn {
    padding: 14px @content-padding-h;
    height: 60px;
    border-top: 1px solid @border-color-base;
    .btn {
      float: right;
    }
  }
}
</style>