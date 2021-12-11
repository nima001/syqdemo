<template>
  <a-modal
    title="预览"
    :visible="true"
    @cancel="cancel"
    @ok="cancel"
    width="960px"
    :bodyStyle="{padding:'0px'}"
  >
    <div class="showpdf">
      <template v-if="numPages">
        <a-spin tip="预览加载中..." :spinning="loading">
          <pdf v-for="i in numPages" :key="i" :page="i" :src="pdfurl" style="width:100%"></pdf>
        </a-spin>
      </template>
      <template v-else>
        <empty-data></empty-data>
      </template>
    </div>
  </a-modal>
</template>
<script>
import pdf from "vue-pdf-sign";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { Spin } from "ant-design-vue";
import { uploadV2, downloadUrl, getFileName } from "@/framework/api/file";
import EmptyData from "@/framework/components/EmptyData";
export default {
  components: {
    ASpin: Spin,
    pdf,
    EmptyData
  },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      pdfurl: null,
      numPages: undefined
    };
  },
  mounted() {
    this.preview();
  },
  methods: {
    preview() {
      this.loading = true;
      let url = downloadUrl(this.record.fileuri);
      this.pdfurl = pdf.createLoadingTask(url);
      this.pdfurl.promise
        .then(pdf => {
          this.numPages = pdf.numPages;
          this.loading = false;
        })
        .catch(err => {
          if (err.name == "MissingPDFException") {
            this.$notification.warning({
              message: "提示",
              description: "文件丢失!",
              duration: 1.5
            });
          }
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("input", false);
    }
  }
};
</script>
<style lang='less' scoped>
.showpdf {
  height: 600px;
  overflow-y: auto;
  /deep/.ant-spin {
    width: 100%;
    padding-top: 20%;
  }
}
</style>