<template>
  <div class="content">
    <div class="code" @click="showModal">
      <a-form :form="this.form">
        <a-form-item style="margin-bottom: 0;">
          <a-input
            :disabled="this.loading"
            v-decorator="[
              'code',
              { rules: [{ required: true, message: '请选择权力事项！' }] },
            ]"
            read-only
            placeholder="请选择权力事项"
          >
            <a-icon slot="addonAfter" v-if="!this.form.getFieldValue('code')" type="select" />
            <a-icon slot="suffix" v-else @click.stop="clear('code')" type="close-circle" theme="filled"/>
          </a-input>
        </a-form-item>
      </a-form>
    </div>

    <a-modal
      v-model="qlsxVisible"
      :destroyOnClose="true"
      title="权力事项选择"
      :width="800"
      :bodyStyle="{ height: '600px', padding: '0' }"
    >
      <a-form :form="this.qlsxform">
        <a-row style="padding-top: 20px">
          <a-col :span="24">
            <a-form-item
              label-align="right"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 20 }"
              label="事项名称"
            >
              <a-input v-decorator="['searchkey']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label-align="right"
              :label-col="{ span: 12 }"
              :wrapper-col="{ span: 12 }"
              label="事项类型"
            >
              <a-input v-decorator="['kind']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :label-col="{ span: 12 }"
              :wrapper-col="{ span: 12 }"
              label="主项编码"
            >
              <a-input v-decorator="['maincode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :label-col="{ span: 12 }"
              :wrapper-col="{ span: 12 }"
              label="子项编码"
            >
              <a-input v-decorator="['childcode']" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item class="button">
              <a-button
                @click="search({ pagenum: 1, pagesize: 10, needtotal: true, total: 0 })"
                >搜索</a-button
              >
              <a-button @click="handleReset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :span="24" class="radio">
          <a-col class="spin">
            <a-spin :spinning="this.isload"></a-spin>
          </a-col>
          <a-col class="radioItem" :span="22" :offset="1">
            <a-form-item v-if="this.qlsxOptions.length">
              <a-checkbox-group v-if="qlsxOptions" v-decorator="['code' , { initialValue: this.code }]">
                <a-row>
                  <a-col v-for="(item, index) in qlsxOptions" :key="index">
                    <a-checkbox :value="item" @change="onChange">
                      <a-tooltip :mouseEnterDelay="0.5">
                        <template slot="title">
                          {{ `${item.label} ` }}
                        </template>
                        {{ `${item.value}  (${item.label})` }}
                      </a-tooltip>
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <a-pagination
                showSizeChanger
                :current="this.pagination.pagenum"
                :total="this.pagination.total"
                :showTotal="(total) => `总共：${total}条`"
                @change="changepage"
                @showSizeChange="onShowSizeChange"
              />
            </a-form-item>
            <a-form-item class="empty" v-else-if="!this.isload">
              <Empty-data />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button @click="ok">确认</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import {
  Form,
  Checkbox,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Icon,
  Pagination,
  Spin,
  Tooltip,
} from "ant-design-vue";
import { cloneDeep, assign, toString, map, concat, remove } from "lodash";
import EmptyData from "@/framework/components/EmptyData";
import { showError } from "@/framework/utils";
import { qlsxsearch } from "@/person-shaoxing/api/assessment";
export default {
  props: {
    qlsxOptions: {
      //多选数据
      type: Array,
    },
    codes: {
      //权力事项选中该数组
      type: Array,
      default: ()=>{return []},
    },
    loading: {
      //加载状态
      type: Boolean,
      default: false,
    },
    type: {
      //确定按钮功能 skip代表跳转
      type: String,
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AButton: Button,
    AIcon: Icon,
    ARow: Row,
    ACol: Col,
    AModal: Modal,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    APagination: Pagination,
    EmptyData,
    ASpin: Spin,
    ATooltip: Tooltip,
  },
  data() {
    return {
      pagination: {
        pagenum: 1,
        pagesize: 10,
        total: 0,
        needtotal: true,
      },
      code:[],
      isload: false,
      qlsxVisible: false,
      form: this.$form.createForm(this, { name: "form" }),
      qlsxform: this.$form.createForm(this, { name: "qxsxform" }),
    };
  },
  watch: {
    codes(val) {
      this.handleCode(val);
      this.code = val;
      return val;
    },
    qlsxOptions(val) {
      //实现跳转后仍能自动选中checkbox
      if(val.length) {
        val.forEach((item)=>{
          this.code.forEach((items,index)=> {
            if(items.label===item.label&&items.value===item.value) {
              this.code[index] = item;
            }
          })
        });
        this.$nextTick(()=>{
          this.qlsxform.setFieldsValue({'code': this.code})
        })
      }
      return val;
    },
  },
  mounted() {
    if(this.$route.query.codes) {
      this.form.setFieldsValue({'code': toString(this.$route.query.codes)});
      this.$emit('update:codes', this.$route.query.codes);
    }
    this.qlsxVisible = false;
  },
  methods: {
    onChange(e) {
      if(e.target.checked) {
        this.code = concat(this.code, e.target.value);
      }else{
        remove(this.code,e.target.value);
      }
    },
    clear(name){
      if(!this.loading) {
        let obj = {};
        obj[name] = undefined;
        this.$emit('update:selected', []);
        this.$emit('update:codes', []);
        this.form.setFieldsValue(obj);
        this.code = [];
      }
    },
    showModal() {
      if(!this.loading) {
        this.qlsxVisible = true;
      }
    },
    handleCode(val) {
      let value = map(val,'value');
      this.form.setFieldsValue({'code': toString(value)});
    },
    handleReset() {
      this.qlsxform.resetFields();
    },
    ok() {
      this.qlsxform.validateFields((err, values) => {
        if (values.code.length && !err) {
          this.handleCode(values.code);
          this.$emit('update:codes', this.code);
          this.qlsxVisible = false;
          if(this.type) {
            this.$router.push({ name: "details", params: { 'active': 'issue', 'codes': this.code } });
          }
        }
      });
    },
    changepage(pagenum, pagesize) {
      assign(this.pagination, { pagesize, pagenum });
      this.search(this.pagination);
    },
    onShowSizeChange(current, pagesize) {
      assign(this.pagination, { pagesize, pagenum: 1 });
      this.search(this.pagination);
    },
    search(pagination) {
      this.isload = true;
      this.qlsxform.validateFields((err, values) => {
        if (!err) {
          assign(values, pagination);
          qlsxsearch(values)
            .then((res) => {
              this.isload = false;
              this.pagination = cloneDeep(res.result);
              this.pagination.needtotal = true;
              if (res.result.rows) {
                let options = [];
                res.result.rows.forEach((item) => {
                  let checkitem = {};
                  checkitem.label = item.quanliname;
                  checkitem.value = item.quanlicode;
                  options.push(checkitem);
                  this.$emit('update:qlsxOptions',options);
                });
              }
            })
            .catch((err) => {
              this.isload = false;
              showError(err);
            });
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  & .code {
    width: 100%;
    cursor: pointer;
  }
}
.ant-modal {
  & .ant-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    & .ant-modal-footer button {
      background-color: @primary-color;
      color: #ffffff;
    }
    & .ant-radio-group,.ant-checkbox-group{
      display: flex;
      flex-direction: column;
      max-height: 400px;
      overflow-y: scroll;
      overflow-x: hidden;
      & .ant-radio-wrapper,.ant-checkbox-wrapper  {
        align-items: center;
        display: flex;
        margin-bottom: 8px;
        height: 32px;
        transition: all 0.3s;
        & span {
          margin-bottom: 2px;
          display: inline-block;
          max-width: 704px;
          vertical-align: middle;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis;
          user-select: none;
        }
      }
      & .ant-radio-wrapper:hover,.ant-checkbox-wrapper:hover {
        background-color: @primary-1;
      }
    }
    & .radio.ant-row {
      height: 100%;
      position: relative;
      & .radioItem {
        height: 100%;
        & .ant-pagination {
          float: right;
          margin-top: 8px;
        }
      }
      & .spin {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -30%);
      }
      & .empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  & .ant-modal-footer {
    & button {
      background-color: @primary-color;
      color: #ffffff;
    }
  }
}
/deep/.ant-row.button {
  text-align: right;
  & button.ant-btn:first-child {
    color: #ffffff;
    margin-right: 4px;
    background-color: @primary-color !important;
  }
}
</style>
