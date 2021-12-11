<template>
  <a-modal
    title="保存查询"
    :visible="value"
    @ok="saveQuery"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    :bodyStyle="{padding:'24px'}"
  >
    <a-input
      placeholder="请输入标题"
      @change="changeHandle"
      :defaultValue="title|| feedbackParams.title"
      ref="queryTitle"
    />
    <p class="errorMsg" v-if="!title && errorFlag">请填写标题</p>
  </a-modal>
</template>
<script>
import { querysave } from "@/person/api/integratedquery";
import { randomStr ,showError} from "@/framework/utils/index";
import { Input, Modal } from "ant-design-vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: {
    AModal: Modal,
    AInput: Input
  },
  data() {
    return {
      title: "",
      confirmLoading: false,
      errorFlag: false
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    selected: {
      type: Array,
      required: true
    },
    searchObj: {
      type: String,
      required: true
    },
    node: {
      type: Object,
      required: true
    },
    userType: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    feedbackParams: {
      type: Object,
      required: true
    }
  },
  inject: ["namespace"],
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      if (this.title) {
        this.$emit("save", this.title);
      }
    },
    changeHandle(e) {
      this.title = e.target.value;
    },
    handleCancel(e) {
      this.errorFlag = false;
      this.$emit("input", false);
    },
    saveQuery() {
      /**
       * namespace : customquery -> 综合查询
       *             report -> 报表模板
       *             statisticfield -> 统计字段
       *             salaryitem  -> 工资
       */
      this.errorFlag = true;
      if (this.feedbackParams.title) {
        this.title = this.$refs.queryTitle.$el.value;
      }
      if (!this.title) {
        return false;
      }
      let result = cloneDeep(this.$store.getters.treeData);
      let data = {
        fields: this.selected,
        filter: result,
        model: this.searchObj,
        needtotal: true,
        node: this.node,
        usertype: this.userType,
        pagenum: this.pagination.pagenum,
        pagesize: this.pagination.pagesize,
        namespace: this.namespace,
        title: this.title
      };
      if (this.feedbackParams.title) {
        let title = this.title ? this.title : this.$refs.queryTitle.$el.value;
        Object.assign(data, { id: this.feedbackParams.id, title });
      }
      querysave(data)
        .then(res => {
          this.$notification.success({
            message: "提示",
            description: "保存成功!",
            duration: 3
          });
        })
        .catch(error => {
          showError(error);
        })
        .finally(() => {
          this.$emit("input", false);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.errorMsg {
  color: #d60002;
  margin: 10px 0px 0px;
}
</style>