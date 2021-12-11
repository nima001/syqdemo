<template>
  <!-- 审批modal -->
  <div class="approvalModal">
    <a-modal
      class="approval_Modal"
      :visible="isShow"
      title="工资审批"
      width="40vw"
      @cancel="fn"
      @ok="handleOK"
    >
      <a-form :form="baseform">
        <a-row>
          <a-form-item label="审批意见" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-textarea
              style="resize: none;min-height: 50px;"
              v-decorator="[
                                'idea',
                                {rules: [{required: true, message:'请输入信息'}]}
                            ]"
            />
          </a-form-item>
        </a-row>
        <!-- 审批结果 -->
        <a-row>
          <a-form-item label="审批结果" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <!-- 驳回 办结 -->
            <a-select
              style="width: 120px"
              v-decorator="['result',{rules: [{required: true, message:'请输入信息'}]}]"
            >
              <a-select-option value="3">驳回</a-select-option>
              <a-select-option value="2">通过</a-select-option>
            </a-select>
          </a-form-item>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { approval} from "@/salary/api/salaryManage";
import { Modal, Form, Row, Select, Input } from "ant-design-vue";
export default {
  props: ["isShow", "id"],
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow:Row,
    ASelect:Select,
    ASelectOption:Select.Option,
    AInput:Input,
    ATextarea: Input.TextArea,

  },
  methods: {
    fn() {
      this.$emit("Modalcancel");
    },
    handleOK() {
      let that = this;
      this.baseform.validateFields((err, values) => {
        if (!err) {
            let data = {
              id: this.id,
              status: values.result,
              opinion: values.idea
            }
          approval(data).then(function(res) {
            if (res.code == "success") {
              that.$emit("Modalcancel");
              setTimeout(() => {
                that.$router.push({
                  name: "salarypaymentapproval",
                  params: { ifsuccess: true }
                });
              }, 500);
            }
          });
        }
      });
    }
  },
  data() {
    return {
      baseform: this.$form.createForm(this)
    };
  }
};
</script>
<style lang="less" >
.approval_Modal .ant-btn-default {
  display: none;
}
</style>