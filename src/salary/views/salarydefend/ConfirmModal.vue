<template>
  <!-- confirm modal -->
  <div class="confirmModal">
    <a-modal :visible="isShowConfirm" title="提示" width="40vw" @cancel="Modalcancel" @ok="handleOk">
      <div class="confirmText">请确认是否删除此分类全部内容</div>
    </a-modal>
  </div>
</template>
<script>
import {Modal} from 'ant-design-vue';
export default {
  props: ["isShowConfirm"],
  components:{
    AModal:Modal
  },
  methods: {
    Modalcancel() {
      this.$emit("closeModal", 0);
    },
    handleOk() {
      //确定
      this.$emit("closeModal", 1);
    }
  }
};
</script>
<style lang="less" >
/* modal 关闭 */
.confirmText {
  width: 100%;
  text-align: center;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}
</style>