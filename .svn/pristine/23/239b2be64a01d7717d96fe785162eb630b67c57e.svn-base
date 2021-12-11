<template>
  <a-layout>
    <a-layout-content class="content">
      <a-row :gutter="16" v-if="recordList.length != 0">
        <a-col
          class="col"
          v-for="item in recordList"
          :key="item.id"
          @click="jump(item)"
          :xs="{ span: 12 }"
          :sm="{ span: 8 }"
          :md="{ span: 8 }"
          :lg="{ span: 6 }"
          :xl="{ span: 4 }"
          :xxl="{ span: 4 }"
        >
          <div class="colwrap">
            <span class="title">{{ item.title }}</span>
            <span class="arrow">
              <a-icon type="right" />
            </span>
            <span class="close-icon" @click.stop="delQueryById(item)">
              <a-icon type="close" v-if="item.owner || item.pub != 1" />
            </span>
          </div>
        </a-col>
      </a-row>
      <a-spin
        v-if="query.hasNext() && this.recordList.length != 0"
        tip="加载中..."
        :spinning="loading"
      >
        <div class="spin-content">
          <span ref="load" class="foot-load">加载中</span>
        </div>
      </a-spin>
      <div class="nodata" v-if="recordList.length == 0 && !loading">
        <empty-data></empty-data>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { querylist, deletebyid } from "@/person/api/integratedquery";
import EmptyData from "@/framework/components/EmptyData";
import { showError } from "@/framework/utils/index";
import { Layout, Row, Col, Icon, Spin } from "ant-design-vue";
export default {
  name: "CommonQuery",
  data() {
    return {
      loading: true,
      recordList: [],
      query: undefined,
      pagenum: 1,
      pagesize: 30,
      intersectionObserver: undefined,
    };
  },
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ARow: Row,
    ACol: Col,
    AIcon: Icon,
    ASpin: Spin,
    EmptyData,
  },
  created() {
    this.myQueryList();
  },

  methods: {
    // 跳转
    jump(item) {
      this.$router.push({
        path: "/person/integratedquery/index",
        query: { id: item.id },
      });
    },
    myQueryList() {
      this.loading = true;
      this.recordList = [];
      this.query = undefined;
      this.query = this.createQuery();
      this.query.nextPage();
    },

    createQuery() {
      let params = {
        pagenum: 0,
        pagesize: this.pagesize,
        namespace: "customquery"
      };
      let nextList = true;
      return {
        hasNext: () => {
          return nextList;
        },
        nextPage: () => {
          params.pagenum++;
          querylist(params)
            .then((res) => {
              if (this.loading) {
                let list = res.result.rows || [];
                this.recordList = [...this.recordList, ...list];
                this.$nextTick(() => {
                  if (this.query.hasNext()) {
                    this.bindScrollSentinel();
                  } else {
                    this.unBindScrollSentinel();
                  }
                });

                if (params.pagesize > list.length) {
                  nextList = false;
                }

                return list;
              }
            })
            .catch((error) => {
              showError(error);
            })
            .finally(() => {
              this.loading = false;
            });
        },
      };
    },

    bindScrollSentinel() {
      let load = this.$refs.load;
      if (load) {
        this.intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio > 0) {
            this.loading = true;
            this.query.nextPage();
          }
        });
        this.intersectionObserver.observe(load);
      }
    },
    unBindScrollSentinel() {
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
        this.intersectionObserver = undefined;
      }
    },

    delQueryById(item) {
      deletebyid(item.id)
        .then((res) => {
          this.recordList = this.recordList.filter((e) => {
            return e.id != item.id;
          });
        })
        .catch((error) => {
          showError(error);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.ant-layout {
  height: 100%;
  .content {
    margin: @layout-space-base;
    background-color: @white;
    overflow-y: auto;
    overflow-x: hidden;
    .nodata {
      padding: 40px;
    }
    .ant-spin-spinning {
      display: block;
      margin: 100px auto 0;
    }
    .ant-row {
      padding: @content-padding-v @content-padding-h;
      .col {
        padding: @content-padding-v @content-padding-h;
        .colwrap {
          background: #f6f6f6;
          height: 50px;
          line-height: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          position: relative;
          transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
          &:hover {
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.09);
            .close-icon {
              visibility: visible;
            }
          }
          .title {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0px 2px 0px 25px;
            font-size: 15px;
          }
          .arrow {
            width: 25px;
            color: @accent-color;
          }
          .close-icon {
            width: 20px;
            height: 20px;
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            text-align: center;
            line-height: 20px;
            visibility: hidden;
          }
          .foot-load {
            color: white;
          }
        }
      }
    }
    .foot-load {
      color: white;
    }
  }
}
</style>