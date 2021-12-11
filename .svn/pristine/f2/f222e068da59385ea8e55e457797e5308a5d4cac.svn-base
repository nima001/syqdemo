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
                  <div class="money">￥{{Number(salarydetail.totalAdd).toFixed(2)}}</div>
                </div>
                <div class="box">
                  <div style="height: 50%;"></div>
                  <div>一</div>
                </div>
                <div class="box">
                  <div class="tip">减项合计</div>
                  <div class="money">￥{{Number(salarydetail.totalSub).toFixed(2)}}</div>
                </div>
                <div class="box">
                  <div style="height: 50%;"></div>
                  <div>=</div>
                </div>
                <div class="box">
                  <div class="tip">实发合计</div>
                  <div class="money">￥{{Number(salarydetail.actual).toFixed(2)}}</div>
                </div>
              </div>
            </div>
            <!-- 审核部分 -->
            <div class="audit">
              <div class="salaryCheck" v-if="personInfo.usertype == 1">工资科审核部分</div>
              <div class="salaryCheck" v-if="personInfo.usertype == 4">本单位审核部分</div>
              <div class="beforeTable">
                <div class="tipsBtn" v-if="personInfo.usertype == 4">
                  <button @click="showAdd">添加项目</button>
                </div>
                <div class="salaryInfo">
                  <div style="margin-right: 12px">
                    实发合计&nbsp;
                    <span
                      style="font-weight: bold"
                    >￥{{Number(tableOne.actual).toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    减项合计&nbsp;
                    <span
                      style="font-weight: bold"
                    >￥{{Number(tableOne.totalSub).toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    应发合计&nbsp;
                    <span
                      style="font-weight: bold"
                    >￥{{Number(tableOne.totalAdd).toFixed(2)}}</span>
                  </div>
                </div>
              </div>
              <a-table
                class="tableCls"
                :columns="columns"
                v-if="datasourceone.length > 0"
                :dataSource="datasourceone"
                :pagination="false"
                :defaultExpandAllRows="true"
              >
                <span slot="operate" slot-scope="val,record">
                  <span
                    class="adjustRtio"
                    v-if="!record.itemid &&  type != 1"
                    @click="showChange(1,record,0)"
                  >调整比例</span>
                  <span
                    class="adjustReaord"
                    v-if="record.itemid && !record.salaryscale"
                    @click="showChangePay(type,record)"
                  >{{type == 1 ? '查看调整记录':'调整金额'}}</span>
                  <span
                    class="adjustReaord"
                    v-if="record.itemid && record.salaryscale"
                    @click="showChange(1,record)"
                  >{{type == 1 ? '查看调整记录':'调整比例'}}</span>
                  <span
                    v-if="record.itemid && record.salaryscale"
                    @click="showPayStandard(record)"
                    class="adjustReaord"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查看工资标准</span>
                  <span
                    @click="deleteItem(record)"
                    v-if="record.canBedelete==1"
                    class="delet"
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span>
                </span>
                <span
                  v-if="!record.sameAsLast && record.itemid"
                  slot="name"
                  slot-scope="val,record"
                >
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <div>开始时间：{{theStartTime}}</div>
                      <div>结束时间：{{theOverTime}}</div>
                      <div>修改原因：{{theReason}}</div>
                    </template>
                    <a-icon class="icon" @mouseenter="hover(record)" type="exclamation-circle" />
                  </a-tooltip>
                  <span style="padding-left: 2px;">{{val}}</span>
                </span>
                <span v-else style="padding-left: 16px;" slot="name" slot-scope="val">{{val}}</span>
                <!-- 金额展示 -->
                <span slot="totalsalary" slot-scope="val">{{'￥' + Number(val).toFixed(2)}}</span>
                <span slot="actualsalary" slot-scope="val">{{'￥' + Number(val).toFixed(2)}}</span>
                <!-- 发放比例 -->
                <span slot="ratio" slot-scope="val">{{val == undefined?'--':val*100 + '%'}}</span>
              </a-table>
            </div>
            <!-- 本单位审核部分  第二张表 -->
            <div class="nowUnit" v-if="personInfo.usertype == 1">
              <div class="self-check">本单位审核部分</div>
              <div class="beforeTableTwo">
                <div class="tipsBtn" v-if="type == 0">
                  <button @click="showAdd">添加项目</button>
                </div>
                <div class="salaryInfo">
                  <div style="margin-right: 12px">
                    实发合计&nbsp;
                    <span
                      style="font-weight: bold"
                    >￥{{Number(tableTwo.actual).toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    减项合计&nbsp;
                    <span
                      style="font-weight: bold"
                    >￥{{Number(tableTwo.totalSub).toFixed(2)}}</span>
                  </div>
                  <div style="margin-right: 12px">
                    应发合计&nbsp;
                    <span
                      style="font-weight: bold"
                    >￥{{Number(tableTwo.totalAdd).toFixed(2)}}</span>
                  </div>
                </div>
              </div>
              <a-table
                class="tableCls"
                :columns="columns"
                :dataSource="datasourcetwo"
                :pagination="false"
                :defaultExpandAllRows="true"
              >
                <span slot="operate" slot-scope="val,record">
                  <!-- userSelfChange代表 第二张表调整金额 -->
                  <span
                    class="adjustRtio"
                    @click="showChange('userSelfChange',record)"
                  >{{type == 1 ? '查看调整记录':'调整金额'}}</span>
                  <!--  v-if='record.canBedelete==1' 能被删除 -->
                  <a-popconfirm
                    title="确定删除吗？"
                    ok-text="是"
                    cancel-text="否"
                    @confirm="deleteItem(record)"
                    v-if="record.canBedelete==1"
                  >
                    <span class="delet">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除</span>
                  </a-popconfirm>
                </span>
                <span style="padding-left: 16px;" slot="name" slot-scope="val">{{val}}</span>
                <!-- 展示金额 -->
                <span slot="totalsalary" slot-scope="val">{{'￥' + Number(val).toFixed(2)}}</span>
                <span slot="actualsalary" slot-scope="val">{{'￥' + Number(val).toFixed(2)}}</span>
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

      <!-- 第一张表单独的  调整金额 -->
      <changePayModal
        v-if="record && type == 0"
        @closeModal="Modalcancel"
        :isShow="visibleChangePay"
        :record="record"
      ></changePayModal>
      <!-- 在type为1时调用正查看  查看调整记录-->
      <changehistorymodal
        v-if="record && type == 1"
        @closeModal="Modalcancel"
        :isShow="visible"
        :UserSelfChange="ifUserSelfChange"
        :record="record"
      ></changehistorymodal>
      <!-- 调整比例 和第二张表的调整金额 -->
      <salarymanage-Modal
        v-if="record && type == 0"
        @closeModal="Modalcancel"
        :isShow="visible"
        :UserSelfChange="ifUserSelfChange"
        :record="record"
      ></salarymanage-Modal>

      <!-- 查看工资标准 -->
      <salaryLookPay-Standard
        v-if="showPayRecord"
        @closeModal="Modalcancel"
        :isShowPay="visiblePay"
        :showPayRecord="showPayRecord"
      ></salaryLookPay-Standard>

      <!-- 添加工资项目 -->
      <addPay-Item
        v-if="hackReset"
        @closeModal="Modalcancel"
        :isShowAdd="visibleAdd"
        :userid="onlyUserId"
        :arrlength="addarrlength"
        :monthTime="timetime"
        :id="endid"
      ></addPay-Item>
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
  salaryrecord,
  salaryupdaterecord,
  salarydetail,
  deleterecord,
  constantdictlist,
} from "@/salary/api/salaryManage";
import changehistorymodal from "./ChangehistoryModal";
import salarymanageModal from "./SalarymanageModal";
import changePayModal from "./ChangePayModal";
import salaryLookPayStandard from "./SalaryLookPayStandard";
import addPayItem from "./AddPayItem";
import {
  Layout,
  Breadcrumb,
  Table,
  Tooltip,
  Icon,
  Popconfirm,
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
import { uiConfigsCookies } from "@/framework/utils/auth";
export default {
  name: "salaryDetail",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ATable: Table,
    ATooltip: Tooltip,
    AIcon: Icon,
    APopconfirm: Popconfirm,
    salarymanageModal,
    salaryLookPayStandard,
    addPayItem,
    changePayModal,
    changehistorymodal,
  },
  data: function () {
    return {
      defaultPhoto: require("@/framework/assets/img/head-default-70x98.png"),
      uiConfigs: uiConfigsCookies(),
      birthday: "", //出生日期
      timetime: "",
      endid: "",
      theOverTime: "无",
      theStartTime: "无",
      theReason: "无",
      showPayRecord: "", //传递给查看工资标准
      onlyUserId: "", //指代哪个用户
      visibleChangePay: false,
      personInfo: "",
      record: {}, //传给 salarymanageModal  changePayModal 的项目数据
      time: "",
      tableOne: "", //第一张表
      tableTwo: "", //第二张表
      salarydetail: "", //整个 工资情况
      onlytime: "", //查看的时间
      visible: false, //调整比例
      visiblePay: false, //查看工资标准
      visibleAdd: false, //添加工资项目
      ifUserSelfChange: false, //标志  1表 还是2表
      type: 0,
      columns: [
        {
          title: "项目名称",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "13%",
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
          width: "7%",
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
          width: "15%",
          scopedSlots: { customRender: "operate" },
        },
      ],
      datasourceone: [],
      datasourcetwo: [],
      name: "",
      addarrlength: null,
      hackReset: true,
    };
  },
  created() {
    this.getstore();
  },
  methods: {
    getstore() {
      let data = {
        date: this.$route.query.date,
        userid: this.$route.query.userid,
      };
      salarydetail(data).then((data) => {
        data.result.onlyUserId = this.$route.query.userid; //人员id
        data.result.onlytime = this.$route.query.date; // 月份
        data.result.status = this.$route.query.status; // 工资审核状态
        this.$store.commit("CommitSalaryData", data.result); //人员工资数据
        this.getdata();
      });
    },
    getdata() {
      //人员工资数据
      this.salarydetail = this.$store.state.salary.SalaryData; //整个 工资情况
      // this.salarydetail.totalAdd = this.salarydetail.totalAdd.toFixed(2);
      // this.salarydetail.totalSub = this.salarydetail.totalSub.toFixed(2);
      // this.salarydetail.actual = this.salarydetail.actual.toFixed(2);
      this.onlyUserId = this.salarydetail.onlyUserId; //当前的人员id
      this.record.status = this.salarydetail.status; // 判断工资记录的状态是否是审核
      this.type = this.salarydetail.status == 1 ? 1 : 0;
      this.onlytime = this.salarydetail.onlytime; //工资发放时间
      // 获取人员的工资详情
      this.getusersalary();
      let tableArr = this.salarydetail.salaryVos; //表格数组  目前两个
      this.addarrlength = tableArr.length;
      //俩表的 tbody thead
      if (tableArr.length > 1) {
        this.tableOne = tableArr[0];
        this.tableTwo = tableArr[1];
      } else {
        this.tableOne = tableArr[0];
        this.tableTwo = [];
      }
      // this.tableOne.actual = this.tableOne.actual.toFixed(2);
      // this.tableOne.totalAdd = this.tableOne.totalAdd.toFixed(2);
      // this.tableOne.totalSub = this.tableOne.totalSub.toFixed(2);
      // this.tableTwo.actual = this.tableTwo.actual.toFixed(2);
      // this.tableTwo.totalAdd = this.tableTwo.totalAdd.toFixed(2);
      // this.tableTwo.totalSub = this.tableTwo.totalSub.toFixed(2);

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
    rebuileComponents() {
      // 销毁子标签
      this.hackReset = false;
      // 重新创建子标签
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
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
          if (this.personInfo.birthday) {
            this.birthday = this.personInfo.birthday.slice(0, 11);
          }
          // 获取相关字段接口
          this.getconstantdict();
        })
        .catch((error) => {
          showError(error);
        });
    },
    // 获取相关字段接口
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
      //请求工资职务
      if (this.personInfo.usertype == 1) {
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
      }
      //请求薪级
      if (this.personInfo.usertype == 1) {
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
      }
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
    // 工资调整历史记录
    hover(record) {
      let payroll = record.id;
      salaryrecord(payroll)
        .then((res) => {
          this.theStartTime = res.result.startTime;
          this.theReason = res.result.reason;
          this.theOverTime = res.result.endTime;
        })
        .catch((error) => {
          showError(error);
        });
    },
    //  删除调整记录
    deleteItem(record) {
      let id = record.id;
      deleterecord(id)
        .then((res) => {
          // 删除成功重新请求数局
          this.$message.success("删除成功！");
          this.reget();
        })
        .catch((error) => {
          showError(error);
        });
    },
    //1表 调整金额
    showChangePay(type, record) {
      for (let index = 0; index < this.datasourceone.length; index++) {
        if (this.datasourceone[index].id == record.category) {
          //拿到父类的名称
          record.categoryName = this.datasourceone[index].name;
        }
      }
      // 获取单项调整金额
      if (type == 1) {
        salaryupdaterecord(record.id)
          .then((res) => {
            record.changeHistory = res.result;
            setTimeout(() => {
              this.record = record;
              // 打开查看调整记录
              this.visible = true;
              this.visibleChangePay = false;
            }, 150);
          })
          .catch((error) => {
            showError(error);
          });
      } else {
        salaryupdaterecord(record.id)
          .then((res) => {
            record.changeHistory = res.result;
            setTimeout(() => {
              this.record = record;
              // 打开查看调整金额
              this.visible = false;
              this.visibleChangePay = true;
            }, 150);
          })
          .catch((error) => {
            showError(error);
          });
      }
    },

    //调整比例（第一张表调整比例  和 第二张表的调整金额共用）
    showChange(isUser, record, state) {
      if (isUser == "userSelfChange") {
        //第二张表的 调整金额
        salaryupdaterecord(record.id)
          .then((res) => {
            record.changeHistory = res.result;
            setTimeout(() => {
              record.categoryName = "none";
              record.titlename = "调整单项金额";
              this.record = record;
              this.ifUserSelfChange = true;
            }, 150);
          })
          .catch((error) => {
            showError(error);
          });
      } else {
        //第一张表
        if (record.salaryscale) {
          //子类
          for (let index = 0; index < this.datasourceone.length; index++) {
            if (this.datasourceone[index].id == record.category) {
              record.categoryName = this.datasourceone[index].name;
            }
          }
        } else {
          record.categoryName = "father"; //表明点击的就是 父类
        }
        if (state == 0) {
          record.titlename = "调整比例";
          this.record = record;
          this.ifUserSelfChange = false;
        } else {
          salaryupdaterecord(record.id)
            .then((data) => {
              record.changeHistory = data.result;
              this.record = record;
            })
            .catch((error) => {
              showError(error);
            });
          record.titlename = "调整单项比例";
          this.ifUserSelfChange = false;
        }
      }
      this.visible = true;
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
          this.addarr = res.result.salaryVos;
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
    Modalcancel() {
      this.rebuileComponents();
      this.visible = false;
      this.visiblePay = false;
      this.visibleAdd = false;
      this.visibleChangePay = false;
      let that = this;
      this.reget();
      this.showPayRecord = ""; //清空缓存
      this.record = ""; //清空缓存
    },
    showPayStandard(record) {
      //查看工资标准
      this.showPayRecord = record;
      this.visiblePay = true;
    },
    showAdd() {
      //添加工资项目
      let arr = this.salarydetail.salaryVos[0].result;
      this.endid = arr[arr.length - 1].id;
      this.timetime = this.onlytime;
      this.visibleAdd = true;
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
      padding: @layout-space-base;
      position: relative;
      padding-bottom: 0;
      /* content > div */
      > div {
        width: 100%;
        background-color: white;
        height: 100%;
        position: relative;
        /* 两栏布局 */
        display: flex;
        padding: @content-padding-v @content-padding-h;
        /* 表格 自适应 */
        .infoTable {
          flex: 1;
          margin-right: @layout-space-base;
          overflow-y: auto;
          margin-top: @layout-space-base;
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
              margin-top: 12px;
              // display: flex;
              // justify-content: space-between;
              // margin-top: 12px;
              // flex-direction: column-reverse;
              /* 按钮 */
              .tipsBtn {
                height: 32px;
                > button {
                  width: 80px;
                  height: 100%;
                  cursor: pointer;
                  color: @primary-color;
                  outline: none;
                  border: 1px solid @primary-color;
                  background-color: #fff;
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
              .delet {
                color: @primary-color;
                cursor: pointer;
              }
            }
          }
          /* 表格 */
          .nowUnit {
            width: 100%;
            margin: 0 auto;
            margin-top: @layout-space-base;
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
                  width: 80px;
                  height: 100%;
                  cursor: pointer;
                  color: @primary-color;
                  outline: none;
                  border: 1px solid @primary-color;
                  background-color: #fff;
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
          margin-top: @layout-space-base;
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