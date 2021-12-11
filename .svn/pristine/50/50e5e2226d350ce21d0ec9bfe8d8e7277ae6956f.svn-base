<template>
  <div class="home">
    <div class="count">
      <div class="count-container">
        <div class="count-content">

          <div class="top">

            <div class="top_total">
              <div class="left">
                <div class="num">343943</div>
                <div class="tip">账号总数</div>
              </div>
              <div class="right">
                <div class="num">个人账号</div>
                <div class="tip">单位账号</div>
              </div>
            </div>

            <div class="top-item">
              <div class="num">343943</div>
              <div class="tip">账号总数</div>
            </div>

            <div class="top-item">
              <div class="num">343943</div>
              <div class="tip">账号总数</div>
            </div>

          </div>

          <div class="bottom">
            <div class="bottom-left">
              <div class="num">343943</div>
              <div class="tip">账号总数</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="manage">
      <div class="manage-container">
        <div class="manage-content">
          <div class="manage-item" v-for="(item, index) in list" :key="index">
            <div class="title">{{item.name}}</div>
            <component :is="item.component"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import manages from "./components/index"
export default {
  name: 'Index',
  props: {},
  components: {
    ...manages
  },
  data() {
    return {
      list: [
        { name: '待办管理', component: 'TodoManage' },
        { name: '账号管理', component: 'AccountManage' },
        { name: '机构管理', component: 'OrgManage' },
      ]
    };
  },
  watch: {},
  computed: {},
  created() {
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.home{
  .count{
    padding: 10px;
    .count-container{
      background-color: @white;
      .count-content{
        padding: @padding-lg;
        .top{
          display: flex;
          > div{
            width: 25%;
            background-color: rgb(240, 245, 249);
            margin-left: @padding-lg;
            &:nth-child(1){
              width: 50%;
              margin-left: 0;
            }
          }
          .top_total{
            display: flex;
            .left{
              text-align: center;
              margin: 0 20% 0 30%;
              .num{
                font-size: 24px;
                margin: @padding-xs 0;
              }
              .tip{
                margin: @padding-xs 0 @padding-lg 0;
              }
            }
            .right{
              .num{
                margin: 40px 0 @padding-xs 0;
              }
            }
          }
          .top-item{
            text-align: center;
            .num{
              font-size: 24px;
              margin: @padding-xs 0;
            }
            .tip{
              margin: @padding-xs 0 @padding-lg 0;
            }
          }
        }
        .bottom{
          display: flex;
          margin-top: @padding-xs;
          background-color: rgb(240, 245, 249);
          .bottom-left{
            margin-left: 20%;
            .num{
              font-size: 24px;
              margin: @padding-xs 0;
            }
            .tip{
              margin: @padding-xs 0 @padding-lg 0;
            }
          }
        }
      } 
    }
  }
  .manage{
    padding: 10px;
    .manage-container{
      background-color: @white;
      .manage-content{
        padding: @padding-xs @padding-lg;
        .manage-item{
          .title{
            font-size: 16px;
            font-weight: bold;
            padding: @padding-xs 0;
          }
        }
      }
    }
  }
}
</style>