<template>
  <!-- 选择文件上传 组件 -->
  <div class="chooseFileModal">
    <a-modal :visible="isShowFile" title="请选择文件" width="800px" @cancel="Modalcancel" :footer="null">
      <div class="chooseFileModalbox">
        <a-form :form="baseform">
          <a-row class="rowcss">
            <a-form-item
              label="批准文号："
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 20 }"
              class="fatherbox"
            >
              <a-input-group compact class="pzwh">
                <a-input type="text" style="width: 80px;" v-model="allowName" />
                <a-input
                  addonBefore="〔"
                  addonAfter="〕"
                  type="text"
                  style="width: 130px;"
                  v-model="allowYear"
                />
                <a-input addonAfter="号" type="text" style="width: 90px;" v-model="allowNumber" />
              </a-input-group>
            </a-form-item>
          </a-row>
          <a-row class="rowcss">
            <a-form-item
              label="文件标题："
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 20 }"
              class="fatherbox"
            >
              <div class="storage-upload" @click="trigger">
                <span class="spanicon">
                  <a-icon type="upload" class="iconstyle" />点击上传
                </span>
                <span class="spanname">{{docData.fileName}}</span>
                <!-- <a-tooltip placement="right">
                  <template slot="title">{{docData.fileName}}</template>
                  <span class="spanname">{{docData.fileName}}</span>
                </a-tooltip>-->
              </div>
              <input
                type="file"
                ref="fileBtn"
                class="fileBtn"
                @change="getFile($event)"
                multiple="multiple"
              />
            </a-form-item>
          </a-row>
          <!-- 发文时间 -->
          <a-row class="rowcss">
            <a-form-item
              label="发文时间："
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 20 }"
              class="fatherbox"
            >
              <a-date-picker
                style="width: 160px;margin-right:10px;"
                v-decorator="[
                                    'sendTxtTime'
                                ]"
              />
              <a-button class="btn" type="primary" @click="addcontent">添加并选择</a-button>
            </a-form-item>
          </a-row>
        </a-form>
        <a-table
          class="tableCls"
          :columns="columns"
          rowKey="id"
          :dataSource="pagination.rows"
          :pagination="false"
          :customRow="customRow"
        >
          <template slot="fileTitle" slot-scope="title">
            <p class="pcss" :title="title">{{title}}</p>
          </template>
        </a-table>
        <div class="footer">
          <a-pagination
            v-if="pagination.rows && pagination.rows.length"
            showSizeChanger
            :showTotal="total => `总共：${total}条`"
            @showSizeChange="onShowSizeChange"
            :total="pagination.total"
            v-model="pagination.pagenum"
            @change="onPageChange"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import {
  Modal,
  Form,
  Row,
  Input,
  DatePicker,
  Button,
  Table,
  Icon,
  InputNumber,
  Pagination,
  Tooltip
} from "ant-design-vue";
import { docQuery } from "@/salary/api/document";
import { upload } from "@/framework/api/file";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    AInput: Input,
    AInputGroup: Input.Group,
    ADatePicker: DatePicker,
    AButton: Button,
    ATable: Table,
    AIcon: Icon,
    AInputNumber: InputNumber,
    APagination: Pagination,
    ATooltip: Tooltip
  },
  data() {
    return {
      baseform: this.$form.createForm(this),
      allowName: "", //余编
      allowYear: "", //2018
      allowNumber: "", //5号
      columns: [
        {
          title: "批准文号",
          dataIndex: "num",
          key: "num",
          align: "left",
          width: "25%",
          scopedSlots: { customRender: "num" }
        },
        {
          title: "文件标题",
          dataIndex: "title",
          key: "title",
          align: "left",
          width: "55%",
          scopedSlots: { customRender: "fileTitle" }
        },
        {
          title: "发文时间",
          dataIndex: "dispatchdate",
          key: "dispatchdate",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "dispatchdate" }
        }
      ],
      datasource: [],
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true
      },
      docData: {
        fileid: null,
        fileName: null,
        fileUrl: null
      }
    };
  },
  beforeCreate() {
    this.baseform = this.$form.createForm(this); //表单初始化
  },
  props: ["isShowFile"],
  methods: {
    getlist(page) {
      const pagination = page ? page : this.pagination;
      let data = {
        needtotal: true
      };
      let pagedata = {
        ...pagination,
        ...data
      };
      docQuery(pagedata)
        .then(res => {
          this.pagination = res.result;
          for (let i = 0; i < this.pagination.rows.length; i++) {
            this.$set(
              this.pagination.rows[i],
              "id",
              res.result.pagenum * 10 + i - 9
            );
            this.$set(this.pagination.rows[i], "key", i);
          }
        })
        .catch(error => {
          showError(error);
        });
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize, true);
    },
    onShowSizeChange(pagenum, size) {
      this.loadData(1, size, true);
    },
    loadData(pagenum, pageSize, needtotal) {
      this.getlist({ pagenum, pageSize, needtotal });
    },
    Modalcancel() {
      this.$emit("closeModal");
    },
    customRow: function(record) {
      //表格点击行的回调
      let that = this;
      return {
        on: {
          click: function() {
            //截取有效字段
            if (record.fileuri) {
              let indexleft = record.fileuri.indexOf("=");
              let fileName = record.fileuri.substring(
                indexleft + 1,
                record.fileuri.length
              );
              that.fileName = decodeURIComponent(fileName);
            } else {
              that.fileName = "暂无标题";
            }
            let recorddata = {
              fileName: that.fileName,
              ...record
            };
            that.$emit("sendFileData", recorddata); //record 传递回 stepIndex = 0 界面
            that.$emit("closeModal");
          }
        }
      };
    },
    trigger() {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    getFile(event) {
      let file = event.target.files[0];
      upload(file)
        .then(res => {
          this.docData.fileUrl = res.data.result;
          //截取有效字段
          let indexleft = res.data.result.indexOf("=");
          let fileName = res.data.result.substring(
            indexleft + 1,
            res.data.result.length
          );
          this.docData.fileName = decodeURIComponent(fileName);
          this.$notification.success({
            message: "提示",
            description: "文件上传成功!",
            duration: 3
          });
        })
        .catch(error => {
          showError(error);
        });
    },
    addcontent() {
      if (
        this.sendTxtTime &&
        this.docData.fileName &&
        this.allowName &&
        this.allowNumber &&
        this.allowYear
      ) {
        let data = {
          dispatchdate: this.sendTxtTime,
          num:
            this.allowName +
            "〔" +
            this.allowNumber +
            "〕" +
            this.allowYear +
            "号",
          name: this.allowName,
          number: this.allowNumber,
          year: this.allowYear,
          fileName: this.docData.fileName
        };
        this.$emit("sendFileData", data);
        this.$emit("closeModal");
      } else {
        this.$notification.success({
          message: "提示",
          description: "请将内容填写完整!",
          duration: 3
        });
        this.$emit("closeModal");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.chooseFileModalbox {
  .ant-table-thead tr th {
    color: black;
    font-size: 14px;
    /* 没有实际高度 设置padding */
    padding: 8px 8px;
    background-color: rgba(128, 128, 128, 0.37);
  }
  /* tbody 编辑 */
  .ant-table-tbody tr td {
    color: black;
    font-size: 14px;
    /* 没有实际高度 设置padding */
    padding: 7px 7px;
  }
  .rowcss {
    height: 40px;
    .fatherbox {
      margin-right: 10px;
      .pzwh {
        width: auto;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        &:hover {
          border-color: @primary-color;
        }
        &:focus-within {
          border-color: @primary-color;
          box-shadow: 0 0 0 2px fade(@primary-color, 20%);
        }
        /deep/.ant-input {
          border: none;
          height: 30px;
        }
        /deep/.ant-input-group-addon {
          border: none;
          background: none;
        }
        // /deep/.ant-input-group.ant-input-group-compact {
        //   top: 0px;
        // }
      }
      /deep/ .ant-input-group {
        top: 0.8px !important;
      }
      /deep/ .ant-form-item-label {
        margin-right: 15px;
      }
    }
    .storage-upload {
      cursor: pointer;
      width: 300px;
      .spanname {
        float: left;
        padding-left: 15px;
        width: 180px;
        overflow: hidden;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .spanicon {
        float: left;
        width: 75px;
        .iconstyle {
          color: @primary-color;
        }
      }
    }
  }
  .fileBtn {
    width: 0;
    height: 0;
    opacity: 0;
  }
  .footer {
    height: 60px;
    padding: 12px 0px;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
  .tableCls {
    margin-top: 12px;
    overflow: auto;
    height: 150px;
  }
  .tableCls tbody tr {
    cursor: pointer;
  }
  .pcss {
    width: 300px;
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /* 添加并选择 */
  .btn {
    height: 32px;
    width: 100px;
    outline: none;
    border: 1px solid @primary-color;
    border-radius: 5px;
    margin-left: 30px;
  }
}
</style>