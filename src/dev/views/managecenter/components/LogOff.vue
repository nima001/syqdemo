<template>
  <a-modal
    title="注销应用"
    :visible="true"
    :confirm-loading="logoutLoading"
    @ok="ok"
    @cancel="cancel"
    width="600px"
    okText="确认注销"
  >
    <div class="title">注销操作不可逆，请谨慎操作</div>
  </a-modal>
</template>
<script>
import { Modal } from "ant-design-vue";
import { logout } from "@/dev/api/app";
import { showError } from "@/framework/utils";
export default {
  components: {
    AModal: Modal
  },
  props: {
    value: {
      type: Boolean
    },
    record: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      logoutLoading: false
    };
  },
  created() {},
  methods: {
    ok() {
      this.logoutLoading = true;
      logout(this.record.id)
        .then(res => {
          this.$message.success("注销成功!");
          this.$emit("callBack", { type: "ok" });
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.logoutLoading = false;
        });
    },
    cancel() {
      this.$emit("callBack", { type: "cancel" });
    }
  }
};
</script>
<style lang='less' scoped>
.title{
    font-size: 16px;
    text-align: center;
}
</style>