<template>
  <div>
    <a-form-item 
      label="机构选择" 
      :required="true"
      :validateStatus="validateStatus"
      :label-col="itemLayout.labelCol" 
      :wrapper-col="itemLayout.wrapperCol"
      >
      <a-input
        :value="propValue && propValue.name"
        :read-only="true"
        @click="showOrgSelect"
        @change="onNameChange($event.target.value)"
        >
        <a-icon slot="addonAfter" type="select" @click="showOrgSelect"/>
      </a-input>
    </a-form-item>
    <!-- 机构选择弹框 -->
    <div class="modal">
      <a-modal
        :footer="null"
        v-model="orgvisible"
        :width="500"
        title="选择组织"
        :bodyStyle="{ height: '600px', padding: '0'}"
      >
        <org-user-select mode="org" 
          @finish="orgOk" 
          :orgFilter="orgFilter"
        />
      </a-modal>
    </div>
  </div>
</template>

<script>
import { Input, Icon, Form, Modal } from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import set from 'lodash/set';
export default {
  props: {
    itemParams: {
      type: Object
    },
    itemLayout: {
      type: Object
    }
  },
  components: { AForm: Form, AFormItem: Form.Item, AIcon: Icon, AInput: Input, AModal: Modal, OrgUserSelect },
  data() {
    return {
      orgvisible: false,
      propValue: undefined,
      validateStatus: undefined,
      key: 'org',
      orgFilter: {
        //  orgtype != 3 不可选
        orgtype: 1
      }
    };
  },
  watch: {},
  computed: {
  },
  created() {
    if (this.itemParams[this.key]) {
      this.propValue = this.itemParams[this.key]
    }
  },
  mounted() {},
  methods: {
    validateField(obj){
      return new Promise((resolve, reject) => {
        this.validate((error) => {
          if(error){
            reject(error);
          }else{
            set(obj, this.key, this.propValue === undefined ? null : this.propValue);
            resolve();
          }
        })
      });
    },
    validate(callback){
      let status = undefined, error;
      // if(this.property.require && !this.propValue){
      if(!this.propValue){
        status = 'error';
        error = `请填写机构选择`;
      }else{
        status = 'success';
      }
      this.validateStatus = status;
      if(callback){
        callback(error);
      }
    },
    onNameChange(value){
      if(!value){
        this.propValue = undefined;
      }
    },
    showOrgSelect() {
      this.orgvisible = true;
    },
    orgOk(type, list) {
      this.orgvisible = false;
      if (type == "ok" && list.length > 0) {
        let {_id, name} = list[0];
        this.propValue = {_id, name}
      }
    }
  },
};
</script>
<style lang="less" scoped>
</style>