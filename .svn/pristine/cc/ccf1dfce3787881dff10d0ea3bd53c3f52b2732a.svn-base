<template>
  <!-- 历史工改详情 -->
  <!-- 记得增加路由守卫 -->
  <div class="historyworkreform">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="historyInfo">
            <div>名称：{{itemRecord.reason}}</div>
            <div style="width: 500px;">依据：{{itemRecord.title}}</div>
            <div>操作时间：{{itemRecord.operationtime}}</div>
            <div>批准文号：{{itemRecord.ledgerVo.num}}</div>
          </div>
          <div class="nav">
            <div @click="active($event)" class="payitem active">工资项目</div>
            <div @click="active($event)" class="paystandard">工资标准</div>
            <div></div>
          </div>
          <!-- 工资项目 -->
          <a-table
            v-if="datasourceHistoryitem.length"
            v-show="now"
            class="tableCls"
            :columns="columnsHistoryitem"
            :defaultExpandAllRows="true"
            :dataSource="datasourceHistoryitem"
            :bordered="false"
            :loading="false"
            :customRow="customRow"
            :pagination="false"
          >
            <!-- 插槽 -->
            <span
              class="lookcss"
              slot="operate"
              @click="itemDetail(record)"
              slot-scope="val,record"
            >
              <!-- 说明为子行 -->
              <span v-if="record.tags">查看详情</span>
            </span>
          </a-table>
          <!-- 工资标准 -->
          <a-table
            v-if="!now"
            class="tableCls"
            :columns="columnsHistorystandard"
            :dataSource="datasourceHistorystandard"
            :bordered="false"
            :loading="false"
            :customRow="customRowStandard"
            :pagination="false"
          >
            <span
              @click="detail(record)"
              class="lookcss"
              slot="operate"
              slot-scope="val,record"
            >查看详情</span>
          </a-table>
          <div style="height:48px;"></div>
          <button @click="back" class="btn">返回</button>
        </div>
        <!-- 查看详情 -->
        <salaryStandard-Modal
          v-if="detailData.code"
          @closeModal="Modalcancel"
          :detailData="detailData"
          :isShow="visible"
        ></salaryStandard-Modal>
        <!-- 工资项目 查看详情 -->
        <a-modal
          v-if="detailData.ledger"
          :visible="visibleItem"
          title="查看详情"
          width="70vw"
          :footer="null"
          @cancel="Modalcancel"
        >
          <div class="infoBoxforitemdefend">
            <div class="itemName">
              <span class="name">项目名称：</span>
              <a-input
                :value="detailData.name"
                disabled="disabled"
                style="width: 300px;margin-left: 15px"
              />
            </div>
            <div class="itemName">
              <span class="name">项目分类：</span>
              <a-input
                :value="category(detailData.category)"
                disabled="disabled"
                style="width: 300px;margin-left: 15px"
              />
            </div>
            <div class="itemName">
              <span class="name">加/减项：</span>
              <a-select
                disabled="disabled"
                style="width:300px;margin-left: 15px"
                :defaultValue=" detailData.issubitem==0?'加项':'减项' "
              ></a-select>
            </div>
            <div class="itemName">
              <span class="name">是否统发：</span>
              <a-select
                disabled="disabled"
                style="width:300px;margin-left: 15px"
                :defaultValue=" detailData.isdistribution==0?'统发':'自发' "
              ></a-select>
            </div>
            <div class="itemName">
              <span class="name">标签：</span>
              <!-- 标签 -->
              <span v-for="(item,index) in detailData.tags" :key="index" class="label">{{item}}</span>
            </div>
            <div class="itemName">
              <span class="name">生效时间：</span>
              <a-select
                disabled="disabled"
                style="width:300px;margin-left: 15px"
                :value="detailData.enabledate"
              ></a-select>
            </div>
            <div class="itemName">
              <!-- 展示框 浮动定位 -->
              <span class="rulename">适用范围：</span>
              <span class="rules"></span>
            </div>
            <div class="itemName">
              <span class="name">相关台账：</span>
              <!-- 下载 -->
              <span class="down">{{detailData.ledger.title}}</span>
              <a class="downA" :href="detailData.ledger.fileuri">点击下载</a>
            </div>
            <!-- <div class="itemName">
              <span class="name">批准文号：</span>
              <a-select disabled="disabled" style="width:100px;margin-left: 15px" :value="num_name"></a-select>〔
              <a-input :value="num_year" disabled="disabled" style="width: 70px;" />〕
              <a-input :value="num_number" disabled="disabled" style="width: 60px;" />&nbsp; 号
            </div>-->
            <div class="itemName">
              <span class="name">批准文号：</span>
              <a-input :value="num" disabled="disabled" style="width: 300px;margin-left: 15px" />
            </div>
            <div class="itemName">
              <span class="name">发文时间：</span>
              <a-select
                disabled="disabled"
                style="width:300px;margin-left: 15px"
                :value="detailData.ledger.dispatchdate"
              ></a-select>
            </div>
          </div>
        </a-modal>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import salaryStandardModal from "./SalaryStandardModal";
import { Layout, Table, Modal, Input, Select, Button } from "ant-design-vue";
import { getdetail, getarchive, getnewdata } from "@/salary/api/wagesystem";
import { showError } from "@/framework/utils/index";
export default {
  name: "historyworkreform",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ATable: Table,
    AModal: Modal,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    salaryStandardModal
  },
  computed: {
    //获取项目分类
    category() {
      return id => {
        for (
          let index = 0;
          index < this.datasourceHistoryitem.length;
          index++
        ) {
          if (this.datasourceHistoryitem[index].id == id) {
            return this.datasourceHistoryitem[index].name;
          }
        }
      };
    }
  },
  created() {
    if (this.$route.params) {
      this.itemRecord = this.$route.params.record;
      this.archiveid = this.$route.params.res.id;
      let res = this.$route.params.res.result;
      for (let i = 0; i < res.length; i++) {
        res[i]["key"] = i + 1;
        let childrenArr = res[i].children;
        if (childrenArr) {
          for (let j = 0; j < childrenArr.length; j++) {
            childrenArr[j]["key"] = `key${i}-${j + 1}`; //children key
          }
        }
      }
      this.datasourceHistoryitem = res; //工资项目  表格数据
    }
  },
  data: function() {
    return {
      itemRecord: "",
      // num_name: "",
      // num_number: "",
      // num_year: "",
      num: "",
      //工资项目
      visibleItem: false,
      visible: false,
      detailData: "",
      now: true,
      archiveid: "",
      datasourceHistoryitem: [],
      columnsHistoryitem: [
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "70%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "30%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      //工资标准
      datasourceHistorystandard: [],
      columnsHistorystandard: [
        {
          title: "工资标准名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "40%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "生效时间",
          dataIndex: "enabletime",
          key: "enabletime",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "enabletime" }
        },
        {
          title: "最后更新时间",
          dataIndex: "lastUpdatetime",
          key: "lastUpdatetime",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "lastUpdatetime" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "center",
          width: "20%",
          scopedSlots: { customRender: "operate" }
        }
      ]
    };
  },
  methods: {
    customRow: function(record) {
      //点击行的回调  record当前行的数据
      let that = this;
      return {
        on: {
          click: function() {
            if (record.tags) {
              that.itemDetail(record);
            }
          }
        }
      };
    },
    customRowStandard: function(record) {
      let that = this;
      return {
        on: {
          click: function() {
            that.detail(record);
          }
        }
      };
    },
    back() {
      this.$router.go(-1);
    },
    //close  记得清空  detailData
    Modalcancel(close) {
      if (close == "close") {
        this.detailData = "";
      }
      this.visibleItem = false;
      this.visible = false;
    },
    //按钮样式切换
    active(e) {
      document.getElementsByClassName("payitem")[0].className = "payitem";
      document.getElementsByClassName("paystandard")[0].className =
        "paystandard";
      if (e.target.className == "payitem") {
        this.now = true; //工资项目
      } else {
        this.now = false; //工资标准
        let that = this;
        //防止重复的请求
        if (this.datasourceHistorystandard.length == 0) {
          let archiveid = that.archiveid;
          getarchive(archiveid)
            .then(res => {
              let resdata = res.result;
              for (let i = 0; i < resdata.length; i++) {
                resdata[i]["key"] = i + 1;
              }
              that.datasourceHistorystandard = resdata;
            })
            .catch(error => {
              showError(error);
            });
        }
      }
      e.target.className = e.target.className + " " + "active";
    },
    //工资标准 查看详情
    detail(record) {
      let id = record.id;
      getnewdata(id)
        .then(res => {
          res.itemName = record.name;
          this.detailData = res;
          this.visible = true;
        })
        .catch(error => {
          showError(error);
        });
    },
    //工资项目  查看详情
    itemDetail(record) {
      let id = record.id;
      getdetail(id)
        .then(res => {
          this.detailData = res.result;
          let str = res.result.ledger.num;
          this.num = str;
          //截取有效字段
          // let index_left = str.indexOf("〔");
          // let index_right = str.indexOf("〕");
          // this.num_name = str.substring(0, index_left);
          // this.num_year = str.substring(index_left + 1, index_right);
          // this.num_number = str.substring(index_right + 1, str.length - 1);
          this.visibleItem = true;
        })
        .catch(error => {
          showError(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.historyworkreform {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .ant-table-tbody tr {
    cursor: pointer;
  }

  /* 修改表头background */
  .ant-table-thead tr th {
    background-color: rgba(242, 242, 242, 1);
    color: black;
  }
  /* 表格 */
  .tableCls {
    margin: 0 auto;
    margin-top: 24px;
    height: 500px;
    overflow-y: auto;
  }
  /* top信息 */
  .historyInfo {
    margin-top: @layout-space-base;
    height: 100px;
    width: 500px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    align-items: center;
  }
  .historyInfo div {
    color: black;
    font-size: 15px;
  }
  /* 内容区样式 */
  .content {
    padding: @layout-space-base;
  }
  .content > div {
    background-color: #fff;
    overflow: hidden;
    padding: @content-padding-v @content-padding-h;
    height: 100%;
    position: relative;
    overflow-y: auto;
  }
  .lookcss {
    color: @primary-color;
  }
  .lookcss:hover {
    text-decoration: underline;
  }
  .btn {
    width: 100px;
    position: fixed;
    left: 50%;
    margin-left: -50px;
    height: 32px;
    background-color: @primary-color;
    outline: none;
    color: white;
    border: none;
    border-radius: 5px;
    bottom: 24px;
  }
  /* 导航 */
  .nav {
    display: grid;
    grid-template-columns: 150px 150px auto;
    grid-column-gap: 24px;
  }
  .nav div {
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 12px;
  }
  .paystandard,
  .payitem {
    background-color: @primary-color;
    cursor: pointer;
    border-radius: 5px;
    color: white;
  }
  .active {
    background-color: @primary-color;
    color: white;
  }
}
/* 工资项目详情 */
.infoBoxforitemdefend {
  width: 85%;
  margin: 0 auto;
}
.itemName {
  width: 100%;
  display: flex;
  margin-top: 10px;
  align-items: center;
  .name {
    display: inline-block;
    height: 50px;
    width: 80px;
    line-height: 50px;
    text-align: right;
  }
  /* 下载 */
  .down {
    background-color: #fff;
    padding-top: 0px;
    cursor: pointer;
    width: 58%; /*定义块元素的宽度*/
    white-space: nowrap; /*内容超宽后禁止换行显示*/
    overflow: hidden; /*超出部分隐藏*/
    text-overflow: ellipsis; /*文字超出部分以省略号显示*/
    padding-left: 15px;
  }
  .downA {
    text-decoration: underline;
    padding-left: 20px;
  }
  /* 标签 */
  .label {
    display: inline-block;
    height: 25px;
    width: 60px;
    background-color: @primary-color;
    border-radius: 5px;
    margin-left: 15px;
    line-height: 25px;
    text-align: center;
    color: white;
  }
  /* 信息展示 */
  .rulename {
    display: inline-block;
    height: 330px;
    width: 80px;
    text-align: right;
    float: left;
  }
  .rules {
    display: inline-block;
    margin-left: 15px;
    height: 330px;
    width: 70%;
    border: 1px dotted grey;
    border-radius: 5px;
  }
}
</style>