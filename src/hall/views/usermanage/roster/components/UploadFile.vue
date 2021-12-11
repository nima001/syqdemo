<template>
  <div class="appendix-layout" :class="{notEditor:!editor}">
    <p class="name" v-if="file.name" :title="file.name">{{file.name}}</p>
    <div class="upload">
      <a-upload
        ref="fileBtn"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :customRequest="customRequest"
      >
        <a>上传</a>
      </a-upload>
    </div>
    <div class="download" v-if="file.url">
      <a @click="download">下载</a>
    </div>
  </div>
</template>
<script>
import { Form, Input, Upload, Button, Icon } from "ant-design-vue";
import { mixins } from "@formdesign/views/mixin/index";
import { uploadV2, downloadV2, getFileName } from "@/framework/api/file";
import { showError } from "@/framework/utils";
export default {
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    AUpload: Upload,
    AButton: Button,
    AIcon: Icon
  },
  mixins: [mixins],
  data() {
    return {
      file: {
        name: undefined,
        url: undefined
      }
    };
  },
  computed: {
    fileUrl() {
      return this.propValue ? this.propValue[0] : undefined;
    }
  },
  watch: {
    fileUrl(v) {
      if (v) {
        this.getFimeInfo(v);
      }
    }
  },
  methods: {
    getFimeInfo(url) {
      if (this.propValue) {
        getFileName(url)
          .then(res => {
            if (res.code == "success") {
              this.file = { name: res.result, url };
            }
          })
          .catch(err => {
            showError(err);
          });
      }
    },
    download() {
      downloadV2(this.file.url);
    },
    //上传附件之前校验
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("附件大小不能超过2M!");
      }
      return isLt2M;
    },
    //上传附件
    customRequest(options) {
      this.loading = true;
      const { onSuccess, onError, file, onProgress } = options;
      uploadV2(file)
        .then(res => {
          if (res.data.code == "success") {
            this.$message.success("上传成功!");
            this.propValue = [res.data.result.uploadid];
          }
        })
        .catch(error => {
          showError(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.appendix-layout {
  display: flex;
  align-items: center;
  padding: @content-padding-v 0px;
  &.notEditor {
    cursor: not-allowed;
    .upload,
    .download {
      pointer-events: none;
      width: 40px;
      text-align: center;
    }
  }
  p {
    margin: 0px;
    flex-shrink: 1;
    min-width: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .upload {
    margin: 0px @layout-space-base;
  }
}
</style>