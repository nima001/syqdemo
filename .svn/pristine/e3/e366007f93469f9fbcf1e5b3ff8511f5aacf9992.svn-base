<template>
  <a-spin :spinning="spinning" wrapperClassName="form-submit-spin" :delay="300">
    <div class="org-record-form">
      <div ref="recordbody" class="body">
        <a-anchor wrapperClass="anchor-right" :getContainer="() => $refs.recordbody">
          <div v-for="(item, index) in records" :key="index">
            <a-anchor-link :href="`#top${index}`" :title="item.orgname" class="top-link"/>
            <a-anchor-link :href="`#base${index}`" title="基本信息" />
            <!-- <a-anchor-link :href="`#bz${index}`" title="编制信息" v-if="!isDelete(item)"/>
            <a-anchor-link :href="`#zs${index}`" title="职数信息" v-if="!isDelete(item)"/>
            <a-anchor-link :href="`#ns${index}`" title="内设机构" v-if="!isDelete(item)"/> -->
          </div>
        </a-anchor>
        <a-form class="form" layout="vertical">
          <div v-for="(item, index) in records" :key="item.id">
            <div :id="`top${index}`">
              <div class="org-tag">{{item.orgname}}</div>
              <a-row :gutter="20">
                <a-col :span="16">
                  <a-form-item label="主题词" 
                    :required="true"
                    :validateStatus="subjectsValid.status" 
                    :help="subjectsValid.message"
                  >
                    <dict-select v-if="isUpdate(item)" 
                      dict="person.orgrecordsubject"
                      :multiple="true"
                      v-model="item.subjects" 
                      @change="subjectsValid={}"
                      :show-group="false"
                      :filter="item => item.group == '变更'"
                    />
                    <dict-select v-else 
                      dict="person.orgrecordsubject"
                      :multiple="true"
                      :value="item.subjects" 
                      :show-group="false"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="是否为起始文件">
                    <a-switch v-model="item.begin" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
            <div :id="`base${index}`">
              <record-base ref="recordbase" :record="item"/>
            </div>
            <!-- <div :id="`bz${index}`" v-if="!isDelete(item)">
              <a-form-item label="编制信息">
                <record-staff-distr :record="item" category="staff"/>
              </a-form-item>
            </div>
            <div :id="`zs${index}`" v-if="!isDelete(item)">
              <a-form-item label="职数信息">
                <record-staff-distr :record="item" category="post"/>
              </a-form-item>
            </div>
            <div :id="`ns${index}`" v-if="!isDelete(item)">
              <a-form-item label="内设机构">
                <record-depts :record="item"/>
              </a-form-item>
            </div> -->
          </div>
        </a-form>
      </div>
      <div class="footer">
        <a-button @click="prevStep">上一步</a-button>
        <a-button type="primary" @click="handleSubmit">提 交</a-button>
      </div>
    </div>
  </a-spin>
</template>
<script>
import {Row, Col, Spin, Button, Modal, Anchor, Form, Switch } from 'ant-design-vue';
import RecordBase from "./components/RecordBase";
import RecordStaffDistr from "./components/RecordStaffDistr";
import RecordDepts from "./components/RecordDepts";
import DictSelect from "@/framework/components/DictSelect";
import { getBySerialnum, batchUpdateRecord, checkRemovable } from "@/person/api/orgRecord";
import { showError } from "@/framework/utils/index";


export default {
  props: ['params'],
  components: {
    ARow: Row,
    ACol: Col,
    ASpin: Spin,
    AButton:Button,
    AModal:Modal,
    AAnchor:Anchor,
    AAnchorLink:Anchor.Link,
    AForm: Form,
    AFormItem: Form.Item,
    ASwitch: Switch,
    DictSelect,
    RecordBase,
    RecordStaffDistr,
    RecordDepts,
  },
  data() {
    return {
      spinning: false,
      subjectsValid: {
        status: undefined,
        message: undefined,
      },
      serialnumList: [],
      records: [],
    };
  },
  created() {
    this.serialnumList = this.params.serialnumList;
    if(this.serialnumList.length){
      this.getBySerialnum(this.serialnumList[0]);
    }
  },
  methods: {
    async handleSubmit(){
      if(this.spinning){
        return;
      }
      let {subjects} = this.records[0];//目前变更不会批量提交，只有变更需验证主题词暂不处理
      if(!subjects || !subjects.length){
        this.subjectsValid = {status: 'error', message: '请选择主题词'};
        return;
      }
      this.spinning = true;
      try{
        let validators = this.$refs.recordbase.map(item => item.validateFields());
        let datas = await Promise.all(validators);
        let records = datas.map((item, index) => ({ ...this.records[index], ...item }));
        await batchUpdateRecord(records);
        let needClearList = await this.checkOrgRemove();
        if(needClearList && needClearList.length){
          let names = needClearList.map(item => item.orgname).join('】、【')
          this.$message.warning(`撤销机构【${names}】下存在下设机构或用户，请在撤销下设和转移用户后重新提交`);
        }
        this.nextStep('提交成功，是否继续编辑下一条台账？');
      }catch(e){
        showError(e);
      }
      this.spinning = false;
    },
    checkOrgRemove(){//检查机构是否可删除 返回不可删除的记录列表
      let needCheckRecords = this.records.filter(item => item.exist)
      return Promise.all(needCheckRecords.map(item => {
        return checkRemovable(item.orgid).then(({result}) => result);
      })).then(arr => {
        return needCheckRecords.filter((item, index) => arr[index] == false);
      }).catch(err => {
        //ignore 
      });
    },
    getBySerialnum(num) {
      getBySerialnum(num).then(({result}) => {
        this.records = result;
      }).catch(error => {
        showError(error);
      });
    },
    nextStep(message) {
      let list = this.serialnumList;
      list.shift();
      if(list.length){
        this.$confirm({
          title: '提示',
          content: h => '提交成功，是否继续编辑下一条台账？',
          onOk: () => {
            this.getBySerialnum(this.serialnumList[0]);
          },
          onCancel: () => {
            this.$emit('next');
          },
        });
      }else{
        this.$emit('next');
      }
    },
    prevStep() {
      this.$emit('prev');
    },
    isUpdate(record){//判断台账记录是否是更新
      let subjects = record.subjects;
      if(subjects && subjects.length){
        //主题中包含 设立/三定/撤销 就不是更新
        if(subjects.some(item => [1, 2, 3, 4, 6].indexOf(item) >= 0)){
          return false
        }
      }
      return true;
    },
    isDelete(record){
      let subjects = record.subjects;
      if(subjects && subjects.length){
        return subjects.indexOf(6) >= 0;
      }
      return false;
    },
    bzDistrEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/编制变动 可以编辑编制信息
      return (record.subjects || []).some(item => [3, 4, 11, 8, 9].indexOf(item) >= 0);
    },
    zsDistrEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/职数变动 可以编辑职数信息
      return (record.subjects || []).some(item => [3, 4, 11, 8, 10].indexOf(item) >= 0);
    },
    deptsEditable(record){
      //主题中包含 设立/三定/清理规范/挂牌/内设科室变动 可以编辑内设科室
      return (record.subjects || []).some(item => [3, 4, 11, 8, 13].indexOf(item) >= 0);
    },
  }
};
</script>
<style lang="less" scoped>
.form-submit-spin{
  height: 100%;
  /deep/.ant-spin-container{
    height: 100%;
  }  
}
.org-record-form {
  height: 100%;
  display: flex;
  flex-direction: column;

  /deep/.anchor-right{
    position: absolute;
    width: 240px;
    text-align: right;
    margin-top: 60px;
    margin-left: 0;
    margin-right: -4px;
    padding-right: 4px;

    .top-link{
      font-size: 16px;
      font-weight: bold;
    }
    .ant-anchor{
      padding-left: 0;
      padding-right: 2px;
    }
    .ant-anchor-ink{
      left: unset;
      right: 0;
    }
    .ant-anchor-link{
      padding: 7px 10px 7px 8px;
    }
  }
  & > .body{
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    .form{
      padding-left: 300px;
      padding-right: 200px;
      .org-tag{
        border-left: 4px solid @primary-color;
        margin: 15px 0;
        line-height: 1.1em;
        font-size: 16px;
        text-indent: 0.8em;
        font-weight: bold;
      }
    }
  }
  & > .footer{
    padding: @padding-sm @padding-lg;
    text-align: center;
    margin-top: 10px;
    button:first-child{
      margin-right: 20px;
    }
  }
}
</style>
