<template>
  <div class="org-main-duty">
    <a-spin v-if="mainDuty == null" class="loading" :delay="50" />
    <div v-else-if="mainDuty" v-html="mainDuty" class="ql-editor" />
    <empty-data v-else />
  </div>
</template>
<script>
import { getfuncdesc } from "@/person/api/org";
import EmptyData from "@/framework/components/EmptyData";
import "quill/dist/quill.core.css";
import { Spin } from "ant-design-vue";
export default {
  props: {
    orgid: String,
  },
  components: {
    ASpin: Spin,
    EmptyData,
  },
  data() {
    return {
      mainDuty: null,
    };
  },
  created() {
    this.showMainDuty(this.orgid);
  },
  watch: {
    orgid(id) {
      this.showMainDuty(id);
    },
  },
  computed: {
    spinning() {
      return this.mainDuty == null;
    },
  },
  methods: {
    showMainDuty(id) {
      this.mainDuty = null;
      if (id) {
        getfuncdesc(id)
          .then((resp) => {
            this.mainDuty = resp.result || "";
          })
          .catch((error) => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3,
            });
          });
      }
    },
  },
};
</script>
<style lang="less">
.org-main-duty {
  height: 100%;
  & > .ql-editor {
    padding: 12px 32px;
  }
  & > .loading {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -10px;
  }
}
</style>