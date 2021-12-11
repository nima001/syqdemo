<template>
  <div>
    <div @click="showModal" @mouseover.prevent="mouseover" @mouseleave.prevent="mouseleave">
      <a-input read-only v-model="this.orgname" :disabled="this.loading" placeholder="请选择相关单位">
        <a-icon slot="suffix" @click.stop="clear" v-show="this.orgname&&this.showclear" type="close-circle" theme="filled" style="color: rgba(0, 0, 0, 0.35)"/>
        <a-icon slot="addonAfter" type="select" :class="{ disabled: this.loading }"/>
      </a-input>
    </div>
    <a-modal
      v-model="orgVisible"
      :destroyOnClose="true"
      title="选择机构"
      :width="500"
      :bodyStyle="{ height: '600px', padding: '0' }"
      :footer="null"
    >
      <org-user-select mode="org" :selected.sync="selected" :rootSelectable="true" @finish="selectOrg" />
    </a-modal>
  </div>
</template>

<script>
import { Modal, Input, Icon } from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
export default {
  props: {
    district: {
      //所选地区名
      type: String,
    },
    orgid: {
      //所选地区id
      type: String,
    },
    loading: {
      //加载状态
      type: Boolean,
      default: false,
    }
  },
  components: {
    AIcon: Icon,
    AInput: Input,
    AModal: Modal,
    OrgUserSelect,
  },
  data() {
    return {
      selected: [{}],
      showclear: false,
      orgname: undefined,
      orgVisible: false,
    };
  },
  watch: {
    district(val) {
      this.orgname = val;
      this.selected[0].name = val;
      return val;
    },
    orgid(val) {
      this.selected[0]._id = val;
      return val;
    }
  },
  mounted() {
    this.orgVisible = false;
  },
  methods: {
    mouseover() {
      this.showclear = true;
    },
    mouseleave() {
      this.showclear = false;
    },
    showModal() {
      if(!this.loading) {
        this.orgVisible = true
      }
    },
    clear() {
      if(!this.loading) {
        this.orgname = undefined;
        this.$emit("update:district", undefined);
        this.$emit("update:orgid", undefined);
      }
    },
    //确定选择的机构
    selectOrg(type, list) {
      this.orgVisible = false;
      if (type == "ok" && list.length) {
        let org = list[0];
        this.orgname = org.name;
        this.$emit("update:orgid", org._id);
        this.$emit("update:district", org.name);
      }
    },
  },
};
</script>
<style scoped lang="less">
  .anticon-select.disabled{
    color: rgba(0, 0, 0, 0.35);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    cursor: not-allowed;
  }
</style>
