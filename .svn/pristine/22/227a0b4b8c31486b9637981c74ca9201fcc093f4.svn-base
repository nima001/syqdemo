<template>
  <div class="workflow">
    <div class="discriminate">
      <a-button :disabled="!property.editable" shape="circle" icon="copy" @click="opendiscriminate"></a-button>
    </div>
    <a-form-item :label="property.showName?property.name:''">
      <a-row class="resume" :gutter="20" v-for="(item,idx) in data" :key="item._id">
        <resume-child
          :property="property"
          :child="child"
          :index="idx"
          :item="item"
          :len="data.length"
          :starttimes="endTimes"
          @changeHandle="changeHandle"
          @changeTimesArr="changeTimesArr"
          @isAll="isAll"
        ></resume-child>
        <a-col :span="4" class="resume-btn" v-if="property.editable">
          <a-button type="primary" shape="circle" icon="plus" @click="add(idx)"></a-button>
          <a-button type="danger" shape="circle" icon="close" @click="del(idx)"></a-button>
        </a-col>
      </a-row>
      <a-input
        type="hidden"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请填写${property.name}!`}],
            initialValue: resume
          }
        ]"
      ></a-input>
    </a-form-item>
    <stamp
      :property="property"
      @imgUrl="getStamp"
      v-if="property.signcomponent.signcode && property.signcomponent.editable"
    ></stamp>
    <a-form-item class="stampNotice" v-if="!imgUrl && property.signcomponent.signcode">
      <a-input
        type="hidden"
        v-decorator="[
          `${property.signcomponent.code}`,
          {
            rules: [{required: property.signcomponent.require, message: `请选择签章!`}],
            initialValue: stamp
          }
        ]"
      ></a-input>
    </a-form-item>
    <!-- 智能识别弹框 -->
    <a-modal
      v-model="visible"
      title="智能填写"
      @ok="discriminate"
      :bodyStyle="{'max-height':'500px','overflow':'auto'}"
    >
      <a-textarea v-model="resumeinfo" :placeholder="placeholderStr" :rows="7" />
    </a-modal>
    <div class="seal" v-if="imgUrl">
      <img :src="imgUrl" />
    </div>
  </div>
</template>
<script>
import Stamp from "./stampComponent/Stamp";
import { getStampInfo } from "@/workflow/api/stamplist";
import ResumeChild from "./ResumeChild";
import moment from "moment";
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/workflow.css";
import { Form, Row, Col, Button, Input, Modal } from "ant-design-vue";
import { showError, guid } from "@/framework/utils/index";
export default {
  name: "Resume",
  props: {
    property: {
      type: Object,
      required: true
    },
    bindform: {
      type: Object,
      required: true
    }
  },
  components: {
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AInput: Input,
    AModal: Modal,
    ATextarea: Input.TextArea,
    ResumeChild,
    Stamp
  },
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      code: this.property["code"],
      formData: this.$store.getters.formData,
      child: {
        starttime: this.property["code"] + "starttime",
        endtime: this.property["code"] + "endtime",
        content: this.property["code"] + "content"
      },
      endTimes: [],
      imgUrl: null,
      stamp: null,
      resume: null,
      //智能识别
      visible: false,
      resumeinfo: "",
      placeholderStr: ""
    };
  },
  computed: {
    data: {
      get() {
        return this.$store.getters.formData[this.code]
          ? this.$store.getters.formData[this.code]
          : [{ _id: guid() }];
      },
      set(newval) {}
    }
  },
  watch: {
    data: {
      handler(newval) {
        if (newval) {
          if (!(this.data === this.$store.getters.formData[this.code])) {
            this.$set(this.$store.getters.formData, this.code, this.data);
          }
          this.endTimes = [];
          if (this.property.continuousTime) {
            newval.forEach((item, idx) => {
              this.endTimes.push(item[this.child.endtime]);
            });
          }
          let flag = true;
          newval.forEach((item, index) => {
            //判断自动填充带来的数据有没有_id
            if (!item._id) {
              this.$set(item, "_id", guid());
            }
            if (this.property.require) {
              if (index == this.data.length - 1) {
                if (!item[this.child.starttime] || !item[this.child.content]) {
                  flag = false;
                  this.resume = null;
                }
              } else {
                if (
                  !item[this.child.starttime] ||
                  !item[this.child.content] ||
                  !item[this.child.endtime]
                ) {
                  flag = false;
                  this.resume = null;
                }
              }
            }
          });
          if (flag) {
            this.resume = "init";
            this.bindform.setFieldsValue({
              [this.code]:1
            })
          } else {
            this.bindform.resetFields([this.code]);
          }
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.property.childs.length === 4) {
      this.$set(this.child, "jobtitle", this.property["code"] + "jobtitle");
      this.placeholderStr = `粘贴简历信息，可自动识别并填写。如：[2000.01 - 2020.01]  xx任职信息  ||xx职务 
注意：起止日期必须用[ ]括起来，内容不需要。职务写在末尾并用 || 隔开。`;
    } else {
      this.placeholderStr = `粘贴简历信息，可自动识别并填写。如：[2000.01 - 2020.01]  xx任职信息 
注意：起止日期必须用[ ]括起来，内容不需要`;
    }
    if (this.formData[this.code] && this.formData[this.code].length) {
      //判断简历是否需要校验
      if (this.property.require) {
        let flag = true;
        this.data.forEach((item, index) => {
          if (index == this.data.length - 1) {
            if (!item[this.child.starttime] || !item[this.child.content]) {
              flag = false;
              this.resume = null;
            }
          } else {
            if (
              !item[this.child.starttime] ||
              !item[this.child.content] ||
              !item[this.child.endtime]
            ) {
              flag = false;
              this.resume = null;
            }
          }
        });
        if (flag) {
          this.resume = "init";
           this.bindform.setFieldsValue({
              [this.code]:1
            })
        } else {
          this.bindform.resetFields([this.code]);
        }
      }
    }
    if (this.formData[this.property.signcomponent.code]) {
      //获取签章图片
      getStampInfo(this.formData[this.property.signcomponent.code])
        .then(res => {
          if (res.code == "success") {
            this.imgUrl =
              this.uiConfigs["api.url"] +
              "/file/v1/download" +
              "?uri=" +
              encodeURIComponent(res.result.pictureurl);
          }
        })
        .catch(err => {
          showError(err);
        });
    }
  },
  methods: {
    moment,
    add(idx) {
      if (this.data[idx][this.child.endtime] !== moment().format("YYYY-MM")) {
        this.data.splice(idx + 1, 0, { _id: guid() });
        this.$set(this.$store.getters.formData, this.code, this.data);
        if (this.property.continuousTime) {
          this.endTimes.splice(idx + 1, 0, this.data[idx][this.child.endtime]);
        }
        this.bindform.resetFields([this.code]);
      } else {
        this.$message.warning("最后一条简历时间已经到今天，不能再添加了！");
      }
    },
    del(idx) {
      if (this.data.length > 1) {
        this.data.splice(idx, 1);
        if (this.property.continuousTime) {
          this.endTimes.splice(idx, 1);
        }
        if (this.property.require) {
          let flag = true;
          this.data.forEach((item, index) => {
            if (index == this.data.length - 1) {
              if (!item[this.child.starttime] || !item[this.child.content]) {
                flag = false;
              }
            } else {
              if (
                !item[this.child.starttime] ||
                !item[this.child.content] ||
                !item[this.child.endtime]
              ) {
                flag = false;
              }
            }
          });
          if (flag) {
             this.bindform.setFieldsValue({
              [this.code]:1
            })
          } else {
            this.bindform.resetFields([this.code]);
          }
        }
      }
    },
    //表单传值
    changeHandle(val) {
      this.data[val.idx] = val.obj;
      this.bindform.setFieldsValue({
              [this.code]:1
            })
    },
    //更新结束时间数组
    changeTimesArr(val) {
      this.$set(this.endTimes, val.idx, val.data);
    },
    //获取签章
    getStamp(img) {
      if (img) {
        this.imgUrl = img;
        this.stamp = img;
      }
    },
    isAll(val) {
      if (val || val === 0) {
        this.init = "init";
      } else {
        this.resume = null;
        this.bindform.resetFields([this.code]);
      }
    },
    //打开自动识别弹框
    opendiscriminate() {
      if (this.property.editable) {
        this.resumeinfo = "";
        this.visible = true;
      }
    },
    discriminate() {
      if (this.resumeinfo) {
        if (this.resumeinfo.indexOf("[") > -1) {
          let regx = /^((\d{4})\.(\d{2}))-((\d{4})\.(\d{2}))?\]/;
          //拆分简历的条数
          let res = this.resumeinfo.split("[");
          for (let i = 0; i < res.length; i++) {
            if (res[i]) {
              let flag = regx.test(res[i]);
              if (!flag) {
                if (res[i - 1]) {
                  res[i - 1] = `${res[i - 1]}[${res[i]}`;
                  res.splice(i, 1);
                  i--;
                } else {
                  res.splice(i, 1);
                  i--;
                }
              }
            } else {
              res.splice(i, 1);
              i--;
            }
          }
          if (res && res.length) {
            this.$store.getters.formData[this.code] = [];
            for (let i = 0; i < res.length; i++) {
              let temp = res[i].match(regx);
              let obj = {};
              if (temp) {
                //拆分时间
                let time = temp[0].slice(0, temp[0].length - 1);
                obj[this.child.starttime] = time
                  .split("-")[0]
                  .split(".")
                  .join("-");
                obj[this.child.endtime] = time
                  .split("-")[1]
                  .split(".")
                  .join("-");
                //拆分内容
                const index = res[i].indexOf("]");
                let contentArr = res[i]
                  .substr(index + 1, res[i].length - 1)
                  .trim()
                  .split("||");
                obj[this.child.content] = contentArr[0];
                if (this.property.childs.length === 4) {
                  obj[this.child.jobtitle] = contentArr[1];
                }
                obj._id = guid();
                this.data.push(obj);
              }
            }
            this.visible = false;
          } else {
            this.$message.error("文本格式有误，请检查后再识别！");
          }
        } else {
          this.$message.error("文本格式有误，请检查后再识别！");
        }
      } else {
        this.$message.warning("文本为空，不予识别！");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.discriminate {
  position: absolute;
  right: 0;
  cursor: pointer;
  z-index: 10;
}
.resume {
  margin-bottom: 15px;
}
.resume-btn {
  padding-left: 0 !important;
  .ant-btn-primary {
    margin-right: 10px;
  }
  .ant-btn-circle {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}
</style>