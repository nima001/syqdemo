<template>
  <div>
    <a-row>
      <a-col v-for="(k, index) in form.getFieldValue('keys')" :key="k" class="join">
        <div v-if="showAssist.indexOf(k) < 0" class="joincontent">
          <a-col :span="span">
            <a-form-item :class="{'horizontal': horizontal}" :label="`协办处室`" :label-col="{ span: horizontal? 6: 4  }" :wrapper-col="{ span:  horizontal? 10: 19 }">
              <a-select allowClear :placeholder="'请选择协办处室'" v-decorator="[`orgid${index + 1}`, { initialValue: search[`orgid${index + 1}`] }]">
                <a-select-option v-for="item in search.orgs" :value="item._id" :key="item._id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="span" :class="{'horizontal-person': horizontal}">
            <a-form-item :label="`协办人`" :label-col="{ span: horizontal? 6: 4  }" :wrapper-col="{ span:  horizontal? 10: 19 }">
              <UserSelect :search.sync="search" :defaultValue="{ name: search[`joinname${index + 1}`], value: search[`joinid${index + 1}`] }"
                :title="'请选择协办人'"
                :name="`joinname${index + 1}`"
                :value="`joinid${index + 1}`"
                @changesearch="changesearch"
              />
            </a-form-item>
            <a-icon :class="['dynamic-delete-button', {'delete-button': horizontal}]" type="minus-circle-o" @click="() => remove(k, index + 1)"/>
          </a-col>
        </div>
      </a-col>
      <a-col :offset="4" >
        <a-form-item class="add" :wrapper-col="{ span: 24 }">
            <a-button type="primary" @click="add">添加协办</a-button>
        </a-form-item>
      </a-col>
    </a-row>
    
  </div>
</template>

<script>
import { Row, Col, Select, Form, Icon, Button, Divider } from "ant-design-vue";
import UserSelect from "./UserSelect";
export default {
  props: ["search","span","horizontal","count"],
  components: {
    AForm: Form,
    AIcon: Icon,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    UserSelect,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    ADivider: Divider,
  },
  data() {
    return {
      id: 0,
      showAssist: [],
    };
  },
  watch: {
    count(val) {
      if(val) {
        let keysArray = [];
        this.id = val;
        for(let i = 0; i<val; i++) {
          keysArray.push(i);
        }
        this.form.setFieldsValue({
          keys: keysArray,
        });
      }else{
        this.id = 0;
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  methods: {
    changesearch(name, value, id, username) {
      this.$emit("changesearch", name, value, id, username);
    },
    add() {
      const { form } = this;
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(this.id++);
      form.setFieldsValue({
        keys: nextKeys,
      });
    },
    remove(k, index) {
      const { form } = this;
      const keys = form.getFieldValue("keys");
      this.$emit( "changesearch", `joinname${index}`, `joinid${index}`, undefined, undefined);
      this.showAssist.push(k);
    },
  },
};
</script>
<style lang="less" scoped>
.joincontent {
  position: relative;
  z-index: 999;
  .ant-divider.ant-divider-horizontal.ant-divider-dashed {
    width: 50%;
    position: absolute;
    top: -12px;
    margin: 0;
  }
  .horizontal {
    margin-left: 26%;
  }
  .horizontal-person {
    position: relative;
    left: -12%;
  }
  .dynamic-delete-button {
    position: absolute;
    top: -10px !important;
    right: 0;
    cursor: pointer;
    font-size: 1.6em;
    color: #999;
    transition: all 0.3s;
  }
  .dynamic-delete-button.delete-button {
    position: absolute;
    top: 0 !important;
    right: 25%;
    transform: translateY(35%);
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
