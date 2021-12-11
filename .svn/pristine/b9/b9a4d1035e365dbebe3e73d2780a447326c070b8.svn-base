<template>
  <div class="wrap">
    <div class="bottom">
      <a-form id="form" :form="form" layout="vertical">
        <a-row v-for="(item,index) in parseConfigs" :key="index" :gutter="(item.gutter*2)">
          <template v-for="(vo,i) in item.columns">
            <a-col
              :key="i"
              :span="vo.column"
              :class="(vo.component && vo.component.componenttype == 'title')?'dashed-border':''"
            >
              <Title
                v-if="vo.component && vo.component.componenttype == 'title'"
              >{{vo.component.name}}</Title>
              <sub-title
                v-if="vo.component && vo.component.componenttype == 'subtitle'"
              >{{vo.component.name}}</sub-title>
              <!-- 机构选择 -->
              <Org v-if="vo.component && vo.component.componenttype == 'org'"
                :key="vo.component.code"
                :property="vo.component"
                :bindform="form"
                :typecode="typecode"
                :relateControls="[]"
              />
              <!-- 通用列表 -->
              <div class="common-table" v-if="vo.component && vo.component.componenttype == 'commonlist'">
                <a-form-item
                  :require="vo.component.require"
                  :label="vo.component.showName?vo.component.name:''"
                >
                  <div class="table-wrap">
                    <a-table 
                      rowKey="_id"
                      :columns="columns" 
                      :dataSource="tableData" 
                      bordered 
                      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                      :pagination="pagination"
                      @change="handleTableChange"
                      >
                      <template slot="toorg" slot-scope="text,row">
                        <a-input
                          :placeholder="toorgProperty.placehold"
                          :disabled="toorgProperty.editable?false:true"
                          :value="text && text[toorgProperty.fieldsource]"
                          :read-only="true"
                          @click="selectOrg(row)"
                        >
                          <a-icon slot="suffix" type="fork" class="orgIcon" @click="selectOrg(row)"/>
                        </a-input>
                      </template>
                      <a-input slot="memo" slot-scope="text,row" :value="text" @change="setMemo(row, $event)"/>
                    </a-table>
                  </div>
                </a-form-item>
                <!-- <org-user-select /> -->
              </div>
              <!-- 附件上传 -->
              <file-upload
                v-if="vo.component && vo.component.componenttype == 'attachmentgroup'"
                :property="vo.component"
                :bindform="form"
                >
              </file-upload>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<script>
import { Form, Row, Col, Modal, Table, Input, Icon } from "ant-design-vue";
import Org from "./../components/Org";
import Title from "./../components/Title";
import SubTitle from "./../components/SubTitle";
import FileUpload from './../components/FileUpload';
import OrgUserSelect from "@/person/components/OrgUserSelect";
import set from 'lodash/set';
import get from 'lodash/get';

export default {
  props: {
    formConfigs: {
      type: Object,
      required: true
    },
    typecode: {
      type: Object
    },
    addTableData: {
      type: Array
    },
    selectedRows: {
      type: Array
    }
  },
  data() {
    return {
      userListProperty: {},
      toorgProperty: {},
      columns: [],
      tableData: [],
      selectedRowKeys: [],
      pagination: {
        pageSize: 20,
        current: 1,
        total: 0,
        showSizeChanger: true,
        showTotal: total => `总共：${total}人`,
      },
    };
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AModal: Modal,
    ATable: Table,
    AInput: Input,
    AIcon: Icon,
    Org,
    Title,
    SubTitle,
    FileUpload,
    OrgUserSelect
  },
  computed: {
    parseConfigs() {
      return JSON.parse(this.formConfigs.configs);
    }
  },
  watch: {
    addTableData(val) {
      val.forEach(item => {
        this.addUser(item);
      })
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    // 表头配置
    let com = this.findUserListCom();
    if(com){
      if (com.orderNumber) {
        this.columns.push({
          title: "序号",
          key: "index",
          dataIndex: "index",
          width: 48,
          align: "center",
          customRender: (text, row, index) => {
            let p = this.pagination;
            return (p.current - 1) * p.pageSize + index + 1;
          },
        })
      }
      com.childs.forEach(item => {
        let c = {
          title: item.name,
          dataIndex: item.code,
          align: "center",
        }
        if(item.code == 'toorg'){//FIXME 划出单位固定key
          this.toorgProperty = item;
          c.scopedSlots = { customRender: item.code };
        }else if(item.code == 'memo'){
          c.scopedSlots = { customRender: item.code };
        }else{
          c.customRender = this.createCellReander(item);
        }
        this.columns.push(c);
      })
      this.userListProperty = com;
    }
    this.tableData = this.$store.getters.formData.userinfo || []
  },
  methods: {
    batchSetOrg(org, keys){
      this.tableData.forEach(item => {
        if(keys.indexOf(item._id) >= 0) {
          this.$set(item, this.toorgProperty.code, {
            _id: org._id,
            name: org.name,
          });
        }
      })
      this.selectedRowKeys = [];
    },
    getColumnProperty(code){
      return this.userListProperty.childs.find(item => item.code == code);
    },
    getUserName(user){
      let p = this.userListProperty.childs.find(item => item.componenttype == 'user');
      let name;
      if(p){
        name = get(user, `${p.code}.${p.fieldsource}`);
      }
      return name || ''
    },
    getFormValue(){
      return new Promise((resolve, reject) => {
        this.form.validateFields((error, values) => {
          if(error){
            reject({code:'form_validate_fail', message: '表单验证失败'});
          }else if(this.tableData.length == 0 && this.userListProperty.require){
            reject({code:'form_validate_fail', message: `请添加${this.userListProperty.name}`});
          }else{
            let row = this.tableData.find(item => !item.toorg);
            if(row){
              return reject({code:'form_validate_fail', message: `${this.getUserName(row)}未填写${this.toorgProperty.name}`});
            }
            let formData = this.$store.getters.formData;
            let data = {}
            Object.keys(formData).forEach(item => {
              if(item) {
                data[item] = get(formData, item);
              }
            })
            data.userinfo = this.tableData;
            resolve(data);
          }
        });
      }) 
    },
    findUserListCom(){//查找用户列表组件
      let component;
      this.parseConfigs.some(row => {
        return row.columns.some(cell => {
          if(cell.component.componenttype == 'commonlist'){
            component = cell.component;
            return true;
          }
        })
      })
      return component
    },
    selectOrg(row){
      this.$emit('selectorg', [row._id]);
    },
    setMemo(row, e){
      this.$set(row, 'memo', e.target.value);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
    },
    removeSelected(){
      this.tableData = this.tableData.filter(item => this.selectedRowKeys.indexOf(item._id) < 0);
      this.selectedRowKeys = [];
    },
    addUser(user){
      let obj = {_id: user._id};
      this.userListProperty.childs.forEach(c => {
        if(c.componenttype == 'user'){
          obj[c.code] = {_id: user._id, [c.fieldsource]: user[c.fieldsource]};
        }else if(c.code == 'joblevel'){
          obj[c.code] = get(user, 'job.joblevel');  
        }else{
          obj[c.code] = user[c.code];  
        }
      })
      this.tableData.push(obj);
    },
    createCellReander(component){
      return (text, row, index) => {
        if(component.componenttype == 'org' || component.componenttype == 'user'){
          return get(text, component.fieldsource);
        }else if(component.componenttype == "combobox"){
          let v = this.$store.getters.dictKey(component.constant, text);
          return v && v.text;
        }else{
          return text;
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.table-wrap{
  overflow-x: auto;
}
</style>