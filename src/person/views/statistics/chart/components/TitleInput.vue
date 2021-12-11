<template>
  <div>
    <a-input
      :read-only="true"
      :value="title"
      @click="editTitle({
          value: title,
          placeholder: field,
          callback: (value) => (title = value),
        })
      "
      style="cursor: pointer"
    />
    <!-- 图表标题 -->
    <a-modal v-model="titleModel.show" title="标题" @ok="handleOk">
        <a-input v-model="titleModel.value" allowClear ref="titleInput"/>
        <div style="margin-top: 10px" v-if="titleModel.placeholder">
            <tags :value="titleModel.placeholder" text="name" :deleteable="false" @click="onTagChecked"/>
        </div>
    </a-modal>
  </div>
</template>

<script>
import { Input, Modal } from "ant-design-vue";
import Tags from '@/framework/components/Tags';
import PropMixin from "@/framework/components/SettingTree/PropMixin";

export default {
  mixins: [PropMixin],
  inject: ['fields'],
  components: {
    Tags,
    AInput: Input,
    AModal: Modal,
  },
  data() {
    return {
      titleModel: {
        show: false,
        value: undefined,
        placeholder: undefined,
      },
    };
  },
  computed: {
    field() {
      if(this.fields) {
        return this.fields.value&&this.fields.value.array;
      }
    },
    title: {
      get() {
        return this.propValue;
      },
      set(val) {
        this.updateValue(val);
        return val;
      }
    },
  },
  methods: {
    editTitle({ value, placeholder, callback }) {
      this.titleModel = { show: true, value, placeholder, callback };
      this.$nextTick(() => this.$refs.titleInput.focus())
    },
    handleOk() {
      this.titleModel.show = false;
      this.titleModel.callback(this.titleModel.value);
    },
    updateValue(val) {
      this.propValue = val;
    },
    onTagChecked(field){
      let dom = this.$refs.titleInput.$el.firstChild;
      let start = dom.selectionStart, end = dom.selectionEnd;
      let text = this.titleModel.value || '';
      this.titleModel.value = text.substr(0, start) + '${' + field.code + '}' + text.substr(end);
      this.$nextTick(() => {
        dom.setSelectionRange(start, start + field.code.length + 3);
        dom.focus();
      })
    },
  }
};
</script>
<style lang="less" scoped></style>
