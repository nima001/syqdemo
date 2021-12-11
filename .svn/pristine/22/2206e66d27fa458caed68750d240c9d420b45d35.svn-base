<template>
  <div class="add-report">
    <a-form class="add-form" :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="评估指标体系名称" :colon="false">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    { required: true, message: '请输入评估指标体系名称' },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="总分" :colon="false">
            <a-input
              v-decorator="[
                'score',
                { rules: [{ required: true, message: '请输入总分' }] },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="评估对象" :colon="false">
            <a-input
              v-decorator="[
                'target',
                { rules: [{ required: true, message: '请输入评估对象' }] },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="分类" :colon="false">
            <dict-select
              dict="person.evaluate.templatetype"
              v-decorator="[
                'sort',
                { rules: [{ required: true, message: '请选择分类' }] },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <criteria
            :target="query.target"
            style="margin-bottom: 15px"
            ref="criteria"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="18">
          <a-button
            type="dashed"
            :style="{ width: '400px' }"
            @click="addCondition"
          >
            <a-icon type="plus-circle" /> 添加条件
          </a-button>
        </a-col>
        <a-col :span="6">
          <div>
            <a @click="search">查询</a>
            <a @click="reset">重置</a>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import {
  Row,
  Col,
  Select,
  Form,
  Input,
  Modal,
  Icon,
  Button,
} from "ant-design-vue";
import DictSelect from "@framework/components/DictSelect";
import Criteria from "@person/views/integratedquery/components/Criteria";
import { queryList } from "@/person/api/kpi";
export default {
  props: ["selectID"],
  components: {
    ARow: Row,
    ACol: Col,
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    AModal: Modal,
    AIcon: Icon,
    AButton: Button,
    DictSelect,
    Criteria,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      query: {
        target: {
          catalogid: 50,
          id: 1,
          title: "组织",
        },
      },
    };
  },
  created() {
    if (this.selectID) {
      this.queryData();
    }
  },
  methods: {
    //获取表单数据
    getFormValue() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((error, values) => {
          if (error) {
            reject({ code: "form_validate_fail", message: "表单验证失败" });
          } else {
            let reportNames = values.items ? values.items.join(",") : undefined;
            let value = {
              name: values.name,
              score: values.score,
              sort: values.sort,
              target: values.target,
            };
            resolve(value);
          }
        });
      });
    },
    queryData() {
      let obj = { id: this.selectID };
      queryList(obj).then((res) => {
        let data = res.result.rows[0];
        this.form.setFieldsValue({
          name: data.name,
          score: data.score,
          target: data.target,
          sort: data.sort,
        });
      });
    },
    addCondition() {
      this.$refs.criteria.add();
    },
    reset() {
      this.form.resetFields();
    },
    search() {},
  },
};
</script>
<style lang="less" scoped>
.add-report {
  height: 100%;
  display: flex;
  flex-direction: column;
  .add-form {
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: @content-padding-v @content-padding-h;
    a {
      margin-right: 15px;
    }
  }
}
</style>