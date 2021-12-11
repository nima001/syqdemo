<template>
  <!-- 工资详情 -->
  <div class="SalaryDetail">
    <a-layout>
      <!-- 90% -->
      <a-layout-content class="content">
        <div>
          <div class="infoTable">
            <div class="showPay">
              <div>
                <div class="box">
                  <div class="tip">应发合计</div>
                  <div class="money">￥{{salarydetail.totalAdd.toFixed(2)}}</div>
                </div>
                <div class="box">
                  <div style="height: 50%;"></div>
                  <div>一</div>
                </div>
                <div class="box">
                  <div class="tip">减项合计</div>
                  <div class="money">￥{{salarydetail.totalSub.toFixed(2)}}</div>
                </div>
                <div class="box">
                  <div style="height: 50%;"></div>
                  <div>=</div>
                </div>
                <div class="box">
                  <div class="tip">实发合计</div>
                  <div class="money">￥{{salarydetail.actual.toFixed(2)}}</div>
                </div>
              </div>
            </div>
            <!-- 审核部分 -->
            <div class="audit">
              <div class="salaryCheck" v-if="personInfo.usertype == 1">工资科审核部分</div>
              <div class="salaryCheck" v-if="personInfo.usertype == 4">本单位审核部分</div>
              <div class="beforeTable">
                <div class="salaryInfo">
                  <div style="margin-right: 12px">
                    实发合计&nbsp;
                    <span style="font-weight: bold">￥{{tableOne.actual.toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    减项合计&nbsp;
                    <span style="font-weight: bold">￥{{tableOne.totalSub.toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    应发合计&nbsp;
                    <span style="font-weight: bold">￥{{tableOne.totalAdd.toFixed(2)}}</span>
                  </div>
                </div>
              </div>
              <a-table
                class="tableCls"
                :columns="columns"
                :dataSource="datasourceone"
                :pagination="false"
                :customRow="customRow"
                :defaultExpandAllRows="true"
              >
                <span slot="operate" slot-scope="val,record">
                  <span v-if="record.itemid" @click="showChange(record)" class="adjustRtio">查看调整记录</span>
                  <span
                    v-if="record.itemid && record.salaryscale"
                    @click="showPay(record)"
                    class="adjustRtio"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看标准/公式</span>
                </span>
                <!-- 金额 -->
                <span slot="totalsalary" slot-scope="val">{{'￥' + val.toFixed(2)}}</span>
                <span slot="actualsalary" slot-scope="val">{{'￥' + val.toFixed(2)}}</span>
                <!-- 发放比例 -->
                <span slot="ratio" slot-scope="val">{{val==undefined?'--':val*100 + '%'}}</span>
              </a-table>
            </div>
            <!-- 本单位审核部分 -->
            <div class="nowUnit" v-if="personInfo.usertype == 1">
              <div class="self-check">本单位审核部分</div>
              <div class="beforeTableTwo">
                <div class="salaryInfo">
                  <div style="margin-right: 12px">
                    实发合计&nbsp;
                    <span style="font-weight: bold">￥{{tableTwo.actual.toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    减项合计&nbsp;
                    <span style="font-weight: bold">￥{{tableTwo.totalSub.toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    应发合计&nbsp;
                    <span style="font-weight: bold">￥{{tableTwo.totalAdd.toFixed(2)}}</span>
                  </div>
                </div>
              </div>
              <a-table
                class="tableCls"
                :columns="columns"
                :dataSource="datasourcetwo"
                :pagination="false"
                :customRow="customRow"
                :defaultExpandAllRows="true"
              >
                <span slot="operate" slot-scope="val,record">
                  <span @click="showChange(record)" class="adjustRtio">查看调整记录</span>
                </span>
                <span style="padding-left: 16px;" slot="name" slot-scope="val">{{val}}</span>
                <span slot="totalsalary" slot-scope="val">{{'￥' + val}}</span>
                <span slot="actualsalary" slot-scope="val">{{'￥' + val}}</span>
                <span slot="ratio" slot-scope="val">{{val==undefined?'--':val*100 + '%'}}</span>
              </a-table>
            </div>
          </div>
          <!-- 人员详情 -->
          <div class="personInfo">
            <div class="personInfoBox">
              <div class="img">
                <img
                  v-if="personInfo.profilephoto"
                  :src="uiConfigs['api.url'] + '/file/v1/download?uri=' + personInfo.profilephoto"
                  :onerror="`this.src='${defaultPhoto}'`"
                />
                <img v-else :src="defaultPhoto" />
              </div>
              <div style="width: 70%;margin: 0 auto;">
                <div class="name" style="margin-top: 36px">
                  <div>姓名</div>
                  <div>{{personInfo.username}}</div>
                </div>
                <div class="sex">
                  <div>性别</div>
                  <div>{{personInfo.sex}}</div>
                </div>
                <div class="borth">
                  <div>出生日期</div>
                  <div>{{birthday}}</div>
                </div>
                <div class="idcard" v-if="personInfo.usertype == 1">
                  <div>本人身份</div>
                  <div>{{personInfo.identitytype}}</div>
                </div>
                <div class="selfjob" v-if="personInfo.usertype == 1">
                  <div>工资等级</div>
                  <div>{{personInfo.treatlevel}}</div>
                </div>
                <div class="ownjob" v-if="personInfo.usertype == 1">
                  <div>薪级</div>
                  <div>{{personInfo.salarylevel}}</div>
                </div>
                <div class="selfjob" v-if="personInfo.usertype == 4">
                  <div>级别</div>
                  <div>{{personInfo.commlevel}}</div>
                </div>
                <div class="ownjob" v-if="personInfo.usertype == 4">
                  <div>社会工作师级别</div>
                  <div>{{personInfo.shgzslevel}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>

      <!-- 查看调整记录-->
      <changehistorymodal
        v-if="record"
        @closeModal="Modalcancel"
        :isShow="visible"
        :UserSelfChange="ifUserSelfChange"
        :record="record"
      ></changehistorymodal>
      <!-- 查看 标准 公式 -->
      <salaryLookPay-Standard
        v-if="showPayRecord"
        @closeModal="Modalcancel"
        :isShowPay="visiblePay"
        :showPayRecord="showPayRecord"
      ></salaryLookPay-Standard>

      <!-- 10%高度 -->
      <div class="footer">
        <div>
          <div>技术支持电话:0571-88888888</div>
          <div>主办单位:浙江省余杭 备案:内容内容内容</div>
          <div>建议使用1366*768分辨率/IE9.0或以上浏览器访问达到最佳效果</div>
        </div>
      </div>
    </a-layout>
  </div>
</template>
<script>
import changehistorymodal from "./ChangehistoryModal";
import salaryLookPayStandard from "./SalaryLookPayStandard";
import { showError } from "@/framework/utils/index";
import { uiConfigsCookies } from "@/framework/utils/auth";
import {
  usersalary,
  salarydetail,
  salaryupdaterecord,
  constantdictlist,
} from "@/salary/api/salaryManage";
import { Layout, Breadcrumb, Table } from "ant-design-vue";
export default {
  name: "monthSalaryDetail",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    changehistorymodal,
    salaryLookPayStandard,
  },
  created() {
    //人员工资数据
    let that = this;
    this.salarydetail = this.$route.params; //整个 工资情况
    this.onlyUserId = this.salarydetail.onlyUserId;
    this.onlytime = this.salarydetail.onlytime;
    //人员信息
    this.getusersalary();
    let tableArr = this.$route.params.salaryVos; //表格数组  目前两个
    //俩表的 tbody thead
    if (tableArr.length > 1) {
      this.tableOne = tableArr[0];
      this.tableTwo = tableArr[1];
    } else {
      this.tableOne = tableArr[0];
      this.tableTwo = [];
    }
    //第一张表
    for (let i = 0; i < this.tableOne.result.length; i++) {
      this.tableOne.result[i]["key"] = i + 1;
      let childrenArr = this.tableOne.result[i].children;

      if (childrenArr) {
        for (let j = 0; j < childrenArr.length; j++) {
          childrenArr[j]["key"] = `${i + 1}--${j + 1}`; //children key
        }
      }
    }
    this.datasourceone = this.tableOne.result;
    //第二张表
    let resArr = tableArr.length > 1 ? this.tableTwo.result[0].children : [];
    for (let m = 0; m < resArr.length; m++) {
      resArr[m].key = m + 1;
    }
    this.datasourcetwo = resArr;
  },
  data: function () {
    return {
      defaultPhoto: require("@/framework/assets/img/head-default-70x98.png"),
      uiConfigs: uiConfigsCookies(),
      birthday: "", //生日时间
      onlytime: "", //请求的月份
      showPayRecord: "", //传递给查看标准  公式
      onlyUserId: "",
      personInfo: "", //人员信息
      record: "", //传给 salarymanageModal的项目数据
      tableOne: "", //第一张表
      tableTwo: "", //第二张表
      salarydetail: "", //整个 工资情况
      visible: false, //调整比例
      visiblePay: false, //查看工资标准
      visibleAdd: false, //添加工资项目
      ifUserSelfChange: false, //用户自己修改 发放比例
      columns: [
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "15%",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "金额(元)",
          dataIndex: "totalsalary",
          key: "totalsalary",
          align: "left",
          width: "8%",
          scopedSlots: { customRender: "totalsalary" },
        },
        {
          title: "发放比例",
          dataIndex: "ratio",
          key: "ratio",
          align: "left",
          width: "6%",
          scopedSlots: { customRender: "ratio" },
        },
        {
          title: "应发(元)",
          dataIndex: "actualsalary",
          key: "actualsalary",
          align: "left",
          width: "4%",
          scopedSlots: { customRender: "actualsalary" },
        },
        {
          title: "依据",
          dataIndex: "basis",
          key: "basis",
          align: "left",
          width: "16%",
          scopedSlots: { customRender: "basis" },
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "left",
          width: "16%",
          scopedSlots: { customRender: "operate" },
        },
      ],
      datasourceone: [],
      datasourcetwo: [],
    };
  },
  methods: {
    // 获取人员的工资详情
    getusersalary() {
      let data = {
        date: this.onlytime,
        userid: this.salarydetail.onlyUserId,
      };
      usersalary(data)
        .then((res) => {
          this.personInfo = res.result;
          // 处理生日
          this.birthday = this.personInfo.birthday.slice(0, 11);
          // 获取相关字段接口
          this.getconstantdict();
        })
        .catch((error) => {
          showError(error);
        });
    },
    getconstantdict() {
      //请求性别
      constantdictlist("usermanage.user.sex")
        .then((res) => {
          let obj = res.result.find((item) => {
            return item.value == this.personInfo.sex;
          });
          this.personInfo.sex = obj && obj.text;
        })
        .catch((error) => {
          showError(error);
        });
      //请求本人身份
      constantdictlist("usermanage.user.identitytype")
        .then((res) => {
          let obj = res.result.find((item) => {
            return item.value == this.personInfo.identitytype;
          });
          this.personInfo.identitytype = obj && obj.text;
        })
        .catch((error) => {
          showError(error);
        });
      //请求工资等级
      constantdictlist("usermanage.user.treatlevel")
        .then((res) => {
          let obj = res.result.find((item) => {
            return item.value == this.personInfo.treatlevel;
          });
          this.personInfo.treatlevel = obj && obj.text;
        })
        .catch((error) => {
          showError(error);
        });
      //请求薪级
      constantdictlist("usermanage.user.salarylevel")
        .then((res) => {
          let obj = res.result.find((item) => {
            return item.value == this.personInfo.salarylevel;
          });
          this.personInfo.salarylevel = obj && obj.text;
        })
        .catch((error) => {
          showError(error);
        });
      //请求级别
      constantdictlist("usermanage.user.commlevel")
        .then((res) => {
          let obj = res.result.find((item) => {
            return item.value == this.personInfo.commlevel;
          });
          this.personInfo.commlevel = obj && obj.text;
        })
        .catch((error) => {
          showError(error);
        });
      //请求社会工作师级别
      constantdictlist("usermanage.user.shgzslevel")
        .then((res) => {
          let obj = res.result.find((item) => {
            return item.value == this.personInfo.shgzslevel;
          });
          this.personInfo.shgzslevel = obj && obj.text;
        })
        .catch((error) => {
          showError(error);
        });
    },
    customRow: function (record) {
      //点击行的回调  record当前行的数据
      return {
        on: {
          click: function () {
            return;
          },
        },
      };
    },
    //提交后界面重新请求
    reget() {
      //重新请求 更改 页面数据 请求工资详情
      let data = {
        date: this.onlytime,
        userid: this.onlyUserId,
      };
      salarydetail(data)
        .then((res) => {
          let tableArr = res.result.salaryVos; //表格数组  目前两个
          this.salarydetail = res.result;
          if (tableArr.length > 1) {
            this.tableOne = tableArr[0];
            this.tableTwo = tableArr[1];
          } else {
            this.tableOne = tableArr[0];
            this.tableTwo = [];
          }
          //第一张表
          for (let i = 0; i < this.tableOne.result.length; i++) {
            this.tableOne.result[i]["key"] = i + 1;
            let childrenArr = this.tableOne.result[i].children;

            if (childrenArr) {
              for (let j = 0; j < childrenArr.length; j++) {
                childrenArr[j]["key"] = `${i + 1}--${j + 1}`; //children key
              }
            }
          }
          this.datasourceone = this.tableOne.result;
          //第二张表
          let resArr =
            tableArr.length > 1 ? this.tableTwo.result[0].children : [];
          for (let m = 0; m < resArr.length; m++) {
            resArr[m].key = m + 1;
          }
          this.datasourcetwo = resArr;
        })
        .catch((error) => {
          showError(error);
        });
    },
    //查看调整记录
    showChange(record) {
      let payroll = record.id;
      salaryupdaterecord(payroll)
        .then(
          (res) => {
            record.changeHistory = res.result;
          },
          setTimeout(() => {
            this.record = record;
            this.visible = true;
          }, 200)
        )
        .catch((error) => {
          showError(error);
        });
    },
    Modalcancel() {
      this.visible = false;
      this.visiblePay = false;
      this.visibleAdd = false;
      let that = this;
      this.reget();
      this.showPayRecord = ""; //清空缓存
      this.record = ""; //清空缓存
    },
    showPay(record) {
      //查看工资标准
      this.showPayRecord = record;
      this.visiblePay = true;
    },
  },
};
</script>
<style lang="less" scoped>
.SalaryDetail {
  height: 100%;
  /* 修改表头background */
  .ant-table-thead tr th {
    background-color: #fafafa;
    color: black;
  }
  /* tbody 编辑 */
  .ant-table-tbody tr td {
    color: black;
    font-size: 14px;
  }
  .ant-layout {
    height: 100%;
    /* content */
    .content {
      width: 100%;
      height: 90%;
      padding: 12px;
      position: relative;
      padding-bottom: 0;
      /* content > div */
      > div {
        width: 100%;
        background-color: #fff;
        height: 100%;
        position: relative;
        /* 两栏布局 */
        display: flex;
        padding: 12px;
        /* 表格 自适应 */
        .infoTable {
          flex: 1;
          margin-right: 12px;
          overflow-y: auto;
          padding: 0 12px;
          /* 工资展示outside */
          .showPay {
            width: 90%;
            height: 80px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            /* 头部的金额展示 */
            > div {
              height: 100%;
              width: 60%;
              display: flex;
              /* 6000 - 1000 = 5000 五个区域 */
              justify-content: space-between;
              text-align: center;
              font-size: 25px;
              color: black;
              font-weight: bold;
              .box {
                display: grid;
                grid-template-rows: repeat(2, 50%);
                .tip {
                  font-size: 16px;
                  font-weight: normal;
                  line-height: 40px;
                }
                .money {
                  line-height: 40px;
                  font-size: 22px;
                }
              }
            }
          }
          .audit {
            .salaryCheck {
              color: @primary-color;
              font-size: 20px;
              font-weight: bold;
            }
            /* 几个按钮 */
            .beforeTable {
              display: flex;
              justify-content: space-between;
              margin-top: 12px;
              flex-direction: column-reverse;
              .salaryInfo {
                width: 100%;
                height: 32px;
                > div {
                  float: right;
                  line-height: 32px;
                }
              }
              /* 按钮 */
              .tipsBtn {
                height: 32px;
                > button {
                  width: 70px;
                  height: 100%;
                  cursor: pointer;
                  color: @primary-color;
                  outline: none;
                  border: 1px solid @primary-color;
                  background-color: #fff;
                  border-radius: 5px;
                }
              }
            }
            /* 第一个表格 */
            .tableCls {
              width: 100%;
              margin: 0 auto;
              margin-top: 12px;
              .adjustRtio {
                color: @primary-color;
                cursor: pointer;
              }
              .adjustReaord {
                color: @primary-color;
                cursor: pointer;
              }
              .icon {
                color: @primary-color;
              }
            }
          }

          /* 表格 */
          .nowUnit {
            width: 100%;
            margin: 0 auto;
            margin-top: 12px;
            .self-check {
              color: @primary-color;
              font-size: 20px;
              font-weight: bold;
            }
            .beforeTableTwo {
              display: flex;
              justify-content: space-between;
              margin-top: 12px;
              /* 按钮 */
              .tipsBtn {
                height: 32px;
                > button {
                  width: 70px;
                  height: 100%;
                  cursor: pointer;
                  color: @primary-color;
                  outline: none;
                  border: 1px solid @primary-color;
                  background-color: white;
                  border-radius: 5px;
                }
              }
              .salaryInfo {
                width: 100%;
                height: 32px;
                > div {
                  float: right;
                  line-height: 32px;
                }
              }
            }
            .tableCls {
              width: 100%;
              margin: 0 auto;
              margin-top: 12px;
              .adjustRtio {
                color: @primary-color;
                cursor: pointer;
              }
              .delet {
                color: @primary-color;
                cursor: pointer;
              }
            }
          }
        }
        /* 人员 */
        .personInfo {
          background-color: #fafafa;
          height: 100%;
          width: 340px;
          /* 人员信息 */
          .personInfoBox {
            width: 100%;
            margin: 0 auto;
            margin-top: 48px;
            .img {
              width: 120px;
              height: 150px;
              margin: 0 auto;
              > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .sex,
            .name,
            .borth,
            .idcard,
            .selfjob,
            .ownjob,
            .defendInfo {
              display: grid;
              height: 40px;
              line-height: 40px;
              grid-template-columns: 60% 40%;
              text-decoration: none;
            }
            .defendInfo {
              color: @primary-color !important;
            }
          }
        }
      }
    }
    /* footer */
    .footer {
      height: 10%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        width: 100%;
        text-align: center;
        color: rgba(128, 128, 128, 0.534);
      }
    }
  }
}
</style>