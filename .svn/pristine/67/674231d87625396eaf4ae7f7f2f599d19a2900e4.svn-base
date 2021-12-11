<template>
  <a-layout class="processwrap bindcontrol">
    <a-layout-content class="body">
      <div class="back">
        <a-button type="primary" @click="save" style="margin-left:15px;">保存</a-button>
      </div>
      <div class="content">
        <div class="top">
          <h2>汇总表名称:{{summaryname}}</h2>
          <h4>列名：{{columnname}}</h4>
        </div>
        <div class="bottom">
          <a-row :gutter="10" v-for="(obj,idx) in columnlist" :key="idx">
            <a-col :span="7">
              <a-tree-select
                v-model="columnlist[idx].modelinstanceid"
                showSearch
                @change="change"
                style="width:100%"
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="modallist"
                placeholder="---请选择流程模板--"
              ></a-tree-select>
            </a-col>
            <a-col :span="3">
              <a-select v-model="columnlist[idx].type" style="width:100%">
                <a-select-option
                  v-for="(item,index) in methodlist"
                  :value="item.value"
                  :key="index"
                >{{item.text}}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="6">
              <a-tree-select
                v-if="columnlist[idx].type==1"
                v-model="columnlist[idx].code"
                showSearch
                style="width:100%"
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="controls[columnlist[idx].modelinstanceid]"
                placeholder="--请选择控件(code)--"
              ></a-tree-select>
              <span
                v-if="(columnlist[idx].type==2 && !columnlist[idx].id) ||(columnlist[idx].type==2 && columnlist[idx].id && !columnlist[idx].componentExpressions)"
                class="setformula"
                @click="openSetFormula(1,idx)"
              >点击设置公式</span>
              <span
                v-if="columnlist[idx].type==2 && columnlist[idx].id && columnlist[idx].componentExpressions"
                class="setformula"
                @click="openSetFormula(2,idx)"
              >已设置公式，点击编辑</span>
            </a-col>
            <a-col :span="6">
              <a-select
                showSearch
                optionFilterProp="children"
                v-if="columnlist[idx].type==1"
                v-model="columnlist[idx].strategyid"
                style="width:100%"
                placeholder="--请选择格式转换策略--"
                :allowClear="true"
              >
                <a-select-opt-group
                  v-for="(item,index) in strategylist"
                  :key="index"
                  :label="item.label"
                >
                  <a-select-option
                    v-for="(obj,idx) in item.data"
                    :key="idx"
                    :value="obj.value"
                  >{{obj.text}}</a-select-option>
                </a-select-opt-group>
              </a-select>
            </a-col>
            <a-col :span="1">
              <a-icon
                @click="del(idx)"
                style="color:red;font-size:22px;line-height:32px;cursor:pointer;"
                type="minus-circle"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="22">
              <div class="addbtn" @click="add">添 加</div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-layout-content>
    <!-- 设置公式弹框 -->
    <a-modal
      title="设置公式"
      v-model="visible"
      @ok="okformula"
      class="setformulamodal"
      :bodyStyle="{
        'max-height':'600px',
        'overflow':'auto'
      }"
    >
      <div class="btns">
        <a-button type="primary" @click="addFormula(1)">添加控件</a-button>
        <a-button type="primary" @click="addFormula(2)">添加文本</a-button>
      </div>
      <div class="setlist">
        <a-row :gutter="10" v-for="(item,index) in formulaList" :key="index">
          <template v-if="item.type==1">
            <a-col :span="3">
              <span class="title">${ {{letter[item.idx]}} }:</span>
            </a-col>
            <a-col :span="10">
              <a-tree-select
                v-model="formulaList[index].code"
                showSearch
                style="width:100%"
                :filterTreeNode="filterTreeNode"
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="controls[columnlist[num].modelinstanceid]"
                placeholder="--请选择控件(code)--"
              ></a-tree-select>
            </a-col>
            <a-col :span="10">
              <a-select
                showSearch
                optionFilterProp="children"
                style="width:100%"
                v-model="formulaList[index].strategyid"
                placeholder="--请选择格式转换策略--"
                :allowClear="true"
                
              >
                <a-select-opt-group
                  v-for="(item,index) in strategylist"
                  :key="index"
                  :label="item.label"
                >
                  <a-select-option
                    v-for="(obj,idx) in item.data"
                    :key="idx"
                    :value="obj.value"
                  >{{obj.text}}</a-select-option>
                </a-select-opt-group>
              </a-select>
            </a-col>
            <a-col :span="1">
              <a-icon
                style="color:red;font-size:22px;line-height:32px;cursor:pointer;"
                type="minus-circle"
                @click="delFormula(index)"
              />
            </a-col>
          </template>
          <template v-else>
            <a-col :span="20" :offset="3" style="margin-top:10px;">
              <a-input v-model="formulaList[index].textcontent"></a-input>
            </a-col>
            <a-col :span="1">
              <a-icon
                style="color:red;font-size:22px;line-height:32px;cursor:pointer;margin-top:10px;"
                @click="delFormula(index)"
                type="minus-circle"
              />
            </a-col>
          </template>
        </a-row>
      </div>
      <div class="showlist">
        <span
          v-for="(item,index) in formulaList"
          :key="index"
        >{{letter[item.idx]?'${'+letter[item.idx]+'}':""}} {{formulaList[index].textcontent?formulaList[index].textcontent:""}}</span>
      </div>
    </a-modal>
  </a-layout>
</template>

<script>
import {
  getModelinstances,
  saveTablerows,
  getSingleRows,
  getStrategyList,
  getRowComponent
} from "@/workflow/api/summarytable";
import { getComponentTree } from "@/workflow/api/workflow";
import { showError } from "@/framework/utils/index";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Row,
  Col,
  Select,
  Input,
  TreeSelect,
  Modal,
  Tooltip
} from "ant-design-vue";
export default {
  name: "BindControl",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    AIcon: Icon,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    ATreeSelect: TreeSelect,
    AModal: Modal,
    ATooltip: Tooltip,
    ASelectOptGroup: Select.OptGroup
  },
  data() {
    return {
      summaryname: this.$route.query.name,
      collecttableid: this.$route.query.collecttableid,
      columnname: this.$route.query.columnname,
      rowid: this.$route.query.rowid,
      columnlist: [],
      modallist: [],
      methodlist: [
        { value: 1, text: "选择控件" },
        { value: 2, text: "设置公式" }
      ],
      controls: {},
      strategylist: [],
      visible: false,
      formulaList: [],
      formulaListtemp: [],
      letter: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      formulaData: [],
      num: null
    };
  },
  created() {
    this.getSingleInfo();
    this.getModelList();
    this.getQueryStrategyList();
  },
  methods: {
    //获取某列的组件集合
    getSingleInfo() {
      getSingleRows(this.$route.query.rowid)
        .then(res => {
          if (res.result.length > 0) {
            this.getControlLists();
            this.columnlist = res.result;
          } else {
            this.columnlist = [
              {
                modelinstanceid: undefined,
                type: 1,
                code: undefined,
                strategyid: undefined,
                collecttableid: this.$route.query.collecttableid,
                rowid: this.$route.query.rowid
              }
            ];
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取流程模板
    getModelList() {
      getModelinstances(this.$route.query.catalogid)
        .then(res => {
          this.modallist = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    change(val) {
      this.getControlList(val);
    },
    //获取格式转换策略列表
    getQueryStrategyList(index) {
      getStrategyList()
        .then(res => {
          let optionObj = {};
          res.result.forEach(item => {
            if (item.group) {
              if (!optionObj[item.group]) {
                this.$set(optionObj, item.group, []);
                optionObj[item.group].push({
                  text: item.text,
                  value: item.value
                });
              } else {
                optionObj[item.group].push({
                  text: item.text,
                  value: item.value
                });
              }
            }
          });
          for (var obj in optionObj) {
            this.strategylist.push({
              label: obj,
              data: optionObj[obj]
            });
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //批量获取控件列表
    getControlLists() {
      getRowComponent(this.rowid)
        .then(res => {
          this.controls = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取控件列表
    getControlList(id) {
      if (!this.controls[id]) {
        getComponentTree({ modelInstanceId: id })
          .then(res => {
            this.$set(this.controls,id,res.result);
          })
          .catch(err => {
            showError(err);
          });
      }
    },
    //树型选择框搜索筛选
    filterTreeNode(input, option) {
      return (
        option.componentOptions.propsData.title
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //添加
    add() {
      this.columnlist.push({
        modelinstanceid: undefined,
        type: 1,
        code: undefined,
        strategyid: undefined,
        collecttableid: this.collecttableid,
        rowid: this.rowid
      });
    },
    //删除
    del(index) {
      if (this.columnlist.length > 1) {
        this.columnlist.splice(index, 1);
      }
    },
    //打开设置公式
    openSetFormula(type, index) {
      this.num = index;
      this.formulaList = [];
      if (type == 2) {
        this.formulaList = this.columnlist[index].componentExpressions;
        let idx = 0;
        this.formulaList.forEach(item => {
          if (item.type == 1) {
            this.$set(item, "idx", idx);
            idx++;
          }
        });
      } else if (type == 1) {
        this.formulaListtemp.forEach(item => {
          if (item.index == this.num) {
            this.formulaList = item.data;
          }
        });
      }
      this.visible = true;
    },
    //添加公式
    addFormula(type) {
      if (type == 1) {
        this.formulaList.push({
          type: 1,
          code: undefined,
          strategyid: undefined
        });
      } else if (type == 2) {
        this.formulaList.push({
          type: 2,
          textcontent: ""
        });
      }
      let idx = 0;
      this.formulaList.forEach(item => {
        if (item.type == 1) {
          this.$set(item, "idx", idx);
          idx++;
        }
      });
    },
    //删除公式
    delFormula(index) {
      this.formulaList.splice(index, 1);
    },
    //公式保存
    okformula() {
      let arr = [];
      let flag = true;
      this.formulaListtemp.forEach(item => {
        if (item.index == this.num) {
          item.data = this.formulaList;
          flag = false;
        }
      });
      if (flag) {
        this.formulaListtemp.push({
          index: this.num,
          data: this.formulaList
        });
      }
      this.formulaList.forEach((item, index) => {
        if (item.type == 1) {
          arr.push({
            type: item.type,
            strategyid: item.strategyid,
            code: item.code,
            orderby: index
          });
        } else {
          arr.push({
            type: item.type,
            textcontent: item.textcontent,
            orderby: index
          });
        }
      });
      let obj = {};
      obj.componentExpressions = arr;
      obj.type = 2;
      obj.collecttableid = this.columnlist[this.num].collecttableid;
      obj.rowid = this.columnlist[this.num].rowid;
      obj.modelinstanceid = this.columnlist[this.num].modelinstanceid;
      this.columnlist[this.num] = obj;
      this.visible = false;
    },
    //保存
    save() {
      saveTablerows(this.columnlist)
        .then(res => {
          this.$message.success("绑定控件保存成功！");
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.bindcontrol {
  .body {
    margin: 12px;
    padding: 10px;
    background: #fff;
    .content {
      width: 60%;
      margin: 0 auto;
      .top {
        h2 {
          font-size: 18px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .bottom {
        .ant-row {
          margin: 15px 0;
        }
        .setformula {
          color: skyblue;
          line-height: 32px;
          cursor: pointer;
        }
        .addbtn {
          margin-top: 15px;
          border: 1px dashed #ddd;
          border-radius: 4px;
          padding: 5px 0;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
.setformulamodal {
  .btns {
    margin: 0 0 15px 40px;
    button {
      &:last-child {
        margin-left: 10px;
      }
    }
  }
  .title {
    line-height: 32px;
    text-align: right;
    display: inline-block;
    width: 100%;
  }
  .ant-row {
    margin: 15px 0;
    &:first-child {
      margin-top: 0;
    }
  }
  .showlist {
    border: 1px solid #ddd;
    min-height: 200px;
    margin-top: 20px;
  }
}
</style>