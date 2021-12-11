<template>
  <!-- 工资详情 -->
  <div class="SalaryDetail">
    <a-layout>
      <!-- 90% -->
      <a-layout-content class="content">
        <div>
          <div class="infoTable">
            <!-- 审核部分 -->
            <div class="audit">
              <div class="beforeTable">
                <div class="salaryInfo">
                  <div style="margin-right: 12px">
                    实发合计&nbsp;
                    <span style="font-weight: bold">￥{{tableOne.actual}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    减项合计&nbsp;
                    <span style="font-weight: bold">￥{{tableOne.totalSub}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    应发合计&nbsp;
                    <span style="font-weight: bold">￥{{tableOne.totalAdd}}</span>
                  </div>
                </div>
              </div>
              <a-table
                class="tableCls"
                :columns="columns"
                :dataSource="datasourceone"
                :pagination="false"
                :defaultExpandAllRows="true"
              >
                <span slot="operate" slot-scope="val,record">
                  <span v-if="record.itemid" @click="showChange(record)" class="spancss">查看调整记录</span>
                  <span
                    v-if="record.itemid && record.salaryscale"
                    @click="showPay(record)"
                    class="spancss"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看标准/公式</span>
                </span>
                <!-- 金额 -->
                <span slot="totalsalary" slot-scope="val">{{'￥' + parseInt(val).toFixed(2)}}</span>
                <span slot="actualsalary" slot-scope="val">{{'￥' + parseInt(val).toFixed(2)}}</span>
                <!-- 发放比例 -->
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
                <div class="idcard">
                  <div>本人身份</div>
                  <div>{{personInfo.identitytype}}</div>
                </div>
                <div class="selfjob">
                  <div>工资等级</div>
                  <div>{{personInfo.treatlevel}}</div>
                </div>
                <div class="ownjob">
                  <div>薪级</div>
                  <div>{{personInfo.salarylevel}}</div>
                </div>
                <div class="defendInfo">
                  <router-link
                    tag="a"
                    target="_blank"
                    :to="{ name: 'orgUserInfo', query: {userid: onlyUserId} }"
                  >维护人员信息>></router-link>
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
import {
  usersalary,
  constantdictlist,
  salaryrecord,
  salaryupdaterecord
} from "@/salary/api/salaryManage";
import { showError } from "@/framework/utils/index";
import changehistorymodal from "../ChangehistoryModal";
import salaryLookPayStandard from "../SalaryLookPayStandard";
import { Layout, Breadcrumb, Table } from "ant-design-vue";
import { uiConfigsCookies } from "@/framework/utils/auth";
export default {
  name: "SalaryDetail",
  components: {
    ALayout: Layout,
    ATable: Table,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    changehistorymodal,
    salaryLookPayStandard
  },
  created() {
    let that = this;
    this.salarydetail = this.$route.params.result; //数据
    //人员信息
    let data = {
      date: this.$route.params.argDate,
      userid: this.$route.params.userid,
    };
    usersalary(data)
      .then(data => {
        that.personInfo = data.result;
        that.birthday = that.personInfo.birthday.slice(0, 11);
        //请求性别
        constantdictlist("usermanage.user.sex")
          .then(data => {
            let obj = data.result.find(item => {
              return item.value == that.personInfo.sex;
            });
            that.personInfo.sex = obj && obj.text;
          })
          .catch(err => {
            showError(err);
          });
        //请求本人身份
        constantdictlist("usermanage.user.identitytype")
          .then(data => {
            let obj = data.result.find(item => {
              return item.value == that.personInfo.identitytype;
            });
            that.personInfo.identitytype = obj && obj.text;
          })
          .catch(err => {
            showError(err);
          });
        //请求工资职务
        constantdictlist("usermanage.user.treatlevel")
          .then(data => {
            let obj = data.result.find(item => {
              return item.value == that.personInfo.treatlevel;
            });
            that.personInfo.treatlevel = obj && obj.text;
          })
          .catch(err => {
            showError(err);
          });
        //请求薪级
        constantdictlist("usermanage.user.salarylevel")
          .then(data => {
            let obj = data.result.find(item => {
              return item.value == that.personInfo.salarylevel;
            });
            that.personInfo.salarylevel = obj && obj.text;
          })
          .catch(err => {
            showError(err);
          });
      })
      .catch(err => {
        showError(err);
      });
    // this.salarydetail.tableOne = this;
    this.tableOne = this.salarydetail;
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
  },
  data: function() {
    return {
      defaultPhoto: require("@/framework/assets/img/head-default-70x98.png"),
      uiConfigs: uiConfigsCookies(),
      birthday: "", //生日时间
      theOverTime: "无",
      theStartTime: "无",
      theReason: "无",
      showPayRecord: "", //传递给查看公式
      onlyUserId: "", //指代哪个用户
      visibleChangePay: false,
      personInfo: "",
      record: "", //传给 salarymanageModal  changePayModal 的项目数据
      tableOne: "", //第一张表
      salarydetail: "", //整个 工资情况
      onlytime: "", //查看的时间
      visible: false, //调整比例
      visiblePay: false, //查看公式
      visibleAdd: false, //添加工资项目
      ifUserSelfChange: false,
      columns: [
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "14%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "金额(元)",
          dataIndex: "totalsalary",
          key: "totalsalary",
          align: "left",
          width: "8%",
          scopedSlots: { customRender: "totalsalary" }
        },
        {
          title: "发放比例",
          dataIndex: "ratio",
          key: "ratio",
          align: "left",
          width: "6%",
          scopedSlots: { customRender: "ratio" }
        },
        {
          title: "应发(元)",
          dataIndex: "actualsalary",
          key: "actualsalary",
          align: "left",
          width: "8%",
          scopedSlots: { customRender: "actualsalary" }
        },
        {
          title: "依据",
          dataIndex: "basis",
          key: "basis",
          align: "left",
          width: "15%",
          scopedSlots: { customRender: "basis" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          align: "left",
          width: "17%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasourceone: []
    };
  },
  methods: {
    hover(record) {
      let that = this;
      let payroll = record.id;
      salaryrecord(payroll)
        .then(function(res) {
          that.theStartTime = res.result.startTime;
          that.theReason = res.result.reason;
          that.theOverTime = res.result.endTime;
        })
        .catch(err => {
          showError(err);
        });
    },
    showChange(record) {
      let payroll = record.id;
      salaryupdaterecord(payroll)
        .then(res => {
          if (res.result) {
            record.changeHistory = res.result;
            record.changeHistory.forEach(item => {
              if (item.lastratio == 0 || item.ratio == 0) {
                return 0;
              } else {
                item.lastratio = Number(item.lastratio * 100).toFixed() + "%";
                item.ratio = Number(item.ratio * 100).toFixed() + "%";
              }
            });
          } else {
          }
          this.record = record;
          this.visible = true;
        })
        .catch(err => {
          showError(err);
        });
    },
    Modalcancel() {
      this.visible = false;
      this.visiblePay = false;
      this.visibleAdd = false;
      this.visibleChangePay = false;
      this.showPayRecord = ""; //清空缓存
      this.record = ""; //清空缓存
    },
    showPay(record) {
      //查看公式
      this.showPayRecord = record;
      this.visiblePay = true;
    }
  }
};
</script>
<style lang="less" scoped>
.SalaryDetail {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
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
  /* content */
  .content {
    width: 100%;
    height: 90%;
    padding: 12px;
    position: relative;
    padding-bottom: 0;
  }
  /* content > div */
  .content > div {
    width: 100%;
    background-color: white;
    height: 100%;
    position: relative;
    /* 两栏布局 */
    display: flex;
    padding: 12px;
  }
  /* 表格 自适应 */
  .infoTable {
    flex: 1;
    margin-right: 12px;
    overflow-y: auto;
    padding: 0 12px;
  }
  .spancss {
    color: @primary-color;
    cursor: pointer;
  }
  /* 工资展示outside */
  .showPay {
    width: 90%;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* 头部的金额展示 */
  .showPay > div {
    height: 100%;
    width: 60%;
    display: flex;
    /* 6000 - 1000 = 5000 五个区域 */
    justify-content: space-between;
    text-align: center;
    font-size: 25px;
    color: black;
    font-weight: bold;
  }

  .box {
    display: grid;
    grid-template-rows: repeat(2, 50%);
  }
  .box .tip {
    font-size: 16px;
    font-weight: normal;
    line-height: 40px;
  }
  .box .money {
    line-height: 40px;
    font-size: 22px;
  }
  /* 表格 */
  .audit,
  .nowUnit {
    width: 100%;
    margin: 0 auto;
  }
  /* 几个按钮 */
  .beforeTable {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
  /* 按钮 */
  .tipsBtn {
    height: 32;
  }
  .tipsBtn button {
    height: 32px;
    color: @primary-color;
    outline: none;
    border: 1px solid @primary-color;
    background-color: white;
    border-radius: 5px;
  }
  .salaryInfo {
    height: 32px;
  }
  .salaryInfo div {
    float: right;
    line-height: 32px;
  }

  /* 第一个表格 */
  .tableCls {
    width: 100%;
    margin: 0 auto;
    margin-top: 12px;
  }
  /* footer */
  .footer {
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer div {
    width: 100%;
    text-align: center;
    color: rgba(128, 128, 128, 0.534);
  }

  /* 人员 */
  .personInfo {
    background-color: #fafafa;
    height: 100%;
    width: 340px;
  }
  /* 人员信息 */
  .personInfoBox {
    width: 100%;
    margin: 0 auto;
    margin-top: 48px;
  }
  .img {
    width: 120px;
    height: 150px;
    margin: 0 auto;
  }
  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .sex,
  .borth,
  .idcard,
  .selfjob,
  .ownjob,
  .defendInfo {
    height: 40px;
    line-height: 40px;
  }
  .name,
  .sex,
  .borth,
  .idcard,
  .selfjob,
  .ownjob,
  .defendInfo {
    display: grid;
    grid-template-columns: 60% 40%;
  }
}
</style>