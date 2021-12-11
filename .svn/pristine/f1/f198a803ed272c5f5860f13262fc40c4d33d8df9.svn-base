<template>
  <!-- 输入信息modal -->
  <div class="infoModal">
    <a-modal :visible="isShowInfo" :title="title" width="40vw" @cancel="Modalcancel" @ok="handleOk">
      <div v-if="title != '编辑项目详情分类'">
        <a-form :form="baseform">
          <a-row style="margin-top: 12px;">
            <a-form-item
              :label="title == '新增项目'?'项目名称：':'分类名称：' "
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                v-decorator="[
                                    'kindName',
                                    {rules: [{required: true, message:'请输入信息'}]}
                                ]"
              />
            </a-form-item>
          </a-row>
        </a-form>
      </div>
      <!--  项目详情分类  -->
      <div v-else>
        <a-form :form="baseform">
          <a-row>
            <a-form-item label="项目名称：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-input
                v-decorator="[
                                    'kindName',
                                    {rules: [{required: true, message:'请输入信息'}]}
                                ]"
              />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item label="项目分类：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-input :value="dataInfo.categoryname" disabled="disabled" />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item label="加/减项：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-select v-decorator="[ 'ifAdd' ]">
                <a-select-option value="0">加项</a-select-option>
                <a-select-option value="1">减项</a-select-option>
              </a-select>
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item label="是否统发：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-select v-decorator="[ 'ifAll' ]">
                <a-select-option value="0">统发</a-select-option>
                <a-select-option value="1">自发</a-select-option>
              </a-select>
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item label="添加标签：" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <span
                style="padding-right: 10px;"
                v-for="(item,index) in dataInfo.tags"
                :key="index"
              >{{item}}</span>
              <span style="margin-left: 15px;">添加</span>
            </a-form-item>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Modal, Form, Row, Input, Select } from "ant-design-vue";
export default {
  data() {
    return {
      baseform: this.$form.createForm(this),
      dataInfo: ""
    };
  },
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  created() {
    if (this.title == "编辑项目详情分类") {
      let _this = this;
      let res;
      //已有的项目
      if (!this.standardId.struct) {
        for (let i = 0; i < this.standardId.dataItem.length; i++) {
          for (
            let j = 0;
            j < this.standardId.dataItem[i].children.length;
            j++
          ) {
            if (
              this.standardId.dataItem[i].children[j].id == this.standardId.id
            ) {
              res = this.standardId.dataItem[i].children[j];
            }
          }
        }
        _this.dataInfo = res;
        setTimeout(() => {
          //项目名称
          _this.baseform.setFieldsValue({
            kindName: res.name
          });
          //加减项
          _this.baseform.setFieldsValue({
            ifAdd: res.issubitem == 0 ? "加项" : "减项"
          });
          //是否统发
          _this.baseform.setFieldsValue({
            ifAll: res.isdistribution == 0 ? "统发" : "自发"
          });
        }, 0);

        // request({
        //     url: 'person/wages/item/detail',
        //     method: 'get',
        //     params:{
        //         id:this.standardId
        //     }
        // }).then(function(data){

        //     _this.dataInfo = data.result
        //     setTimeout(()=>{
        //         //项目名称
        //         _this.baseform.setFieldsValue({
        //             kindName:data.result.name
        //         })
        //         //加减项
        //         _this.baseform.setFieldsValue({
        //             ifAdd:data.result.issubitem==0?'加项':'减项'
        //         })
        //         //是否统发
        //         _this.baseform.setFieldsValue({
        //             ifAll:data.result.isdistribution==0?'统发':'自发'
        //         })

        //     },0)
        // })
      } else {
        //新增的项目   数据库还无 对应id
        // _this.standardId

        _this.dataInfo = {
          categoryname: _this.standardId.struct.categoryname, //对应分类
          isdistribution: _this.standardId.struct.isdistribution,
          issubitem: _this.standardId.struct.issubitem, //加减项
          name: _this.standardId.struct.name, //新建的name
          orderby: _this.standardId.struct.orderby, //按顺序
          rule: [],
          tags: [],
          key: _this.standardId.struct.key, //唯一标识
          onlyItemKey: _this.standardId.mark
        };
        setTimeout(() => {
          //项目名称
          _this.baseform.setFieldsValue({
            kindName: _this.dataInfo.name
          });
          //加减项
          _this.baseform.setFieldsValue({
            ifAdd: _this.dataInfo.issubitem
          });
          //是否统发
          _this.baseform.setFieldsValue({
            ifAll: _this.dataInfo.isdistribution
          });
        }, 0);
      }
    }
  },
  props: ["isShowInfo", "title", "standardId"],
  methods: {
    Modalcancel() {
      this.$emit("closeModal", "closeEdit");
    },
    handleOk() {
      //确定
      let that = this;
      this.baseform.validateFields((err, values) => {
        if (!err) {
          let obj = {};
          if (that.standardId != "nodetail") {
            //已有的项目
            if (!that.standardId.struct) {
              let express = "sendDetailItem";
              that.$emit("closeModal", { values, express });
            } else {
              let express = "sendDetailItem_NEW";
              that.dataInfo.name = values.kindName; //项目名称
              that.dataInfo.issubitem = values.ifAdd; //是否加减项
              that.dataInfo.isdistribution = values.ifAll; //是否统发 自发
              let newValues = that.dataInfo;

              that.$emit("closeModal", { newValues, express });
            }
          } else {
            obj.val = values.kindName;
            obj.kind = that.title;
            that.$emit("closeModal", obj); //根据分类传给 workreform组件
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped >
</style>