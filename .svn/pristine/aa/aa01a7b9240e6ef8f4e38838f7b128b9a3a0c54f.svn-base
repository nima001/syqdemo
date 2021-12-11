<template>
  <div class="wrap">
    <a-form-item
      v-if="formLayout != 'horizontal'"
      :label="name"
      :required="!!required"
      :validateStatus="validateStatus"
    >
      <a-tooltip placement="topLeft" :title="help">
        <a-cascader
          :placeholder="'请选择'+name"
          :options="options"
          :load-data="loadData"
          change-on-select
          v-model="propValue"
          :class="{ notEditor: !editor }"
        >
          <template slot="displayRender" slot-scope="{ labels}">
            <span>{{ labels.join(separator)}}</span>
          </template>
        </a-cascader>
      </a-tooltip>
    </a-form-item>
    <a-form-item v-else :required="!!required" :validateStatus="validateStatus">
      <div class="compact">
        <div class="title" :title="name" :class="{required}">{{name}}</div>
        <a-tooltip placement="topLeft" :title="help">
          <a-cascader
            :placeholder="'请选择'+name"
            :options="options"
            change-on-select
            :load-data="loadData"
            v-model="propValue"
            :class="{ notEditor: !editor }"
            :allowClear="true"
          >
            <template slot="displayRender" slot-scope="{ labels}">
              <span>{{ labels.join(separator)}}</span>
            </template>
          </a-cascader>
        </a-tooltip>
      </div>
    </a-form-item>
  </div>
</template>

<script>
/**
 * 级联选择组件 (省市区，组织。。。)
 */
import { Form, Cascader } from "ant-design-vue";
import { mixins } from "@formdesign/views/mixin/index";
import { getRegions } from "@/formdesign/api/index";
import { showError } from "@framework/utils";
import { get, set } from "lodash";
export default {
  components: {
    ACascader: Cascader,
    AFormItem: Form.Item
  },
  mixins: [mixins],
  data() {
    return {
      options: []
    };
  },
  props: {
    // 分隔符默认空格 如浙江省/杭州市/西湖区
    separator: {
      type: String,
      default: " "
    }
  },
  created() {
    this.getData();
  },
  computed: {
    propValue: {
      get() {
        let data = this.data
          ? get(this.data, this.code)
          : get(this.formData.data, this.code);
        if (data) {
          if (data.indexOf(this.separator) > 0) {
            return data.split(this.separator);
          } else {
            return [data];
          }
        } else {
          return undefined;
        }
      },
      set(value) {
        if (this.data) {
          set(this.data, this.code, value.join(this.separator));
        } else {
          set(this.formData.data, this.code, value.join(this.separator));
        }
      }
    }
  },
  methods: {
    formateData(list) {
      return list.map(item => {
        return {
          label: item.name,
          value: item.name,
          isLeaf: item.rindex - item.lindex > 1 ? false : true,
          ...item
        };
      });
    },
    getData() {
      getRegions({ code: undefined, pagesize: 10000 })
        .then(res => {
          let list = res.result["rows"];
          this.options = this.formateData(res.result["rows"]);
        })
        .catch(err => {
          showError(err);
        });
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      getRegions({ pagesize: 10000, code: targetOption.code })
        .then(res => {
          targetOption.loading = false;
          targetOption.children = this.formateData(res.result["rows"]);
          this.options = [...this.options];
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
</style>