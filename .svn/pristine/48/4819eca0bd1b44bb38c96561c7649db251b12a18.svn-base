<template>
  <vue-editor :id='randomId'  v-model="textData" :editorToolbar="customToolbar" @text-change="changeHandle"></vue-editor>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    value: {
      type: String,
      required: true,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      randomId: 'editor' + new Date().getTime(),
      textData: this.value,
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ align: [] }],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        ["clean"]
      ],
      titleConfig: [
        { Choice: ".ql-bold", title: "加粗" },
        { Choice: ".ql-italic", title: "斜体" },
        { Choice: ".ql-underline", title: "下划线" },
        { Choice: ".ql-strike", title: "删除线" },
        { Choice: ".ql-blockquote", title: "块引用" },
        { Choice: ".ql-code-block", title: "插入代码段" },
        { Choice: '.ql-list[value="ordered"]', title: "编号列表" },
        { Choice: '.ql-list[value="bullet"]', title: "项目列表" },
        { Choice: ".ql-direction", title: "文本方向" },
        { Choice: '.ql-header[value="1"]', title: "一级标题" },
        { Choice: '.ql-header[value="2"]', title: "二级标题" },
        { Choice: ".ql-align", title: "对齐方式" },
        { Choice: ".ql-color", title: "字体颜色" },
        { Choice: ".ql-background", title: "背景颜色" },
        { Choice: ".ql-clean", title: "清除字体格式" },
        { Choice: '.ql-script[value="sub"]', title: "下标" },
        { Choice: '.ql-script[value="super"]', title: "上标" },
        { Choice: '.ql-indent[value="-1"]', title: "向左缩进" },
        { Choice: '.ql-indent[value="+1"]', title: "向右缩进" },
        { Choice: ".ql-header .ql-picker-label", title: "标题大小" }
      ]
    };
  },
  components: {
    VueEditor
  },
  mounted() {
    this.autoTip();
  },
  watch: {
    value(v) {
      this.textData = v;
    }
  },
  methods: {
    changeHandle() {
      this.$emit("input", this.textData);
    },
    autoTip() {
      for (let item of this.titleConfig) {
        let dom = document.getElementById(this.randomId).previousElementSibling;
        let tip = dom.querySelector(item.Choice);
        if (!tip) continue;
        tip.setAttribute("title", item.title);
      }
    }
  }
};
</script>
