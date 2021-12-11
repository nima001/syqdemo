<template>
  <a-layout>
    <custom-query v-model="query" ref="query">
      <template slot="opts">
        <a-button type="primary" @click="onSearch">查询</a-button>
        <a-button type="primary" ghost @click="onReset">重置</a-button>
        <a-button type="primary" v-if="editable" ghost @click="onSave()">保存</a-button>
        <a-button type="primary" v-if="!create" ghost @click="onSave(true)">另存为</a-button>
        <a-button type="primary" ghost @click="enterCommonquery">常用查询</a-button>
      </template>
      <template slot="dataOpts">
        <a @click="onExport">导出</a>
        <a @click="onAggregate">图形分析</a>
      </template>
    </custom-query>
    <input-modal v-model="nameEdit.show" v-bind="nameEdit" />
    <task-progress :taskid="exportTaskid" defaultInfo="正在导出" @finish="onProgressFinish" />
  </a-layout>
</template>
<script>
import { Layout, Button } from 'ant-design-vue';
import CustomQuery from './CustomQuery';
import TaskProgress from "@/framework/components/TaskProgress";
import InputModal from '@framework/components/InputModal';
import { querysave, getQuery, exportExcel } from "@/person/api/integratedquery";
import { download } from "@/framework/api/file";
import { showError } from "@/framework/utils/index";

/**
 * 常用查询编辑页面
 */
export default {
  name: "IntegratedQuery",
  components: {
    ALayout:Layout,
    AButton: Button,
    CustomQuery,
    TaskProgress,
    InputModal,
  },
  data() {
    return {
      create: true,//是否新增
      queryid: undefined,
      query: undefined,
      title: undefined,
      nameEdit: {
        show: false,
        title: undefined,
        value: undefined,
        placeholder: undefined,
      },
      exportTaskid: undefined,
    };
  },
  computed: {
    editable(){
      let { owner, pub } = this.query || {};
      return this.create || owner || pub == 2;//新增或我创建的或公开可写的查询可以编辑保存
    }
  },
  created() {
    this.initData(this.$route.query.id)
  },
  methods: {
    async initData(queryid){
			if(queryid){
				try {
					let { result } = await getQuery(queryid);	
          this.query = result;
          this.queryid = queryid;
          this.create = false;
				} catch (error) {
					showError(error);
				}
			}
    },
    onSearch(){
      this.$refs.query.search();
    },
    onReset(){
      this.$refs.query.reset();
    },
    onSave(saveAs){
      this.nameEdit = {
        show: true,
        title: '保存查询',
        placeholder: "请输入标题",
        value: this.query.title,
        callback: (title) => {
          if(!title){
            return '请输入标题'
          }
          this.query.title = title;
          this.query.id = saveAs ? undefined : this.queryid;
          if(this.create || saveAs){//新增设置命名空间设置为常用查询
            this.query.namespace = 'customquery';
          }
          return querysave(this.query).then(({result}) => {
            if(!saveAs){//新增后设置queryid，防止重复保存(另存为除外)
              this.queryid = result;
            }
            this.$message.success('保存成功');
          }).catch(error => {
            showError(error);
          })
        }
      }
    },
    enterCommonquery() {
      this.$router.push({ name: "commonquery" });
    },
    onAggregate(){
      window.paramsBridge = { 
        type: 'chart', 
        data: { query: this.query },
      };
      const { href } = this.$router.resolve({path: '/person/statistics/chart/index', query: { feedback: true }});
      window.open(href, "_blank");
    },
    onExport() {
      this.nameEdit = {
        show: true,
        title: '导出',
        placeholder: "输入文件名",
        value: this.query.title,
        callback: (title) => {
          if(!title){
            return '请输入文件名'
          }
          return exportExcel({
            ...this.query,
            title,
          }).then(({result}) => {
            this.exportTaskid = result;
          }).catch(err => {
            showError(err);
          });
        }
      }
    },
    onProgressFinish(res) {
      download(res);
    }
  }
};
</script>
<style lang="less" scoped>
.ant-layout {
  height: 100%;
  padding: @layout-space-base;
}
</style>