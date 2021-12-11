<template>
  <a-modal :visible="true" width="620px" :title="title" @cancel="cancel":bodyStyle="{padding:'0px'}">
    <a-spin :spinning="loading">
      <div class="noData" v-if="list.length == 0">
        <empty-data></empty-data>
      </div>
      <ul v-else>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ul>
    </a-spin>
    <template slot="footer">
      <a-button type="primary" @click="cancel">关闭</a-button>
    </template>
  </a-modal>
</template>
<script>
import { Modal, Table, Pagination, Button, Spin } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import { showError } from "@/framework/utils/index";
import EmptyData from "@/framework/components/EmptyData";
import { punchCard } from "@/hall/api/attendance";
import moment from "moment";
export default {
  components: {
    AModal: Modal,
    AButton: Button,
    ASpin: Spin,
    EmptyData
  },
  data() {
    return {
      loading: true,
      list: []
    };
  },
  props: {
    punchCard: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.punchCard.username + "打卡记录";
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let query = {
        userid: this.punchCard.userid,
        starttime:
          moment(this.punchCard.checkdate).format("YYYY-MM-DD") + " 00:00:00",
        endtime:
          moment(this.punchCard.checkdate).format("YYYY-MM-DD") + " 23:59:59"
      };
      this.loading = true;
      punchCard(query)
        .then(({ result = [] }) => {
          this.list = result;
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.$emit("input", false);
    }
  }
};
</script>
<style lang='less' scoped>
.noData {
  padding: @content-padding-h;
}
ul {
  margin: 0px;
  li {
    padding: @content-padding-v @content-padding-h;
    border-bottom: 1px solid @border-color-base;
    text-align: center;
    line-height: 30px;
    &:last-child {
      border: none;
    }
  }
}
</style>