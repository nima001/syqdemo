<template>
  <a-layout>
    <a-layout class="processwrap selectorgprocess">
      <a-layout-content>
        <div class="body">
          <div class="orgWrap">
            <select-process-user @userOk="userOk"></select-process-user>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout, Button } from "ant-design-vue";
import SelectProcessUser from "./components/SelectProcessUser";
import { chooseOrg } from "@/workflow/api/catalog";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    SelectProcessUser,
    ALayout: Layout,
    ALayoutContent: Layout.Content
  },
  methods: {
    //确定选择的用户
    userOk(val) {
      let query = {};
      query.code = this.$route.query.code;
      query.userid = val;
      chooseOrg(query)
        .then(res => {
          this.isUrl(res.result.gotoUrl);
        })
        .catch(err => {
          showError(err);
        });
    },
    //判断跳转的路径是否需要拼接
    isUrl(url) {
      if (url) {
        let link = decodeURIComponent(url);
        if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
          // 直接跳转
          window.open(link, "_self");
        } else {
          // 相对路径
          if (link.indexOf("/") == 0) {
            link = link.substr(1);
          }
          let newURL =
            process.env.NODE_ENV === "production"
              ? process.env.BASE_URL + link
              : window.location.origin + "/" + link;
          window.open(newURL, "_self");
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.selectorgprocess {
  .body {
    height: 350px;
    margin: 12px;
    .orgWrap {
      width: 500px;
      margin: 20px auto;
      background: #fff;
    }
  }
}
</style>