<template>
  <div class="back-way">
    <p class="tip">您正在为&nbsp;{{userInfo.showname}}&nbsp;<span>找回密码</span>，为确认是您本人操作，请选择身份验证方式：</p>
    <div class="way">
      <ul>
        <li v-for="(item, index) in wayList" :key="index">
          <div class="left">
            <span class="iconfont" v-html="item.iconfont"></span>
          </div>
          <div class="right">
            <div class="right-title">{{item.way}}</div>
            <div class="right-text">
              <div>
                {{item.tip}}
              </div>
              <div class="back" @click="findPwd(item.name)">
                前往找回
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="prev-step">
      <a-button type="primary" style="width: 200px" @click="backStep">返回上一步</a-button>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";

export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  components: { AButton: Button },
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    isIdcard() {
      return this.userInfo.idcard ? '+身份证' : '';
    },
    wayList() {
      let arr = [
        { 
          way: `通过手机${this.isIdcard}找回`, 
          tip: `如果您的手机${this.userInfo.mobilephone}还在正常使用请选择此方式`,  
          name: 'PhoneIdcard',
          iconfont: '&#xe61b;'
        },
        { 
          way: `通过邮箱${this.isIdcard}找回`, 
          tip: `如果您的邮箱${this.userInfo.email}还在正常使用请选择此方式`,  
          name: 'EmailIdcard',
          iconfont: '&#xe679;'
        },
        { 
          way: '通过人工找回', 
          tip: `联系管理员`,  
          iconfont: '&#xe63f;'
        },
      ]
      if (!this.userInfo.mobilephone && !this.userInfo.email) {
        arr.splice(0, 2);
        return arr;
      } else if (!this.userInfo.mobilephone) {
        arr.splice(0, 1);
        return arr;
      } else if(!this.userInfo.email) {
        arr.splice(1, 1);
        return arr;
      } else {
        return arr;
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    findPwd(name) {
      this.$emit('toggle-way', name);
    },
    backStep() {
      this.$emit('toggle-step', 'fail')
    }
  },
};
</script>
<style lang="less" scoped>
.back-way{
  overflow: hidden;
  .tip{
    margin: 50px 0;
    span{
      color: @primary-color;
    }
  }
  .way{
    ul{
      width: 100%;
      li{
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid #e8e8e8;
        .left{
          width: 48px;
          height: 48px;
          line-height: 48px;
          // background-color: @primary-color;
          text-align: center;
          margin-right: 36px;
          margin-top: 10px;
          span{
            color: @primary-color;
            font-size: 30px;
          }
        }
        .right{
          width: calc(~'100% - 84px');
          .right-title{
            font-size: 20px;
            font-weight: bolder;
            line-height: 40px;
          }
          .right-text{
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            .back{
              margin-right: 20px;
              color: @primary-color;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .prev-step{
    padding-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>