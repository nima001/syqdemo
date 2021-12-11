<template>
  <a-layout>
    <a-layout class="processwrap selectorgprocess">
      <a-layout-content>
        <div class="body">
          <div class="orgWrap">
            <org-user-select mode="org" @finish="submitOrg" :rootSelectable="true"></org-user-select>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout, Button } from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import { chooseOrg } from "@/workflow/api/catalog";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    OrgUserSelect,
    ALayout: Layout,
    ALayoutContent: Layout.Content
  },
  methods: {
    //确定选择的机构
    submitOrg(type, list) {
      if (type == "ok" && list.length > 0) {
        let org = list[0];
        let query = {};
        query.code = this.$route.query.code;
        query.orgid = org._id;
        chooseOrg(query)
          .then(res => {
            this.isUrl(res.result.gotoUrl);
          })
          .catch(err => {
            showError(err);
          });
      }
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
    height: 800px;
    overflow: auto;
    margin: 12px;
  }
  .orgWrap {
    width: 500px;
    margin: 20px auto;
    background: #fff;
  }
}
</style>