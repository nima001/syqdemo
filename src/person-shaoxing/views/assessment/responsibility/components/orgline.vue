<template>
  <div style="height: 100%">
    <a-form
      :form="this.form"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 24 }"
      @submit="handleSubmit"
    >
      <a-form-item label="选择条线">
        <a-select mode="multiple" v-decorator="['lineids' , { initialValue: this.orglineid }]" :disabled="this.loading">
          <a-select-option v-for="item in orgline" :key="item.id" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="选择区域">
        <district :currValArrs.sync="currValArrs" :loading="this.loading"/>
      </a-form-item>
      <a-form-item class="btn" :wrapper-col="{ span: 24 }">
        <a-button type="primary" html-type="submit" :disabled="!this.currValArrs.length||this.loading||!this.form.getFieldValue('lineids')||!this.form.getFieldValue('lineids').length" block>确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form, Select, DatePicker, Button } from "ant-design-vue";
import district from "./district";
import { cloneDeep } from 'lodash';
import { showError } from "@/framework/utils";
import { qlsxlinetable } from "@/person-shaoxing/api/assessment";
import { orglinequery } from "@/person-shaoxing/api/information";
export default {
  props: {
    columns: {
      //表头数据
      type: Array,
    },
    pagination: {
      //分页数据
      type: Object,
    },
    loading: {
      //加载状态
      type: Boolean,
    },
    orglineid: {
      //'条线对比'查询出的条线id
      type: Array,
    },
    tableData: {
      //表格数据
      type: Array,
    },
    conditionActive: {
      //共性区域数选项
      type: String | Number,
    },
  },  
  components: {
    district,
    AForm: Form,
    AButton: Button,
    ASelect: Select,
    AFormItem: Form.Item,
    ADatePicker: DatePicker,
    ASelectOption: Select.Option,
    AMonthPicker: DatePicker.MonthPicker,
  },
  data() {
    return {
      orgline: [],
      columnsdata: [],
      currValArrs: [],
      qlsxOptions: [],
      form: this.$form.createForm(this, { name: "orglineFrom" }),
      params: { pagesize: 10, pagenum: 1, total: 0, needtotal: true },
    };
  },
  computed: {
    district() {
      return this.$store.getters.dict("usermanage.org.district");
    },
  },
  mounted() {
    this.orglineQuery();
    if(this.orglineid.length) {
      this.currValArrs = this.district.filter(item=>item);
      this.handleSubmit();
    }else{
      this.currValArrs=[];
    }
  },
  methods: {
    initcolumns() {
      this.columnsdata = [
        {
          title: "权力基本码",
          dataIndex: "quanlicode",
          key: "quanlicode",
        },
        {
          title: "权力事项名称",
          dataIndex: "name",
          key: "name",
          ellipsis: true,
        },
      ];
    },
    //查询全部条线
    orglineQuery() {
      orglinequery({ needtotal: true, pagesize: 0 })
        .then((res) => {
          this.orgline = res.result.rows;
        })
        .catch((err) => {
          showError(err);
        });
    },
    //条线部门表头
    qlsxlineTable(data) {
      qlsxlinetable(data)
        .then((res) => {
          if (res.result) {
            res.result.forEach((item, index)=>{
              this.columnsdata.push({
                title: () => {
                  return (
                    <div>
                      <p style="margin-bottom:0">{item.name}</p>
                      <p style="margin-bottom:0;">({item.total})</p>
                    </div>
                  );
                },
                dataIndex: `${item.statistickey}`,
                key: `${item.statistickey}`,
                align: "center",
                scopedSlots: { customRender: "check" },
              });
            });
            this.$emit('update:columns', this.columnsdata);
            this.$emit('qlsxLine', this.params);
          }
        })
        .catch((err) => {
          showError(err);
        });
    },
    handleSubmit(e) {
      if(e) {
        e.preventDefault();
      }
      this.$emit('update:conditionActive', 'all');
      let district = [];
      this.initcolumns();
      this.currValArrs.forEach((item) => {
        district.push(item.value);
      });
      this.params.districts = district;
      this.params.pagenum = 1;
      this.form.validateFields((err, values) => {
        if (!err) {
          this.params.lineids = cloneDeep(values.lineids);
          this.$emit('update:pagination', this.params);
          this.qlsxlineTable(this.params);
        }
      });
    }
  },
};
</script>
<style scoped lang="less">
/deep/.ant-form {
  height: 100%;
  position: relative;
  .btn.ant-form-item:last-child {
    position: absolute;
    bottom: 0;
    left: @padding-xs;
    right: @padding-xs;
  }
}
</style>
