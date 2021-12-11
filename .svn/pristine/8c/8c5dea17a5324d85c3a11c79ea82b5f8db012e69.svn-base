<template>
  <div style="position:relative">
    <a-form-item :label="property.showName?property.name:''">
      <div class="fileUploadWrap" v-for="(item,index) in property.childs" :key="index">
        <file-upload-child
          :property="property"
          :bindform="bindform"
          :name="item.name"
          :index="index"
          :filetype="item.filetype"
        ></file-upload-child>
      </div>
    </a-form-item>
  </div>
</template>
<script>
import FileUploadChild from "./FileUploadChild";
import { Form } from "ant-design-vue";
export default {
  name: "FileUpload",
  data() {
    return {
      formData: this.$store.getters.formData,
      imgUrl: ""
    };
  },
  props: {
    property: {
      type: Object,
      required: true
    },
    bindform: {
      type: Object,
      required: true
    }
  },
  components: {
    AFormItem: Form.Item,
    FileUploadChild
  },
  created() {
    this.property.childs.forEach(item => {
      if (item.documentType == 2) {
        let type = [];
        item.documentTypeList.forEach(a => {
          /*1：.pdf
            2. .png  .jpeg  .jpg  .gif  .webp
            3. .doc  .docx  .wps  .wpt
            4. .xls  .xlsx  .et  .ett
            5. .rar  .rar
          */
          if (a == 1) {
            type = type.concat([".pdf"]);
          } else if (a == 2) {
            type = type.concat([".png", ".jpeg", ".jpg", ".gif", ".webp"]);
          } else if (a == 3) {
            type = type.concat([".doc", ".docx", ".wps", ".wpt"]);
          } else if (a == 4) {
            type = type.concat([".xls", ".xlsx", ".et", ".ett"]);
          } else if (a == 5) {
            type = type.concat([".rar", ".rar"]);
          }
        });
        this.$set(item, "filetype", type.join(","));
      } else if (item.documentType == 1) {
        this.$set(item, "filetype", "*");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.fileUploadWrap {
  background: #fff;
  padding: 3px 10px;
  border-radius: 5px;
  &:not(:first-child) {
    margin: -20px 0;
  }
  cursor: pointer;
}
</style>

