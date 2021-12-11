<template>
  <div>
    <a-form-item class="org" :label="property.showName?property.name:''">
      <a-input
        :style="property.showName?'width:340px':'width:340px;margin-top:29px;'"
        class="hand"
        @click="property.editable?orgvisible=true:orgvisible=false"
        placeholder="请选择机构组织"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue:org
          }
        ]"
      >
        <a-icon
          @click="property.editable?orgvisible=true:orgvisible=false"
          slot="suffix"
          type="fork"
          class="orgIcon"
        />
      </a-input>
      <a-modal
        title="单位名称选择"
        :visible="orgvisible"
        @cancel="orgvisible=false"
        width="450px"
        :bodyStyle="tStyle"
        :footer="null"
        :maskStyle="{backgroundColor:'rgba(0,0,0,0.05)'}"
      >
        <new-org mode="org" @finish="orgOk" :rootSelectable="true"></new-org>
      </a-modal>
    </a-form-item>
  </div>
</template>

<script>
import NewOrg from "@/person/components/OrgUserSelect";
import { Form, Input, Modal, Icon } from "ant-design-vue";
export default {
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    AModal: Modal,
    AIcon: Icon,
    NewOrg
  },
  props: {
    bindform: {
      type: Object,
      required: true
    },
    property: {
      type: Object,
      required: true
    },
    pcode: {
      type: String
    },
    relateControls: {
      type: Array
    }
  },
  data() {
    return {
      //机构选择
      org: "",
      orgvisible: false,
      tStyle: {
        padding: "5px 3px 5px 10px",
        width: "100%",
        height: "550px",
        color: "black"
      }
    };
  },
  computed: {
    data() {
      return this.$store.getters.formData[this.pcode];
    }
  },
  watch: {
    data(newVal) {
      this.org = this.data[this.property.code]
        ? this.data[this.property.code].name
        : "";
      if (this.data[this.property.code]) {
        this.$emit("getData", {
          code: this.property.code,
          item: this.data[this.property.code]
        });
      }
    }
  },
  created() {
    if (
      this.$store.getters.formData[this.pcode] &&
      this.$store.getters.formData[this.pcode][this.property.code]
    ) {
      this.org = this.$store.getters.formData[this.pcode][
        this.property.code
      ].name;
      this.relateControl(
        this.$store.getters.formData[this.pcode][this.property.code]
      );
    }
  },
  methods: {
    //确定选择的机构
    orgOk(type, list) {
      if (type == "ok" && list.length > 0) {
        let org = list[0];
        this.orgvisible = false;
        this.org = org.name;
        let obj = {};
        obj.name = org.name;
        obj._id = org._id;
        this.$emit("getData", { code: this.property.code, item: obj });
        this.relateControl(obj);
      }else if (type == "cancel") {
        this.orgvisible = false;
      }
    },
    //关联控件变化
    relateControl(val) {
      let formData = {};
      let flag = false;
      this.relateControls.forEach(item => {
        if (item.relate == this.property.code) {
          flag = true;
          if (item.pcode) {
            if (this.$store.getters.formData[item.pcode]) {
              this.$set(
                this.$store.getters.formData[item.pcode],
                item.code,
                val
              );
            } else {
              let obj = {};
              obj[item.code] = val;
              this.$store.getters.formData[item.pcode] = obj;
            }
          } else {
            this.$store.getters.formData[item.code] = val;
          }
        }
      });
      if (flag) {
        this.bindform.resetFields();
        formData = Object.assign({}, this.$store.getters.formData);
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: formData
        });
      }
    }
  }
};
</script>