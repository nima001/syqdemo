<template>
  <div class="setorgmanager">
    <div class="content">
      <div class="title">
        <h1>机构管理员</h1>
      </div>
      <div class="select-part">
        <div class="select-content">
          <div class="select-title">选择组织，并设置相应的机构管理员</div>
          <a-form-model
            ref="dynamicValidateForm"
            :model="dynamicValidateForm"
            >
            <a-form-model-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              :prop="'domains.' + index + '.valueorg'"
              :rules="{
                required: true,
                message: '请完成选择',
                trigger: 'blur',
              }"
              >
              <div class="inputselect">
                <div class="orgselect">
                  <span><label>组织：</label></span>
                  <a-input
                  class="orginput"
                  placeholder="请选择机构"
                  style="width: 70%; margin-right: 8px"
                  v-model="domain.valueorg"
                  @click="showOrgSelect(index)"
                  >
                    <a-icon slot="addonAfter" type="select" @click="showOrgSelect(index)"/>
                  </a-input>
                  <a-icon
                    v-if="dynamicValidateForm.domains.length > 1"
                    class="dynamic-delete-button"
                    type="minus-circle-o"
                    :disabled="dynamicValidateForm.domains.length === 1"
                    @click="removeDomain(domain)"
                  />
                </div>
                <div class="userselect">
                  <span><label>机构管理员:</label></span>
                  <a-button class="userbtn" @click="showUserSelect(index)"><a-icon type="plus"/>添加人员</a-button>
                  <span v-for="item in domain.valueuser" :key="item.id"><a-tag closable>{{item.username}}</a-tag></span>
                </div>
              </div>
            </a-form-model-item>
            <div class="addorg">
              <a-form-model-item>
                <a-button type="dashed" style="width: 100%" @click="addDomain">
                  <a-icon type="plus"/>添加组织
                </a-button>
              </a-form-model-item>
            </div>
            
          </a-form-model>
        </div>
        <a-modal
         :footer="null"
         v-model="orgvisible"
         :width="500"
         :title="`选择组织`"
         :bodyStyle="{ height: '500px', padding: '0'}"
        >
         <idm-org-tree  @select-ok="orgOutOk" @select-cancel="orgOutCancel" />
        </a-modal>
        <a-modal
              :footer="null"
              v-model="uservisible"
              :width="800"
              :title="`选择调入人员`"
              :bodyStyle="{ height: '600px', padding: '0'}"
            >
              <idm-account-select-list @select-ok="userOk" @select-cancel="userCancel"></idm-account-select-list>
            </a-modal>
      </div>
      <div class="btn">   
        <a-button class="btn1" @click="cancel">
          取消
        </a-button>
        <a-button class="btn2" type="primary" @click="confirm">
          确定
        </a-button>
      </div>       
    </div>  
  </div>
</template>

<script>
import { Input, Icon, Table, Modal, FormModel, Button, Divider, Form, Tag} from "ant-design-vue";
import OrgTree from "@/idm/components/OrgTree";
import IdmOrgTree from "@/idm/components/IdmOrgTree";
import IdmAccountSelectList from "@/idm/components/IdmAccountSelectList";
import OrgUserSelect from "@/idm/components/OrgUserSelect"
export default {
  name: 'SetOrgManager',
  components: {
    AInput: Input,
    AIcon: Icon,
    ATable: Table,
    AModal: Modal,
    AButton: Button,
    ADivider: Divider,
    AForm: Form,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    ATag: Tag,
    OrgTree,
    OrgUserSelect,
    IdmOrgTree,
    IdmAccountSelectList,
    
  },
  data() {
    return{
      orgvisible: false,
      orgValue: null,
      uservisible: false,
      properties: {},
      nodeid: Number(this.$route.query.id) || undefined,
      treeid: Number(this.$route.query.treeid) || undefined,
      treeIdData:{},
      selected: null,
      selectedArr: [],
      params: {},
      disabledKeysArr: [],
      userFilter: {
        usertype: undefined,
      },
      addTableData: null,
      dynamicValidateForm: {
        domains: [{valueorg:''}],
      },
      dindex: null,
    }
  },
  methods: {
    showOrgSelect(index) {
      this.orgvisible = true;
      this.dindex = index;
    },
    orgOutOk(org) {
      this.orgvisible = false;
      let { _id, name } = org.data;
      this.dynamicValidateForm.domains[this.dindex].valueorg = name
    },
    orgOutCancel() {
      this.orgvisible = false;
    },
    showUserSelect(index) {
      this.uservisible = true;
      this.dindex = index;
    },
    userOk(data) {
      this.uservisible = false;
      this.dynamicValidateForm.domains[this.dindex].valueuser = data;
    },
    userCancel() {
      this.uservisible = false;
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        // value: '',
        key: Date.now(),
      });
      console.log(this.dynamicValidateForm.domains);
    },
    confirm() {
      this.$message.success('机构管理员设置成功');
      this.$router.push('/idm/index')
    },
    cancel() {
      this.$router.push('/idm/index')
    }
  }
}
</script>

<style lang='less' scoped>
  label::before{
    content: '*';
    color: red;
    font-size: 14px;
    height: 18px;
    width: 18px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
  }
  .setorgmanager{
    height: 100%;
    padding: 10px;
    .content{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: @white;
    padding: @content-padding-v @content-padding-h;
  }
    .select-part{
      flex-direction: column;
      display: flex;
      align-items: center;
      flex-shrink: 1;
      overflow: auto;
      .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
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
      .select-content{
        width: 70%;
        padding: @padding-md;
        .inputselect{
          border-bottom: 1px solid;
          border-color: #d9d9d9;
          .orgselect{
          padding: @padding-md 0;
          .orginput{
            margin: 0px 35px
          }
        }
          .userselect{
          padding: @padding-md 0;
          .userbtn{
            margin: 0px 5px ;
          }
        }
        }
        .addorg{
          padding: @padding-md 0;
        }
      }
    }
    .btn{
          position: relative;
          margin-bottom: 30px;
          .btn1{
            position: absolute;
            right: 50%;
            transform: translateX(-25%);
          }
          .btn2{
            position: absolute;
            left: 50%;
            transform: translateX(25%);
          }
        }
  }
</style>