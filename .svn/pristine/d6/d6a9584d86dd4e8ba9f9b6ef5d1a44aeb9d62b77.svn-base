<template>
  <div class="form-url">
    <a-spin :spinning="spin" size="large" tip="加载中...">
      <div class="spin-content"></div>
    </a-spin>
  </div>
</template>

<script>
import { Spin } from "ant-design-vue";
import { formurl } from "@/workflow/api/workflow";
export default {
  components: {
    ASpin: Spin
  },
  data() {
    return {
      spin: true
    };
  },
  created() {
    let link = window.location.search;
      if(link){
          let params = "";
          let search = new URLSearchParams(link);
          if(search.has("oldurl")){
            params = 'oldurl='+ encodeURIComponent(search.get("oldurl"));
          }else {
              params = link.split("?")[1];
          }
        this.getformurl(params);
    }else{
        this.spin=false;
        this.$notification.error({
            message: "提示",
            description: "无效的路径！",
            duration: 0
        });
    }
  },
  methods: {
    getformurl(urls) {
      formurl(urls)
        .then(res => {
          this.isUrl(res.result);
        })
        .catch(err => {
          this.spin=false;
          this.$notification.error({
            message: "提示",
            description:err.desc || "跳转路径失败！",
            duration: 0
          });
        });
    },
    //判断跳转的路径是否需要拼接
    isUrl(url) {
      if (url) {
        this.spin=false;
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
          // 直接跳转
          window.open(url, "_self");
        } else {
          // 相对路径
          if (url.indexOf("/") == 0) {
            url = url.substr(1);
          }
          let newURL = process.env.NODE_ENV === "production" ? process.env.BASE_URL + url : url;
          window.open(newURL, "_self");
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.form-url {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .ant-spin-nested-loading {
    height: 100%;
  }
  /deep/.ant-spin-container {
    height: 100%;
  }
  .spin-content {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>