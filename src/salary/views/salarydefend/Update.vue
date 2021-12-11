<template>
  <!--  更新   -->
  <div class="updateFile">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="title">工资标准名称：{{itemName}}</div>
          <a-form :form="form" class="form">
            <a-row>
              <a-form-item label="启用时间：" :label-col="{ span:11 }" :wrapper-col="{ span:10 }">
                <a-date-picker
                  style="width: 250px"
                  v-decorator="[
                                        'startTime', 
                                        {rules: [{required: true, message:'请完善信息'}]}
                                    ]"
                />
              </a-form-item>
            </a-row>
          </a-form>
          <div class="operateFile">
            <span>更新内容：</span>
            <span>
              <a @click="modal('change')" href="#">在线编辑数值</a>
            </span>
            <span>
              <a href="#">导出Excel</a>
            </span>
            <span>
              <a href="#">导入Excel</a>
            </span>
            <span>
              <a @click="modal('house')" href="#">引用标准库</a>
            </span>
          </div>
          <a-table
            class="tableCls"
            :columns="columns"
            :dataSource="datasource"
            :bordered="true"
            :loading="false"
            :pagination="false"
            :customRow="customRow"
            @change="changePagination"
          ></a-table>
          <div class="twoButton">
            <button @click="cancel">取消</button>
            <button @click="update">确定</button>
          </div>
          <!-- 编辑 modal -->
          <salaryStandard-Modal
            v-if="detailData.code"
            @closeModal="Modalcancel"
            :isShow="visible"
            :detailData="detailData"
            :type="type"
          ></salaryStandard-Modal>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import salaryStandardModal from "./SalaryStandardModal";
import {Layout,Breadcrumb,Form,Row,Table,Button,DatePicker} from 'ant-design-vue';
export default {
  components: {
    ALayout:Layout,
    ALayoutHeader:Layout.Header,
    ALayoutContent:Layout.Content,
    ABreadcrumb:Breadcrumb,
    ABreadcrumbItem:Breadcrumb.Item,
    AForm:Form,
    AFormItem:Form.Item,
    ARow:Row,
    ATable:Table,
    AButton:Button,
    ADatePicker:DatePicker,
    salaryStandardModal
  },
  name: "update",
  created() {
    this.detailData = this.$route.params.data; //addnewRecord 通过router传递 表格数据  obj
    this.scaleId = this.$route.params.scaleId; //更新的是哪个标准  唯一id
    this.itemName = this.$route.params.data.itemName;
    //封装 thead tbody
    let dataArr = this.detailData.result;
    let thead = dataArr.thead;
    let tbody = dataArr.tbody;
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
  },
  data() {
    return {
      itemName: "",
      ifChange: false,
      sendArr: [], //通过 salaryStandardModal   emit中枢传递
      detailData: {}, //表格数据  传递给salaryStandardModal
      visible: false,
      scaleId: "", //被更新的标准的id
      type: 1,
      form: this.$form.createForm(this),
      columns: [],
      datasource: [],
      pagination: {
        hideOnSinglePage: true //不展示分页效果
      }
    };
  },
  methods: {
    cancel() {
      //取消
      this.$router.push({
        name: "addNewRecord",
      });
    },
    update() {
      //更新
      let that = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          let arr = that.$route.params.saveData;
          for (let m = 0; m < arr.length; m++) {
            //为更新的数据增加  启用时间字段
            if (arr[m].id == that.scaleId) {
              arr[m].enabletime = values.startTime.format("YYYY-MM-DD");
              //标准的表格数据   写入arr  用户做了相应的编辑操作
              if (this.ifChange == true) {
                arr[m].sendArr = that.sendArr;
              } else {
                //用户没做任何编辑操作   封装传递的数据
                let bodyArr = []; //最后send的tbody
                let headArr = this.columns; //最后send的thead  不需要处理

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
                  bodyArr.push(obj);
                }
                arr[m].sendArr = bodyArr;
              }
            }
          }
          that.$router.push({
            name: "addNewRecord",
          });
        }
      });
    },
    customRow: function(record) {
      //点击行的回调  record当前行的数据
      return {
        on: {
          click: function() {
            return;
          }
        }
      };
    },
    changePagination(pagination) {
      //点击分页的回调
      return;
    },
    modal(val) {
      this.visible = true;
      this.type = val; //编辑   val --> modal 类型
    },
    Modalcancel(changeObj) {
      if (changeObj && changeObj.sendArr) {
        this.ifChange = true;
        this.sendArr = changeObj.sendArr;
        //用户编辑之后 页面的响应
        this.datasource = changeObj.datasource;
      }
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.updateFile {
  height: 100%;
}
.updateFile .ant-layout {
  height: 100%;
}
/* 几个a标签 */
.updateFile .operateFile a {
  text-decoration: underline;
  padding-right: 12px;
  cursor: pointer;
}
/* 修改表头 */
.updateFile .ant-table-thead tr th {
  color: black;
  font-size: 16px;
  /* 没有实际高度 设置padding */
  padding: 10px 10px;
}
/* tbody */
.updateFile .ant-table-tbody tr td {
  color: black;
  font-size: 14px;
  /* 没有实际高度 设置padding */
  padding: 6px 6px;
}
/* 内容区样式 */
.updateFile .content {
    padding: @layout-space-base;
}
.updateFile .content > div {
  background-color: white;
  overflow: hidden;
 padding: @content-padding-v @content-padding-h;
  position: relative;
  height: 100%;
}
/* 表格 */
.updateFile .tableCls {
  width: 800px;
  margin: 0 auto;
  margin-top: 24px;
  overflow-y: auto;
  height: 450px;
}
/* 按钮 */
.updateFile .twoButton {
  position: absolute;
  height: 32px;
  width: 240px;
  left: 50%;
  margin-left: -120px;
  display: grid;
  grid-template-columns: repeat(2, 100px);
  justify-content: space-around;
  bottom: 48px;
}
.updateFile .twoButton button:nth-of-type(1) {
  border: none;
  outline: none;
  background-color: @primary-color;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.updateFile .twoButton button:nth-of-type(2) {
  border: none;
  outline: none;
  background-color: white;
  color: @primary-color;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid @primary-color;
}
/* 操作excel */
.updateFile .operateFile {
  width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, auto);
  justify-content: center;
}
/* ant表单 */
.updateFile .form {
  margin-top: 48px;
}
/* 标题 */
.updateFile .title {
  width: 600px;
  margin: 0 auto;
  font-size: 25px;
  color: black;
  font-weight: bold;
  margin-top: 36px;
  text-align: center;
}
</style>