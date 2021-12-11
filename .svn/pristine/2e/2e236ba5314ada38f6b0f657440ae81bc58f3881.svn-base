<template>
  <div>
    <a-modal
      :title="title"
      :visible="showforward||showjointly"
      :destroyOnClose="true"
      class="forwardmodal"
      @cancel="forwardCancel()">
        <div class="spin" v-if="this.spinning">
          <a-spin/>
        </div>
        <div v-if="showforward" class="forward">
          <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }" :form="forwardForm">
            <a-form-item label="标题">
              {{recordData.title}}
            </a-form-item>
            <a-form-item label="主办处室">
              <a-select allowClear placeholder="请选择主办处室"  v-decorator="['orgid']">
                <a-select-option v-for="item in search.orgs" :value="item._id" :key="item._id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="主办人">
              <UserSelect :search.sync="search" :title="'请选择主办人'" :name="'createusername'" :value="'createuser'" @changesearch="changesearch"/>
            </a-form-item>
            <a-form-item label="相关领导">
              <UserSelect :search.sync="search" :alwaysMulti="true" :maxSelect="100" :title="'请选择相关领导'" :name="'leadname'" :value="'leadid'" @changesearch="changesearch"/>
            </a-form-item>
            <a-form-item label="是否跟进">
              <a-checkbox :checked="isfollow" @change="changefollow" v-decorator="['isfollow', { initialValue: false }]">
                需要跟进
              </a-checkbox>
            </a-form-item>
          </a-form>
        </div>
        <div v-if="showjointly" class="jointly">
          <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }" :form="joinForm" @submit="onSubmit">
            <a-form-item label="标题">
              {{recordData.title}}
            </a-form-item>
            <a-form-item label="协办处室">
              <a-select allowClear placeholder="请选择协办处室"  v-decorator="['orgid', {initialValue: search.orgid}]">
                <a-select-option v-for="item in search.orgs" :value="item._id" :key="item._id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="协办人">
              <UserSelect :search.sync="search" :defaultValue="{name: search.joinname, value: search.joinid}" :title="'请选择协办人'" :name="'joinname'" :value="'joinid'" @changesearch="changesearch"/>
            </a-form-item>
            <addAssister :count="this.count" :search="search" :span="24" :horizontal="false"  @changesearch="changesearch"/>
          </a-form>
        </div>
        <template slot="footer" class="footer">
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </template>
    </a-modal>
  </div>
</template>

<script>
import { Input, Form, Checkbox, Select, Modal, Button, Icon, Row, Col, Spin, Divider } from "ant-design-vue";
import OrgUserSelect from '@person/components/OrgUserSelect';
import UserSelect from './UserSelect';
import addAssister from './addAssister';
import { values, uniq } from 'lodash';
import { orgquery } from '@/person/api/org';
import { forward, addassist, listassisters } from "@/person-shaoxing/api/workTask";
import { showError } from '@/framework/utils';
export default {
  props: ['title','showforward','showjointly','recordData'],
  components: {
    ACheckbox: Checkbox,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    AForm: Form,
    AFormItem: Form.Item,
    AModal: Modal,
    AButton: Button,
    OrgUserSelect,
    AIcon: Icon,
    ARow: Row,
    ACol: Col,
    UserSelect,
    ASpin: Spin,
    ADivider: Divider,
    addAssister,
  },
  data() {
    return {
      count: undefined,
      spinning: false,
      isfollow: false,
      search: {
        orgs: undefined,
        joinname: undefined,
        joinid: undefined,
        createuser: undefined,
        createusername: undefined,
        leadid: undefined,
        leadname: undefined,
      },
      joinForm: this.$form.createForm(this, { name: 'joinForm' }),
      forwardForm: this.$form.createForm(this, { name: 'forwardForm' }),
    };
  },
  watch: {
    showforward(val) {
      if(val) {
        this.orgQuery();  
      }
      return val;
    },
    showjointly: {
      immediate: true,
      handler(val) {
        if(val) {
          this.orgQuery();
        }else{
          this.count = undefined;
        }
      return val;
      }
    },
    search: {
      immediate: true,
      deep: true,
      handler(val) {
        return val;
      }
    }
  },
  methods: {
    changesearch(name,value,id,username) {
      this.$set(this.search,name,username);
      this.$set(this.search,value,id);
      this.search = Object.assign({},this.search);
    },
    notify(val) {
      this.$notification.warning({
        message: "提示",
        description: val,
        duration: 3,
      });
    },
    success(val) {
      this.$notification.success({
        message: "提示",
        description: val,
        duration: 3,
      });
    },
    isrepeat(val) {
      return true;
    },
    forwardCancel() {
      this.search = {
        orgs: undefined,
        joinname: undefined,
        joinid: undefined,
        createuser: undefined,
        createusername: undefined,
        leadid: undefined,
        leadname: undefined,
        };
      this.isfollow = false;
      this.$emit('forwardCancel');
    },
    changefollow() {
      this.isfollow = !this.isfollow;
    },
    onSubmit() {
      if(this.showforward) {
        this.forwardForm.validateFields((err, values) => { 
          if(!err) {
            let data= {};
            let follow = {};
            follow.isfollow= values.isfollow ? 1 : 0;
            data.id = this.recordData.id;
            if(values.orgid) {
              data.mainorgid=values.orgid;
            }
            if(this.search.createuser) {
              data.mainuserid=this.search.createuser;
            }
            if(this.search.leadid) {
              data.leaders=`${this.search.leadid}`;
            }
            this.forWard(data, follow);
          }
        });
      }else if(this.showjointly) {
        this.joinForm.validateFields((err, values) => { 
          let data = {};
          let {form} = this;
          data.assistusers = undefined;
          if(values.orgid&&this.search.joinid) {
            data.assistusers = [];
            data.assistusers.push({orgid: values.orgid, userid: this.search.joinid });
          }
          let keys = Object.keys(this.search).filter((item)=>item.indexOf('joinid')>=0);
          if(keys.length>0) {
            for(let i =1; i<=keys.length-1; i++) {
              if(values[`orgid${i}`]&&this.search[`joinid${i}`]) {
                if(!data.assistusers) {
                  data.assistusers = [];
                }
                data.assistusers.push({orgid: values[`orgid${i}`],  userid: this.search[`joinid${i}`] });
              }
            }
          }
          data.id = this.recordData.id;
          this.addAssist(data);
        });
      }
    },
    //转发
    forWard(data, follow) {
      forward(data, follow).then((res)=>{
        if(res.code==='success') {
          this.success('转发成功！');
        }else{
          this.notify('转发失败！');
        }
        this.forwardCancel();
        this.isfollow = false;  
      }).catch((err)=>{
        this.forwardCancel();
        this.isfollow = false;
        showError(err);
      })
    },
    addAssist(data) {
      addassist(data).then((res)=>{
        if(res.code==='success') {
          this.success('添加成功！');
          this.$emit('loadDetail');
        }else{
          this.success('添加失败！');
        }
        this.forwardCancel();
      }).catch((err)=>{
        this.forwardCancel();
        showError(err);
      });
    },
    listAssisters() {
      this.spinning = true;
      listassisters(this.recordData.id).then((res)=>{
        if(res.code) {
          if(res.result.length>1) {
            this.count = res.result.length-1;
          }else{
            this.count = undefined;
          }
          res.result.forEach((item,index)=>{
            if(index===0) {
              this.search.joinname = item.username;
              this.search.joinid = item.userid;
              this.search.orgid = item.orgid;
            }else{
              this.search[`joinname${index}`] = item.username;
              this.search[`joinid${index}`] = item.userid;
              this.search[`orgid${index}`] = item.orgid;
            }
          });
        }
        this.spinning = false;
      }).catch((err)=>{
        this.spinning = false;
        showError(err);
      })
    },
    //查询下设
    orgQuery() {
      orgquery({
        pagesize: 50,
        suporgid: "04e19e21ed48425b8aa3f17a0015452f"
      }).then((res)=>{
        this.search.orgs = res.result.rows;
        if(!this.search.orgs.length) {
          this.$notification.warning({
            message: '提示',
            description: '未查询到协办处室',
            duration: 3,
          })
        }else{
          if(this.showjointly) {
            this.listAssisters();
          }
        }
      }).catch((err)=> {
        showError(err);
      });
    },
  }
};
</script>
<style lang="less" scoped>
.forwardmodal /deep/.ant-modal-content {
  .spin {
    width: 100%;
    position: absolute;
    left: 0;
    top: 55px;
    bottom: 0;
    background: fade(white, 50%);
    z-index: 999;
    .ant-spin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .jointly {
    .join .joincontent {
      position: relative;
      .ant-divider.ant-divider-horizontal.ant-divider-dashed {
        position: absolute;
        top: -12px;
        margin: 0;
      }
      .dynamic-delete-button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%,-50%);
        cursor: pointer;
        font-size: 1.6em;
        color: #999;
        transition: all 0.3s;
      }
      .dynamic-delete-button:hover {
        color: #777;
      }
      .dynamic-delete-button[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
  .ant-modal-footer {
    text-align: center;
  }
}
</style>
