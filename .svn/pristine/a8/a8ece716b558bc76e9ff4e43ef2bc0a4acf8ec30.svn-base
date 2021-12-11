<template >
  <div class="menu_panel" >
    <template v-if="menu.length > 0">
      <div class="cell" v-for="(item, index) in menu" :key="index + Math.random()" @click="jump(item)">
        <div class="cell_view">
          <div class="menu">
            <div class="remove" @click.stop="unStar(item.id, index)">
              <a-icon type="close" />
            </div>
            <div class="img">
              <img
                v-if="item.icon"
                :src="uiConfigs['api.url'] + '/file/v1/download?uri=' + item.icon"
                :onerror="`this.src='${defaultIcon}'`"
              />
              <img  :src="defaultIcon" />
            </div>
            <span class="text">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <empty-data :style="{height:'260px'}"></empty-data>
    </template>
    <AddMenu
      :parentCheck="false"
      :menuId="menuId"
      title="添加常用业务"
      :show.sync="show"
      @change="updateMenuList"
    />
  </div>
</template>
<script>
import { Icon } from "ant-design-vue";
import { updateStarMenu, getcollectMenu } from "@/framework/api/menu";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { showError } from "@/framework/utils/index";
import EmptyData from "@/framework/components/EmptyData";
import AddMenu from "@/framework/widgets/components/AddMenu";
import {cloneDeep} from 'lodash';
export default {
  name: "StarMenu",
  components: {
    AIcon: Icon,
    EmptyData,
    AddMenu
  },
  data() {
    return {
      defaultIcon: require("@/framework/assets/img/icon-menu-default.png"),
      uiConfigs: uiConfigsCookies(),
      menuList: [],
      menuId:[],
      show: false
    };
  },
  props: {
    value: {
      require: true
    }
  },
  created() {
    this.getCollectList();
  },
  computed:{
    menu(){
      return [...(this.menuList || [])];
    }
  },
  watch: {
    value() {
      this.menuId =  this.menuList.map(item => item.id);
      this.show = !this.show;
    }
  },
  methods: {
    getCollectList() {
      getcollectMenu()
        .then(({result=[]}) => {
          if(result.length <= 12){
            this.menuList = result;
          }else{
            this.$message.warn('最多只能添加12个')
            this.menuList = result.splice(0,12)
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    unStar(id, index) {
      let ids = [];
      this.menuList.forEach((item, i) => {
        if (index != i) {
          ids.push(item.id);
        }
      });
      updateStarMenu(ids)
        .then(res => {
          let index = this.menuList.findIndex(item => item.id == id);
          if (index >= 0) {
            this.menuList.splice(index, 1);
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    updateMenuList(list) {
      updateStarMenu(list)
        .then(() => {
          this.getCollectList();
          this.show = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    jump(item) {
      if (!item) {
        return;
      }
      if (item.children && item.children.length > 0) {
        this.$router.push({
          name: "SubMenu",
          params: { id: item.id }
        })
      } else if (item.componenturi) {
        if (item.componenturi.startsWith("redirect:")) {
          let path = item.componenturi.slice(9);
          let temp = path.toUpperCase();
          if (temp.startsWith("http:") || temp.startsWith("https:")) {
            window.open(path, "_blank");
          } else {
            const { href } = this.$router.resolve({ path });
            if (href) {
              window.open(href, "_blank");
            }
          }
        } else {
          this.$router.push(item.componenturi)
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
.menu_panel {
  overflow: hidden;
  padding: 6px;
  .cell {
    padding: 6px;
    float: left;
    width: 16.6%;
    .cell_view {
      padding-top: 100%;
      position: relative;
      .menu {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #f3f7fa;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .remove {
          width: 20px;
          height: 20px;
          position: absolute;
          right: 0px;
          top: 0px;
          text-align: center;
          line-height: 20px;
          color: #1b5293;
          display: none;
        }
        &:hover {
          box-shadow: 0px 0px 8px rgba(27, 82, 147, 0.3);
          .remove{
            display: block;
          }
        }
        .img {
          width: 50px;
          height: 50px;
          img {
            max-width: 100%;
          }
        }
        .text {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 21px;
          color: #666666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>