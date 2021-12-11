<template>
  <div class="box">
    <ul class="in-box">
      <li class="li-content" v-for="ele in appList" :key="ele.id+Math.random()">
        <div class="center" @click="jump(ele)">
          <div class="li-icon">
            <span class="ic" v-if="!!myStar" @click.stop="editStar(ele)">
              <a-icon type="home" :theme="myStar.indexOf(ele.id) >= 0 ? 'filled' : 'outlined'"/>
            </span>
          </div>
          <div class="li-center">
            <div class="list-title">
              <span class="title">{{ele.name}}</span>
            </div>
            <div class="list-tell">
              <span class="tell" style="visibility: hidden">运维电话:123456789123</span>
            </div>
            <div class="list-children">
              <div class="content-title" v-for="item in getSubMenu(ele)" :key="item.id">
                <span @click.stop="jump(item)">{{item.name}}</span>
              </div>
            </div>
          </div>
          <img v-if="ele.icon" class="content-img" 
            :src="downloadUrl + '?uri=' + ele.icon" 
            :onerror="`this.src='${defaultIcon}'`"
          />
          <img v-else class="content-img" 
            :src="defaultIcon" 
          />
          <div class="list-round"/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Icon} from "ant-design-vue";
import { getcollectMenu, updateStarMenu } from "../../api/menu";
import { showError } from "../../utils/index";
import { openMenu } from "../../utils/menu";

export default {
  components: {
    AIcon: Icon,
  },
  data() {
    return {
      myStar: undefined,//我的收藏列表
      defaultIcon: require('../../assets/img/icon-menu-default.png'),
    };
  },
  computed: {
    appList(){//应用列表
      return (this.$store.getters.menuList || []).filter((item) => ((item.flag || 0) & 4) == 0);
    },
    downloadUrl(){
      return this.$store.getConfig('api.url') + '/file/v1/download';
    }
  },
  created() {
    this.getCollectList();
  },
  methods: {
    getSubMenu(menu){
      let list = menu.children;
      if(list && list.length > 3){
        return list.slice(0, 3);
      }
      return list;
    },
    editStar(ele) {
      if(this.myStar){
        let list = [...this.myStar];
        let index = list.indexOf(ele.id);
        if(index < 0){
          list.push(ele.id);
        }else{
          list.splice(index, 1);
        }
        updateStarMenu(list).then(res => {
          if(index < 0){
            this.$message.info('收藏成功')
          }else{
            // this.$message.info('已取消收藏')
          }
          this.myStar = list;
        }).catch(err => {
          showError(err);
        });
      }
    },
    getCollectList() {
      getcollectMenu().then(({result}) => {
        this.myStar = (result || []).map(item => item.id);
      }).catch(err => {
        showError(err);
      });
    },
    jump(item) {
      openMenu(item, this.$router)
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  .in-box {
    overflow: hidden;
    margin: @layout-space-base/2;
    .li-content {
      float: left;
      padding: @layout-space-base/2;
      .center {
        overflow: hidden;
        margin: 0 auto;
        min-width: 340px;
        max-width: 400px;
        height: 180px;
        position: relative;
        background-color: @white;
        cursor: pointer;
        &:hover {
          outline: 1px solid @primary-2;
          box-shadow: 1px 1px 10px #dad9d9;
          .li-icon{
            display: block;
          }
        }
        .list-round {
          position: absolute;
          top: -220px;
          left: -90px;
          width: 400px;
          height: 400px;
          background-color: #f6f6f6;
          border-radius: 100%;
          z-index: 1;
        }
        .li-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          display: none;
          .ic {
            cursor: pointer;
            .anticon:hover{
              color: @primary-color;
            }
          }
        }
        .li-center {
          padding: 0 40px 0;
          margin-top: 30px;
          z-index: 10;
          position: relative;
          .list-title {
            .title {
              z-index: 9;
              font-size: 20px;
              font-weight: bold;
            }
          }
          .list-tell {
            z-index: 10;
            color: #d1d1d1;
            position: relative;
            .title {
              display: block;
              font-size: 12px;
              letter-spacing: 1px;
            }
          }
          .list-children {
            margin: 4px 40px 0 0;
            .content-title {
              line-height: 1.6em;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              span:hover{
                color: @primary-color;
              }
            }
          }
        }
        .content-img {
          width: 50px;
          height: 50px;
          display: block;
          z-index: 99;
          position: absolute;
          right: 20px;
          bottom: 20px;
          object-fit: contain;
        }
      }
    }
    @media screen and(max-width:1410px) {
      .li-content {
        width: 33%;
      }
    }
    @media screen and (min-width: 1410px) and(max-width:1750px) {
      .li-content {
        width: 25%;
      }
    }
    @media screen and (min-width: 1750px) {
      .li-content {
        width: 20%;
      }
    }
  }
}
</style>
