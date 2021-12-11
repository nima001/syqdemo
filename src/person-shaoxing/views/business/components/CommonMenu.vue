<template>
  <div class="common-business" ref="commonBusiness">
    <div
      :style="{ width: elWidth + 'px', height: elWidth - 10 + 'px' }"
      class="content"
      v-for="(item, index) in menuList.slice(0, 12)"
      :key="index"
      @click="jump(item)"
    >
      <div class="remove" @click.stop="unStar(item.id, index)">
        <a-icon type="minus-circle" />
      </div>
      <img
        v-if="item.icon"
        :src="uiConfigs['api.url'] + '/file/v1/download?uri=' + item.icon"
        :onerror="`this.src='${defaultIcon}'`"
      />
      <img v-else :src="defaultIcon" />
      <div>{{ item.name }}</div>
    </div>
    <div
      class="add-business"
      :style="{ width: elWidth + 'px', height: elWidth - 10 + 'px' }"
      v-if="menuList.length < 12"
      @click="showModal"
    >
      <a-icon type="plus-circle" theme="filled" class="add" />
      <div>添加</div>
    </div>
    <AddMenu
      :parentCheck="false"
      v-model="menuId"
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
import AddMenu from "@/framework/widgets/components/AddMenu";

export default {
  name: "CommonMenu",
  components: {
    AIcon: Icon,
    AddMenu,
  },
  data() {
    return {
      defaultIcon: require("@/framework/assets/img/icon-menu-default.png"),
      uiConfigs: uiConfigsCookies(),
      menuList: [],
      menuId: [],
      show: false,
      elWidth: undefined,
    };
  },
  created() {
    this.getCollectList();
  },
  mounted() {
    this.$nextTick(() => {
      let width = this.$refs.commonBusiness.clientWidth - 15;
      //  平均6等份
      this.elWidth = width / 6 - 10;
    });
  },
  methods: {
    getCollectList() {
      getcollectMenu()
        .then((res) => {
          this.menuList = res.result || [];
        })
        .catch((err) => {
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
        .then((res) => {
          let index = this.menuList.findIndex((item) => item.id == id);
          if (index >= 0) {
            this.menuList.splice(index, 1);
          }
        })
        .catch((err) => {
          showError(err);
        });
    },
    showModal() {
      this.menuId = this.menuList.map((item) => item.id);
      this.show = !this.show;
    },
    updateMenuList(list) {
      updateStarMenu(list)
        .then(() => {
          this.getCollectList();
          this.show = false;
        })
        .catch((err) => {
          showError(err);
        });
    },
    jump(item) {
      if (!item) {
        return;
      }
      if (item.children && item.children.length > 0) {
        this.$router
          .push({
            name: "SubMenu",
            params: { id: item.id },
          })
          .catch((err) => {
            //ignore
          });
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
          this.$router.push(item.componenturi).catch((err) => {
            //ignore
          });
        }
      }
    },
  },
};
</script>
<style lang='less' scoped>
.common-business {
  display: flex;
  flex-wrap: wrap;
  padding-left: 8px;
  font-size: 15px;
  .content {
    margin: 5px;
    background-color: rgb(243, 244, 245);
    position: relative;
    text-align: center;
    padding-top: 10px;
    &:hover .remove {
      display: block;
      cursor: pointer;
    }
    .remove {
      display: none;
      position: absolute;
      right: 5px;
      top: 5px;
      color: @error-color;
    }

    img {
      width: 50px;
      height: 50px;
    }
  }
  .add {
    float: right;
  }
  .add-business {
    height: 105px;
    width: 115px;
    position: relative;
    /deep/.add {
      font-size: 50px;
      color: rgb(230, 230, 230);
      position: absolute;
      left: 50%;
      top: 15px;
      margin-left: -25px;
    }
    div {
      text-align: center;
      padding-top: 70px;
    }
  }
}
</style>