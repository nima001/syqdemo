<template>
  <div class="proportion">
    <a-progress type="circle" :percent="percent" :format="() => '问题类型'" />
    <div class="footer">
      <div class="top">
        <span class="text">机构问题</span>
        <span class="num" @click="showOrgProblemNum = true">{{ mechanismNum ? mechanismNum : 0 }}</span>
      </div>
      <div class="bottom">
        <span class="text">人员问题</span>
        <span class="num" @click="showPersonProblemNum = true">{{ personNum ? personNum : 0 }}</span>
      </div>
    </div>
    <a-modal
      :footer="null"
      v-model="showOrgProblemNum"
      :width="1100"
      title="机构问题"
      :afterClose="onClosed"
      :bodyStyle="{ height: '560px', padding: '0' }"
    >
      <show-org-problem
        :district="district.district"
        :orgid="orgid"
        @updateOrgid="updateOrgid"
        :dataSearchVal="dataSearchVal"
        @updatedataSearchVal="updatedataSearchVal"
      />
    </a-modal>
    <a-modal
      :footer="null"
      v-model="showPersonProblemNum"
      :width="1100"
      title="人员问题"
      :afterClose="onClosed"
      :bodyStyle="{ height: '560px', padding: '0' }"
    >
      <show-person-problem
        :district="district.district"
        :orgid="orgid"
        @updateOrgid="updateOrgid"
        :dataSearchVal="dataSearchVal"
        @updatedataSearchVal="updatedataSearchVal"
      />
    </a-modal>
  </div>
</template>
<script>
import { Progress, Modal } from "ant-design-vue";
import ShowOrgProblem from "@/person-shaoxing/views/orgStaffReport/components/ShowOrgProblem";
import ShowPersonProblem from "@/person-shaoxing/views/orgStaffReport/components/ShowPersonProblem";
/**机构问题，人员问题
 * 占比显示
 */
export default {
  components: {
    AProgress: Progress,
    AModal: Modal,
    ShowOrgProblem,
    ShowPersonProblem
  },
  props: {
    mechanismNum: Number,
    personNum: Number,
    cardtype: {
      type: String,
      default: "card",
    },

    numText: String,
    overNum: Number,
    surplusText: String,
    district: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showOrgProblemNum: undefined,
      showPersonProblemNum: undefined,
      orgid: undefined,
      dataSearchVal: undefined,
    }
  },
  computed: {
    percent() {
      if (this.mechanismNum > 0 && this.personNum > 0) {
        return (this.personNum / (this.mechanismNum + this.personNum)) * 100;
      }
    },
  },
  methods: {
    onClosed() {
      this.searchVal = "";
      this.dataSearchVal = "";
      this.orgid = undefined;
    },
    updateOrgid(orgid) {
      this.orgid = orgid;
    },
    updatedataSearchVal(dataSearchVal) {
      this.dataSearchVal = dataSearchVal;
    },
  }
};
</script>
<style lang="less" scoped>
.proportion {
  min-height: 212px;
  text-align: left;
  display: flex;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  /deep/ .ant-progress-circle-path {
    stroke: lighten(@primary-color, 20%) !important;
  }
  /deep/ .ant-progress-circle-trail {
    stroke: @primary-color !important;
  }

  .progress {
    line-height: 1.6em;
    .text {
      color: @text-color;
    }
    .num {
      color: @primary-color;
      font-size: 1.5em;
      font-weight: bold;
      transition: color 0.3s ease 0s;
    }
  }

  & > .footer {
    margin-left: 35px;
    min-width: 170px;
    & > .top {
      height: 45px;
      line-height: 45px;
      & > .text {
        display: inline-block;
        line-height: 25px;
        height: 25px;
        margin-left: -20px;
        color: lighten(@primary-color, 20%);
        &::before {
          content: "●";
          font-size: 25px;
          margin-right: 4px;
          color: @primary-color;
        }
      }
      & > .num:hover{
        cursor: pointer;
      }
      & > .num {
        margin-left: 20px;
        font-size: 25px;
        font-weight: bold;
      }
      & .text::before {
        color: @primary-color;
      }
    }
    & > .bottom:hover{
        cursor: pointer;
      }
    & > .bottom {
      height: 45px;
      line-height: 45px;
      & > .text {
        display: inline-block;
        line-height: 25px;
        height: 25px;
        margin-left: -20px;
        color: lighten(@primary-color, 20%);
        &::before {
          content: "●";
          font-size: 25px;
          margin-right: 4px;
          color: lighten(@primary-color, 20%);
        }
      }
      & > .num {
        margin-left: 20px;
        font-size: 25px;
        font-weight: bold;
      }
    }
  }
}
</style>