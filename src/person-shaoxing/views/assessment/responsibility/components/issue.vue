<template>
  <div style="height: 100%">
    <a-form
      :form="this.form"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 24 }"
      @submit="handleSubmit"
    >
      <a-form-item label="选择区域">
        <district :currValArrs.sync="currValArrs" :loading="loading"/>
      </a-form-item>
      <a-form-item label="选择事项">
        <qlsxselect :codes.sync="codes" :qlsxOptions.sync="qlsxOptions" :loading="loading"/>
      </a-form-item>
      <a-form-item class="btn" :wrapper-col="{ span: 24 }">
        <a-button type="primary" html-type="submit" :disabled="this.loading||(!this.currValArrs.length)" block>确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form, Select, DatePicker, Button } from "ant-design-vue";
import { assign, map } from "lodash";
import qlsxselect from "./qlsxselect";
import district from "./district";
export default {
  props: {
    pagination: {
      //分页
      type: Object,
    },
    columns: {
      //表头数据
      type: Array,
    },
    conditionActive: {
      //共性区域数选项
      type: String | Number,
    },
    loading: {
      //加载状态
      type: Boolean,
    },
    selectdisAll: {
      //是否全选区域
      type: Boolean,
      default: false,
    },
    codesvalue: {
      //index跳转details，权力事项选中值
      type: Array,
    }
  },
  components: {
    district,
    qlsxselect,
    AForm: Form,
    AButton: Button,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    ADatePicker: DatePicker,
    AMonthPicker: DatePicker.MonthPicker,
  },
  data() {
    return {
      columnsdata: [],
      currValArrs: [],
      qlsxOptions: [],
      codes: undefined,
      form: this.$form.createForm(this, { name: "issueFrom" }),
      params: { pagesize: 10, pagenum: 1, total: 0, needtotal: true },
    };
  },
  computed: {
    districts() {
      return this.$store.getters.dict("usermanage.org.district");
    },
  },
  watch: {
    codes(val) {
      if(val.length) {
        this.params.codes = val;
        this.handleCode(this.params.codes);
      }else{
        this.params.codes = undefined;
      }
      return val;
    },
    columns(val) {
      return val;
    },
    currValArrs(val) {
      return val;
    },
  },
  mounted() {
    if(this.selectdisAll) {
      //设置选中‘全部事项按钮’
      if(this.conditionActive !== 'all' && typeof this.conditionActive !== 'number') {
        this.$emit('update:conditionActive', 'all');
      }
      //将区域全部选中
      this.currValArrs = this.districts.filter(item=>item);
      this.$emit('update:selectdisAll', false);
      //设置权力事项值
      if(this.codesvalue.length) {
        this.codes = this.codesvalue;
        this.$emit('update:codesvalue', undefined);
      }
    }else{
      this.currValArrs = this.districts.filter((item)=> item.text === '越城区' || item.text === '上虞区' || item.text=== '柯桥区' );
    }
    this.loadData();
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
    handleCode(val) {
      this.params.codes = map(val,(item)=>{
        return { 'quanliname': item.label, 'quanlicode': item.value }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$emit('update:conditionActive', 'all');
      this.loadData();
    },
    loadData() {
      let district = [];
      this.initcolumns();
      this.currValArrs.forEach((item) => {
        district.push(item.value);
        this.columnsdata.push({
          title: item.text,
          dataIndex: `${item.value}`,
          key: `${item.value}`,
          ellipsis: true,
        });
      });
      if(district.length) {
        this.params.districts = district;
      }else{
        this.params.districts = undefined;
      }
      this.params.codes = this.codes;
      if(this.params.codes&&this.params.codes.length) {
        this.handleCode(this.params.codes);
      }
      this.$emit('update:columns', this.columnsdata);
      this.$emit("update:pagination", this.params);
      this.$emit("qlsxsearchOrg", this.params);
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
