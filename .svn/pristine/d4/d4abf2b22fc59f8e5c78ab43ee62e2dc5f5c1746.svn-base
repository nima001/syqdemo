<template>
  <div class="useLayout">
    <div class="content">
      <div class="middle" v-if="hasPermit('/usermanage/roster/user/edit')">
        <template v-if="editor">
          <a-button type="primary" @click="save">保存</a-button>
          <a-button @click="editor=false" :style="{marginLeft:'10px'}">取消</a-button>
        </template>
        <a-button v-else type="primary" @click="editor=true">编辑</a-button>
      </div>
      <div class="bottom">
        <a-spin :spinning="loading">
          <form-display
            :formConfig="formConfig"
            :formLayout="formLayout"
            :formData="formData"
            :editor="editor"
            ref="formDisplay"
            v-if="show"
          >
            <upload-file slot="upLoadFile" slot-scope="props" v-bind="props"></upload-file>
          </form-display>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from "@/hall/api/usermanage";
import { showError } from "@/framework/utils";
import FormConfigs from "@/hall/utils/FormData";
import FormDisplay from "@formdesign/views/FormDisplay";
import { Button, Spin } from "ant-design-vue";
import UploadFile from "../UploadFile";
import cloneDeep from 'lodash/cloneDeep';
export default {
  components: { AButton: Button, ASpin: Spin, FormDisplay, UploadFile },
  data() {
    return {
      loading: false,
      // 表单配置
      formConfig: [],
      // 表单初始化数据
      formData: cloneDeep(this.user),
      // 表单可编辑
      editor: false,
      // 表单布局
      formLayout: undefined,
      defaultPhoto: require("@/framework/assets/img/head-default-70x98.png")
    };
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  watch:{
    user:{
      handler(v){
        this.formData = v;
      },
      deep:true
    }
  },
  computed: {
    show(){
      return this.formConfig.length ==0 ? false:true;
    },
    userId() {
      return this.$route.query.userid;
    },
    uiConfigs() {
      return this.$store.getters.config;
    },
    job() {
      if (this.formData) {
        let d = this.$store.getters.dictKey(
          "usermanage.user.windowposition",
          this.formData.job
        );
        return d && d.text;
      }
    }
  },
  mounted() {
    this.formConfig = FormConfigs.list;
    this.formLayout = FormConfigs.formLayout;
  },
  methods: {
    update(data) {
      updateUser(this.formData._id, data)
        .then(res => {
          this.formData = Object.assign({}, this.formData, res.result);
          this.editor = false;
          this.$message.info("保存成功");
        })
        .catch(err => {
          showError(err);
        });
    },
    save() {
      // 表单提交
      if(!this.$refs.formDisplay){
        return
      }
      this.$refs.formDisplay
        .submit()
        .then(res => {
          this.update(res);
        })
        .catch(errors => {
          if (Array.isArray(errors)) {
            let firstError = errors[0];
            showError({ message: firstError.message || firstError });
          } else {
            showError(errors);
          }
        });
    }
  }
};
</script>
<style lang='less' scoped>
.useLayout {
  background: @white;
  height: 100%;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .middle {
      padding: @content-padding-v @content-padding-h;
      margin-top: @padding-xs;
    }
    .bottom {
      flex: 1;
      min-height: 0px;
      padding-bottom: @content-padding-v;
      /deep/.ant-spin-nested-loading {
        height: 100%;
        .ant-spin-container {
          height: 100%;
          padding-bottom: @content-padding-v;
        }
      }
    }
  }
}
</style>