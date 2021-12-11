<template>
  <div class="edit-orgdistr-category">
    <a-form :form="form" class="form-warp">
      <a-row :gutter="24" style="margin: 0 40px">
        <a-col :span="12">
          <a-form-item label="名称">
            <a-input
              placeholder="请填写名称"
              v-decorator="[
                `name`,
                {
                  rules: [{ required: true, message: '请填写名称!' }],
                  initialValue: dataList.name,
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="编码">
            <a-input
              placeholder="请填写编码"
              v-decorator="[
                'code',
                {
                  rules: [{ required: true, message: '请填写编码!' }],
                  initialValue: dataList.code,
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin: 0 40px">
        <a-col :span="12">
          <a-form-item label="统计模型">
            <a-input
              placeholder="请填写模型类型"
              v-decorator="[
                'dict',
                {
                  rules: [{ required: true, message: '请填写模型类型!' }],
                  initialValue: getModelVal(dataList.model),
                },
              ]"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item label="字段分类">
          <a-input
            v-decorator="['sort',
              {
                initialValue: dataList.sort, 
                rules: [
                  { required: true, message: '请输入字段分类' }, 
                ] 
              }]"
          />
        </a-form-item>
      </a-col>
      </a-row>
      <a-row :gutter="24" v-for="(item,index) in dataList.values" :key="item.id" class="templist" style="margin: 0 40px">
        <div class="remove" @click="deleteItem(item.id,record.id)">
          <a-icon type="close" />
        </div>
        <div class="target">
          <span>统计对象：</span>
          <span>{{ getTarget(item.targetid) }}</span>
        </div>
        <a-col :span="24" >
         <a-form-item label="计算公式">
          <a-textarea
            :rows="4"
            @click="openbox(item.targetid,item.expression,index,item.id)"
            :read-only="true"
            v-decorator="[`expression${index}`,
            {
              initialValue: item.expression, 
              rules: [{ required: true, message: '请输入公式' }] 
            }]"
          />
        </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="add-btn" style="margin: 0 40px">
        <a-col :span="24">
          <a-form-item>
            <a-button type="dashed" style="width: 100%" @click="chooseTarget">
              <a-icon type="plus" /> 添加规则
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal v-model="showTarget" title="选择统计对象" :width="500" :bodyStyle="{ height: '300px', padding: '0' }" :destroyOnClose="true" @ok="showComputed" >
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="18">
            <a-form>
              <a-form-item label="统计对象">
                <a-select
                  @change="setValue"
                  placeholder="请选择统计对象"
                  v-decorator="[
                    'targetid',
                    {
                      initialValue: dataList.targetid,
                      rules: [{ required: true, message: '请选择统计对象' }],
                    },
                  ]"
                >
                  <a-select-option v-for="item in targetlist" :key="item.id" :value="item.id">{{
                    item.title
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
    </a-modal>
    <equation-editor v-if="expr.show" @finish="finish" :fnData="expr.data" 
    namespace="statisticfield" :contextParams="expr.params" :foreach="expr.foreach"
    ></equation-editor>
  </div>
</template>

<script>
import { Form, Col, Row, Input, DatePicker, Select, Button, Icon, Modal, Divider } from "ant-design-vue";
import { addOrgdistrTemp} from "@/person/api/orgRecord";
import { getExpression,saveExpression,deleteExpression } from "@/person/api/field";
import { showError } from "@/framework/utils/index";
import DictSelect from "@/framework/components/DictSelect";
import moment from "moment";
import EquationEditor from "@person/components/EquationEditor/index";
export default {
  props: {
    record: {
      type: Object,
      default: () => ({}),
    },
    targetlist: {
      type: Array,
    },
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ACol: Col,
    ARow: Row,
    AInput: Input,
    ADatePicker: DatePicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    ADivider: Divider,
    ATextarea: Input.TextArea,
    DictSelect,
    EquationEditor,
  },
  data() {
    return {
      dataList: {},
      showAddTemp: false,
      showTarget:false,
      type: undefined,
      expr: {
        show: false,
        params: {},
        data: "",
        id:undefined
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.dataList = JSON.parse(JSON.stringify(this.record));
    this.$set(this.dataList,"values",[])
    this.loadExpression()
  },
  methods: {
    moment,
    getModelVal(model){
      if(model == "organization"){
        return "组织"
      }else if(model == "user"){
        return "用户"
      }
    },
    getTarget(id){
      let t = this.targetlist.find((item) => item.id == id);
      return t && t.title;
    },
    setValue(value){
      let t = this.targetlist.find((item) => item.id == value);
      this.expr.params = { target: t.namespace };
      this.expr.id = value;
    },
    showComputed(){
      this.showTarget = false;
      this.expr.show = true;
      this.expr.index = -1;
    },
    isRepeat(arr) {
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i].value]) {
          return true;
        }
        hash[arr[i].value] = true;
      }
      return false;
    },
    arrayRepeat (array1, array2) {
      var result = []
      for (var i = 0; i < array2.length; i++) {
        var obj = array2[i]
        var num = obj.id
        var isExist = false
        for (var j = 0; j < array1.length; j++) {
          var aj = array1[j]
          var n = aj.id
          if (n === num) {
            isExist = true
            break
          }
        }
        if (!isExist) {
          result.push(obj)
        }
      }
      return result
    },
    loadExpression(last,expressionId){
      getExpression(this.record.id).then(res=>{
        if(last == 1){
          if(this.dataList.values.length > 0){
            let result = this.arrayRepeat(this.dataList.values,res.result);
            this.dataList.values.push(result[0])
          }else{
            this.dataList.values.push(res.result[0])
          }
        }else if(last == -1){
          let t = this.dataList.values.find((item) => item.id == expressionId);
          let index = this.dataList.values.indexOf(t)
          this.dataList.values.splice(index, 1);
        }else{
          for(let i = 0;i<res.result.length;i++){
            this.dataList.values.push(res.result[i])
          }
        }        
      })
    },
    deleteItem(expressionId,id){
      deleteExpression(expressionId,id).then(res=>{
        this.loadExpression(-1,expressionId)
      })
    },
    chooseTarget(){
      this.showTarget = true;
    },
    openbox(targetid,expression,index,expressionId) {
      if (!targetid) {
        this.$message.info("请先选择统计对象");
        return;
      }
      let t = this.targetlist.find((item) => item.id == targetid);
      this.expr.id = t.id;
      this.expr.params = { target: t.namespace };
      this.expr.data = expression;
      this.expr.show = true;
      this.expr.index = index;
      this.expr.expressionId = expressionId
    },
    finish(type, expr) {
      if (type == "ok") {
        if(this.expr.index != -1){
          let expression = `expression${this.expr.index}`;
          const data = {
            targetid:this.expr.id,
            expression:expr,
            id:this.expr.expressionId
          }
          saveExpression(data,this.record.id).then(res=>{   
            const target = this.dataList.values.find(item => item.id = res.result);
            let index = this.dataList.values.indexOf(target);
            this.dataList.values[index].expression = expr;
            this.dataList.values[index].id ++;
            console.log(this.dataList.values)
          }).catch((err) => {
              showError(err)
          });
          this.form.setFieldsValue({
            [expression]: expr,
          });
        }else{
          const data = {
            targetid:this.expr.id,
            expression:expr
          }
          saveExpression(data,this.record.id).then(res=>{
            this.loadExpression(1)
          }).catch((err) => {
            showError(err)
          });
        }
        this.expr.show = false;
      } else {
        this.expr.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.edit-orgdistr-category {
  height: 100%;
  display: flex;
  flex-direction: column;
  .form-warp {
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: @content-padding-v @content-padding-h;
    .templist {
      position: relative;
      &:hover {
        outline: 1px dashed @primary-2;
        .remove {
          display: block;
        }
      }
    }
    .remove {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
      width: 16px;
      height: 16px;
      padding-left: 4px;
      padding-bottom: 4px;
      line-height: 12px;
      font-size: 12px;
      border-bottom-left-radius: 12px;
      background: fade(#666, 10%);
      color: #666;
      display: none;
      &:hover {
        color: @error-color;
        cursor: pointer;
      }
    }

    .target{
      color: rgba(0, 0, 0, 0.85);
      padding: 12px 0 0 12px;
    }
  }
}
</style>