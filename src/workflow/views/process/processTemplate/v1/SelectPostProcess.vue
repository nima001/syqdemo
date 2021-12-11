<template>
  <a-layout>
    <a-layout class="processwrap selectorgprocess">
      <a-layout-content>
        <div class="body">
          <div class="postProcessWrap">
            <h3>请选择流程</h3>
            <ul>
              <li v-for="(item,index) in processList" :key="index">
                <a-icon type="deployment-unit" />
                <span
                  :class="item.selected?'active':''"
                  @click="selectPostProcess(item)"
                >{{item.text}}</span>
              </li>
            </ul>
            <a-button type="primary" class="post-process-btn" @click="createProcess">确认</a-button>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout, Icon, Button } from "ant-design-vue";
import { getPostProcessInfo } from "@/workflow/api/postprocess";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    AIcon: Icon,
    AButton: Button
  },
  data() {
    return {
      processList: [],
      value: undefined,
      name: undefined
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取后置流程列表
    getList() {
      getPostProcessInfo(this.$route.query.postprocessid)
        .then(res => {
          if (res.code == "success") {
            this.processList = res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //选择后置流程
    selectPostProcess(val) {
      this.value = val.value;
      this.name = val.text;
      this.processList.forEach(item => {
        this.$set(item, "selected", false);
        if (item.value == val.value) {
          this.$set(item, "selected", true);
        }
      });
    },
    createProcess() {
      if (this.value) {
        const modelinstanceid = this.value;
        const flowname = this.name;
        const { href } = this.$router.resolve({
          name: "workflowform",
          query: {
            modelinstanceid,
            flowname,
            businessid:this.$route.query.businessid
          }
        });
        window.open(href, "_self");
      } else {
        this.$message.error("请先选择后置流程！");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.selectorgprocess {
  .body {
    height: 100%;
  }
  .postProcessWrap {
    width: 500px;
    margin: 20px auto;
    background: #fff;
  }
  .postProcessWrap {
    height: 540px;
    position: relative;
    h3 {
      padding: 15px 0 15px 15px;
      font-size: 16px;
      font-weight: 500;
      color: gray;
      border-bottom: 1px solid #ddd;
    }
    ul {
      li {
        padding: 7px 0 7px 35px;
        line-height: 18px;
        font-size: 15px;
        cursor: pointer;
        i {
          font-size: 18px;
          color: orange;
        }
        span {
          padding-left: 10px;
          color: rgb(0, 0, 0.75);
          &.active {
            color: orange;
          }
          &:hover {
            color: orange;
          }
        }
      }
    }
    .post-process-btn {
      position: absolute;
      right: 30px;
      bottom: 15px;
    }
  }
}
</style>