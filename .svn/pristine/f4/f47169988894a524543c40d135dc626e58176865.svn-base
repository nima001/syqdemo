<template>
  <div class="addorg">
    <div class="content">
      <div class="head">新增组织</div>
      <div class="formcontent"><add-org-form :selectedtreeid="selectedtreeid" ref="childsubmit"/></div>  
      <div class="footer">
        <a-button class="btn1" @click="goBack">
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
import {Button} from "ant-design-vue";
import AddOrgForm from "./components/AddOrgForm"
import { addOrg } from "@/idm/api/addOrg";
export default {
  name: 'addOrg',
  components: {
    AButton: Button,
    AddOrgForm
  },
  data() {
    return {
      selectedtreeid: null,
    };
  },
  created(){
    this.selectedtreeid = this.$route.query.selectedtreeid
  },
  
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    async confirm() {
      let formdata = await this.$refs.childsubmit.submitform();
      let params = {
        administrativedivision: formdata.administrativedivision,
        contactsmobilephone: formdata.contactsmobilephone,
        contactsname: formdata.contactsname,
        contactsofficephone: formdata.contactsofficephone,
        divisionlevel: formdata.divisionlevel,
        name: formdata.name,
        nsjg: formdata.domains[0].value,
        // oid: this.info.neworgid,
        orgunittype: formdata.orgunittype,
        shortname: formdata.shortname,
        usccode: formdata.usccode,
        // orgtype:
      }
      addOrg(params).then(res => {
        console.log(res);
        if(this.selectedtreeid){
          this.$message.success('新增组织成功');
          this.$router.push({name:'accountMain'})
        }else{
          this.$message.success('新增组织成功');
          this.$router.push({
          path: '/idm/index'
          });
        }
      }).catch(err => {
            showError(err);
          })
    }
  }
}
</script>

<style lang="less" scoped>
.addorg {
  height: 100%;
  padding: 10px;
  .content{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: @white;
    padding: @content-padding-v @content-padding-h;
    .head{
      padding: @content-padding-v @content-padding-h;
      width:100%;
      font-size: 18px;   
    }
    .formcontent{
      padding: @content-padding-v @content-padding-h;
      flex-shrink: 1;
      overflow: auto;
    }
    .footer{
      padding: @content-padding-v @content-padding-h;
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      .btn1{
        position: absolute;
        left: 50%;
      }
      .btn2{
        position: absolute;
        right: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>