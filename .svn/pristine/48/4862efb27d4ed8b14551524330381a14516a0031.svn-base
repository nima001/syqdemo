<template>
  <div class="workflow">
    <a-form-item :label="property.showName?property.name:''" :require="property.require">
      <div class="rewardsWrap">
        <a-table
          :columns="columns"
          :dataSource="data"
          bordered
          :pagination="false"
          :rowKey="record=>record._id"
        >
          <template slot="index" slot-scope="text,record,index">{{index+1}}</template>
          <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" @click="edit(record.key)" style="color:blue;margin-right:5px;">编辑</a>
            <a
              href="javascript:;"
              @click="onDelete(record._id)"
              style="color:red;margin-left:5px;"
            >删除</a>
          </template>
        </a-table>
        <div class="addRewards">
          <a-button type="primary" icon="plus" v-if="property.editable" @click="openReward">添加一条</a-button>
        </div>
      </div>
      <a-input
        type="hidden"
        v-decorator="[
          `${property.code}`,
          {
            rules: [{required: property.require, message: `请填写${property.name}!`}],
            initialValue: reward
          }
        ]"
      ></a-input>
      <!-- 添加奖惩 -->
      <a-modal title="添加奖惩" v-model="visible" :footer="null" width="600px">
        <a-form :form="form" @submit="add">
          <a-form-item label="受奖励/惩罚的时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
            <a-date-picker
              @change="changeDate"
              :getCalendarContainer="triggerNode => triggerNode.parentNode"
              v-decorator="[
          code+'date',
          {rules: [{ required: true, message: '请选择时间！' }],
          initialValue: formdata.date}
        ]"
            ></a-date-picker>
          </a-form-item>
          <a-form-item label="受奖励/惩罚的地点" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
            <a-input
              v-decorator="[
          code+'place',
          {rules: [{ required: true, message: '请填写地点！' }],
          initialValue: formdata.place}
        ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="受奖励/惩罚的内容" :label-col="{ span: 7}" :wrapper-col="{ span: 15 }">
            <a-textarea
              :rows="4"
              v-decorator="[
          code+'content',
          {rules: [{ required: true, message: '请填写内容！' }],
          initialValue: formdata.content}
        ]"
            ></a-textarea>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 6, offset: 18 }">
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
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
    <div class="seal" v-if="imgUrl">
      <img :src="imgUrl" />
    </div>
  </div>
</template>
<script>
import Stamp from "./stampComponent/Stamp";
import { getStampInfo } from "@/workflow/api/stamplist";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { showError, guid } from "@/framework/utils/index";
import moment from "moment";
import "@/workflow/style/workflow.css";
import {
  Form,
  Table,
  Icon,
  Input,
  Modal,
  DatePicker,
  Button
} from "ant-design-vue";
export default {
  name: "Rewards",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      data: [],
      columns: [],
      visible: false,
      code: this.property["code"],
      formData: this.$store.getters.formData,
      form: this.$form.createForm(this),
      formdata: {
        date: undefined,
        place: "",
        content: ""
      },
      imgUrl: null,
      stamp: null,
      type: true,
      curIndex: null
    };
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ATable: Table,
    AIcon: Icon,
    AInput: Input,
    ATextarea: Input.TextArea,
    AModal: Modal,
    ADatePicker: DatePicker,
    AButton: Button,
    Stamp
  },
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
  computed: {
    reward() {
      return this.data.length?this.data.length:'';
    },
    tabledata() {
      return this.$store.getters.formData[this.property.code];
    }
  },
  watch: {
    tabledata(newVal) {
      if (newVal && newVal.length) {
        newVal.forEach((item, index) => {
          item.key = index;
          if (!item._id) {
            this.$set(item, "_id", guid());
          }
          for (var a in item) {
            if (a == this.property.code + "date") {
              this.$set(item, a, item[a].substr(0, 10));
            }
          }
        });
        this.data = newVal;
      }
    }
  },
  created() {
    this.columns = [
      {
        title: "序号",
        key: "index",
        dataIndex: "index",
        width: 60,
        align: "center",
        scopedSlots: { customRender: "index" }
      }
    ];
    this.property.childs.forEach(item => {
      this.columns.push({
        title: item.name,
        dataIndex: item.code,
        key: item.code
      });
    });
    if (this.property.editable) {
      this.columns.push({
        title: "操作",
        dataIndex: "operation",
        width: 100,
        align: "center",
        scopedSlots: { customRender: "operation" }
      });
    }
    if (this.formData[this.code]) {
      this.formData[this.code].forEach((item, index) => {
        if (!item._id) {
          this.$set(item, "_id", guid());
        }
        item.key = index;
        for (var a in item) {
          if (a == this.property.code + "date") {
            this.$set(item, a, item[a].substr(0, 10));
          }
        }
      });
      this.data = this.formData[this.code];
    } else {
      if (!this.property.require) {
        this.formData[this.code] = null;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.formData
        });
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
    onDelete(id) {
      if (this.property.editable) {
        this.data = this.data.filter(item => item._id !== id);
        this.$store.getters.formData[this.code] = this.data.length?this.data:undefined;
        this.$store.commit({
          type: "SET_FORM_DATA",
          data: this.$store.getters.formData
        });
      }
    },
    changeDate(date, dateString) {
      this.formdata.date = dateString;
    },
    openReward() {
      this.type = true;
      this.visible = true;
    },
    //编辑
    edit(key) {
      if (this.property.editable) {
        this.type = false;
        this.visible = true;
        for (var a in this.data[key]) {
          if (a == this.property.code + "date") {
            this.formdata.date = this.moment(this.data[key][a], "YYYY-MM-DD");
          } else if (a == this.property.code + "place") {
            this.formdata.place = this.data[key][a];
          } else if (a == this.property.code + "content") {
            this.formdata.content = this.data[key][a];
          }
        }
        this.curIndex = key;
      }
    },
    add(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = false;
          values[this.code + "date"] = this.moment(this.formdata.date).format(
            "YYYY-MM-DD"
          );
          if (this.type) {
            values._id = guid();
            this.data.push(values);
            this.$message.success("添加成功！");
          } else {
            values._id = this.data[this.curIndex]._id;
            this.data[this.curIndex] = values;
            this.$message.success("修改成功！");
          }
          this.$set(this.$store.getters.formData, this.code, this.data);
          this.formdata = {
            date: undefined,
            place: "",
            content: ""
          };
          this.form.resetFields();
          this.data.forEach((item, index) => {
            item.key = index;
          });
        }
      });
    },
    //获取签章
    getStamp(img) {
      if (img) {
        this.imgUrl = img;
        this.stamp = img;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.rewardsWrap {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  /deep/.ant-table-thead > tr > th {
    white-space: nowrap;
  }
}
.addRewards {
  text-align: center;
  button {
    margin: 10px auto;
  }
}
</style>

