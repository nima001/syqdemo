<template>
  <!-- 查看工资标准  -->
  <div class="SalaryLookPayStandard">
    <a-modal
      v-if="datasource.length && dataType == 0"
      :visible="isShowPay"
      :title="title"
      :width="theWidth"
      :footer="null"
      :bodyStyle="bodystyle"
      @cancel="Modalcancel"
    >
      <div id="SalaryLookPayStandard">
        <a-table
          class="writeTable"
          :columns="columns"
          :dataSource="datasource"
          :pagination="false"
          :bordered="true"
        >
          <!-- 根据坐标 显示对应的点 -->
          <span :slot="getClo" slot-scope="val,record" :class="getRow(record)">{{val}}</span>
        </a-table>
      </div>
    </a-modal>
    <!-- 审计人员工作补贴 -->
    <a-modal
      :visible="isShowPay"
      :title="scalename"
      width="30vw"
      :footer="null"
      @cancel="Modalcancel"
      v-if="dataType == 1"
    >
      <div class="infoModal">执行标准：{{InnerContent}}</div>
      <div class="infoModal">其他说明：{{otherTip}}</div>
    </a-modal>
    <a-modal
      :visible="isShowPay"
      :title="scalename"
      width="50vw"
      :footer="null"
      @cancel="Modalcancel"
      v-if="dataType == 2"
    >
      <div class="infoModal">执行标准：{{InnerContent}}</div>
      <div class="infoModal">其他说明：{{otherTip}}</div>
    </a-modal>
  </div>
</template>
<script>
import { scaledata } from "@/salary/api/salaryManage";
import { Modal, Table } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  data() {
    return {
      InnerContent: "",
      otherTip: "",
      dataType: 0,
      theWidth: "40vw",
      row: "",
      clo: "",
      title: "",
      bodystyle: {
        "max-height": "70vh",
        overflow: "auto",
        padding: "8px 24px"
      },
      columns: [],
      datasource: []
    };
  },
  components: {
    AModal: Modal,
    ATable: Table
  },
  props: ["isShowPay", "showPayRecord"], //props
  methods: {
    Modalcancel() {
      this.$emit("closeModal");
    }
  },
  computed: {
    getClo() {
      return `children${this.clo}`;
    },
    getRow() {
      return record => {
        return `row${this.row}` == record.key ? "active" : "";
      };
    }
  },
  created() {
    //获取表格数据
    scaledata(this.showPayRecord.salaryscale)
      .then(res => {
        if (res.result.datatype == 1) {
          this.InnerContent =
            res.result.expression || res.result.wageScaleData.expression;
          this.otherTip = res.result.remark || res.result.wageScaleData.remark;
          this.scalename =
            res.result.scalename || res.result.wageScaleData.scalename;
          this.dataType = 1;
          return;
        }
        if (res.result.datatype == 2) {
          this.InnerContent =
            res.result.expression || res.result.wageScaleData.expression;
          this.otherTip = res.result.remark || res.result.wageScaleData.remark;
          this.scalename =
            res.result.scalename || res.result.wageScaleData.scalename;
          this.dataType = 2;
          return;
        }
        let splitIndex = this.showPayRecord.coordinate.indexOf(",");
        //获取对应的坐标
        this.row = this.showPayRecord.coordinate.substr(0, splitIndex);
        this.clo = this.showPayRecord.coordinate.substr(
          splitIndex + 1,
          this.showPayRecord.coordinate.length - 1
        );
        //封装数据
        this.title = res.result.scalename;
        let thead = res.result.thead;
        let tbody = res.result.tbody;
        let dataKey = []; //指定唯一 dataIndex

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
              }
              childrenArr[j].key = childrenOnly;
              childrenArr[j].align = "center";
              childrenArr[j].dataIndex = childrenOnly;
              childrenArr[j].scopedSlots = { customRender: childrenOnly }; //插槽
              dataKey.push(childrenOnly);
            }
          } else {
            if (thead[i].title) {
              if (ifHead) {
                if (thead[i].children) {
                  thead[i].align = "center";
                  thead[i].dataIndex = `father${i}`;
                  thead[i].key = `father${i}`;
                } else {
                  let only = `children${index}`;
                  index++;
                  thead[i].align = "center";
                  thead[i].dataIndex = only;
                  thead[i].key = only;
                  thead[i].scopedSlots = { customRender: only };
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
                childrenArr[j].key = childrenOnly;
                childrenArr[j].scopedSlots = { customRender: childrenOnly };
                childrenArr[j].align = "center";
                childrenArr[j].dataIndex = childrenOnly;
                dataKey.push(childrenOnly);
              }
            }
          }
        }

        this.columns = thead; //列
        //封装 datasource
        let datasourceArr = [];
        for (let i = 0; i < tbody.length; i++) {
          let arr = [];
          let rowObj = {};
          arr.push(tbody[i].text);
          for (let j = 0; j < tbody[i].data.length; j++) {
            arr.push(tbody[i].data[j].salary);
          }
          for (let m = 0; m < dataKey.length; m++) {
            rowObj[dataKey[m]] = arr[m];
          }
          rowObj.key = `row${i}`; //指定唯一key
          datasourceArr.push(rowObj);
        }
        this.datasource = datasourceArr;
        let num = 0;
        for (let i = 0; i < thead.length; i++) {
          if (thead[i].children) {
            num += thead[i].children.length;
          }
        }
        if (num < 3 && thead.length < 3) {
          this.theWidth = "40vw";
        } else {
          this.theWidth = "80vw";
        }
      })
      .catch(error => {
        showError(error);
      });
    //this.title = this.showPayRecord.name
  }
};
</script>
<style lang="less" scoped >
#SalaryLookPayStandard .active {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: @primary-color;
  color: white;
}
.SalaryLookPayStandard {
  /* 修改表头 编辑 */
  .ant-table-thead tr th {
    color: black;
    font-size: 16px;
    /* 没有实际高度 设置padding */
    padding: 10px 10px;
  }
  /* tbody 编辑 */
  .ant-table-tbody > tr > td {
    font-weight: 200;
    font-size: 14px;
    /* 没有实际高度 设置padding */
  }
  /deep/.ant-table-tbody > tr > td {
    padding: 16px;
  }
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