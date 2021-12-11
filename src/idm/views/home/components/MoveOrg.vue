<template>
  <div class="moveorg">
    <div class="content">
      <div class="content-head">
        <h1>组织迁移</h1>
      </div>
      <div class="content-content">
        <div class="content-movepart">
          <div class="title">组织整体迁移到另一个组织节点之下。</div>
          <div class="movecontent">
            <a-form-model
              ref="dynamicValidateForm"
              :model="dynamicValidateForm"
            >
              <a-form-model-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
              >
                <div class="movedorg">
                  <span class="star">*</span>
                  <span class="labelname"><label>迁移组织：</label></span>
                    <a-input
                      v-model="domain.movedorg"
                      placeholder="输入关键词查找或选择组织"
                      style="width: 70%; margin-right: 8px"
                      @click="showOrgSelect(index)"
                    >
                      <a-icon slot="addonAfter" type="select" @click="showOrgSelect(index)"/>
                    </a-input>
                </div>
                <div class="toorg">
                  <span class="star">*</span>
                  <span class="labelname"><label>迁移到组织：</label></span>
                    <a-input
                      v-model="domain.toorg"
                      placeholder="输入关键词查找或选择组织"
                      style="width: 70%; margin-right: 8px"
                      @click="showNewOrgSelect(index)"
                    >
                      <a-icon slot="addonAfter" type="select" @click="showNewOrgSelect(index)"/>
                    </a-input>
                    <a-icon
                      v-if="dynamicValidateForm.domains.length > 1"
                      class="dynamic-delete-button"
                      type="minus-circle-o"
                      :disabled="dynamicValidateForm.domains.length === 1"
                      @click="removeDomain(domain)"
                    />
                </div>
                <a-divider />
              </a-form-model-item>
              <a-form-model-item >
                <a-button type="dashed" style="width: 100%" @click="addDomain">
                  <a-icon type="plus" /> 添加迁移组织
                </a-button>
              </a-form-model-item>
            </a-form-model>
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
              v-model="neworgvisible"
              :width="500"
              :title="`选择组织`"
              :bodyStyle="{ height: '500px', padding: '0'}"
              >
              <idm-org-tree  @select-ok="newOrgOutOk" @select-cancel="newOrgOutCancel" />
            </a-modal>
          </div>
        </div>
      </div>
      <div class="footer">
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
import { Input, Icon, Table, Modal, FormModel, Button, Divider, Form, Tag, Row, Col} from "ant-design-vue";
import IdmOrgTree from "@/idm/components/IdmOrgTree";
import {moveOrg} from "@/idm/api/separateOrg";
import { showError } from "@/framework/utils/index";
export default {
  name: 'MoveOrg',
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
    ARow: Row,
    ACol: Col,
    IdmOrgTree
  },
  data() {
    return {
      orgvisible: false,
      dindex: null,
      neworgvisible: false,
      newdindex: null,
      orgparams: [
        {
          fromoid: '',
          tooid: '',
          treeid: '',
        }
      ],
      dynamicValidateForm: {
        domains: [
          {
            movedorg: '',
            toorg:''
          },
        ],
      },
    };
  },
  methods: {
    showOrgSelect(index) {
      this.orgvisible = true;
      this.dindex = index;
    },
    showNewOrgSelect(index) {
      this.neworgvisible = true;
      this.newdindex = index;
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
        this.orgparams.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        movedorg: '',
        toorg:'',
        key: Date.now(),
      });
      this.orgparams.push({
        fromoid: '',
        tooid: '',
        treeid: '',
      })
    },
    orgOutOk(org, treeid) {
      this.orgvisible = false;
      let { _id, name } = org.data;
      this.dynamicValidateForm.domains[this.dindex].movedorg = name;
      this.orgparams[this.dindex].fromoid = _id;
    },
    orgOutCancel() {
      this.orgOutVisible = false;
    },
    newOrgOutOk(org, treeid) {
      this.neworgvisible = false;
      let { _id, name } = org.data;
      this.dynamicValidateForm.domains[this.newdindex].toorg = name;
      this.orgparams[this.newdindex].tooid = _id;
      this.orgparams[this.newdindex].treeid = treeid;
    },
    newOrgOutCancel() {
      this.neworgvisible = false;
      console.log(this.dynamicValidateForm);
    },
    cancel() {
      this.$router.push({
        path: '/idm/index'
      });
    },
    confirm() {
      const params = {
        moveorgdata: this.orgparams
      };
      moveOrg(params).then(res=>{
        this.$message.success('组织分社成功');
        this.$router.push({
        path: '/idm/index'
      });
      }).catch(err => {
            showError(err);
          })
    }
  },
}
</script>

<style lang="less" scoped>
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
.moveorg{
  height: 100%;
  padding: 10px;
  .content{
    height: 100%;
    background-color: @white;
    padding: @content-padding-v @content-padding-h;
    overflow: auto;
    .footer{
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
    };
    .star{
       color: red;
       width: 10px;
       display: inline-block;
    };
    .labelname{
      width: 100px;
      display: inline-block;
    };
    .content-content{
      padding: @content-padding-v @content-padding-h;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .content-movepart{
        width: 60%;
        padding: @content-padding-v @content-padding-h;
        .title{
          margin: 20px;
        };
        .movedorg{
          margin: 20px;

        };
        .toorg{
          margin: 20px;
        }
      }
    }
  }
}
</style>