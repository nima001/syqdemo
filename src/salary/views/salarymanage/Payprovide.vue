<template>
  <!-- 工资发放 -->
  <div class="payprovide">
    <a-modal
      class="payprovideModal"
      :visible="isShow"
      title="工资发放"
      :width="576"
      @cancel="fn"
      @ok="handleOk"
    >
      <table class="tablecss" style="border-collapse: collapse;">
        <thead>
          <tr>
            <td>项目</td>
            <td>审核部门</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in provideRes.result" :key="item.index">
            <td>{{item.itemName}}</td>
            <td
              :rowspan="computedRowspan(item.auditdeptName)"
              v-if="index =0 && item.auditdeptName != provideRes.result[index-1].auditdeptName|| index==0"
            >{{item.auditdeptName}}</td>
          </tr>
        </tbody>
      </table>
    </a-modal>
  </div>
</template> 
<script>
import { repayoff, payoff } from "@/salary/api/salaryManage";
import { showError } from "@/framework/utils/index";
import { Modal } from "ant-design-vue";
export default {
  data() {
    return {
      res: [],
      userType: 1
    };
  },
  components: {
    AModal: Modal
  },
  computed: {
    computedRowspan() {
      let that = this;
      return function(name) {
        for (let m = 0; m < that.res.length; m++) {
          if (that.res[m].kind == name) {
            return that.res[m].num;
          }
        }
      };
    }
  },
  props: ["isShow", "provideRes"],
  created() {
    let arr = this.provideRes.result;
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        let obj = {};
        obj.kind = arr[0].auditdeptName;

        obj.num = 1;
        res.push(obj);
      } else {
        for (let j = 0; j < res.length; j++) {
          if (arr[i].auditdeptName == res[j].kind) {
            res[j].num++;
          } else {
            if (j == res.length - 1) {
              let newobj = {};
              newobj.kind = arr[i].auditdeptName;
              newobj.num = 1;
              res.push(newobj);
              break;
            }
          }
        }
      }
    }

    this.res = res;
  },
  methods: {
    fn() {
      this.$emit("modalClose");
    },
    handleOk() {
      let that = this;
      that.$emit("modalClose");
      if (this.provideRes.send) {
        let data = {
          processid: this.$store.state.salary.approvalUnitNowRecord.id
        };
        repayoff(data)
          .then(function(res) {
            that.$router.push({
              name: "salarypaymentapprovalunit",
              params: { ifsuccess: true }
            });
          })
          .catch(err => {
            showError(err);
          });
      } else {
        let data = {
          date: that.provideRes.nowTime.date,
          orgid: that.provideRes.nowOrgId,
          usertype: 1
        };
        payoff(data)
          .then(function(res) {
            setTimeout(() => {
              that.$router.push({
                name: "salarypaymentapprovalunit",
                params: { ifsuccess: true }
              });
            }, 500);
          })
          .catch(err => {
            showError(err);
          });
      }
    }
  }
};
</script>
<style lang="less" >
.payprovideModal .ant-modal-body {
  padding: @content-padding-v @content-padding-h;
}

.payprovideModal thead td {
  border: 1px solid #e8e8e8;
  text-align: center;
  padding: 10px 10px;
  background-color: #fafafa;
}
.payprovideModal tbody td {
  border: 1px solid #e8e8e8;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.payprovideModal {
  height: 700px;
}
.payprovideModal .ant-modal-content {
  height: 100%;
}
.payprovideModal .ant-modal-header {
  height: 50px;
}
.payprovideModal .ant-modal-body {
  height: 560px;
  overflow-y: hidden;
}
.payprovideModal .ant-modal-footer {
  height: 80px;
}
.payprovideModal .tablecss {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.payprovideModal tbody {
  height: 100px;
  overflow: hidden;
}
</style>