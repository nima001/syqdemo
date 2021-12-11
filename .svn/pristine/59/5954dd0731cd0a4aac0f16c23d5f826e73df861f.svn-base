<template>
  <div class="org-main-duty" v-if="oneDuty && mainDuty && record">
    <a-spin
      v-if="oneDuty == null && mainDuty == null && record == null"
      class="loading"
      :delay="50"
    />
    <div class="mechanism-div">
      <div class="small-div"></div>
      <div class="small-p">主要职责</div>
    </div>
    <div class="content-main" v-if="oneDuty">
      <div
        v-html="transformationContent(oneDuty)"
        class="main-s"
        v-if="oneDuty.length < 250"
      ></div>
      <div
        v-html="transformationContent(oneDuty)"
        class="main-p"
        :class="{ activeUi: flag }"
        v-else
      ></div>
      <div @click="changeArrow" class="toggleSort" v-if="oneDuty.length > 250">
        <span>{{ flag ? "折叠" : "展开" }}</span>
        <a-icon :type="flag ? 'up' : 'down'" />
      </div>
    </div>
    <div class="content-main" v-if="mainDuty">
      <div
        class="main-mechanism"
        v-for="(item, index) in mainDuty"
        :key="index"
      >
        <div class="mechanism-div">
          <div class="small-div"></div>
          <div
            class="small-p"
            v-for="(t, tnx) in typearr"
            :key="tnx"
            v-show="item.type == t.value"
          >
            {{ t.text }}
          </div>
        </div>
        <div class="time-list">
          <div class="list-onediv">
            <span style="font-weight: 700"
              >时间： {{ item.documentVo.dispatchdate }}</span
            >
            <span style="font-weight: 700"
              >文号： {{ item.documentVo.num }}</span
            >
          </div>
          <a-button @click="downloadFile(item.documentVo.fileuri)"
            >下载文件</a-button
          >
        </div>
        <div class="listthree">
          <div
            v-html="brightenKeyword(item.content)"
            class="listthree-div"
          ></div>
          <a-button @click="watchDetails(item)">查看详情</a-button>
        </div>
      </div>
    </div>
    <div class="content-main" v-if="record">
      <div class="mechanism-div">
        <div class="small-div"></div>
        <div class="small-p">修订记录</div>
      </div>
      <div
        class="main-mechanism"
        v-for="(item, index) in record"
        :key="index"
        style="border-bottom: 1px dashed #dedede"
      >
        <div class="time-list">
          <div class="list-onediv">
            <span style="font-weight: 700"
              >时间： {{ item.documentVo.dispatchdate }}</span
            >
            <span style="font-weight: 700"
              >文号： {{ item.documentVo.num }}</span
            >
            <span style="font-weight: 700">
              标签：
              <span class="span-tag" v-if="item.recordtype == 1"
                >&nbsp;三定&nbsp;</span
              >
              <span class="span-tag" v-if="item.recordtype == 2"
                >&nbsp;变更&nbsp;</span
              >
            </span>
          </div>
          <a-button @click="downloadFile(item.documentVo.fileuri)"
            >下载文件</a-button
          >
        </div>
        <div class="listthree">
          <div
            v-html="brightenKeyword(item.content)"
            class="listthree-div"
          ></div>
          <a-button @click="watchDetails(item)">查看详情</a-button>
        </div>
      </div>
    </div>
    <a-modal
      title="查看详情"
      :visible="visible"
      @cancel="close"
      :footer="null"
      v-if="detailsData"
      width="800px"
      :bodyStyle="bodyStyle"
    >
      <div class="detailsmodal">
        <div class="details-top">
          <div>
            <p class="pcss" :title="detailsData.documentVo.title">
              <span>相关文件：</span>
              {{ detailsData.documentVo.title }}
            </p>
            <span style="color: #c9c9c9">
              <span style="margin-right: 20px">{{
                detailsData.documentVo.num
              }}</span>
              <span>{{ detailsData.documentVo.dispatchdate }}</span>
            </span>
          </div>
          <a-button @click="downloadFile(detailsData.documentVo.fileuri)"
            >下载文件</a-button
          >
        </div>
        <div>
          <span
            v-for="(e, enx) in typearr"
            :key="enx"
            v-show="detailsData.documentVo.type == e.value"
            >{{ e.text }}:</span
          >
          <p
            v-html="transformationContent(detailsData.content)"
            style="line-height: 25px"
          ></p>
        </div>
      </div>
    </a-modal>
  </div>
  <empty-data v-else style="margin-top: 15%" />
</template>
<script>
import EmptyData from "@/framework/components/EmptyData";
import {
  queryorgfuncdesc,
  orgfuncdescmain,
  orgfuncdescrecord,
  getorgfuncdesc,
} from "@/person-shaoxing/api/analysis";
import { Spin, Icon, Button, Modal } from "ant-design-vue";
import { download } from "@/framework/api/file";
export default {
  props: {
    orgid: String,
  },
  components: {
    ASpin: Spin,
    AIcon: Icon,
    AButton: Button,
    AModal: Modal,
    EmptyData,
  },
  data() {
    return {
      visible: false,
      mainDuty: null,
      oneDuty: null,
      record: null,
      flag: false,
      detailsData: null,
      currentSort: 0,
      bodyStyle: {
        padding: "15px",
        height: "500px",
        overflow: "auto",
      },
    };
  },
  created() {
    this.showMainDuty(this.orgid);
  },
  computed: {
    //职责
    typearr() {
      return this.$store.getters.dict("person.orgfuncdesctype");
    },
  },
  watch: {
    orgid(id) {
      this.showMainDuty(id);
    },
  },
  methods: {
    showMainDuty(id) {
      this.mainDuty = null;
      if (id) {
        queryorgfuncdesc(id)
          .then((resp) => {
            this.mainDuty = resp.result;
            console.log(this.mainDuty);
          })
          .catch((error) => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3,
            });
          });
        orgfuncdescmain(id)
          .then((resp) => {
            this.oneDuty = resp.result;
          })
          .catch((error) => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3,
            });
          });
        orgfuncdescrecord(id)
          .then((resp) => {
            this.record = resp.result;
          })
          .catch((error) => {
            this.$notification.error({
              message: "提示",
              description: err.desc || "未知错误" + (err.code || ""),
              duration: 3,
            });
          });
      }
    },
    //展开、收起筛选
    changeArrow() {
      this.flag = !this.flag;
    },
    transformationContent(content) {
      //原始字符串
      let string = content;
      //替换所有的换行符
      string = string.replace(/\r\n/g, "<br>");
      string = string.replace(/\n/g, "<br>");
      string = string.replace(/(\r\n)|(\n)/g, "<br>");
      //替换所有的空格（中文空格、英文空格都会被替换）
      string = string.replace(/\s/g, " ");
      //输出转换后的字符串
      return string;
    },
    brightenKeyword(content) {
      if (content.length > 150) {
        let newtext = content.substring(0, 150);
        let newcontent = `${newtext}......`;
        return newcontent;
      } else {
        return content;
      }
    },
    //下载文件
    downloadFile(fileuri) {
      if (fileuri) {
        download(fileuri);
      }
    },
    close() {
      this.visible = false;
      this.detailsData = null;
    },
    watchDetails(item) {
      this.visible = true;
      getorgfuncdesc(item.id).then((res) => {
        this.detailsData = res.result;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.org-main-duty {
  padding: 10px 24px;
  height: 100%;
  .loading {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -10px;
  }
  .content-main {
    height: auto;
    .main-p {
      line-height: 25px;
      padding: @layout-space-base 0;
      height: 260px;
      overflow: hidden;
    }
    .main-s {
      line-height: 25px;
      padding: @layout-space-base 0;
      height: auto;
    }
    .activeUi {
      height: auto;
    }
    .main-mechanism {
      padding-bottom: @layout-space-base;
      .toggleSort {
        margin: auto;
        width: 60px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: @primary-color;
        }
        i {
          margin-left: 5px;
          color: @primary-color;
        }
      }
    }
  }
  .toggleSort {
    margin: auto;
    width: 60px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: @primary-color;
    }
    i {
      margin-left: 5px;
      color: @primary-color;
    }
  }
  .mechanism-div {
    display: flex;
    align-items: center;
    .small-div {
      width: 5px;
      height: 20px;
      background: @primary-color;
    }
    .small-p {
      font-size: 20px;
      margin-left: 5px;
    }
  }
  .time-list {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    line-height: 25px;
    align-items: center;
    .span-tag {
      color: @primary-color;
      margin-right: @layout-space-base;
      border: 1px solid @primary-color;
      border-radius: 2px;
    }
    .list-onediv {
      display: flex;
      flex-direction: column;
    }
  }
  .listthree {
    min-height: 32px;
    display: flex;
    justify-content: space-between;
    .listthree-div {
      width: 88%;
    }
  }
}
.detailsmodal {
  .details-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: @layout-space-base;
    .pcss {
      width: 600px;
      overflow: hidden;
      margin: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>