<template>
  <!-- 工资项目维护  -->
  <a-layout>
    <a-layout-content class="contentForItemDefend">
      <div>
        <!-- 表格 -->
        <a-table
          v-if="datasource.length"
          class="tableClsForItemDefend"
          :defaultExpandAllRows="true"
          :columns="this.getColumns()"
          :dataSource="datasource"
          :bordered="false"
          :loading="loading"
          :pagination="false"
          :customRow="customRow"
        >
          <!-- 插槽 -->
          <span
            style="cursor: pointer"
            @click="showDetail(record,$event)"
            class="detailForItemDefend"
            slot="do"
            slot-scope="val,record"
          >
            <!-- 说明为子行 -->
            <span v-if="record.tags">查看详情</span>
          </span>
          <!-- 项目名称 -->
          <span slot="name" slot-scope="val,children">
            <span v-if="children.tags">
              <span>{{children.name}}</span>
              <span class="personKindBoxForItemDefend">
                <span
                  v-for="(item,index) in children.tags"
                  :key="index"
                  class="personKindForItemDefend"
                >{{item}}</span>
              </span>
            </span>
            <span v-else>{{val}}</span>
          </span>
          <!-- 加减项 -->
          <span v-if="children.tags" slot="issubitem" slot-scope="val,children">{{val==0?'加项':'减项'}}</span>
          <!-- 是否统发 -->
          <span
            v-if="children.tags"
            slot="isdistribution"
            slot-scope="val,children"
          >{{val==0?'统发':'自发'}}</span>
        </a-table>
      </div>
      <Info-Box
        :detailData="InforDetail"
        :treeData="treeData"
        :typename="typename"
        :datasource="datasource"
        :num="num"
        :visible="visible"
        @closeModal="InforCancel"
      />
    </a-layout-content>
  </a-layout>
</template>
<script>
import InfoBox from "./components/InfoBox";
import { showError } from "@/framework/utils/index";
import { getitem, getdetail} from "@/salary/api/wagesystem";
import { Layout, Table, Modal, Input, Select } from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ATable: Table,
    AModal: Modal,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    InfoBox
  },
  name: "salaryItemDefend",
  data: function() {
    return {
      num: "",
      bodystyle: {
        "max-height": "70vh",
        overflow: "auto",
        padding: "8px 24px"
      },
      searchObj: "user",
      columns: [],
      datasource: [],
      visible: false,
      loading: false,
      typename: "",
      InforDetail: {},
      treeData: []
    };
  },
  created() {
    this.getnewItem();
    this.getColumns();
  },
  methods: {
    getnewItem() {
      this.loading = true;
      //显示存活的工资项
      getitem()
        .then(res => {
          this.loading = false;
          let resdata = res.result;
          //为table 添加key
          for (let i = 0; i < resdata.length; i++) {
            resdata[i]["key"] = i + 1;
            let childrenArr = resdata[i].children;
            if (childrenArr) {
              for (let j = 0; j < childrenArr.length; j++) {
                childrenArr[j]["key"] = `key${i}-${j + 1}`; //children key
                let typename = childrenArr[j].namespace;
                this.typename = typename;
              }
            }
          }
          this.datasource = res.result;
        })
        .catch(error => {
          this.loading = false;
          showError(error);
        });
    },
    //判断columns
    getColumns() {
      if (this.typename === "inner")
        return [
          {
            title: "项目名称",
            dataIndex: "name", //列
            key: "name",
            align: "left",
            width: "40%",
            scopedSlots: { customRender: "name" } //插槽
          },
          {
            title: "加/减项",
            dataIndex: "issubitem",
            key: "issubitem",
            width: "15%",
            scopedSlots: { customRender: "issubitem" }, //插槽
            align: "center"
          },
          {
            dataIndex: "isdistribution",
            key: "isdistribution",
            scopedSlots: { customRender: "isdistribution" },
            title: "是否统发",
            width: "15%",
            align: "center"
          },
          {
            dataIndex: "enabledate",
            key: "enabledate",
            title: "生效时间",
            width: "15%",
            align: "center",
            scopedSlots: { customRender: "enabledate" }
          },
          {
            title: "操作", //第二列
            dataIndex: "do",
            key: "do",
            align: "center",
            width: "15%",
            scopedSlots: { customRender: "do" }
          }
        ];
      if (this.typename === "basicworker")
        return [
          {
            title: "项目名称",
            dataIndex: "name", //列
            key: "name",
            align: "left",
            width: "40%",
            scopedSlots: { customRender: "name" } //插槽
          },
          {
            title: "操作", //第二列
            dataIndex: "do",
            key: "do",
            align: "center",
            width: "15%",
            scopedSlots: { customRender: "do" }
          }
        ];
    },
    customRow: function(record) {
      //点击行的回调  record当前行的数据
      let that = this;
      return {
        on: {
          click: function() {
            if (record.tags) {
              that.showDetail(record);
            } else {
              return;
            }
          }
        }
      };
    },
    //查看详情
    showDetail(record, e) {
      //阻止冒泡
      if (e) {
        e.stopPropagation();
      }
      let id = record.id;
      //获取工资项详情
      getdetail(id)
        .then(res => {
          this.InforDetail = res.result;
          this.treeData = res.result.rule;
          let str = res.result.ledger.num;
          this.num = str;
          // //截取有效字段
          // let index_left = str.indexOf("〔");
          // let index_right = str.indexOf("〕");
          // //get 对应的字段
          // this.num_name = str.substring(0, index_left);
          // this.num_year = str.substring(index_left + 1, index_right);
          // this.num_number = str.substring(index_right + 1, str.length - 1);
          //show modal
          this.visible = true;
        })
        .catch(error => {
          showError(error);
        });
    },
    //退出 modal
    InforCancel() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.ant-layout {
  .ant-table-tbody tr {
    cursor: pointer;
  }
  /* 修改表头background */
  .ant-table-thead tr th {
    background-color: rgba(242, 242, 242, 1);
    color: black;
  }
  .contentForItemDefend {
    padding: @layout-space-base;
  }
  .contentForItemDefend > div {
    background-color: white;
    overflow: hidden;
    padding: @content-padding-v @content-padding-h;
    height: 100%;
    overflow-y: auto;
  }
  .tableClsForItemDefend {
    margin: 0 auto;
    padding-top: @layout-space-base;
  }
  /* 详情 */
  .detailForItemDefend {
    color: @primary-color;
  }
  .detailForItemDefend:hover {
    text-decoration: underline;
  }
  /* 项目名称主题分支 */
  .sonCssForItemDefend {
    padding-left: 28px;
  }
  /* 分支对应人物标签 */
  .personKindBoxForItemDefend {
    margin-left: 45px;
  }
  .personKindForItemDefend {
    background-color: @primary-color;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    border-radius: 10px;
    padding: 0 10px;
    margin-left: 10px;
    text-align: center;
    color: white;
  }
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 2px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.1);
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>