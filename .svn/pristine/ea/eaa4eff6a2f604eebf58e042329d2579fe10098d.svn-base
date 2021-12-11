<template>
  <!-- 审批modal -->
  <div class="approvalModal">
    <a-modal
      class="approval_Modal"
      :visible="ifshowIdea"
      title="工资审批"
      width="40vw"
      @cancel="fn"
      :footer="null"
    >
      <a-form :form="baseform">
        <a-row>
          <a-form-item label="审批意见" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            {{ideaTxt}}
            <!-- <a-input   disabled="disabled" v-decorator="[
                                    'idea'
            ]" />-->
          </a-form-item>
        </a-row>
        <!-- 审批结果 -->
        <a-row>
          <a-form-item label="审批结果" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            {{result}}
            <!-- 驳回 办结 -->
            <!-- <a-select 
                                disabled="disabled"
                                style="width: 120px" 
                                v-decorator="['result']">
            </a-select>-->
          </a-form-item>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
    
<script>
import {Modal,Form,Row} from 'ant-design-vue';
export default {
  props: ["ifshowIdea", "IdeaData"],
  components:{
    AModal:Modal,
    AForm:Form,
    AFormItem: Form.Item,
    ARow:Row
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  created() {
    //1 待审核 2 审核通过 3 驳回
    let state;
    switch (this.IdeaData.status) {
      case 1:
        state = "待审核";
        break;
      case 2:
        state = "审核通过";
        break;
      case 3:
        state = "驳回";
        break;
    }

    this.ideaTxt = this.IdeaData.opinion;
    this.result = state;
  },
  methods: {
    fn() {
      this.$emit("close");
    }
  },
  data() {
    return {
      result: "",
      ideaTxt: "",
      baseform: this.$form.createForm(this)
    };
  }
};
</script>
    <style lang="less" >
</style>