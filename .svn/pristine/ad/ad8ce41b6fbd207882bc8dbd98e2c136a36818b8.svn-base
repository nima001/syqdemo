<template>
  <!--接入场景介绍 -->
  <div>
    <div class="banner">
      <div class="banner-view">
        <div class="banner-view-pic">
          <img src="@/dev/assets/img/bg-open-banner.png" />
        </div>
        <div class="banner-view-user">
          <div class="banner-view-user-info">
            <p class="p1">用户接入</p>
            <p class="p2">实现用户统一管理、一点登录、全站漫游</p>
            <span class="join" @click="applyFor">用户接入申请</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="access">
        <p class="title">接入场景</p>
        <div class="access-view">
          <a-card
            :bordered="false"
            hoverable
            :bodyStyle="{
              padding: '0px',
              height: '100%',
              display: 'flex',
              AlignItems: 'center',
            }"
          >
            <div class="left">
              <p class="p1">PC门户</p>
              <p class="p2">适用于部门用户系统、部委网站</p>
              <router-link to="/dev/developdoc">开发文档&nbsp;></router-link>
            </div>
            <div class="right">
              <img src="@/dev/assets/img/computer.png" />
            </div>
          </a-card>
          <a-card
            :bordered="false"
            hoverable
            :bodyStyle="{
              padding: '0px',
              height: '100%',
              display: 'flex',
              AlignItems: 'center',
            }"
          >
            <div class="left">
              <p class="p1">手机客户端</p>
              <p class="p2">使用于部门自建app、下级部门app</p>
              <router-link to="/dev/developdoc">开发文档&nbsp;></router-link>
            </div>
            <div class="right right-mobile">
              <img src="@/dev/assets/img/mobile.png" />
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "ant-design-vue";
export default {
  name: "Index",
  components: {
    ACard: Card,
  },
  methods:{
    // 用户接入申请
    applyFor() {
      this.$router.push('/dev/managementcenter')
    }
  }
};
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  height: 420px;
  background: @primary-color;
  text-align: center;
  &-view {
    display: inline-flex;
    height: 100%;
    &-pic {
      width: 358px;
      height: 100%;
      overflow: hidden;
      img {
        max-width: 100%;
      }
    }
    &-user {
      margin-left: 196px;
      display: flex;
      align-items: center;
      &-info {
        width: auto;
        p {
          margin: 0px;
          text-align: left;
          &.p1 {
            height: 25px;
            line-height: 25px;
            font-size: 25px;
            color: #fff;
          }
          &.p2 {
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            color: #fff;
            margin-top: 22px;
          }
        }
        .join {
          display: block;
          width: 108px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          margin-top: 50px;
          background: #ffc62c;
          border-radius: 4px;
          cursor: pointer;
          color: @white;
        }
      }
    }
  }
}
.content {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .access {
    padding-top: 15px;
    .title {
      height: 150px;
      line-height: 150px;
      font-size: 33px;
      color: #000;
      margin: 0px;
    }
    &-view {
      width: 100%;
      height: 234px;
      display: flex;
      justify-content: space-between;
      .ant-card {
        width: 585px;
        background: #f7f7f7;
        padding: 0px 40px 0px 50px;
        .ant-card-body {
          .left {
            flex: 1;
            .p1 {
              font-size: 24px;
              color: #545454;
            }
            .p2 {
              font-size: 14px;
              color: #595959;
            }
            a {
              text-decoration: none;
              font-size: 14px;
              color: @primary-color;
            }
          }
          .right {
            width: 169px;
            height: 140px;
            overflow: hidden;
            &.right-mobile {
              width: 99px;
              height: 157px;
            }
            img {
              max-width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
