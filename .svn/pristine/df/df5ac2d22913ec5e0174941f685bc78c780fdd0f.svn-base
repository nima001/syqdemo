<template>
  <div class="wrapper">
    <form-group class="group" ref="formGroup" :formLayout="formLayout" :props="props" :itemParams="params"></form-group>
  </div>
</template>

<script>
import FormGroup from '../components/FormGroup';
import { reportInput } from "@/person-shaoxing/api/assessment";
import { showError } from '../../../../../framework/utils';
import { getPops, loadData, getInputs } from '../components/contentItems';
export default {
  props: {},
  components: {
    FormGroup
  },
  data() {
    return {
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      itemArr: [],
      itemParams: {}
    };
  },
  watch: {},
  computed: {
    configIds() {
      return this.$store.getters.configIds
    },
    content() {
      return this.$store.getters.content
    },
    props: {
      get() {
        return getPops(this.itemArr)
      },
      set() {
        return getPops(this.itemArr)
      }
    },
    params: {
      get() {
        return this.itemParams
      },
      set() {
        return this.itemParams
      }
    }
  },
  created() {
    this.loadInputs()
  },
  mounted() {},
  methods: {
    loadInputs() {
      let ids = this.configIds.join(',');
      reportInput(ids)
      .then(({result}) => {
        this.itemArr = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    onNext() {
      return new Promise((resolve, reject) => {
        let obj = {};
        this.$refs.formGroup.validateFields(obj)
        .then(res => { 
          let status = this.getData(obj)
          resolve(status)
        })
        .catch(err => {
          resolve(false);
          showError({code:'form_validate_fail', message: err})
        });
      })
    },
    async getData(obj) {
      let data = await loadData(obj, this.itemArr);
      let inputs = await getInputs(this.itemArr);
      if (data) {
        let assessData = {
          configid: this.configIds.join(','),
          orgname: obj.hasOwnProperty('org') ? obj.org.name : obj.orgname,
          details: data.result,
          inputs,
          args: data.args
        }
        this.$store.commit('setAssessData', assessData); 
        return true
      } else {
        return false
      }
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper{
  height: 100%;
  overflow-y: auto;
  padding: @content-padding-h;
  .group{
    width: 900px;
    margin: 0 auto;
  }
}
</style>