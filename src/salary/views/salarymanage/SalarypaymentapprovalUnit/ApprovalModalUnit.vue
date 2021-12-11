<template>
  <!-- 审批modal -->
  <div class="approvalModalunit">
    <a-modal class="approval_Modalunit" :visible="isShow" title="工资审批" width="40vw" @cancel="fn">
      <a-form :form="baseform">
        <a-row>
          <a-form-item label="审批意见" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input
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
              <a-select-option value="1">驳回</a-select-option>
              <a-select-option value="0">办结</a-select-option>
            </a-select>
          </a-form-item>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {Modal,Form,Row,Input,Select} from 'ant-design-vue';
export default {
  props: ["isShow"],
  components:{
      AModal:Modal,
      AForm:Form,
      AFormItem:Form.Item,
      ARow:Row,
      AInput:Input,
      ASelect:Select,
      ASelectOption:Select.Option
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  methods: {
    fn() {
      this.$emit("Modalcancel");
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
.approval_Modalunit .ant-btn-default {
  display: none;
}
</style>