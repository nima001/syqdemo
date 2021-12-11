<template>
  <div>
    <div class="header" v-if="selectOp">
      <a-select v-model="filter.__op__" >
        <a-select-option value="and">以下条件全部满足</a-select-option>
        <a-select-option value="or">满足其中一个条件</a-select-option>
      </a-select>
    </div>
    <div v-for="(item, index) in filterProps" :Key='index'>
      <div v-if="index > 0" class="connector"></div>
      <div class="criteria">
        <a-input-group compact>
          <a-select :value="item.code" 
            @change="onPropChange(item, $event)" 
            style="width: 35%"
          >
            <a-select-option v-for="item in propMap[namespace]" 
              :key="item.code" :disabled="item.disabled"
            >{{item.name}}</a-select-option>
          </a-select>
          <a-select :value="item.multi" 
            @change="onOpChange(item, $event)" 
            style="width: 20%"
          >
            <a-select-option :key="0">等于</a-select-option>
            <a-select-option :key="1"
              v-if="item.prop && (item.prop.datatype != 4 || (item.prop.inputtype != 4 && item.prop.inputtype != 3))" 
            >在列表中</a-select-option>
          </a-select>
          <InputDict v-if="item.datatype == 2" 
            :value="filter" 
            :property="item"
            @change="onValueChange" 
            style="width: 45%"
          />
          <template v-else-if="item.datatype == 4">
            <InputBool v-if="item.inputtype == 4" :value="filter"  
              :property="item" 
              @change="onValueChange"
              style="width: 45%"
            />
            <InputDate v-else-if="item.inputtype == 3" 
              :value="filter" 
              :property="item" 
              @change="onValueChange"
              style="width: 45%"
            />  
            <InputNumber v-else-if="item.inputtype == 2 || item.inputtype == 1" 
              :value="filter" 
              :property="item" 
              @change="onValueChange"
              style="width: 45%"
            />  
            <InputText v-else 
              :value="filter" 
              :property="item" 
              @change="onValueChange"
              style="width: 45%"
            />  
          </template>
          <a-input v-else :read-only="true" style="width: 45%"/>
        </a-input-group>
        <a-icon type="delete" class="delete" @click="onDelete(item, index)"/>
      </div>
    </div>
    <a-button type="dashed" @click="add" style="width: 100%;margin-top:10px" icon="plus" >添加条件</a-button>
  </div>
</template>
<script>
import { Input, Select, Button, Icon } from 'ant-design-vue'
import InputDict from "@person/components/PropValueForm/InputDict";
import InputBool from "@person/components/PropValueForm/InputBool";
import InputDate from "@person/components/PropValueForm/InputDate";
import InputNumber from "@person/components/PropValueForm/InputNumber";
import InputText from "@person/components/PropValueForm/InputText";

/**
 * 对象属性简单过滤条件编辑
 * 1.支持等于比较
 * 2.支持in
 * 3.多个条件支持 and 或 or 连接
 * @author sunwen
 */
export default {
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    AInputGroup: Input.Group,
    AButton: Button,
    AIcon: Icon,
    InputDict, 
    InputBool, 
    InputDate, 
    InputNumber, 
    InputText
  },
  props: {
    value: {//过滤条件
      type: Object,
      default: () => ({})
    },
    namespace: {//
      type: String,
      required: true,
    },
    selectOp: {//条件连接操作符类型是可选
      type: Boolean
    }
  },
  data(){
    return {
      propMap: {//FIXME sunwen 可设置过滤的属性列表暂时前端配置
        user: [{ 
          code: 'sex', 
          name: '性别', 
          multi: false, 
          datatype: 2, 
          datasource: 'usermanage.user.sex',
          disabled: false
        }, { 
          code: 'identitytype', 
          name: '本人身份', 
          multi: false, 
          datatype: 2, 
          datasource: 'usermanage.user.identitytype',
          disabled: false
        }],
        organization: [{ 
          code: 'orgtype', 
          name: '组织类型', 
          multi: false, 
          datatype: 2, 
          datasource: 'usermanage.org.orgtype',
          disabled: false
        }, { 
          code: 'unittype', 
          name: '单位类型', 
          multi: false, 
          datatype: 2, 
          datasource: 'usermanage.org.unittype',
          disabled: false
        }, { 
          code: 'industrysort', 
          name: '行业分类', 
          multi: false, 
          datatype: 2, 
          datasource: 'usermanage.org.industrysort',
          disabled: false 
        }, { 
          code: 'schoolsort', 
          name: '学校分类', 
          multi: false, 
          datatype: 2, 
          datasource: 'usermanage.org.schoolsort',
          disabled: false 
        }]
      },
      filterProps: [],
      filter: {
        __op__: undefined, //连接操作符
        schoolsort: undefined,//FIXME sunwen 设置属性，才会触发数据响应
        unittype: undefined,
        industrysort: undefined,
      },
    }
  },
  created(){
    this.initData(this.params);
  },
  computed: {
    params(){
      return {
        value: this.value,
        namespace: this.namespace
      }
    }
  },
  watch: {
    params(v){
      this.initData(v);
    }
  },
  methods: {
    initData({namespace, value}){
      let arr = [], obj = {};
      if(namespace){
        obj.__op__ = value.__op__ || 'and';
        for(let name in value){
          let v = value[name];
          if(v){
            let prop = this.propMap[namespace].find(item => item.code == name);
            if(prop){
              let filter = {};
              this.setFilterProp(filter, prop);
              if(Array.isArray(v)){
                filter.multi = 1;
              }
              arr.push(filter);
              obj[name] = v;
            }
          }
        }
      }
      this.filter = obj;
      this.filterProps = arr;
    },
    getFilter(){
      return this.filter;
    },
    add(){
      this.filterProps.push({code: undefined, multi: 0, datatype: 0});
    },
    onPropChange(item, value){
      let prop = this.propMap[this.namespace].find(item => item.code == value);
      if(prop){
        this.setFilterProp(item, prop);
      }
    },
    onOpChange(item, multi){
      item.multi = multi;
    },
    onValueChange(code, value){
      
    },
    onDelete(item, index){
      if(item.prop){
        item.prop.disabled = false;
        this.filter[item.prop.code] = undefined;
      }
      this.filterProps.splice(index, 1);
    },
    setFilterProp(filter, prop){
      if(filter.prop){
        filter.prop.disabled = false;
        this.filter[filter.prop.code] = undefined;
      }
      prop.disabled = true;

      filter.prop = prop;
      filter.code = prop.code;
      filter.datatype = prop.datatype;
      filter.inputtype = prop.inputtype;
      filter.datasource = prop.datasource;
      filter.multi = 0;
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  overflow: hidden;
  margin-bottom: 10px;
  .ant-select{
    // float: right;
    width: 180px;
  }
}
.connector{
  color: @text-color-secondary;
  height: 10px;
}
.criteria{
  display: flex;
  .delete{
    padding: 5px;
    align-self: center;
    cursor: pointer;
    &:hover{
      color: @primary-color;
    }
  }
  .ant-input-group.ant-input-group-compact > *:last-child{
    /deep/ .ant-form-item-control{
      line-height: unset;
      .ant-form-item-children > *:last-child,
      .ant-form-item-children > .ant-select > .ant-select-selection, 
      .ant-form-item-children > .ant-calendar-picker:last-child .ant-input,
      .ant-form-item-children > .ant-select-auto-complete:last-child .ant-input,
      .ant-form-item-children > .ant-cascader-picker:last-child .ant-input, 
      .ant-form-item-children > .ant-cascader-picker-focused:last-child .ant-input, 
      .ant-form-item-children > .ant-mention-wrapper:last-child .ant-mention-editor, 
      .ant-form-item-children > .ant-time-picker:last-child .ant-time-picker-input{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      
    }
  }
}

</style>