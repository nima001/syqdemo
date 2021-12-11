<template>
  <div class="org-record-edit-outline">
    <div class="toolbar">
      <div class="left">
        <ul>
          <li><a-button icon="plus" type="primary" @click="addOutline">添加</a-button></li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li><a @click="showHistory">查看历史</a></li>
        </ul>
      </div>
    </div>
    <div class="body">
      <a-table
        :columns="columns" 
        rowKey="serialnum"
        :dataSource="datalist"
        :pagination="false"
        :loading="loading">
        <ul slot="subjects" slot-scope="data">
          <li v-for="item in data.items" :key="item.id">{{subjectsText(item.subjects)}}</li>
        </ul>
        <ul slot="orgs" slot-scope="data">
          <li v-for="item in data.items" :key="item.id">{{item.orgname}}</li>
        </ul>
        <template slot="opts" slot-scope="data">
          <a @click="editOutline(data)">编辑</a>
          <a v-if="data.sort == 1 || data.sort == 2" @click="modifyOutline(data)">修改单位</a>
          <a @click="deleteOutline(data)">删除</a>
        </template>
      </a-table>
    </div>
    <div class="footer">
      <div class="btns">
        <a-button @click="prevStep">上一步</a-button>
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </div>
    </div>
    <a-modal title="添加" :footer="null" v-model="showOutlineForm"
      width="600px" :bodyStyle="{height: '520px', padding: 0}">
      <outline-form :docid="docid" :outline="outline" @finish="onOutlinSubmit"/>
    </a-modal>
  </div>
</template>
<script>
// const column = [
//   { title: "发文字号", dataIndex: "doc.num", },
//   { title: "文件标题", dataIndex: "doc.title", },
//   { title: "相关单位", dataIndex: "orgname", },
//   { title: "主题词", dataIndex: "theme", },
//   { title: "发文时间", dataIndex: "doc.dispatchdate", },
//   { title: "文件来源", dataIndex: "source", },
//   { title: "操作", key: "operate", scopedSlots: { customRender: "operate" }}
// ];
import { Button, Table, Modal} from "ant-design-vue";
import OutlineForm from "./components/OutlineForm";
import { showError } from "@/framework/utils/index";
import { listOutline, deleteOutline, } from "@/person/api/orgRecord";

export default {
  props: ['params'],
  components: {
    AButton: Button,
    ATable: Table,
    AModal: Modal,
    OutlineForm,
  },
  data() {
    return {
      columns: [
        { title: '类别', dataIndex: 'sort', customRender: (text) => {
          let v = this.$store.getters.dictKey('person.orgrecordsubject', text);
          return (v && v.group) || '';
        }},
        { title: '主题词', scopedSlots: { customRender: 'subjects' }, class: 'inner-list'},
        { title: '单位名称', scopedSlots: { customRender: 'orgs' }, class: 'inner-list'},
        { title: '操作', scopedSlots: { customRender: 'opts' }, class: 'opts'}
      ],
      datalist: [],
      loading: true,
      showOutlineForm: false,
      outline: null,
    };
  },
  created() {
    this.loadOutline();
  },
  computed: {
    docid(){
      return this.params && this.params.id;
    }
  },
  methods: {
    subjectsText(subjects){
      let text = '';
      (subjects || []).forEach(value => {
        let v = this.$store.getters.dictKey('person.orgrecordsubject', value);
        if (v) {
          text += `、${v.text}`;
        }
      });
      if (text) {
        text = text.substr(1);
      }
      return text;
    },
    loadOutline() {
      if(!this.docid){
        return;
      }
      this.loading = true;
      listOutline(this.docid).then(({result}) => {
        let list = [], outline, sort = 0;
        (result || []).forEach((item, index) => {
          if(index == 0 || outline.serialnum != item.serialnum){
            if(outline){
              for(let i = 0; i < 32; i++){
                if((sort & (1 << i)) != 0){
                  outline.sort = i;
                  break;
                }
              }
            }
            outline = {
              serialnum: item.serialnum,
              sort: 0,
              items: []
            }
            list.push(outline);
          }
          outline.items.push(item);
          let b = 0;
          (item.subjects || []).forEach(s => {
            b |= 1 << s;
          })
          //同一个序列号下没有重复的主题词去最后一个否则去重复的主题词
          if((sort & b) != 0){
            sort &= b
          }else{
            sort = b
          }
        });
        for(let i = 0; i < 32; i++){
          if((sort & (1 << i)) != 0){
            outline.sort = i;
            break;
          }
        }
        this.loading = false;
        this.datalist = list;
      }).catch(error => {
        showError(error);
      })
    },
    prevStep() {
      this.$emit('prev');
    },
    nextStep() {
      if (!this.datalist.length) {
        this.$message.warn('请先添加台账记录');
        return;
      }
      let list = this.datalist.map(item => item.serialnum);
      this.$emit('next', {serialnumList: list});
    },
    editOutline(data) {
      let list = [data.serialnum];
      this.datalist.forEach(item => {
        if(item.serialnum != data.serialnum){
          list.push(item.serialnum);
        }
      })
      this.$emit('next', {serialnumList: list});
    },
    modifyOutline(data) {
      this.outline = data;
      this.showOutlineForm = true;
    },
    addOutline(){
      this.outline = undefined;
      this.showOutlineForm = true;
    },
    deleteOutline(data) {
      deleteOutline(data.serialnum).then(res => {
        this.$message.info('删除成功');
        this.loadOutline();
      }).catch(error => {
        showError(error);
      });
    },
    onOutlinSubmit(type){
      this.showOutlineForm = false;
      if(type == 'ok'){
        this.loadOutline();
      }
    },
    showHistory(){
      let {num} = this.params;
      let routeUrl = this.$router.resolve({ 
        name: 'bookHistory', query: { num}}
      );
      window.open(routeUrl.href, '_blank');
    }
  }
};
</script>
<style lang="less" scoped>
.org-record-edit-outline {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    white-space: nowrap;
    padding: @content-padding-v @content-padding-h;
    .left {
      float: left;
      li{
        margin-right: 8px;
      }
    }
    .right{
      float: right;
      li{
        margin-left: 8px;
      }
    }
    ul {
      margin: 0;
      white-space: nowrap;
    }
    li {
      display: inline-block;
      white-space: nowrap;
    }
  }
  & > .body{
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    padding: 0 @padding-lg;

    /deep/ td.inner-list {
      padding: 0;
      ul {
        margin: 0;
      }
      li {
        padding: 8px 8px;
        box-sizing: content-box;
        border-top: 1px solid @border-color-split;
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      li:first-child {
        border: none;
      }
    }
    /deep/td.opts a{
      margin-right: 10px;
    }
  }
  & > .footer{
    padding: @content-padding-v @content-padding-h;
    .btns{
      text-align: center;
      margin-top: 10px;
      button:first-child{
        margin-right: 20px;
      }
    }
  }
}
</style>
