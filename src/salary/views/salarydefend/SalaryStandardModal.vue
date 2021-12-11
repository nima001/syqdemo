<template>
  <!-- modal 组件 -->
  <div class="salaryStandardModal">
    <!-- 展示  不编辑 -->
    <a-modal
      :visible="isShow"
      :title="itemName"
      :width="theWidth"
      :footer="null"
      :bodyStyle="bodystyle"
      @cancel="Modalcancel"
      v-if="(!type || type == 1) && (dataType==0 || dataType==4)"
    >
      <div class="StandardModaltable">
        <!-- 未启用版本 -->
        <div v-if="ifEarlyVer">生效时间：{{itemEnabletime}}</div>
        <div v-if="remarkname" style="text-align:center;padding:5px;font-size:18px">{{remarkname}}</div>
        <a-table
          class="tableCls"
          :columns="columns"
          :dataSource="datasource"
          :pagination="false"
          :bordered="true"
        >
          <div
            class="needNone"
            v-if="record.head == tdTitle"
            slot="children1"
            slot-scope="val,record"
          >{{val}}</div>
          <!-- slot-scope="val, record" -->
          <div v-else slot="children1" slot-scope="val">{{val}}</div>
        </a-table>
        <!-- 模拟padding-bottom 24px -->
        <div style="height: 24px;width: 100%;"></div>
      </div>
    </a-modal>

    <a-modal
      :visible="isShow"
      title="事业单位薪级工资"
      width="80vw"
      :footer="null"
      :bodyStyle="bodystyle"
      @cancel="Modalcancel"
      v-if="dataType == 5"
    >
      <div class="StandardModaltable">
        <Salary-Table v-if="bodyArr.length" :theadArr="theadArr" :totalData="bodyArr"></Salary-Table>
      </div>
    </a-modal>

    <!-- 审计人员工作补贴 -->
    <a-modal
      :visible="isShow"
      :title="scalename"
      width="30vw"
      :footer="null"
      @cancel="Modalcancel"
      v-if="dataType == 1"
    >
      <div class="infoModal">
        <div style="text-align: left;">执行标准：{{InnerContent}}</div>
        <div
          style="text-align: left;color: rgba(0, 0, 0, 0.65);font-size: 14px;"
          v-if="ifEarlyVer"
        >生效时间：{{itemEnabletime}}</div>
      </div>
      <div style="text-align: left;" class="infoModal">其他说明：{{otherTip}}</div>
    </a-modal>

    <!-- 养老保险（机关） -->
    <a-modal
      :visible="isShow"
      :title="scalename"
      width="50vw"
      :footer="null"
      @cancel="Modalcancel"
      v-if="dataType == 2"
    >
      <div class="infoModal">执行标准：{{InnerContent}}</div>
      <div class="infoModal">其他说明：{{otherTip}}</div>
    </a-modal>

    <!-- 编辑数据 modal -->
    <a-modal
      :visible="isShow"
      :title="itemName"
      width="80vw"
      @ok="handleOk"
      @cancel="Modalcancel"
      v-if="type == 'change'"
      :bodyStyle="bodystyle"
    >
      <div class="writeModal">
        <!-- <a-table
          class="writeTable"
          :columns="columns"
          :dataSource="datasource"
          :pagination="false"
          :bordered="true"
        >-->
        <!-- 编辑框 -->
        <!-- v-model="val"  -->
        <a-table
          bordered
          :data-source="datasource"
          :columns="columns"
          class="writeTable"
          :pagination="false"
        >
          <template slot="children0" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.key, 'children0', $event)" />
          </template>
        </a-table>
      </div>
    </a-modal>
    <!-- 标准引用库 -->
    <a-modal
      :visible="isShow"
      title="选择标准库"
      width="50vw"
      @cancel="Modalcancel"
      v-if="type == 'house' "
    >
      <div class="houseForModal">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getexchange } from "@/salary/api/wagesystem";
import { Modal, Table } from "ant-design-vue";
import SalaryTable from "./components/SalaryTable";
import EditableCell from "./components/EditableCell";
export default {
  //封装表格数据  datasource
  mounted() {
    if (this.dataType == 4) {
      let that = this;
      function opeRate(node) {
        node.setAttribute("colspan", that.tdNum);
        let _node = node;
        let parent = node.parentNode;
        let firNode = parent.firstElementChild;

        parent.innerHTML = "";

        parent.appendChild(firNode);
        parent.appendChild(_node);
      }
      let timeout = setInterval(() => {
        let node = document.getElementsByClassName("needNone")[0];

        if (node) {
          opeRate(node.parentNode);
          clearInterval(timeout);
        }
      }, 50);
    }
  },
  components: {
    AModal: Modal,
    ATable: Table,
    SalaryTable,
    EditableCell
  },
  created() {
    this.createSalary();
  },
  data() {
    return {
      count: 2,
      theadArr: [],
      bodyArr: [],
      tdTitle: "",
      tdNum: "",
      InnerContent: "",
      otherTip: "",
      dataType: "",
      theWidth: 0,
      itemEnabletime: "", //项目的生效时间
      itemName: "", //项目标题
      remarkname: "",
      slots: [],
      bodystyle: {
        "max-height": "70vh",
        overflow: "auto",
        padding: "24px 0px"
      },
      columns: [],
      datasource: [],
      pagination: {
        hideOnSinglePage: true //不展示分页效果
      }
    };
  },
  props: ["isShow", "ifEarlyVer", "type", "detailData"], //type modal类型   detailData 详情表格数据
  methods: {
    createSalary() {
      let that = this;
      let dataArr;
      //dataType 决定modal类型
      if (this.detailData.record && this.detailData.record.datatype) {
        this.dataType = this.detailData.record.datatype;
        if (this.dataType == 1) {
          this.itemEnabletime = this.detailData.result.enabletime;
          this.otherTip =
            this.detailData.result.remark ||
            this.detailData.result.wageScaleData.remark;
          this.InnerContent =
            this.detailData.result.expression ||
            this.detailData.result.wageScaleData.expression;
          this.scalename =
            this.detailData.result.scalename ||
            this.detailData.result.wageScaleData.scalename;
          return;
        }

        if (this.dataType == 5) {
          this.bodyArr = this.detailData.result.tbody;
          this.theadArr = this.detailData.result.thead[0];
          return;
        }

        if (this.dataType == 4) {
          let id = this.detailData.record.id; //人员id
          getexchange(id).then(res => {
            that.itemName = res.result.name;
            createTable(res.result.wageScaleDataRe, that, 4);
          });
          return;
        }
        if (this.dataType == 2) {
          this.InnerContent =
            this.detailData.result.expression ||
            this.detailData.result.wageScaleData.expression;
          this.otherTip =
            this.detailData.result.remark ||
            this.detailData.result.wageScaleData.remark;
          this.scalename =
            this.detailData.result.scalename ||
            this.detailData.result.wageScaleData.scalename;
          this.dataType = 2;
          return;
        }
      }

      //未启用版本
      if (this.ifEarlyVer) {
        dataArr = this.detailData.result.wageScaleData;
        this.itemEnabletime = this.detailData.result.enabletime; //生效时间
        this.itemName = this.detailData.itemName; //title
      } else {
        this.itemName = this.detailData.itemName;
        this.remarkname = this.detailData.result.remark
          ? this.detailData.result.remark
          : "";
        dataArr = this.detailData.result;
      }

      createTable(dataArr, this, 0);
      function createTable(dataArr, that, strange) {
        //封装数据
        let thead = dataArr.thead;

        let tbody = dataArr.tbody;

        let dataKey = []; //指定唯一 dataIndex
        let slots = []; //定义插槽数组
        //封装columns
        let ifHead = false;
        let index = 0;
        if (thead) {
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
                  thead[i].key = "head";
                  if (thead[i].children) {
                  } else {
                    dataKey.push("head");
                  }
                }
              }
              if (thead[i].children) {
                let childrenArr = thead[i].children;
                for (let j = 0; j < childrenArr.length; j++) {
                  let childrenOnly = `children${j + index}`;
                  slots.push(childrenOnly);
                  childrenArr[j].key = childrenOnly;
                  childrenArr[j].scopedSlots = { customRender: childrenOnly };
                  childrenArr[j].align = "center";
                  childrenArr[j].dataIndex = childrenOnly;
                  dataKey.push(childrenOnly);
                }
              }
            }
          }
          that.slots = slots;
          that.columns = thead; //列
          let num = 0;
          for (let i = 0; i < thead.length; i++) {
            if (thead[i].children) {
              num += thead[i].children.length;
            }
          }
          that.tdNum = num;
          if (num < 3 && thead.length < 3) {
            that.theWidth = "40vw";
          } else {
            that.theWidth = "80vw";
          }
          //封装 datasource  data []   text
          let datasourceArr = [];
          for (let i = 0; i < tbody.length; i++) {
            let arr = [];
            let rowObj = {};
            arr.push(tbody[i].text);
            for (let j = 0; j < tbody[i].data.length; j++) {
              if (strange == 4) {
                if (tbody[i].data.length == 1) that.tdTitle = arr[0];
                arr.push(tbody[i].data[j]);
              } else {
                arr.push(tbody[i].data[j].salary);
              }
            }
            for (let m = 0; m < dataKey.length; m++) {
              if (arr[m]) {
                rowObj[dataKey[m]] = arr[m];
              }
            }
            rowObj.key = `row${i}`; //指定唯一key
            datasourceArr.push(rowObj);
          }
          that.datasource = datasourceArr;
        } else {
          if (dataArr.dataType == 1) {
            this.InnerContent =
              this.detailData.result.expression ||
              this.detailData.result.wageScaleData.expression;
            this.otherTip =
              this.detailData.result.remark ||
              this.detailData.result.wageScaleData.remark;
            this.dataType = 1;
            return;
          }
        }
      }
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.datasource];
      const target = dataSource.find(item => item.key == key);
      if (target) {
        target.children0 = parseInt(value);
        this.datasource = dataSource;
      }
    },
    Modalcancel() {
      this.$emit("closeModal", "close"); //确保modal可以关闭
    },
    //修改表格的值
    changeVal(item, val, record) {
      record[item] = val;
    },
    handleOk() {
      let sendArr = []; //最后send的tbody
      let sendHead = this.columns; //最后send的thead  不需要处理
      //封装上传的数据
      for (let i = 0; i < this.datasource.length; i++) {
        let obj = {};
        obj.data = [];
        for (let key in this.datasource[i]) {
          if (key == "head") {
            obj.text = this.datasource[i].head;
          } else {
            if (key == "key") {
              continue;
            } else {
              obj.data.push(this.datasource[i][key]);
            }
          }
        }
        sendArr.push(obj);
      }
      let changeObj = {};
      changeObj.sendArr = sendArr;
      changeObj.sendHead = sendHead;
      changeObj.datasource = this.datasource;
      //传递至update组件
      this.$emit("closeModal", changeObj); //退出modal
    }
  }
};
</script>
<style lang="less" scoped>
/* 公务员职务工资标准 -- 表格 */
.StandardModaltable {
  height: 100%;
  width: 90%; /* 表格宽度 60% */
  margin: 0 auto;
}
/* 表格不采取分页效果 增加滚轮 */
.ant-modal-body {
  padding: 0;
  overflow-y: auto;
  max-height: 600px;
}
/* 修改表头 */
.StandardModaltable .ant-table-thead tr th {
  color: black;
  font-size: 16px;
  /* 没有实际高度 设置padding */
  padding: 10px 10px;
}
/* tbody */
.StandardModaltable .ant-table-tbody tr td {
  font-size: 14px;
  /* 没有实际高度 设置padding */
  height: 30px;
  line-height: 30px;
  padding: 0 0;
}
.writeModal {
  width: 90%;
  margin: 0 auto;
}
/* 修改表头 编辑 */
.writeModal .ant-table-thead tr th {
  color: black;
  font-size: 16px;
  /* 没有实际高度 设置padding */
}
/* tbody 编辑 */
.writeModal .ant-table-tbody tr td {
  font-weight: 200;
  font-size: 14px;
  /* 没有实际高度 设置padding */
  padding: 0px 0px;
}
/* 修改表格hover */
.writeModal .ant-table-tbody tr:hover td {
  background-color: white;
}
/* 养老保险 */
.oldInsureModal {
  width: 70%;
  margin: 0 auto;
  font-size: 16px;
  color: black;
  font-weight: normal;
  line-height: 1.6;
}
/* 编辑表格样式 */
.writeModal .writeTable {
  width: 80%;
  margin: 0 auto;
}
/* 引用库 */
.houseForModal {
  display: grid;
  grid-template-columns: repeat(3, 25%);
  grid-template-rows: repeat(auto, 50px);
  grid-row-gap: 20px;
  justify-content: space-evenly;
}
.houseForModal div {
  height: 35px;
  background-color: #c3c3c3;
  text-align: center;
  line-height: 35px;
  border-radius: 5px;
}
/* 编辑输入框 */
.changeRecordInput {
  border: none;
  outline: none;
  text-align: center;
  width: 100%;
}

/* 修改表头 编辑 */
.StandardModaltable .ant-table-thead tr th {
  color: black;
  font-size: 16px;
  /* 没有实际高度 设置padding */
  padding: 10px 10px;
}
/* tbody 编辑 */
.StandardModaltable .ant-table-tbody tr td {
  font-weight: 200;
  font-size: 14px;
  /* 没有实际高度 设置padding */
}

.text {
  background-color: red;
}
.infoModal {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  &:nth-of-type(1) {
    padding: 30px 0;
    padding-bottom: 5px;
    font-size: 18px;
    color: #171717;
  }
  &:nth-of-type(2) {
    font-size: 18px;
    color: #171717;
    padding: 30px 0;
    padding-top: 5px;
  }
}
</style>