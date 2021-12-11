<template>
  <!-- 添加工资项目 done  《下拉菜单 滚动条bug》 -->
  <div class="addpayItem">
    <a-modal
      :visible="isShowAdd"
      title="添加项目"
      width="40vw"
      :bodyStyle="bodystyle"
      @cancel="Modalcancel"
      @ok="handleok"
    >
      <div class="addpayItemModal">
        <div class="infoBox">
          <a-form :form="baseform">
            <a-row>
              <a-form-item label="项目：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                <a-input
                  v-decorator="[
                                        'item_name',
                                        {rules: [{required: true, message:'请完善信息'}]}
                                    ]"
                />
              </a-form-item>
            </a-row>
            <a-row>
              <a-form-item label="应发金额：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                <a-input
                  v-decorator="[
                                        'shouldPay',
                                        {rules: [{required: true, message:'请完善信息'}]}
                                    ]"
                />
              </a-form-item>
            </a-row>

            <a-row>
              <a-form-item label="调整原因：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
                <a-textarea
                  style="resize: none;"
                  v-decorator="[
                                        'reasonDepend',
                                        {rules: [{required: true, message:'请完善信息'}]}
                                    ]"
                />
              </a-form-item>
            </a-row>
          </a-form>
          <div style="height: 20px;"></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { salaryItem } from "@/salary/api/salaryManage";
import { Modal, Form, Row, Input } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  data() {
    return {
      baseform: this.$form.createForm(this),
      bodystyle: {
        "max-height": "40vh",
        overflow: "auto",
        padding: "24px 36px"
      }
    };
  },
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    AInput: Input,
    ATextarea: Input.TextArea
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  props: ["isShowAdd", "userid", "monthTime", "id", "arrlength"], //props
  methods: {
    scorllBug(node) {
      return node;
    },
    Modalcancel() {
      this.$emit("closeModal");
    },
    handleok() {
      let that = this;
      this.baseform.validateFields((err, values) => {
        if (!err) {
          let obj = {};
          if (this.arrlength == 2) {
            obj.name = values.item_name;
            obj.salary = values.shouldPay;
            obj.date = this.monthTime; //目前写死
            obj.reason = values.reasonDepend;
            obj.userid = this.userid;
          } else {
            obj.name = values.item_name;
            obj.salary = values.shouldPay;
            obj.date = this.monthTime; //目前写死
            obj.reason = values.reasonDepend;
            obj.userid = this.userid;
            obj.category = this.id;
          }
          //返回数据给后端  ->  请求
          salaryItem(obj)
            .then(res => {
              that.$emit("closeModal");
            })
            .catch(err => {
              showError(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="less"  >
.addpayItemModal {
  .infoBox {
    width: 85%;
    margin: 0 auto;
  }
}
</style>