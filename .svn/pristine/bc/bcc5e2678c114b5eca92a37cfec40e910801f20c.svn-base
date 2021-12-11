<template>
  <div>
    <a-form-item class="user" :label="property.showName?property.name:''">
      <a-input
        :style="property.showName?'width:130px':'width:130px;margin-top:29px;'"
        @click="property.editable?uservisible=true:uservisible=false"
        placeholder="请选择人员"
        :disabled="property.editable?false:true"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请输入${property.name}!`}],
            initialValue:user
          }
        ]"
      >
        <a-icon
          slot="suffix"
          type="user"
          class="userIcon"
          @click="property.editable?uservisible=true:uservisible=false"
        />
      </a-input>
      <a-modal
        title="人员选择"
        :visible="uservisible"
        @cancel="uservisible=false"
        :bodyStyle="tstyle"
        width="450px"
        class="userModal hand"
        :footer="null"
        :maskStyle="{backgroundColor:'rgba(0,0,0,0.05)'}"
      >
        <new-user 
          mode="user" 
          @finish="submitUser" 
          :showDept="true"
          :userFilter="property.userFilter ? JSON.parse(property.userFilter) : {}"
          >
        </new-user>
      </a-modal>
    </a-form-item>
  </div>
</template>

<script>
import NewUser from "@/person/components/OrgUserSelect";
import { Form, Input, Icon, Modal } from "ant-design-vue";
export default {
  components: {
    AFormItem: Form.Item,
    AInput: Input,
    AIcon: Icon,
    AModal: Modal,
    NewUser
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
      //人员选择
      user: "",
      uservisible: false,
      tstyle: { padding: " 10px  3px 5px 10px", height: "550px" }
    };
  },
  computed: {
    data() {
      return this.$store.getters.formData[this.pcode];
    }
  },
  watch: {
    data(newVal) {
      this.user = this.data[this.property.code]
        ? this.data[this.property.code].username
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
      this.user = this.$store.getters.formData[this.pcode][
        this.property.code
      ].username;
      this.relateControl(
        this.$store.getters.formData[this.pcode][this.property.code]
      );
    }
  },
  methods: {
    //确定人员
    submitUser(type, list) {
      if (type == "ok" && list.length > 0) {
        let user = list[0];
        let obj = {};
        obj.username = user.username;
        obj._id = user._id;
        this.uservisible = false;
        this.user = user.username;
        this.$emit("getData", { code: this.property.code, item: obj });
        this.relateControl(obj);
      } else if (type == "cancel") {
        this.uservisible = false;
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
<style lang="less" scoped>
</style>