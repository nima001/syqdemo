<template>
  <div>
    <a-form-item class="fileUploadChildWrap">
      <div>
        <div :class="property.childs[index].require?'fileTitle isrequire':'fileTitle'">
          {{name}}
          <div class="addFile">
            <a-button
              type="primary"
              icon="plus"
              @click="trigger"
              :disabled="property.childs[index].editable?false:true"
            >选择文件</a-button>
          </div>
        </div>

        <div
          class="fileList"
          v-for="(item,idx) in fileList"
          :key="idx"
          :style="idx==fileList.length-1?'border-bottom:1px solid #e8e8e8':'border-bottom:none'"
        >
          <span class="filename">{{item.text}}</span>
          <span>
            <a-button type="primary" size="small" @click="preview(item.url,item.type)">预览</a-button>
            <a-button
              type="danger"
              size="small"
              :disabled="property.childs[index].editable?false:true"
              @click="del(idx)"
            >移除</a-button>
          </span>
        </div>
      </div>
      <input
        type="file"
        ref="fileBtn"
        class="fileBtn"
        id="uploadFile"
        :accept="filetype"
        @change="getFile($event)"
        multiple="multiple"
      />
      <input
        type="hidden"
        v-decorator="[
          `${code}`,
          {
            rules: [{required: property.childs[index].require, message: `请上传文件!`}],
            initialValue: flag
          }
        ]"
      />
    </a-form-item>

    <!-- 点击预览的窗口 -->
    <a-modal
      title="文件预览"
      :bodyStyle="{'padding':'0'}"
      :visible="visible"
      @cancel="visible=false"
      width="900px"
      style="top:50px"
      :footer="null"
    >
      <div class="preview">
        <div class="showpdf" :style="{'height':autoHeight+'px','overflow':'auto'}">
          <div v-if="type==1">
            <pdf v-for="i in numPages" :key="i" :page="i" :src="url" style="width:100%"></pdf>
          </div>
          <img :src="url" alt="文件图片" v-else-if="type==2" />
          <a :href="url" v-else>暂不支持预览，可点击下载...</a>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import pdf from "vue-pdf-sign";
import { uploadImg } from "@/workflow/api/workflow";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { parseQueryString } from "@/workflow/utils/index";
import { Form, Icon, Button, Input, Modal } from "ant-design-vue";
export default {
  props: ["property", "bindform", "name", "index", "filetype"],
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      fileList: [],
      code: this.property.childs[this.index].code,
      formData: this.$store.getters.formData,
      obj: {},
      visible: false,
      url: undefined,
      type: null,
      numPages: undefined,
      flag: undefined,
      autoHeight: 0,
      windowHeight: window.innerHeight
    };
  },
  components: {
    AFormItem: Form.Item,
    AIcon: Icon,
    AButton: Button,
    AInput: Input,
    AModal: Modal,
    pdf
  },
  mounted() {
    this.autoHeight = this.windowHeight * 0.6;
    const that = this;
    window.onresize = () => {
      return (() => {
        this.windowHeight = window.innerHeight;
      })();
    };
  },
  watch: {
    windowHeight(val) {
      this.windowHeight = val;
      this.autoHeight = val * 0.6;
    }
  },
  created() {
    this.property.childs.forEach(item => {
      this.obj[item.name] = [];
    });
    if (this.formData[this.code]) {
      let name = this.property.childs[this.index].name;
      this.obj[name] = this.formData[this.code];
      this.getFileName(this.formData[this.code]);
      this.flag = 1;
    } else {
      if (!this.property.childs[this.index].required) {
        this.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
      }
    }
  },
  methods: {
    //加入表单数据
    submitForm(value) {
      this.$store.getters.formData[this.code] = value;
      this.$store.commit({
        type: "SET_FORM_DATA",
        data: this.$store.getters.formData
      });
    },
    //上传文件
    getFile(event) {
      let file = event.target.files[0];
      uploadImg(file)
        .then(res => {
          if (res.code == "success") {
            let url = res.result;
            this.obj[this.name].push(res.result);
            let arr = file.name.split(".");
            let type = arr[arr.length - 1];
            this.fileList.push({ text: file.name, url: url, type: type });
            this.$message.success("文件上传成功！");
            this.submitForm(this.obj[this.name]);
            this.flag = 1;
            document.getElementById("uploadFile").value = null;
          }
        })
        .catch(error => {
          this.$message.error("文件上传失败！");
        });
    },
    //拿文件名
    getFileName(urls) {
      this.fileList = [];
      urls.forEach(item => {
        let name = parseQueryString(item).filename;
        let arr = name.split(".");
        let type = arr[arr.length - 1];
        this.fileList.push({
          text: name,
          url: item,
          type: type
        });
      });
    },
    trigger() {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
      
    },
    //删除上传后的文件
    del(index) {
      this.fileList.splice(index, 1);
      this.obj[this.name].splice(index, 1);
      this.submitForm(this.obj[this.name]);
      if (this.fileList.length == 0) {
        this.flag = undefined;
        this.$store.getters.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.$store.getters.formData
        });
      }
    },
    //判断后缀名
    isType(value) {
      value = value.toLowerCase();
      if (
        value == "psd" ||
        value == "pdd" ||
        value == "jpg" ||
        value == "gif" ||
        value == "png" ||
        value == "jpeg"
      ) {
        this.type = 2;
      } else if (value == "pdf") {
        this.type = 1;
        this.url = pdf.createLoadingTask(this.url);
        this.url.promise.then(pdf => {
          this.numPages = pdf.numPages;
        });
      } else {
        this.type = 3;
      }
    },
    //预览
    preview(url, type) {
      this.url =
        this.uiConfigs["api.url"] +
        "/file/v1/download" +
        "?uri=" +
        encodeURIComponent(url);
      this.isType(type);
      this.visible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.fileUploadChildWrap {
  padding-bottom: 4px;
  .fileTitle {
    position: relative;
    margin: 0;
    padding: 10px 0;
    &:hover {
      background: @primary-1;
    }
    &.isrequire::before {
      display: inline-block;
      margin-right: 4px;
      content: "*";
      font-family: SimSun;
      line-height: 1;
      font-size: 14px;
      color: #f5222d;
    }
  }
  .fileList {
    border: 1px solid #e8e8e8;
    height: 40px;
    padding: 0 15px;
    display: flex;
    line-height: 40px;
    span {
      &:first-child {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80%;
      }
      &:last-child {
        width: 20%;
        min-width: 160px;
        border-left: 1px solid #e8e8e8;
        padding-left: 20px;
        button {
          margin: 0 10px;
          a {
            text-decoration: none;
          }
        }
      }
    }
    &:hover {
      background: @primary-1;
    }
  }
  .addFile {
    position: absolute;
    top: 9px;
    right: 94px;
    button {
      height: 24px;
      line-height: 22px;
      padding: 0 17px;
    }
  }
}
.fileBtn {
  width: 0px;
  height: 0px;
  opacity: 0;
}
.preview {
  text-align: center;
  img {
    max-width: 100%;
    max-height: 500px;
  }
  .showpdf {
    span {
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>