<template>
  <div>
    <a-modal :visible="show" @cancel="onCancel" 
      :destroyOnClose="true" :closable="false" :footer="null" 
      width="90%" :dialogStyle="{minWidth: '1100px', maxWidth: '1400px'}" 
      :bodyStyle="{padding:'10px 0 0 0', height: '80vh'}"
    >
      <a-icon type="close" class="dialog-colse" @click="onCancel"/>
      <custom-query v-model="queryData" :contextFields="contextFields" @input="onQueryChange" ref="query">
        <template #opts>
          <query-select :namespace="namespace" @select="onQuerySelected" style="width: 180px;margin-right: 10px"/>
          <a-button type="primary" @click="onSearch">查询</a-button>
          <a-button type="primary" ghost @click="onReset">重置</a-button>
          <a-button type="primary" ghost @click="onOk">保存</a-button>
        </template>
        <template #dataOpts>
          <slot name="dataOpts"/>
        </template>
      </custom-query>
    </a-modal>
    <input-modal v-model="nameEdit.show" title="查询名称" :value="nameEdit.value" :callback="nameEdit.callback"/>
  </div>
</template>
<script>
import { Modal, Button, Icon, Input } from 'ant-design-vue';
import CustomQuery from './CustomQuery';
import InputModal from '@framework/components/InputModal';
import QuerySelect from './components/QuerySelect';
import { querysave, getQuery, exportExcel } from "@person/api/integratedquery";
import { showError } from '@framework/utils';
import cloneDeep from 'lodash/cloneDeep';

/**
 * 查询编辑框
 * 提供以下事件：
 * cancel 编辑取消
 * ok 编辑完成
 */
export default {
  components: {
    AModal: Modal,
    AIcon: Icon,
    AButton: Button,
    AInput: Input,
    InputModal,
    CustomQuery,
    QuerySelect,
  },
  model: {
    prop: 'query',
    event: 'change',
  },
  props:{
    show: {
      type: Boolean,
    },
    namespace: {
      type: String,
      required: true,
    },
    query: {//(v-model)
      type: [Number, Object]//查询id或查询对象
    },
    submit: { //保存时否提交服务器
      type: Boolean,
      default: true
    },
    contextFields: {//查询上下文数据列表
      type: Array, //{code: 'orgid', name: '组织' ...}
    }, 
  },
  data(){
    return {
      queryData: undefined,
      nameEdit: {
        show: false,
        value: undefined,
        callback: undefined,
      }
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(show){
        if(show){//窗口显示时初始化数据（每次窗口显示都重置数据）
          // console.log('QueryModel show', this.query === this.queryData)
          this.initData(this.query);
        }
      }
    },
    // query(query){
    //   this.initData(query);
    // }
  },
  created(){
    // this.initData(this.query);
  },
  methods:{
    async initData(query = {}){
      let queryid;
      if(typeof query == 'number'){
        queryid = query;
      }else if(query.id && !query.target){//查询对象中有id没有target,也从服务器请求数据
        queryid = query.id;
      }
      if(queryid){
        try {
          let {result} = await getQuery(queryid);
          query = result;
        } catch (error) {
          showError(error);
        }
      }else if(!query.namespace){//新增时初始化命名空间
        query.namespace = this.namespace;
      }
      // console.log('QueryModel init')
      this.queryData = cloneDeep(query);
    },
    onQueryChange(query){
      this.$emit('change', this.queryData);
    },
    onOk(){
      this.nameEdit = {
        show: true,
        value: this.queryData.title,
        callback: (title) => {
          if(!title){
            return '请输入查询名称'
          }
          this.queryData.title = title;
          if(this.submit){//提交服务器
            //TODO 提交到服务器是否要公开权限
            return querysave(this.queryData).then(({result}) => {
              this.queryData.id = result;//防止重复新增
              this.$emit('change', this.queryData);
              this.$emit('ok', this.queryData);
            }).catch(error => {
              showError(error);
            })
          }else{
            this.$emit('change', this.queryData);
            this.$emit('ok', this.queryData);
          }
        }
      }
    },
    onCancel(){
      this.$emit('cancel');
    },
    onSearch(){
      this.$refs.query.search();
    },
    onReset(){
      this.$refs.query.reset();
    },
    onQuerySelected(queryid){
      getQuery(queryid).then(({result}) => {
        this.$refs.query.reset(result);
      }).catch(error=>{
        showError(error);
      });
    },
  }
}
</script>
<style lang="less" scoped>
.dialog-colse{
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  font-size: 1.1em;
  cursor: pointer;
  &:hover{
    color: black;
  }
}
</style>