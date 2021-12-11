<template>
  <a-spin tip="查询中..." :spinning="loading">
    <div class="selectProcessUser">
      <div class="wrap">
        <div class="user-search">
          <div class="title">请输入身份证号码查询:</div>
          <div class="user-search-input">
            <a-input v-model="userid" @pressEnter="search"></a-input>
            <a-button type="primary" @click="search">查询</a-button>
          </div>
          <div class="notice">{{notice}}</div>
        </div>
        <div class="user-result">
          <div class="title">查询结果:</div>
          <a-row class="result" :gutter="20">
            <a-col :span="12">
              <span class="result-label">姓名：</span>
              <span>{{userInfo.username}}</span>
            </a-col>
            <a-col :span="12">
              <span class="result-label">性别：</span>
              <span>{{userInfo.sex}}</span>
            </a-col>
            <a-col :span="12">
              <span class="result-label">出生年月：</span>
              <span>{{userInfo.birthday}}</span>
            </a-col>
            <a-col :span="12">
              <span class="result-label">本人身份：</span>
              <span>{{userInfo.identitytype}}</span>
            </a-col>
            <a-col :span="24">
              <span class="result-label">编制所在单位：</span>
              <span>{{userInfo.org}}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="user-btn">
        <a-button @click="handleOk">确定</a-button>
      </div>
    </div>
  </a-spin>
</template>

<script>
import { Input, Button, Row, Col, Spin } from "ant-design-vue";
import { userquery } from "@/workflow/api/user";
import { showError, checkIdcard } from "@/framework/utils/index";
export default {
  components: {
    AInput: Input,
    AButton: Button,
    ARow: Row,
    ACol: Col,
    ASpin: Spin
  },
  data() {
    return {
      userid: "",
      userInfo: {
        username: "",
        sex: "",
        birthday: "",
        identitytype: "",
        org: ""
      },
      notice: "",
      flag: false,
      loading: false,
      id: ""
    };
  },
  methods: {
    //查询
    search() {
      this.flag = false;
      this.userInfo = {
        username: "",
        sex: "",
        birthday: "",
        identitytype: "",
        org: ""
      };
      this.id = "";
      if (checkIdcard(this.userid)) {
        this.loading = true;
        userquery({ searchkey: this.userid, nodeid: 0 })
          .then(res => {
            if (res.result.rows && res.result.rows.length) {
              this.id = res.result.rows[0]._id;
              this.userInfo = {
                username: res.result.rows[0].username,
                sex: res.result.rows[0].sex == 1 ? "男" : "女",
                birthday: res.result.rows[0].birthday
                  ? res.result.rows[0].birthday.substr(0, 10)
                  : "",
                identitytype: res.result.rows[0].identitytype
                  ? this.$store.getters.dictKey(
                      "usermanage.user.identitytype",
                      res.result.rows[0].identitytype
                    )
                    ? this.$store.getters.dictKey(
                        "usermanage.user.identitytype",
                        res.result.rows[0].identitytype
                      ).text
                    : ""
                  : "",
                org: res.result.rows[0].org.name
              };
              this.notice = "";
              this.flag = true;
            } else {
              this.notice = "未找到人员！";
            }
            this.loading = false;
          })
          .catch(err => {
            showError(err);
          });
      } else {
        this.notice = "身份证号码不正确！";
      }
    },
    //确定
    handleOk() {
      if (this.flag && this.id) {
        this.$emit("userOk", this.id);
      } else {
        this.$message.error("请先选择用户！");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.selectProcessUser {
  .wrap {
    padding: 15px 20px;
    .title {
      font-weight: bold;
      padding: 5px 0;
    }
    .user-search {
      .user-search-input {
        display: flex;
        input {
          flex-grow: 1;
        }
        button {
          flex-basis: 65px;
          margin-left: 15px;
        }
      }
      .notice {
        height: 25px;
        color: red;
      }
    }
    .user-result {
      margin-top: 8px;
      .result-label {
        padding-right: 5px;
      }
      .ant-col-12 {
        margin-bottom: 10px;
      }
    }
  }
  .user-btn {
    text-align: center;
    border-top: 1px solid #efefef;
    margin-top: 30px;
    height: 65px;
    line-height: 65px;
  }
}
</style>